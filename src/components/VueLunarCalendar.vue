<template>
  <div 
    :class="[
      'vue-lunar-calendar',
      `theme-${currentTheme}`,
      {
        'is-range': mode === 'range',
        'is-multiple': mode === 'multiple',
        'is-readonly': readonly,
        'is-disabled': disabled
      }
    ]"
    :style="themeVars"
  >
    <!-- Header -->
    <div class="calendar-header">
      <div class="calendar-nav">
        <button 
          class="nav-btn"
          @click="prevYear"
          :disabled="disabled"
          :aria-label="locale.prevYear"
        >
          <ChevronDoubleLeftIcon />
        </button>
        <button 
          class="nav-btn"
          @click="prevMonth"
          :disabled="disabled"
          :aria-label="locale.prevMonth"
        >
          <ChevronLeftIcon />
        </button>
        
        <div class="date-selector">
          <select 
            v-model="currentYear" 
            @change="onYearChange"
            :disabled="disabled"
            class="year-select"
          >
            <option 
              v-for="year in yearOptions" 
              :key="year" 
              :value="year"
            >
              {{ formatYear(year) }}
            </option>
          </select>
          
          <select 
            v-model="currentMonth" 
            @change="onMonthChange"
            :disabled="disabled"
            class="month-select"
          >
            <option 
              v-for="(month, index) in locale.months" 
              :key="index" 
              :value="index + 1"
            >
              {{ month }}
            </option>
          </select>
        </div>
        
        <button 
          class="nav-btn"
          @click="nextMonth"
          :disabled="disabled"
          :aria-label="locale.nextMonth"
        >
          <ChevronRightIcon />
        </button>
        <button 
          class="nav-btn"
          @click="nextYear"
          :disabled="disabled"
          :aria-label="locale.nextYear"
        >
          <ChevronDoubleRightIcon />
        </button>
      </div>
      
      <div class="calendar-actions">
        <button 
          v-if="!readonly"
          class="action-btn today-btn"
          @click="goToday"
          :disabled="disabled"
        >
          {{ locale.today }}
        </button>
        
        <button 
          v-if="clearable && modelValue"
          class="action-btn clear-btn"
          @click="clearSelection"
          :disabled="disabled"
        >
          {{ locale.clear }}
        </button>
        
        <button 
          class="action-btn theme-toggle"
          @click="toggleTheme"
          :aria-label="'切换主题'"
        >
          <SunIcon v-if="currentTheme === 'dark'" />
          <MoonIcon v-else />
        </button>
      </div>
    </div>
    
    <!-- Weekdays -->
    <div class="calendar-weekdays">
      <div 
        v-for="(weekday, index) in weekdaysDisplay" 
        :key="index"
        class="weekday"
      >
        {{ weekday }}
      </div>
    </div>
    
    <!-- Calendar Grid -->
    <div 
      class="calendar-grid"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseLeave"
    >
      <CalendarCell
        v-for="(date, index) in calendarDates"
        :key="`${date.sYear}-${date.sMonth}-${date.sDay}`"
        :date="date"
        :events="getDateEvents(date.date)"
        :selected="isSelected(date.date)"
        :in-range="isInRange(date.date)"
        :range-start="isRangeStart(date.date)"
        :range-end="isRangeEnd(date.date)"
        :today="isToday(date.date)"
        :other-month="isOtherMonth(date)"
        :disabled="isDisabled(date.date)"
        :show-lunar="showLunar"
        :show-festivals="showFestivals"
        :show-terms="showTerms"
        :locale="locale"
        @click="onDateClick(date)"
        @dblclick="onDateDoubleClick(date)"
        @contextmenu="onDateRightClick"
        @mouseenter="onDateHover(date)"
        @event-click="onEventClick"
      >
        <template #default="{ date: cellDate, events }">
          <slot :date="cellDate" :events="events" />
        </template>
        
        <template #event="{ event }">
          <slot name="event" :event="event" />
        </template>
      </CalendarCell>
    </div>
    
    <!-- Event Panel -->
    <div v-if="selectedDate && events.length > 0" class="event-panel">
      <h3>{{ formatDate(selectedDate.date) }} 的事件</h3>
      <div class="event-list">
        <EventItem
          v-for="event in getDateEvents(selectedDate.date)"
          :key="event.id"
          :event="event"
          @click="onEventClick(event)"
        />
      </div>
    </div>
    
    <!-- Sidebar Slot -->
    <div v-if="$slots.sidebar" class="calendar-sidebar">
      <slot name="sidebar" :selected-date="selectedDate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick, useSlots, type PropType } from 'vue'
import CalendarCell from './CalendarCell.vue'
import EventItem from './EventItem.vue'
import type { DateInfo, CalendarEvent } from '../types'

// 图标组件定义
const ChevronLeftIcon = () => '‹'
const ChevronRightIcon = () => '›'
const ChevronDoubleLeftIcon = () => '«'
const ChevronDoubleRightIcon = () => '»'
const SunIcon = () => '☀'
const MoonIcon = () => '🌙'

