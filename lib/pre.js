Flex = window.Flex = {};

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

/*
 * this was a nice quick start.  need to check browser support.  consider
 * some namespacing.  it's nice because we don't need to touch the original
 * package, however, a build script might be better.  in the very long
 * term, of course we need a good way to only include what the user needs
 */

// http://stackoverflow.com/a/15714445/1839099
function functionName(fun) {
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

define = function(func) {
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
}