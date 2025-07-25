export function getLeapMonth(lYear: any): number;
export function getLunarYearDays(lYear: any): number;
export function getLunarMonthDays(lYear: any, lMonth: any, isLeap: any): number;
export function getTimestampByLunar(lYear: any, lMonth: any, lDay: any, isLeap: any): number | null;
export function getLunarByTimestamp(timestamp: any): {
    lYear: number;
    lMonth: number;
    lDay: number;
    isLeap: boolean;
    lMonthZH: string;
    lDayZH: string;
} | null;
//# sourceMappingURL=lunar.d.ts.map