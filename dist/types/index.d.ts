export interface DateInfo {
    date: string;
    solar: {
        year: number;
        month: number;
        day: number;
    };
    lunar: {
        year: number;
        month: number;
        day: number;
        isLeap: boolean;
        monthName: string;
        dayName: string;
    };
    sYear: number;
    sMonth: number;
    sDay: number;
    lYear: number;
    lMonth: number;
    lDay: number;
    lDayZH?: string;
    lMonthZH?: string;
    week: number;
    weekZH?: string;
    zodiac?: string;
    animal?: string;
    ganZhi: {
        year: string;
        month: string;
        day: string;
    };
    gzYearZH?: string;
    gzMonthZH?: string;
    gzDayZH?: string;
    solarTerm?: string;
    term?: string;
    festival?: string;
    isToday: boolean;
    isCurrentMonth: boolean;
    isWeekend: boolean;
    isHoliday: boolean;
    isSelected: boolean;
    isInRange: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
    isDisabled: boolean;
}
export interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    startTime?: string;
    endTime?: string;
    description?: string;
    color?: string;
    type?: 'event' | 'reminder' | 'holiday';
    reminders?: Reminder[];
    recurring?: RecurringRule;
}
export interface Reminder {
    id: string;
    time: number;
    type: 'popup' | 'email' | 'notification';
}
export interface RecurringRule {
    type: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
    count?: number;
}
export interface DateRange {
    start: string;
    end: string;
}
export interface CalendarTheme {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
    hover: string;
    selected: string;
    today: string;
    weekend: string;
    holiday: string;
    disabled: string;
}
export interface CalendarLocale {
    name: string;
    weekdays: string[];
    weekdaysShort: string[];
    months: string[];
    monthsShort: string[];
    today: string;
    clear: string;
    confirm: string;
    cancel: string;
    prevYear: string;
    nextYear: string;
    prevMonth: string;
    nextMonth: string;
    yearFormat: string;
    monthFormat: string;
    dateFormat: string;
}
export interface CalendarProps {
    modelValue?: string | DateRange | string[];
    mode?: 'single' | 'range' | 'multiple';
    selectionMode?: 'single' | 'range' | 'multiple';
    weekStartsOn?: 'sunday' | 'monday';
    locale?: string;
    theme?: 'light' | 'dark' | 'auto';
    customTheme?: Partial<CalendarTheme>;
    events?: CalendarEvent[];
    holidays?: Record<string, string>;
    minDate?: string;
    maxDate?: string;
    disabledDates?: string[] | ((date: string) => boolean);
    showLunar?: boolean;
    showFestivals?: boolean;
    showTerms?: boolean;
    showWeekNumbers?: boolean;
    firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    selectable?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    clearable?: boolean;
}
export interface CalendarEmits {
    'update:modelValue': [value: string | DateRange | string[]];
    'select': [date: string, dateInfo: DateInfo];
    'change': [date: string, dateInfo: DateInfo];
    'rangeSelect': [range: DateRange];
    'eventClick': [event: CalendarEvent, date: string];
    'monthChange': [year: number, month: number];
    'yearChange': [year: number];
}
export interface VirtualScrollOptions {
    enabled: boolean;
    itemHeight: number;
    bufferSize: number;
}
//# sourceMappingURL=index.d.ts.map