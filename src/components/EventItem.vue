<template>
  <div 
    :class="[
      'event-item',
      `event-${event.type}`,
      {
        'is-all-day': !event.startTime,
        'is-recurring': event.recurring
      }
    ]"
    :style="{ borderLeftColor: event.color }"
    @click="$emit('click', event)"
  >
    <div class="event-header">
      <div class="event-time" v-if="event.startTime">
        {{ formatTime(event.startTime) }}
        <span v-if="event.endTime"> - {{ formatTime(event.endTime) }}</span>
      </div>
      <div class="event-type-badge" :style="{ backgroundColor: event.color }">
        {{ getTypeText(event.type) }}
      </div>
    </div>
    
    <div class="event-content">
      <h4 class="event-title">{{ event.title }}</h4>
      <p v-if="event.description" class="event-description">
        {{ event.description }}
      </p>
    </div>
    
    <div v-if="event.reminders?.length" class="event-reminders">
      <span class="reminder-icon">🔔</span>
      <span class="reminder-count">{{ event.reminders.length }}个提醒</span>
    </div>
    
    <div v-if="event.recurring" class="event-recurring">
      <span class="recurring-icon">🔄</span>
      <span class="recurring-text">{{ getRecurringText(event.recurring) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CalendarEvent, RecurringRule } from '../types'

interface Props {
  event: CalendarEvent
}

interface Emits {
  click: [event: CalendarEvent]
}

defineProps<Props>()
defineEmits<Emits>()

const formatTime = (time: string): string => {
  return time
}

const getTypeText = (type: string): string => {
  const typeMap: Record<string, string> = {
    event: '事件',
    reminder: '提醒',
    holiday: '节日',
    custom: '自定义'
  }
  return typeMap[type] || type
}

const getRecurringText = (recurring: RecurringRule): string => {
  const typeMap: Record<string, string> = {
    daily: '每日',
    weekly: '每周',
    monthly: '每月',
    yearly: '每年'
  }
  
  const typeText = typeMap[recurring.type] || recurring.type
  const intervalText = recurring.interval > 1 ? `每${recurring.interval}` : ''
  
  return `${intervalText}${typeText}重复`
}
</script>

<style scoped>
.event-item {
  padding: 12px;
  margin-bottom: 8px;
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-left: 4px solid var(--primary-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.event-item:hover {
  background: var(--hover-color);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.event-time {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.event-type-badge {
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 10px;
  color: white;
  font-weight: 500;
}

.event-content {
  margin-bottom: 8px;
}

.event-title {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  line-height: 1.3;
}

.event-description {
  margin: 0;
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-reminders,
.event-recurring {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #666;
  margin-top: 4px;
}

.reminder-icon,
.recurring-icon {
  font-size: 12px;
}

.event-event {
  border-left-color: #2196f3;
}

.event-reminder {
  border-left-color: #ff9800;
}

.event-holiday {
  border-left-color: #4caf50;
}

.event-custom {
  border-left-color: #9c27b0;
}

.is-all-day {
  background: linear-gradient(90deg, rgba(33, 150, 243, 0.1) 0%, transparent 100%);
}

.is-recurring::after {
  content: '🔄';
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 10px;
  opacity: 0.6;
}
</style>