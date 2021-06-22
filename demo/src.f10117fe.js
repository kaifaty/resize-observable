// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resizeObservers = void 0;
var resizeObservers = [];
exports.resizeObservers = resizeObservers;
},{}],"node_modules/@juggle/resize-observer/lib/algorithms/hasActiveObservations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasActiveObservations = void 0;

var _resizeObservers = require("../utils/resizeObservers");

var hasActiveObservations = function () {
  return _resizeObservers.resizeObservers.some(function (ro) {
    return ro.activeTargets.length > 0;
  });
};

exports.hasActiveObservations = hasActiveObservations;
},{"../utils/resizeObservers":"node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js"}],"node_modules/@juggle/resize-observer/lib/algorithms/hasSkippedObservations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasSkippedObservations = void 0;

var _resizeObservers = require("../utils/resizeObservers");

var hasSkippedObservations = function () {
  return _resizeObservers.resizeObservers.some(function (ro) {
    return ro.skippedTargets.length > 0;
  });
};

exports.hasSkippedObservations = hasSkippedObservations;
},{"../utils/resizeObservers":"node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js"}],"node_modules/@juggle/resize-observer/lib/algorithms/deliverResizeLoopError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deliverResizeLoopError = void 0;
var msg = 'ResizeObserver loop completed with undelivered notifications.';

var deliverResizeLoopError = function () {
  var event;

  if (typeof ErrorEvent === 'function') {
    event = new ErrorEvent('error', {
      message: msg
    });
  } else {
    event = document.createEvent('Event');
    event.initEvent('error', false, false);
    event.message = msg;
  }

  window.dispatchEvent(event);
};

exports.deliverResizeLoopError = deliverResizeLoopError;
},{}],"node_modules/@juggle/resize-observer/lib/ResizeObserverBoxOptions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeObserverBoxOptions = void 0;
var ResizeObserverBoxOptions;
exports.ResizeObserverBoxOptions = ResizeObserverBoxOptions;

(function (ResizeObserverBoxOptions) {
  ResizeObserverBoxOptions["BORDER_BOX"] = "border-box";
  ResizeObserverBoxOptions["CONTENT_BOX"] = "content-box";
  ResizeObserverBoxOptions["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
})(ResizeObserverBoxOptions || (exports.ResizeObserverBoxOptions = ResizeObserverBoxOptions = {}));
},{}],"node_modules/@juggle/resize-observer/lib/utils/freeze.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.freeze = void 0;

var freeze = function (obj) {
  return Object.freeze(obj);
};

exports.freeze = freeze;
},{}],"node_modules/@juggle/resize-observer/lib/ResizeObserverSize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeObserverSize = void 0;

var _freeze = require("./utils/freeze");

var ResizeObserverSize = function () {
  function ResizeObserverSize(inlineSize, blockSize) {
    this.inlineSize = inlineSize;
    this.blockSize = blockSize;
    (0, _freeze.freeze)(this);
  }

  return ResizeObserverSize;
}();

exports.ResizeObserverSize = ResizeObserverSize;
},{"./utils/freeze":"node_modules/@juggle/resize-observer/lib/utils/freeze.js"}],"node_modules/@juggle/resize-observer/lib/DOMRectReadOnly.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DOMRectReadOnly = void 0;

var _freeze = require("./utils/freeze");

var DOMRectReadOnly = function () {
  function DOMRectReadOnly(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = this.y;
    this.left = this.x;
    this.bottom = this.top + this.height;
    this.right = this.left + this.width;
    return (0, _freeze.freeze)(this);
  }

  DOMRectReadOnly.prototype.toJSON = function () {
    var _a = this,
        x = _a.x,
        y = _a.y,
        top = _a.top,
        right = _a.right,
        bottom = _a.bottom,
        left = _a.left,
        width = _a.width,
        height = _a.height;

    return {
      x: x,
      y: y,
      top: top,
      right: right,
      bottom: bottom,
      left: left,
      width: width,
      height: height
    };
  };

  DOMRectReadOnly.fromRect = function (rectangle) {
    return new DOMRectReadOnly(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  };

  return DOMRectReadOnly;
}();

exports.DOMRectReadOnly = DOMRectReadOnly;
},{"./utils/freeze":"node_modules/@juggle/resize-observer/lib/utils/freeze.js"}],"node_modules/@juggle/resize-observer/lib/utils/element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isReplacedElement = exports.isElement = exports.isHidden = exports.isSVG = void 0;

