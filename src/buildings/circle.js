class Circle {
    constructor() {
        this.dom = null
        this.className = ''
    }

    setDom(el) {
        this.dom = el
    }

    animationStart() {
        if(!this.dom) return
        this.className = 'circle'
        this.animationEnd()
    }

    animationEnd() {
        this.dom.addEventListener('animationend', ()=>{
            this.className = '';
            this.dom.removeEventListener('animationend',()=>{})
        })
    }
}

export default Circle;