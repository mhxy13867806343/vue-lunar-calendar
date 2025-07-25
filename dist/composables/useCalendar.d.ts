import { DateInfo, CalendarProps } from '../types';

export declare function useCalendar(props: CalendarProps): {
    currentDate: import('vue').Ref<Date, Date>;
    viewDate: import('vue').Ref<Date, Date>;
    selectedDates: import('vue').Ref<Date[], Date[]>;
    rangeStart: import('vue').Ref<Date | null, Date | null>;
    rangeEnd: import('vue').Ref<Date | null, Date | null>;
    isDragging: import('vue').Ref<boolean, boolean>;
    currentYear: import('vue').WritableComputedRef<number, number>;
    currentMonth: import('vue').WritableComputedRef<number, number>;
    monthStart: import('vue').ComputedRef<Date>;
    monthEnd: import('vue').ComputedRef<Date>;
    calendarDates: import('vue').ComputedRef<DateInfo[]>;
    prevMonth: () => void;
    nextMonth: () => void;
    prevYear: () => void;
    nextYear: () => void;
    goToday: () => void;
    goToDate: (date: Date) => void;
    selectDate: (date: Date, event?: MouseEvent) => void;
    startDragSelection: (date: Date) => void;
    updateDragSelection: (date: Date) => void;
    endDragSelection: () => void;
    clearSelection: () => void;
    isSameDay: (date1: Date, date2: Date) => boolean;
    isDateSelected: (date: Date) => boolean;
    isDateInRange: (date: Date) => boolean;
    isRangeStart: (date: Date) => boolean;
    isRangeEnd: (date: Date) => boolean;
};
//# sourceMappingURL=useCalendar.d.ts.map