import { ref, computed, watch } from 'vue'
import type { CalendarEvent, Reminder, RecurringRule, DateRange } from '../types'

export function useEvents(props?: any, emit?: any) {
  const events = ref<CalendarEvent[]>([...(props?.events || [])])
  const selectedEvent = ref<CalendarEvent | null>(null)
  const eventFilter = ref<string>('')
  const eventTypeFilter = ref<string>('all')
  
  // 按日期分组的事件
  const eventsByDate = computed(() => {
    const grouped: Record<string, CalendarEvent[]> = {}
    
    events.value.forEach(event => {
      const dateKey = formatDateKey(event.date)
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(event)
      
      // 处理重复事件
      if (event.recurring) {
        const recurringEvents = generateRecurringEvents(event)
        recurringEvents.forEach(recurringEvent => {
          const recurringDateKey = formatDateKey(recurringEvent.date)
          if (!grouped[recurringDateKey]) {
            grouped[recurringDateKey] = []
          }
          grouped[recurringDateKey].push(recurringEvent)
        })
      }
    })
    
    return grouped
  })
  
  // 过滤后的事件
  const filteredEvents = computed(() => {
    return events.value.filter(event => {
      const matchesText = !eventFilter.value || 
        event.title.toLowerCase().includes(eventFilter.value.toLowerCase()) ||
        event.description?.toLowerCase().includes(eventFilter.value.toLowerCase())
      
      const matchesType = eventTypeFilter.value === 'all' || 
        event.type === eventTypeFilter.value
      
      return matchesText && matchesType
    })
  })
  
  // 获取指定日期的事件
  const getEventsForDate = (date: Date | string): CalendarEvent[] => {
    const dateKey = typeof date === 'string' ? date : formatDateKey(date.toISOString().split('T')[0])
    return eventsByDate.value[dateKey] || []
  }
  
  // 获取日期范围内的事件
  const getEventsInRange = (startDate: Date, endDate: Date): CalendarEvent[] => {
    const rangeEvents: CalendarEvent[] = []
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dayEvents = getEventsForDate(date)
      rangeEvents.push(...dayEvents)
    }
    
    return rangeEvents
  }
  
  // 添加事件
  const addEvent = (event: Omit<CalendarEvent, 'id'>): CalendarEvent => {
    const newEvent: CalendarEvent = {
      ...event,
      id: generateEventId(),
      type: event.type || 'event',
      color: event.color || getDefaultColor(event.type || 'event')
    }
    
    events.value.push(newEvent)
    return newEvent
  }
  
  // 更新事件
  const updateEvent = (id: string, updates: Partial<CalendarEvent>): boolean => {
    const index = events.value.findIndex(event => event.id === id)
    if (index >= 0) {
      events.value[index] = { ...events.value[index], ...updates }
      return true
    }
    return false
  }
  
  // 删除事件
  const deleteEvent = (id: string): boolean => {
    const index = events.value.findIndex(event => event.id === id)
    if (index >= 0) {
      events.value.splice(index, 1)
      if (selectedEvent.value?.id === id) {
        selectedEvent.value = null
      }
      return true
    }
    return false
  }
  
  // 批量删除事件
  const deleteEvents = (ids: string[]): number => {
    let deletedCount = 0
    ids.forEach(id => {
      if (deleteEvent(id)) {
        deletedCount++
      }
    })
    return deletedCount
  }
  
  // 复制事件
  const duplicateEvent = (id: string, newDate?: string): CalendarEvent | null => {
    const event = events.value.find(e => e.id === id)
    if (!event) return null
    
    const duplicated = {
      ...event,
      date: newDate || event.date,
      title: `${event.title} (副本)`
    }
    
    delete (duplicated as any).id
    return addEvent(duplicated)
  }
  
  // 移动事件到新日期
  const moveEvent = (id: string, newDate: string): boolean => {
    return updateEvent(id, { date: newDate })
  }
  
  // 生成重复事件
  const generateRecurringEvents = (event: CalendarEvent, maxCount: number = 100): CalendarEvent[] => {
    if (!event.recurring) return []
    
    const recurringEvents: CalendarEvent[] = []
    const startDate = new Date(event.date)
    const { type, interval, endDate, count } = event.recurring
    
    let currentDate = new Date(startDate)
    let generatedCount = 0
    const maxDate = endDate ? new Date(endDate) : new Date(startDate.getFullYear() + 2, 11, 31)
    const targetCount = count || maxCount
    
    while (generatedCount < targetCount && currentDate <= maxDate) {
      // 根据重复类型计算下一个日期
      switch (type) {
        case 'daily':
          currentDate.setDate(currentDate.getDate() + interval)
          break
        case 'weekly':
          currentDate.setDate(currentDate.getDate() + (7 * interval))
          break
        case 'monthly':
          currentDate.setMonth(currentDate.getMonth() + interval)
          break
        case 'yearly':
          currentDate.setFullYear(currentDate.getFullYear() + interval)
          break
      }
      
      if (currentDate <= maxDate) {
        recurringEvents.push({
          ...event,
          id: `${event.id}_recurring_${generatedCount}`,
          date: currentDate.toISOString().split('T')[0]
        })
        generatedCount++
      }
    }
    
    return recurringEvents
  }
  
  // 提醒管理
  const addReminder = (eventId: string, reminder: Omit<Reminder, 'id'>): boolean => {
    const event = events.value.find(e => e.id === eventId)
    if (!event) return false
    
    if (!event.reminders) {
      event.reminders = []
    }
    
    const newReminder: Reminder = {
      ...reminder,
      id: generateReminderId()
    }
    
    event.reminders.push(newReminder)
    return true
  }
  
  const removeReminder = (eventId: string, reminderId: string): boolean => {
    const event = events.value.find(e => e.id === eventId)
    if (!event || !event.reminders) return false
    
    const index = event.reminders.findIndex(r => r.id === reminderId)
    if (index >= 0) {
      event.reminders.splice(index, 1)
      return true
    }
    return false
  }
  
  // 获取即将到来的提醒
  const getUpcomingReminders = (withinMinutes: number = 60): Array<{event: CalendarEvent, reminder: Reminder}> => {
    const now = new Date()
    const upcoming: Array<{event: CalendarEvent, reminder: Reminder}> = []
    
    events.value.forEach(event => {
      if (!event.reminders) return
      
      event.reminders.forEach(reminder => {
        const eventDateTime = new Date(`${event.date}T${event.startTime || '00:00'}`)
        const reminderTime = new Date(eventDateTime.getTime() - (reminder.time * 60 * 1000))
        const timeDiff = reminderTime.getTime() - now.getTime()
        
        if (timeDiff > 0 && timeDiff <= withinMinutes * 60 * 1000) {
          upcoming.push({ event, reminder })
        }
      })
    })
    
    return upcoming.sort((a, b) => {
      const aTime = new Date(`${a.event.date}T${a.event.startTime || '00:00'}`).getTime() - (a.reminder.time * 60 * 1000)
      const bTime = new Date(`${b.event.date}T${b.event.startTime || '00:00'}`).getTime() - (b.reminder.time * 60 * 1000)
      return aTime - bTime
    })
  }
  
  // 导入/导出事件
  const exportEvents = (format: 'json' | 'ics' = 'json'): string => {
    if (format === 'json') {
      return JSON.stringify(events.value, null, 2)
    } else {
      // 简单的ICS格式导出
      let ics = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Vue Lunar Calendar//EN\n'
      
      events.value.forEach(event => {
        ics += 'BEGIN:VEVENT\n'
        ics += `UID:${event.id}\n`
        ics += `DTSTART:${event.date.replace(/-/g, '')}\n`
        ics += `SUMMARY:${event.title}\n`
        if (event.description) {
          ics += `DESCRIPTION:${event.description}\n`
        }
        ics += 'END:VEVENT\n'
      })
      
      ics += 'END:VCALENDAR'
      return ics
    }
  }
  
  const importEvents = (data: string, format: 'json' | 'ics' = 'json'): number => {
    try {
      if (format === 'json') {
        const importedEvents = JSON.parse(data) as CalendarEvent[]
        let addedCount = 0
        
        importedEvents.forEach(event => {
          // 确保ID唯一
          const newEvent = { ...event, id: generateEventId() }
          events.value.push(newEvent)
          addedCount++
        })
        
        return addedCount
      }
      // ICS导入可以在这里实现
      return 0
    } catch (error) {
      console.error('导入事件失败:', error)
      return 0
    }
  }
  
  // 工具函数
  const formatDateKey = (date: string): string => {
    return date.split('T')[0]
  }
  
  const generateEventId = (): string => {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  
  const generateReminderId = (): string => {
    return `reminder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  
  const getDefaultColor = (type: string): string => {
    const colorMap: Record<string, string> = {
      event: '#2196f3',
      reminder: '#ff9800',
      holiday: '#4caf50',
      custom: '#9c27b0'
    }
    return colorMap[type] || '#2196f3'
  }
  
  // 监听初始事件变化
  if (props) {
    watch(() => props.events, (newEvents) => {
      events.value = [...(newEvents || [])]
    }, { deep: true })
  }
  
  // 获取指定日期的事件（用于组件）
  const getDateEvents = (date: Date): CalendarEvent[] => {
    return getEventsForDate(date)
  }
  
  // 事件点击处理
  const onEventClick = (event: CalendarEvent) => {
    selectedEvent.value = event
    if (emit) {
      emit('event-click', event)
    }
  }

  return {
    // 状态
    events,
    selectedEvent,
    eventFilter,
    eventTypeFilter,
    
    // 计算属性
    eventsByDate,
    filteredEvents,
    
    // 查询方法
    getEventsForDate,
    getEventsInRange,
    getDateEvents,
    
    // 事件管理
    addEvent,
    updateEvent,
    deleteEvent,
    deleteEvents,
    duplicateEvent,
    moveEvent,
    onEventClick,
    
    // 重复事件
    generateRecurringEvents,
    
    // 提醒管理
    addReminder,
    removeReminder,
    getUpcomingReminders,
    
    // 导入导出
    exportEvents,
    importEvents
  }
}