var isSVG = function (target) {
  return target instanceof SVGElement && 'getBBox' in target;
};

exports.isSVG = isSVG;

var isHidden = function (target) {
  if (isSVG(target)) {
    var _a = target.getBBox(),
        width = _a.width,
        height = _a.height;

    return !width && !height;
  }

  var _b = target,
      offsetWidth = _b.offsetWidth,
      offsetHeight = _b.offsetHeight;
  return !(offsetWidth || offsetHeight || target.getClientRects().length);
};

exports.isHidden = isHidden;

var isElement = function (obj) {
  var _a, _b;

  if (obj instanceof Element) {
    return true;
  }

  var scope = (_b = (_a = obj) === null || _a === void 0 ? void 0 : _a.ownerDocument) === null || _b === void 0 ? void 0 : _b.defaultView;
  return !!(scope && obj instanceof scope.Element);
};

exports.isElement = isElement;

var isReplacedElement = function (target) {
  switch (target.tagName) {
    case 'INPUT':
      if (target.type !== 'image') {
        break;
      }

    case 'VIDEO':
    case 'AUDIO':
    case 'EMBED':
    case 'OBJECT':
    case 'CANVAS':
    case 'IFRAME':
    case 'IMG':
      return true;
  }

  return false;
};

exports.isReplacedElement = isReplacedElement;
},{}],"node_modules/@juggle/resize-observer/lib/utils/global.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.global = void 0;
var global = typeof window !== 'undefined' ? window : {};
exports.global = global;
},{}],"node_modules/@juggle/resize-observer/lib/algorithms/calculateBoxSize.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateBoxSizes = exports.calculateBoxSize = void 0;

var _ResizeObserverBoxOptions = require("../ResizeObserverBoxOptions");

var _ResizeObserverSize = require("../ResizeObserverSize");

var _DOMRectReadOnly = require("../DOMRectReadOnly");

var _element = require("../utils/element");

var _freeze = require("../utils/freeze");

var _global = require("../utils/global");

var cache = new WeakMap();
var scrollRegexp = /auto|scroll/;
var verticalRegexp = /^tb|vertical/;
var IE = /msie|trident/i.test(_global.global.navigator && _global.global.navigator.userAgent);

var parseDimension = function (pixel) {
  return parseFloat(pixel || '0');
};

var size = function (inlineSize, blockSize, switchSizes) {
  if (inlineSize === void 0) {
    inlineSize = 0;
  }

  if (blockSize === void 0) {
    blockSize = 0;
  }

  if (switchSizes === void 0) {
    switchSizes = false;
  }

  return new _ResizeObserverSize.ResizeObserverSize((switchSizes ? blockSize : inlineSize) || 0, (switchSizes ? inlineSize : blockSize) || 0);
};

var zeroBoxes = (0, _freeze.freeze)({
  devicePixelContentBoxSize: size(),
  borderBoxSize: size(),
  contentBoxSize: size(),
  contentRect: new _DOMRectReadOnly.DOMRectReadOnly(0, 0, 0, 0)
});

