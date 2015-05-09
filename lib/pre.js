Flex = window.Flex = {};

var modules = [
  'famous-flex/src/LayoutUtility',
  'famous-flex/src/LayoutContext',
  'famous-flex/src/LayoutNode',
  'famous-flex/src/LayoutNodeManager',
  'famous-flex/src/FlowLayoutNode',
  'famous-flex/src/helpers/LayoutDockHelper',
  'famous-flex/src/LayoutController',
  'famous-flex/src/AnimationController',

  'famous-flex/src/LayoutNodeManager',
  'famous-flex/src/LayoutController', 
  'famous-flex/src/ScrollController',
  'famous-flex/src/VirtualViewSequence',

  'famous-flex/src/layouts/CollectionLayout',
  'famous-flex/src/layouts/GridLayout',
  'famous-flex/src/layouts/ListLayout',
  'famous-flex/src/layouts/ProportionalLayout',
  'famous-flex/src/layouts/WheelLayout',
  'famous-flex/src/layouts/HeaderFooterLayout',
  'famous-flex/src/layouts/TabBarLayout',

  'famous-flex/src/widgets/DatePickerComponents',
  'famous-flex/src/widgets/DatePicker',
  'famous-flex/src/widgets/TabBar',
  'famous-flex/src/widgets/TabBarController',

  'famous-refresh-loader/RefreshLoader',
  'famous-autosizetextarea/AutosizeTextareaSurface',

  'famous-flex/src/FlexScrollView'
];

require = function(obj) {
  //console.log('r', obj);
  obj = obj.split('/');
  if (obj[0] === 'famous') {
    var s, ret = window;
    while (s=obj.shift())
      ret = ret[s];
    return ret;
  } else if (obj[obj.length-1].split('.')[0] === 'polyfill') {
  } else {
    var moduleName = obj[obj.length-1];
    var ret = Flex[moduleName];
    if (!ret)
      console.warn('require ' + moduleName + ' (not found) - needed by (probably) ' + currentDefine);
    return ret;
  }
}

var moduleCount = 0;
function functionName(fun) {
  var moduleName = modules[moduleCount++];
  return moduleName.split('/').pop();
}

var currentDefine = null;
define = function(func) {
  FView.ready(function() {
    //console.log('d', func);
    var exports = {}, module = {};
    currentDefine = func.toString().match(/module.exports = (\w+);/);
    if (currentDefine) currentDefine = currentDefine[1];
    func(require, exports, module);

    //if (typeof module.exports === 'function') {
      var moduleName = functionName(module.exports);
      Flex[moduleName] = module.exports;
      // console.log('d', moduleName);
    //} else {
    //  console.log('doh', typeof module.exports, module.exports);
    //}
  });
};

// imports
if (Package['raix:famono']) {
  FView.ready(function() {
    famous.surfaces.TextareaSurface;    // views/AutosizeTextareaSurface
    famous.transitions.Easing;          // widgets/TabBarController
  });
}