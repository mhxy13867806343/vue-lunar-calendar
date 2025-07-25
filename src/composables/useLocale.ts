import { ref, computed, watch } from 'vue'
import type { CalendarLocale } from '../types'

// 默认语言配置
const defaultLocales: Record<string, CalendarLocale> = {
  'zh-CN': {
    name: '简体中文',
    weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    weekdaysShort: ['日', '一', '二', '三', '四', '五', '六'],
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    monthsShort: [
      '1月', '2月', '3月', '4月', '5月', '6月',
      '7月', '8月', '9月', '10月', '11月', '12月'
    ],
    today: '今天',
    clear: '清除',
    confirm: '确认',
    cancel: '取消',
    prevYear: '上一年',
    nextYear: '下一年',
    prevMonth: '上个月',
    nextMonth: '下个月',
    yearFormat: 'YYYY年',
    monthFormat: 'M月',
    dateFormat: 'YYYY-MM-DD'
  },
  'zh-TW': {
    name: '繁體中文',
    weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    weekdaysShort: ['日', '一', '二', '三', '四', '五', '六'],
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    monthsShort: [
      '1月', '2月', '3月', '4月', '5月', '6月',
      '7月', '8月', '9月', '10月', '11月', '12月'
    ],
    today: '今天',
    clear: '清除',
    confirm: '確認',
    cancel: '取消',
    prevYear: '上一年',
    nextYear: '下一年',
    prevMonth: '上個月',
    nextMonth: '下個月',
    yearFormat: 'YYYY年',
    monthFormat: 'M月',
    dateFormat: 'YYYY-MM-DD'
  },
  'en-US': {
    name: 'English (US)',
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    monthsShort: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    today: 'Today',
    clear: 'Clear',
    confirm: 'Confirm',
    cancel: 'Cancel',
    prevYear: 'Previous Year',
    nextYear: 'Next Year',
    prevMonth: 'Previous Month',
    nextMonth: 'Next Month',
    yearFormat: 'YYYY',
    monthFormat: 'MMMM',
    dateFormat: 'MM/DD/YYYY'
  },
  'en-GB': {
    name: 'English (UK)',
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    monthsShort: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    today: 'Today',
    clear: 'Clear',
    confirm: 'Confirm',
    cancel: 'Cancel',
    prevYear: 'Previous Year',
    nextYear: 'Next Year',
    prevMonth: 'Previous Month',
    nextMonth: 'Next Month',
    yearFormat: 'YYYY',
    monthFormat: 'MMMM',
    dateFormat: 'DD/MM/YYYY'
  },
  'ja-JP': {
    name: '日本語',
    weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
    months: [
      '1月', '2月', '3月', '4月', '5月', '6月',
      '7月', '8月', '9月', '10月', '11月', '12月'
    ],
    monthsShort: [
      '1月', '2月', '3月', '4月', '5月', '6月',
      '7月', '8月', '9月', '10月', '11月', '12月'
    ],
    today: '今日',
    clear: 'クリア',
    confirm: '確認',
    cancel: 'キャンセル',
    prevYear: '前年',
    nextYear: '翌年',
    prevMonth: '前月',
    nextMonth: '翌月',
    yearFormat: 'YYYY年',
    monthFormat: 'M月',
    dateFormat: 'YYYY/MM/DD'
  },
  'ko-KR': {
    name: '한국어',
    weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
    months: [
      '1월', '2월', '3월', '4월', '5월', '6월',
      '7월', '8월', '9월', '10월', '11월', '12월'
    ],
    monthsShort: [
      '1월', '2월', '3월', '4월', '5월', '6월',
      '7월', '8월', '9월', '10월', '11월', '12월'
    ],
    today: '오늘',
    clear: '지우기',
    confirm: '확인',
    cancel: '취소',
    prevYear: '이전 년도',
    nextYear: '다음 년도',
    prevMonth: '이전 달',
    nextMonth: '다음 달',
    yearFormat: 'YYYY년',
    monthFormat: 'M월',
    dateFormat: 'YYYY-MM-DD'
  }
}

