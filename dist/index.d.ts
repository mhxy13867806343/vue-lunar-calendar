import { App } from 'vue';
export { default as VueLunarCalendar } from './components/VueLunarCalendar.vue';
export { default as CalendarCell } from './components/CalendarCell.vue';
export { default as EventItem } from './components/EventItem.vue';
export { default as IconComponent } from './components/IconComponent.vue';
export { useCalendar } from './composables/useCalendar';
export { useEvents } from './composables/useEvents';
export { useTheme } from './composables/useTheme';
export { useLocale } from './composables/useLocale';
export { useAccessibility } from './composables/useAccessibility';
export type { DateInfo, CalendarEvent, Reminder, RecurringRule, DateRange, CalendarTheme, CalendarLocale, CalendarProps, CalendarEmits, VirtualScrollOptions } from './types';
export declare const install: (app: App) => void;
declare const _default: {
    install: (app: App) => void;
    VueLunarCalendar: {
        new (...args: any[]): import('vue').CreateComponentPublicInstanceWithMixins<Readonly<import('vue').ExtractPropTypes<{
            events: {
                type: import('vue').PropType<any[]>;
                default: () => never[];
            };
            disabled: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            showLunar: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            showFestivals: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            showTerms: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            locale: {
                type: import('vue').PropType<string>;
                default: string;
            };
            theme: {
                type: import('vue').PropType<"light" | "dark">;
                default: string;
            };
            modelValue: {
                type: import('vue').PropType<string | string[] | null>;
            };
            mode: {
                type: import('vue').PropType<"single" | "range" | "multiple">;
                default: string;
            };
            showWeekNumbers: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            firstDayOfWeek: {
                type: import('vue').PropType<number>;
                default: number;
            };
            selectable: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            readonly: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            clearable: {
                type: import('vue').PropType<boolean>;
            };
            holidays: {
                type: import('vue').PropType<Record<string, string>>;
                default: () => {};
            };
            minDate: {
                type: import('vue').PropType<string>;
            };
            maxDate: {
                type: import('vue').PropType<string>;
            };
            disabledDates: {
                type: import('vue').PropType<string[] | ((date: string) => boolean)>;
            };
        }>> & Readonly<{
            onDblclick?: ((date: string, dateInfo: import('./types').DateInfo) => any) | undefined;
            onContextmenu?: ((date: string, dateInfo: import('./types').DateInfo, event: MouseEvent) => any) | undefined;
            onEventClick?: ((event: any) => any) | undefined;
            onSelect?: ((date: string, dateInfo: import('./types').DateInfo) => any) | undefined;
            "onUpdate:modelValue"?: ((value: string | string[] | null) => any) | undefined;
            onYearChange?: ((year: number) => any) | undefined;
            onMonthChange?: ((year: number, month: number) => any) | undefined;
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            dblclick: (date: string, dateInfo: import('./types').DateInfo) => void;
            contextmenu: (date: string, dateInfo: import('./types').DateInfo, event: MouseEvent) => void;
            eventClick: (event: any) => void;
            select: (date: string, dateInfo: import('./types').DateInfo) => void;
            "update:modelValue": (value: string | string[] | null) => void;
            yearChange: (year: number) => void;
            monthChange: (year: number, month: number) => void;
        }, import('vue').PublicProps, {
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
        }, true, {}, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, {}, any, import('vue').ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import('vue').ExtractPropTypes<{
            events: {
                type: import('vue').PropType<any[]>;
                default: () => never[];
            };
            disabled: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            showLunar: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            showFestivals: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            showTerms: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            locale: {
                type: import('vue').PropType<string>;
                default: string;
            };
            theme: {
                type: import('vue').PropType<"light" | "dark">;
                default: string;
            };
            modelValue: {
                type: import('vue').PropType<string | string[] | null>;
            };
            mode: {
                type: import('vue').PropType<"single" | "range" | "multiple">;
                default: string;
            };
            showWeekNumbers: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            firstDayOfWeek: {
                type: import('vue').PropType<number>;
                default: number;
            };
            selectable: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            readonly: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            clearable: {
                type: import('vue').PropType<boolean>;
            };
            holidays: {
                type: import('vue').PropType<Record<string, string>>;
                default: () => {};
            };
            minDate: {
                type: import('vue').PropType<string>;
            };
            maxDate: {
                type: import('vue').PropType<string>;
            };
            disabledDates: {
                type: import('vue').PropType<string[] | ((date: string) => boolean)>;
            };
        }>> & Readonly<{
            onDblclick?: ((date: string, dateInfo: import('./types').DateInfo) => any) | undefined;
            onContextmenu?: ((date: string, dateInfo: import('./types').DateInfo, event: MouseEvent) => any) | undefined;
            onEventClick?: ((event: any) => any) | undefined;
            onSelect?: ((date: string, dateInfo: import('./types').DateInfo) => any) | undefined;
            "onUpdate:modelValue"?: ((value: string | string[] | null) => any) | undefined;
            onYearChange?: ((year: number) => any) | undefined;
            onMonthChange?: ((year: number, month: number) => any) | undefined;
        }>, {}, {}, {}, {}, {
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
        }>;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
    } & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
        events: {
            type: import('vue').PropType<any[]>;
            default: () => never[];
        };
        disabled: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
        showLunar: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
        showFestivals: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
        showTerms: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
        locale: {
            type: import('vue').PropType<string>;
            default: string;
        };
        theme: {
            type: import('vue').PropType<"light" | "dark">;
            default: string;
        };
        modelValue: {
            type: import('vue').PropType<string | string[] | null>;
        };
        mode: {
            type: import('vue').PropType<"single" | "range" | "multiple">;
            default: string;
        };
        showWeekNumbers: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
        firstDayOfWeek: {
            type: import('vue').PropType<number>;
            default: number;
        };
        selectable: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
        readonly: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
        clearable: {
            type: import('vue').PropType<boolean>;
        };
        holidays: {
            type: import('vue').PropType<Record<string, string>>;
            default: () => {};
        };
        minDate: {
            type: import('vue').PropType<string>;
        };
        maxDate: {
            type: import('vue').PropType<string>;
        };
        disabledDates: {
            type: import('vue').PropType<string[] | ((date: string) => boolean)>;
        };
    }>> & Readonly<{
        onDblclick?: ((date: string, dateInfo: import('./types').DateInfo) => any) | undefined;
        onContextmenu?: ((date: string, dateInfo: import('./types').DateInfo, event: MouseEvent) => any) | undefined;
        onEventClick?: ((event: any) => any) | undefined;
        onSelect?: ((date: string, dateInfo: import('./types').DateInfo) => any) | undefined;
        "onUpdate:modelValue"?: ((value: string | string[] | null) => any) | undefined;
        onYearChange?: ((year: number) => any) | undefined;
        onMonthChange?: ((year: number, month: number) => any) | undefined;
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        dblclick: (date: string, dateInfo: import('./types').DateInfo) => void;
        contextmenu: (date: string, dateInfo: import('./types').DateInfo, event: MouseEvent) => void;
        eventClick: (event: any) => void;
        select: (date: string, dateInfo: import('./types').DateInfo) => void;
        "update:modelValue": (value: string | string[] | null) => void;
        yearChange: (year: number) => void;
        monthChange: (year: number, month: number) => void;
    }, string, {
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
    }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
        $slots: {
            default?(_: {
                date: import('./types').DateInfo;
                events: import('./types').CalendarEvent[];
            }): any;
            event?(_: {
                event: import('./types').CalendarEvent;
            }): any;
            sidebar?(_: {
                selectedDate: string | null;
            }): any;
        };
    });
};
export default _default;
export declare const version = "2.0.0";
//# sourceMappingURL=index.d.ts.map