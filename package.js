Package.describe({
  name: 'gadicohen:fview-flex',
  version: '0.0.7',
  summary: 'IjzerenHein\'s famous-flex for famous-views',
  git: 'https://github.com/gadicc/fview-flex.git'
});

Package.onUse(function(api) {
  // api.versionsFrom('1.0.3.1');
  api.use('reactive-dict@1.0.4', 'client');

  api.use('mjn:famous@0.3.5', 'client', { weak: true });
  api.use('raix:famono@0.9.27', 'client', { weak: true });

  api.use('gadicohen:famous-views@0.1.32', 'client');

  // custom require/define funcs
  api.addFiles('lib/pre.js', 'client');

  // ALWAYS copy this exactly into pre.js on update.  for now.
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

  for (var i=0; i < modules.length; i++)
    api.addFiles('lib/' + modules[i] + '.js', 'client');

  // add the css files
  api.addFiles('lib/famous-flex/src/widgets/styles.css', 'client');

  // famous-views wrappers for famous-flex
  api.addFiles([
    'lib/FlexScrollView.js',
    'lib/TabBar.js'
  ], 'client');

  api.export('Flex', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('gadicohen:fview-flex');
});
