import { TimeUnit } from 'ngx-bootstrap/chronos';
import * as i0 from '@angular/core';
import { EventEmitter, OnInit, AfterViewInit, OnDestroy, Renderer2, ElementRef, OnChanges, ViewContainerRef, SimpleChanges, ChangeDetectorRef, ModuleWithProviders } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, Subject } from 'rxjs';
import { PositioningService } from 'ngx-bootstrap/positioning';
import * as i3 from 'ngx-bootstrap/timepicker';
import { TimepickerComponent } from 'ngx-bootstrap/timepicker';
import { Action, MiniStore } from 'ngx-bootstrap/mini-ngrx';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import * as i1 from '@angular/common';
import * as i2 from 'ngx-bootstrap/tooltip';

type BsDatepickerViewMode = 'day' | 'month' | 'year';
/** *************** */
interface NavigationViewModel {
    monthTitle: string;
    yearTitle: string;
    hideLeftArrow: boolean;
    hideRightArrow: boolean;
    disableLeftArrow: boolean;
    disableRightArrow: boolean;
}
interface CalendarCellViewModel {
    date: Date;
    label: string;
    isDisabled?: boolean;
    isHovered?: boolean;
    isSelected?: boolean;
}
/** *************** */
interface DayViewModel extends CalendarCellViewModel {
    isOtherMonthHovered?: boolean;
    isOtherMonth?: boolean;
    isInRange?: boolean;
    isSelectionStart?: boolean;
    isSelectionEnd?: boolean;
    isToday?: boolean;
    customClasses?: string;
    tooltipText?: string;
    monthIndex?: number;
    weekIndex?: number;
    dayIndex?: number;
}
interface WeekViewModel {
    days: DayViewModel[];
    isHovered?: boolean;
}
interface DaysCalendarViewModel extends NavigationViewModel {
    weeks: WeekViewModel[];
    month: Date;
    weekNumbers: string[];
    weekdays: string[];
}
/** *************** */
interface MonthsCalendarViewModel extends NavigationViewModel {
    months: CalendarCellViewModel[][];
}
/** *************** */
interface YearsCalendarViewModel extends NavigationViewModel {
    years: CalendarCellViewModel[][];
}
/** *************** */
/** *************** */
interface DaysCalendarModel {
    daysMatrix: Date[][];
    month: Date;
}
/** *************** */
interface MonthViewOptions {
    width?: number;
    height?: number;
    firstDayOfWeek?: number;
}
/** *************** */
interface DatepickerFormatOptions {
    locale?: string;
    monthTitle?: string;
    yearTitle?: string;
    dayLabel?: string;
    monthLabel?: string;
    yearLabel?: string;
    weekNumbers?: string;
}
interface DatepickerRenderOptions {
    showWeekNumbers: boolean;
    displayMonths: number;
}
interface DatepickerDateCustomClasses {
    date: Date;
    classes: string[];
}
interface DatepickerDateTooltipText {
    date: Date;
    tooltipText: string;
}
/** *************** */
/** *************** */
declare enum BsNavigationDirection {
    UP = 0,
    DOWN = 1
}
interface BsNavigationEvent {
    direction?: BsNavigationDirection;
    step?: TimeUnit;
}
interface BsViewNavigationEvent {
    unit?: TimeUnit;
    viewMode: BsDatepickerViewMode;
}
interface CellHoverEvent {
    cell: CalendarCellViewModel;
    isHovered: boolean;
}

interface BsCustomDates {
    label: string;
    value: Date | Date[];
}
declare class BsCustomDatesViewComponent {
    ranges?: BsCustomDates[];
    selectedRange?: Date[];
    customRangeLabel?: string;
    onSelect: EventEmitter<BsCustomDates>;
    selectFromRanges(range?: BsCustomDates): void;
    compareRanges(range?: BsCustomDates): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsCustomDatesViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsCustomDatesViewComponent, "bs-custom-date-view", never, { "ranges": { "alias": "ranges"; "required": false; }; "selectedRange": { "alias": "selectedRange"; "required": false; }; "customRangeLabel": { "alias": "customRangeLabel"; "required": false; }; }, { "onSelect": "onSelect"; }, never, never, true, never>;
}

/**
 * For date range picker there are `BsDaterangepickerConfig` which inherits all properties,
 * except `displayMonths`, for range picker it default to `2`
 */
