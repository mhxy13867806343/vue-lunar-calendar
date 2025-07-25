import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { DateInfo } from '../types'

export function useAccessibility() {
  const focusedDate = ref<Date | null>(null)
  const isKeyboardNavigation = ref(false)
  const announcements = ref<string[]>([])
  
  // 键盘导航处理
  const handleKeyDown = (event: KeyboardEvent, calendarDates: DateInfo[], onDateSelect: (date: Date) => void) => {
    if (!focusedDate.value) {
      // 如果没有焦点日期，设置为今天
      focusedDate.value = new Date()
      isKeyboardNavigation.value = true
      return
    }
    
    const currentIndex = calendarDates.findIndex(dateInfo => 
      isSameDay(dateInfo.date, focusedDate.value!)
    )
    
    if (currentIndex === -1) return
    
    let newIndex = currentIndex
    let handled = true
    
    switch (event.key) {
      case 'ArrowLeft':
        newIndex = Math.max(0, currentIndex - 1)
        break
      case 'ArrowRight':
        newIndex = Math.min(calendarDates.length - 1, currentIndex + 1)
        break
      case 'ArrowUp':
        newIndex = Math.max(0, currentIndex - 7)
        break
      case 'ArrowDown':
        newIndex = Math.min(calendarDates.length - 1, currentIndex + 7)
        break
      case 'Home':
        // 移动到当前行的第一天
        const currentRow = Math.floor(currentIndex / 7)
        newIndex = currentRow * 7
        break
      case 'End':
        // 移动到当前行的最后一天
        const currentRowEnd = Math.floor(currentIndex / 7)
        newIndex = Math.min(calendarDates.length - 1, (currentRowEnd + 1) * 7 - 1)
        break
      case 'PageUp':
        // 上个月的同一天
        if (event.shiftKey) {
          // Shift+PageUp: 上一年
          const newDate = new Date(focusedDate.value)
          newDate.setFullYear(newDate.getFullYear() - 1)
          focusedDate.value = newDate
          announce(`移动到 ${formatDateForAnnouncement(newDate)}`)
          return
        } else {
          const newDate = new Date(focusedDate.value)
          newDate.setMonth(newDate.getMonth() - 1)
          focusedDate.value = newDate
          announce(`移动到 ${formatDateForAnnouncement(newDate)}`)
          return
        }
      case 'PageDown':
        // 下个月的同一天
        if (event.shiftKey) {
          // Shift+PageDown: 下一年
          const newDate = new Date(focusedDate.value)
          newDate.setFullYear(newDate.getFullYear() + 1)
          focusedDate.value = newDate
          announce(`移动到 ${formatDateForAnnouncement(newDate)}`)
          return
        } else {
          const newDate = new Date(focusedDate.value)
          newDate.setMonth(newDate.getMonth() + 1)
          focusedDate.value = newDate
          announce(`移动到 ${formatDateForAnnouncement(newDate)}`)
          return
        }
      case 'Enter':
      case ' ':
        // 选择当前焦点日期
        onDateSelect(focusedDate.value)
        announce(`选择了 ${formatDateForAnnouncement(focusedDate.value)}`)
        break
      case 'Escape':
        // 清除焦点
        focusedDate.value = null
        isKeyboardNavigation.value = false
        announce('退出日期选择')
        break
      default:
        handled = false
    }
    
    if (handled) {
      event.preventDefault()
      isKeyboardNavigation.value = true
      
      if (newIndex !== currentIndex && calendarDates[newIndex]) {
        focusedDate.value = new Date(calendarDates[newIndex].date)
        announce(`焦点移动到 ${formatDateForAnnouncement(focusedDate.value)}`)
      }
    }
  }
  
  // 鼠标交互处理
  const handleMouseEnter = (date: Date) => {
    if (!isKeyboardNavigation.value) {
      focusedDate.value = new Date(date)
    }
  }
  
  const handleMouseLeave = () => {
    if (!isKeyboardNavigation.value) {
      focusedDate.value = null
    }
  }
  
  const handleClick = (date: Date) => {
    focusedDate.value = new Date(date)
    isKeyboardNavigation.value = false
  }
  
  // 生成ARIA标签
  const getDateAriaLabel = (dateInfo: DateInfo): string => {
    const parts: string[] = []
    
    // 基本日期信息
    parts.push(formatDateForAnnouncement(dateInfo.date))
    
    // 农历信息
    if (dateInfo.lunar.monthName && dateInfo.lunar.dayName) {
      parts.push(`农历${dateInfo.lunar.monthName}${dateInfo.lunar.dayName}`)
    }
    
    // 状态信息
    if (dateInfo.isToday) {
      parts.push('今天')
    }
    
    if (dateInfo.isSelected) {
      parts.push('已选择')
    }
    
    if (dateInfo.isWeekend) {
      parts.push('周末')
    }
    
    if (dateInfo.isHoliday) {
      parts.push('节假日')
    }
    
    if (dateInfo.festival) {
      parts.push(`节日：${dateInfo.festival}`)
    }
    
    if (dateInfo.solarTerm) {
      parts.push(`节气：${dateInfo.solarTerm}`)
    }
    
    if (dateInfo.isDisabled) {
      parts.push('不可选择')
    }
    
    return parts.join('，')
  }
  
  // 生成日历网格的ARIA属性
  const getCalendarGridProps = () => {
    return {
      role: 'grid',
      'aria-label': '日历',
      'aria-readonly': 'false',
      'aria-multiselectable': 'false' // 根据选择模式动态设置
    }
  }
  
  // 生成日期单元格的ARIA属性
  const getDateCellProps = (dateInfo: DateInfo) => {
    const isFocused = focusedDate.value && isSameDay(dateInfo.date, focusedDate.value)
    
    return {
      role: 'gridcell',
      'aria-label': getDateAriaLabel(dateInfo),
      'aria-selected': dateInfo.isSelected ? 'true' : 'false',
      'aria-disabled': dateInfo.isDisabled ? 'true' : 'false',
      'aria-current': dateInfo.isToday ? 'date' : undefined,
      tabindex: isFocused ? 0 : -1,
      'data-date': dateInfo.date.toISOString().split('T')[0]
    }
  }
  
  // 生成导航按钮的ARIA属性
  const getNavigationButtonProps = (type: 'prevYear' | 'nextYear' | 'prevMonth' | 'nextMonth' | 'today') => {
    const labels = {
      prevYear: '上一年',
      nextYear: '下一年',
      prevMonth: '上个月',
      nextMonth: '下个月',
      today: '回到今天'
    }
    
    return {
      'aria-label': labels[type],
      type: 'button'
    }
  }
  
  // 屏幕阅读器公告
  const announce = (message: string) => {
    announcements.value.push(message)
    
    // 自动清理旧的公告
    setTimeout(() => {
      const index = announcements.value.indexOf(message)
      if (index > -1) {
        announcements.value.splice(index, 1)
      }
    }, 1000)
  }
  
  // 公告月份变化
  const announceMonthChange = (year: number, month: number) => {
    announce(`切换到 ${year}年${month}月`)
  }
  
  // 公告选择变化
  const announceSelectionChange = (selectedDates: Date[]) => {
    if (selectedDates.length === 0) {
      announce('清除了所有选择')
    } else if (selectedDates.length === 1) {
      announce(`选择了 ${formatDateForAnnouncement(selectedDates[0])}`)
    } else {
      announce(`选择了 ${selectedDates.length} 个日期`)
    }
  }
  
  // 公告范围选择
  const announceRangeSelection = (startDate: Date, endDate: Date) => {
    const start = formatDateForAnnouncement(startDate)
    const end = formatDateForAnnouncement(endDate)
    announce(`选择了日期范围：从 ${start} 到 ${end}`)
  }
  
  // 格式化日期用于公告
  const formatDateForAnnouncement = (date: Date): string => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const weekday = weekdays[date.getDay()]
    
    return `${year}年${month}月${day}日 ${weekday}`
  }
  
  // 检查是否为同一天
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
  }
  
  // 焦点管理
  const focusDate = (date: Date) => {
    focusedDate.value = new Date(date)
    isKeyboardNavigation.value = true
    
    // 确保对应的DOM元素获得焦点
    setTimeout(() => {
      const dateStr = date.toISOString().split('T')[0]
      const element = document.querySelector(`[data-date="${dateStr}"]`) as HTMLElement
      if (element) {
        element.focus()
      }
    }, 0)
  }
  
  const clearFocus = () => {
    focusedDate.value = null
    isKeyboardNavigation.value = false
  }
  
  // 高对比度模式检测
  const isHighContrast = ref(false)
  
  const detectHighContrast = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-contrast: high)')
      isHighContrast.value = mediaQuery.matches
      
      const handleChange = (e: MediaQueryListEvent) => {
        isHighContrast.value = e.matches
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    return () => {}
  }
  
  // 减少动画偏好检测
  const prefersReducedMotion = ref(false)
  
  const detectReducedMotion = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      prefersReducedMotion.value = mediaQuery.matches
      
      const handleChange = (e: MediaQueryListEvent) => {
        prefersReducedMotion.value = e.matches
      }
      
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
    return () => {}
  }
  
  // 生命周期
  let cleanupHighContrast: () => void
  let cleanupReducedMotion: () => void
  
  onMounted(() => {
    cleanupHighContrast = detectHighContrast()
    cleanupReducedMotion = detectReducedMotion()
  })
  
  onUnmounted(() => {
    cleanupHighContrast?.()
    cleanupReducedMotion?.()
  })
  
  return {
    // 状态
    focusedDate,
    isKeyboardNavigation,
    announcements,
    isHighContrast,
    prefersReducedMotion,
    
    // 键盘导航
    handleKeyDown,
    
    // 鼠标交互
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    
    // ARIA属性生成
    getDateAriaLabel,
    getCalendarGridProps,
    getDateCellProps,
    getNavigationButtonProps,
    
    // 屏幕阅读器公告
    announce,
    announceMonthChange,
    announceSelectionChange,
    announceRangeSelection,
    
    // 焦点管理
    focusDate,
    clearFocus,
    
    // 工具方法
    formatDateForAnnouncement,
    isSameDay
  }
}