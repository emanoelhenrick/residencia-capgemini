interface LocaleOptionsFormat {
    format: string[];
    standalone: string[];
    isFormat?: RegExp;
}
type LocaleOptions = string[] | LocaleOptionsFormat;
type OrdinalDateFn = (num: number, token?: string) => string;
type PluralizeDateFn = (num: number, withoutSuffix: boolean, key?: string, isFuture?: boolean) => string;
interface LocaleData {
    abbr?: string;
    parentLocale?: string;
    months?: LocaleOptions | ((date: Date, format: string, isUTC?: boolean) => string | string[]);
    monthsShort?: LocaleOptions | ((date: Date, format: string, isUTC?: boolean) => string | string[]);
    monthsParseExact?: boolean;
    weekdays?: LocaleOptions | ((date: Date, format: string, isUTC?: boolean) => string | string[]);
    weekdaysShort?: string[] | ((date: Date, format: string, isUTC?: boolean) => string | string[]);
    weekdaysMin?: string[] | ((date: Date, format: string, isUTC?: boolean) => string | string[]);
    weekdaysParseExact?: boolean;
    longDateFormat?: {
        [index: string]: string;
    };
    calendar?: {
        [key: string]: (string | ((date: Date, now?: Date) => string) | ((dayOfWeek: number, isNextWeek: boolean) => string));
    };
    relativeTime?: {
        [key: string]: string | PluralizeDateFn;
    };
    dayOfMonthOrdinalParse?: RegExp;
    ordinal?: string | OrdinalDateFn;
    week?: {
        dow?: number;
        doy?: number;
    };
    invalidDate?: string;
    monthsRegex?: RegExp;
    monthsParse?: RegExp[];
    monthsShortRegex?: RegExp;
    monthsStrictRegex?: RegExp;
    monthsShortStrictRegex?: RegExp;
    longMonthsParse?: RegExp[];
    shortMonthsParse?: RegExp[];
    meridiemParse?: RegExp;
    meridiemHour?(hour: number, meridiem: string): number;
    preparse?(str: string, format?: string | string[]): string;
    postformat?(str: string | number): string;
    meridiem?(hour: number, minute?: number, isLower?: boolean): string;
    isPM?(input: string): boolean;
    getFullYear?(date: Date, isUTC: boolean): number;
}
declare class Locale {
    parentLocale?: Locale;
    _abbr: string;
    _config: LocaleData;
    meridiemHour: (hour: number, meridiem: string) => number;
    _invalidDate: string;
    _week: {
        dow: number;
        doy: number;
    };
    _dayOfMonthOrdinalParse: RegExp;
    _ordinalParse: RegExp;
    _meridiemParse: RegExp;
    private _calendar;
    private _relativeTime;
    private _months;
    private _monthsShort;
    private _monthsRegex;
    private _monthsShortRegex;
    private _monthsStrictRegex;
    private _monthsShortStrictRegex;
    private _monthsParse;
    private _longMonthsParse;
    private _shortMonthsParse;
    private _monthsParseExact;
    private _weekdaysParseExact;
    private _weekdaysRegex;
    private _weekdaysShortRegex;
    private _weekdaysMinRegex;
    private _weekdaysStrictRegex;
    private _weekdaysShortStrictRegex;
    private _weekdaysMinStrictRegex;
    private _weekdays;
    private _weekdaysShort;
    private _weekdaysMin;
    private _weekdaysParse;
    private _minWeekdaysParse;
    private _shortWeekdaysParse;
    private _fullWeekdaysParse;
    private _longDateFormat;
    private _ordinal;
    constructor(config: LocaleData);
    set(config: LocaleData): void;
    calendar(key: string, date: Date, now: Date): string;
    longDateFormat(key: string): string;
    get invalidDate(): string;
    set invalidDate(val: string);
    ordinal(num: number, token?: string): string;
    preparse(str: string, format?: string | string[]): string;
    getFullYear(date: Date, isUTC?: boolean): number;
    postformat(str: string): string;
    relativeTime(num: number, withoutSuffix: boolean, str: 'future' | 'past', isFuture: boolean): string;
    pastFuture(diff: number, output: string): string;
    /** Months */
    months(): string[];
    months(date: Date, format?: string, isUTC?: boolean): string;
    monthsShort(): string[];
    monthsShort(date?: Date, format?: string, isUTC?: boolean): string;
    monthsParse(monthName: string, format?: string, strict?: boolean): number;
    monthsRegex(isStrict: boolean): RegExp;
    monthsShortRegex(isStrict: boolean): RegExp;
    /** Week */
    week(date: Date, isUTC?: boolean): number;
    firstDayOfWeek(): number;
    firstDayOfYear(): number;
    /** Day of Week */
    weekdays(): string[];
    weekdays(date: Date, format?: string, isUTC?: boolean): string;
    weekdaysMin(): string[];
    weekdaysMin(date: Date, format?: string, isUTC?: boolean): string;
    weekdaysShort(): string[];
    weekdaysShort(date: Date, format?: string, isUTC?: boolean): string;
    weekdaysParse(weekdayName?: string, format?: string, strict?: boolean): number;
    weekdaysRegex(isStrict: boolean): RegExp;
    weekdaysShortRegex(isStrict?: boolean): RegExp;
    weekdaysMinRegex(isStrict?: boolean): RegExp;
    isPM(input: string): boolean;
    meridiem(hours: number, minutes: number, isLower: boolean): string;
    formatLongDate(key: string): string;
    private handleMonthStrictParse;
    private handleWeekStrictParse;
    private computeMonthsParse;
    private computeWeekdaysParse;
}

