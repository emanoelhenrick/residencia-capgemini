import * as i0 from '@angular/core';
import { Renderer2, NgZone, RendererFactory2, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

interface Offsets {
    width: number;
    height: number;
    bottom?: number;
    left?: number;
    right?: number;
    top?: number;
    marginTop?: number;
    marginLeft?: number;
}
interface Data {
    options: Options;
    instance: {
        target: HTMLElement;
        host: HTMLElement;
        arrow?: HTMLElement;
    };
    offsets: {
        target: Offsets;
        host: Offsets;
        arrow?: Record<string, string | number | HTMLElement>;
    };
    positionFixed: boolean;
    placement: string;
    placementAuto: boolean;
}
interface Options {
    placement?: string;
    modifiers: {
        flip?: {
            enabled: boolean;
        };
        preventOverflow?: {
            enabled: boolean;
            boundariesElement?: string;
        };
    };
    allowedPositions?: string[];
}
declare enum PlacementForBs5 {
    top = "top",
    bottom = "bottom",
    left = "start",
    right = "end",
    auto = "auto",
    end = "end",
    start = "start",
    'top left' = "top start",
    'top right' = "top end",
    'right top' = "end top",
    'right bottom' = "end bottom",
    'bottom right' = "bottom end",
    'bottom left' = "bottom start",
    'left bottom' = "start bottom",
    'left top' = "start top",
    'top start' = "top start",
    'top end' = "top end",
    'end top' = "end top",
    'end bottom' = "end bottom",
    'bottom end' = "bottom end",
    'bottom start' = "bottom start",
    'start bottom' = "start bottom",
    'start top' = "start top"
}
type VerticalPosition = 'top' | 'bottom';
type HorizontalPosition = 'left' | 'right';
type RtlFriendlyHorizontalPosition = 'start' | 'end';
type AvailableBSPositions = VerticalPosition | HorizontalPosition | RtlFriendlyHorizontalPosition | 'auto' | `${VerticalPosition} ${HorizontalPosition}` | `${HorizontalPosition} ${VerticalPosition}` | `${VerticalPosition} ${RtlFriendlyHorizontalPosition}` | `${RtlFriendlyHorizontalPosition} ${VerticalPosition}`;

/**
 * @copyright Valor Software
 * @copyright Federico Zivolo and contributors
 */

declare class Positioning {
    position(hostElement: HTMLElement, targetElement: HTMLElement): Offsets | undefined;
    offset(hostElement: HTMLElement, targetElement: HTMLElement): Offsets | undefined;
    positionElements(hostElement: HTMLElement | null, targetElement: HTMLElement | null, position: string, appendToBody?: boolean, options?: Options): Data | undefined;
}
declare function positionElements(hostElement: HTMLElement | null, targetElement: HTMLElement | null, placement: string, appendToBody?: boolean, options?: Options, renderer?: Renderer2): void;

interface PositioningOptions {
    /** The DOM element, ElementRef, or a selector string of an element which will be moved */
    element?: HTMLElement | ElementRef | string;
    /** The DOM element, ElementRef, or a selector string of an element which the element will be attached to  */
    target?: HTMLElement | ElementRef | string;
    /**
     * A string of the form 'vert-attachment horiz-attachment' or 'placement'
     * - placement can be "top", "bottom", "left", "right"
     * not yet supported:
     * - vert-attachment can be any of 'top', 'middle', 'bottom'
     * - horiz-attachment can be any of 'left', 'center', 'right'
     */
    attachment?: string;
    /** A string similar to `attachment`. The one difference is that, if it's not provided,
     * `targetAttachment` will assume the mirror image of `attachment`.
     */
    targetAttachment?: string;
    /** A string of the form 'vert-offset horiz-offset'
     * - vert-offset and horiz-offset can be of the form "20px" or "55%"
     */
    offset?: string;
    /** A string similar to `offset`, but referring to the offset of the target */
    targetOffset?: string;
    /** If true component will be attached to body */
    appendToBody?: boolean;
}
declare class PositioningService {
    private options?;
    private update$$;
    private positionElements;
    private triggerEvent$?;
    private isDisabled;
    constructor(ngZone: NgZone, rendererFactory: RendererFactory2, platformId: number);
    position(options: PositioningOptions): void;
    get event$(): Observable<number | Event | null> | undefined;
    disable(): void;
    enable(): void;
    addPositionElement(options: PositioningOptions): void;
    calcPosition(): void;
    deletePositionElement(elRef: ElementRef): void;
    setOptions(options: Options): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PositioningService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PositioningService>;
}

declare function checkMargins(placement: AvailableBSPositions): string;

export { PlacementForBs5, Positioning, PositioningService, checkMargins, positionElements };
export type { AvailableBSPositions, PositioningOptions };
