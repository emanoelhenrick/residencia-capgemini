import * as i0 from '@angular/core';
import { OnInit, TemplateRef, EventEmitter, ElementRef, ChangeDetectorRef, ModuleWithProviders } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i1 from '@angular/common';

interface ConfigModel {
    align?: boolean;
    boundaryLinks: boolean;
    directionLinks: boolean;
    firstText: string;
    itemsPerPage: number;
    lastText: string;
    maxSize: number;
    nextText: string;
    pageBtnClass: string;
    previousText: string;
    rotate: boolean;
}
/**
 * Contain information about the page
 */
interface PagesModel {
    /** Text, which is displayed in the link */
    text: string;
    /** Page number */
    number: number;
    /** If `true`, then this is the current page */
    active: boolean;
}
interface PagerModel {
    itemsPerPage: number;
    previousText: string;
    nextText: string;
    pageBtnClass: string;
    align: boolean;
}
/**
 * A context for the
 * * `customPageTemplate`
 * * `customNextTemplate`
 * * `customPreviousTemplate`
 * * `customFirstTemplate`
 * * `customLastTemplate`
 * inputs for link templates in case you want to override one
 */
interface PaginationLinkContext {
    /** The currently selected page number */
    currentPage: number;
    /** If `true`, the current link is disabled */
    disabled: boolean;
}
/**
 * A context for the `pageTemplate` inputs for link template
 */
interface PaginationNumberLinkContext extends PaginationLinkContext {
    /** Contain the page information */
    $implicit: PagesModel;
}

/** Provides default values for Pagination and pager components */
declare class PaginationConfig {
    main: Partial<ConfigModel>;
    pager: PagerModel;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaginationConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PaginationConfig>;
}

