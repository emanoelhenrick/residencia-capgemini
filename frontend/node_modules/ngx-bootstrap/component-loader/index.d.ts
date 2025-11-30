import * as i0 from '@angular/core';
import { TemplateRef, ViewContainerRef, EventEmitter, ComponentRef, EmbeddedViewRef, Renderer2, ElementRef, Injector, ComponentFactoryResolver, NgZone, ApplicationRef, Type, StaticProvider, ViewRef } from '@angular/core';
import { PositioningService, PositioningOptions } from 'ngx-bootstrap/positioning';

declare class BsComponentRef<T> {
    templateRef?: TemplateRef<T>;
    viewContainer?: ViewContainerRef;
}

type BsEventCallback = (event?: any) => boolean | void;
interface ListenOptions {
    target?: HTMLElement;
    targets?: HTMLElement[];
    triggers?: string;
    outsideClick?: boolean;
    outsideEsc?: boolean;
    show?: BsEventCallback;
    hide?: BsEventCallback;
    toggle?: BsEventCallback;
}

declare class ComponentLoader<T extends object> {
    private _viewContainerRef;
    private _renderer;
    private _elementRef;
    private _injector;
    private _componentFactoryResolver;
    private _ngZone;
    private _applicationRef;
    private _posService;
    private _document;
    onBeforeShow: EventEmitter<any>;
    onShown: EventEmitter<any>;
    onBeforeHide: EventEmitter<any>;
    onHidden: EventEmitter<any>;
    instance?: T;
    _componentRef?: ComponentRef<T>;
    _inlineViewRef?: EmbeddedViewRef<T>;
    private _providers;
    private _componentFactory?;
    private _zoneSubscription?;
    private _contentRef?;
    private _innerComponent?;
    private _unregisterListenersFn?;
    private _isHiding;
    /**
     * Placement of a component. Accepts: "top", "bottom", "left", "right"
     */
    private attachment?;
    /**
     * A selector specifying the element the popover should be appended to.
     */
    private container;
    /**
     * A selector used if container element was not found
     */
    private containerDefaultSelector;
    /**
     * Specifies events that should trigger. Supports a space separated list of
     * event names.
     */
    private triggers?;
    private _listenOpts;
    private _globalListener;
    /**
     * Do not use this directly, it should be instanced via
     * `ComponentLoadFactory.attach`
     * @internal
     */
    constructor(_viewContainerRef: ViewContainerRef | undefined, _renderer: Renderer2 | undefined, _elementRef: ElementRef | undefined, _injector: Injector, _componentFactoryResolver: ComponentFactoryResolver, _ngZone: NgZone, _applicationRef: ApplicationRef, _posService: PositioningService, _document: Document);
    get isShown(): boolean;
    attach(compType: Type<T>): ComponentLoader<T>;
    to(container?: string | ElementRef): ComponentLoader<T>;
    position(opts?: PositioningOptions): ComponentLoader<T>;
    provide(provider: StaticProvider): ComponentLoader<T>;
    show(opts?: {
        content?: string | TemplateRef<unknown>;
        context?: unknown;
        initialState?: unknown;
        [key: string]: unknown;
        id?: number | string;
    }): ComponentRef<T> | undefined;
    hide(id?: number | string): ComponentLoader<T>;
    toggle(): void;
    dispose(): void;
    listen(listenOpts: ListenOptions): ComponentLoader<T>;
    _removeGlobalListener(): void;
    attachInline(vRef: ViewContainerRef | undefined, template: TemplateRef<any> | undefined): ComponentLoader<T>;
    _registerOutsideClick(): void;
    getInnerComponent(): ComponentRef<T> | undefined;
    private _subscribePositioning;
    private _unsubscribePositioning;
    private _getContentRef;
}

declare class ComponentLoaderFactory {
    private _componentFactoryResolver;
    private _ngZone;
    private _injector;
    private _posService;
    private _applicationRef;
    private _document;
    constructor(_componentFactoryResolver: ComponentFactoryResolver, _ngZone: NgZone, _injector: Injector, _posService: PositioningService, _applicationRef: ApplicationRef, _document: Document);
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     */
    createLoader<T extends object>(_elementRef?: ElementRef, _viewContainerRef?: ViewContainerRef, _renderer?: Renderer2): ComponentLoader<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentLoaderFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ComponentLoaderFactory>;
}

/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */

declare class ContentRef {
    nodes: any[];
    viewRef?: ViewRef;
    componentRef?: ComponentRef<any>;
    constructor(nodes: any[], viewRef?: ViewRef, componentRef?: ComponentRef<any>);
}

export { BsComponentRef, ComponentLoader, ComponentLoaderFactory, ContentRef };
