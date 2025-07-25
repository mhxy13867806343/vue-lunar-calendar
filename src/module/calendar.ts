// 导入原有的模块
import { getLunarByTimestamp, getTimestampByLunar, getLunarYearDays, getLunarMonthDays, getLeapMonth } from './lunar.js'
import { getAnimalYear } from './animal.js'
import { getGanZhiYear, getGanZhiMonth, getGanZhiDay } from './ganzhi.js'
import { getTerm } from './term.js'
import { getFestivalsBySolar, getTermFestivalsBySolar, getFestivalsByLunar } from './festival.js'
import { getZodiac } from './zodiac.js'
import { minYear, maxYear, minMonth, minDay, maxMonth, maxDay } from './config/base.js'

// 农历转换结果接口
export interface LunarResult {
  lYear: number
  lMonth: number
  lDay: number
  isLeap: boolean
  lMonthZH: string
  lDayZH: string
  IMonthCn: string
  IDayCn: string
  gzYear: string
  gzMonth: string
  gzDay: string
  Animal: string
  Term: string
  festival: string
  astro: string
}

// 公历转农历
export function solar2lunar(sYear: number, sMonth: number, sDay: number): LunarResult {
  // 验证输入参数
  if (sYear < minYear || sYear > maxYear) {
    throw new Error(`年份超出范围 ${minYear}-${maxYear}`)
  }
  
  if (sMonth < 1 || sMonth > 12) {
    throw new Error('月份必须在1-12之间')
  }
  
  if (sDay < 1 || sDay > 31) {
    throw new Error('日期必须在1-31之间')
  }
  
  // 创建日期对象
  const date = new Date(sYear, sMonth - 1, sDay)
  
  // 验证日期有效性
  if (date.getFullYear() !== sYear || date.getMonth() !== sMonth - 1 || date.getDate() !== sDay) {
    throw new Error('无效的日期')
  }
  
  // 获取时间戳
  const timestamp = date.getTime()
  
  // 转换为农历
  const lunar = getLunarByTimestamp(timestamp)
  if (!lunar) {
    throw new Error('农历转换失败')
  }
  
  // 获取干支
  const ganZhi = {
    year: getGanZhiYear(sYear, sMonth, sDay),
    month: getGanZhiMonth(sYear, sMonth, sDay),
    day: getGanZhiDay(sYear, sMonth, sDay)
  }
  
  // 获取生肖
  const animal = getAnimalYear(lunar.lYear, sMonth, sDay)
  
  // 获取节气
  const term = getTerm(sYear, sMonth, sDay)
  
  // 获取节日
  const solarFestivals = getFestivalsBySolar(sYear, sMonth, sDay)
  const termFestivals = getTermFestivalsBySolar(sYear, sMonth, sDay)
  const lunarFestivals = getFestivalsByLunar(lunar.lYear, lunar.lMonth, lunar.lDay)
  const festival = [...solarFestivals, ...termFestivals, ...lunarFestivals].join(' ')
  
  // 获取星座
  const astro = getZodiac(sMonth, sDay)
  
  return {
    lYear: lunar.lYear,
    lMonth: lunar.lMonth,
    lDay: lunar.lDay,
    isLeap: lunar.isLeap,
    lMonthZH: lunar.lMonthZH,
    lDayZH: lunar.lDayZH,
    IMonthCn: lunar.lMonthZH,
    IDayCn: lunar.lDayZH,
    gzYear: ganZhi.year,
    gzMonth: ganZhi.month,
    gzDay: ganZhi.day,
    Animal: animal,
    Term: term || '',
    festival: festival || '',
    astro: astro
  }
}

// 农历转公历
export function lunar2solar(lYear: number, lMonth: number, lDay: number, isLeap: boolean = false): { sYear: number, sMonth: number, sDay: number } | null {
  const timestamp = getTimestampByLunar(lYear, lMonth, lDay, isLeap)
  if (!timestamp) {
    return null
  }
  
  const date = new Date(timestamp)
  return {
    sYear: date.getFullYear(),
    sMonth: date.getMonth() + 1,
    sDay: date.getDate()
  }
}

// 获取农历年份天数
export function lunarYearDays(lYear: number): number {
  return getLunarYearDays(lYear)
}

// 获取农历月份天数
export function lunarMonthDays(lYear: number, lMonth: number, isLeap: boolean = false): number {
  return getLunarMonthDays(lYear, lMonth, isLeap)
}

// 获取农历年份闰月
export function leapMonth(lYear: number): number {
  return getLeapMonth(lYear)
}

// 获取农历年份是否有闰月
export function isLeapYear(lYear: number): boolean {
  return getLeapMonth(lYear) > 0
}

// 获取支持的年份范围
export function getYearRange(): { min: number, max: number } {
  return { min: minYear, max: maxYear }
}

// 验证日期是否在支持范围内
export function isValidDate(sYear: number, sMonth: number, sDay: number): boolean {
  if (sYear < minYear || sYear > maxYear) {
    return false
  }
  
  if (sYear === minYear && (sMonth < minMonth || (sMonth === minMonth && sDay < minDay))) {
    return false
  }
  
  if (sYear === maxYear && (sMonth > maxMonth || (sMonth === maxMonth && sDay > maxDay))) {
    return false
  }
  
  // 验证日期本身是否有效
  const date = new Date(sYear, sMonth - 1, sDay)
  return date.getFullYear() === sYear && date.getMonth() === sMonth - 1 && date.getDate() === sDay
}

// 获取今天的农历信息
export function today(): LunarResult {
  const now = new Date()
  return solar2lunar(now.getFullYear(), now.getMonth() + 1, now.getDate())
}

// 主要导出类（保持向后兼容）
export class LunarCalendar {
  static solar2lunar = solar2lunar
  static lunar2solar = lunar2solar
  static lunarYearDays = lunarYearDays
  static lunarMonthDays = lunarMonthDays
  static leapMonth = leapMonth
  static isLeapYear = isLeapYear
  static getYearRange = getYearRange
  static isValidDate = isValidDate
  static today = today
}

// 默认导出
export default LunarCalendar