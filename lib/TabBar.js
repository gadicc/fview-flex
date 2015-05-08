FView.ready(function() {
  FView.registerView('TabBar', Flex.TabBar, {

    create: function(options) {
      var fview = this;

      fview.properties = new ReactiveDict();
      fview.index = function() { return this.properties.get('index'); };

      fview.items = [];
      fview.itemIds = {};

      if (options.class) {
        options.classes = options.class.split(' ');
        delete options.class;
      }

      if (!options.createRenderables)
        options.createRenderables = {};

      if (!options.createRenderables.item) {
        options.createRenderables.item = function(id, data) {
          // TODO https://github.com/IjzerenHein/famous-flex/blob/master/src/widgets/TabBar.js#L183

          // by default we'll accept full Surfaces / whatever
          return data.surface || data.view || data.node;
        }
      }

      var tabBar = new fview._view.constructor(options);

      tabBar.on('tabchange', function(event) {
        fview.properties.set('index', fview.itemIds[event.index] || event.index);
      });

      return tabBar;
    },

    add: function(child_fview, child_options) {
      var fview = this;

      if (child_options.tabId)
        fview.itemIds[fview.items.length] = child_options.tabId;

      // This won't be undefined if the app code initted it already, e.g. from router
      if (fview.items.length === 0 && fview.index() === undefined)
        fview.properties.set('index', child_options.tabId || 0);

      fview.items.push(child_fview);
      fview.view.setItems(fview.items);
    }

  });
});