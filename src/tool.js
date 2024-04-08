import {building, isCorner, levelConf, NameList} from "./conf.js";
import properties from './properties.js'
import game from './game.js'

class Tool{
    constructor() {
        this.type = ref(null);
    }

    changeTool(item){
        this.type.value = this.type.value === item ? null:item;

        if(building.includes(this.type.value) && !properties.types[this.type.value].isSet){
            game.propertyInfo.value.type = this.type.value;
            properties.setProperty();
        }
    }

     randomName = () =>{
         properties.nameAll = new Map();
         let name = NameList[~~(Math.random() * NameList.length -1)];

         while(properties.nameAll.has(name)){
             name = NameList[~~(Math.random() * NameList.length -1)];
         }
         properties.nameAll.set(name);
         return name;
    }

    get data(){
        return{
            tool:this.type,
            changeTool:this.changeTool.bind(this),
        }
    }

    get toCanPlace(){
        return {
            treasure(buildings,i,j,type){
                const treasure = buildings.has('treasure') && buildings.get('treasure');

                if(type === 'SPACE' && (!treasure || treasure.length < 2)){
                    let inRow = j === 0 || j === 4
                    return !inRow ? treasure[0]?.i !== i:treasure[0]?.j !== j
                }

                return false;
            },
            surprise(buildings,i,j,type){
                const surprise = buildings.has('surprise') && buildings.get('surprise');

                if(type === 'SPACE' && (!surprise || surprise.length < 2)){
                    let inRow = j === 0 || j === 4
                    return !inRow ? surprise[0]?.i !== i:surprise[0]?.j !== j
                }
                return false;
            },
            incometax(buildings,i,j,type){
                const surprise = buildings.has('incometax') && buildings.get('incometax');

                return type === 'SPACE' && !surprise.length
            },
            remove(buildings,i,j,type){
                return type !== 'SPACE'
            },
            villa(buildings,i,j,type){
                return type === 'SPACE';
            },
            condo(buildings,i,j,type){
                return type === 'SPACE';
            },
            townhome(buildings,i,j,type){
                return type === 'SPACE';
            },
            cottage(buildings,i,j,type){
                return type === 'SPACE';
            },
            factory(buildings,i,j,type){
                return type === 'SPACE';
            },
            airport(buildings,i,j,type){
                return type === 'SPACE';
            },
        }[this.type.value]
    }
}

let tool = new Tool();

export default tool;