interface PageChangedEvent {
    itemsPerPage: number;
    page: number;
}
declare class PaginationComponent implements ControlValueAccessor, OnInit {
    private elementRef;
    private changeDetection;
    config?: Partial<ConfigModel>;
    /** if `true` aligns each link to the sides of pager */
    align: boolean;
    /** limit number for page links in pager */
    maxSize?: number;
    /** if false first and last buttons will be hidden */
    boundaryLinks: boolean;
    /** if false previous and next buttons will be hidden */
    directionLinks: boolean;
    /** first button text */
    firstText?: string;
    /** previous button text */
    previousText?: string;
    /** next button text */
    nextText?: string;
    /** last button text */
    lastText?: string;
    /** if true current page will in the middle of pages list */
    rotate: boolean;
    /** add class to <code><li\></code> */
    pageBtnClass: string;
    /** if true pagination component will be disabled */
    disabled: boolean;
    /** custom template for page link */
    customPageTemplate?: TemplateRef<PaginationNumberLinkContext>;
    /** custom template for next link */
    customNextTemplate?: TemplateRef<PaginationLinkContext>;
    /** custom template for previous link */
    customPreviousTemplate?: TemplateRef<PaginationLinkContext>;
    /** custom template for first link */
    customFirstTemplate?: TemplateRef<PaginationLinkContext>;
    /** custom template for last link */
    customLastTemplate?: TemplateRef<PaginationLinkContext>;
    /** fired when total pages count changes, $event:number equals to total pages count */
    numPages: EventEmitter<number>;
    /** fired when page was changed, $event:{page, itemsPerPage} equals to object
     * with current page index and number of items per page
     */
    pageChanged: EventEmitter<PageChangedEvent>;
    onChange: Function;
    onTouched: Function;
    classMap: string;
    pages?: PagesModel[];
    protected inited: boolean;
    constructor(elementRef: ElementRef, paginationConfig: PaginationConfig, changeDetection: ChangeDetectorRef);
    protected _itemsPerPage: number;
    /** maximum number of items per page. If value less than 1 will display all items on one page */
    get itemsPerPage(): number;
    set itemsPerPage(v: number);
    protected _totalItems: number;
    /** total number of items in all pages */
    get totalItems(): number;
    set totalItems(v: number);
    protected _totalPages: number;
    get totalPages(): number;
    set totalPages(v: number);
    protected _page: number;
    get page(): number;
    set page(value: number);
    configureOptions(config: Partial<ConfigModel>): void;
    ngOnInit(): void;
    writeValue(value: number): void;
    getText(key: string): string;
    noPrevious(): boolean;
    noNext(): boolean;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
    selectPage(page: number, event?: Event): void;
    protected makePage(num: number, text: string, active: boolean): {
        number: number;
        text: string;
        active: boolean;
    };
    protected getPages(currentPage: number, totalPages: number): PagesModel[];
    protected calculateTotalPages(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PaginationComponent, "pagination", never, { "align": { "alias": "align"; "required": false; }; "maxSize": { "alias": "maxSize"; "required": false; }; "boundaryLinks": { "alias": "boundaryLinks"; "required": false; }; "directionLinks": { "alias": "directionLinks"; "required": false; }; "firstText": { "alias": "firstText"; "required": false; }; "previousText": { "alias": "previousText"; "required": false; }; "nextText": { "alias": "nextText"; "required": false; }; "lastText": { "alias": "lastText"; "required": false; }; "rotate": { "alias": "rotate"; "required": false; }; "pageBtnClass": { "alias": "pageBtnClass"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "customPageTemplate": { "alias": "customPageTemplate"; "required": false; }; "customNextTemplate": { "alias": "customNextTemplate"; "required": false; }; "customPreviousTemplate": { "alias": "customPreviousTemplate"; "required": false; }; "customFirstTemplate": { "alias": "customFirstTemplate"; "required": false; }; "customLastTemplate": { "alias": "customLastTemplate"; "required": false; }; "itemsPerPage": { "alias": "itemsPerPage"; "required": false; }; "totalItems": { "alias": "totalItems"; "required": false; }; }, { "numPages": "numPages"; "pageChanged": "pageChanged"; }, never, never, true, never>;
}

declare class PagerComponent implements ControlValueAccessor, OnInit {
    private elementRef;
    private changeDetection;
    config?: Partial<ConfigModel>;
    /** if `true` aligns each link to the sides of pager */
    align: boolean;
    /** limit number for page links in pager */
    maxSize?: number;
    /** if false first and last buttons will be hidden */
    boundaryLinks: boolean;
    /** if false previous and next buttons will be hidden */
    directionLinks: boolean;
    /** first button text */
    firstText: string;
    /** previous button text */
    previousText: string;
    /** next button text */
    nextText: string;
    /** last button text */
    lastText: string;
    /** if true current page will in the middle of pages list */
    rotate: boolean;
    /** add class to <code><li\></code> */
    pageBtnClass: string;
    /** if true pagination component will be disabled */
    disabled: boolean;
    /** fired when total pages count changes, $event:number equals to total pages count */
    numPages: EventEmitter<number>;
    /** fired when page was changed, $event:{page, itemsPerPage} equals to
     * object with current page index and number of items per page
     */
    pageChanged: EventEmitter<PageChangedEvent>;
    onChange: Function;
    onTouched: Function;
    classMap: string;
    pages?: PagesModel[];
    protected inited: boolean;
    constructor(elementRef: ElementRef, paginationConfig: PaginationConfig, changeDetection: ChangeDetectorRef);
    protected _itemsPerPage: number;
    /** maximum number of items per page. If value less than 1 will display all items on one page */
    get itemsPerPage(): number;
    set itemsPerPage(v: number);
    protected _totalItems: number;
    /** total number of items in all pages */
    get totalItems(): number;
    set totalItems(v: number);
    protected _totalPages: number;
    get totalPages(): number;
    set totalPages(v: number);
    protected _page: number;
    get page(): number;
    set page(value: number);
    configureOptions(config: Partial<ConfigModel>): void;
    ngOnInit(): void;
    writeValue(value: number): void;
    getText(key: string): string;
    noPrevious(): boolean;
    noNext(): boolean;
    registerOnChange(fn: () => void): void;
    registerOnTouched(fn: () => void): void;
    selectPage(page: number, event?: Event): void;
    protected makePage(num: number, text: string, active: boolean): {
        number: number;
        text: string;
        active: boolean;
    };
    protected getPages(currentPage: number, totalPages: number): PagesModel[];
    protected calculateTotalPages(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<PagerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PagerComponent, "pager", never, { "align": { "alias": "align"; "required": false; }; "maxSize": { "alias": "maxSize"; "required": false; }; "boundaryLinks": { "alias": "boundaryLinks"; "required": false; }; "directionLinks": { "alias": "directionLinks"; "required": false; }; "firstText": { "alias": "firstText"; "required": false; }; "previousText": { "alias": "previousText"; "required": false; }; "nextText": { "alias": "nextText"; "required": false; }; "lastText": { "alias": "lastText"; "required": false; }; "rotate": { "alias": "rotate"; "required": false; }; "pageBtnClass": { "alias": "pageBtnClass"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "itemsPerPage": { "alias": "itemsPerPage"; "required": false; }; "totalItems": { "alias": "totalItems"; "required": false; }; }, { "numPages": "numPages"; "pageChanged": "pageChanged"; }, never, never, true, never>;
}

declare class PaginationModule {
    static forRoot(): ModuleWithProviders<PaginationModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaginationModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<PaginationModule, never, [typeof i1.CommonModule, typeof PagerComponent, typeof PaginationComponent], [typeof PagerComponent, typeof PaginationComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<PaginationModule>;
}

export { PagerComponent, PaginationComponent, PaginationConfig, PaginationModule };
export type { PageChangedEvent, PagesModel, PaginationLinkContext, PaginationNumberLinkContext };
