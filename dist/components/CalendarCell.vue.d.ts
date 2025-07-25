import { DateInfo, CalendarEvent, CalendarLocale } from '../types';

interface Props {
    date: DateInfo;
    events?: CalendarEvent[];
    selected?: boolean;
    inRange?: boolean;
    rangeStart?: boolean;
    rangeEnd?: boolean;
    today?: boolean;
    otherMonth?: boolean;
    disabled?: boolean;
    showLunar?: boolean;
    showFestivals?: boolean;
    showTerms?: boolean;
    locale?: CalendarLocale;
}
declare function __VLS_template(): {
    event?(_: {
        event: CalendarEvent;
    }): any;
    default?(_: {
        date: DateInfo;
        events: CalendarEvent[];
    }): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    events: () => never[];
    selected: boolean;
    inRange: boolean;
    rangeStart: boolean;
    rangeEnd: boolean;
    today: boolean;
    otherMonth: boolean;
    disabled: boolean;
    showLunar: boolean;
    showFestivals: boolean;
    showTerms: boolean;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (date: DateInfo) => void;
    dblclick: (date: DateInfo) => void;
    contextmenu: (date: DateInfo, event: MouseEvent) => void;
    mouseenter: (date: DateInfo) => void;
    eventClick: (event: CalendarEvent) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    events: () => never[];
    selected: boolean;
    inRange: boolean;
    rangeStart: boolean;
    rangeEnd: boolean;
    today: boolean;
    otherMonth: boolean;
    disabled: boolean;
    showLunar: boolean;
    showFestivals: boolean;
    showTerms: boolean;
}>>> & Readonly<{
    onClick?: ((date: DateInfo) => any) | undefined;
    onDblclick?: ((date: DateInfo) => any) | undefined;
    onContextmenu?: ((date: DateInfo, event: MouseEvent) => any) | undefined;
    onMouseenter?: ((date: DateInfo) => any) | undefined;
    onEventClick?: ((event: CalendarEvent) => any) | undefined;
}>, {
    events: CalendarEvent[];
    selected: boolean;
    inRange: boolean;
    rangeStart: boolean;
    rangeEnd: boolean;
    today: boolean;
    otherMonth: boolean;
    disabled: boolean;
    showLunar: boolean;
    showFestivals: boolean;
    showTerms: boolean;
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
//# sourceMappingURL=CalendarCell.vue.d.ts.map