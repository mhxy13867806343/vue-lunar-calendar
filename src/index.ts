// 主组件
export { default as VueLunarCalendar } from './components/VueLunarCalendar.vue'
export { default as CalendarCell } from './components/CalendarCell.vue'
export { default as EventItem } from './components/EventItem.vue'
export { default as IconComponent } from './components/IconComponent.vue'

// Composables
export { useCalendar } from './composables/useCalendar'
export { useEvents } from './composables/useEvents'
export { useTheme } from './composables/useTheme'
export { useLocale } from './composables/useLocale'
export { useAccessibility } from './composables/useAccessibility'

// 类型定义
export type {
  DateInfo,
  CalendarEvent,
  Reminder,
  RecurringRule,
  DateRange,
  CalendarTheme,
  CalendarLocale,
  CalendarProps,
  CalendarEmits,
  VirtualScrollOptions
} from './types'

// 核心日历逻辑（保持向后兼容）
// export { LunarCalendar } from './module/calendar'

// 安装函数（用于Vue插件）
import type { App } from 'vue'
import VueLunarCalendar from './components/VueLunarCalendar.vue'

export const install = (app: App) => {
  app.component('VueLunarCalendar', VueLunarCalendar)
}

// 默认导出
export default {
  install,
  VueLunarCalendar
}

// 版本信息
export const version = '2.0.0'