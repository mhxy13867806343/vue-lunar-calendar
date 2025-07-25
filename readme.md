# Vue 3 农历日历组件

一个功能丰富的Vue 3农历日历组件，支持农历显示、节日节气、事件管理、多种选择模式等功能。

## 特性

- 🌙 **农历支持** - 显示农历日期、节气、传统节日
- 📅 **多种选择模式** - 单选、多选、范围选择
- 🎨 **主题切换** - 支持明暗主题
- 🌍 **国际化** - 支持中文、英文等多语言
- 📱 **响应式设计** - 适配移动端和桌面端
- 🎯 **事件管理** - 支持添加、显示、管理日程事件
- ♿ **无障碍访问** - 支持键盘导航和屏幕阅读器

## 安装

```bash
npm install vue-lunar-calendar
# 或
yarn add vue-lunar-calendar
# 或
pnpm add vue-lunar-calendar
```

## 快速开始

### 基础用法

```vue
<template>
  <VueLunarCalendar
    v-model="selectedDate"
    :show-lunar="true"
    :show-festivals="true"
    :show-terms="true"
  />
</template>

<script setup>
import { ref } from 'vue'
import VueLunarCalendar from 'vue-lunar-calendar'

const selectedDate = ref('')
</script>
```

### 完整示例

```vue
<template>
  <div>
    <!-- 单选模式 -->
    <VueLunarCalendar
      v-model="selectedDate"
      :selection-mode="'single'"
      :locale="'zh-CN'"
      :theme="'light'"
      :show-lunar="true"
      :show-festivals="true"
      :show-terms="true"
      :events="events"
      @select="onDateSelect"
      @dblclick="onDateDoubleClick"
      @contextmenu="onDateRightClick"
      @event-click="onEventClick"
    />

    <!-- 范围选择模式 -->
    <VueLunarCalendar
      v-model="selectedRange"
      :selection-mode="'range'"
      :locale="'zh-CN'"
      @range-select="onRangeSelect"
    />

    <!-- 多选模式 -->
    <VueLunarCalendar
      v-model="selectedDates"
      :selection-mode="'multiple'"
      :locale="'zh-CN'"
      @select="onMultipleSelect"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueLunarCalendar from 'vue-lunar-calendar'

// 单选
const selectedDate = ref('')

// 范围选择
const selectedRange = ref(null)

// 多选
const selectedDates = ref([])

// 事件数据
const events = ref([
  {
    id: '1',
    title: '会议',
    date: '2024-01-15',
    description: '团队会议',
    type: 'event',
    color: '#1976d2'
  }
])

// 事件处理
const onDateSelect = (date, dateInfo) => {
  console.log('选择日期:', date, dateInfo)
}

const onDateDoubleClick = (date, dateInfo) => {
  console.log('双击日期:', date, dateInfo)
}

const onDateRightClick = (date, dateInfo, event) => {
  console.log('右键点击:', date, dateInfo)
}

const onRangeSelect = (range) => {
  console.log('范围选择:', range)
}

const onMultipleSelect = (date, dateInfo) => {
  console.log('多选:', date, dateInfo)
}

const onEventClick = (event) => {
  console.log('事件点击:', event)
}
</script>
```

## API 文档

### Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `modelValue` | `string \| string[] \| DateRange \| null` | `null` | 绑定值，根据选择模式不同类型不同 |
| `selectionMode` | `'single' \| 'multiple' \| 'range'` | `'single'` | 选择模式 |
| `locale` | `'zh-CN' \| 'en-US'` | `'zh-CN'` | 语言设置 |
| `theme` | `'light' \| 'dark'` | `'light'` | 主题模式 |
| `showLunar` | `boolean` | `true` | 是否显示农历 |
| `showFestivals` | `boolean` | `true` | 是否显示节日 |
| `showTerms` | `boolean` | `true` | 是否显示节气 |
| `events` | `CalendarEvent[]` | `[]` | 事件数据 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `readonly` | `boolean` | `false` | 是否只读 |
| `clearable` | `boolean` | `true` | 是否可清除 |
| `minDate` | `string` | `undefined` | 最小可选日期 |
| `maxDate` | `string` | `undefined` | 最大可选日期 |
| `disabledDates` | `string[] \| ((date: string) => boolean)` | `undefined` | 禁用的日期 |

