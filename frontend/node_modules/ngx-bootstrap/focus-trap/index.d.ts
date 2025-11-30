import * as i0 from '@angular/core';
import { OnDestroy, AfterContentInit, OnChanges, DoCheck, NgZone, ElementRef, SimpleChanges, ModuleWithProviders } from '@angular/core';
import * as i1 from '@angular/common';

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Type describing the allowed values for a boolean input.
 * @docs-private
 */
type BooleanInput = string | boolean | null | undefined;

/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 */
declare class Platform {
    private _platformId;
    /** Whether the Angular application is being rendered in the browser. */
    isBrowser: boolean;
    /** Whether the current browser is Microsoft Edge. */
    EDGE: boolean;
    /** Whether the current rendering engine is Microsoft Trident. */
    TRIDENT: boolean;
    /** Whether the current rendering engine is Blink. */
    BLINK: boolean;
    /** Whether the current rendering engine is WebKit. */
    WEBKIT: boolean;
    /** Whether the current platform is Apple iOS. */
    IOS: boolean;
    /** Whether the current browser is Firefox. */
    FIREFOX: boolean;
    /** Whether the current platform is Android. */
    ANDROID: boolean;
    /** Whether the current browser is Safari. */
    SAFARI: boolean;
    constructor(_platformId: Object);
    static ɵfac: i0.ɵɵFactoryDeclaration<Platform, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Platform>;
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Configuration for the isFocusable method.
 */
declare class IsFocusableConfig {
    /**
     * Whether to count an element as focusable even if it is not currently visible.
     */
    ignoreVisibility: boolean;
}
/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
declare class InteractivityChecker {
    private _platform;
    constructor(_platform: Platform);
    /**
     * Gets whether an element is disabled.
     *
     * @param element Element to be checked.
     * @returns Whether the element is disabled.
     */
    isDisabled(element: HTMLElement): boolean;
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @returns Whether the element is visible.
     */
    isVisible(element: HTMLElement): boolean;
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param element Element to be checked.
     * @returns Whether the element is tabbable.
     */
    isTabbable(element: HTMLElement): boolean;
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param element Element to be checked.
     * @param config The config object with options to customize this method's behavior
     * @returns Whether the element is focusable.
     */
    isFocusable(element: HTMLElement, config?: IsFocusableConfig): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<InteractivityChecker, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<InteractivityChecker>;
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Class that allows for trapping focus within a DOM element.
 *
 * This class currently uses a relatively simple approach to focus trapping.
 * It assumes that the tab order is the same as DOM order, which is not necessarily true.
 * Things like `tabIndex > 0`, flex `order`, and shadow roots can cause the two to misalign.
 *
 * @deprecated Use `ConfigurableFocusTrap` instead.
 * @breaking-change for 11.0.0 Remove this class.
 */
declare class FocusTrap {
    readonly _element: HTMLElement;
    private _checker;
    readonly _ngZone: NgZone;
    readonly _document: Document;
    private _startAnchor?;
    private _endAnchor?;
    private _hasAttached;
    protected startAnchorListener: () => boolean;
    protected endAnchorListener: () => boolean;
    /** Whether the focus trap is active. */
    get enabled(): boolean;
    set enabled(value: boolean);
    protected _enabled: boolean;
    constructor(_element: HTMLElement, _checker: InteractivityChecker, _ngZone: NgZone, _document: Document, deferAnchors?: boolean);
    /** Destroys the focus trap by cleaning up the anchors. */
    destroy(): void;
    /**
     * Inserts the anchors into the DOM. This is usually done automatically
     * in the constructor, but can be deferred for cases like directives with `*ngIf`.
     * @returns Whether the focus trap managed to attach successfuly. This may not be the case
     * if the target element isn't currently in the DOM.
     */
    attachAnchors(): boolean;
    /**
     * Waits for the zone to stabilize, then either focuses the first element that the
     * user specified, or the first tabbable element.
     * @returns Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfully.
     */
    focusInitialElementWhenReady(): Promise<boolean>;
    /**
     * Waits for the zone to stabilize, then focuses
     * the first tabbable element within the focus trap region.
     * @returns Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfully.
     */
    focusFirstTabbableElementWhenReady(): Promise<boolean>;
    /**
     * Waits for the zone to stabilize, then focuses
     * the last tabbable element within the focus trap region.
     * @returns Returns a promise that resolves with a boolean, depending
     * on whether focus was moved successfully.
     */
    focusLastTabbableElementWhenReady(): Promise<boolean>;
    /**
     * Get the specified boundary element of the trapped region.
     * @param bound The boundary to get (start or end of trapped region).
     * @returns The boundary element.
     */
    private _getRegionBoundary;
    /**
     * Focuses the element that should be focused when the focus trap is initialized.
     * @returns Whether focus was moved successfully.
     */
    focusInitialElement(): boolean;
    /**
     * Focuses the first tabbable element within the focus trap region.
     * @returns Whether focus was moved successfully.
     */
    focusFirstTabbableElement(): boolean;
    /**
     * Focuses the last tabbable element within the focus trap region.
     * @returns Whether focus was moved successfully.
     */
    focusLastTabbableElement(): boolean;
    /**
     * Checks whether the focus trap has successfully been attached.
     */
    hasAttached(): boolean;
    /** Get the first tabbable element from a DOM subtree (inclusive). */
    private _getFirstTabbableElement;
    /** Get the last tabbable element from a DOM subtree (inclusive). */
    private _getLastTabbableElement;
    /** Creates an anchor element. */
    private _createAnchor;
    /**
     * Toggles the `tabindex` of an anchor, based on the enabled state of the focus trap.
     * @param isEnabled Whether the focus trap is enabled.
     * @param anchor Anchor on which to toggle the tabindex.
     */
    private _toggleAnchorTabIndex;
    /**
     * Toggles the`tabindex` of both anchors to either trap Tab focus or allow it to escape.
     * @param enabled: Whether the anchors should trap Tab.
     */
    protected toggleAnchors(enabled: boolean): void;
    /** Executes a function when the zone is stable. */
    private _executeOnStable;
}
/**
 * Factory that allows easy instantiation of focus traps.
 * @deprecated Use `ConfigurableFocusTrapFactory` instead.
 * @breaking-change for 11.0.0 Remove this class.
 */
declare class FocusTrapFactory {
    private _checker;
    private _ngZone;
    private _document;
    constructor(_checker: InteractivityChecker, _ngZone: NgZone, _document: any);
    /**
     * Creates a focus-trapped region around the given element.
     * @param element The element around which focus will be trapped.
     * @param deferCaptureElements Defers the creation of focus-capturing elements to be done
     *     manually by the user.
     * @returns The created focus trap instance.
     */
    create(element: HTMLElement, deferCaptureElements?: boolean): FocusTrap;
    static ɵfac: i0.ɵɵFactoryDeclaration<FocusTrapFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FocusTrapFactory>;
}
/** Directive for trapping focus within a region. */
declare class FocusTrapDirective implements OnDestroy, AfterContentInit, OnChanges, DoCheck {
    private _elementRef;
    private _focusTrapFactory;
    private _document;
    /** Underlying FocusTrap instance. */
    focusTrap: FocusTrap;
    /** Previously focused element to restore focus to upon destroy when using autoCapture. */
    private _previouslyFocusedElement;
    /** Whether the focus trap is active. */
    get enabled(): boolean;
    set enabled(value: boolean);
    /**
     * Whether the directive should automatically move focus into the trapped region upon
     * initialization and return focus to the previous activeElement upon destruction.
     */
    get autoCapture(): boolean;
    set autoCapture(value: boolean);
    private _autoCapture;
    constructor(_elementRef: ElementRef<HTMLElement>, _focusTrapFactory: FocusTrapFactory, _document: any);
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    ngDoCheck(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private _captureFocus;
    static ngAcceptInputType_enabled: BooleanInput;
    static ngAcceptInputType_autoCapture: BooleanInput;
    static ɵfac: i0.ɵɵFactoryDeclaration<FocusTrapDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FocusTrapDirective, "[focusTrap]", ["focusTrap"], { "enabled": { "alias": "cdkTrapFocus"; "required": false; }; "autoCapture": { "alias": "cdkTrapFocusAutoCapture"; "required": false; }; }, {}, never, never, true, never>;
}

declare class FocusTrapModule {
    static forRoot(): ModuleWithProviders<FocusTrapModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FocusTrapModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<FocusTrapModule, never, [typeof i1.CommonModule, typeof FocusTrapDirective], [typeof FocusTrapDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<FocusTrapModule>;
}

export { FocusTrap, FocusTrapDirective, FocusTrapModule };
