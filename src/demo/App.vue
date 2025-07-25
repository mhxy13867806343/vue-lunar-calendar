<template>
  <div id="app">
    <header class="demo-header">
      <h1>Vue 3 农历日历组件演示</h1>
      <div class="demo-controls">
        <button @click="toggleTheme" class="theme-toggle">
          {{ currentTheme === 'dark' ? '🌞' : '🌙' }} 
          {{ currentTheme === 'dark' ? '浅色模式' : '深色模式' }}
        </button>
        <select v-model="currentLocale" @change="setLocale(currentLocale)" class="locale-select">
          <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
            {{ locale.name }}
          </option>
        </select>
      </div>
    </header>

    <main class="demo-main">
      <div class="demo-section">
        <h2>基础日历</h2>
        <VueLunarCalendar
          v-model="selectedDate"
          :selection-mode="'single'"
          :locale="currentLocale"
          :show-lunar="true"
          :show-festivals="true"
          :show-terms="true"
          :events="events"
          @select="onDateSelect"
          @dblclick="onDateDoubleClick"
          @contextmenu="onDateRightClick"
          @event-click="onEventClick"
        />
      </div>

      <div class="demo-section">
        <h2>日期范围选择</h2>
        <VueLunarCalendar
          v-model="selectedRange"
          :selection-mode="'range'"
          :locale="currentLocale"
          :show-lunar="true"
          @range-select="onRangeSelect"
        />
      </div>

      <div class="demo-section">
        <h2>多日期选择</h2>
        <VueLunarCalendar
          v-model="selectedDates"
          :selection-mode="'multiple'"
          :locale="currentLocale"
          :show-lunar="true"
          @select="onMultipleSelect"
        />
      </div>

      <div class="demo-section">
        <h2>事件管理</h2>
        <div class="event-controls">
          <button @click="addSampleEvent" class="add-event-btn">
            添加示例事件
          </button>
          <button @click="clearEvents" class="clear-events-btn">
            清除所有事件
          </button>
        </div>
        
        <div class="events-list">
          <h3>当前事件 ({{ events.length }})</h3>
          <div v-if="events.length === 0" class="no-events">
            暂无事件
          </div>
          <EventItem
            v-for="event in events"
            :key="event.id"
            :event="event"
            @click="onEventClick"
          />
        </div>
      </div>

      <div class="demo-section">
        <h2>选择结果</h2>
        <div class="selection-results">
          <div class="result-item">
            <strong>单选日期:</strong> {{ selectedDate || '未选择' }}
          </div>
          <div class="result-item">
            <strong>范围选择:</strong> 
            <span v-if="selectedRange">
              {{ selectedRange.start }} 至 {{ selectedRange.end }}
            </span>
            <span v-else>未选择</span>
          </div>
          <div class="result-item">
            <strong>多选日期:</strong> 
            <span v-if="selectedDates.length > 0">
              {{ selectedDates.join(', ') }}
            </span>
            <span v-else>未选择</span>
          </div>
        </div>
        
        <div class="event-logs">
          <h3>事件日志</h3>
          <div class="log-container">
            <div v-if="eventLogs.length === 0" class="no-logs">
              暂无事件日志
            </div>
            <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
              <span class="log-time">{{ log.time }}</span>
              <span class="log-type" :class="log.type">{{ log.type }}</span>
              <span class="log-message">{{ log.message }}</span>
            </div>
          </div>
          <button @click="clearLogs" class="clear-logs-btn">清除日志</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import VueLunarCalendar from '../components/VueLunarCalendar.vue'
import EventItem from '../components/EventItem.vue'
import type { CalendarEvent, DateRange, DateInfo } from '../types'

// 主题管理
const themeStore = reactive({
  currentTheme: 'light' as 'light' | 'dark',
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light'
  }
})

// 国际化
const localeStore = reactive({
  currentLocale: 'zh-CN' as 'zh-CN' | 'en-US',
  availableLocales: [{ code: 'zh-CN', name: '中文' }, { code: 'en-US', name: 'English' }],
  setLocale(locale: 'zh-CN' | 'en-US') {
    this.currentLocale = locale
  }
})

