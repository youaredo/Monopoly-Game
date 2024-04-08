class Tool{
    constructor() {
        this.type = ref(null);
    }

    changeTool(item){
        this.type.value = item ? item:null;
    }

    get data(){
        return{
            tool:this.type,
            changeTool:this.changeTool.bind(this),
        }
    }
}

let tool = new Tool();

export default tool;