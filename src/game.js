import * as conf from './conf.js'
import tool from "./tool.js";
import scene from "./scene.js";
import Dialog from "./dialog.js";
import properties from "./properties.js";
import round from "./round.js";
import message from "./message.js";

class Game {
    constructor() {
        this.page = ref('home');
        this.round = ref(null);
        this.scene = ref(null);
        this.level = 'normal';
        this.mapList = ref([]);
        this.StartGame = ref(false);


        this.GameMapData = reactive({
            initialMoney: 0,
            salary: 0,
            choose:0,
            playerNum:2,
        })


        this.propertyInfo = ref({
            type: null,
            price: 0,
            rent: [0, 0, 0],
            upgrade: [0, 0],
            name: '',
        })

        this.dialog = reactive({
            name: new Dialog(),
            property: new Dialog(),
            num: new Dialog(),
            editMapData: new Dialog(),
        })
    }

    toEdit(diff) {
        this.level = diff;
        this.changePage('edit');
        this.scene.value = new scene(this.level);
    }

    async randomName() {
        game.propertyInfo.value.name = await tool.randomName();
    }

    changePage(item) {
        this.page.value = item;
    }

    toGame(index) {
        this.GameMapData.choose = index;

        //重置消息
        message.messageList = reactive([]);

        game.dialog.num.open(() => {
            let num = Number(this.GameMapData.playerNum);

            if (num <= 4 && num >= 2) {

                this.changePage('game');
                this.StartGame.value = true;
                this.scene.value = this.mapList.value[index]
                this.round.value = new round(num);

                return true;
            } else {
                alert('Player num is not enought')
            }
        })
    }


    toMapList() {
        this.changePage('mapList');

        let data = JSON.parse(localStorage.getItem('monopoly')) || '[]';
        this.mapList.value = data.map((map) => {
            return new scene(map);
        })
    }

    backHome() {
        location.reload();
    }

    async randomPlace() {
        await this.scene.value.randomMap()
    }

    async randomPrice(){
        await properties.randomPrice()
    }

    exportScene() {
        this.scene.value.exportScene()
    }

    isSetAll(){
        for (let item in properties.types) {
            if (properties.types[item].price <= 0) {
                return false;
            }
        }
        return true;
    }

    roll() {
        this.round.roll();
    }

    endTurn() {
        this.round.endTurn();
    }

    BankRupt() {
        this.round.BankRupt();
    }

    get data() {
        return {
            scene: this.scene,
            backHome: this.backHome,
            mapList: this.mapList,
            page: this.page,
            round: this.round,
            GameMapData: this.GameMapData,
            modals: this.dialog,
            randomName: this.randomName,
            propertyInfo: this.propertyInfo,
            StartGame: this.StartGame,
            roll: this.roll,
            endTurn: this.endTurn,
            BankRupt: this.BankRupt,
            randomPrice:this.randomPrice,

            toGame: this.toGame.bind(this),
            toEdit: this.toEdit.bind(this),
            toMapList: this.toMapList.bind(this),
            randomPlace: this.randomPlace.bind(this),
            exportScene: this.exportScene.bind(this),
            changePage: this.changePage.bind(this),
            isSetAll:this.isSetAll.bind(this),
        }
    }
}

const game = new Game();

createApp({
    setup() {
        console.log(this);
        return {
            ...game.data,
            ...tool.data,
            conf,
            message,
        }
    }
}).mount('#app');


export default game;
