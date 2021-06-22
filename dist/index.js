import { ResizeObserver as Polyfill } from '@juggle/resize-observer';
const ResizeObserver = window.ResizeObserver || Polyfill;
export class ResizeObservable extends HTMLElement {
    constructor() {
        super();
        this._resizeObserver = null;
        this._width = 0;
        this._levels = [480, 600, 768, 1024, 1200, 1600, 1900];
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
            :host{
                display: flex;
                flex-direction: column;
                flex: 1 1 auto;
            }
        </style><slot></slot>`;
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }
    get levels() {
        return this._levels;
    }
    set levels(value) {
        if (value.join('') === this._levels.join(""))
            return;
        this._removeOldSizes(this._levels);
        this._levels = value;
        this._updateGridSize();
    }
    connectedCallback() {
        this._initResizeObserver();
    }
    disconnectedCallback() {
        var _a;
        (_a = this._resizeObserver) === null || _a === void 0 ? void 0 : _a.unobserve(this);
    }
    _onChangeSize(entries) {
        for (const entry of entries) {
            if (entry.target === this) {
                this._setWidth(entry.contentRect.width);
            }
        }
    }
    _initResizeObserver() {
        if (!this._resizeObserver) {
            this._resizeObserver = new ResizeObserver(this._onChangeSize.bind(this));
        }
        this._resizeObserver.observe(this);
    }
    _setWidth(value) {
        if (value === this._width)
            return;
        requestAnimationFrame(() => {
            this._width = value;
            this._updateGridSize();
            this.dispatchEvent(new CustomEvent("resize", {
                detail: {
                    width: value,
                    sizes: this.className
                }
            }));
        });
    }
    _removeOldSizes(values) {
        for (const level of values) {
            this.classList.remove('before-' + level);
            this.classList.remove('after-' + level);
        }
    }
    _updateGridSize() {
        for (const level of this._levels) {
            if (this._width <= level) {
                this.classList.add('before-' + level);
                this.classList.remove('after-' + level);
            }
            else {
                this.classList.remove('before-' + level);
                this.classList.add('after-' + level);
            }
        }
    }
}
customElements.define('resize-observable', ResizeObservable);