### Events 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `value` | 值更新时触发 |
| `select` | `(date: string, dateInfo: DateInfo)` | 选择日期时触发 |
| `dblclick` | `(date: string, dateInfo: DateInfo)` | 双击日期时触发 |
| `contextmenu` | `(date: string, dateInfo: DateInfo, event: MouseEvent)` | 右键点击日期时触发 |
| `range-select` | `(range: DateRange)` | 范围选择完成时触发 |
| `event-click` | `(event: CalendarEvent)` | 点击事件时触发 |
| `year-change` | `(year: number)` | 年份改变时触发 |
| `month-change` | `(year: number, month: number)` | 月份改变时触发 |

### 类型定义

```typescript
// 日期信息
interface DateInfo {
  date: string          // 公历日期 YYYY-MM-DD
  sDay: number         // 公历日
  sYear: number        // 公历年
  sMonth: number       // 公历月
  lunarDay: string     // 农历日显示文本
  lMonth: number       // 农历月
  lDay: number         // 农历日
  isLeapMonth: boolean // 是否闰月
  gzYear: string       // 干支年
  gzMonth: string      // 干支月
  gzDay: string        // 干支日
  animal: string       // 生肖
  term: string         // 节气
  festival: string     // 公历节日
  lunarFestival: string // 农历节日
  worktime: number     // 工作日标识
}

// 日期范围
interface DateRange {
  start: string
  end: string
}

// 日历事件
interface CalendarEvent {
  id: string
  title: string
  date: string
  startTime?: string
  endTime?: string
  description?: string
  type: 'event' | 'reminder' | 'holiday'
  color?: string
  reminders?: EventReminder[]
}

// 事件提醒
interface EventReminder {
  id: string
  time: number // 提前分钟数
  type: 'notification' | 'email' | 'sms'
}
```

## 使用场景

### 1. 单日期选择

适用于生日选择、预约日期等场景：

```vue
<VueLunarCalendar
  v-model="birthday"
  :selection-mode="'single'"
  :show-lunar="true"
/>
```

### 2. 日期范围选择

适用于酒店预订、请假申请等场景：

```vue
<VueLunarCalendar
  v-model="dateRange"
  :selection-mode="'range'"
  @range-select="onRangeSelect"
/>
```

### 3. 多日期选择

适用于排班、多日程安排等场景：

```vue
<VueLunarCalendar
  v-model="workDays"
  :selection-mode="'multiple'"
  @select="onMultipleSelect"
/>
```

### 4. 事件日历

适用于日程管理、活动安排等场景：

```vue
<VueLunarCalendar
  v-model="selectedDate"
  :events="events"
  @event-click="onEventClick"
  @dblclick="onAddEvent"
/>
```

## 样式定制

组件支持CSS变量定制：

```css
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
}
```

## 国际化

组件内置中英文支持，可通过 `locale` 属性切换：

```vue
<!-- 中文 -->
<VueLunarCalendar :locale="'zh-CN'" />

<!-- 英文 -->
<VueLunarCalendar :locale="'en-US'" />
```

## 主题切换

支持明暗主题切换：

```vue
<VueLunarCalendar :theme="isDark ? 'dark' : 'light'" />
```

## 无障碍访问

组件支持键盘导航和屏幕阅读器：

- 使用 `Tab` 键在日期间导航
- 使用 `Enter` 或 `Space` 选择日期
- 使用方向键快速移动
- 支持 ARIA 标签和角色

## 浏览器兼容性

- Vue 3.0+
- 现代浏览器 (Chrome, Firefox, Safari, Edge)
- IE 11+ (需要polyfill)

## 算法标准

农历算法根据《中华人民共和国国家标准GB/T33661—2017〈农历的编算和颁行〉》标准开发，明确了干支纪年和生肖纪年起于正月初一0点，与农历新年同步。

## 开发

```bash
# 克隆项目
git clone https://github.com/mhxy13867806343/vue-lunar-calendar.git

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 测试
npm run test
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 致谢

本项目的农历算法基于原作者的开源项目：[https://github.com/mumuy/calendar](https://github.com/mumuy/calendar)

感谢原作者提供的优秀农历算法实现。

## 许可证

MIT License

## 更新日志

### v2.0.0
- 重构为 Vue 3 组合式 API
- 新增多种选择模式
- 优化性能和用户体验
- 完善类型定义

### v1.x
- Vue 2 版本
- 基础农历日历功能
