export interface LunarResult {
    lYear: number;
    lMonth: number;
    lDay: number;
    isLeap: boolean;
    lMonthZH: string;
    lDayZH: string;
    IMonthCn: string;
    IDayCn: string;
    gzYear: string;
    gzMonth: string;
    gzDay: string;
    Animal: string;
    Term: string;
    festival: string;
    astro: string;
}
export declare function solar2lunar(sYear: number, sMonth: number, sDay: number): LunarResult;
export declare function lunar2solar(lYear: number, lMonth: number, lDay: number, isLeap?: boolean): {
    sYear: number;
    sMonth: number;
    sDay: number;
} | null;
export declare function lunarYearDays(lYear: number): number;
export declare function lunarMonthDays(lYear: number, lMonth: number, isLeap?: boolean): number;
export declare function leapMonth(lYear: number): number;
export declare function isLeapYear(lYear: number): boolean;
export declare function getYearRange(): {
    min: number;
    max: number;
};
export declare function isValidDate(sYear: number, sMonth: number, sDay: number): boolean;
export declare function today(): LunarResult;
export declare class LunarCalendar {
    static solar2lunar: typeof solar2lunar;
    static lunar2solar: typeof lunar2solar;
    static lunarYearDays: typeof lunarYearDays;
    static lunarMonthDays: typeof lunarMonthDays;
    static leapMonth: typeof leapMonth;
    static isLeapYear: typeof isLeapYear;
    static getYearRange: typeof getYearRange;
    static isValidDate: typeof isValidDate;
    static today: typeof today;
}
export default LunarCalendar;
//# sourceMappingURL=calendar.d.ts.map