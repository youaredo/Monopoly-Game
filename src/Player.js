import {width, height, levelConf, building, timer} from './conf.js';
import game from './game.js';
import message from "./message.js";
import properties from "./properties.js";

export default class Player {
    constructor(id) {
        this.id = id;
        this.key = 0;
        this.dir = 0;
        this.lastKey = 0
        this.air = false;
        this.over = false;
        this.money = 500;
        this.state = ref(0);
        this.freezeNum = 0;
        this.buildings = [];
    }

    get style() {
        const {i, j} = game.scene.value.road[this.key]

        return {
            left: i * width + (50 / 2) + 'px',
            top: j * height + (50 / 2) + 'px',
        }

    }

    get className() {
        return `bg-${this.id}`
    }

    async moveTo(steps) {
        let btn = game.round.value.btnCan;
        const scene = game.scene.value;

        this.key += steps;
        if (this.key >= scene.road.length) {

            this.key -= scene.road.length
            this.money += scene.salary

            message.addMessage(`Player${this.id} receives a salary of ${scene.salary}`);
        }

        const backup = this.key;

        while (this.lastKey !== backup) {
            if (++this.lastKey >= scene.road.length) {
                this.lastKey = 0
            }
            if (steps === 0) this.lastKey = backup

            this.key = this.lastKey

            await timer(300);
        }

        steps && this.onSpace()

        btn.endTurn = true;
    }

    freeze() {
        if (this.freezeNum) {
            this.freezeNum--;

            message.addMessage(`Player${this.id} is frozen ${this.freezeNum} round remaining`);
            return true;
        }

        if (this.state) {
            this.state--;
            return true;
        }

        return false;
    }

    onSpace() {
        const space = game.scene.value.road[this.key];

        message.addMessage(`Player${this.id} go to the ${space.type}`)

        ;({
            treasure() {
                let money = ~~(Math.random() * 200 / 20) * 20 + 100;

                this.money += money;
                message.addMessage(`Player${this.id} received ${money} from treasure`)
            },
            surprise() {
                let eventList = [
                    {
                        msg: `Player ${this.id} go the Jail`,
                        event: () => this.goJail(),
                    },

                    {
                        msg: 'Deduct $50 as Tax',
                        event: () => this.payTax(50),
                    },

                    {
                        msg: 'Collect $50 from each player',
                        event: () => game.round.value.getPlayerMoney(this),
                    },
                ]

                let random = ~~(Math.random() * 3);
                message.addMessage(`Player ${this.id} is ${eventList[random].msg}`);
                eventList[random].event();
            },
            incometax() {
                this.money -= 100;
                this.payTax(100)
            },
            jail() {
                this.goJail()
            },
            vacation() {
                let money = game.round.value.vacationFund;
                if (!money) return

                this.money += money;
                this.state = 1;

                message.addMessage(`Player ${this.id} received ${money}`);
                game.round.value.vacationFund = 0;
            },
            airport(){
                this.airport();
            },
            villa: this.onProperties.bind(this),
            condo: this.onProperties.bind(this),
            townhome: this.onProperties.bind(this),
            cottage: this.onProperties.bind(this),
            factory: this.onProperties.bind(this),
        })[space.type.toLocaleLowerCase()].bind(this)?.();
    }

    goJail() {
        game.round.value.btnCan.free = true;
        this.freezeNum = 2;
        this.key = levelConf[game.scene.value.level].row - 1;
        this.moveTo(0)
    }

    airport(){
        this.air = true;
        alert('Please Enter any block !');
    }

    payTax(num) {
        game.round.value.vacationFund += num;
        this.money -= num;
        message.addMessage(`Player ${this.id} paid ${num} in taxes.`);
    }

    onProperties() {
        let road = game.scene.value.road[this.key];
        let can = game.round.value.btnCan

        if (road?.player) {
            if (road?.player.id === this.id) {
                can.upgrade = true;
            } else {
                let len = road.player.buildings.filter(item=>{
                    return item.type === road.type;
                });
                let money = 0;

                if(len.length === game.scene.value.buildings.get(road.type).length){
                    len.map(item =>{
                        money += item.rent;
                    })
                }else{
                    money = road.rent;
                }

                this.money -= money;
                road.player.money += money;

                message.addMessage(`Player ${this.id} paid ${money} rent to Player ${road.player.id}`);
            }
        } else {

            can.buy = true;

        }
    }

    startAnimation(){
        game.scene.value.road[this.key].circleList.map(item =>{
            item.animationStart();
        })
    }

    buy() {
        let road = game.scene.value.road[this.key];

        this.startAnimation();

        if (this.money - road.conf.price < 0) return alert(`You not Enough money`);

        message.addMessage(`Player ${this.id} paid ${road.conf.price} to buy ${road.name}`);

        this.money -= road.conf.price;
        road.player = this;
        game.round.value.btnCan.buy = false;
        this.buildings.push(road);
    }

    async sell(index) {
        let item = this.buildings[index];
        this.startAnimation();
        this.buildings.splice(index, 1);
        await timer(900);
        item.player = null;
        this.money += item.conf.price;
        message.addMessage(`Player ${this.id} sold ${item.name} for ${item.conf.price}`);
    }

    upgrade(){
        let road = game.scene.value.road[this.key];
        let has = this.buildings.find(item =>{
            return item.key === road.key
        })

        if(has.up >= 2)  game.round.value.btnCan.upgrade = false;

        if(has.up < 3){
            has.up += 1;
            message.addMessage(`Player ${this.id} has spent ${has.upgrade} to upgrade ${has.name} to ${has.up}`);
        }

        this.money -= has.upgrade;
    }

}
