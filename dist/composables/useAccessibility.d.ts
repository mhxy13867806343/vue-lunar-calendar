import { DateInfo } from '../types';

export declare function useAccessibility(): {
    focusedDate: import('vue').Ref<Date | null, Date | null>;
    isKeyboardNavigation: import('vue').Ref<boolean, boolean>;
    announcements: import('vue').Ref<string[], string[]>;
    isHighContrast: import('vue').Ref<boolean, boolean>;
    prefersReducedMotion: import('vue').Ref<boolean, boolean>;
    handleKeyDown: (event: KeyboardEvent, calendarDates: DateInfo[], onDateSelect: (date: Date) => void) => void;
    handleMouseEnter: (date: Date) => void;
    handleMouseLeave: () => void;
    handleClick: (date: Date) => void;
    getDateAriaLabel: (dateInfo: DateInfo) => string;
    getCalendarGridProps: () => {
        role: string;
        'aria-label': string;
        'aria-readonly': string;
        'aria-multiselectable': string;
    };
    getDateCellProps: (dateInfo: DateInfo) => {
        role: string;
        'aria-label': string;
        'aria-selected': string;
        'aria-disabled': string;
        'aria-current': string | undefined;
        tabindex: number;
        'data-date': any;
    };
    getNavigationButtonProps: (type: "prevYear" | "nextYear" | "prevMonth" | "nextMonth" | "today") => {
        'aria-label': string;
        type: string;
    };
    announce: (message: string) => void;
    announceMonthChange: (year: number, month: number) => void;
    announceSelectionChange: (selectedDates: Date[]) => void;
    announceRangeSelection: (startDate: Date, endDate: Date) => void;
    focusDate: (date: Date) => void;
    clearFocus: () => void;
    formatDateForAnnouncement: (date: Date) => string;
    isSameDay: (date1: Date, date2: Date) => boolean;
};
//# sourceMappingURL=useAccessibility.d.ts.map