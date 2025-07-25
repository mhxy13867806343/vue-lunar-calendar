<template>
  <div
    :class="[
      'calendar-cell',
      {
        'is-selected': selected,
        'is-today': today,
        'is-other-month': otherMonth,
        'is-disabled': disabled,
        'is-weekend': isWeekend,
        'is-holiday': isHoliday,
        'is-in-range': inRange,
        'is-range-start': rangeStart,
        'is-range-end': rangeEnd,
        'has-events': hasEvents
      }
    ]"
    :aria-label="cellAriaLabel"
    :aria-selected="selected"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : 0"
    @click="handleClick"
    @dblclick="handleDoubleClick"
    @contextmenu="handleRightClick"
    @mouseenter="handleMouseEnter"
    @keydown="handleKeydown"
  >
    <!-- Date Number -->
    <div class="cell-date">
      <span class="solar-date">{{ date.sDay }}</span>
      <span v-if="showLunar && date.lDayZH" class="lunar-date">
        {{ date.lDayZH }}
      </span>
    </div>
    
    <!-- Lunar Info -->
    <div v-if="showLunar" class="lunar-info">
      <span v-if="date.lMonthZH && date.lDay === 1" class="lunar-month">
        {{ date.lMonthZH }}
      </span>
      <span v-if="date.gzDayZH" class="ganzhi" :title="`${date.gzYearZH}年 ${date.gzMonthZH}月 ${date.gzDayZH}日`">
        {{ date.gzDayZH }}
      </span>
    </div>
    
    <!-- Festivals and Terms -->
    <div v-if="showFestivals || showTerms" class="festival-info">
      <span v-if="showTerms && date.term" class="term" :title="date.term">
        {{ date.term }}
      </span>
      <span v-if="showFestivals && festivalText" class="festival" :title="festivalText">
        {{ festivalText }}
      </span>
    </div>
    
    <!-- Events -->
    <div v-if="hasEvents" class="events-container">
      <div 
        v-for="event in visibleEvents" 
        :key="event.id"
        :class="[
          'event-dot',
          `event-${event.type}`
        ]"
        :style="{ backgroundColor: event.color }"
        :title="event.title"
        @click.stop="emit('eventClick', event)"
      >
        <slot name="event" :event="event">
          <span class="event-title">{{ event.title }}</span>
        </slot>
      </div>
      
      <div v-if="moreEventsCount > 0" class="more-events">
        +{{ moreEventsCount }}
      </div>
    </div>
    
    <!-- Zodiac -->
    <div v-if="date.zodiac" class="zodiac" :title="date.zodiac">
      {{ getZodiacIcon(date.zodiac) }}
    </div>
    
    <!-- Animal Year -->
    <div v-if="date.animal" class="animal" :title="`${date.animal}年`">
      {{ getAnimalIcon(date.animal) }}
    </div>
    
    <!-- Custom Slot -->
    <div v-if="$slots.default" class="custom-content">
      <slot :date="date" :events="events" />
    </div>
    
    <!-- Selection Indicator -->
    <div v-if="selected" class="selection-indicator" />
    
    <!-- Today Indicator -->
    <div v-if="today" class="today-indicator" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DateInfo, CalendarEvent, CalendarLocale } from '../types'

interface Props {
  date: DateInfo
  events?: CalendarEvent[]
  selected?: boolean
  inRange?: boolean
  rangeStart?: boolean
  rangeEnd?: boolean
  today?: boolean
  otherMonth?: boolean
  disabled?: boolean
  showLunar?: boolean
  showFestivals?: boolean
  showTerms?: boolean
  locale?: CalendarLocale
}

interface Emits {
  click: [date: DateInfo]
  dblclick: [date: DateInfo]
  contextmenu: [date: DateInfo, event: MouseEvent]
  mouseenter: [date: DateInfo]
  eventClick: [event: CalendarEvent]
}

const props = withDefaults(defineProps<Props>(), {
  events: () => [],
  selected: false,
  inRange: false,
  rangeStart: false,
  rangeEnd: false,
  today: false,
  otherMonth: false,
  disabled: false,
  showLunar: true,
  showFestivals: true,
  showTerms: true
})

const emit = defineEmits<Emits>()

// Computed
const isWeekend = computed(() => {
  return props.date.week === 0 || props.date.week === 6
})

const isHoliday = computed(() => {
  return props.events.some(event => event.type === 'holiday')
})

const hasEvents = computed(() => {
  return props.events.length > 0
})

const visibleEvents = computed(() => {
  return props.events.slice(0, 3) // 最多显示3个事件
})

const moreEventsCount = computed(() => {
  return Math.max(0, props.events.length - 3)
})

const festivalText = computed(() => {
  if (!props.showFestivals || !props.date.festival) return ''
  
  const festivals = props.date.festival.split(' ').filter(f => f.trim())
  return festivals[0] || ''
})

