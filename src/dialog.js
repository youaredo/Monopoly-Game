import tool from './tool.js'

class dialog{
    constructor() {
        this.show = false;
        this.fn = null;
    }

    close(){
        tool.type.value = null;
        this.show = false;
    }

    open(fn = null){
        this.show = true;
        this.fn = fn;
    }

    judge(){
        if(this.fn && this.fn()){
            this.show = false;
            return true;
        }
    }
}

export default dialog;