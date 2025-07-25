import { CalendarTheme } from '../types';

export declare function useTheme(initialTheme?: 'light' | 'dark' | 'auto', customTheme?: Partial<CalendarTheme>): {
    currentTheme: import('vue').Ref<"light" | "dark" | "auto", "light" | "dark" | "auto">;
    systemPrefersDark: import('vue').Ref<boolean, boolean>;
    customThemeConfig: import('vue').Ref<{
        primary?: string | undefined;
        secondary?: string | undefined;
        background?: string | undefined;
        text?: string | undefined;
        border?: string | undefined;
        hover?: string | undefined;
        selected?: string | undefined;
        today?: string | undefined;
        weekend?: string | undefined;
        holiday?: string | undefined;
        disabled?: string | undefined;
    }, Partial<CalendarTheme> | {
        primary?: string | undefined;
        secondary?: string | undefined;
        background?: string | undefined;
        text?: string | undefined;
        border?: string | undefined;
        hover?: string | undefined;
        selected?: string | undefined;
        today?: string | undefined;
        weekend?: string | undefined;
        holiday?: string | undefined;
        disabled?: string | undefined;
    }>;
    effectiveTheme: import('vue').ComputedRef<"light" | "dark">;
    themeConfig: import('vue').ComputedRef<CalendarTheme>;
    cssVariables: import('vue').ComputedRef<{
        '--calendar-primary': string;
        '--calendar-secondary': string;
        '--calendar-background': string;
        '--calendar-text': string;
        '--calendar-border': string;
        '--calendar-hover': string;
        '--calendar-selected': string;
        '--calendar-today': string;
        '--calendar-weekend': string;
        '--calendar-holiday': string;
        '--calendar-disabled': string;
    }>;
    setTheme: (theme: "light" | "dark" | "auto") => void;
    toggleDarkMode: () => void;
    updateCustomTheme: (updates: Partial<CalendarTheme>) => void;
    resetCustomTheme: () => void;
    applyPresetTheme: (presetName: "blue" | "green" | "orange" | "purple" | "red") => void;
    getContrastColor: (backgroundColor: string) => string;
    generateColorVariants: (baseColor: string) => {
        lighter: string;
        light: string;
        base: string;
        dark: string;
        darker: string;
    };
    presetThemes: {
        blue: {
            primary: string;
            secondary: string;
            selected: string;
        };
        green: {
            primary: string;
            secondary: string;
            selected: string;
        };
        purple: {
            primary: string;
            secondary: string;
            selected: string;
        };
        orange: {
            primary: string;
            secondary: string;
            selected: string;
        };
        red: {
            primary: string;
            secondary: string;
            selected: string;
        };
    };
};
//# sourceMappingURL=useTheme.d.ts.map