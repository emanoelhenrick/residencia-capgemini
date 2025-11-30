import * as i0 from '@angular/core';
import { OnChanges, OnDestroy, EventEmitter, ChangeDetectorRef, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Action, MiniStore } from 'ngx-bootstrap/mini-ngrx';

interface Time {
    hour?: string | number;
    minute?: string | number;
    seconds?: string | number;
    isPM?: boolean;
}
interface TimepickerControls {
    canIncrementHours: boolean;
    canIncrementMinutes: boolean;
    canIncrementSeconds: boolean;
    canDecrementHours: boolean;
    canDecrementMinutes: boolean;
    canDecrementSeconds: boolean;
    canToggleMeridian: boolean;
}
interface TimepickerComponentState {
    min?: Date;
    max?: Date;
    hourStep: number;
    minuteStep: number;
    secondsStep: number;
    readonlyInput: boolean;
    disabled: boolean;
    mousewheel: boolean;
    arrowkeys: boolean;
    showSpinners: boolean;
    showMeridian: boolean;
    showSeconds: boolean;
    meridians: string[];
}
type TimeChangeSource = 'wheel' | 'key' | '';
interface TimeChangeEvent {
    step: number;
    source: TimeChangeSource;
}

declare class TimepickerActions {
    static readonly WRITE_VALUE = "[timepicker] write value from ng model";
    static readonly CHANGE_HOURS = "[timepicker] change hours";
    static readonly CHANGE_MINUTES = "[timepicker] change minutes";
    static readonly CHANGE_SECONDS = "[timepicker] change seconds";
    static readonly SET_TIME_UNIT = "[timepicker] set time unit";
    static readonly UPDATE_CONTROLS = "[timepicker] update controls";
    writeValue(value?: Date | string): {
        type: string;
        payload: string | Date | undefined;
    };
    changeHours(event: TimeChangeEvent): {
        type: string;
        payload: TimeChangeEvent;
    };
    changeMinutes(event: TimeChangeEvent): {
        type: string;
        payload: TimeChangeEvent;
    };
    changeSeconds(event: TimeChangeEvent): Action;
    setTime(value: Time): Action;
    updateControls(value: TimepickerComponentState): Action;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimepickerActions, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TimepickerActions>;
}

interface TimepickerState {
    value?: Date;
    config: TimepickerComponentState;
    controls: TimepickerControls;
}

declare class TimepickerStore extends MiniStore<TimepickerState> {
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<TimepickerStore, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TimepickerStore>;
}

/** Provides default configuration values for timepicker */
declare class TimepickerConfig {
    /** hours change step */
    hourStep: number;
    /** minutes change step */
    minuteStep: number;
    /** seconds changes step */
    secondsStep: number;
    /** if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM */
    showMeridian: boolean;
    /** meridian labels based on locale */
    meridians: string[];
    /** if true hours and minutes fields will be readonly */
    readonlyInput: boolean;
    /** if true hours and minutes fields will be disabled */
    disabled: boolean;
    /** if true emptyTime is not marked as invalid */
    allowEmptyTime: boolean;
    /** if true scroll inside hours and minutes inputs will change time */
    mousewheel: boolean;
    /** if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard */
    arrowkeys: boolean;
    /** if true spinner arrows above and below the inputs will be shown */
    showSpinners: boolean;
    /** show seconds in timepicker */
    showSeconds: boolean;
    /** show minutes in timepicker */
    showMinutes: boolean;
    /** minimum time user can select */
    min?: Date;
    /** maximum time user can select */
    max?: Date;
    /** placeholder for hours field in timepicker */
    hoursPlaceholder: string;
    /** placeholder for minutes field in timepicker */
    minutesPlaceholder: string;
    /** placeholder for seconds field in timepicker */
    secondsPlaceholder: string;
    /** hours aria label */
    ariaLabelHours: string;
    /** minutes aria label */
    ariaLabelMinutes: string;
    /** seconds aria label */
    ariaLabelSeconds: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimepickerConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TimepickerConfig>;
}

