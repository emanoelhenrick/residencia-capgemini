import * as i0 from '@angular/core';
import { EventEmitter, StaticProvider, InjectionToken, OnInit, ElementRef, Renderer2, ComponentRef, RendererFactory2, TemplateRef, OnDestroy, ViewContainerRef, ModuleWithProviders } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import * as i1 from 'ngx-bootstrap/focus-trap';

declare class BsModalRef<T = any> {
    /**
     * Event that is fired when the modal behind the ref starts hiding
     */
    onHide?: EventEmitter<unknown>;
    /**
     * Event that is fired when the modal behind the ref finishes hiding
     */
    onHidden?: EventEmitter<unknown>;
    /**
     *  Allow user to ID for the modal. Otherwise, a unique number will be given
     */
    id?: number | string;
    /**
     * Reference to a component inside the modal. Null if modal's been created with TemplateRef
     */
    content?: T;
    /**
     * Hides the modal
     */
    hide: () => void;
    /**
     * Sets new class to modal window
     */
    setClass: (newClass: string) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsModalRef<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BsModalRef<any>>;
}

declare class ModalBackdropOptions {
    animate: boolean;
    constructor(options: ModalBackdropOptions);
}

type CloseInterceptorFn = () => Promise<void>;

declare class ModalOptions<T = Record<string, unknown>> {
    /**
     *  Allow user to ID for the modal. Otherwise, a unique number will be given
     */
    id?: number | string;
    /**
     *  Includes a modal-backdrop element. Alternatively,
     *  specify static for a backdrop which doesn't close the modal on click.
     */
    backdrop?: boolean | 'static';
    /**
     * Closes the modal when escape key is pressed.
     */
    keyboard?: boolean;
    focus?: boolean;
    /**
     * Shows the modal when initialized.
     */
    show?: boolean;
    /**
     * Ignore the backdrop click
     */
    ignoreBackdropClick?: boolean;
    /**
     * Css class for opened modal
     */
    class?: string;
    /**
     * Toggle animation
     */
    animated?: boolean;
    /**
     * Modal data
     */
    initialState?: Partial<T>;
    /**
     * Function to intercept the closure
     */
    closeInterceptor?: CloseInterceptorFn;
    /**
     * Modal providers
     */
    providers?: StaticProvider[];
    /**
     * aria-labelledby attribute value to set on the modal window
     */
    ariaLabelledBy?: string;
    /**
     * aria-describedby attribute value to set on the modal window
     */
    ariaDescribedby?: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalOptions<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ModalOptions<any>>;
}
declare const MODAL_CONFIG_DEFAULT_OVERRIDE: InjectionToken<ModalOptions>;