// Props 类型定义
interface CalendarProps {
  modelValue?: string | string[] | null
  mode?: 'single' | 'multiple' | 'range'
  locale?: string
  theme?: 'light' | 'dark'
  showLunar?: boolean
  showFestivals?: boolean
  showTerms?: boolean
  showWeekNumbers?: boolean
  firstDayOfWeek?: number
  selectable?: boolean
  readonly?: boolean
  disabled?: boolean
  clearable?: boolean
  events?: any[]
  holidays?: Record<string, string>
  minDate?: string
  maxDate?: string
  disabledDates?: string[] | ((date: string) => boolean)
}

// Emits 类型定义
interface CalendarEmits {
  'update:modelValue': [value: string | string[] | null]
  'select': [date: string, dateInfo: DateInfo]
  'dblclick': [date: string, dateInfo: DateInfo]
  'contextmenu': [date: string, dateInfo: DateInfo, event: MouseEvent]
  'yearChange': [year: number]
  'monthChange': [year: number, month: number]
  'eventClick': [event: any]
}

// Props
const props = withDefaults(defineProps<CalendarProps>(), {
  mode: 'single',
  locale: 'zh-CN',
  theme: 'light',
  showLunar: true,
  showFestivals: true,
  showTerms: true,
  showWeekNumbers: false,
  firstDayOfWeek: 1,
  selectable: true,
  readonly: false,
  disabled: false,
  events: () => [],
  holidays: () => ({})
})

// Emits
const emit = defineEmits<CalendarEmits>()

// Slots
const $slots = useSlots()

// 状态管理
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)
const selectedDate = ref<string | null>(null)
const selectedDates = ref<string[]>([])
const rangeStart = ref<string | null>(null)
const rangeEnd = ref<string | null>(null)
const currentTheme = ref(props.theme || 'light')

// 计算属性
const calendarDates = computed(() => {
  // 简化的日历日期生成逻辑
  const dates: DateInfo[] = []
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)
  const daysInMonth = lastDay.getDate()
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day)
    const dateStr = date.toISOString().split('T')[0]
    dates.push({
      date: dateStr,
      sDay: day,
      sYear: year,
      sMonth: month,
      lunarDay: `${day}`,
      lMonth: month,
      lDay: day,
      isLeapMonth: false,
      gzYear: '',
      gzMonth: '',
      gzDay: '',
      animal: '',
      term: '',
      festival: '',
      lunarFestival: '',
      worktime: 0
    })
  }
  return dates
})

const themeVars = computed(() => ({
  '--primary-color': currentTheme.value === 'dark' ? '#1976d2' : '#1976d2'
}))

const locale = computed(() => {
  const localeData = {
    'zh-CN': {
      prevYear: '上一年',
      nextYear: '下一年', 
      prevMonth: '上个月',
      nextMonth: '下个月',
      today: '今天',
      clear: '清除',
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      weekdays: ['日', '一', '二', '三', '四', '五', '六']
    },
    'en-US': {
      prevYear: 'Previous Year',
      nextYear: 'Next Year',
      prevMonth: 'Previous Month', 
      nextMonth: 'Next Month',
      today: 'Today',
      clear: 'Clear',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
  }
  return localeData[props.locale as keyof typeof localeData] || localeData['zh-CN']
})
const weekdaysDisplay = computed(() => locale.value.weekdays)

// 方法
const goToday = () => {
  const today = new Date()
  currentYear.value = today.getFullYear()
  currentMonth.value = today.getMonth() + 1
}

const prevYear = () => {
  currentYear.value--
}

const nextYear = () => {
  currentYear.value++
}

const prevMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
}

const formatYear = (year: number) => `${year}年`

const getDateEvents = (date: string) => {
  return props.events?.filter(event => event.date === date) || []
}

const onEventClick = (event: CalendarEvent) => {
  emit('eventClick', event)
}

const isSelected = (date: string) => {
  if (props.selectionMode === 'single') {
    return selectedDate.value === date
  } else if (props.selectionMode === 'multiple') {
    return selectedDates.value.includes(date)
  } else if (props.selectionMode === 'range') {
    return date === rangeStart.value || date === rangeEnd.value
  }
  return false
}

const isInRange = (date: string) => {
  if (props.selectionMode !== 'range' || !rangeStart.value || !rangeEnd.value) {
    return false
  }
  return date > rangeStart.value && date < rangeEnd.value
}

const isRangeStart = (date: string) => {
  return props.selectionMode === 'range' && date === rangeStart.value
}

const isRangeEnd = (date: string) => {
  return props.selectionMode === 'range' && date === rangeEnd.value
}