const cellAriaLabel = computed(() => {
  const parts = [
    `${props.date.sYear}年${props.date.sMonth}月${props.date.sDay}日`,
    props.date.weekZH
  ]
  
  if (props.showLunar && props.date.lDayZH) {
    parts.push(`农历${props.date.lDayZH}`)
  }
  
  if (props.today) {
    parts.push('今天')
  }
  
  if (props.selected) {
    parts.push('已选择')
  }
  
  if (props.disabled) {
    parts.push('不可选择')
  }
  
  if (festivalText.value) {
    parts.push(festivalText.value)
  }
  
  if (props.date.term) {
    parts.push(props.date.term)
  }
  
  if (hasEvents.value) {
    parts.push(`${props.events.length}个事件`)
  }
  
  return parts.join(', ')
})

// Methods
const handleClick = () => {
  if (!props.disabled) {
    emit('click', props.date)
  }
}

const handleDoubleClick = () => {
  if (!props.disabled) {
    emit('dblclick', props.date)
  }
}

const handleRightClick = (event: MouseEvent) => {
  if (!props.disabled) {
    event.preventDefault()
    emit('contextmenu', props.date, event)
  }
}

const handleMouseEnter = () => {
  if (!props.disabled) {
    emit('mouseenter', props.date)
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleClick()
  }
}

const getZodiacIcon = (zodiac: string): string => {
  const zodiacIcons: Record<string, string> = {
    '白羊座': '♈',
    '金牛座': '♉',
    '双子座': '♊',
    '巨蟹座': '♋',
    '狮子座': '♌',
    '处女座': '♍',
    '天秤座': '♎',
    '天蝎座': '♏',
    '射手座': '♐',
    '摩羯座': '♑',
    '水瓶座': '♒',
    '双鱼座': '♓'
  }
  return zodiacIcons[zodiac] || ''
}

const getAnimalIcon = (animal: string): string => {
  const animalIcons: Record<string, string> = {
    '鼠': '🐭',
    '牛': '🐮',
    '虎': '🐯',
    '兔': '🐰',
    '龙': '🐲',
    '蛇': '🐍',
    '马': '🐴',
    '羊': '🐑',
    '猴': '🐵',
    '鸡': '🐔',
    '狗': '🐶',
    '猪': '🐷'
  }
  return animalIcons[animal] || ''
}
</script>

<style scoped>
.calendar-cell {
  position: relative;
  min-height: 80px;
  padding: 4px;
  border: 1px solid var(--border-color);
  background: var(--background-color);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.calendar-cell:hover:not(.is-disabled) {
  background: var(--hover-color);
  border-color: var(--primary-color);
}

.calendar-cell:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: -2px;
}

.is-selected {
  background: var(--selected-color) !important;
  border-color: var(--primary-color);
}

.is-today {
  background: var(--today-color);
  font-weight: bold;
}

.is-other-month {
  opacity: 0.4;
}

.is-disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

.is-weekend .solar-date {
  color: var(--weekend-color);
}

.is-holiday {
  background: var(--holiday-color);
  color: white;
}

.is-in-range {
  background: rgba(25, 118, 210, 0.1);
}

.is-range-start,
.is-range-end {
  background: var(--primary-color);
  color: white;
}

.cell-date {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2px;
}

.solar-date {
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
}

.lunar-date {
  font-size: 10px;
  color: var(--secondary-color);
  line-height: 1;
}

.lunar-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-bottom: 2px;
}

.lunar-month {
  font-size: 9px;
  color: var(--primary-color);
  font-weight: 500;
}

.ganzhi {
  font-size: 8px;
  color: #666;
  opacity: 0.8;
}

.festival-info {
  margin-bottom: 2px;
}

.term,
.festival {
  display: block;
  font-size: 9px;
  line-height: 1.2;
  padding: 1px 2px;
  border-radius: 2px;
  margin-bottom: 1px;
}

.term {
  background: var(--secondary-color);
  color: white;
}

.festival {
  background: var(--primary-color);
  color: white;
}

.events-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-top: auto;
}

.event-dot {
  display: flex;
  align-items: center;
  font-size: 8px;
  padding: 1px 2px;
  border-radius: 2px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.event-dot:hover {
  transform: scale(1.05);
}

.event-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.event-event {
  background: #2196f3;
}

.event-reminder {
  background: #ff9800;
}

.event-holiday {
  background: #4caf50;
}

.event-custom {
  background: #9c27b0;
}

.more-events {
  font-size: 8px;
  color: #666;
  text-align: center;
  padding: 1px;
}

.zodiac,
.animal {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 10px;
  opacity: 0.6;
}

.animal {
  top: 14px;
}

.custom-content {
  margin-top: auto;
}

.selection-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary-color);
}

.today-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--today-color);
}

.has-events::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--primary-color);
}

@media (max-width: 768px) {
  .calendar-cell {
    min-height: 60px;
    padding: 2px;
  }
  
  .solar-date {
    font-size: 14px;
  }
  
  .lunar-date {
    font-size: 9px;
  }
  
  .term,
  .festival,
  .event-dot {
    font-size: 7px;
  }
}
</style>