declare class TimepickerComponent implements ControlValueAccessor, TimepickerComponentState, TimepickerControls, OnChanges, OnDestroy {
    private _cd;
    private _store;
    private _timepickerActions;
    /** hours change step */
    hourStep: number;
    /** minutes change step */
    minuteStep: number;
    /** seconds change step */
    secondsStep: number;
    /** if true hours and minutes fields will be readonly */
    readonlyInput: boolean;
    /** if true hours and minutes fields will be disabled */
    disabled: boolean;
    /** if true scroll inside hours and minutes inputs will change time */
    mousewheel: boolean;
    /** if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard */
    arrowkeys: boolean;
    /** if true spinner arrows above and below the inputs will be shown */
    showSpinners: boolean;
    /** if true meridian button will be shown */
    showMeridian: boolean;
    /** show minutes in timepicker */
    showMinutes: boolean;
    /** show seconds in timepicker */
    showSeconds: boolean;
    /** meridian labels based on locale */
    meridians: string[];
    /** minimum time user can select */
    min?: Date;
    /** maximum time user can select */
    max?: Date;
    /** placeholder for hours field in timepicker */
    hoursPlaceholder: string;
    /** placeholder for minutes field in timepicker */
    minutesPlaceholder: string;
    /** placeholder for seconds field in timepicker */
    secondsPlaceholder: string;
    /** emits true if value is a valid date */
    isValid: EventEmitter<boolean>;
    /** emits value of meridian*/
    meridianChange: EventEmitter<string>;
    hours: string;
    minutes: string;
    seconds: string;
    meridian: string;
    invalidHours: boolean;
    invalidMinutes: boolean;
    invalidSeconds: boolean;
    labelHours: string;
    labelMinutes: string;
    labelSeconds: string;
    canIncrementHours: boolean;
    canIncrementMinutes: boolean;
    canIncrementSeconds: boolean;
    canDecrementHours: boolean;
    canDecrementMinutes: boolean;
    canDecrementSeconds: boolean;
    canToggleMeridian: boolean;
    onChange: Function;
    onTouched: Function;
    config: TimepickerConfig;
    timepickerSub?: Subscription;
    constructor(_config: TimepickerConfig, _cd: ChangeDetectorRef, _store: TimepickerStore, _timepickerActions: TimepickerActions);
    /** @deprecated - please use `isEditable` instead */
    get isSpinnersVisible(): boolean;
    get isEditable(): boolean;
    resetValidation(): void;
    isPM(): boolean;
    prevDef($event: Event): void;
    wheelSign($event: WheelEventInit): number;
    ngOnChanges(): void;
    changeHours(step: number, source?: TimeChangeSource): void;
    changeMinutes(step: number, source?: TimeChangeSource): void;
    changeSeconds(step: number, source?: TimeChangeSource): void;
    updateHours(target?: Partial<EventTarget> | null): void;
    updateMinutes(target: Partial<EventTarget> | null): void;
    updateSeconds(target: Partial<EventTarget> | null): void;
    isValidLimit(): boolean;
    isOneOfDatesIsEmpty(): boolean;
    _updateTime(): void;
    toggleMeridian(): void;
    /**
     * Write a new value to the element.
     */
    writeValue(obj?: string | Date): void;
    /**
     * Set the function to be called when the control receives a change event.
     */
    registerOnChange(fn: (_: any) => void): void;
    /**
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn: () => void): void;
    /**
     * This function is called when the control status changes to or from "disabled".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean): void;
    ngOnDestroy(): void;
    private _renderTime;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimepickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimepickerComponent, "timepicker", never, { "hourStep": { "alias": "hourStep"; "required": false; }; "minuteStep": { "alias": "minuteStep"; "required": false; }; "secondsStep": { "alias": "secondsStep"; "required": false; }; "readonlyInput": { "alias": "readonlyInput"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "mousewheel": { "alias": "mousewheel"; "required": false; }; "arrowkeys": { "alias": "arrowkeys"; "required": false; }; "showSpinners": { "alias": "showSpinners"; "required": false; }; "showMeridian": { "alias": "showMeridian"; "required": false; }; "showMinutes": { "alias": "showMinutes"; "required": false; }; "showSeconds": { "alias": "showSeconds"; "required": false; }; "meridians": { "alias": "meridians"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "hoursPlaceholder": { "alias": "hoursPlaceholder"; "required": false; }; "minutesPlaceholder": { "alias": "minutesPlaceholder"; "required": false; }; "secondsPlaceholder": { "alias": "secondsPlaceholder"; "required": false; }; }, { "isValid": "isValid"; "meridianChange": "meridianChange"; }, never, never, true, never>;
}

declare class TimepickerModule {
    static forRoot(): ModuleWithProviders<TimepickerModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimepickerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TimepickerModule, never, [typeof TimepickerComponent], [typeof TimepickerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TimepickerModule>;
}

export { TimepickerActions, TimepickerComponent, TimepickerConfig, TimepickerModule, TimepickerStore };
