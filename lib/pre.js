Flex = window.Flex = {};

var modules = [
  'LayoutUtility',
  'LayoutContext',
  'LayoutNode',
  'FlowLayoutNode',
  'helpers/LayoutDockHelper',

  'LayoutNodeManager',
  'LayoutController', 
  'ScrollController',

  'layouts/CollectionLayout',
  'layouts/GridLayout',
  'layouts/ListLayout',
  'layouts/ProportionalLayout',
  'layouts/WheelLayout',

  'views/RefreshLoader',

  'FlexScrollView'
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
      console.log('r', moduleName, ret?'':'(not found)');
    return ret;
  }
}

var moduleCount = 0;
function functionName(fun) {
  var moduleName = modules[moduleCount++];
  return moduleName.split('/').pop();
}

define = function(func) {
  FView.ready(function() {
    //console.log('d', func);
    var exports = {}, module = {};
    func(require, exports, module);

    if (typeof module.exports === 'function') {
      var moduleName = functionName(module.exports);
      Flex[moduleName] = module.exports;
      // console.log('d', moduleName);
    } else {
      console.log('doh', typeof module.exports, module.exports);
    }
  });
};
