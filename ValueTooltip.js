class ValueTooltip{
    static instance = null;

    listener = null;
    activated = false;
    constructor(){
        
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new this();
        }
        return this.instance;
    }
    static activate(){
        if(!globalThis.document){ console.log('globalThis.document is not exists.'); return;}
        const instance = this.getInstance();
        instance.addEventListener(globalThis.document)
        instance.initialize();
    }
    static deactivate(){
        this.getInstance().removeEventListener()
    }
    static sync(target){
        this.getInstance().setData(target);
    }


    addEventListener(listener){
        if(this.activated){console.log('already activated'); return;}
        this.activated = true;
        this.listener = listener;
        this.listener.addEventListener('input',this.eventHandler);
        this.listener.addEventListener('change',this.eventHandler);
        this.listener.addEventListener('compositionupdate',this.eventHandler);
    }
    removeEventListener(){
        if(!this.activated){console.log('already deactivated'); return;}
        this.activated = false;
        this.listener.removeEventListener('input',this.eventHandler);
        this.listener.removeEventListener('change',this.eventHandler);
        this.listener.removeEventListener('compositionupdate',this.eventHandler);
    }

    initialize(){
        this.listener.querySelectorAll('.value-tooltip-form-control').forEach((el) => {
            this.setData(el);
        });
    }

    eventHandler = (event)=>{
        const target = event.target;
        if(!target.classList.contains('value-tooltip-form-control')){return}
        this.setData(target);
    }
    
    setData(target){
        const wrap = target.closest('.value-tooltip-wrap');
        if(!wrap){return false}
        const tooltip = wrap.querySelector('.value-tooltip');
        if(!tooltip){return false}
        if(tooltip.classList.contains('value-tooltip-number-format')){
            tooltip.dataset.valueTooltipData = this.numberFormat(target.value);
        }else{
            tooltip.dataset.valueTooltipData = target.value;
        }
        return true;
    }

    numberFormat(n){
        return parseFloat(n).toLocaleString();
    }

}