var calculateBoxSizes = function (target, forceRecalculation) {
  if (forceRecalculation === void 0) {
    forceRecalculation = false;
  }

  if (cache.has(target) && !forceRecalculation) {
    return cache.get(target);
  }

  if ((0, _element.isHidden)(target)) {
    cache.set(target, zeroBoxes);
    return zeroBoxes;
  }

  var cs = getComputedStyle(target);
  var svg = (0, _element.isSVG)(target) && target.ownerSVGElement && target.getBBox();
  var removePadding = !IE && cs.boxSizing === 'border-box';
  var switchSizes = verticalRegexp.test(cs.writingMode || '');
  var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || '');
  var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || '');
  var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
  var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
  var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
  var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
  var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
  var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
  var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
  var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
  var horizontalPadding = paddingLeft + paddingRight;
  var verticalPadding = paddingTop + paddingBottom;
  var horizontalBorderArea = borderLeft + borderRight;
  var verticalBorderArea = borderTop + borderBottom;
  var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
  var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
  var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
  var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
  var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
  var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
  var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
  var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
  var boxes = (0, _freeze.freeze)({
    devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
    borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
    contentBoxSize: size(contentWidth, contentHeight, switchSizes),
    contentRect: new _DOMRectReadOnly.DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
  });
  cache.set(target, boxes);
  return boxes;
};

exports.calculateBoxSizes = calculateBoxSizes;

var calculateBoxSize = function (target, observedBox, forceRecalculation) {
  var _a = calculateBoxSizes(target, forceRecalculation),
      borderBoxSize = _a.borderBoxSize,
      contentBoxSize = _a.contentBoxSize,
      devicePixelContentBoxSize = _a.devicePixelContentBoxSize;

  switch (observedBox) {
    case _ResizeObserverBoxOptions.ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX:
      return devicePixelContentBoxSize;

    case _ResizeObserverBoxOptions.ResizeObserverBoxOptions.BORDER_BOX:
      return borderBoxSize;

    default:
      return contentBoxSize;
  }
};

exports.calculateBoxSize = calculateBoxSize;
},{"../ResizeObserverBoxOptions":"node_modules/@juggle/resize-observer/lib/ResizeObserverBoxOptions.js","../ResizeObserverSize":"node_modules/@juggle/resize-observer/lib/ResizeObserverSize.js","../DOMRectReadOnly":"node_modules/@juggle/resize-observer/lib/DOMRectReadOnly.js","../utils/element":"node_modules/@juggle/resize-observer/lib/utils/element.js","../utils/freeze":"node_modules/@juggle/resize-observer/lib/utils/freeze.js","../utils/global":"node_modules/@juggle/resize-observer/lib/utils/global.js"}],"node_modules/@juggle/resize-observer/lib/ResizeObserverEntry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeObserverEntry = void 0;

var _calculateBoxSize = require("./algorithms/calculateBoxSize");

var _freeze = require("./utils/freeze");

var ResizeObserverEntry = function () {
  function ResizeObserverEntry(target) {
    var boxes = (0, _calculateBoxSize.calculateBoxSizes)(target);
    this.target = target;
    this.contentRect = boxes.contentRect;
    this.borderBoxSize = (0, _freeze.freeze)([boxes.borderBoxSize]);
    this.contentBoxSize = (0, _freeze.freeze)([boxes.contentBoxSize]);
    this.devicePixelContentBoxSize = (0, _freeze.freeze)([boxes.devicePixelContentBoxSize]);
  }

  return ResizeObserverEntry;
}();

exports.ResizeObserverEntry = ResizeObserverEntry;
},{"./algorithms/calculateBoxSize":"node_modules/@juggle/resize-observer/lib/algorithms/calculateBoxSize.js","./utils/freeze":"node_modules/@juggle/resize-observer/lib/utils/freeze.js"}],"node_modules/@juggle/resize-observer/lib/algorithms/calculateDepthForNode.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateDepthForNode = void 0;

var _element = require("../utils/element");

var calculateDepthForNode = function (node) {
  if ((0, _element.isHidden)(node)) {
    return Infinity;
  }

  var depth = 0;
  var parent = node.parentNode;

  while (parent) {
    depth += 1;
    parent = parent.parentNode;
  }

  return depth;
};

exports.calculateDepthForNode = calculateDepthForNode;
},{"../utils/element":"node_modules/@juggle/resize-observer/lib/utils/element.js"}],"node_modules/@juggle/resize-observer/lib/algorithms/broadcastActiveObservations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.broadcastActiveObservations = void 0;

