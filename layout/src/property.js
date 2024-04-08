import {height, randomName, width} from "./conf.js";
import Space from "./buildings/Space.js";
import properties from "./properties.js";

export default class Property extends Space{
    constructor(i,j,key,level,type) {
        super(i,j,key,level,type);
        this.level = level;
        this.up = 0;
        this.type = type;
        this.isProperty = true;
        this.conf = properties.getTypes(type);
        this.name = this.randomName();
    }

    randomName(){
        let name = randomName[~~(Math.random() * randomName.length -1)];
        if(properties.nameAll.has(name)) return this.randomName();
        properties.nameAll.set(name);
        return randomName[~~(Math.random() * randomName.length -1)]
    }
    get rent(){
        return this.conf.rent[this.up];
    }

    get upgrade(){
        return this.conf.upgrade[this.up];
    }
}