declare class BsDatepickerConfig implements DatepickerRenderOptions {
    /** sets use adaptive position */
    adaptivePosition: boolean;
    /** sets use UTC date time format */
    useUtc: boolean;
    /** turn on/off animation */
    isAnimated: boolean;
    value?: Date | Date[];
    isDisabled?: boolean;
    /**
     * Default min date for all date/range pickers
     */
    minDate?: Date;
    /**
     * Default max date for all date/range pickers
     */
    maxDate?: Date;
    /**
     * The view that the datepicker should start in
     */
    startView: BsDatepickerViewMode;
    /**
     * Default date custom classes for all date/range pickers
     */
    dateCustomClasses?: DatepickerDateCustomClasses[];
    /**
     * Default tooltip text for all date/range pickers
     */
    dateTooltipTexts?: DatepickerDateTooltipText[];
    /**
     * Disable specific days, e.g. [0,6] will disable all Saturdays and Sundays
     */
    daysDisabled?: number[];
    /**
     * Disable specific dates
     */
    datesDisabled?: Date[];
    /**
     * Show one months for special cases (only for dateRangePicker)
     * 1. maxDate is equal to today's date
     * 2. minDate's month is equal to maxDate's month
     */
    displayOneMonthRange?: boolean;
    /**
     * Enable specific dates
     */
    datesEnabled?: Date[];
    /**
     * Makes dates from other months active
     */
    selectFromOtherMonth?: boolean;
    /**
     * Allows select first date of the week by click on week number
     */
    selectWeek?: boolean;
    /**
     * Allows select daterange as first and last day of week by click on week number (dateRangePicker only)
     */
    selectWeekDateRange?: boolean;
    /**
     * Shows previous and current month, instead of current and next (dateRangePicker only)
     */
    showPreviousMonth?: boolean;
    /**
     * Prevents change to next month for right calendar in two calendars view (dateRangePicker only)
     */
    preventChangeToNextMonth?: boolean;
    /**
     * Add class to current day
     */
    customTodayClass?: string;
    /**
     * Default mode for all date pickers
     */
    minMode?: BsDatepickerViewMode;
    /**
     * If true, returns focus to the datepicker / daterangepicker input after date selection
     */
    returnFocusToInput: boolean;
    /** CSS class which will be applied to datepicker container,
     * usually used to set color theme
     */
    containerClass: string;
    displayMonths: number;
    /**
     * Allows to hide week numbers in datepicker
     */
    showWeekNumbers: boolean;
    dateInputFormat: string;
    rangeSeparator: string;
    /**
     * Date format for date range input field
     */
    rangeInputFormat: string;
    /**
     * Predefined ranges
     */
    ranges?: BsCustomDates[];
    /**
     * Max Date Range in days
     */
    maxDateRange?: number;
    monthTitle: string;
    yearTitle: string;
    dayLabel: string;
    monthLabel: string;
    yearLabel: string;
    weekNumbers: string;
    /**
     * Shows 'today' button
     */
    showTodayButton: boolean;
    /**
     * Shows clear button
     */
    showClearButton: boolean;
    /**
     * Positioning of 'today' button
     */
    todayPosition: string;
    /**
     * Positioning of 'clear' button
     */
    clearPosition: string;
    /**
     * Label for 'today' button
     */
    todayButtonLabel: string;
    /**
     * Label for 'clear' button
     */
    clearButtonLabel: string;
    /**
     * Label for 'custom range' button
     */
    customRangeButtonLabel: string;
    /**
     * Shows timepicker under datepicker
     */
    withTimepicker: boolean;
    /**
     * Set current hours, minutes, seconds and milliseconds for bsValue
     */
    initCurrentTime?: boolean;
    /**
     * Set allowed positions of container.
     */
    allowedPositions: string[];
    /**
     * Set rule for datepicker closing. If value is true datepicker closes only if date is changed, if user changes only time datepicker doesn't close. It is available only if property withTimepicker is set true
     * */
    keepDatepickerOpened: boolean;
    /**
     * Allows keep invalid dates in range. Can be used with minDate, maxDate
     * */
    keepDatesOutOfRules: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BsDatepickerConfig>;
}

declare class BsLocaleService {
    private _defaultLocale;
    private _locale;
    private _localeChange;
    get locale(): BehaviorSubject<string>;
    get localeChange(): Observable<string>;
    get currentLocale(): string;
    use(locale: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsLocaleService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BsLocaleService>;
}

declare class BsDatepickerActions {
    static readonly CALCULATE = "[datepicker] calculate dates matrix";
    static readonly FORMAT = "[datepicker] format datepicker values";
    static readonly FLAG = "[datepicker] set flags";
    static readonly SELECT = "[datepicker] select date";
    static readonly NAVIGATE_OFFSET = "[datepicker] shift view date";
    static readonly NAVIGATE_TO = "[datepicker] change view date";
    static readonly SET_OPTIONS = "[datepicker] update render options";
    static readonly HOVER = "[datepicker] hover date";
    static readonly CHANGE_VIEWMODE = "[datepicker] switch view mode";
    static readonly SET_MIN_DATE = "[datepicker] set min date";
    static readonly SET_MAX_DATE = "[datepicker] set max date";
    static readonly SET_DAYSDISABLED = "[datepicker] set days disabled";
    static readonly SET_DATESDISABLED = "[datepicker] set dates disabled";
    static readonly SET_DATESENABLED = "[datepicker] set dates enabled";
    static readonly SET_IS_DISABLED = "[datepicker] set is disabled";
    static readonly SET_DATE_CUSTOM_CLASSES = "[datepicker] set date custom classes";
    static readonly SET_DATE_TOOLTIP_TEXTS = "[datepicker] set date tooltip texts";
    static readonly SET_LOCALE = "[datepicker] set datepicker locale";
    static readonly SELECT_TIME = "[datepicker] select time";
    static readonly SELECT_RANGE = "[daterangepicker] select dates range";
    calculate(): Action;
    format(): Action;
    flag(): Action;
    select(date?: Date): Action;
    selectTime(date: Date, index: number): Action;
    changeViewMode(event: BsDatepickerViewMode): Action;
    navigateTo(event: BsViewNavigationEvent): Action;
    navigateStep(step?: TimeUnit): Action;
    setOptions(options: DatepickerRenderOptions): Action;
    selectRange(value?: (Date | undefined)[] | undefined): Action;
    hoverDay(event: CellHoverEvent): Action;
    minDate(date?: Date): Action;
    maxDate(date?: Date): Action;
    daysDisabled(days?: number[]): Action;
    datesDisabled(dates?: Date[]): Action;
    datesEnabled(dates?: Date[]): Action;
    isDisabled(value?: boolean): Action;
    setDateCustomClasses(value?: DatepickerDateCustomClasses[]): Action;
    setDateTooltipTexts(value?: DatepickerDateTooltipText[]): Action;
    setLocale(locale: string): Action;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerActions, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BsDatepickerActions>;
}

interface BsDatepickerViewState {
    date: Date;
    mode: BsDatepickerViewMode;
}
declare class BsDatepickerState implements DatepickerRenderOptions, DatepickerFormatOptions {
    selectedDate?: Date;
    selectedRange?: Date[];
    selectedTime?: Date[];
    view?: BsDatepickerViewState;
    isDisabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    daysDisabled?: number[];
    datesDisabled?: Date[];
    datesEnabled?: Date[];
    minMode?: BsDatepickerViewMode;
    dateCustomClasses?: DatepickerDateCustomClasses[];
    dateTooltipTexts?: DatepickerDateTooltipText[];
    hoveredDate?: Date;
    hoveredMonth?: Date;
    hoveredYear?: Date;
    monthsModel?: DaysCalendarModel[];
    formattedMonths?: DaysCalendarViewModel[];
    flaggedMonths?: DaysCalendarViewModel[];
    selectFromOtherMonth?: boolean;
    showPreviousMonth?: boolean;
    preventChangeToNextMonth?: boolean;
    displayOneMonthRange?: boolean;
    monthsCalendar?: MonthsCalendarViewModel[];
    flaggedMonthsCalendar?: MonthsCalendarViewModel[];
    yearsCalendarModel?: YearsCalendarViewModel[];
    yearsCalendarFlagged?: YearsCalendarViewModel[];
    monthViewOptions?: MonthViewOptions;
    showWeekNumbers: boolean;
    displayMonths: number;
    locale?: string;
    monthTitle?: string;
    yearTitle?: string;
    dayLabel?: string;
    monthLabel?: string;
    yearLabel?: string;
    weekNumbers?: string;
}

declare class BsDatepickerStore extends MiniStore<BsDatepickerState> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerStore, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BsDatepickerStore>;
}

