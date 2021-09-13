export declare class ResizeObservable extends HTMLElement {
    _resizeObserver: ResizeObserver | null;
    _width: number;
    _height: number;
    _levels: number[];
    get levels(): number[];
    set levels(value: number[]);
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _onChangeSize;
    private _initResizeObserver;
    setSize(data: {
        width: number;
        height: number;
    }): void;
    private _setSize;
    private _removeOldSizes;
    private _updateGridSize;
}
declare global {
    interface HTMLElementTagNameMap {
        'resize-observable': ResizeObservable;
    }
}
