import * as conf from './conf.js'
import tool from "./tool.js";
import scene from "./scene.js";
import Space from "./buildings/Space.js";

class Game{
    constructor() {
        this.scene = ref(null);
        this.level = 'normal';
        this.mapList = ref([])
        this.saveData = [{"properties":{"villa":{"price":140,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"condo":{"price":140,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"cottage":{"price":140,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"factory":{"price":240,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"townhome":{"price":120,"rent":[0,0,0],"upgrade":[0,0],"isSet":false}},"initialMoney":0,"salary":0,"level":"easy","road":[{"i":0,"j":0,"level":"easy","key":0,"type":"START","isProperty":false,"next":null},{"i":1,"j":0,"level":"easy","key":1,"type":"surprise","isProperty":false,"next":null},{"i":2,"j":0,"level":"easy","key":2,"type":"factory","isProperty":true,"up":0,"conf":{"price":240,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Philadelphia","next":null},{"i":3,"j":0,"level":"easy","key":3,"type":"villa","isProperty":true,"up":0,"conf":{"price":140,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Canberra","next":null},{"i":4,"j":0,"level":"easy","key":4,"type":"JAIL","isProperty":false,"next":null},{"i":4,"j":1,"level":"easy","key":5,"type":"incometax","isProperty":false,"next":null},{"i":4,"j":2,"level":"easy","key":6,"type":"villa","isProperty":true,"up":0,"conf":{"price":140,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Paris","next":null},{"i":4,"j":3,"level":"easy","key":7,"type":"treasure","isProperty":false,"next":null},{"i":4,"j":4,"level":"easy","key":8,"type":"VACATION","isProperty":false,"next":null},{"i":3,"j":4,"level":"easy","key":9,"type":"surprise","isProperty":false,"next":null},{"i":2,"j":4,"level":"easy","key":10,"type":"factory","isProperty":true,"up":0,"conf":{"price":240,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Sydney","next":null},{"i":1,"j":4,"level":"easy","key":11,"type":"townhome","isProperty":true,"up":0,"conf":{"price":120,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Oslo","next":null},{"i":0,"j":4,"level":"easy","key":12,"type":"AIRPORT","isProperty":false,"next":null},{"i":0,"j":3,"level":"easy","key":13,"type":"factory","isProperty":true,"up":0,"conf":{"price":240,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Guangzhou","next":null},{"i":0,"j":2,"level":"easy","key":14,"type":"treasure","isProperty":false,"next":null},{"i":0,"j":1,"level":"easy","key":15,"type":"townhome","isProperty":true,"up":0,"conf":{"price":120,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Copenhagen","next":null}]},{"properties":{"villa":{"price":240,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"condo":{"price":160,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"cottage":{"price":160,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"factory":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"townhome":{"price":100,"rent":[0,0,0],"upgrade":[0,0],"isSet":false}},"initialMoney":0,"salary":0,"level":"normal","road":[{"i":0,"j":0,"level":"normal","key":0,"type":"START","isProperty":false,"next":null},{"i":1,"j":0,"level":"normal","key":1,"type":"treasure","isProperty":false,"next":null},{"i":2,"j":0,"level":"normal","key":2,"type":"incometax","isProperty":false,"next":null},{"i":3,"j":0,"level":"normal","key":3,"type":"condo","isProperty":true,"up":0,"conf":{"price":160,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Madrid","next":null},{"i":4,"j":0,"level":"normal","key":4,"type":"villa","isProperty":true,"up":0,"conf":{"price":240,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Melbourne","next":null},{"i":5,"j":0,"level":"normal","key":5,"type":"JAIL","isProperty":false,"next":null},{"i":5,"j":1,"level":"normal","key":6,"type":"factory","isProperty":true,"up":0,"conf":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Guangzhou","next":null},{"i":5,"j":2,"level":"normal","key":7,"type":"villa","isProperty":true,"up":0,"conf":{"price":240,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Singapore","next":null},{"i":5,"j":3,"level":"normal","key":8,"type":"condo","isProperty":true,"up":0,"conf":{"price":160,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Athens","next":null},{"i":5,"j":4,"level":"normal","key":9,"type":"VACATION","isProperty":false,"next":null},{"i":4,"j":4,"level":"normal","key":10,"type":"surprise","isProperty":false,"next":null},{"i":3,"j":4,"level":"normal","key":11,"type":"factory","isProperty":true,"up":0,"conf":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Johannesburg","next":null},{"i":2,"j":4,"level":"normal","key":12,"type":"villa","isProperty":true,"up":0,"conf":{"price":240,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Toronto","next":null},{"i":1,"j":4,"level":"normal","key":13,"type":"townhome","isProperty":true,"up":0,"conf":{"price":100,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Pyongyang","next":null},{"i":0,"j":4,"level":"normal","key":14,"type":"AIRPORT","isProperty":false,"next":null},{"i":0,"j":3,"level":"normal","key":15,"type":"treasure","isProperty":false,"next":null},{"i":0,"j":2,"level":"normal","key":16,"type":"townhome","isProperty":true,"up":0,"conf":{"price":100,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Manila","next":null},{"i":0,"j":1,"level":"normal","key":17,"type":"surprise","isProperty":false,"next":null}]},{"properties":{"villa":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"condo":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"cottage":{"price":140,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"factory":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"townhome":{"price":180,"rent":[0,0,0],"upgrade":[0,0],"isSet":false}},"initialMoney":0,"salary":0,"level":"hard","road":[{"i":0,"j":0,"level":"hard","key":0,"type":"START","isProperty":false,"next":null},{"i":1,"j":0,"level":"hard","key":1,"type":"condo","isProperty":true,"up":0,"conf":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Adelaide","next":null},{"i":2,"j":0,"level":"hard","key":2,"type":"condo","isProperty":true,"up":0,"conf":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Shenzhen","next":null},{"i":3,"j":0,"level":"hard","key":3,"type":"villa","isProperty":true,"up":0,"conf":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Cape Town","next":null},{"i":4,"j":0,"level":"hard","key":4,"type":"treasure","isProperty":false,"next":null},{"i":5,"j":0,"level":"hard","key":5,"type":"cottage","isProperty":true,"up":0,"conf":{"price":140,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Shanghai","next":null},{"i":6,"j":0,"level":"hard","key":6,"type":"JAIL","isProperty":false,"next":null},{"i":6,"j":1,"level":"hard","key":7,"type":"villa","isProperty":true,"up":0,"conf":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"New York","next":null},{"i":6,"j":2,"level":"hard","key":8,"type":"treasure","isProperty":false,"next":null},{"i":6,"j":3,"level":"hard","key":9,"type":"cottage","isProperty":true,"up":0,"conf":{"price":140,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Sydney","next":null},{"i":6,"j":4,"level":"hard","key":10,"type":"VACATION","isProperty":false,"next":null},{"i":5,"j":4,"level":"hard","key":11,"type":"villa","isProperty":true,"up":0,"conf":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Warsaw","next":null},{"i":4,"j":4,"level":"hard","key":12,"type":"surprise","isProperty":false,"next":null},{"i":3,"j":4,"level":"hard","key":13,"type":"condo","isProperty":true,"up":0,"conf":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Taipei","next":null},{"i":2,"j":4,"level":"hard","key":14,"type":"incometax","isProperty":false,"next":null},{"i":1,"j":4,"level":"hard","key":15,"type":"condo","isProperty":true,"up":0,"conf":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Johannesburg","next":null},{"i":0,"j":4,"level":"hard","key":16,"type":"AIRPORT","isProperty":false,"next":null},{"i":0,"j":3,"level":"hard","key":17,"type":"villa","isProperty":true,"up":0,"conf":{"price":220,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Beijing","next":null},{"i":0,"j":2,"level":"hard","key":18,"type":"surprise","isProperty":false,"next":null},{"i":0,"j":1,"level":"hard","key":19,"type":"cottage","isProperty":true,"up":0,"conf":{"price":140,"rent":[0,0,0],"upgrade":[0,0],"isSet":false},"name":"Mumbai","next":null}]}];
        this.toGame();
        this.toMapList();
        this.GameMapData = reactive({
            initialMoney: 0,
            salary: 0,
        })
    }

    toEdit(){
        this.scene.value = new scene('normal');
    }

    toGame(){
        this.scene.value = new scene(this.saveData[2]);
    }

    toMapList(){

        this.mapList.value = this.saveData.map((map)=>{
            return new scene(map);
        })
    }

    backHome(){
        location.reload();
    }

    async randomPlace() {
        // await this.scene.value.randomMap()
    }

    exportScene() {
        this.scene.value.exportScene()
    }

    get data(){
        return {
            scene:this.scene,
            backHome:this.backHome,
            mapList:this.mapList,
            randomPlace:this.randomPlace.bind(this),
            exportScene:this.exportScene.bind(this)
        }
    }
}
const game = new Game();

createApp({
    setup(){
        return{
            ...game.data,
            ...tool.data,
            conf,
        }
    }
}).mount('#app');


export default game;
