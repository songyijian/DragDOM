!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self).DragDOM=e()}(this,function(){"use strict";function E(t,e){return t.currentStyle?t.currentStyle[e]:window.getComputedStyle(t,!1)[e]}return function(){function t(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};1===t.nodeType?(this.elPosition=E(t,"position"),"absolute"===this.elPosition||"fixed"===this.elPosition?(this.el=t,this._dragStart=function(){},this._drag=function(){},this._dragEnd=function(){},this.parentData=null,this.elData=null,this.moveData=null,this.config={overflow:e.overflow||!1},this.init(this.el)):console.warn("[DragDOM el] position on  absolute | fixed！")):console.warn("[DragDOM el] Is not a valid node ！")}var e=t.prototype;return e.init=function(l){var t,e,n,f=this,d=!1,o=void 0!==l.ontouchstart?"touch":"mouse";function c(t){var e=t||window.event;return"touch"===o?e.touches[0]:e}n="touch"===o?(t="touchstart",e="touchmove","touchend"):(t="mousedown",e="mousemove","mouseup");var h,p,g,m,v,D,y,x,w,P,b=null;l.addEventListener(t,function(t){var e,n,o,i,s,r,a,u;this.elPosition=E(l,"position"),"absolute"===this.elPosition||"fixed"===this.elPosition?(e=c(t),D="absolute"===f.elPosition?(n=function(t){for(var e=t.offsetLeft,n=t.offsetTop,o=t.offsetParent;null!=o;)e+=o.offsetLeft+o.clientLeft,n+=o.offsetTop+o.clientTop,o=o.offsetParent;return{x:e,y:n}}(b=l.offsetParent),i=(o=b.getBoundingClientRect()).height,s=o.width,y=n.y,x=n.x,v=s,i):(b=document.documentElement,x=y=0,v=document.documentElement.clientWidth,document.documentElement.clientHeight),a=(r=l.getBoundingClientRect()).height,u=r.width,g=u,m=a,h=l.offsetTop,p=l.offsetLeft,w=e.pageX,P=e.pageY,f.parentData={parent:b,parentWidth:v,parentHeight:D,parentTop:y,parentLeft:x},f.elData={elWidth:g,elHeight:m,elTop:h,elLeft:p},f.moveData=null,d=!0,f._dragStart(t)):console.error("[Drag el] position on  absolute | fixed！")},!1),document.addEventListener(e,function(t){var e,n,o,i,s;d&&(t.preventDefault(),n=(e=c(t)).pageX-w,o=e.pageY-P,i=h+o,s=p+n,"absolute"!==f.elPosition&&"fixed"!==f.elPosition||f.config.overflow||(i<0&&(i=0),s<0&&(s=0),D-m<i&&(i=D-m),v-g<s&&(s=v-g)),!(f.moveData={mx:n,my:o,ely:i,elx:s})!==f._drag(t,f.moveData)&&(l.style.top=i+"px",l.style.left=s+"px"))},{passive:!1}),document.addEventListener(n,function(t){d&&(d=!1,f._dragEnd(t))},!1)},e.start=function(t){return this._dragStart=t.bind(this),this},e.drag=function(t){return this._drag=t.bind(this),this},e.end=function(t){return this._dragEnd=t.bind(this),this},t}()});