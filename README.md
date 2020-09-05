# DragDOM
兼容手机触控屏的DOM元素拖拽插件  


## 快速上手

被拖拽的dom必须有position属性。 类型支持fixed｜absolute 

```
const m = new Drag(el,{config}) //el=拖动原属，config={overflow:'限制在定位父级内'}




// 方法：函数this指向实例（如果使用this请不要用箭头函数）
  m.start(function(){})

  m.drag(function(){}) // 拖动中返回false阻止dom这次跟随移动(可以利用这个特性定制移动范围)

  m.end(function(){})




// 属性
  this.el = el;

  this._dragStart = function(){};
  this._drag = function(){};
  this._dragEnd = function(){};

  this.parentData = { // start阶段才会被准确拿到
    parent:null,
    parentWidth:0,
    parentHeight:0,
    parentTop:0,
    parentLeft:0
  }

  this.elData = { // start阶段才会被准确拿到
    el:el,
    elWidth:0,
    elHeight:0,
    elTop:0,
    elLeft:0
  }

  
  this.moveData = { // drag 阶段才会被准确拿到，之前都为null，在end是可以根据它来判断是否有移动
    mx,my,    // mx,my 移动距离
    ely,elx   // ely,elx 元素当前的位置
  }

  this.config = {
    overflow: data.overflow || false
  };

```