var _resizeObservers = require("../utils/resizeObservers");

var _ResizeObserverEntry = require("../ResizeObserverEntry");

var _calculateDepthForNode = require("./calculateDepthForNode");

var _calculateBoxSize = require("./calculateBoxSize");

var broadcastActiveObservations = function () {
  var shallowestDepth = Infinity;
  var callbacks = [];

  _resizeObservers.resizeObservers.forEach(function processObserver(ro) {
    if (ro.activeTargets.length === 0) {
      return;
    }

    var entries = [];
    ro.activeTargets.forEach(function processTarget(ot) {
      var entry = new _ResizeObserverEntry.ResizeObserverEntry(ot.target);
      var targetDepth = (0, _calculateDepthForNode.calculateDepthForNode)(ot.target);
      entries.push(entry);
      ot.lastReportedSize = (0, _calculateBoxSize.calculateBoxSize)(ot.target, ot.observedBox);

      if (targetDepth < shallowestDepth) {
        shallowestDepth = targetDepth;
      }
    });
    callbacks.push(function resizeObserverCallback() {
      ro.callback.call(ro.observer, entries, ro.observer);
    });
    ro.activeTargets.splice(0, ro.activeTargets.length);
  });

  for (var _i = 0, callbacks_1 = callbacks; _i < callbacks_1.length; _i++) {
    var callback = callbacks_1[_i];
    callback();
  }

  return shallowestDepth;
};

exports.broadcastActiveObservations = broadcastActiveObservations;
},{"../utils/resizeObservers":"node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js","../ResizeObserverEntry":"node_modules/@juggle/resize-observer/lib/ResizeObserverEntry.js","./calculateDepthForNode":"node_modules/@juggle/resize-observer/lib/algorithms/calculateDepthForNode.js","./calculateBoxSize":"node_modules/@juggle/resize-observer/lib/algorithms/calculateBoxSize.js"}],"node_modules/@juggle/resize-observer/lib/algorithms/gatherActiveObservationsAtDepth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gatherActiveObservationsAtDepth = void 0;

var _resizeObservers = require("../utils/resizeObservers");

var _calculateDepthForNode = require("./calculateDepthForNode");

var gatherActiveObservationsAtDepth = function (depth) {
  _resizeObservers.resizeObservers.forEach(function processObserver(ro) {
    ro.activeTargets.splice(0, ro.activeTargets.length);
    ro.skippedTargets.splice(0, ro.skippedTargets.length);
    ro.observationTargets.forEach(function processTarget(ot) {
      if (ot.isActive()) {
        if ((0, _calculateDepthForNode.calculateDepthForNode)(ot.target) > depth) {
          ro.activeTargets.push(ot);
        } else {
          ro.skippedTargets.push(ot);
        }
      }
    });
  });
};

exports.gatherActiveObservationsAtDepth = gatherActiveObservationsAtDepth;
},{"../utils/resizeObservers":"node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js","./calculateDepthForNode":"node_modules/@juggle/resize-observer/lib/algorithms/calculateDepthForNode.js"}],"node_modules/@juggle/resize-observer/lib/utils/process.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.process = void 0;

var _hasActiveObservations = require("../algorithms/hasActiveObservations");

var _hasSkippedObservations = require("../algorithms/hasSkippedObservations");

var _deliverResizeLoopError = require("../algorithms/deliverResizeLoopError");

var _broadcastActiveObservations = require("../algorithms/broadcastActiveObservations");

var _gatherActiveObservationsAtDepth = require("../algorithms/gatherActiveObservationsAtDepth");

