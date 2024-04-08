import {height, width} from "./conf.js";
import Space from "./buildings/Space.js";
import properties from "./properties.js";

export default class Property extends Space{
    constructor(i,j,key,level,type) {
        super(i,j,key,level,type);
        this.level = level;
        this.up = 1;
        this.type = type;
        this.isProperty = true;
        this.conf = properties.getTypes(type);
    }

    get rent(){
        return this.conf.rent[this.up - 1];
    }

    get upgrade(){
        return this.conf.upgrade[this.up -2];
    }
}