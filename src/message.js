class message{
    constructor() {
        this.messageList = reactive([]);
    }

    addMessage(content){
        this.messageList.unshift(content);
    }
}

export default new message()