type DateInput = string | number | Date | string[] | DateArray | MomentInputObject;
interface MomentInputObject {
    years?: number;
    year?: number;
    y?: number;
    months?: number;
    month?: number;
    M?: number;
    days?: number;
    day?: number;
    d?: number;
    dates?: number;
    date?: number;
    D?: number;
    hours?: number;
    hour?: number;
    h?: number;
    minutes?: number;
    minute?: number;
    m?: number;
    seconds?: number;
    second?: number;
    s?: number;
    milliseconds?: number;
    millisecond?: number;
    ms?: number;
    w?: number;
    week?: number;
    weeks?: number;
    Q?: number;
    quarter?: number;
    quarters?: number;
    weekYear?: number;
}

type UnitOfTime = 'year' | 'month' | 'day' | 'date' | 'dayOfYear' | 'hours' | 'minutes' | 'seconds' | 'milliseconds' | 'quarter' | 'week' | 'isoWeek' | 'weekYear' | 'isoWeekYear' | 'weekday' | 'isoWeekday';
interface TimeUnit {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    seconds?: number;
    milliseconds?: number;
}
type DateArray = number[];

declare function add(date: Date, val: number, period: UnitOfTime, isUTC?: boolean): Date;
declare function subtract(date: Date, val: number, period: UnitOfTime, isUTC?: boolean): Date;

declare function getDay(date: Date, isUTC?: boolean): number;
declare function getMonth(date: Date, isUTC?: boolean): number;
declare function getFullYear(date: Date, isUTC?: boolean): number;
declare function getFirstDayOfMonth(date: Date): Date;
declare function isFirstDayOfWeek(date: Date, firstDayOfWeek?: number): boolean;
declare function isSameMonth(date1?: Date, date2?: Date): boolean;
declare function isSameYear(date1?: Date, date2?: Date): boolean;
declare function isSameDay(date1?: Date, date2?: Date): boolean;

declare function parseDate(input: DateInput, format?: string | string[], localeKey?: string, strict?: boolean, isUTC?: boolean): Date;
declare function utcAsLocal(date: any): Date;

declare function formatDate(date: Date, format?: string, locale?: string, isUTC?: boolean, offset?: number): string;

declare function getSetGlobalLocale(key?: string | string[], values?: LocaleData): string;
declare function defineLocale(name: string, config?: LocaleData): Locale;
declare function updateLocale(name: string, config?: LocaleData): Locale;
declare function getLocale(key?: string | string[]): Locale;
declare function listLocales(): string[];

