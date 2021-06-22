import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

const ResizeObserver = window.ResizeObserver || Polyfill;


export class ResizeObservable extends HTMLElement{
    _resizeObserver: ResizeObserver | null = null;
    _width: number = 0;
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
                display: flex;
                flex-direction: column;
                flex: 1 1 auto;
            }
        </style><slot></slot>`
        this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
        this._initResizeObserver();
    }
    disconnectedCallback(){
        this._resizeObserver?.unobserve(this);
    }
    
    private _onChangeSize(entries: ResizeObserverEntry[]){
        for(const entry of entries){
            if(entry.target === this){                
                this._setWidth(entry.contentRect.width);
            }
        }
    }
    private _initResizeObserver(){
        if(!this._resizeObserver){
            this._resizeObserver = new ResizeObserver(this._onChangeSize.bind(this));
        }        
        this._resizeObserver.observe(this);
    }
    private _setWidth(value: number){   
        if(value === this._width) return;
        requestAnimationFrame(() => {
            this._width = value;
            this._updateGridSize();
            this.dispatchEvent(new CustomEvent("resize", {
                detail: {
                    width: value,
                    sizes: this.className
                }
            }))
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