var process = function () {
  var depth = 0;
  (0, _gatherActiveObservationsAtDepth.gatherActiveObservationsAtDepth)(depth);

  while ((0, _hasActiveObservations.hasActiveObservations)()) {
    depth = (0, _broadcastActiveObservations.broadcastActiveObservations)();
    (0, _gatherActiveObservationsAtDepth.gatherActiveObservationsAtDepth)(depth);
  }

  if ((0, _hasSkippedObservations.hasSkippedObservations)()) {
    (0, _deliverResizeLoopError.deliverResizeLoopError)();
  }

  return depth > 0;
};

exports.process = process;
},{"../algorithms/hasActiveObservations":"node_modules/@juggle/resize-observer/lib/algorithms/hasActiveObservations.js","../algorithms/hasSkippedObservations":"node_modules/@juggle/resize-observer/lib/algorithms/hasSkippedObservations.js","../algorithms/deliverResizeLoopError":"node_modules/@juggle/resize-observer/lib/algorithms/deliverResizeLoopError.js","../algorithms/broadcastActiveObservations":"node_modules/@juggle/resize-observer/lib/algorithms/broadcastActiveObservations.js","../algorithms/gatherActiveObservationsAtDepth":"node_modules/@juggle/resize-observer/lib/algorithms/gatherActiveObservationsAtDepth.js"}],"node_modules/@juggle/resize-observer/lib/utils/queueMicroTask.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queueMicroTask = void 0;
var trigger;
var callbacks = [];

var notify = function () {
  return callbacks.splice(0).forEach(function (cb) {
    return cb();
  });
};

var queueMicroTask = function (callback) {
  if (!trigger) {
    var toggle_1 = 0;
    var el_1 = document.createTextNode('');
    var config = {
      characterData: true
    };
    new MutationObserver(function () {
      return notify();
    }).observe(el_1, config);

    trigger = function () {
      el_1.textContent = "" + (toggle_1 ? toggle_1-- : toggle_1++);
    };
  }

  callbacks.push(callback);
  trigger();
};

exports.queueMicroTask = queueMicroTask;
},{}],"node_modules/@juggle/resize-observer/lib/utils/queueResizeObserver.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queueResizeObserver = void 0;

var _queueMicroTask = require("./queueMicroTask");

var queueResizeObserver = function (cb) {
  (0, _queueMicroTask.queueMicroTask)(function ResizeObserver() {
    requestAnimationFrame(cb);
  });
};

exports.queueResizeObserver = queueResizeObserver;
},{"./queueMicroTask":"node_modules/@juggle/resize-observer/lib/utils/queueMicroTask.js"}],"node_modules/@juggle/resize-observer/lib/utils/scheduler.js":[function(require,module,exports) {


"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCount = exports.scheduler = void 0;

var _process = require("./process");

var _global = require("./global");

var _queueResizeObserver = require("./queueResizeObserver");

var watching = 0;

var isWatching = function () {
  return !!watching;
};

var CATCH_PERIOD = 250;
var observerConfig = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
};
var events = ['resize', 'load', 'transitionend', 'animationend', 'animationstart', 'animationiteration', 'keyup', 'keydown', 'mouseup', 'mousedown', 'mouseover', 'mouseout', 'blur', 'focus'];

var time = function (timeout) {
  if (timeout === void 0) {
    timeout = 0;
  }

  return Date.now() + timeout;
};

var scheduled = false;

var Scheduler = function () {
  function Scheduler() {
    var _this = this;

    this.stopped = true;

    this.listener = function () {
      return _this.schedule();
    };
  }

  Scheduler.prototype.run = function (timeout) {
    var _this = this;

    if (timeout === void 0) {
      timeout = CATCH_PERIOD;
    }

    if (scheduled) {
      return;
    }

    scheduled = true;
    var until = time(timeout);
    (0, _queueResizeObserver.queueResizeObserver)(function () {
      var elementsHaveResized = false;

      try {
        elementsHaveResized = (0, _process.process)();
      } finally {
        scheduled = false;
        timeout = until - time();

        if (!isWatching()) {
          return;
        }

        if (elementsHaveResized) {
          _this.run(1000);
        } else if (timeout > 0) {
          _this.run(timeout);
        } else {
          _this.start();
        }
      }
    });
  };

  Scheduler.prototype.schedule = function () {
    this.stop();
    this.run();
  };

  Scheduler.prototype.observe = function () {
    var _this = this;

    var cb = function () {
      return _this.observer && _this.observer.observe(document.body, observerConfig);
    };

    document.body ? cb() : _global.global.addEventListener('DOMContentLoaded', cb);
  };

  Scheduler.prototype.start = function () {
    var _this = this;

    if (this.stopped) {
      this.stopped = false;
      this.observer = new MutationObserver(this.listener);
      this.observe();
      events.forEach(function (name) {
        return _global.global.addEventListener(name, _this.listener, true);
      });
    }
  };

  Scheduler.prototype.stop = function () {
    var _this = this;

    if (!this.stopped) {
      this.observer && this.observer.disconnect();
      events.forEach(function (name) {
        return _global.global.removeEventListener(name, _this.listener, true);
      });
      this.stopped = true;
    }
  };

  return Scheduler;
}();

var scheduler = new Scheduler();
exports.scheduler = scheduler;

var updateCount = function (n) {
  !watching && n > 0 && scheduler.start();
  watching += n;
  !watching && scheduler.stop();
};

exports.updateCount = updateCount;
},{"./process":"node_modules/@juggle/resize-observer/lib/utils/process.js","./global":"node_modules/@juggle/resize-observer/lib/utils/global.js","./queueResizeObserver":"node_modules/@juggle/resize-observer/lib/utils/queueResizeObserver.js"}],"node_modules/@juggle/resize-observer/lib/ResizeObservation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeObservation = void 0;

