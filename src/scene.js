import * as conf from './conf.js';
import Space from './buildings/Space.js';
import tools from './tool.js'
import Property from './Property.js'
import {building, corner, isCorner} from "./conf.js";
import game from "./game.js";
import properties from "./properties.js";

export default class scene{
    constructor(level) {
        this.road = [];
        this.level = level;
        this.buildings = new Map();

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

    async clickEvent(space) {

        const {i, j, key, type} = space;

        let air = game.round?.value;
        if(air){
            let player = air.players[air.index];

            if(player.air){
                player.key = key;
                await player.moveTo(0);
                player.onSpace();
                player.air = false;
            }
        }

        if (!tools.type.value) return

        if(!tools.toCanPlace(this.buildings,i,j,type)) return

        ({
            treasure: () => this.addBuilding(i, j, key, tools.type.value),
            surprise: () => this.addBuilding(i, j, key, tools.type.value),
            incometax: () => this.addBuilding(i, j, key, tools.type.value),
            remove: () => this.removeBuilding(i, j, key, type),


            villa: () => this.addProperty(i, j, key, tools.type.value),
            condo: () => this.addProperty(i, j, key, tools.type.value),
            cottage: () => this.addProperty(i, j, key, tools.type.value),
            townhome: () => this.addProperty(i, j, key, tools.type.value),
            factory: () => this.addProperty(i, j, key, tools.type.value),
        })[tools.type.value]?.bind()();
    }

    removeBuilding(i,j,key,type){
        if (conf.corner.includes(type)) return

        this.addBuilding(i,j,key,'SPACE');

        let oldKey = this.posFind(i, j, this.buildings.get(type));
        let building = [...this.buildings.get(type)];
        building.splice(oldKey,1);
        this.buildings.set(type, [...building])
    }

    posFind(i,j,building){
        for(let z= 0;z<building.length;z++){
            if(building[z].i === i && building[z].j === j) return z;
        }
        return false
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

        const space = new toolType(i,j,key,this.level,type);

        if(game.propertyInfo.value.name){
            space.name = game.propertyInfo.value.name;
        }

        this.road[key] = space;

        if(type !== "SPACE"){
            let hasBuildings = !this.buildings.has(type) ? [] : this.buildings.get(type)
            this.buildings.set(type,[...hasBuildings,space]);
        }

        game.propertyInfo.value.name = '';
    }

    addProperty(i,j,key,type){
            game.dialog.name.open(() => {
                let {name} = game.propertyInfo.value;
                if(!name.length){
                    alert('name is Empty');
                    return false;
                }
                this.addBuilding(i,j,key,tools.type.value);

                return true;
            })
    }
    createMap(){
        let data = conf.levelConf[this.level];
        this.road = [];
        this.buildings = new Map();

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
        const totalBuildingsNum = [...this.buildings].reduce((prev, curr) => {
            return curr[1].length + prev
        }, 0)

        if (totalBuildingsNum < this.road.length - 4){
            return alert('Please placed all empty space!')
        }

        game.dialog.editMapData.open(() => {
            let {salary , initialMoney} = game.GameMapData;
            if(initialMoney < 500 ||  salary < 200){
                alert('initialMoney is small than 500 or salary is small than 200')
                return false;
            }

            if(initialMoney % 10 !== 0 || salary % 10 !== 0){
                return alert('money must be divisible by 10 !');
            }


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
            alert('Success');
            game.toMapList();
            return true;
        })
    }

    async randomMap(){
        this.createMap();

        properties.randomPrice();

        for(let z = 0; z<this.road.length;z++){
            let newTool = conf.tools.filter(item =>{return item !== 'remove'});
            let {i,j,key,type} = this.road[z];

            if (conf.corner.includes(type)) continue

            while(true){
                tools.type.value = newTool[~~(Math.random() * conf.tools.length -1)];
                if(tools.toCanPlace(this.buildings,i,j,type)){
                    this.addBuilding(i,j,key,tools.type.value);

                    if(conf.building.includes(tools.type.value)) this.road[z].name = await tools.randomName();
                    break;
                }
            }
        }

        tools.type.value = null;
    }
}