// 计算属性
const currentTheme = computed(() => themeStore.currentTheme)
const currentLocale = computed(() => localeStore.currentLocale)
const availableLocales = computed(() => localeStore.availableLocales)

// 事件管理
const events = ref<CalendarEvent[]>([])

const addEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
  const event: CalendarEvent = {
    id: Date.now().toString(),
    ...eventData
  }
  events.value.push(event)
}

const deleteEvents = (eventIds: string[]) => {
  events.value = events.value.filter(event => !eventIds.includes(event.id))
}

// 选择状态
const selectedDate = ref<string>('')
const selectedRange = ref<DateRange | null>(null)
const selectedDates = ref<string[]>([])

// 事件日志
const eventLogs = ref<Array<{time: string, type: string, message: string}>>([])

// 添加日志
const addLog = (type: string, message: string) => {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift({ time, type, message })
  // 保持最多50条日志
  if (eventLogs.value.length > 50) {
    eventLogs.value = eventLogs.value.slice(0, 50)
  }
}

// 清除日志
const clearLogs = () => {
  eventLogs.value = []
}

// 切换主题
const toggleTheme = () => {
  themeStore.toggleTheme()
}

// 设置语言
const setLocale = (locale: 'zh-CN' | 'en-US') => {
  localeStore.setLocale(locale)
}

// 事件处理
const onDateSelect = (date: string, dateInfo: DateInfo) => {
  console.log('选择日期:', date, dateInfo)
  addLog('click', `单击选择日期: ${date} (农历${dateInfo.lMonth}月${dateInfo.lDay}日)`)
}

const onDateDoubleClick = (date: string, dateInfo: DateInfo) => {
  console.log('双击日期:', date, dateInfo)
  addLog('dblclick', `双击日期: ${date} (农历${dateInfo.lMonth}月${dateInfo.lDay}日)`)
  // 可以在这里添加双击的特殊处理，比如快速添加事件
  const quickEvent = {
    title: '快速事件',
    date: date,
    description: '通过双击快速添加的事件',
    type: 'event' as const,
    color: '#9c27b0'
  }
  addEvent(quickEvent)
  addLog('event', `双击快速添加事件到 ${date}`)
}

const onDateRightClick = (dateStr: string, date: DateInfo, event: MouseEvent) => {
  console.log('右键点击日期:', dateStr, date, event)
  if (date) {
    alert(`右键菜单: ${date.date}\n农历: ${date.lMonth}月${date.lDay}日\n节气: ${date.term || '无'}\n节日: ${date.festival || '无'}`)
    addLog('right-click', `右键点击: ${date.date} (农历${date.lMonth}月${date.lDay}日)`)
  } else {
    alert(`右键菜单: ${dateStr}`)
    addLog('right-click', `右键点击: ${dateStr}`)
  }
}

const onRangeSelect = (range: DateRange) => {
  console.log('选择范围:', range)
  addLog('range-select', `选择日期范围: ${range.start} 至 ${range.end}`)
}

const onMultipleSelect = (date: string, dateInfo: DateInfo) => {
  console.log('多选日期:', date, dateInfo)
  addLog('multiple-select', `多选日期: ${date} (农历${dateInfo.lMonth}月${dateInfo.lDay}日)，当前已选择 ${selectedDates.value.length} 个日期`)
}

const onEventClick = (event: CalendarEvent) => {
  console.log('点击事件:', event)
  alert(`事件: ${event.title}\n日期: ${event.date}\n描述: ${event.description || '无'}`)
}

// 添加示例事件
const addSampleEvent = () => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const sampleEvents = [
    {
      title: '团队会议',
      date: today.toISOString().split('T')[0],
      startTime: '10:00',
      endTime: '11:30',
      description: '讨论项目进度和下周计划',
      type: 'event' as const,
      color: '#2196f3'
    },
    {
      title: '生日提醒',
      date: tomorrow.toISOString().split('T')[0],
      description: '小明的生日',
      type: 'reminder' as const,
      color: '#ff9800',
      reminders: [{
        id: 'reminder1',
        time: 60,
        type: 'notification' as const
      }]
    },
    {
      title: '重要节日',
      date: '2024-02-10',
      description: '春节',
      type: 'holiday' as const,
      color: '#4caf50'
    }
  ]
  
  const randomEvent = sampleEvents[Math.floor(Math.random() * sampleEvents.length)]
  addEvent(randomEvent)
}

