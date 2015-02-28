Package.describe({
  name: 'gadicohen:fview-flex',
  version: '0.0.4',
  summary: 'IjzerenHein\'s famous-flex for famous-views',
  git: 'https://github.com/gadicc/fview-flex.git'
});

Package.onUse(function(api) {
  // api.versionsFrom('1.0.3.1');
  api.use('gadicohen:famous-views@0.1.32', 'client');

  // custom require/define funcs
  api.addFiles('lib/pre.js', 'client');

  // ALWAYS copy this exactly into pre.js on update.  for now.
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

  for (var i=0; i < modules.length; i++)
    api.addFiles('lib/famous-flex/src/' + modules[i] + '.js', 'client');

  // famous-views wrappers for famous-flex
  api.addFiles([
    'lib/FlexScrollView.js'
  ], 'client');

  api.export('Flex', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('gadicohen:fview-flex');
});
