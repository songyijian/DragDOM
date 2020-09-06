(function () {
  'use strict';

  function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj, false)[attr];
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
      y: actualTop
    };
  }

  var DragDOM = /*#__PURE__*/function () {
    function DragDOM(el) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (el.nodeType !== 1) {
        console.warn('[DragDOM el] Is not a valid node ！');
        return;
      }

      this.elPosition = getStyle(el, 'position');

      if (!(this.elPosition === 'absolute' || this.elPosition === 'fixed')) {
        // static | fixed | absolute
        console.warn('[DragDOM el] position on  absolute | fixed！');
        return;
      }

      this.el = el;

      this._dragStart = function () {};

      this._drag = function () {};

      this._dragEnd = function () {};

      this.parentData = null;
      this.elData = null;
      this.moveData = null;
      this.config = {
        overflow: data.overflow || false
      };
      this.init(this.el);
    }

    var _proto = DragDOM.prototype;

    _proto.init = function init(el) {
      var _this = this;

      var lack = false;
      var ontype = el.ontouchstart !== undefined ? 'touch' : 'mouse';
      var evStart, evMove, evEnd;

      if (ontype === 'touch') {
        evStart = 'touchstart';
        evMove = 'touchmove';
        evEnd = 'touchend';
      } else {
        evStart = 'mousedown';
        evMove = 'mousemove';
        evEnd = 'mouseup';
      }

      function resetEv(iev) {
        var ev = iev || window.event;
        return ontype === 'touch' ? ev.touches[0] : ev;
      }

      var parent = null;
      var elTop, elLeft, elWidth, elHeight, parentWidth, parentHeight, parentTop, parentLeft;
      var startx, starty;
      el.addEventListener(evStart, function (ev) {
        // ev.preventDefault();
        this.elPosition = getStyle(el, 'position');

        if (!(this.elPosition === 'absolute' || this.elPosition === 'fixed')) {
          console.error('[Drag el] position on  absolute | fixed！');
          return;
        }

        var _ev = resetEv(ev);

        if (_this.elPosition === 'absolute') {
          parent = el.offsetParent;
          var fa = getPage(parent);

          var _parent$getBoundingCl = parent.getBoundingClientRect(),
              _height = _parent$getBoundingCl.height,
              _width = _parent$getBoundingCl.width;

          parentTop = fa.y;
          parentLeft = fa.x;
          parentWidth = _width;
          parentHeight = _height;
        } else {
          parent = document.documentElement;
          parentTop = 0;
          parentLeft = 0;
          parentWidth = document.documentElement.clientWidth;
          parentHeight = document.documentElement.clientHeight;
        }

        {
          var _el$getBoundingClient = el.getBoundingClientRect(),
              height = _el$getBoundingClient.height,
              width = _el$getBoundingClient.width;

          elWidth = width;
          elHeight = height;
          elTop = el.offsetTop;
          elLeft = el.offsetLeft;
        }
        startx = _ev.pageX;
        starty = _ev.pageY;
        _this.parentData = {
          parent: parent,
          parentWidth: parentWidth,
          parentHeight: parentHeight,
          parentTop: parentTop,
          parentLeft: parentLeft
        };
        _this.elData = {
          elWidth: elWidth,
          elHeight: elHeight,
          elTop: elTop,
          elLeft: elLeft
        };
        _this.moveData = null;
        lack = true;

        _this._dragStart(ev);
      }, false);
      document.addEventListener(evMove, function move(ev) {
        if (!lack) {
          return;
        }

        ev.preventDefault();

        var _ev = resetEv(ev);

        var mx = _ev.pageX - startx;
        var my = _ev.pageY - starty;
        var ely = elTop + my;
        var elx = elLeft + mx;

        if (_this.elPosition === 'absolute' || _this.elPosition === 'fixed') {
          if (!_this.config.overflow) {
            if (ely < 0) {
              ely = 0;
            }

            if (elx < 0) {
              elx = 0;
            }

            if (ely > parentHeight - elHeight) {
              ely = parentHeight - elHeight;
            }

            if (elx > parentWidth - elWidth) {
              elx = parentWidth - elWidth;
            }
          }
        }

        _this.moveData = {
          mx: mx,
          my: my,
          ely: ely,
          elx: elx
        };

        var a = _this._drag(ev, _this.moveData);

        if (a !== false) {
          el.style.top = ely + 'px';
          el.style.left = elx + 'px';
        }
      }, {
        passive: false
      });
      document.addEventListener(evEnd, function end(ev) {
        if (lack) {
          lack = false;

          _this._dragEnd(ev);
        }
      }, false);
    };

    _proto.start = function start(fn) {
      this._dragStart = fn.bind(this);
      return this;
    };

    _proto.drag = function drag(fn) {
      this._drag = fn.bind(this);
      return this;
    };

    _proto.end = function end(fn) {
      this._dragEnd = fn.bind(this);
      return this;
    };

    return DragDOM;
  }();

  return DragDOM;

}());
