import {width,height,levelConf} from '../conf.js';


export default class Space{
    constructor(i,j,key,level,type) {
        this.i = i;
        this.j = j;
        this.level = level;
        this.key = key;
        this.type = type;
        this.isProperty = false;
    }

    get style(){
        return {
            left:this.i * width + 'px',
            top:this.j * height + 'px',
        }
    }

    get className(){
        const bgClass = !this.isProperty ? 'bg-secondary':'bg-info';
        let leftOrRight = '';
        let topOrBottom = '';
        if (this.j !== 0 && this.j !== levelConf[this.level].col - 1)
            leftOrRight = this.i === 0 ? 'left' : 'right'

        if (this.i !== 0 && this.i !== levelConf[this.level].row - 1)
            topOrBottom = this.j === 0 ? 'top' : 'bottom'
        return `${bgClass} ${leftOrRight} ${topOrBottom}`
    }

    get img(){
        return {
            villa:'1.png',
            condo:'2.png',
            factory:'5.png',
            cottage:'4.png',
            townhome:'3.png',

            treasure:'treasure.png',
            incometax:'incometax.png',
            surprise:'surprise.png',
            start:'6.png',
            jail:'7.png',
            vacation:'9.png',
            airport:'8.png',
        }[this.type.toLocaleLowerCase()];
    }
}