// 农历相关翻译
const lunarTranslations: Record<string, Record<string, string>> = {
  'zh-CN': {
    'lunar': '农历',
    'solar': '公历',
    'zodiac': '生肖',
    'ganZhi': '干支',
    'solarTerm': '节气',
    'festival': '节日',
    'leap': '闰',
    'month': '月',
    'day': '日'
  },
  'zh-TW': {
    'lunar': '農曆',
    'solar': '公曆',
    'zodiac': '生肖',
    'ganZhi': '干支',
    'solarTerm': '節氣',
    'festival': '節日',
    'leap': '閏',
    'month': '月',
    'day': '日'
  },
  'en-US': {
    'lunar': 'Lunar',
    'solar': 'Solar',
    'zodiac': 'Zodiac',
    'ganZhi': 'Gan Zhi',
    'solarTerm': 'Solar Term',
    'festival': 'Festival',
    'leap': 'Leap',
    'month': 'Month',
    'day': 'Day'
  },
  'en-GB': {
    'lunar': 'Lunar',
    'solar': 'Solar',
    'zodiac': 'Zodiac',
    'ganZhi': 'Gan Zhi',
    'solarTerm': 'Solar Term',
    'festival': 'Festival',
    'leap': 'Leap',
    'month': 'Month',
    'day': 'Day'
  },
  'ja-JP': {
    'lunar': '旧暦',
    'solar': '新暦',
    'zodiac': '十二支',
    'ganZhi': '干支',
    'solarTerm': '二十四節気',
    'festival': '祭日',
    'leap': '閏',
    'month': '月',
    'day': '日'
  },
  'ko-KR': {
    'lunar': '음력',
    'solar': '양력',
    'zodiac': '띠',
    'ganZhi': '간지',
    'solarTerm': '절기',
    'festival': '명절',
    'leap': '윤',
    'month': '월',
    'day': '일'
  }
}

