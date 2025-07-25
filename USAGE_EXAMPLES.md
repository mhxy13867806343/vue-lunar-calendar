# 使用示例

本文档提供了 Vue 农历日历组件的详细使用示例。

## 基础示例

### 1. 最简单的使用

```vue
<template>
  <VueLunarCalendar />
</template>

<script setup>
import { VueLunarCalendar } from 'vue-lunar-calendar'
import 'vue-lunar-calendar/style'
</script>
```

### 2. 单日期选择

```vue
<template>
  <div>
    <h3>选择生日</h3>
    <VueLunarCalendar
      v-model="birthday"
      :selection-mode="'single'"
      :show-lunar="true"
      :show-festivals="true"
      @select="onBirthdaySelect"
    />
    <p v-if="birthday">选择的生日: {{ birthday }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueLunarCalendar } from 'vue-lunar-calendar'
import 'vue-lunar-calendar/style'

const birthday = ref('')

const onBirthdaySelect = (date, dateInfo) => {
  console.log('生日信息:', {
    公历: date,
    农历: `${dateInfo.gzYear}年${dateInfo.lunarDay}`,
    生肖: dateInfo.animal,
    节气: dateInfo.term
  })
}
</script>
```

### 3. 日期范围选择

```vue
<template>
  <div>
    <h3>选择假期时间</h3>
    <VueLunarCalendar
      v-model="vacationRange"
      :selection-mode="'range'"
      :locale="'zh-CN'"
      @range-select="onVacationSelect"
    />
    <div v-if="vacationRange">
      <p>假期开始: {{ vacationRange.start }}</p>
      <p>假期结束: {{ vacationRange.end }}</p>
      <p>总天数: {{ calculateDays(vacationRange) }} 天</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueLunarCalendar } from 'vue-lunar-calendar'
import 'vue-lunar-calendar/style'

const vacationRange = ref(null)

const onVacationSelect = (range) => {
  console.log('假期范围:', range)
}

const calculateDays = (range) => {
  if (!range) return 0
  const start = new Date(range.start)
  const end = new Date(range.end)
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
}
</script>
```

### 4. 多日期选择

```vue
<template>
  <div>
    <h3>选择工作日</h3>
    <VueLunarCalendar
      v-model="workDays"
      :selection-mode="'multiple'"
      :locale="'zh-CN'"
      @select="onWorkDaySelect"
    />
    <div v-if="workDays.length > 0">
      <h4>已选择的工作日:</h4>
      <ul>
        <li v-for="day in workDays" :key="day">{{ day }}</li>
      </ul>
      <p>总计: {{ workDays.length }} 个工作日</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueLunarCalendar } from 'vue-lunar-calendar'
import 'vue-lunar-calendar/style'

const workDays = ref([])

const onWorkDaySelect = (date, dateInfo) => {
  console.log('选择工作日:', date, dateInfo)
}
</script>
```

## 高级示例

### 5. 事件日历

