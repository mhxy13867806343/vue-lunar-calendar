import { ref, computed, watch, onMounted } from 'vue'
import type { CalendarTheme } from '../types'

// 默认主题配置
const defaultLightTheme: CalendarTheme = {
  primary: '#2196f3',
  secondary: '#1976d2',
  background: '#ffffff',
  text: '#333333',
  border: '#e0e0e0',
  hover: '#f5f5f5',
  selected: '#2196f3',
  today: '#ff5722',
  weekend: '#f44336',
  holiday: '#4caf50',
  disabled: '#bdbdbd'
}

const defaultDarkTheme: CalendarTheme = {
  primary: '#64b5f6',
  secondary: '#42a5f5',
  background: '#121212',
  text: '#ffffff',
  border: '#333333',
  hover: '#1e1e1e',
  selected: '#64b5f6',
  today: '#ff7043',
  weekend: '#ef5350',
  holiday: '#66bb6a',
  disabled: '#616161'
}

export function useTheme(initialTheme: 'light' | 'dark' | 'auto' = 'auto', customTheme?: Partial<CalendarTheme>) {
  const currentTheme = ref<'light' | 'dark' | 'auto'>(initialTheme)
  const systemPrefersDark = ref(false)
  const customThemeConfig = ref<Partial<CalendarTheme>>(customTheme || {})
  
  // 检测系统主题偏好
  const detectSystemTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      systemPrefersDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }
  
  // 实际使用的主题模式
  const effectiveTheme = computed(() => {
    if (currentTheme.value === 'auto') {
      return systemPrefersDark.value ? 'dark' : 'light'
    }
    return currentTheme.value
  })
  
  // 当前主题配置
  const themeConfig = computed((): CalendarTheme => {
    const baseTheme = effectiveTheme.value === 'dark' ? defaultDarkTheme : defaultLightTheme
    return {
      ...baseTheme,
      ...customThemeConfig.value
    }
  })
  
  // CSS变量映射
  const cssVariables = computed(() => {
    const theme = themeConfig.value
    return {
      '--calendar-primary': theme.primary,
      '--calendar-secondary': theme.secondary,
      '--calendar-background': theme.background,
      '--calendar-text': theme.text,
      '--calendar-border': theme.border,
      '--calendar-hover': theme.hover,
      '--calendar-selected': theme.selected,
      '--calendar-today': theme.today,
      '--calendar-weekend': theme.weekend,
      '--calendar-holiday': theme.holiday,
      '--calendar-disabled': theme.disabled
    }
  })
  
  // 应用主题到DOM
  const applyTheme = () => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      const variables = cssVariables.value
      
      Object.entries(variables).forEach(([key, value]) => {
        root.style.setProperty(key, value)
      })
      
      // 添加主题类名
      root.classList.remove('theme-light', 'theme-dark')
      root.classList.add(`theme-${effectiveTheme.value}`)
    }
  }
  
  // 切换主题
  const setTheme = (theme: 'light' | 'dark' | 'auto') => {
    currentTheme.value = theme
    saveThemePreference(theme)
  }
  
  // 切换深色模式
  const toggleDarkMode = () => {
    if (currentTheme.value === 'auto') {
      setTheme(systemPrefersDark.value ? 'light' : 'dark')
    } else {
      setTheme(currentTheme.value === 'dark' ? 'light' : 'dark')
    }
  }
  
  // 更新自定义主题
  const updateCustomTheme = (updates: Partial<CalendarTheme>) => {
    customThemeConfig.value = {
      ...customThemeConfig.value,
      ...updates
    }
    saveCustomTheme(customThemeConfig.value)
  }
  
  // 重置自定义主题
  const resetCustomTheme = () => {
    customThemeConfig.value = {}
    saveCustomTheme({})
  }
  
  // 获取颜色的对比色（用于文本）
  const getContrastColor = (backgroundColor: string): string => {
    // 简单的对比度计算
    const hex = backgroundColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? '#000000' : '#ffffff'
  }
  
  // 生成主题色调变化
  const generateColorVariants = (baseColor: string) => {
    const hex = baseColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    
    return {
      lighter: `rgb(${Math.min(255, r + 30)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 30)})`,
      light: `rgb(${Math.min(255, r + 15)}, ${Math.min(255, g + 15)}, ${Math.min(255, b + 15)})`,
      base: baseColor,
      dark: `rgb(${Math.max(0, r - 15)}, ${Math.max(0, g - 15)}, ${Math.max(0, b - 15)})`,
      darker: `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`
    }
  }
  
  // 预设主题
  const presetThemes = {
    blue: {
      primary: '#2196f3',
      secondary: '#1976d2',
      selected: '#2196f3'
    },
    green: {
      primary: '#4caf50',
      secondary: '#388e3c',
      selected: '#4caf50'
    },
    purple: {
      primary: '#9c27b0',
      secondary: '#7b1fa2',
      selected: '#9c27b0'
    },
    orange: {
      primary: '#ff9800',
      secondary: '#f57c00',
      selected: '#ff9800'
    },
    red: {
      primary: '#f44336',
      secondary: '#d32f2f',
      selected: '#f44336'
    }
  }
  
  // 应用预设主题
  const applyPresetTheme = (presetName: keyof typeof presetThemes) => {
    const preset = presetThemes[presetName]
    if (preset) {
      updateCustomTheme(preset)
    }
  }
  
  // 本地存储
  const saveThemePreference = (theme: string) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('vue-calendar-theme', theme)
    }
  }
  
  const loadThemePreference = (): 'light' | 'dark' | 'auto' => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('vue-calendar-theme')
      if (saved && ['light', 'dark', 'auto'].includes(saved)) {
        return saved as 'light' | 'dark' | 'auto'
      }
    }
    return 'auto'
  }
  
  const saveCustomTheme = (theme: Partial<CalendarTheme>) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('vue-calendar-custom-theme', JSON.stringify(theme))
    }
  }
  
  const loadCustomTheme = (): Partial<CalendarTheme> => {
    if (typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem('vue-calendar-custom-theme')
        return saved ? JSON.parse(saved) : {}
      } catch (error) {
        console.warn('加载自定义主题失败:', error)
        return {}
      }
    }
    return {}
  }
  
  // 监听系统主题变化
  const setupSystemThemeListener = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = (e: MediaQueryListEvent) => {
        systemPrefersDark.value = e.matches
      }
      
      mediaQuery.addEventListener('change', handleChange)
      
      // 返回清理函数
      return () => {
        mediaQuery.removeEventListener('change', handleChange)
      }
    }
    return () => {}
  }
  
  // 初始化
  onMounted(() => {
    // 检测系统主题
    detectSystemTheme()
    
    // 加载保存的主题偏好
    const savedTheme = loadThemePreference()
    const savedCustomTheme = loadCustomTheme()
    
    currentTheme.value = savedTheme
    customThemeConfig.value = savedCustomTheme
    
    // 设置系统主题监听
    const cleanup = setupSystemThemeListener()
    
    // 应用主题
    applyTheme()
    
    // 组件卸载时清理
    return cleanup
  })
  
  // 监听主题变化
  watch([effectiveTheme, customThemeConfig], () => {
    applyTheme()
  }, { deep: true })
  
  return {
    // 状态
    currentTheme,
    systemPrefersDark,
    customThemeConfig,
    
    // 计算属性
    effectiveTheme,
    themeConfig,
    cssVariables,
    
    // 方法
    setTheme,
    toggleDarkMode,
    updateCustomTheme,
    resetCustomTheme,
    applyPresetTheme,
    
    // 工具方法
    getContrastColor,
    generateColorVariants,
    
    // 预设主题
    presetThemes
  }
}