import { ref, computed, watch } from 'vue'
import type { DateInfo } from '../types'

export type SelectionMode = 'single' | 'multiple' | 'range'

export interface UseSelectionOptions {
  mode?: SelectionMode
  modelValue?: string | string[] | null
  disabled?: (date: string) => boolean
  readonly?: boolean
}

export function useSelection(props?: any, emit?: any) {
  const options: UseSelectionOptions = props || {}
  const {
    mode = 'single',
    modelValue = null,
    disabled = () => false,
    readonly = false
  } = options

  // 内部选择状态
  const selectedDates = ref<string[]>([])
  const hoveredDate = ref<string | null>(null)
  const isDragging = ref(false)
  const dragStartDate = ref<string | null>(null)

  // 初始化选择状态
  const initializeSelection = () => {
    if (!modelValue) {
      selectedDates.value = []
      return
    }

    if (Array.isArray(modelValue)) {
      selectedDates.value = [...modelValue]
    } else {
      selectedDates.value = [modelValue]
    }
  }

  // 检查日期是否被选中
  const isSelected = (date: string): boolean => {
    return selectedDates.value.includes(date)
  }

  // 检查日期是否在范围内
  const isInRange = (date: string): boolean => {
    if (mode !== 'range' || selectedDates.value.length !== 2) {
      return false
    }

    const [start, end] = selectedDates.value.sort()
    return date > start && date < end
  }

  // 检查是否为范围开始
  const isRangeStart = (date: string): boolean => {
    if (mode !== 'range' || selectedDates.value.length === 0) {
      return false
    }

    const sortedDates = selectedDates.value.sort()
    return date === sortedDates[0]
  }

  // 检查是否为范围结束
  const isRangeEnd = (date: string): boolean => {
    if (mode !== 'range' || selectedDates.value.length < 2) {
      return false
    }

    const sortedDates = selectedDates.value.sort()
    return date === sortedDates[sortedDates.length - 1]
  }

  // 选择日期
  const selectDate = (date: string): void => {
    if ((typeof disabled === 'function' && disabled(date)) || readonly) {
      return
    }

    switch (mode) {
      case 'single':
        selectedDates.value = [date]
        break

      case 'multiple':
        const index = selectedDates.value.indexOf(date)
        if (index > -1) {
          selectedDates.value.splice(index, 1)
        } else {
          selectedDates.value.push(date)
        }
        break

      case 'range':
        if (selectedDates.value.length === 0) {
          selectedDates.value = [date]
        } else if (selectedDates.value.length === 1) {
          selectedDates.value.push(date)
          selectedDates.value.sort()
        } else {
          selectedDates.value = [date]
        }
        break
    }
  }

  // 清除选择
  const clearSelection = (): void => {
    selectedDates.value = []
    hoveredDate.value = null
    isDragging.value = false
    dragStartDate.value = null
  }

  // 开始拖拽
  const startDrag = (date: string): void => {
    if ((typeof disabled === 'function' && disabled(date)) || readonly || mode === 'single') {
      return
    }

    isDragging.value = true
    dragStartDate.value = date
    
    if (mode === 'range') {
      selectedDates.value = [date]
    }
  }

  // 拖拽中
  const onDrag = (date: string): void => {
    if (!isDragging.value || !dragStartDate.value || (typeof disabled === 'function' && disabled(date))) {
      return
    }

    hoveredDate.value = date

    if (mode === 'range') {
      selectedDates.value = [dragStartDate.value, date].sort()
    } else if (mode === 'multiple') {
      // 多选模式下的拖拽选择
      const startDate = new Date(dragStartDate.value)
      const endDate = new Date(date)
      const dates: string[] = []
      
      const current = new Date(Math.min(startDate.getTime(), endDate.getTime()))
      const end = new Date(Math.max(startDate.getTime(), endDate.getTime()))
      
      while (current <= end) {
        const dateStr = current.toISOString().split('T')[0]
        if (!(typeof disabled === 'function' && disabled(dateStr))) {
          dates.push(dateStr)
        }
        current.setDate(current.getDate() + 1)
      }
      
      selectedDates.value = dates
    }
  }

  // 结束拖拽
  const endDrag = (): void => {
    isDragging.value = false
    dragStartDate.value = null
    hoveredDate.value = null
  }

  // 设置悬停日期
  const setHoveredDate = (date: string | null): void => {
    if (!isDragging.value) {
      hoveredDate.value = date
    }
  }

  // 计算当前选择值
  const currentValue = computed(() => {
    if (selectedDates.value.length === 0) {
      return mode === 'multiple' ? [] : null
    }

    if (mode === 'single') {
      return selectedDates.value[0] || null
    }

    return [...selectedDates.value]
  })

  // 监听外部值变化
  watch(
    () => modelValue,
    () => {
      initializeSelection()
    },
    { immediate: true }
  )

  // 初始化
  initializeSelection()

  // 日期点击处理
  const selectedDate = ref<any>(null)
  
  const onDateClick = (date: any) => {
    selectedDate.value = date
    selectDate(date.date || date)
    if (emit) {
      emit('select', date.date || date, date)
    }
  }

  return {
    // 状态
    selectedDates,
    selectedDate,
    hoveredDate,
    isDragging,
    dragStartDate,
    currentValue,

    // 方法
    isSelected,
    isInRange,
    isRangeStart,
    isRangeEnd,
    selectDate,
    onDateClick,
    clearSelection,
    startDrag,
    onDrag,
    endDrag,
    setHoveredDate
  }
}