const onDateClick = (date: DateInfo) => {
  if (isDisabled(date.date)) return
  
  if (props.selectionMode === 'single') {
    selectedDate.value = date.date
    emit('update:modelValue', date.date)
    emit('select', date.date, date)
  } else if (props.selectionMode === 'multiple') {
    const index = selectedDates.value.indexOf(date.date)
    if (index > -1) {
      selectedDates.value.splice(index, 1)
    } else {
      selectedDates.value.push(date.date)
    }
    emit('update:modelValue', [...selectedDates.value])
    emit('select', date.date, date)
  } else if (props.selectionMode === 'range') {
    if (!rangeStart.value || (rangeStart.value && rangeEnd.value)) {
      // 开始新的范围选择
      rangeStart.value = date.date
      rangeEnd.value = null
    } else if (rangeStart.value && !rangeEnd.value) {
      // 完成范围选择
      if (date.date < rangeStart.value) {
        rangeEnd.value = rangeStart.value
        rangeStart.value = date.date
      } else {
        rangeEnd.value = date.date
      }
      const range = { start: rangeStart.value, end: rangeEnd.value }
      emit('update:modelValue', range)
      emit('rangeSelect', range)
    }
  }
}

const clearSelection = () => {
  selectedDate.value = null
  selectedDates.value = []
  rangeStart.value = null
  rangeEnd.value = null
  emit('update:modelValue', null)
}

const onMouseDown = () => {}
const onMouseMove = () => {}
const onMouseUp = () => {}
const onMouseLeave = () => {}
const onDateHover = () => {}

// Event handlers
const onDateDoubleClick = (date: DateInfo) => {
  emit('dblclick', date.date, date)
}

const onDateRightClick = (date: DateInfo, event: any) => {
  event.preventDefault()
  emit('contextmenu', date.date, date, event)
}

// Computed
const yearOptions = computed(() => {
  const start = props.minDate ? new Date(props.minDate).getFullYear() : 1900
  const end = props.maxDate ? new Date(props.maxDate).getFullYear() : 2100
  const years = []
  for (let year = start; year <= end; year++) {
    years.push(year)
  }
  return years
})

// Methods
const isToday = (date: string): boolean => {
  const today = new Date()
  const targetDate = new Date(date)
  return (
    today.getFullYear() === targetDate.getFullYear() &&
    today.getMonth() === targetDate.getMonth() &&
    today.getDate() === targetDate.getDate()
  )
}

const isOtherMonth = (date: DateInfo): boolean => {
  return date.sMonth !== currentMonth.value
}

const isDisabled = (date: string): boolean => {
  if (props.disabled) return true
  
  if (props.minDate && date < props.minDate) return true
  if (props.maxDate && date > props.maxDate) return true
  
  if (Array.isArray(props.disabledDates)) {
    return props.disabledDates.includes(date)
  }
  
  if (typeof props.disabledDates === 'function') {
    return props.disabledDates(date)
  }
  
  return false
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString(props.locale)
}

const onYearChange = () => {
  emit('yearChange', currentYear.value)
}

const onMonthChange = () => {
  emit('monthChange', currentYear.value, currentMonth.value)
}

// Watch for prop changes
watch(() => props.modelValue, (newValue: any) => {
  if (props.selectionMode === 'single') {
    selectedDate.value = newValue || null
  } else if (props.selectionMode === 'multiple') {
    selectedDates.value = Array.isArray(newValue) ? newValue : []
  } else if (props.selectionMode === 'range') {
    if (newValue && typeof newValue === 'object' && 'start' in newValue && 'end' in newValue) {
      rangeStart.value = newValue.start
      rangeEnd.value = newValue.end
    } else {
      rangeStart.value = null
      rangeEnd.value = null
    }
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  // Initialize calendar
})
</script>

<style scoped>
.vue-lunar-calendar {
  --primary-color: #1976d2;
  --secondary-color: #ff9800;
  --background-color: #ffffff;
  --text-color: #333333;
  --border-color: #e0e0e0;
  --hover-color: #f5f5f5;
  --selected-color: #e3f2fd;
  --today-color: #ffeb3b;
  --weekend-color: #f44336;
  --holiday-color: #4caf50;
  --disabled-color: #bdbdbd;
  
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  min-width: 320px;
  max-width: 100%;
}

.theme-dark {
  --background-color: #1a1a1a;
  --text-color: #ffffff;
  --border-color: #333333;
  --hover-color: #2a2a2a;
  --selected-color: #1565c0;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--primary-color);
  color: white;
}

.calendar-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.date-selector {
  display: flex;
  gap: 8px;
  margin: 0 16px;
}

.year-select,
.month-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.calendar-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: var(--hover-color);
}

.weekday {
  padding: 12px 8px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  border-right: 1px solid var(--border-color);
}

.weekday:last-child {
  border-right: none;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  min-height: 300px;
}

.event-panel {
  padding: 16px;
  border-top: 1px solid var(--border-color);
  background: var(--hover-color);
}

.event-list {
  margin-top: 8px;
}

.calendar-sidebar {
  padding: 16px;
  border-top: 1px solid var(--border-color);
  background: var(--background-color);
}

.is-readonly {
  pointer-events: none;
}

.is-disabled {
  opacity: 0.6;
  pointer-events: none;
}

@media (max-width: 768px) {
  .calendar-header {
    flex-direction: column;
    gap: 12px;
  }
  
  .calendar-nav {
    order: 2;
  }
  
  .calendar-actions {
    order: 1;
  }
}
</style>