declare class BsDatepickerEffects {
    private _actions;
    private _localeService;
    viewMode?: Observable<BsDatepickerViewMode>;
    daysCalendar?: Observable<DaysCalendarViewModel[]>;
    monthsCalendar?: Observable<MonthsCalendarViewModel[]>;
    yearsCalendar?: Observable<YearsCalendarViewModel[]>;
    options?: Observable<DatepickerRenderOptions>;
    private _store?;
    private _subs;
    constructor(_actions: BsDatepickerActions, _localeService: BsLocaleService);
    init(_bsDatepickerStore: BsDatepickerStore): BsDatepickerEffects;
    /** setters */
    setValue(value?: Date): void;
    setRangeValue(value?: (Date | undefined)[] | undefined): void;
    setMinDate(value?: Date): BsDatepickerEffects;
    setMaxDate(value?: Date): BsDatepickerEffects;
    setDaysDisabled(value?: number[]): BsDatepickerEffects;
    setDatesDisabled(value?: Date[]): BsDatepickerEffects;
    setDatesEnabled(value?: Date[]): BsDatepickerEffects;
    setDisabled(value?: boolean): BsDatepickerEffects;
    setDateCustomClasses(value?: DatepickerDateCustomClasses[]): BsDatepickerEffects;
    setDateTooltipTexts(value?: DatepickerDateTooltipText[]): BsDatepickerEffects;
    setOptions(_config: BsDatepickerConfig): BsDatepickerEffects;
    /** view to mode bindings */
    setBindings(container: BsDatepickerAbstractComponent): BsDatepickerEffects;
    /** event handlers */
    setEventHandlers(container: BsDatepickerAbstractComponent): BsDatepickerEffects;
    registerDatepickerSideEffects(): BsDatepickerEffects;
    destroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BsDatepickerEffects>;
}

declare abstract class BsDatepickerAbstractComponent {
    containerClass: string;
    isOtherMonthsActive?: boolean;
    showTodayBtn?: boolean;
    todayBtnLbl?: string;
    todayPos?: string;
    showClearBtn?: boolean;
    clearBtnLbl?: string;
    clearPos?: string;
    _effects?: BsDatepickerEffects;
    customRanges: BsCustomDates[];
    customRangeBtnLbl?: string;
    chosenRange: Date[];
    multipleCalendars?: boolean;
    isRangePicker?: boolean;
    withTimepicker?: boolean;
    set minDate(value: Date | undefined);
    set maxDate(value: Date | undefined);
    set daysDisabled(value: number[] | undefined);
    set datesDisabled(value: Date[] | undefined);
    set datesEnabled(value: Date[] | undefined);
    set isDisabled(value: boolean | undefined);
    set dateCustomClasses(value: DatepickerDateCustomClasses[] | undefined);
    set dateTooltipTexts(value: DatepickerDateTooltipText[] | undefined);
    viewMode?: Observable<BsDatepickerViewMode | undefined>;
    monthsCalendar?: Observable<MonthsCalendarViewModel[] | undefined>;
    yearsCalendar?: Observable<YearsCalendarViewModel[] | undefined>;
    options$: Observable<DatepickerRenderOptions | undefined>;
    _daysCalendar$: Observable<DaysCalendarViewModel[] | undefined>;
    _daysCalendarSub: Subscription;
    set daysCalendar$(value: Observable<DaysCalendarViewModel[] | undefined>);
    get daysCalendar$(): Observable<DaysCalendarViewModel[] | undefined>;
    selectedTime?: Observable<Date[] | undefined>;
    selectedTimeSub: Subscription;
    setViewMode(event: BsDatepickerViewMode): void;
    navigateTo(event: BsNavigationEvent): void;
    dayHoverHandler(event: CellHoverEvent): void;
    weekHoverHandler(event: WeekViewModel): void;
    monthHoverHandler(event: CellHoverEvent): void;
    yearHoverHandler(event: CellHoverEvent): void;
    timeSelectHandler(date: Date, index: number): void;
    daySelectHandler(day: DayViewModel): void;
    monthSelectHandler(event: CalendarCellViewModel): void;
    yearSelectHandler(event: CalendarCellViewModel): void;
    setRangeOnCalendar(dates: BsCustomDates): void;
    setToday(): void;
    clearDate(): void;
    _stopPropagation(event: any): void;
}

