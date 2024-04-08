import * as conf from './conf.js';
import Space from './buildings/Space.js';
import tools from './tool.js'
import Property from './Property.js'
import {isCorner} from "./conf.js";
import game from "./game.js";
import properties from "./properties.js";

export default class scene{
    constructor(level) {
        this.road = [];
        this.level = level;

        if(level.constructor == String){
            this.init();
        }else{
            this.importScene(level);
        }
    }

    init(){
        this.createMap();
    }

    importScene(scene){
        this.level = scene.level;
        this.initialMoney = Number(scene.initialMoney);
        this.salary = Number(scene.salary);
        properties.types = scene.properties;
        scene.road.forEach((item)=>{
            this.addBuilding(item.i,item.j,item.key,item.type);

            if(conf.building.includes(item.type)){
                this.road[item.key].name = item.name;
            }
        })
    }

    clickEvent(space) {
        const {i, j, key, type} = space;

        ({
            treasure: () => this.addBuilding(i, j, key, tools.type.value),
            surprise: () => this.addBuilding(i, j, key, tools.type.value),
            incometax: () => this.addBuilding(i, j, key, tools.type.value),
            remove: () => this.removeBuilding(i, j, key, tools.type.value),


            villa: () => this.addProperty(i, j, key, tools.type.value),
            condo: () => this.addProperty(i, j, key, tools.type.value),
            cottage: () => this.addProperty(i, j, key, tools.type.value),
            townhome: () => this.addProperty(i, j, key, tools.type.value),
            factory: () => this.addProperty(i, j, key, tools.type.value),
        })[tools.type.value]?.bind()();
    }

    removeBuilding(i,j,key,type){
        if(isCorner(i,j,this.msg.row,this.msg.col) || (i===0 && j === 0)) return

        this.addBuilding(i,j,key,'SPACE',true);
    }

    addBuilding(i,j,key,type){
        const toolType = {
            cottage:Property,
            condo:Property,
            villa:Property,
            factory:Property,
            townhome:Property,

            treasure:Space,
            surprise:Space,
            space:Space,
            incometax:Space,
            jail: Space,
            start: Space,
            vacation: Space,
            airport: Space,
        }[type.toLocaleLowerCase()]

        let msg = conf.levelConf[this.level];

        const space = new toolType(i,j,key,this.level,type);
        // const oldSpace = this.road[key]
        // this.road[key].next = oldSpace?.next
        this.road[key] = space;
    }

    addProperty(i,j,key,type){
        this.addBuilding(i,j,key,tools.type.value);
    }
    createMap(){
        let data = conf.levelConf[this.level];
        this.road = [];

        let now = [0,0],
            dir = 1,
            index = 0,
            corners = [...conf.corner],
            key = 0,
            type = 'SPACE'
        while(now[0] !== 0 || now[1] !== 0 || !this.road.length){
            type = 'SPACE';
            let [i,j] = now;
            let corner = conf.isCorner(i,j,data.row,data.col);

            if(corner !== false){
                type = corners.shift();
            }
            const space = new Space(i,j,key++,this.level,type);

            if(this.road.length && corner !== false) index ^= 1;

            if(corner == 2) dir = -1;
            now[index] += dir;

            this.road.push(space);
        }
    }

    async exportScene(){

        let {salary , initialMoney} = game.GameMapData;

        const json = {
            properties:properties.types,
            initialMoney,
            salary,
            level: this.level,
            road: this.road.map((space) => {
                const v = { ...space }
                v.next = null
                return v
            }),
        }

        let mapList = localStorage.getItem(conf.mapListName) ?? '[]'
        mapList = JSON.parse(mapList)
        mapList.push(json)
        localStorage.setItem(conf.mapListName, JSON.stringify(mapList))
    }

    // randomMap(){
    //     for(let z = 0; z<this.road.length;z++){
    //         let corner = conf.tools[~~(Math.random() * conf.tools.length -1)];
    //         let {i,j,key} = this.road[z];
    //         let msg = conf.levelConf[this.level];
    //         if(conf.isCorner(i,j,msg.row,msg.col) || (i===0 && j === 0)) continue
    //         // this.road[z] = this.addBuilding(i,j,key,this.level,corner);
    //     }
    // }
}