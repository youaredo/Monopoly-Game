import * as conf from './conf.js'
import game from './game.js'
import tools from './tool.js'
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
                price: 0,
                rent: new Array(3).fill(0),
                upgrade: new Array(2).fill(0),
                isSet: false,
            }
        })
    }

    randomPrice(){
        conf.building.forEach(type =>{
            let [max,min] = [280,80];
            let diff = max-min;

            let price = ~~(Math.random() * diff / 20) * 20 + min;
            let item = this.types[type];
            item.price = price;
            item.rent = [price / 2 , price,price * 2];
            item.upgrade = [price * 1.5 , price,price * 2.5];
            item.isSet = true;
        })
    }

    setProperty(){
        game.dialog.property.open(()=>{
            const {price, rent, upgrade,type} = game.propertyInfo.value;

            if (price % 10 !== 0) {
                alert('price is not Illegal');
                return false;
            }

            let PrevRent = 0;
            for (let item of rent) {
                if (item % 10 !== 0 || item < 10 || item <= PrevRent) {
                    alert(`Rent is not Illegal`);
                    return false;
                }
                PrevRent = item;
            }

            let PrevUpgrade = 0;
            for (let item of upgrade) {
                if (item % 10 !== 0 || item < 10 || item <= PrevUpgrade) {
                    alert(`Upgrade is not Illegal`);
                    return false;
                }
                PrevUpgrade = item;
            }

            tools.type.value = type
            this.types[type].isSet = true
            this.types[type].price = price;
            this.types[type].rent = rent;
            this.types[type].upgrade = upgrade;

            return true;
        })
    }
}

export default new properties();