var _ResizeObserverBoxOptions = require("./ResizeObserverBoxOptions");

var _calculateBoxSize = require("./algorithms/calculateBoxSize");

var _element = require("./utils/element");

var skipNotifyOnElement = function (target) {
  return !(0, _element.isSVG)(target) && !(0, _element.isReplacedElement)(target) && getComputedStyle(target).display === 'inline';
};

var ResizeObservation = function () {
  function ResizeObservation(target, observedBox) {
    this.target = target;
    this.observedBox = observedBox || _ResizeObserverBoxOptions.ResizeObserverBoxOptions.CONTENT_BOX;
    this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }

  ResizeObservation.prototype.isActive = function () {
    var size = (0, _calculateBoxSize.calculateBoxSize)(this.target, this.observedBox, true);

    if (skipNotifyOnElement(this.target)) {
      this.lastReportedSize = size;
    }

    if (this.lastReportedSize.inlineSize !== size.inlineSize || this.lastReportedSize.blockSize !== size.blockSize) {
      return true;
    }

    return false;
  };

  return ResizeObservation;
}();

exports.ResizeObservation = ResizeObservation;
},{"./ResizeObserverBoxOptions":"node_modules/@juggle/resize-observer/lib/ResizeObserverBoxOptions.js","./algorithms/calculateBoxSize":"node_modules/@juggle/resize-observer/lib/algorithms/calculateBoxSize.js","./utils/element":"node_modules/@juggle/resize-observer/lib/utils/element.js"}],"node_modules/@juggle/resize-observer/lib/ResizeObserverDetail.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeObserverDetail = void 0;

var ResizeObserverDetail = function () {
  function ResizeObserverDetail(resizeObserver, callback) {
    this.activeTargets = [];
    this.skippedTargets = [];
    this.observationTargets = [];
    this.observer = resizeObserver;
    this.callback = callback;
  }

  return ResizeObserverDetail;
}();

exports.ResizeObserverDetail = ResizeObserverDetail;
},{}],"node_modules/@juggle/resize-observer/lib/ResizeObserverController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeObserverController = void 0;

var _scheduler = require("./utils/scheduler");

var _ResizeObservation = require("./ResizeObservation");

var _ResizeObserverDetail = require("./ResizeObserverDetail");

var _resizeObservers = require("./utils/resizeObservers");

var observerMap = new WeakMap();

