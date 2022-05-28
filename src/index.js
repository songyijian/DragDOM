"use strict";

function getStyle(obj, attr) {
  return obj.currentStyle
    ? obj.currentStyle[attr]
    : window.getComputedStyle(obj, false)[attr];
}

function getPage(element) {
  // 获取元素在页面上的绝对位置
  var actualLeft = element.offsetLeft;
  var actualTop = element.offsetTop;
  var parent = element.offsetParent;
  while (parent != null) {
    actualLeft += parent.offsetLeft + parent.clientLeft;
    actualTop += parent.offsetTop + parent.clientTop;
    parent = parent.offsetParent;
  }
  return {
    x: actualLeft,
    y: actualTop,
  };
}

class DragDOM {
  constructor(el, data = {}) {
    if (el.nodeType !== 1) {
      console.warn("[DragDOM el] Is not a valid node ！");
      return;
    }
    this.elPosition = getStyle(el, "position");
    if (!(this.elPosition === "absolute" || this.elPosition === "fixed")) {
      // static | fixed | absolute
      console.warn("[DragDOM el] position on  absolute | fixed！");
      return;
    }

    this.el = el;
    this.parentData = null;
    this.elData = null;
    this.moveData = null;

    this.config = {
      overflow: data.overflow || false,
      pUnit: data.pUnit || "px",
      start: data.start || function () {},
      drag: data.drag || function () {},
      end: data.end || function () {},
    };

    this.init(this.el);
  }

  init(el) {
    const that = this;
    let lack = false;
    let ontype = el.ontouchstart !== undefined ? "touch" : "mouse";

    let evStart, evMove, evEnd;
    if (ontype === "touch") {
      evStart = "touchstart";
      evMove = "touchmove";
      evEnd = "touchend";
    } else {
      evStart = "mousedown";
      evMove = "mousemove";
      evEnd = "mouseup";
    }

    function resetEv(iev) {
      let ev = iev || window.event;
      return ontype === "touch" ? ev.touches[0] : ev;
    }

    let parent = null;
    let elTop,
      elLeft,
      elWidth,
      elHeight,
      parentWidth,
      parentHeight,
      parentTop,
      parentLeft;
    let startx, starty;
    let clientWidth, clientHeight;

    el.addEventListener(
      evStart,
      function (ev) {
        ev.preventDefault();
        this.elPosition = getStyle(el, "position");
        if (!(this.elPosition === "absolute" || this.elPosition === "fixed")) {
          return console.error("[Drag el] position on  absolute | fixed！");
        }
        let _ev = resetEv(ev);
        startx = _ev.pageX;
        starty = _ev.pageY;

        if (that.elPosition === "absolute") {
          parent = el.offsetParent;
          const fa = getPage(parent);
          const { height, width } = parent.getBoundingClientRect();
          parentTop = fa.y;
          parentLeft = fa.x;
          parentWidth = width;
          parentHeight = height;
        } else {
          clientWidth = document.documentElement.clientWidth;
          clientHeight = document.documentElement.clientHeight;
          parent = document.documentElement;
          parentTop = 0;
          parentLeft = 0;
          parentWidth = clientWidth;
          parentHeight = clientHeight;
        }

        that.parentData = {
          parent,
          parentWidth,
          parentHeight,
          parentTop,
          parentLeft,
        };

        let { height, width } = el.getBoundingClientRect();
        elWidth = width;
        elHeight = height;
        elTop = el.offsetTop;
        elLeft = el.offsetLeft;
        that.elData = {
          elWidth,
          elHeight,
          elTop,
          elLeft,
        };

        that.moveData = null;
        lack = true;
        that.config.start.call(that, ev);
      },
      false
    );

    document.addEventListener(
      evMove,
      function move(ev) {
        if (!lack) return;
        ev.preventDefault();

        let _ev = resetEv(ev);
        let mx = _ev.pageX - startx;
        let my = _ev.pageY - starty;
        let ely = elTop + my;
        let elx = elLeft + mx;

        if (
          // (that.elPosition === "absolute" || that.elPosition === "fixed") &&
          !that.config.overflow
        ) {
          if (ely > parentHeight - elHeight) ely = parentHeight - elHeight;
          if (elx > parentWidth - elWidth) elx = parentWidth - elWidth;
          if (ely < 0) ely = 0;
          if (elx < 0) elx = 0;
        }

        that.moveData = { mx, my, ely, elx };

        if (that.config.drag.call(that, ev, that.moveData) !== false) {
          el.style.bottom = "auto";
          el.style.right = "auto";
          switch (that.config.pUnit) {
            case "%":
              el.style.top = (ely / parentHeight) * 100 + "%";
              el.style.left = (elx / parentWidth) * 100 + "%";
              break;
            default:
              el.style.top = ely + "px";
              el.style.left = elx + "px";
          }
        }
      },
      { passive: false }
    );

    document.addEventListener(
      evEnd,
      function end(ev) {
        if (lack) {
          lack = false;
          that.config.end.call(that, ev);
        }
      },
      false
    );
  }

  start(fn) {
    this.config.start = fn;
    return this;
  }

  drag(fn) {
    this.config.drag = fn;
    return this;
  }

  end(fn) {
    this.config.end = fn;
    return this;
  }
}

export default DragDOM;
