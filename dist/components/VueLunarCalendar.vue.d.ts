import { DateInfo, CalendarEvent } from '../types';

interface CalendarProps {
    modelValue?: string | string[] | null;
    mode?: 'single' | 'multiple' | 'range';
    locale?: string;
    theme?: 'light' | 'dark';
    showLunar?: boolean;
    showFestivals?: boolean;
    showTerms?: boolean;
    showWeekNumbers?: boolean;
    firstDayOfWeek?: number;
    selectable?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    events?: any[];
    holidays?: Record<string, string>;
    minDate?: string;
    maxDate?: string;
    disabledDates?: string[] | ((date: string) => boolean);
}
declare function __VLS_template(): {
    default?(_: {
        date: DateInfo;
        events: CalendarEvent[];
    }): any;
    event?(_: {
        event: CalendarEvent;
    }): any;
    sidebar?(_: {
        selectedDate: string | null;
    }): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<CalendarProps>, {
    mode: string;
    locale: string;
    theme: string;
    showLunar: boolean;
    showFestivals: boolean;
    showTerms: boolean;
    showWeekNumbers: boolean;
    firstDayOfWeek: number;
    selectable: boolean;
    readonly: boolean;
    disabled: boolean;
    events: () => never[];
    holidays: () => {};
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    dblclick: (date: string, dateInfo: DateInfo) => void;
    contextmenu: (date: string, dateInfo: DateInfo, event: MouseEvent) => void;
    eventClick: (event: any) => void;
    select: (date: string, dateInfo: DateInfo) => void;
    "update:modelValue": (value: string | string[] | null) => void;
    yearChange: (year: number) => void;
    monthChange: (year: number, month: number) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<CalendarProps>, {
    mode: string;
    locale: string;
    theme: string;
    showLunar: boolean;
    showFestivals: boolean;
    showTerms: boolean;
    showWeekNumbers: boolean;
    firstDayOfWeek: number;
    selectable: boolean;
    readonly: boolean;
    disabled: boolean;
    events: () => never[];
    holidays: () => {};
}>>> & Readonly<{
    onDblclick?: ((date: string, dateInfo: DateInfo) => any) | undefined;
    onContextmenu?: ((date: string, dateInfo: DateInfo, event: MouseEvent) => any) | undefined;
    onEventClick?: ((event: any) => any) | undefined;
    onSelect?: ((date: string, dateInfo: DateInfo) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | string[] | null) => any) | undefined;
    onYearChange?: ((year: number) => any) | undefined;
    onMonthChange?: ((year: number, month: number) => any) | undefined;
}>, {
    events: any[];
    disabled: boolean;
    showLunar: boolean;
    showFestivals: boolean;
    showTerms: boolean;
    locale: string;
    theme: "light" | "dark";
    mode: "single" | "multiple" | "range";
    showWeekNumbers: boolean;
    firstDayOfWeek: number;
    selectable: boolean;
    readonly: boolean;
    holidays: Record<string, string>;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=VueLunarCalendar.vue.d.ts.map