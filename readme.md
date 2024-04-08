# 从这个项目学到的知识
## vue 的 ref
    可以绑成 :ref="item.setEvent" 这个样子
    在js中el就可以取到他的dom 
    setEvent(el) {

    }

## conf.js的 timer 函数
    利用 async 和 await 来进行一个延迟的方法
    这个方法好就好在可以延迟 async 和 await 用来在只有执行完当前函数才会继续执行下面的代码 
    同理 timer 函数 只有在执行完计时器之后才会运行下面代码 也就实现了动画一步一步的效果 

## 对于 export 的理解
    这个 export 是导出的意思 
    假设在一个文件里面有很多个 export 在应用文件的时候可以 import * as conf from './conf.js'
    在使用的时候就可以 conf.属性名 可以直接用了

    对于有些返回 export default new Game() 或者是 export default Game 这两种定义是不一样的
    第一个是返回出了一个已经new 了的 Game 在应用这个文件的时候就可以直接使用 import 对应的名字获取到里面的属性
    (例子可以看 message.js)
    第二个是返回出了这个类的代码，对此而言我引用 import 的名字 使用 需要 new import 的名字去 new 他
    (例子可以看 dialog.js)

## 数组填充遍历
    new Array(2).fill(null).map(item => 要干的事)

## 对于 Vue 渲染上的了解
    这是一个例子，为什么要使用 get 这个好处就在于会直接返回 left 和 top 的值 他就不会是一个方法了不需要 () 调用 直接 this.style 就可以取出来
    get style(){
        return {
            left:this.i * width + 'px',
            top:this.j * height + 'px',
        }
    }

    get 可以运用在多个场景下是一个很好用的东西

    像 game 里面有个 get data 他就是将自身的一些属性方法传入 setup 的 return 里面 就可以很好区分每个文件代码然后都将返回给 setup 里里面 记得 ...data 写进去

## JSON 的一些基础写法
    JSON.parse(localStorage.getItem('monopoly')) || '[]';

## js bind 方法的使用
    bind 方法 用来改变 this 指向
    举个例子 this.toGame.bind(this) 我有一个this.toGame()方法我使用.bind(this) 这里的this指的是class gmae 自身
    那为什么要这么做呢因为他是 get 形式 会返回给 setup 的 return 假设不给.bind()那他就是在将this指向指为 undefind

## 一个新的使用方法
    这是一段Player.js 的代码
    ({
        treasure(){

        },
        surprise(){

        },
        villa: this.onProperties.bind(this),
    })[对应的属性名]?.bind(this)?.();

    这种写法一开始不明白 首先是 ({})[] 取出来那个方法然后.bind(this) 将他的指向改为 Player 这个类然后再调用方法
    为什么不在.bind之前使用() 因为在之前使用他的this指向依旧是({}) 而不是 Player 类

    这是一段scene.js的代码
    ({
        treasure:() => {},
        surprise:() => {},
    })[tools.type.value]?.bind()();

    为什么这里.bind()没有this呢 因为他是箭头函数

## 整个游戏的重要内容
    这是Player 的移动方法
    Player.js的 moveTo()

    这是一个随机被10整除的数 
    let price = ~~(Math.random() * diff / 20) * 20 + min;

    这是一个弹出框的类
    dialog.js

    这是scene.js 的添加建筑方法
    addBuilding()

    这是scene.js 的初始地图方法
    createMap()

    这是一段tool.js的是否可以放置代码
    toCanPlace();