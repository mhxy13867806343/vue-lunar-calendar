import { CalendarLocale } from '../types';

export declare function useLocale(props?: any): {
    currentLocale: import('vue').Ref<string, string>;
    customLocales: import('vue').Ref<Record<string, CalendarLocale>, Record<string, CalendarLocale>>;
    locale: import('vue').ComputedRef<CalendarLocale>;
    availableLocales: import('vue').ComputedRef<{
        code: string;
        name: string;
    }[]>;
    lunarTexts: import('vue').ComputedRef<Record<string, string>>;
    weekdaysDisplay: import('vue').ComputedRef<string[]>;
    isRTL: import('vue').ComputedRef<boolean>;
    setLocale: (localeCode: string) => void;
    addCustomLocale: (code: string, config: CalendarLocale) => void;
    updateLocale: (code: string, updates: Partial<CalendarLocale>) => void;
    removeCustomLocale: (code: string) => void;
    formatDate: (date: Date, format?: string) => string;
    formatYear: (year: number) => string;
    formatMonth: (month: number) => string;
    getWeekdayName: (dayOfWeek: number, short?: boolean) => string;
    getMonthName: (month: number, short?: boolean) => string;
    t: (key: string, fallback?: string) => string;
    detectBrowserLocale: () => string;
};
//# sourceMappingURL=useLocale.d.ts.map