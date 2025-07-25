#!/usr/bin/env node

/**
 * NPM 发布前检查脚本
 * 验证包是否准备好发布到 npm
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const packageJsonPath = path.join(rootDir, 'package.json')

class PublishChecker {
  constructor() {
    this.errors = []
    this.warnings = []
    this.success = []
  }

  log(type, message) {
    const colors = {
      error: '\x1b[31m❌',
      warning: '\x1b[33m⚠️',
      success: '\x1b[32m✅',
      info: '\x1b[36mℹ️'
    }
    console.log(`${colors[type]} ${message}\x1b[0m`)
  }

  addError(message) {
    this.errors.push(message)
    this.log('error', message)
  }

  addWarning(message) {
    this.warnings.push(message)
    this.log('warning', message)
  }

  addSuccess(message) {
    this.success.push(message)
    this.log('success', message)
  }

  // 检查 package.json
  checkPackageJson() {
    this.log('info', '检查 package.json...')
    
    if (!fs.existsSync(packageJsonPath)) {
      this.addError('package.json 文件不存在')
      return
    }

    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

    // 必需字段检查
    const requiredFields = ['name', 'version', 'description', 'main', 'module', 'types']
    requiredFields.forEach(field => {
      if (!pkg[field]) {
        this.addError(`package.json 缺少必需字段: ${field}`)
      } else {
        this.addSuccess(`${field}: ${pkg[field]}`)
      }
    })

    // 检查文件路径是否存在
    const filePaths = {
      main: pkg.main,
      module: pkg.module,
      types: pkg.types
    }

    Object.entries(filePaths).forEach(([key, filePath]) => {
      if (filePath) {
        const fullPath = path.join(rootDir, filePath)
        if (fs.existsSync(fullPath)) {
          this.addSuccess(`${key} 文件存在: ${filePath}`)
        } else {
          this.addError(`${key} 文件不存在: ${filePath}`)
        }
      }
    })

    // 检查样式文件
    if (pkg.exports && pkg.exports['./style']) {
      const stylePath = path.join(rootDir, pkg.exports['./style'])
      if (fs.existsSync(stylePath)) {
        this.addSuccess(`样式文件存在: ${pkg.exports['./style']}`)
      } else {
        this.addError(`样式文件不存在: ${pkg.exports['./style']}`)
      }
    }

    // 检查关键字
    if (!pkg.keywords || pkg.keywords.length === 0) {
      this.addWarning('建议添加关键字以提高包的可发现性')
    } else {
      this.addSuccess(`关键字: ${pkg.keywords.join(', ')}`)
    }

    // 检查仓库信息
    if (!pkg.repository) {
      this.addWarning('建议添加仓库信息')
    } else {
      this.addSuccess(`仓库: ${pkg.repository.url}`)
    }

    // 检查许可证
    if (!pkg.license) {
      this.addWarning('建议添加许可证信息')
    } else {
      this.addSuccess(`许可证: ${pkg.license}`)
    }

    return pkg
  }

  // 检查构建文件
  checkBuildFiles() {
    this.log('info', '检查构建文件...')
    
    if (!fs.existsSync(distDir)) {
      this.addError('dist 目录不存在，请先运行 npm run build:lib')
      return
    }

    const requiredFiles = [
      'index.js',
      'index.umd.cjs',
      'index.d.ts',
      'style.css'
    ]

    requiredFiles.forEach(file => {
      const filePath = path.join(distDir, file)
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath)
        this.addSuccess(`${file} (${(stats.size / 1024).toFixed(2)} KB)`)
      } else {
        this.addError(`构建文件不存在: ${file}`)
      }
    })
  }

  // 检查文档
  checkDocumentation() {
    this.log('info', '检查文档...')
    
    const docFiles = [
      { name: 'README.md', required: true },
      { name: 'CHANGELOG.md', required: false },
      { name: 'LICENSE', required: false },
      { name: 'NPM_PUBLISH_GUIDE.md', required: false },
      { name: 'USAGE_EXAMPLES.md', required: false }
    ]

    docFiles.forEach(({ name, required }) => {
      const filePath = path.join(rootDir, name)
      if (fs.existsSync(filePath)) {
        this.addSuccess(`文档存在: ${name}`)
      } else if (required) {
        this.addError(`缺少必需文档: ${name}`)
      } else {
        this.addWarning(`建议添加文档: ${name}`)
      }
    })
  }

  // 检查代码质量
  checkCodeQuality() {
    this.log('info', '检查代码质量...')
    
    try {
      // 检查类型
      execSync('npm run type-check', { cwd: rootDir, stdio: 'pipe' })
      this.addSuccess('TypeScript 类型检查通过')
    } catch (error) {
      this.addWarning('TypeScript 类型检查有警告，建议修复')
    }

    try {
      // 检查代码风格
      execSync('npm run lint', { cwd: rootDir, stdio: 'pipe' })
      this.addSuccess('代码风格检查通过')
    } catch (error) {
      this.addWarning('代码风格检查有问题，建议修复')
    }
  }

  // 检查依赖
  checkDependencies() {
    this.log('info', '检查依赖...')
    
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    
    // 检查 peerDependencies
    if (pkg.peerDependencies) {
      this.addSuccess(`Peer Dependencies: ${Object.keys(pkg.peerDependencies).join(', ')}`)
    } else {
      this.addWarning('建议添加 peerDependencies')
    }

    // 检查 dependencies 数量
    const depCount = pkg.dependencies ? Object.keys(pkg.dependencies).length : 0
    if (depCount > 10) {
      this.addWarning(`依赖数量较多 (${depCount})，考虑是否可以减少`)
    } else {
      this.addSuccess(`依赖数量合理 (${depCount})`)
    }
  }

  // 检查版本
  checkVersion() {
    this.log('info', '检查版本...')
    
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    
    if (pkg.version === '0.0.0' || pkg.version === '1.0.0') {
      this.addWarning('建议使用语义化版本号')
    } else {
      this.addSuccess(`版本号: ${pkg.version}`)
    }
  }

  // 模拟发布检查
  checkPublishSimulation() {
    this.log('info', '模拟发布检查...')
    
    try {
      const output = execSync('npm pack --dry-run', { 
        cwd: rootDir, 
        encoding: 'utf8' 
      })
      
      const lines = output.split('\n').filter(line => line.trim())
      const fileCount = lines.length - 1 // 减去标题行
      
      this.addSuccess(`将发布 ${fileCount} 个文件`)
      
      // 检查重要文件是否包含
      const importantFiles = ['package.json', 'README.md', 'dist/']
      importantFiles.forEach(file => {
        if (output.includes(file)) {
          this.addSuccess(`包含重要文件: ${file}`)
        } else {
          this.addWarning(`可能缺少重要文件: ${file}`)
        }
      })
      
    } catch (error) {
      this.addError('npm pack 模拟失败')
    }
  }

  // 运行所有检查
  runAllChecks() {
    console.log('\n🔍 开始 NPM 发布前检查...\n')
    
    this.checkPackageJson()
    console.log()
    
    this.checkBuildFiles()
    console.log()
    
    this.checkDocumentation()
    console.log()
    
    this.checkCodeQuality()
    console.log()
    
    this.checkDependencies()
    console.log()
    
    this.checkVersion()
    console.log()
    
    this.checkPublishSimulation()
    console.log()
    
    this.printSummary()
  }

  // 打印总结
  printSummary() {
    console.log('📊 检查总结:')
    console.log(`✅ 成功: ${this.success.length}`)
    console.log(`⚠️  警告: ${this.warnings.length}`)
    console.log(`❌ 错误: ${this.errors.length}`)
    
    if (this.errors.length > 0) {
      console.log('\n❌ 发布前需要修复以下错误:')
      this.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`)
      })
      process.exit(1)
    } else if (this.warnings.length > 0) {
      console.log('\n⚠️  建议修复以下警告:')
      this.warnings.forEach((warning, index) => {
        console.log(`   ${index + 1}. ${warning}`)
      })
      console.log('\n✅ 可以发布，但建议先修复警告')
    } else {
      console.log('\n🎉 所有检查通过，可以发布！')
    }
    
    console.log('\n📝 发布命令:')
    console.log('   npm publish')
    console.log('   # 或者如果是第一次发布公开包:')
    console.log('   npm publish --access public')
  }
}

// 运行检查
if (require.main === module) {
  const checker = new PublishChecker()
  checker.runAllChecks()
}

module.exports = PublishChecker