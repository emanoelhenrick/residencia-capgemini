import * as i0 from '@angular/core';
import { OnInit, OnChanges, ElementRef, ChangeDetectorRef, Renderer2, SimpleChanges, QueryList, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

type AvailableValues = boolean | string | number;
/**
 * Add checkbox functionality to any element
 */
declare class ButtonCheckboxDirective implements ControlValueAccessor, OnInit {
    /** Truthy value, will be set to ngModel */
    btnCheckboxTrue: AvailableValues;
    /** Falsy value, will be set to ngModel */
    btnCheckboxFalse: AvailableValues;
    state: boolean;
    protected value?: AvailableValues;
    protected isDisabled: boolean;
    protected onChange: Function;
    protected onTouched: Function;
    onClick(): void;
    ngOnInit(): void;
    protected get trueValue(): AvailableValues;
    protected get falseValue(): AvailableValues;
    toggle(state: boolean): void;
    writeValue(value: boolean | string | null): void;
    setDisabledState(isDisabled: boolean): void;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonCheckboxDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ButtonCheckboxDirective, "[btnCheckbox]", never, { "btnCheckboxTrue": { "alias": "btnCheckboxTrue"; "required": false; }; "btnCheckboxFalse": { "alias": "btnCheckboxFalse"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * Create radio buttons or groups of buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
declare class ButtonRadioDirective implements ControlValueAccessor, OnChanges {
    private el;
    private cdr;
    private renderer;
    private group;
    onChange: Function;
    onTouched: Function;
    /** Radio button value, will be set to `ngModel` */
    btnRadio?: unknown;
    /** If `true` — radio button can be unchecked */
    uncheckable: boolean;
    /** Current value of radio component or group */
    get value(): unknown | undefined;
    set value(value: unknown | undefined);
    /** If `true` — radio button is disabled */
    get disabled(): boolean;
    set disabled(disabled: boolean);
    get controlOrGroupDisabled(): true | undefined;
    get hasDisabledClass(): boolean | undefined;
    get isActive(): boolean;
    readonly role: string;
    get tabindex(): undefined | number;
    get hasFocus(): boolean;
    private _value?;
    private _disabled;
    private _hasFocus;
    constructor(el: ElementRef, cdr: ChangeDetectorRef, renderer: Renderer2, group: ButtonRadioGroupDirective);
    toggleIfAllowed(): void;
    onSpacePressed(event: KeyboardEvent): void;
    focus(): void;
    onFocus(): void;
    onBlur(): void;
    canToggle(): boolean;
    ngOnChanges(changes: SimpleChanges): void;
    _onChange(value?: unknown): void;
    writeValue(value: unknown): void;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(disabled: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonRadioDirective, [null, null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ButtonRadioDirective, "[btnRadio]", never, { "btnRadio": { "alias": "btnRadio"; "required": false; }; "uncheckable": { "alias": "uncheckable"; "required": false; }; "value": { "alias": "value"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * A group of radio buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
declare class ButtonRadioGroupDirective implements ControlValueAccessor {
    private cdr;
    onChange: Function;
    onTouched: Function;
    readonly role: string;
    radioButtons?: QueryList<ButtonRadioDirective>;
    constructor(cdr: ChangeDetectorRef);
    private _value?;
    get value(): unknown | undefined;
    set value(value: unknown | undefined);
    private _disabled;
    get disabled(): boolean;
    get tabindex(): null | number;
    writeValue(value?: string): void;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(disabled: boolean): void;
    onFocus(): void;
    onBlur(): void;
    selectNext(event: KeyboardEvent): void;
    selectPrevious(event: KeyboardEvent): void;
    private selectInDirection;
    private getActiveOrFocusedRadio;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonRadioGroupDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ButtonRadioGroupDirective, "[btnRadioGroup]", never, {}, {}, ["radioButtons"], never, true, never>;
}

declare class ButtonsModule {
    static forRoot(): ModuleWithProviders<ButtonsModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ButtonsModule, never, [typeof ButtonCheckboxDirective, typeof ButtonRadioDirective, typeof ButtonRadioGroupDirective], [typeof ButtonCheckboxDirective, typeof ButtonRadioDirective, typeof ButtonRadioGroupDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ButtonsModule>;
}

export { ButtonCheckboxDirective, ButtonRadioDirective, ButtonRadioGroupDirective, ButtonsModule };
