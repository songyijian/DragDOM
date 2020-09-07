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

//el=拖动原属，config={overflow:'限制在定位父级内'}
  new DragDOM(el,{config}) 



// 点赞拖拽
  new DragDOM(dom.like)
    .start(function(ev){
      // 开始拖拽
    })
    .drag(function(ev){
      // 拖拽过程中
      // 拖动中返回false阻止dom这次跟随移动(可以利用这个特性定制移动范围)
      return this.moveData.elx < 1  // 小于1 拖拽元素不跟随移动
    })
    .end(function (ev){
      // 拖拽结束
      if(this.moveData){
        // 拖拽过
      }
    })

```


## API

function
```
// 方法：函数this指向实例（如果使用this请不要用箭头函数）

const m = new DragDOM(el,{config}) 

  m.start(function(){})

  m.drag(function(){}) // 拖动中返回false阻止dom这次跟随移动(可以利用这个特性定制移动范围)

  m.end(function(){})

```

attr
```
// 属性
  this.el = el;
  
  this.config = {
    overflow: data.overflow || false
  }

  this.parentData = { // 父级信息（start阶段才会被准确拿到）
    parent:null,
    parentWidth:0,
    parentHeight:0,
    parentTop:0,
    parentLeft:0
  }

  this.elData = { // dom信息（start阶段才会被准确拿到）
    el:el,
    elWidth:0,
    elHeight:0,
    elTop:0,
    elLeft:0
  }

  this.moveData = { // 被拖动的具体数据（drag阶段才能准确拿到）
    mx,my,    // mx,my 移动距离
    ely,elx   // ely,elx 元素当前的位置
  }
```
