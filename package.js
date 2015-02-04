Package.describe({
  name: 'gadicohen:fview-flex',
  version: '0.0.1',
  summary: 'IjzerenHein\'s famous-flex for famous-views',
  git: 'https://github.com/gadicc/fview-flex.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
  api.use('gadicohen:famous-views@0.1.32', 'client');

  api.addFiles('lib/pre.js', 'client');

  var modules = [
    'LayoutContext',
    'LayoutUtility',
    'LayoutNode',
    'FlowLayoutNode',
    'helpers/LayoutDockHelper',

    'LayoutNodeManager',
    'LayoutController', 
    'ScrollController',

    'layouts/ListLayout',
    'layouts/CollectionLayout',
    'layouts/GridLayout'
  ];

  for (var i=0; i < modules.length; i++)
    api.addFiles('lib/famous-flex/src/' + modules[i] + '.js', 'client');

  // famous-views wrappers for famous-flex
  api.addFiles([
    'lib/LayoutController.js'
  ], 'client');

  api.export('Flex', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('gadicohen:fview-flex');
});