var getObservationIndex = function (observationTargets, target) {
  for (var i = 0; i < observationTargets.length; i += 1) {
    if (observationTargets[i].target === target) {
      return i;
    }
  }

  return -1;
};

var ResizeObserverController = function () {
  function ResizeObserverController() {}

  ResizeObserverController.connect = function (resizeObserver, callback) {
    var detail = new _ResizeObserverDetail.ResizeObserverDetail(resizeObserver, callback);
    observerMap.set(resizeObserver, detail);
  };

  ResizeObserverController.observe = function (resizeObserver, target, options) {
    var detail = observerMap.get(resizeObserver);
    var firstObservation = detail.observationTargets.length === 0;

    if (getObservationIndex(detail.observationTargets, target) < 0) {
      firstObservation && _resizeObservers.resizeObservers.push(detail);
      detail.observationTargets.push(new _ResizeObservation.ResizeObservation(target, options && options.box));
      (0, _scheduler.updateCount)(1);

      _scheduler.scheduler.schedule();
    }
  };

  ResizeObserverController.unobserve = function (resizeObserver, target) {
    var detail = observerMap.get(resizeObserver);
    var index = getObservationIndex(detail.observationTargets, target);
    var lastObservation = detail.observationTargets.length === 1;

    if (index >= 0) {
      lastObservation && _resizeObservers.resizeObservers.splice(_resizeObservers.resizeObservers.indexOf(detail), 1);
      detail.observationTargets.splice(index, 1);
      (0, _scheduler.updateCount)(-1);
    }
  };

  ResizeObserverController.disconnect = function (resizeObserver) {
    var _this = this;

    var detail = observerMap.get(resizeObserver);
    detail.observationTargets.slice().forEach(function (ot) {
      return _this.unobserve(resizeObserver, ot.target);
    });
    detail.activeTargets.splice(0, detail.activeTargets.length);
  };

  return ResizeObserverController;
}();

exports.ResizeObserverController = ResizeObserverController;
},{"./utils/scheduler":"node_modules/@juggle/resize-observer/lib/utils/scheduler.js","./ResizeObservation":"node_modules/@juggle/resize-observer/lib/ResizeObservation.js","./ResizeObserverDetail":"node_modules/@juggle/resize-observer/lib/ResizeObserverDetail.js","./utils/resizeObservers":"node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js"}],"node_modules/@juggle/resize-observer/lib/ResizeObserver.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeObserver = void 0;

var _ResizeObserverController = require("./ResizeObserverController");

var _element = require("./utils/element");

var ResizeObserver = function () {
  function ResizeObserver(callback) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    }

    if (typeof callback !== 'function') {
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    }

    _ResizeObserverController.ResizeObserverController.connect(this, callback);
  }

  ResizeObserver.prototype.observe = function (target, options) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    }

    if (!(0, _element.isElement)(target)) {
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    }

    _ResizeObserverController.ResizeObserverController.observe(this, target, options);
  };

  ResizeObserver.prototype.unobserve = function (target) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    }

    if (!(0, _element.isElement)(target)) {
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    }

    _ResizeObserverController.ResizeObserverController.unobserve(this, target);
  };

  ResizeObserver.prototype.disconnect = function () {
    _ResizeObserverController.ResizeObserverController.disconnect(this);
  };

  ResizeObserver.toString = function () {
    return 'function ResizeObserver () { [polyfill code] }';
  };

  return ResizeObserver;
}();

exports.ResizeObserver = ResizeObserver;
},{"./ResizeObserverController":"node_modules/@juggle/resize-observer/lib/ResizeObserverController.js","./utils/element":"node_modules/@juggle/resize-observer/lib/utils/element.js"}],"node_modules/@juggle/resize-observer/lib/exports/resize-observer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ResizeObserver", {
  enumerable: true,
  get: function () {
    return _ResizeObserver.ResizeObserver;
  }
});
Object.defineProperty(exports, "ResizeObserverEntry", {
  enumerable: true,
  get: function () {
    return _ResizeObserverEntry.ResizeObserverEntry;
  }
});
Object.defineProperty(exports, "ResizeObserverSize", {
  enumerable: true,
  get: function () {
    return _ResizeObserverSize.ResizeObserverSize;
  }
});

