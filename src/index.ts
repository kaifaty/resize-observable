import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

const ResizeObserver = window.ResizeObserver || Polyfill;


export class ResizeObservable extends HTMLElement{
    _resizeObserver: ResizeObserver | null = null;
    _width: number = 0;
    _height: number = 0;
    _levels: number[] = [480, 600, 768, 1024, 1200, 1600, 1900];
    get levels(){
        return this._levels;
    }
    set levels(value: number[]){
        if(value.join('') === this._levels.join("")) return;
        this._removeOldSizes(this._levels);
        this._levels = value;
        this._updateGridSize();
    }

    constructor(){
        super();        
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
            :host{
                display: block;
                height: 100%;
            }
        </style><slot></slot>`
        this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
        this._initResizeObserver();
        this.setSize({width: this.clientWidth, height: this.clientHeight});
    }
    disconnectedCallback(){
        this._resizeObserver?.unobserve(this);
    }
    
    private _onChangeSize(entries: ResizeObserverEntry[]){
        for(const entry of entries){
            if(entry.target === this){                
                this._setSize(entry.contentRect);
            }
        }
    }
    private _initResizeObserver(){
        if(!this._resizeObserver){
            this._resizeObserver = new ResizeObserver(this._onChangeSize.bind(this));
        }        
        this._resizeObserver.observe(this);
    }
    setSize(data: {width: number, height: number}){
        this._width = data.width;
        this._height = data.height;
        this._updateGridSize();
        this.dispatchEvent(new CustomEvent("resize", {
            detail: {
                width: this._width,
                height: this._height,
                sizes: this.className
            }
        }))
    }
    private _setSize(data: {width: number, height: number}){   
        if(data.width === this._width && data.height === this._height) return;
        requestAnimationFrame(() => {
            this.setSize(data);
        });
    }
    private _removeOldSizes(values: number[]){
        for(const level of values){
            this.classList.remove('before-' + level);
            this.classList.remove('after-' + level);
        }
    }
    private _updateGridSize(){
        for(const level of this._levels){
            if(this._width <= level){
                this.classList.add('before-' + level);
                this.classList.remove('after-' + level);
            }
            else{
                this.classList.remove('before-' + level);
                this.classList.add('after-' + level);
            }
        }
    }
    

}

customElements.define('resize-observable', ResizeObservable)


declare global {
    interface HTMLElementTagNameMap {
      'resize-observable': ResizeObservable;
    }
}