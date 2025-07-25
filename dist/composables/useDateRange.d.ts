export interface UseDateRangeOptions {
    startDate?: string | null;
    endDate?: string | null;
    minDate?: string | null;
    maxDate?: string | null;
    disabledDates?: string[];
    disabledDaysOfWeek?: number[];
    enabledDates?: string[];
}
export declare function useDateRange(props?: any, emit?: any): {
    rangeStart: import('vue').Ref<string | null, string | null>;
    rangeEnd: import('vue').Ref<string | null, string | null>;
    previewRange: import('vue').Ref<{
        start: string;
        end: string;
    } | null, {
        start: string;
        end: string;
    } | {
        start: string;
        end: string;
    } | null>;
    isRangeValid: import('vue').ComputedRef<boolean>;
    isRangeComplete: import('vue').ComputedRef<boolean>;
    currentRange: import('vue').ComputedRef<{
        start: string;
        end: string;
        days: number;
        dates: string[];
    } | null>;
    isDateDisabled: (date: string) => boolean;
    isDateInRange: (date: string) => boolean;
    isDateInPreviewRange: (date: string) => boolean;
    isRangeStartDate: (date: string) => boolean;
    isRangeEndDate: (date: string) => boolean;
    isInRange: (date: string) => boolean;
    isRangeStart: (date: string) => boolean;
    isRangeEnd: (date: string) => boolean;
    setRangeStart: (date: string | null) => void;
    setRangeEnd: (date: string | null) => void;
    setRange: (start: string | null, end: string | null) => void;
    clearRange: () => void;
    setPreviewRange: (start: string, end: string) => void;
    clearPreviewRange: () => void;
    getDatesInRange: () => string[];
    getRangeDays: () => number;
    getNextAvailableDate: (date: string, direction?: "forward" | "backward") => string | null;
    onMouseDown: (event: MouseEvent) => void;
    onMouseMove: (event: MouseEvent) => void;
    onMouseUp: (event: MouseEvent) => void;
    onMouseLeave: (event: MouseEvent) => void;
    onDateHover: (date: any) => void;
};
//# sourceMappingURL=useDateRange.d.ts.map