declare function isAfter(date1?: Date, date2?: Date, units?: UnitOfTime): boolean;
declare function isBefore(date1?: Date, date2?: Date, units?: UnitOfTime): boolean;
declare function isDisabledDay(date?: Date, daysDisabled?: number[]): boolean;
declare function isSame(date1?: Date, date2?: Date, units?: UnitOfTime): boolean;

declare function isDate(value: any): value is Date;
declare function isDateValid(date: Date): boolean;
declare function isArray<T>(input?: any): input is T[];

declare function shiftDate(date: Date, unit: TimeUnit): Date;
declare function setFullDate(date: Date, unit: TimeUnit): Date;

declare function startOf(date: Date, unit: UnitOfTime, isUTC?: boolean): Date;
declare function endOf(date: Date, unit: UnitOfTime, isUTC?: boolean): Date;

declare const arLocale: LocaleData;

declare const bgLocale: LocaleData;

declare const caLocale: LocaleData;

declare const csLocale: LocaleData;

declare const daLocale: LocaleData;

declare const deLocale: LocaleData;

declare const enGbLocale: LocaleData;

declare const esDoLocale: LocaleData;

declare const esLocale: LocaleData;

declare const esPrLocale: LocaleData;

declare const esUsLocale: LocaleData;

declare const etLocale: LocaleData;

declare const fiLocale: LocaleData;

declare const frLocale: LocaleData;

declare const frCaLocale: LocaleData;

declare const glLocale: LocaleData;

declare const heLocale: LocaleData;

declare const hiLocale: LocaleData;

declare const huLocale: LocaleData;

declare const hrLocale: LocaleData;

declare const idLocale: LocaleData;

declare const itLocale: LocaleData;

declare const jaLocale: LocaleData;

declare const kaLocale: LocaleData;

declare const kkLocale: LocaleData;

declare const koLocale: LocaleData;

declare const ltLocale: LocaleData;

declare const lvLocale: LocaleData;

declare const mnLocale: LocaleData;

declare const nbLocale: LocaleData;

declare const nlBeLocale: LocaleData;

declare const nlLocale: LocaleData;

declare const plLocale: LocaleData;

declare const ptBrLocale: LocaleData;

declare const roLocale: LocaleData;

declare const ruLocale: LocaleData;

declare const skLocale: LocaleData;

declare const slLocale: LocaleData;

declare const sqLocale: LocaleData;

declare const svLocale: LocaleData;

declare const thLocale: LocaleData;

declare const thBeLocale: LocaleData;

declare const trLocale: LocaleData;

declare const ukLocale: LocaleData;

declare const viLocale: LocaleData;

declare const zhCnLocale: LocaleData;

declare const faLocale: LocaleData;

export { add, arLocale, bgLocale, caLocale, csLocale, daLocale, deLocale, defineLocale, enGbLocale, endOf, esDoLocale, esLocale, esPrLocale, esUsLocale, etLocale, faLocale, fiLocale, formatDate, frCaLocale, frLocale, getDay, getFirstDayOfMonth, getFullYear, getLocale, getMonth, getSetGlobalLocale, glLocale, heLocale, hiLocale, hrLocale, huLocale, idLocale, isAfter, isArray, isBefore, isDate, isDateValid, isDisabledDay, isFirstDayOfWeek, isSame, isSameDay, isSameMonth, isSameYear, itLocale, jaLocale, kaLocale, kkLocale, koLocale, listLocales, ltLocale, lvLocale, mnLocale, nbLocale, nlBeLocale, nlLocale, parseDate, plLocale, ptBrLocale, roLocale, ruLocale, setFullDate, shiftDate, skLocale, slLocale, sqLocale, startOf, subtract, svLocale, thBeLocale, thLocale, trLocale, ukLocale, updateLocale, utcAsLocal, viLocale, zhCnLocale };
export type { LocaleData, TimeUnit };