var _ResizeObserver = require("../ResizeObserver");

var _ResizeObserverEntry = require("../ResizeObserverEntry");

var _ResizeObserverSize = require("../ResizeObserverSize");
},{"../ResizeObserver":"node_modules/@juggle/resize-observer/lib/ResizeObserver.js","../ResizeObserverEntry":"node_modules/@juggle/resize-observer/lib/ResizeObserverEntry.js","../ResizeObserverSize":"node_modules/@juggle/resize-observer/lib/ResizeObserverSize.js"}],"src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizeObservable = void 0;

var _resizeObserver = require("@juggle/resize-observer");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ResizeObserver = window.ResizeObserver || _resizeObserver.ResizeObserver;

var ResizeObservable = /*#__PURE__*/function (_HTMLElement) {
  _inherits(ResizeObservable, _HTMLElement);

  var _super = _createSuper(ResizeObservable);

  function ResizeObservable() {
    var _this;

    _classCallCheck(this, ResizeObservable);

    _this = _super.call(this);
    _this._resizeObserver = null;
    _this._width = 0;
    _this._levels = [480, 600, 768, 1024, 1200, 1600, 1900];
    var template = document.createElement('template');
    template.innerHTML = "\n        <style>\n            :host{\n                display: flex;\n                flex-direction: column;\n                flex: 1 1 auto;\n            }\n        </style><slot></slot>";

    _this.attachShadow({
      mode: 'open'
    }).appendChild(template.content.cloneNode(true));

    return _this;
  }

  _createClass(ResizeObservable, [{
    key: "levels",
    get: function get() {
      return this._levels;
    },
    set: function set(value) {
      if (value.join('') === this._levels.join("")) return;

      this._removeOldSizes(this._levels);

      this._levels = value;

      this._updateGridSize();
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this._initResizeObserver();
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _a;

      (_a = this._resizeObserver) === null || _a === void 0 ? void 0 : _a.unobserve(this);
    }
  }, {
    key: "_onChangeSize",
    value: function _onChangeSize(entries) {
      var _iterator = _createForOfIteratorHelper(entries),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;

          if (entry.target === this) {
            this._setWidth(entry.contentRect.width);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "_initResizeObserver",
    value: function _initResizeObserver() {
      if (!this._resizeObserver) {
        this._resizeObserver = new ResizeObserver(this._onChangeSize.bind(this));
      }

      this._resizeObserver.observe(this);
    }
  }, {
    key: "_setWidth",
    value: function _setWidth(value) {
      var _this2 = this;

      if (value === this._width) return;
      requestAnimationFrame(function () {
        _this2._width = value;

        _this2._updateGridSize();

        _this2.dispatchEvent(new CustomEvent("resize", {
          detail: {
            width: value,
            sizes: _this2.className
          }
        }));
      });
    }
  }, {
    key: "_removeOldSizes",
    value: function _removeOldSizes(values) {
      var _iterator2 = _createForOfIteratorHelper(values),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var level = _step2.value;
          this.classList.remove('before-' + level);
          this.classList.remove('after-' + level);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "_updateGridSize",
    value: function _updateGridSize() {
      var _iterator3 = _createForOfIteratorHelper(this._levels),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var level = _step3.value;

          if (this._width <= level) {
            this.classList.add('before-' + level);
            this.classList.remove('after-' + level);
          } else {
            this.classList.remove('before-' + level);
            this.classList.add('after-' + level);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }]);

  return ResizeObservable;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

exports.ResizeObservable = ResizeObservable;
customElements.define('resize-observable', ResizeObservable);
},{"@juggle/resize-observer":"node_modules/@juggle/resize-observer/lib/exports/resize-observer.js"}],"C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51199" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map