```vue
<template>
  <div>
    <h3>团队日程</h3>
    <VueLunarCalendar
      v-model="selectedDate"
      :events="events"
      :show-lunar="true"
      :show-festivals="true"
      @select="onDateSelect"
      @dblclick="onAddEvent"
      @event-click="onEventClick"
      @contextmenu="onDateRightClick"
    />
    
    <!-- 事件详情弹窗 -->
    <div v-if="showEventDialog" class="event-dialog">
      <h4>{{ selectedEvent?.title }}</h4>
      <p>日期: {{ selectedEvent?.date }}</p>
      <p>描述: {{ selectedEvent?.description }}</p>
      <button @click="closeEventDialog">关闭</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueLunarCalendar } from 'vue-lunar-calendar'
import 'vue-lunar-calendar/style'

const selectedDate = ref('')
const showEventDialog = ref(false)
const selectedEvent = ref(null)

// 示例事件数据
const events = ref([
  {
    id: '1',
    title: '团队会议',
    date: '2024-01-15',
    startTime: '09:00',
    endTime: '10:30',
    description: '讨论项目进度',
    type: 'event',
    color: '#1976d2'
  },
  {
    id: '2',
    title: '产品发布',
    date: '2024-01-20',
    description: '新版本上线',
    type: 'reminder',
    color: '#ff9800'
  },
  {
    id: '3',
    title: '春节假期',
    date: '2024-02-10',
    description: '农历新年',
    type: 'holiday',
    color: '#f44336'
  }
])

const onDateSelect = (date, dateInfo) => {
  console.log('选择日期:', date)
  console.log('农历信息:', {
    农历日期: dateInfo.lunarDay,
    节气: dateInfo.term,
    节日: dateInfo.festival || dateInfo.lunarFestival
  })
}

const onAddEvent = (date, dateInfo) => {
  // 双击添加事件
  const title = prompt('请输入事件标题:')
  if (title) {
    events.value.push({
      id: Date.now().toString(),
      title,
      date,
      description: '用户添加的事件',
      type: 'event',
      color: '#4caf50'
    })
  }
}

const onEventClick = (event) => {
  selectedEvent.value = event
  showEventDialog.value = true
}

const onDateRightClick = (date, dateInfo, event) => {
  event.preventDefault()
  console.log('右键菜单:', date)
  // 可以显示自定义右键菜单
}

const closeEventDialog = () => {
  showEventDialog.value = false
  selectedEvent.value = null
}
</script>

<style>
.event-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}
</style>
```

### 6. 主题切换

```vue
<template>
  <div>
    <div class="theme-controls">
      <button @click="toggleTheme">切换主题</button>
      <button @click="toggleLanguage">切换语言</button>
    </div>
    
    <VueLunarCalendar
      v-model="selectedDate"
      :theme="currentTheme"
      :locale="currentLocale"
      :show-lunar="true"
      :show-festivals="true"
      :show-terms="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueLunarCalendar } from 'vue-lunar-calendar'
import 'vue-lunar-calendar/style'

const selectedDate = ref('')
const currentTheme = ref('light')
const currentLocale = ref('zh-CN')

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
}

const toggleLanguage = () => {
  currentLocale.value = currentLocale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}
</script>

<style>
.theme-controls {
  margin-bottom: 20px;
}

.theme-controls button {
  margin-right: 10px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.theme-controls button:hover {
  background: #f5f5f5;
}
</style>
```

### 7. 表单集成

```vue
<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label>活动名称:</label>
      <input v-model="form.title" type="text" required />
    </div>
    
    <div class="form-group">
      <label>活动日期:</label>
      <VueLunarCalendar
        v-model="form.date"
        :selection-mode="'single'"
        :min-date="today"
        :show-lunar="true"
      />
    </div>
    
    <div class="form-group">
      <label>活动时间段:</label>
      <VueLunarCalendar
        v-model="form.dateRange"
        :selection-mode="'range'"
        :min-date="today"
      />
    </div>
    
    <div class="form-group">
      <label>描述:</label>
      <textarea v-model="form.description"></textarea>
    </div>
    
    <button type="submit" :disabled="!isFormValid">提交</button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { VueLunarCalendar } from 'vue-lunar-calendar'
import 'vue-lunar-calendar/style'

const today = new Date().toISOString().split('T')[0]

const form = ref({
  title: '',
  date: '',
  dateRange: null,
  description: ''
})

const isFormValid = computed(() => {
  return form.value.title && (form.value.date || form.value.dateRange)
})

const submitForm = () => {
  console.log('提交表单:', form.value)
  // 处理表单提交
}
</script>

<style>
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  height: 80px;
  resize: vertical;
}

button[type="submit"] {
  background: #1976d2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
```

### 8. 自定义样式

