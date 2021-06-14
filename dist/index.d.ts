export declare class ResizeObservable extends HTMLElement {
    _resizeObserver: ResizeObserver | null;
    _width: number;
    _levels: number[];
    get levels(): number[];
    set levels(value: number[]);
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _onChangeSize;
    private _initResizeObserver;
    private _setWidth;
    private _removeOldSizes;
    private _updateGridSize;
}
declare global {
    interface HTMLElementTagNameMap {
        'resize-observable': ResizeObservable;
    }
}
