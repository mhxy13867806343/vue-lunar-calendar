import { CalendarEvent, Reminder } from '../types';

export declare function useEvents(props?: any, emit?: any): {
    events: import('vue').Ref<{
        id: string;
        title: string;
        date: string;
        startTime?: string | undefined;
        endTime?: string | undefined;
        description?: string | undefined;
        color?: string | undefined;
        type?: "event" | "reminder" | "holiday" | undefined;
        reminders?: {
            id: string;
            time: number;
            type: "popup" | "email" | "notification";
        }[] | undefined;
        recurring?: {
            type: "daily" | "weekly" | "monthly" | "yearly";
            interval: number;
            endDate?: string | undefined;
            count?: number | undefined;
        } | undefined;
    }[], CalendarEvent[] | {
        id: string;
        title: string;
        date: string;
        startTime?: string | undefined;
        endTime?: string | undefined;
        description?: string | undefined;
        color?: string | undefined;
        type?: "event" | "reminder" | "holiday" | undefined;
        reminders?: {
            id: string;
            time: number;
            type: "popup" | "email" | "notification";
        }[] | undefined;
        recurring?: {
            type: "daily" | "weekly" | "monthly" | "yearly";
            interval: number;
            endDate?: string | undefined;
            count?: number | undefined;
        } | undefined;
    }[]>;
    selectedEvent: import('vue').Ref<{
        id: string;
        title: string;
        date: string;
        startTime?: string | undefined;
        endTime?: string | undefined;
        description?: string | undefined;
        color?: string | undefined;
        type?: "event" | "reminder" | "holiday" | undefined;
        reminders?: {
            id: string;
            time: number;
            type: "popup" | "email" | "notification";
        }[] | undefined;
        recurring?: {
            type: "daily" | "weekly" | "monthly" | "yearly";
            interval: number;
            endDate?: string | undefined;
            count?: number | undefined;
        } | undefined;
    } | null, CalendarEvent | {
        id: string;
        title: string;
        date: string;
        startTime?: string | undefined;
        endTime?: string | undefined;
        description?: string | undefined;
        color?: string | undefined;
        type?: "event" | "reminder" | "holiday" | undefined;
        reminders?: {
            id: string;
            time: number;
            type: "popup" | "email" | "notification";
        }[] | undefined;
        recurring?: {
            type: "daily" | "weekly" | "monthly" | "yearly";
            interval: number;
            endDate?: string | undefined;
            count?: number | undefined;
        } | undefined;
    } | null>;
    eventFilter: import('vue').Ref<string, string>;
    eventTypeFilter: import('vue').Ref<string, string>;
    eventsByDate: import('vue').ComputedRef<Record<string, CalendarEvent[]>>;
    filteredEvents: import('vue').ComputedRef<{
        id: string;
        title: string;
        date: string;
        startTime?: string | undefined;
        endTime?: string | undefined;
        description?: string | undefined;
        color?: string | undefined;
        type?: "event" | "reminder" | "holiday" | undefined;
        reminders?: {
            id: string;
            time: number;
            type: "popup" | "email" | "notification";
        }[] | undefined;
        recurring?: {
            type: "daily" | "weekly" | "monthly" | "yearly";
            interval: number;
            endDate?: string | undefined;
            count?: number | undefined;
        } | undefined;
    }[]>;
    getEventsForDate: (date: Date | string) => CalendarEvent[];
    getEventsInRange: (startDate: Date, endDate: Date) => CalendarEvent[];
    getDateEvents: (date: Date) => CalendarEvent[];
    addEvent: (event: Omit<CalendarEvent, "id">) => CalendarEvent;
    updateEvent: (id: string, updates: Partial<CalendarEvent>) => boolean;
    deleteEvent: (id: string) => boolean;
    deleteEvents: (ids: string[]) => number;
    duplicateEvent: (id: string, newDate?: string) => CalendarEvent | null;
    moveEvent: (id: string, newDate: string) => boolean;
    onEventClick: (event: CalendarEvent) => void;
    generateRecurringEvents: (event: CalendarEvent, maxCount?: number) => CalendarEvent[];
    addReminder: (eventId: string, reminder: Omit<Reminder, "id">) => boolean;
    removeReminder: (eventId: string, reminderId: string) => boolean;
    getUpcomingReminders: (withinMinutes?: number) => Array<{
        event: CalendarEvent;
        reminder: Reminder;
    }>;
    exportEvents: (format?: "json" | "ics") => string;
    importEvents: (data: string, format?: "json" | "ics") => number;
};
//# sourceMappingURL=useEvents.d.ts.map