```vue
<template>
  <div class="custom-calendar">
    <VueLunarCalendar
      v-model="selectedDate"
      :show-lunar="true"
      :show-festivals="true"
      class="my-calendar"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueLunarCalendar } from 'vue-lunar-calendar'
import 'vue-lunar-calendar/style'

const selectedDate = ref('')
</script>

<style>
.custom-calendar {
  max-width: 600px;
  margin: 0 auto;
}

.my-calendar {
  /* 自定义主色调 */
  --primary-color: #e91e63;
  --secondary-color: #ff5722;
  
  /* 自定义背景色 */
  --background-color: #fafafa;
  --selected-color: #fce4ec;
  
  /* 自定义文字颜色 */
  --text-color: #333;
  --weekend-color: #e91e63;
  
  /* 自定义边框 */
  --border-color: #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* 深色主题自定义 */
.my-calendar[data-theme="dark"] {
  --background-color: #2d2d2d;
  --text-color: #ffffff;
  --border-color: #404040;
  --selected-color: #4a148c;
}
</style>
```

## 组合式 API 使用

### 9. 使用 Composables

```vue
<template>
  <div>
    <div class="calendar-controls">
      <button @click="goToPreviousMonth">上个月</button>
      <span>{{ currentYear }}年{{ currentMonth }}月</span>
      <button @click="goToNextMonth">下个月</button>
      <button @click="goToToday">今天</button>
    </div>
    
    <VueLunarCalendar
      v-model="selectedDate"
      :show-lunar="true"
    />
    
    <div class="selected-info" v-if="selectedDateInfo">
      <h4>选中日期信息:</h4>
      <p>公历: {{ selectedDateInfo.date }}</p>
      <p>农历: {{ selectedDateInfo.lunarDay }}</p>
      <p>干支: {{ selectedDateInfo.gzYear }}{{ selectedDateInfo.gzMonth }}{{ selectedDateInfo.gzDay }}</p>
      <p>生肖: {{ selectedDateInfo.animal }}</p>
      <p v-if="selectedDateInfo.term">节气: {{ selectedDateInfo.term }}</p>
      <p v-if="selectedDateInfo.festival">节日: {{ selectedDateInfo.festival }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { VueLunarCalendar, useCalendar } from 'vue-lunar-calendar'
import 'vue-lunar-calendar/style'

const selectedDate = ref('')

// 使用日历 composable
const {
  currentYear,
  currentMonth,
  goToPreviousMonth,
  goToNextMonth,
  goToToday,
  getDateInfo
} = useCalendar()

// 计算选中日期的详细信息
const selectedDateInfo = computed(() => {
  if (!selectedDate.value) return null
  return getDateInfo(selectedDate.value)
})
</script>

<style>
.calendar-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.calendar-controls button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.selected-info {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}
</style>
```

## 性能优化示例

### 10. 大数据量事件处理

```vue
<template>
  <div>
    <VueLunarCalendar
      v-model="selectedDate"
      :events="visibleEvents"
      :show-lunar="true"
      @year-change="onYearChange"
      @month-change="onMonthChange"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { VueLunarCalendar } from 'vue-lunar-calendar'
import 'vue-lunar-calendar/style'

const selectedDate = ref('')
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)

// 模拟大量事件数据
const allEvents = ref([])

// 只显示当前月份的事件（性能优化）
const visibleEvents = computed(() => {
  const startDate = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}-01`
  const endDate = `${currentYear.value}-${String(currentMonth.value).padStart(2, '0')}-31`
  
  return allEvents.value.filter(event => {
    return event.date >= startDate && event.date <= endDate
  })
})

const onYearChange = (year) => {
  currentYear.value = year
}

const onMonthChange = (year, month) => {
  currentYear.value = year
  currentMonth.value = month
}

// 初始化事件数据
const initEvents = () => {
  // 生成示例事件数据
  for (let i = 0; i < 1000; i++) {
    const date = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    allEvents.value.push({
      id: i.toString(),
      title: `事件 ${i + 1}`,
      date: date.toISOString().split('T')[0],
      type: 'event'
    })
  }
}

initEvents()
</script>
```

这些示例展示了 Vue 农历日历组件的各种使用场景，从基础的日期选择到复杂的事件管理系统。您可以根据具体需求选择合适的示例作为起点。

## 致谢

本项目的农历算法基于原作者的开源项目：[https://github.com/mumuy/calendar](https://github.com/mumuy/calendar)

感谢原作者提供的优秀农历算法实现。