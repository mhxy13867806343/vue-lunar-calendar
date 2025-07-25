declare namespace _default {
    function getDateBySolar(sYear: any, sMonth: any, sDay: any): ({
        lYear: null;
        lMonth: null;
        lDay: null;
        isLeap: boolean;
        lMonthZH: string;
        lDayZH: string;
    } & {
        sYear: number;
        sMonth: number;
        sDay: number;
        week: number;
        weekZH: string;
    } & {
        zodiac: string;
        term: string;
        animal: string;
        gzYearZH: string;
        gzMonthZH: string;
        gzDayZH: string;
        festival: string;
    }) | null;
    function getDateByLunar(lYear: any, lMonth: any, lDay: any, isLeap: any): ({
        lYear: null;
        lMonth: null;
        lDay: null;
        isLeap: boolean;
        lMonthZH: string;
        lDayZH: string;
    } & {
        sYear: number;
        sMonth: number;
        sDay: number;
        week: number;
        weekZH: string;
    } & {
        zodiac: string;
        term: string;
        animal: string;
        gzYearZH: string;
        gzMonthZH: string;
        gzDayZH: string;
        festival: string;
    }) | null;
    function getToday(): {
        lYear: null;
        lMonth: null;
        lDay: null;
        isLeap: boolean;
        lMonthZH: string;
        lDayZH: string;
    } & {
        sYear: number;
        sMonth: number;
        sDay: number;
        week: number;
        weekZH: string;
    } & {
        zodiac: string;
        term: string;
        animal: string;
        gzYearZH: string;
        gzMonthZH: string;
        gzDayZH: string;
        festival: string;
    };
}
export default _default;
//# sourceMappingURL=calendar.d.ts.map