declare class BsDatepickerContainerComponent extends BsDatepickerAbstractComponent implements OnInit, AfterViewInit, OnDestroy {
    private _config;
    private _store;
    private _element;
    private _actions;
    private _positionService;
    valueChange: EventEmitter<Date>;
    animationState: string;
    isRangePicker: boolean;
    _subs: Subscription[];
    startTimepicker?: TimepickerComponent;
    set value(value: Date | undefined);
    get isDatePickerDisabled(): boolean;
    get isDatepickerDisabled(): "" | null;
    get isDatepickerReadonly(): "" | null;
    constructor(_renderer: Renderer2, _config: BsDatepickerConfig, _store: BsDatepickerStore, _element: ElementRef, _actions: BsDatepickerActions, _effects: BsDatepickerEffects, _positionService: PositioningService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    get isTopPosition(): boolean;
    positionServiceEnable(): void;
    timeSelectHandler(date: Date, index: number): void;
    daySelectHandler(day: DayViewModel): void;
    monthSelectHandler(day: CalendarCellViewModel): void;
    yearSelectHandler(day: CalendarCellViewModel): void;
    setToday(): void;
    clearDate(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsDatepickerContainerComponent, "bs-datepicker-container", never, {}, {}, never, never, true, never>;
}

declare class BsDatepickerDirective implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    _config: BsDatepickerConfig;
    private _elementRef;
    private _renderer;
    /**
     * Placement of a datepicker. Accepts: "top", "bottom", "left", "right"
     */
    placement: 'top' | 'bottom' | 'left' | 'right';
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    triggers: string;
    /**
     * Close datepicker on outside click
     */
    outsideClick: boolean;
    /**
     * A selector specifying the element the datepicker should be appended to.
     */
    container: string;
    outsideEsc: boolean;
    /**
     * Emits an event when the datepicker is shown
     */
    onShown: EventEmitter<unknown>;
    /**
     * Emits an event when the datepicker is hidden
     */
    onHidden: EventEmitter<unknown>;
    isOpen$: BehaviorSubject<boolean>;
    isDestroy$: Subject<unknown>;
    /**
     * Indicates whether datepicker's content is enabled or not
     */
    isDisabled: boolean;
    /**
     * Minimum date which is available for selection
     */
    minDate?: Date;
    /**
     * Maximum date which is available for selection
     */
    maxDate?: Date;
    /**
     * Ignore validation errors when you reset to minDate or maxDate
     */
    ignoreMinMaxErrors?: boolean;
    /**
     * Minimum view mode : day, month, or year
     */
    minMode?: BsDatepickerViewMode;
    /**
     * Disable Certain days in the week
     */
    daysDisabled?: number[];
    /**
     * Disable specific dates
     */
    datesDisabled?: Date[];
    /**
     * Enable specific dates
     */
    datesEnabled?: Date[];
    /**
     * Date custom classes
     */
    dateCustomClasses?: DatepickerDateCustomClasses[];
    /**
     * Date tooltip text
     */
    dateTooltipTexts?: DatepickerDateTooltipText[];
    /**
     * Emits when datepicker value has been changed
     */
    bsValueChange: EventEmitter<Date>;
    get readonlyValue(): "" | null;
    protected _subs: Subscription[];
    private _datepicker;
    private _datepickerRef?;
    private readonly _dateInputFormat$;
    constructor(_config: BsDatepickerConfig, _elementRef: ElementRef, _renderer: Renderer2, _viewContainerRef: ViewContainerRef, cis: ComponentLoaderFactory);
    /**
     * Returns whether or not the datepicker is currently being shown
     */
    get isOpen(): boolean;
    set isOpen(value: boolean);
    _bsValue?: Date;
    /**
     * Initial value of datepicker
     */
    set bsValue(value: Date | undefined);
    get dateInputFormat$(): Observable<string | undefined>;
    /**
     * Config object for datepicker
     */
    bsConfig?: Partial<BsDatepickerConfig>;
    ngOnInit(): void;
    initPreviousValue(): void;
    ngOnChanges(changes: SimpleChanges): void;
    initSubscribes(): void;
    keepDatepickerModalOpened(): boolean;
    isDateSame(): boolean;
    ngAfterViewInit(): void;
    /**
     * Opens an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     */
    show(): void;
    /**
     * Closes an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     */
    hide(): void;
    /**
     * Toggles an element’s datepicker. This is considered a “manual” triggering
     * of the datepicker.
     */
    toggle(): void;
    /**
     * Set config for datepicker
     */
    setConfig(): void;
    unsubscribeSubscriptions(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BsDatepickerDirective, "[bsDatepicker]", ["bsDatepicker"], { "placement": { "alias": "placement"; "required": false; }; "triggers": { "alias": "triggers"; "required": false; }; "outsideClick": { "alias": "outsideClick"; "required": false; }; "container": { "alias": "container"; "required": false; }; "outsideEsc": { "alias": "outsideEsc"; "required": false; }; "isDisabled": { "alias": "isDisabled"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "ignoreMinMaxErrors": { "alias": "ignoreMinMaxErrors"; "required": false; }; "minMode": { "alias": "minMode"; "required": false; }; "daysDisabled": { "alias": "daysDisabled"; "required": false; }; "datesDisabled": { "alias": "datesDisabled"; "required": false; }; "datesEnabled": { "alias": "datesEnabled"; "required": false; }; "dateCustomClasses": { "alias": "dateCustomClasses"; "required": false; }; "dateTooltipTexts": { "alias": "dateTooltipTexts"; "required": false; }; "isOpen": { "alias": "isOpen"; "required": false; }; "bsValue": { "alias": "bsValue"; "required": false; }; "bsConfig": { "alias": "bsConfig"; "required": false; }; }, { "onShown": "onShown"; "onHidden": "onHidden"; "bsValueChange": "bsValueChange"; }, never, never, true, never>;
}

declare class BsDatepickerInlineConfig extends BsDatepickerConfig {
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerInlineConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BsDatepickerInlineConfig>;
}

declare class BsDatepickerInlineContainerComponent extends BsDatepickerContainerComponent implements OnInit, OnDestroy {
    get disabledValue(): "" | null;
    get readonlyValue(): "" | null;
    constructor(_renderer: Renderer2, _config: BsDatepickerConfig, _store: BsDatepickerStore, _element: ElementRef, _actions: BsDatepickerActions, _effects: BsDatepickerEffects, _positioningService: PositioningService);
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerInlineContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsDatepickerInlineContainerComponent, "bs-datepicker-inline-container", never, {}, {}, never, never, true, never>;
}

declare class BsDatepickerInlineDirective implements OnInit, OnDestroy, OnChanges {
    _config: BsDatepickerInlineConfig;
    private _elementRef;
    /**
     * Config object for datepicker
     */
    bsConfig?: Partial<BsDatepickerInlineConfig>;
    /**
     * Indicates whether datepicker is enabled or not
     */
    isDisabled: boolean;
    /**
     * Minimum date which is available for selection
     */
    minDate?: Date;
    /**
     * Maximum date which is available for selection
     */
    maxDate?: Date;
    /**
     * Date custom classes
     */
    dateCustomClasses?: DatepickerDateCustomClasses[];
    /**
     * Date tooltip text
     */
    dateTooltipTexts?: DatepickerDateTooltipText[];
    /**
     * Disable specific dates
     */
    datesEnabled?: Date[];
    /**
     * Enable specific dates
     */
    datesDisabled?: Date[];
    /**
     * Emits when datepicker value has been changed
     */
    bsValueChange: EventEmitter<Date>;
    protected _subs: Subscription[];
    private readonly _datepicker;
    private _datepickerRef?;
    constructor(_config: BsDatepickerInlineConfig, _elementRef: ElementRef, _renderer: Renderer2, _viewContainerRef: ViewContainerRef, cis: ComponentLoaderFactory);
    _bsValue?: Date;
    /**
     * Initial value of datepicker
     */
    set bsValue(value: Date | undefined);
    ngOnInit(): void;
    initSubscribes(): void;
    unsubscribeSubscriptions(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Set config for datepicker
     */
    setConfig(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerInlineDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BsDatepickerInlineDirective, "bs-datepicker-inline", ["bsDatepickerInline"], { "bsConfig": { "alias": "bsConfig"; "required": false; }; "isDisabled": { "alias": "isDisabled"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "dateCustomClasses": { "alias": "dateCustomClasses"; "required": false; }; "dateTooltipTexts": { "alias": "dateTooltipTexts"; "required": false; }; "datesEnabled": { "alias": "datesEnabled"; "required": false; }; "datesDisabled": { "alias": "datesDisabled"; "required": false; }; "bsValue": { "alias": "bsValue"; "required": false; }; }, { "bsValueChange": "bsValueChange"; }, never, never, true, never>;
}

declare class BsDaterangepickerInlineConfig extends BsDatepickerConfig {
    displayMonths: number;
    /** turn on/off animation */
    isAnimated: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDaterangepickerInlineConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BsDaterangepickerInlineConfig>;
}

declare class BsDaterangepickerContainerComponent extends BsDatepickerAbstractComponent implements OnInit, OnDestroy, AfterViewInit {
    private _config;
    private _store;
    private _element;
    private _actions;
    private _positionService;
    set value(value: (Date | undefined)[] | undefined);
    valueChange: EventEmitter<Date[]>;
    animationState: string;
    _rangeStack: Date[];
    chosenRange: Date[];
    _subs: Subscription[];
    isRangePicker: boolean;
    startTimepicker?: TimepickerComponent;
    endTimepicker?: TimepickerComponent;
    get isDatePickerDisabled(): boolean;
    get isDatepickerDisabled(): "" | null;
    get isDatepickerReadonly(): "" | null;
    constructor(_renderer: Renderer2, _config: BsDatepickerConfig, _store: BsDatepickerStore, _element: ElementRef, _actions: BsDatepickerActions, _effects: BsDatepickerEffects, _positionService: PositioningService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    get isTopPosition(): boolean;
    positionServiceEnable(): void;
    timeSelectHandler(date: Date, index: number): void;
    daySelectHandler(day: DayViewModel): void;
    monthSelectHandler(day: CalendarCellViewModel): void;
    yearSelectHandler(day: CalendarCellViewModel): void;
    rangesProcessing(day: CalendarCellViewModel): void;
    ngOnDestroy(): void;
    setRangeOnCalendar(dates: BsCustomDates): void;
    setMaxDateRangeOnCalendar(currentSelection: Date): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDaterangepickerContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsDaterangepickerContainerComponent, "bs-daterangepicker-container", never, {}, {}, never, never, true, never>;
}

declare class BsDaterangepickerInlineContainerComponent extends BsDaterangepickerContainerComponent implements OnInit, OnDestroy {
    get disabledValue(): "" | null;
    get readonlyValue(): "" | null;
    constructor(_renderer: Renderer2, _config: BsDatepickerConfig, _store: BsDatepickerStore, _element: ElementRef, _actions: BsDatepickerActions, _effects: BsDatepickerEffects, _positioningService: PositioningService);
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDaterangepickerInlineContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsDaterangepickerInlineContainerComponent, "bs-daterangepicker-inline-container", never, {}, {}, never, never, true, never>;
}

declare class BsDaterangepickerInlineDirective implements OnInit, OnDestroy, OnChanges {
    _config: BsDaterangepickerInlineConfig;
    private _elementRef;
    _bsValue?: (Date | undefined)[] | undefined;
    /**
     * Initial value of datepicker
     */
    set bsValue(value: (Date | undefined)[] | undefined);
    /**
     * Config object for datepicker
     */
    bsConfig?: Partial<BsDaterangepickerInlineConfig>;
    /**
     * Indicates whether datepicker is enabled or not
     */
    isDisabled: boolean;
    /**
     * Minimum date which is available for selection
     */
    minDate?: Date;
    /**
     * Maximum date which is available for selection
     */
    maxDate?: Date;
    /**
     * Date custom classes
     */
    dateCustomClasses?: DatepickerDateCustomClasses[];
    /**
     * Disable specific days, e.g. [0,6] will disable all Saturdays and Sundays
     */
    daysDisabled?: number[];
    /**
     * Disable specific dates
     */
    datesDisabled?: Date[];
    /**
     * Disable specific dates
     */
    datesEnabled?: Date[];
    /**
     * Emits when daterangepicker value has been changed
     */
    bsValueChange: EventEmitter<(Date | undefined)[] | undefined>;
    protected _subs: Subscription[];
    private readonly _datepicker;
    private _datepickerRef?;
    constructor(_config: BsDaterangepickerInlineConfig, _elementRef: ElementRef, _renderer: Renderer2, _viewContainerRef: ViewContainerRef, cis: ComponentLoaderFactory);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Set config for datepicker
     */
    setConfig(): void;
    initSubscribes(): void;
    unsubscribeSubscriptions(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDaterangepickerInlineDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BsDaterangepickerInlineDirective, "bs-daterangepicker-inline", ["bsDaterangepickerInline"], { "bsValue": { "alias": "bsValue"; "required": false; }; "bsConfig": { "alias": "bsConfig"; "required": false; }; "isDisabled": { "alias": "isDisabled"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "dateCustomClasses": { "alias": "dateCustomClasses"; "required": false; }; "daysDisabled": { "alias": "daysDisabled"; "required": false; }; "datesDisabled": { "alias": "datesDisabled"; "required": false; }; "datesEnabled": { "alias": "datesEnabled"; "required": false; }; }, { "bsValueChange": "bsValueChange"; }, never, never, true, never>;
}

declare class BsDatepickerInputDirective implements ControlValueAccessor, Validator, OnInit, OnDestroy {
    private _picker;
    private _localeService;
    private _renderer;
    private _elRef;
    private changeDetection;
    private _onChange;
    private _onTouched;
    private _validatorChange;
    private _value?;
    private _subs;
    constructor(_picker: BsDatepickerDirective, _localeService: BsLocaleService, _renderer: Renderer2, _elRef: ElementRef, changeDetection: ChangeDetectorRef);
    onChange(event: Event): void;
    onBlur(): void;
    hide(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    _setInputValue(value?: Date): void;
    validate(c: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange(fn: () => void): void;
    writeValue(value: Date | string): void;
    setDisabledState(isDisabled: boolean): void;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerInputDirective, [{ host: true; }, null, null, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BsDatepickerInputDirective, "input[bsDatepicker]", never, {}, {}, never, never, true, never>;
}

declare class BsDaterangepickerConfig extends BsDatepickerConfig {
    displayMonths: number;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDaterangepickerConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BsDaterangepickerConfig>;
}

declare class BsDaterangepickerDirective implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    _config: BsDaterangepickerConfig;
    private _elementRef;
    private _renderer;
    /**
     * Placement of a daterangepicker. Accepts: "top", "bottom", "left", "right"
     */
    placement: 'top' | 'bottom' | 'left' | 'right';
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    triggers: string;
    /**
     * Close daterangepicker on outside click
     */
    outsideClick: boolean;
    /**
     * A selector specifying the element the daterangepicker should be appended to.
     */
    container: string;
    outsideEsc: boolean;
    /**
     * Returns whether or not the daterangepicker is currently being shown
     */
    get isOpen(): boolean;
    set isOpen(value: boolean);
    /**
     * Emits an event when the daterangepicker is shown
     */
    onShown: EventEmitter<unknown>;
    /**
     * Emits an event when the daterangepicker is hidden
     */
    onHidden: EventEmitter<unknown>;
    _bsValue?: (Date | undefined)[];
    isOpen$: BehaviorSubject<boolean>;
    isDestroy$: Subject<unknown>;
    /**
     * Initial value of daterangepicker
     */
    set bsValue(value: (Date | undefined)[] | undefined);
    /**
     * Config object for daterangepicker
     */
    bsConfig?: Partial<BsDaterangepickerConfig>;
    /**
     * Indicates whether daterangepicker's content is enabled or not
     */
    isDisabled: boolean;
    /**
     * Minimum date which is available for selection
     */
    minDate?: Date;
    /**
     * Maximum date which is available for selection
     */
    maxDate?: Date;
    /**
     * Date custom classes
     */
    dateCustomClasses?: DatepickerDateCustomClasses[];
    /**
     * Disable specific days, e.g. [0,6] will disable all Saturdays and Sundays
     */
    daysDisabled?: number[];
    /**
     * Disable specific dates
     */
    datesDisabled?: Date[];
    /**
     * Enable specific dates
     */
    datesEnabled?: Date[];
    /**
     * Emits when daterangepicker value has been changed
     */
    bsValueChange: EventEmitter<(Date | undefined)[] | undefined>;
    get isDatepickerReadonly(): "" | null;
    get rangeInputFormat$(): Observable<string>;
    protected _subs: Subscription[];
    private _datepicker;
    private _datepickerRef?;
    private readonly _rangeInputFormat$;
    constructor(_config: BsDaterangepickerConfig, _elementRef: ElementRef, _renderer: Renderer2, _viewContainerRef: ViewContainerRef, cis: ComponentLoaderFactory);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    /**
     * Opens an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     */
    show(): void;
    initSubscribes(): void;
    initPreviousValue(): void;
    keepDatepickerModalOpened(): boolean;
    isDateSame(): boolean;
    /**
     * Set config for daterangepicker
     */
    setConfig(): void;
    /**
     * Closes an element’s datepicker. This is considered a “manual” triggering of
     * the datepicker.
     */
    hide(): void;
    /**
     * Toggles an element’s datepicker. This is considered a “manual” triggering
     * of the datepicker.
     */
    toggle(): void;
    unsubscribeSubscriptions(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDaterangepickerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BsDaterangepickerDirective, "[bsDaterangepicker]", ["bsDaterangepicker"], { "placement": { "alias": "placement"; "required": false; }; "triggers": { "alias": "triggers"; "required": false; }; "outsideClick": { "alias": "outsideClick"; "required": false; }; "container": { "alias": "container"; "required": false; }; "outsideEsc": { "alias": "outsideEsc"; "required": false; }; "isOpen": { "alias": "isOpen"; "required": false; }; "bsValue": { "alias": "bsValue"; "required": false; }; "bsConfig": { "alias": "bsConfig"; "required": false; }; "isDisabled": { "alias": "isDisabled"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "dateCustomClasses": { "alias": "dateCustomClasses"; "required": false; }; "daysDisabled": { "alias": "daysDisabled"; "required": false; }; "datesDisabled": { "alias": "datesDisabled"; "required": false; }; "datesEnabled": { "alias": "datesEnabled"; "required": false; }; }, { "onShown": "onShown"; "onHidden": "onHidden"; "bsValueChange": "bsValueChange"; }, never, never, true, never>;
}

declare class BsDaterangepickerInputDirective implements ControlValueAccessor, Validator, OnInit, OnDestroy {
    private _picker;
    private _localeService;
    private _renderer;
    private _elRef;
    private changeDetection;
    private _onChange;
    private _onTouched;
    private _validatorChange;
    private _value?;
    private _subs;
    constructor(_picker: BsDaterangepickerDirective, _localeService: BsLocaleService, _renderer: Renderer2, _elRef: ElementRef, changeDetection: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    onKeydownEvent(event: KeyboardEvent): void;
    _setInputValue(date?: (Date | undefined)[]): void;
    onChange(event: Event): void;
    validate(c: AbstractControl): ValidationErrors | null;
    registerOnValidatorChange(fn: () => void): void;
    writeValue(value: Date[] | string): void;
    setDisabledState(isDisabled: boolean): void;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
    onBlur(): void;
    hide(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDaterangepickerInputDirective, [{ host: true; }, null, null, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BsDaterangepickerInputDirective, "input[bsDaterangepicker]", never, {}, {}, never, never, true, never>;
}

declare class BsCalendarLayoutComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<BsCalendarLayoutComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsCalendarLayoutComponent, "bs-calendar-layout", never, {}, {}, never, ["bs-datepicker-navigation-view", "*"], true, never>;
}

declare class BsCurrentDateViewComponent {
    title?: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsCurrentDateViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsCurrentDateViewComponent, "bs-current-date", never, { "title": { "alias": "title"; "required": false; }; }, {}, never, never, true, never>;
}

declare class BsDatepickerDayDecoratorComponent implements OnInit {
    private _config;
    private _elRef;
    private _renderer;
    day: DayViewModel;
    constructor(_config: BsDatepickerConfig, _elRef: ElementRef, _renderer: Renderer2);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerDayDecoratorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsDatepickerDayDecoratorComponent, "[bsDatepickerDayDecorator]", never, { "day": { "alias": "day"; "required": false; }; }, {}, never, never, true, never>;
}

declare class BsDatepickerNavigationViewComponent {
    calendar: NavigationViewModel;
    isDisabled: boolean;
    onNavigate: EventEmitter<BsNavigationDirection>;
    onViewMode: EventEmitter<BsDatepickerViewMode>;
    navTo(down: boolean): void;
    view(viewMode: BsDatepickerViewMode): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerNavigationViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsDatepickerNavigationViewComponent, "bs-datepicker-navigation-view", never, { "calendar": { "alias": "calendar"; "required": false; }; "isDisabled": { "alias": "isDisabled"; "required": false; }; }, { "onNavigate": "onNavigate"; "onViewMode": "onViewMode"; }, never, never, true, never>;
}

declare class BsDaysCalendarViewComponent {
    private _config;
    calendar: DaysCalendarViewModel;
    options?: DatepickerRenderOptions | null;
    isDisabled?: boolean;
    onNavigate: EventEmitter<BsNavigationEvent>;
    onViewMode: EventEmitter<BsDatepickerViewMode>;
    onSelect: EventEmitter<DayViewModel>;
    onHover: EventEmitter<CellHoverEvent>;
    onHoverWeek: EventEmitter<WeekViewModel>;
    isWeekHovered?: boolean;
    isiOS: boolean;
    isShowTooltip?: boolean;
    constructor(_config: BsDatepickerConfig);
    navigateTo(event: BsNavigationDirection): void;
    changeViewMode(event: BsDatepickerViewMode): void;
    selectDay(event: DayViewModel): void;
    selectWeek(week: WeekViewModel): void;
    weekHoverHandler(cell: WeekViewModel, isHovered: boolean): void;
    hoverDay(cell: DayViewModel, isHovered: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDaysCalendarViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsDaysCalendarViewComponent, "bs-days-calendar-view", never, { "calendar": { "alias": "calendar"; "required": false; }; "options": { "alias": "options"; "required": false; }; "isDisabled": { "alias": "isDisabled"; "required": false; }; }, { "onNavigate": "onNavigate"; "onViewMode": "onViewMode"; "onSelect": "onSelect"; "onHover": "onHover"; "onHoverWeek": "onHoverWeek"; }, never, never, true, never>;
}

declare class BsMonthCalendarViewComponent {
    calendar: MonthsCalendarViewModel;
    onNavigate: EventEmitter<BsNavigationEvent>;
    onViewMode: EventEmitter<BsDatepickerViewMode>;
    onSelect: EventEmitter<CalendarCellViewModel>;
    onHover: EventEmitter<CellHoverEvent>;
    navigateTo(event: BsNavigationDirection): void;
    viewMonth(month: CalendarCellViewModel): void;
    hoverMonth(cell: CalendarCellViewModel, isHovered: boolean): void;
    changeViewMode(event: BsDatepickerViewMode): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsMonthCalendarViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsMonthCalendarViewComponent, "bs-month-calendar-view", never, { "calendar": { "alias": "calendar"; "required": false; }; }, { "onNavigate": "onNavigate"; "onViewMode": "onViewMode"; "onSelect": "onSelect"; "onHover": "onHover"; }, never, never, true, never>;
}

declare class BsTimepickerViewComponent {
    ampm: string;
    hours: number;
    minutes: number;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsTimepickerViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsTimepickerViewComponent, "bs-timepicker", never, {}, {}, never, never, true, never>;
}

declare class BsYearsCalendarViewComponent {
    calendar: YearsCalendarViewModel;
    onNavigate: EventEmitter<BsNavigationEvent>;
    onViewMode: EventEmitter<BsDatepickerViewMode>;
    onSelect: EventEmitter<CalendarCellViewModel>;
    onHover: EventEmitter<CellHoverEvent>;
    navigateTo(event: BsNavigationDirection): void;
    viewYear(year: CalendarCellViewModel): void;
    hoverYear(cell: CalendarCellViewModel, isHovered: boolean): void;
    changeViewMode(event: BsDatepickerViewMode): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsYearsCalendarViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BsYearsCalendarViewComponent, "bs-years-calendar-view", never, { "calendar": { "alias": "calendar"; "required": false; }; }, { "onNavigate": "onNavigate"; "onViewMode": "onViewMode"; "onSelect": "onSelect"; "onHover": "onHover"; }, never, never, true, never>;
}

declare class BsDatepickerModule {
    static forRoot(): ModuleWithProviders<BsDatepickerModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsDatepickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<BsDatepickerModule, never, [typeof i1.CommonModule, typeof i2.TooltipModule, typeof i3.TimepickerModule, typeof BsCalendarLayoutComponent, typeof BsCurrentDateViewComponent, typeof BsCustomDatesViewComponent, typeof BsDatepickerDayDecoratorComponent, typeof BsDatepickerNavigationViewComponent, typeof BsDaysCalendarViewComponent, typeof BsMonthCalendarViewComponent, typeof BsTimepickerViewComponent, typeof BsYearsCalendarViewComponent, typeof BsDatepickerContainerComponent, typeof BsDatepickerDirective, typeof BsDatepickerInlineContainerComponent, typeof BsDatepickerInlineDirective, typeof BsDatepickerInputDirective, typeof BsDaterangepickerContainerComponent, typeof BsDaterangepickerDirective, typeof BsDaterangepickerInlineContainerComponent, typeof BsDaterangepickerInlineDirective, typeof BsDaterangepickerInputDirective], [typeof BsDatepickerContainerComponent, typeof BsDatepickerDirective, typeof BsDatepickerInlineContainerComponent, typeof BsDatepickerInlineDirective, typeof BsDatepickerInputDirective, typeof BsDaterangepickerContainerComponent, typeof BsDaterangepickerDirective, typeof BsDaterangepickerInlineContainerComponent, typeof BsDaterangepickerInlineDirective, typeof BsDaterangepickerInputDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<BsDatepickerModule>;
}

export { BsDatepickerConfig, BsDatepickerContainerComponent, BsDatepickerDirective, BsDatepickerInlineConfig, BsDatepickerInlineContainerComponent, BsDatepickerInlineDirective, BsDatepickerInputDirective, BsDatepickerModule, BsDaterangepickerConfig, BsDaterangepickerContainerComponent, BsDaterangepickerDirective, BsDaterangepickerInlineConfig, BsDaterangepickerInlineContainerComponent, BsDaterangepickerInlineDirective, BsDaterangepickerInputDirective, BsLocaleService };
export type { BsDatepickerViewMode, DatepickerDateCustomClasses, DatepickerDateTooltipText };
