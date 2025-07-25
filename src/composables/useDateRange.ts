import { ref, computed, watch } from 'vue'
import type { DateInfo } from '../types'

export interface UseDateRangeOptions {
  startDate?: string | null
  endDate?: string | null
  minDate?: string | null
  maxDate?: string | null
  disabledDates?: string[]
  disabledDaysOfWeek?: number[]
  enabledDates?: string[]
}

export function useDateRange(props?: any, emit?: any) {
  const options: UseDateRangeOptions = props || {}
  const {
    startDate = null,
    endDate = null,
    minDate = null,
    maxDate = null,
    disabledDates = [],
    disabledDaysOfWeek = [],
    enabledDates = []
  } = options

  // 内部状态
  const rangeStart = ref<string | null>(startDate)
  const rangeEnd = ref<string | null>(endDate)
  const previewRange = ref<{ start: string; end: string } | null>(null)

  // 检查日期是否被禁用
  const isDateDisabled = (date: string): boolean => {
    const dateObj = new Date(date)
    const dayOfWeek = dateObj.getDay()

    // 检查最小日期
    if (minDate && date < minDate) {
      return true
    }

    // 检查最大日期
    if (maxDate && date > maxDate) {
      return true
    }

    // 检查禁用的日期
    if (disabledDates.includes(date)) {
      return true
    }

    // 检查禁用的星期几
    if (disabledDaysOfWeek.includes(dayOfWeek)) {
      return true
    }

    // 检查启用的日期（如果设置了启用日期列表）
    if (enabledDates.length > 0 && !enabledDates.includes(date)) {
      return true
    }

    return false
  }

  // 检查日期是否在范围内
  const isDateInRange = (date: string): boolean => {
    if (!rangeStart.value || !rangeEnd.value) {
      return false
    }

    return date >= rangeStart.value && date <= rangeEnd.value
  }

  // 检查日期是否在预览范围内
  const isDateInPreviewRange = (date: string): boolean => {
    if (!previewRange.value) {
      return false
    }

    return date >= previewRange.value.start && date <= previewRange.value.end
  }

  // 检查是否为范围开始日期
  const isRangeStartDate = (date: string): boolean => {
    return rangeStart.value === date
  }

  // 检查是否为范围结束日期
  const isRangeEndDate = (date: string): boolean => {
    return rangeEnd.value === date
  }

  // 设置范围开始日期
  const setRangeStart = (date: string | null): void => {
    if (date && isDateDisabled(date)) {
      return
    }

    rangeStart.value = date

    // 如果设置了开始日期，且结束日期早于开始日期，清除结束日期
    if (date && rangeEnd.value && rangeEnd.value < date) {
      rangeEnd.value = null
    }
  }

  // 设置范围结束日期
  const setRangeEnd = (date: string | null): void => {
    if (date && isDateDisabled(date)) {
      return
    }

    rangeEnd.value = date

    // 如果设置了结束日期，且开始日期晚于结束日期，清除开始日期
    if (date && rangeStart.value && rangeStart.value > date) {
      rangeStart.value = null
    }
  }

  // 设置完整范围
  const setRange = (start: string | null, end: string | null): void => {
    if (start && isDateDisabled(start)) {
      return
    }
    if (end && isDateDisabled(end)) {
      return
    }

    // 确保开始日期不晚于结束日期
    if (start && end && start > end) {
      [start, end] = [end, start]
    }

    rangeStart.value = start
    rangeEnd.value = end
  }

  // 清除范围
  const clearRange = (): void => {
    rangeStart.value = null
    rangeEnd.value = null
    previewRange.value = null
  }

  // 设置预览范围
  const setPreviewRange = (start: string, end: string): void => {
    if (start > end) {
      [start, end] = [end, start]
    }

    previewRange.value = { start, end }
  }

  // 清除预览范围
  const clearPreviewRange = (): void => {
    previewRange.value = null
  }

  // 获取范围内的所有日期
  const getDatesInRange = (): string[] => {
    if (!rangeStart.value || !rangeEnd.value) {
      return []
    }

    const dates: string[] = []
    const current = new Date(rangeStart.value)
    const end = new Date(rangeEnd.value)

    while (current <= end) {
      dates.push(current.toISOString().split('T')[0])
      current.setDate(current.getDate() + 1)
    }

    return dates
  }

  // 获取范围天数
  const getRangeDays = (): number => {
    if (!rangeStart.value || !rangeEnd.value) {
      return 0
    }

    const start = new Date(rangeStart.value)
    const end = new Date(rangeEnd.value)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  // 检查范围是否有效
  const isRangeValid = computed((): boolean => {
    if (!rangeStart.value || !rangeEnd.value) {
      return false
    }

    return rangeStart.value <= rangeEnd.value
  })

  // 检查范围是否完整
  const isRangeComplete = computed((): boolean => {
    return !!(rangeStart.value && rangeEnd.value)
  })

  // 当前范围值
  const currentRange = computed(() => {
    if (!rangeStart.value || !rangeEnd.value) {
      return null
    }

    return {
      start: rangeStart.value,
      end: rangeEnd.value,
      days: getRangeDays(),
      dates: getDatesInRange()
    }
  })

  // 获取下一个可用日期
  const getNextAvailableDate = (date: string, direction: 'forward' | 'backward' = 'forward'): string | null => {
    const current = new Date(date)
    const increment = direction === 'forward' ? 1 : -1
    let attempts = 0
    const maxAttempts = 365 // 防止无限循环

    while (attempts < maxAttempts) {
      const dateStr = current.toISOString().split('T')[0]
      
      if (!isDateDisabled(dateStr)) {
        return dateStr
      }

      current.setDate(current.getDate() + increment)
      attempts++
    }

    return null
  }

  // 鼠标事件处理
  const isDragging = ref(false)
  const dragStartDate = ref<string | null>(null)
  
  const onMouseDown = (event: MouseEvent) => {
    if (props?.mode !== 'range') return
    isDragging.value = true
    event.preventDefault()
  }
  
  const onMouseMove = (event: MouseEvent) => {
    if (!isDragging.value || props?.mode !== 'range') return
    // 处理鼠标移动逻辑
  }
  
  const onMouseUp = (event: MouseEvent) => {
    isDragging.value = false
    dragStartDate.value = null
  }
  
  const onMouseLeave = (event: MouseEvent) => {
    isDragging.value = false
    clearPreviewRange()
  }
  
  const onDateHover = (date: any) => {
    if (props?.mode !== 'range' || !isDragging.value) return
    // 处理日期悬停逻辑
  }

  return {
    // 状态
    rangeStart,
    rangeEnd,
    previewRange,
    isRangeValid,
    isRangeComplete,
    currentRange,

    // 方法（兼容旧接口）
    isDateDisabled,
    isDateInRange,
    isDateInPreviewRange,
    isRangeStartDate,
    isRangeEndDate,
    // 新接口别名
    isInRange: isDateInRange,
    isRangeStart: isRangeStartDate,
    isRangeEnd: isRangeEndDate,
    setRangeStart,
    setRangeEnd,
    setRange,
    clearRange,
    setPreviewRange,
    clearPreviewRange,
    getDatesInRange,
    getRangeDays,
    getNextAvailableDate,
    
    // 鼠标事件
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onDateHover
  }
}