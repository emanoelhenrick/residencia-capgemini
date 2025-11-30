import * as i0 from '@angular/core';
import { ViewContainerRef, TemplateRef, OnDestroy, Renderer2, ElementRef, OnInit, EventEmitter, ModuleWithProviders } from '@angular/core';
import * as i1 from '@angular/common';

declare class NgTranscludeDirective {
    viewRef: ViewContainerRef;
    protected _ngTransclude?: TemplateRef<any>;
    set ngTransclude(templateRef: TemplateRef<any> | undefined);
    get ngTransclude(): TemplateRef<any> | undefined;
    constructor(viewRef: ViewContainerRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<NgTranscludeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgTranscludeDirective, "[ngTransclude]", never, { "ngTransclude": { "alias": "ngTransclude"; "required": false; }; }, {}, never, never, true, never>;
}

declare class TabsetConfig {
    /** provides default navigation context class: 'tabs' or 'pills' */
    type: string;
    /** provides possibility to set keyNavigations enable or disable, by default is enable */
    isKeysAllowed: boolean;
    /** aria label for tab list */
    ariaLabel: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsetConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TabsetConfig>;
}

declare class TabsetComponent implements OnDestroy {
    private renderer;
    private elementRef;
    /** if true tabs will be placed vertically */
    get vertical(): boolean;
    set vertical(value: boolean);
    /** if true tabs fill the container and have a consistent width */
    get justified(): boolean;
    set justified(value: boolean);
    /** navigation context class: 'tabs' or 'pills' */
    get type(): string;
    set type(value: string);
    get isKeysAllowed(): boolean;
    set isKeysAllowed(value: boolean);
    clazz: boolean;
    tabs: TabDirective[];
    classMap: {
        [key: string]: boolean;
    };
    /** aria label for tab list */
    ariaLabel: string;
    protected isDestroyed: boolean;
    protected _vertical: boolean;
    protected _justified: boolean;
    protected _type: string;
    protected _isKeysAllowed: boolean;
    private defaultActivationScheduled;
    constructor(config: TabsetConfig, renderer: Renderer2, elementRef: ElementRef);
    ngOnDestroy(): void;
    addTab(tab: TabDirective): void;
    private insertTabByOrder;
    removeTab(tab: TabDirective, options?: {
        reselect: boolean;
        emit: boolean;
    }): void;
    keyNavActions(event: KeyboardEvent, index: number): void;
    protected getClosestTabIndex(index: number): number;
    protected hasAvailableTabs(index: number): boolean;
    protected setClassMap(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabsetComponent, "tabset", never, { "vertical": { "alias": "vertical"; "required": false; }; "justified": { "alias": "justified"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, {}, never, ["*"], true, never>;
}

declare class TabDirective implements OnInit, OnDestroy {
    elementRef: ElementRef;
    renderer: Renderer2;
    /** tab header text */
    heading?: string;
    /** tab id. The same id with suffix '-link' will be added to the corresponding &lt;li&gt; element  */
    id?: string;
    /** if true tab can not be activated */
    disabled: boolean;
    /** if true tab can be removable, additional button will appear */
    removable: boolean;
    /** tab order for sorting when using dynamic tabs with *ngIf */
    tabOrder?: number;
    /** if set, will be added to the tab's class attribute. Multiple classes are supported. */
    get customClass(): string | undefined;
    set customClass(customClass: string | undefined);
    /** tab active state toggle */
    get active(): boolean | undefined;
    set active(active: boolean | undefined);
    /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
    selectTab: EventEmitter<TabDirective>;
    /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
    deselect: EventEmitter<TabDirective>;
    /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
    removed: EventEmitter<TabDirective>;
    addClass: boolean;
    role: string;
    get ariaLabelledby(): string;
    headingRef?: TemplateRef<any>;
    tabset: TabsetComponent;
    protected _active?: boolean | undefined;
    protected _customClass: string;
    constructor(tabset: TabsetComponent, elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TabDirective, "tab, [tab]", ["tab"], { "heading": { "alias": "heading"; "required": false; }; "id": { "alias": "id"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "removable": { "alias": "removable"; "required": false; }; "tabOrder": { "alias": "tabOrder"; "required": false; }; "customClass": { "alias": "customClass"; "required": false; }; "active": { "alias": "active"; "required": false; }; }, { "selectTab": "selectTab"; "deselect": "deselect"; "removed": "removed"; }, never, never, true, never>;
}

/** Should be used to mark <ng-template> element as a template for tab heading */
declare class TabHeadingDirective {
    templateRef?: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>, tab: TabDirective);
    static ɵfac: i0.ɵɵFactoryDeclaration<TabHeadingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TabHeadingDirective, "[tabHeading]", never, {}, {}, never, never, true, never>;
}

declare class TabsModule {
    static forRoot(): ModuleWithProviders<TabsModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TabsModule, never, [typeof i1.CommonModule, typeof NgTranscludeDirective, typeof TabDirective, typeof TabsetComponent, typeof TabHeadingDirective], [typeof TabDirective, typeof TabsetComponent, typeof TabHeadingDirective, typeof NgTranscludeDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TabsModule>;
}

export { NgTranscludeDirective, TabDirective, TabHeadingDirective, TabsModule, TabsetComponent, TabsetConfig };
