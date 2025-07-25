export type SelectionMode = 'single' | 'multiple' | 'range';
export interface UseSelectionOptions {
    mode?: SelectionMode;
    modelValue?: string | string[] | null;
    disabled?: (date: string) => boolean;
    readonly?: boolean;
}
export declare function useSelection(props?: any, emit?: any): {
    selectedDates: import('vue').Ref<string[], string[]>;
    selectedDate: import('vue').Ref<any, any>;
    hoveredDate: import('vue').Ref<string | null, string | null>;
    isDragging: import('vue').Ref<boolean, boolean>;
    dragStartDate: import('vue').Ref<string | null, string | null>;
    currentValue: import('vue').ComputedRef<string | string[] | null>;
    isSelected: (date: string) => boolean;
    isInRange: (date: string) => boolean;
    isRangeStart: (date: string) => boolean;
    isRangeEnd: (date: string) => boolean;
    selectDate: (date: string) => void;
    onDateClick: (date: any) => void;
    clearSelection: () => void;
    startDrag: (date: string) => void;
    onDrag: (date: string) => void;
    endDrag: () => void;
    setHoveredDate: (date: string | null) => void;
};
//# sourceMappingURL=useSelection.d.ts.map