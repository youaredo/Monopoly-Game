import * as conf from './conf.js'
import {building} from "./conf.js";

class properties{
    constructor() {
        this.types = {};
        this.nameAll = new Map();
        this.createTypes();
    }

    getTypes(item){
        return  this.types[item];
    }

    createTypes() {
        conf.building.forEach((type) => {
            this.types[type] = {
                price: ~~(Math.random() * ~~(200 / 20)) * 20 + 80,
                rent: new Array(3).fill(0),
                upgrade: new Array(2).fill(0),
                isSet: false,
            }
        })
    }
}

export default new properties();