"use strict";function getStyle(t,e){return t.currentStyle?t.currentStyle[e]:window.getComputedStyle(t,!1)[e]}function getPage(t){for(var e=t.offsetLeft,o=t.offsetTop,n=t.offsetParent;null!=n;)e+=n.offsetLeft+n.clientLeft,o+=n.offsetTop+n.clientTop,n=n.offsetParent;return{x:e,y:o}}Object.defineProperty(exports,"__esModule",{value:!0});var Drag=function(){function t(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};1===t.nodeType?(this.elPosition=getStyle(t,"position"),"absolute"===this.elPosition||"fixed"===this.elPosition?(this.el=t,this._dragStart=function(){},this._drag=function(){},this._dragEnd=function(){},this.parentData=null,this.elData=null,this.moveData=null,this.config={overflow:e.overflow||!1},this.init(this.el)):console.warn("[Drag el] position on  absolute | fixed！")):console.warn("[Drag el] Is not a valid node ！")}var e=t.prototype;return e.init=function(u){var t,e,o,d=this,f=!1,n=void 0!==u.ontouchstart?"touch":"mouse";function c(t){var e=t||window.event;return"touch"===n?e.touches[0]:e}o="touch"===n?(t="touchstart",e="touchmove","touchend"):(t="mousedown",e="mousemove","mouseup");var h,g,p,v,m,D,y,P,x,w,_=null;u.addEventListener(t,function(t){var e,o,n,i,r,a,s,l;this.elPosition=getStyle(u,"position"),"absolute"===this.elPosition||"fixed"===this.elPosition?(e=c(t),D="absolute"===d.elPosition?(o=getPage(_=u.offsetParent),i=(n=_.getBoundingClientRect()).height,r=n.width,y=o.y,P=o.x,m=r,i):(_=document.documentElement,P=y=0,m=document.documentElement.clientWidth,document.documentElement.clientHeight),s=(a=u.getBoundingClientRect()).height,l=a.width,p=l,v=s,h=u.offsetTop,g=u.offsetLeft,x=e.pageX,w=e.pageY,d.parentData={parent:_,parentWidth:m,parentHeight:D,parentTop:y,parentLeft:P},d.elData={elWidth:p,elHeight:v,elTop:h,elLeft:g},d.moveData=null,f=!0,d._dragStart(t)):console.error("[Drag el] position on  absolute | fixed！")},!1),document.addEventListener(e,function(t){var e,o,n,i,r;f&&(t.preventDefault(),o=(e=c(t)).pageX-x,n=e.pageY-w,i=h+n,r=g+o,"absolute"!==d.elPosition&&"fixed"!==d.elPosition||d.config.overflow||(i<0&&(i=0),r<0&&(r=0),D-v<i&&(i=D-v),m-p<r&&(r=m-p)),!(d.moveData={mx:o,my:n,ely:i,elx:r})!==d._drag(t,d.moveData)&&(u.style.top=i+"px",u.style.left=r+"px"))},{passive:!1}),document.addEventListener(o,function(t){f&&(f=!1,d._dragEnd(t))},!1)},e.start=function(t){return this._dragStart=t.bind(this),this},e.drag=function(t){return this._drag=t.bind(this),this},e.end=function(t){return this._dragEnd=t.bind(this),this},t}(),DragDOM=Drag,src={DragDOM:Drag};exports.DragDOM=Drag,exports.default=src;