export function useLocale(props?: any) {
  const initialLocale = props?.locale || 'zh-CN'
  const currentLocale = ref<string>(initialLocale)
  const customLocales = ref<Record<string, CalendarLocale>>({})
  
  // 检测浏览器语言
  const detectBrowserLocale = (): string => {
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language || (navigator as any).userLanguage
      
      // 精确匹配
      if (defaultLocales[browserLang]) {
        return browserLang
      }
      
      // 语言代码匹配（如 en-US -> en）
      const langCode = browserLang.split('-')[0]
      const matchedLocale = Object.keys(defaultLocales).find(locale => 
        locale.startsWith(langCode)
      )
      
      return matchedLocale || 'zh-CN'
    }
    return 'zh-CN'
  }
  
  // 当前语言配置
  const locale = computed((): CalendarLocale => {
    const custom = customLocales.value[currentLocale.value]
    const defaultLocale = defaultLocales[currentLocale.value] || defaultLocales['zh-CN']
    
    return {
      ...defaultLocale,
      ...custom
    }
  })
  
  // 可用语言列表
  const availableLocales = computed(() => {
    const locales = { ...defaultLocales, ...customLocales.value }
    return Object.keys(locales).map(key => ({
      code: key,
      name: locales[key].name
    }))
  })
  
  // 农历翻译
  const lunarTexts = computed(() => {
    return lunarTranslations[currentLocale.value] || lunarTranslations['zh-CN']
  })
  
  // 星期显示
  const weekdaysDisplay = computed(() => {
    const firstDayOfWeek = props?.firstDayOfWeek || 1
    const weekdays = locale.value.weekdaysShort
    if (firstDayOfWeek === 0) {
      return weekdays // 周日开始
    } else {
      return [...weekdays.slice(1), weekdays[0]] // 周一开始
    }
  })
  
  // 设置语言
  const setLocale = (localeCode: string) => {
    if (defaultLocales[localeCode] || customLocales.value[localeCode]) {
      currentLocale.value = localeCode
      saveLocalePreference(localeCode)
    } else {
      console.warn(`语言 ${localeCode} 不存在`)
    }
  }
  
  // 添加自定义语言
  const addCustomLocale = (code: string, config: CalendarLocale) => {
    customLocales.value[code] = config
    saveCustomLocales()
  }
  
  // 更新语言配置
  const updateLocale = (code: string, updates: Partial<CalendarLocale>) => {
    if (defaultLocales[code]) {
      // 更新默认语言需要通过自定义语言覆盖
      customLocales.value[code] = {
        ...defaultLocales[code],
        ...customLocales.value[code],
        ...updates
      }
    } else if (customLocales.value[code]) {
      customLocales.value[code] = {
        ...customLocales.value[code],
        ...updates
      }
    }
    saveCustomLocales()
  }
  
  // 删除自定义语言
  const removeCustomLocale = (code: string) => {
    if (customLocales.value[code]) {
      delete customLocales.value[code]
      saveCustomLocales()
      
      // 如果删除的是当前语言，切换到默认语言
      if (currentLocale.value === code) {
        setLocale('zh-CN')
      }
    }
  }
  
  // 格式化日期
  const formatDate = (date: Date, format?: string): string => {
    const formatStr = format || locale.value.dateFormat
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    
    let result = formatStr
    // 按照长度从长到短替换，避免重复替换
    result = result.replace(/YYYY/g, year.toString())
    result = result.replace(/YY/g, year.toString().slice(-2))
    result = result.replace(/MMMM/g, locale.value.months[month - 1] || '')
    result = result.replace(/MMM/g, locale.value.monthsShort[month - 1] || '')
    result = result.replace(/MM/g, month.toString().padStart(2, '0'))
    result = result.replace(/M/g, month.toString())
    result = result.replace(/DD/g, day.toString().padStart(2, '0'))
    result = result.replace(/D/g, day.toString())
    
    return result
  }
  
  // 格式化年份
  const formatYear = (year: number): string => {
    const format = locale.value.yearFormat || 'YYYY'
    return format.replace(/YYYY/g, year.toString())
  }
  
  // 格式化月份
  const formatMonth = (month: number): string => {
    return locale.value.monthFormat
      .replace(/MMMM/g, locale.value.months[month - 1])
      .replace(/MMM/g, locale.value.monthsShort[month - 1])
      .replace(/MM/g, month.toString().padStart(2, '0'))
      .replace(/M/g, month.toString())
  }
  
  // 获取星期名称
  const getWeekdayName = (dayOfWeek: number, short: boolean = false): string => {
    const names = short ? locale.value.weekdaysShort : locale.value.weekdays
    return names[dayOfWeek] || ''
  }
  
  // 获取月份名称
  const getMonthName = (month: number, short: boolean = false): string => {
    const names = short ? locale.value.monthsShort : locale.value.months
    return names[month - 1] || ''
  }
  
  // 翻译文本
  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.')
    let value: any = locale.value
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) break
    }
    
    if (typeof value === 'string') {
      return value
    }
    
    // 尝试农历翻译
    const lunarText = lunarTexts.value[key]
    if (lunarText) {
      return lunarText
    }
    
    return fallback || key
  }
  
  // 获取RTL方向
  const isRTL = computed(() => {
    const rtlLocales = ['ar', 'he', 'fa', 'ur']
    const localeStr = String(currentLocale.value || 'zh-CN')
    const langCode = localeStr.split('-')[0]
    return rtlLocales.includes(langCode)
  })
  
  // 本地存储
  const saveLocalePreference = (locale: string) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('vue-calendar-locale', locale)
    }
  }
  
  const loadLocalePreference = (): string => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('vue-calendar-locale')
      if (saved && (defaultLocales[saved] || customLocales.value[saved])) {
        return saved
      }
    }
    return detectBrowserLocale()
  }
  
  const saveCustomLocales = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('vue-calendar-custom-locales', JSON.stringify(customLocales.value))
    }
  }
  
  const loadCustomLocales = (): Record<string, CalendarLocale> => {
    if (typeof localStorage !== 'undefined') {
      try {
        const saved = localStorage.getItem('vue-calendar-custom-locales')
        return saved ? JSON.parse(saved) : {}
      } catch (error) {
        console.warn('加载自定义语言失败:', error)
        return {}
      }
    }
    return {}
  }
  
  // 初始化
  const init = () => {
    // 加载自定义语言
    customLocales.value = loadCustomLocales()
    
    // 加载语言偏好
    const savedLocale = loadLocalePreference()
    currentLocale.value = savedLocale
  }
  
  // 监听语言变化
  watch(currentLocale, (newLocale) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLocale
      document.documentElement.dir = isRTL.value ? 'rtl' : 'ltr'
    }
  }, { immediate: true })
  
  // 初始化
  init()
  
  return {
    // 状态
    currentLocale,
    customLocales,

    // 计算属性
    locale,
    availableLocales,
    lunarTexts,
    weekdaysDisplay,
    isRTL,

    // 方法
    setLocale,
    addCustomLocale,
    updateLocale,
    removeCustomLocale,

    // 格式化方法
    formatDate,
    formatYear,
    formatMonth,
    getWeekdayName,
    getMonthName,

    // 翻译方法
    t,

    // 工具方法
    detectBrowserLocale
  }
}