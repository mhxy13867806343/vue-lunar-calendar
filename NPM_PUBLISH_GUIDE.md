# NPM 发布指南

本指南将帮助您将 Vue 农历日历组件发布到 npm。

## 发布前准备

### 1. 确保代码质量

```bash
# 运行类型检查
npm run type-check

# 运行代码检查
npm run lint

# 运行测试
npm run test
```

### 2. 构建生产版本

```bash
# 构建库文件
npm run build:lib
```

构建完成后，`dist` 目录将包含：
- `index.es.js` - ES模块版本
- `index.umd.js` - UMD版本（支持浏览器直接引入）
- `index.d.ts` - TypeScript类型定义
- `style.css` - 样式文件

### 3. 验证构建结果

检查 `dist` 目录确保所有文件都已正确生成：

```bash
ls -la dist/
```

应该看到类似输出：
```
index.d.ts
index.es.js
index.umd.js
style.css
```

## 发布到 NPM

### 1. 登录 NPM

```bash
npm login
```

输入您的 npm 用户名、密码和邮箱。

### 2. 检查包信息

```bash
npm pack --dry-run
```

这将显示将要发布的文件列表，确保包含：
- `dist/` 目录下的所有文件
- `package.json`
- `README.md`
- 其他必要文件

### 3. 发布包

```bash
# 发布到 npm
npm publish

# 如果是第一次发布公开包
npm publish --access public
```

### 4. 验证发布

发布成功后，可以通过以下方式验证：

```bash
# 查看包信息
npm info vue-lunar-calendar

# 在新项目中安装测试
mkdir test-install && cd test-install
npm init -y
npm install vue-lunar-calendar
```

## 版本管理

### 更新版本号

```bash
# 补丁版本 (2.0.0 -> 2.0.1)
npm version patch

# 次要版本 (2.0.0 -> 2.1.0)
npm version minor

# 主要版本 (2.0.0 -> 3.0.0)
npm version major
```

### 发布新版本

```bash
# 1. 更新版本号
npm version patch

# 2. 构建
npm run build:lib

# 3. 发布
npm publish
```

## 包的使用方式

发布后，用户可以通过以下方式使用您的包：

### 安装

```bash
npm install vue-lunar-calendar
```

### 使用方式

#### 1. 全局注册（推荐）

```javascript
// main.js
import { createApp } from 'vue'
import VueLunarCalendar from 'vue-lunar-calendar'
import 'vue-lunar-calendar/style'

const app = createApp(App)
app.use(VueLunarCalendar)
app.mount('#app')
```

#### 2. 局部导入

```vue
<template>
  <VueLunarCalendar v-model="selectedDate" />
</template>

<script setup>
import { ref } from 'vue'
import { VueLunarCalendar } from 'vue-lunar-calendar'
import 'vue-lunar-calendar/style'

const selectedDate = ref('')
</script>
```

#### 3. 按需导入

```javascript
import { VueLunarCalendar, useCalendar } from 'vue-lunar-calendar'
```

## 发布检查清单

在发布前，请确保：

- [ ] 代码已通过所有测试
- [ ] 类型检查无错误
- [ ] 代码风格检查通过
- [ ] README.md 文档完整
- [ ] package.json 信息正确
- [ ] 版本号已更新
- [ ] 构建文件已生成
- [ ] 已登录 npm 账户
- [ ] 包名未被占用（首次发布）

## 常见问题

### 1. 包名已存在

如果包名 `vue-lunar-calendar` 已被占用，需要修改 `package.json` 中的 `name` 字段：

```json
{
  "name": "@mhxy13867806343/vue-lunar-calendar",
  // 或
  "name": "vue-lunar-calendar-pro"
}
```

### 2. 权限问题

如果遇到权限错误，确保：
- 已正确登录 npm
- 包名没有被其他用户占用
- 如果是 scoped 包，确保有发布权限

### 3. 构建失败

如果构建失败，检查：
- TypeScript 配置是否正确
- 依赖是否完整安装
- 入口文件路径是否正确

### 4. 类型定义问题

确保 `vite-plugin-dts` 正确生成了类型定义文件，并且 `package.json` 中的 `types` 字段指向正确的文件。

## 自动化发布（可选）

可以使用 GitHub Actions 自动化发布流程：

```yaml
# .github/workflows/publish.yml
name: Publish to NPM

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build:lib
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## 维护建议

1. **定期更新依赖**：保持依赖包的最新版本
2. **版本语义化**：遵循语义化版本规范
3. **变更日志**：维护 CHANGELOG.md 记录版本变更
4. **文档更新**：及时更新 README 和 API 文档
5. **社区支持**：及时回复 issues 和 pull requests

发布成功后，您的 Vue 农历日历组件就可以被全世界的开发者使用了！

## 致谢

本项目的农历算法基于原作者的开源项目：[https://github.com/mumuy/calendar](https://github.com/mumuy/calendar)

感谢原作者提供的优秀农历算法实现。