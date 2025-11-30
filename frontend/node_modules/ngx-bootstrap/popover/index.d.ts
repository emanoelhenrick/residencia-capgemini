import * as i0 from '@angular/core';
import { OnInit, OnDestroy, TemplateRef, EventEmitter, ElementRef, Renderer2, ViewContainerRef, ModuleWithProviders } from '@angular/core';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { AvailableBSPositions, PositioningService } from 'ngx-bootstrap/positioning';
import * as i1 from '@angular/common';
import { IBsVersion } from 'ngx-bootstrap/utils';

/**
 * Configuration service for the Popover directive.
 * You can inject this service, typically in your root component, and customize
 * the values of its properties in order to provide default values for all the
 * popovers used in the application.
 */
declare class PopoverConfig {
    /** sets disable adaptive position */
    adaptivePosition: boolean;
    /**
     * Placement of a popover. Accepts: "top", "bottom", "left", "right", "auto"
     */
    placement: string;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    triggers: string;
    outsideClick: boolean;
    /**
     * A selector specifying the element the popover should be appended to.
     */
    container?: string;
    /** delay before showing the tooltip */
    delay: number;
    boundariesElement?: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopoverConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PopoverConfig>;
}

/**
 * A lightweight, extensible directive for fancy popover creation.
 */
declare class PopoverDirective implements OnInit, OnDestroy {
    private _elementRef;
    private _renderer;
    private _positionService;
    /** unique id popover - use for aria-describedby */
    popoverId: number;
    /** sets disable adaptive position */
    adaptivePosition: boolean;
    boundariesElement?: 'viewport' | 'scrollParent' | 'window';
    /**
     * Content to be displayed as popover.
     */
    popover?: string | TemplateRef<any>;
    /**
     * Context to be used if popover is a template.
     */
    popoverContext: any;
    /**
     * Title of a popover.
     */
    popoverTitle?: string;
    /**
     * Placement of a popover. Accepts: "top", "bottom", "left", "right"
     */
    placement: AvailableBSPositions;
    /**
     * Close popover on outside click
     */
    outsideClick: boolean;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    triggers: string;
    /**
     * A selector specifying the element the popover should be appended to.
     */
    container?: string;
    /**
     * Css class for popover container
     */
    containerClass: string;
    /**
     * Returns whether or not the popover is currently being shown
     */
    get isOpen(): boolean;
    set isOpen(value: boolean);
    /**
     * Delay before showing the tooltip
     */
    delay: number;
    /**
     * Emits an event when the popover is shown
     */
    onShown: EventEmitter<unknown>;
    /**
     * Emits an event when the popover is hidden
     */
    onHidden: EventEmitter<unknown>;
    protected _popoverCancelShowFn?: () => void;
    protected _delayTimeoutId?: number;
    private _popover;
    private _isInited;
    private _ariaDescribedby?;
    constructor(_config: PopoverConfig, _elementRef: ElementRef, _renderer: Renderer2, _viewContainerRef: ViewContainerRef, cis: ComponentLoaderFactory, _positionService: PositioningService);
    /**
     * Set attribute aria-describedBy for element directive and
     * set id for the popover
     */
    setAriaDescribedBy(): void;
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    show(): void;
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    hide(): void;
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    toggle(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopoverDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PopoverDirective, "[popover]", ["bs-popover"], { "adaptivePosition": { "alias": "adaptivePosition"; "required": false; }; "boundariesElement": { "alias": "boundariesElement"; "required": false; }; "popover": { "alias": "popover"; "required": false; }; "popoverContext": { "alias": "popoverContext"; "required": false; }; "popoverTitle": { "alias": "popoverTitle"; "required": false; }; "placement": { "alias": "placement"; "required": false; }; "outsideClick": { "alias": "outsideClick"; "required": false; }; "triggers": { "alias": "triggers"; "required": false; }; "container": { "alias": "container"; "required": false; }; "containerClass": { "alias": "containerClass"; "required": false; }; "isOpen": { "alias": "isOpen"; "required": false; }; "delay": { "alias": "delay"; "required": false; }; }, { "onShown": "onShown"; "onHidden": "onHidden"; }, never, never, true, never>;
}

declare class PopoverContainerComponent {
    set placement(value: AvailableBSPositions);
    title?: string;
    containerClass?: string;
    popoverId?: string;
    _placement: AvailableBSPositions;
    get _bsVersions(): IBsVersion;
    constructor(config: PopoverConfig);
    checkMarginNecessity(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopoverContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PopoverContainerComponent, "popover-container", never, { "placement": { "alias": "placement"; "required": false; }; "title": { "alias": "title"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare class PopoverModule {
    static forRoot(): ModuleWithProviders<PopoverModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopoverModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PopoverModule, never, [typeof i1.CommonModule, typeof PopoverDirective, typeof PopoverContainerComponent], [typeof PopoverDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PopoverModule>;
}

export { PopoverConfig, PopoverContainerComponent, PopoverDirective, PopoverModule };
