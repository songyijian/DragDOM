# dragdomjs

兼容手机触控屏的 DOM 元素拖拽插件;
被拖拽 dom 必须有 position 属性。 类型支持 fixed ｜ absolute

## install

```shell
npm install dragdomjs

yarn add dragdomjs

# Browserify
<script src="../dist/dragdomjs.iife.js"></script>
```

## 快速上手

Browserify add `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">`

```js
import DragDOM from 'dragdomjs'

new DragDOM(el)

// or
new DragDOM(el,config={
    overflow : false,  // 是否允许拖出父级 false
    pUnit : 'px',      // 拖动重新设置单位 px | %
    start ($event){} ,
    drag ($event){    // 返回false,阻止dom这次跟随移动(可以利用这个特性定制移动范围)
      return this.moveData.elx < 1
    } ,
    end ($event){}
  }
})

// or
new DragDOM(el,{
  overflow : false,
  pUnit : 'px'
})
.start(function($event){})
.drag(function($event){})
.end(function ($event){})

```