// 清除所有事件
const clearEvents = () => {
  const eventIds = events.value.map(e => e.id)
  deleteEvents(eventIds)
}

// 初始化
onMounted(() => {
  // 添加一些初始事件
  addSampleEvent()
  addLog('info', '日历组件已加载，支持单击、双击、右键事件')
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  background: var(--calendar-background, #ffffff);
  color: var(--calendar-text, #333333);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.demo-header {
  padding: 20px;
  border-bottom: 1px solid var(--calendar-border, #e0e0e0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.demo-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.demo-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.theme-toggle {
  padding: 8px 16px;
  border: 1px solid var(--calendar-border, #e0e0e0);
  border-radius: 6px;
  background: var(--calendar-background, #ffffff);
  color: var(--calendar-text, #333333);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.theme-toggle:hover {
  background: var(--calendar-hover, #f5f5f5);
}

.locale-select {
  padding: 8px 12px;
  border: 1px solid var(--calendar-border, #e0e0e0);
  border-radius: 6px;
  background: var(--calendar-background, #ffffff);
  color: var(--calendar-text, #333333);
  cursor: pointer;
  font-size: 14px;
}

.demo-main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 40px;
  padding: 24px;
  border: 1px solid var(--calendar-border, #e0e0e0);
  border-radius: 8px;
  background: var(--calendar-background, #ffffff);
}

.demo-section h2 {
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--calendar-primary, #2196f3);
}

.event-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.add-event-btn,
.clear-events-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.add-event-btn {
  background: var(--calendar-primary, #2196f3);
  color: white;
}

.add-event-btn:hover {
  background: var(--calendar-secondary, #1976d2);
}

.clear-events-btn {
  background: #f44336;
  color: white;
}

.clear-events-btn:hover {
  background: #d32f2f;
}

.events-list {
  border: 1px solid var(--calendar-border, #e0e0e0);
  border-radius: 6px;
  padding: 16px;
  background: var(--calendar-hover, #f5f5f5);
}

.events-list h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
}

.no-events {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
}

.selection-results {
  background: var(--calendar-hover, #f5f5f5);
  padding: 16px;
  border-radius: 6px;
  border: 1px solid var(--calendar-border, #e0e0e0);
}

.result-item {
  margin-bottom: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--calendar-border, #e0e0e0);
}

.result-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.result-item strong {
  color: var(--calendar-primary, #2196f3);
  margin-right: 8px;
}

.event-logs {
  margin-top: 20px;
  padding: 16px;
  border: 1px solid var(--calendar-border, #e0e0e0);
  border-radius: 8px;
  background: var(--calendar-hover, #f5f5f5);
}

.event-logs h3 {
  margin: 0 0 12px 0;
  color: var(--calendar-text, #333);
  font-size: 16px;
  font-weight: 600;
}

.log-container {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 12px;
  background: var(--calendar-background, #ffffff);
  border-radius: 4px;
  padding: 8px;
}

.log-item {
  display: flex;
  gap: 8px;
  padding: 4px 0;
  border-bottom: 1px solid var(--calendar-border, #eee);
  font-size: 12px;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: #666;
  min-width: 80px;
  font-family: monospace;
}

.log-type {
  min-width: 80px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  font-size: 10px;
}

.log-type.click {
  background: #e3f2fd;
  color: #1976d2;
}

.log-type.dblclick {
  background: #f3e5f5;
  color: #7b1fa2;
}

.log-type.contextmenu {
  background: #fff3e0;
  color: #f57c00;
}

.log-type.event {
  background: #e8f5e8;
  color: #388e3c;
}

.log-type.info {
  background: #f5f5f5;
  color: #616161;
}

.log-message {
  flex: 1;
  color: var(--calendar-text, #333);
}

.clear-logs-btn {
  padding: 6px 12px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s ease;
}

.clear-logs-btn:hover {
  background: #d32f2f;
}

.no-logs {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .demo-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .demo-controls {
    justify-content: center;
  }
  
  .demo-main {
    padding: 16px;
  }
  
  .demo-section {
    padding: 16px;
  }
  
  .event-controls {
    justify-content: center;
  }
}
</style>