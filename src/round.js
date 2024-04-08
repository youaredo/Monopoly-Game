import Player from './Player.js';
import message from './message.js'
import game from "./game.js";
import {timer} from "./conf.js";

export default class round{
    constructor(num) {
        this.players = new Array(Number(num)).fill(null);
        this.index = 0;
        this.vacationFund = 0;
        this.steps = 1;
        this.rounds = ref(1);
        this.dice = 0;
        this.btnCan = ref({
            rollShow:true,
            upgrade:false,
            buy:false,
            free:false,
            endTurn:false,
        })
        this.winner = null;
        this.init();
    }

    init(){
        this.createPlayer();
    }

    createPlayer(){
        this.players = this.players.map((item,key)=>{
            const player = new Player(key + 1)
            return player
        })
    }

    endTurn(bool = false){
        let player = this.players[this.index];

        if(!bool){
            if(player.money < 0 ){
                alert('You have not money');
                return this.btnCan.rollShow = false;
            }
        }

        for(let name in this.btnCan){
            this.btnCan[name] = false;
        }

        if(this.index < this.players.length-1){
            this.index++;
        }else{
            this.index = 0;
            this.rounds+=1;
        }

        this.isOver();

        player = this.players[this.index];

        if(player.freezeNum || player.state){
            this.btnCan.endTurn = true;
            if(player.money <= 50){
                this.btnCan.free = true;
            }
            this.players[this.index].freeze();
            this.btnCan.rollShow = false;
        }else{
            this.btnCan.rollShow = true;
            this.btnCan.free = false;
        }
    }

    isOver(){
        if(this.players[this.index].over){
            if(this.index < this.players.length -1){
                this.index++;
            }else{
                this.index = 0;
            }
            return this.isOver();
        }
    }

    BankRupt(){
        this.players[this.index]?.buildings.map( item =>{
            item.player = null;
            item.die = true;
        })

        this.players[this.index].over = true;

        for(let name in this.btnCan){
            this.btnCan[name] = false;
        }

        this.endTurn(true);

        this.btnCan.rollShow = true;


        if(this.players.filter((item) => {return item.over === true}).length >= this.players.length-1) {
            this.winner = this.players.find((item) => {return item.over === false});
            return game.changePage('gameOver');
        }

        message.addMessage(`Player ${ this.index + 1} has gone  BankRupt !`);
    }

    async roll(){
        this.diceChange();

        this.btnCan.rollShow = false;
        await timer(1000)

        this.steps = ~~(Math.random() * (7 - 1) + 1);
        this.players[this.index].moveTo(this.steps);
    }

    getPlayerMoney(){
        let money = 0;
        this.players.forEach((item,index) =>{
            if(this.players[this.index].id !== item.id){
                money += 50;
                this.players[index].money -= 50;
            }
        })

        this.players[this.index].money += money
        message.addMessage(`Player ${this.players[this.index].id} earns $50 from each player $${money}`);
    }

    buy(){
        this.players[this.index].buy();
    }

    free(){
        let player = this.players[this.index];
        player.freezeNum = 0;
        player.money -= 50;
        this.btnCan.free = false;
        message.addMessage(`Player ${player.id} paid $50 for free`);
    }

    upgrade(){
       this.players[this.index].upgrade();
    }

    diceChange(){
        this.steps = undefined;
        this.dice = 0;
        let random = setInterval(()=>{
            this.dice += 10;
        },5)
        setTimeout(()=>{
            clearInterval(random)
        },1000)
    }

    get diceRoll(){
        return `transform:rotateX(${-this.dice}deg) rotateY(${this.dice}deg) rotateZ(${-this.dice}deg)`
    }
}