/** This component will be added as background layout for modals if enabled */
declare class ModalBackdropComponent implements OnInit {
    get isAnimated(): boolean;
    set isAnimated(value: boolean);
    get isShown(): boolean;
    set isShown(value: boolean);
    element: ElementRef;
    renderer: Renderer2;
    protected _isAnimated: boolean;
    protected _isShown: boolean;
    constructor(element: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalBackdropComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalBackdropComponent, "bs-modal-backdrop", never, {}, {}, never, never, true, never>;
}

declare class BsModalService {
    private clf;
    private modalDefaultOption;
    config: ModalOptions;
    onShow: EventEmitter<any>;
    onShown: EventEmitter<any>;
    onHide: EventEmitter<any>;
    onHidden: EventEmitter<any>;
    protected isBodyOverflowing: boolean;
    protected originalBodyPadding: number;
    protected scrollbarWidth: number;
    protected backdropRef?: ComponentRef<ModalBackdropComponent>;
    private _backdropLoader;
    private modalsCount;
    private lastHiddenId;
    private lastDismissReason?;
    private loaders;
    private _renderer;
    private _focusEl;
    constructor(rendererFactory: RendererFactory2, clf: ComponentLoaderFactory, modalDefaultOption: ModalOptions);
    /** Shows a modal */
    show<T>(content: string | TemplateRef<any> | {
        new (...args: any[]): T;
    }, config?: ModalOptions<T>): BsModalRef<T>;
    hide(id?: number | string): void;
    _showBackdrop(): void;
    _hideBackdrop(): void;
    _showModal<T>(content: any): BsModalRef<T>;
    _hideModal(id?: number | string): void;
    getModalsCount(): number;
    setDismissReason(reason: string): void;
    removeBackdrop(): void;
    /** Checks if the body is overflowing and sets scrollbar width */
    /** @internal */
    checkScrollbar(): void;
    setScrollbar(): void;
    private resetScrollbar;
    private getScrollbarWidth;
    private _createLoaders;
    private removeLoaders;
    private copyEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<BsModalService, [null, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BsModalService>;
}

declare class ModalContainerComponent implements OnInit, OnDestroy {
    protected _element: ElementRef;
    private _renderer;
    config: ModalOptions;
    isShown: boolean;
    level?: number;
    isAnimated: boolean;
    bsModalService?: BsModalService;
    _focusEl: Element | null;
    private isModalHiding;
    private clickStartedInContent;
    constructor(options: ModalOptions, _element: ElementRef, _renderer: Renderer2);
    ngOnInit(): void;
    onClickStarted(event: MouseEvent): void;
    onClickStop(event: MouseEvent): void;
    onPopState(): void;
    onEsc(event: KeyboardEvent): void;
    ngOnDestroy(): void;
    hide(): void;
    private _hide;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModalContainerComponent, "modal-container", never, {}, {}, never, ["*"], true, never>;
}

/** Mark any code with directive to show it's content in modal */
declare class ModalDirective implements OnDestroy, OnInit {
    private _element;
    private _renderer;
    /** allows to set modal configuration via element property */
    set config(conf: ModalOptions);
    get config(): ModalOptions;
    /** allows to provide a callback to intercept the closure of the modal */
    closeInterceptor?: CloseInterceptorFn;
    /** This event fires immediately when the `show` instance method is called. */
    onShow: EventEmitter<ModalDirective>;
    /** This event is fired when the modal has been made visible to the user
     * (will wait for CSS transitions to complete)
     */
    onShown: EventEmitter<ModalDirective>;
    /** This event is fired immediately when
     * the hide instance method has been called.
     */
    onHide: EventEmitter<ModalDirective>;
    /** This event is fired when the modal has finished being
     * hidden from the user (will wait for CSS transitions to complete).
     */
    onHidden: EventEmitter<ModalDirective>;
    /** This field contains last dismiss reason.
     * Possible values: `backdrop-click`, `esc` and `id: number`
     * (if modal was closed by direct call of `.hide()`).
     */
    dismissReason?: string;
    get isShown(): boolean;
    protected _config: ModalOptions;
    protected _isShown: boolean;
    protected isBodyOverflowing: boolean;
    protected originalBodyPadding: number;
    protected scrollbarWidth: number;
    protected timerHideModal: number;
    protected timerRmBackDrop: number;
    protected backdrop?: ComponentRef<ModalBackdropComponent>;
    private _backdrop;
    private isNested;
    private clickStartedInContent;
    private _focusEl;
    constructor(_element: ElementRef, _viewContainerRef: ViewContainerRef, _renderer: Renderer2, clf: ComponentLoaderFactory, modalDefaultOption: ModalOptions);
    onClickStarted(event: MouseEvent): void;
    onClickStop(event: MouseEvent): void;
    onEsc(event: KeyboardEvent): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    /** Allows to manually toggle modal visibility */
    toggle(): void;
    /** Allows to manually open modal */
    show(): void;
    /** Check if we can close the modal */
    hide(event?: Event): void;
    /** Private methods @internal */
    /**
     *  Manually close modal
     *  @internal
     */
    protected _hide(): void;
    protected getConfig(config?: ModalOptions): ModalOptions;
    /**
     *  Show dialog
     *  @internal
     */
    protected showElement(): void;
    /** @internal */
    protected hideModal(): void;
    /** @internal */
    protected showBackdrop(callback?: () => void): void;
    /** @internal */
    protected removeBackdrop(): void;
    /** Events tricks */
    protected focusOtherModal(): void;
    /** @internal */
    protected resetAdjustments(): void;
    /** Scroll bar tricks */
    /** @internal */
    protected checkScrollbar(): void;
    protected setScrollbar(): void;
    protected resetScrollbar(): void;
    protected getScrollbarWidth(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalDirective, [null, null, null, null, { optional: true; }]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ModalDirective, "[bsModal]", ["bs-modal"], { "config": { "alias": "config"; "required": false; }; "closeInterceptor": { "alias": "closeInterceptor"; "required": false; }; }, { "onShow": "onShow"; "onShown": "onShown"; "onHide": "onHide"; "onHidden": "onHidden"; }, never, never, true, never>;
}

declare class ModalModule {
    static forRoot(): ModuleWithProviders<ModalModule>;
    static forChild(): ModuleWithProviders<ModalModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ModalModule, never, [typeof i1.FocusTrapModule, typeof ModalBackdropComponent, typeof ModalDirective, typeof ModalContainerComponent], [typeof ModalBackdropComponent, typeof ModalDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ModalModule>;
}

export { BsModalRef, BsModalService, MODAL_CONFIG_DEFAULT_OVERRIDE, ModalBackdropComponent, ModalBackdropOptions, ModalContainerComponent, ModalDirective, ModalModule, ModalOptions };
export type { CloseInterceptorFn };
