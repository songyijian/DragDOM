# dragdomjs
兼容手机触控屏的DOM元素拖拽插件;  
被拖拽的dom必须有position属性。 类型支持fixed｜absolute 



## 安装
```
// npm 
npm install dragdomjs

// yarn
yarn add dragdomjs

// Browserify https://github.com/songyijian/DragDOM
<script src="../dist/dragdomjs.iife.js"></script> 
```


## 快速上手 



```
// Browserify
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

// es2015+
import DragDOM from 'dragdomjs'

new DragDOM(el,{config}) 


// 写法: 1 === 2

// 1
  new DragDOM(dom,{
    {
      overflow : false,     // 运行拖出
      pUnit : 'px'          // px | % 
      start : function(){} , // 开始拖拽
      drag :function(){       // 拖拽过程中
        // 返回false阻止dom这次跟随移动(可以利用这个特性定制移动范围)
        return this.moveData.elx < 1
      } ,
      end : function(){} // 拖拽结束 this.moveData && 拖拽过
    }
  })

// 2
  new DragDOM(dom,{
    overflow : false,
    pUnit : 'px'
  })
  .start(function(ev){})
  .drag(function(ev){})
  .end(function (ev){})

```


## API

function 链式回调会覆盖config回调
```
// 方法：函数this指向实例（不要用箭头函数）

const m = new DragDOM(el,{config}) 
  m.start(function(){}) 
  m.drag(function(){})
  m.end(function(){})
  

// 其实是一样的，后者覆盖前者
config:{start,drag,end} ===  m.start / m.drag / m.end 
```

attr
```
// 属性
  this.el = el;
  
  this.config = {
    overflow : false,     // 运行拖出
    pUnit : 'px'          // px| %
    start : function(){} ,
    drag :function(){} ,
    end : function(){}
  };

  this.parentData = { // 父级信息（start|drag｜end阶段能拿到）
    parent:null,
    parentWidth:0,
    parentHeight:0,
    parentTop:0,
    parentLeft:0
  }

  this.elData = { // dom信息（start|drag｜end 阶段能拿到）
    el:el,
    elWidth:0,
    elHeight:0,
    elTop:0,
    elLeft:0
  }

  this.moveData = { // 被拖动的数据（drag｜end 阶段能准确拿到）
    mx,my,    // mx,my 移动距离 px
    ely,elx   // ely,elx 元素当前的位置 px
  }
```
