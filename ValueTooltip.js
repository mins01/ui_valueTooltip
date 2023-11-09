class ValueTooltip{
    static instance = null;

    container = null;
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
    



    addEventListener(container){
        if(this.activated){console.log('already activated'); return;}
        this.activated = true;
        this.container = container;
        this.container.addEventListener('input',this.eventHnadler);
        this.container.addEventListener('change',this.eventHnadler);
        this.container.addEventListener('compositionupdate',this.eventHnadler);
    }
    removeEventListener(){
        if(!this.activated){console.log('already deactivated'); return;}
        this.activated = false;
        this.container.removeEventListener('input',this.eventHnadler);
        this.container.removeEventListener('change',this.eventHnadler);
        this.container.removeEventListener('compositionupdate',this.eventHnadler);
    }

    initialize(){
        this.container.querySelectorAll('.value-tooltip-form-control').forEach((el) => {
            this.setData(el);
        });
    }

    eventHnadler = (event)=>{
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
