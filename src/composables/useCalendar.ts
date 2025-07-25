import { ref, computed, watch } from 'vue'
import type { DateInfo, CalendarEvent, CalendarProps } from '../types'
import { LunarCalendar } from '../module/calendar.js'

export function useCalendar(props: CalendarProps) {
  const currentDate = ref(new Date())
  const viewDate = ref(new Date())
  const selectedDates = ref<Date[]>([])
  const rangeStart = ref<Date | null>(null)
  const rangeEnd = ref<Date | null>(null)
  const isDragging = ref(false)
  
  // 当前年月 - 使用可写的computed
  const currentYear = computed({
    get: () => viewDate.value.getFullYear(),
    set: (year: number) => {
      const newDate = new Date(viewDate.value)
      newDate.setFullYear(year)
      viewDate.value = newDate
    }
  })
  
  const currentMonth = computed({
    get: () => viewDate.value.getMonth() + 1,
    set: (month: number) => {
      const newDate = new Date(viewDate.value)
      newDate.setMonth(month - 1)
      viewDate.value = newDate
    }
  })
  
  // 月份的第一天和最后一天
  const monthStart = computed(() => {
    return new Date(currentYear.value, currentMonth.value - 1, 1)
  })
  
  const monthEnd = computed(() => {
    return new Date(currentYear.value, currentMonth.value, 0)
  })
  
  // 日历网格数据（包含上月末尾和下月开头的日期）
  const calendarDates = computed(() => {
    const dates: DateInfo[] = []
    const start = new Date(monthStart.value)
    const end = new Date(monthEnd.value)
    
    // 获取月份第一天是星期几（0=周日，1=周一...）
    const firstDayOfWeek = start.getDay()
    const startOffset = props.weekStartsOn === 'monday' 
      ? (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1)
      : firstDayOfWeek
    
    // 添加上个月的日期
    for (let i = startOffset - 1; i >= 0; i--) {
      const date = new Date(start)
      date.setDate(date.getDate() - i - 1)
      dates.push(createDateInfo(date, false))
    }
    
    // 添加当前月的日期
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      dates.push(createDateInfo(new Date(date), true))
    }
    
    // 添加下个月的日期，确保总共42个格子（6周）
    const remainingCells = 42 - dates.length
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(end)
      date.setDate(date.getDate() + i)
      dates.push(createDateInfo(date, false))
    }
    
    return dates
  })
  
  // 创建日期信息对象
  const createDateInfo = (date: Date, isCurrentMonth: boolean): DateInfo => {
    const lunar = LunarCalendar.solar2lunar(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    )
    
    return {
      date: date.toISOString().split('T')[0],
      solar: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      },
      lunar: {
        year: lunar.lYear,
        month: lunar.lMonth,
        day: lunar.lDay,
        isLeap: lunar.isLeap,
        monthName: lunar.IMonthCn,
        dayName: lunar.IDayCn
      },
      // 兼容性属性
      sYear: date.getFullYear(),
      sMonth: date.getMonth() + 1,
      sDay: date.getDate(),
      lYear: lunar.lYear,
      lMonth: lunar.lMonth,
      lDay: lunar.lDay,
      zodiac: lunar.Animal,
      ganZhi: {
        year: lunar.gzYear,
        month: lunar.gzMonth,
        day: lunar.gzDay
      },
      solarTerm: lunar.Term || '',
      festival: lunar.festival || '',
      isToday: isSameDay(date, currentDate.value),
      isCurrentMonth,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      isHoliday: false, // 将在事件系统中处理
      isSelected: false, // 将在选择系统中处理
      isInRange: false, // 将在选择系统中处理
      isRangeStart: false,
      isRangeEnd: false,
      isDisabled: false // 将根据props.disabledDates处理
    }
  }
  
  // 导航方法
  const goToPreviousMonth = () => {
    const newDate = new Date(viewDate.value)
    newDate.setMonth(newDate.getMonth() - 1)
    viewDate.value = newDate
  }
  
  const goToNextMonth = () => {
    const newDate = new Date(viewDate.value)
    newDate.setMonth(newDate.getMonth() + 1)
    viewDate.value = newDate
  }
  
  const goToPreviousYear = () => {
    const newDate = new Date(viewDate.value)
    newDate.setFullYear(newDate.getFullYear() - 1)
    viewDate.value = newDate
  }
  
  const goToNextYear = () => {
    const newDate = new Date(viewDate.value)
    newDate.setFullYear(newDate.getFullYear() + 1)
    viewDate.value = newDate
  }
  
  const goToToday = () => {
    viewDate.value = new Date()
  }
  
  const goToDate = (date: Date) => {
    viewDate.value = new Date(date)
  }
  
  // 日期选择方法
  const selectDate = (date: Date, event?: MouseEvent) => {
    if (props.selectionMode === 'single') {
      selectedDates.value = [new Date(date)]
    } else if (props.selectionMode === 'multiple') {
      const index = selectedDates.value.findIndex(d => isSameDay(d, date))
      if (index >= 0) {
        selectedDates.value.splice(index, 1)
      } else {
        selectedDates.value.push(new Date(date))
      }
    } else if (props.selectionMode === 'range') {
      if (event?.shiftKey && rangeStart.value) {
        // Shift+点击选择范围
        rangeEnd.value = new Date(date)
        updateRangeSelection()
      } else if (!rangeStart.value || (rangeStart.value && rangeEnd.value)) {
        // 开始新的范围选择
        rangeStart.value = new Date(date)
        rangeEnd.value = null
        selectedDates.value = []
      } else {
        // 完成范围选择
        rangeEnd.value = new Date(date)
        updateRangeSelection()
      }
    }
  }
  
  const startDragSelection = (date: Date) => {
    if (props.selectionMode === 'range') {
      isDragging.value = true
      rangeStart.value = new Date(date)
      rangeEnd.value = null
    }
  }
  
  const updateDragSelection = (date: Date) => {
    if (isDragging.value && props.selectionMode === 'range') {
      rangeEnd.value = new Date(date)
    }
  }
  
  const endDragSelection = () => {
    if (isDragging.value) {
      isDragging.value = false
      if (rangeStart.value && rangeEnd.value) {
        updateRangeSelection()
      }
    }
  }
  
  const updateRangeSelection = () => {
    if (!rangeStart.value || !rangeEnd.value) return
    
    const start = new Date(Math.min(rangeStart.value.getTime(), rangeEnd.value.getTime()))
    const end = new Date(Math.max(rangeStart.value.getTime(), rangeEnd.value.getTime()))
    
    selectedDates.value = []
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      selectedDates.value.push(new Date(date))
    }
  }
  
  const clearSelection = () => {
    selectedDates.value = []
    rangeStart.value = null
    rangeEnd.value = null
  }
  
  // 工具函数
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
  }
  
  const isDateSelected = (date: Date): boolean => {
    return selectedDates.value.some(d => isSameDay(d, date))
  }
  
  const isDateInRange = (date: Date): boolean => {
    if (!rangeStart.value) return false
    if (!rangeEnd.value) return isSameDay(date, rangeStart.value)
    
    const start = Math.min(rangeStart.value.getTime(), rangeEnd.value.getTime())
    const end = Math.max(rangeStart.value.getTime(), rangeEnd.value.getTime())
    const time = date.getTime()
    
    return time >= start && time <= end
  }
  
  const isRangeStart = (date: Date): boolean => {
    if (!rangeStart.value || !rangeEnd.value) return false
    const start = rangeStart.value.getTime() <= rangeEnd.value.getTime() ? rangeStart.value : rangeEnd.value
    return isSameDay(date, start)
  }
  
  const isRangeEnd = (date: Date): boolean => {
    if (!rangeStart.value || !rangeEnd.value) return false
    const end = rangeStart.value.getTime() > rangeEnd.value.getTime() ? rangeStart.value : rangeEnd.value
    return isSameDay(date, end)
  }
  
  // 监听props变化
  watch(() => props.modelValue, (newValue) => {
    if (newValue) {
      if (Array.isArray(newValue)) {
        selectedDates.value = newValue.map(d => new Date(d))
      } else if (typeof newValue === 'string') {
        selectedDates.value = [new Date(newValue)]
      }
    } else {
      selectedDates.value = []
    }
  }, { immediate: true })
  
  return {
    // 状态
    currentDate,
    viewDate,
    selectedDates,
    rangeStart,
    rangeEnd,
    isDragging,
    
    // 计算属性
    currentYear,
    currentMonth,
    monthStart,
    monthEnd,
    calendarDates,
    
    // 导航方法
    prevMonth: goToPreviousMonth,
    nextMonth: goToNextMonth,
    prevYear: goToPreviousYear,
    nextYear: goToNextYear,
    goToday: goToToday,
    goToDate,
    
    // 选择方法
    selectDate,
    startDragSelection,
    updateDragSelection,
    endDragSelection,
    clearSelection,
    
    // 工具方法
    isSameDay,
    isDateSelected,
    isDateInRange,
    isRangeStart,
    isRangeEnd
  }
}