var Map = function() {
  this.idToIdx = {};
  this.idxToId = {};
};
Map.prototype.add = function(idx, id) {
  this.idToIdx[id] = idx;
  this.idxToId[idx] = id;
};
Map.prototype.toId = function(idx) {
  return this.idxToId[idx] !== undefined ? this.idxToId[idx] : idx;
};
Map.prototype.toIdx = function(id) {
  return this.idToIdx[id] !== undefined ? this.idToIdx[id] : id;
};

FView.ready(function() {
  FView.registerView('TabBar', Flex.TabBar, {

    create: function(options) {
      var fview = this;

      fview.properties = new ReactiveDict();
      fview.selectedTab = function(value) {
        if (value)
          return this.properties.set('selectedTab', value);
        else
          return this.properties.get('selectedTab');
      };

      fview.items = [];
      fview.itemMap = new Map();

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
        fview.properties.set('selectedTab', fview.itemMap.toId(event.index));
      });

      return tabBar;
    },

    add: function(child_fview, child_options) {
      var fview = this;

      if (child_options.tabId)
        fview.itemMap.add(fview.items.length, child_options.tabId);
      else if (child_options.id)
        fview.ItemMap.add(fview.items.length, child_options.id);

      var selectedTab = fview.selectedTab();

      // This won't be undefined if the app code initted it already, e.g. from router
      if (fview.items.length === 0 && selectedTab === undefined)
        fview.properties.set('selectedTab', child_options.tabId || child_options.id || 0);

      fview.items.push(child_fview);
      fview.view.setItems(fview.items);

      if (selectedTab === (child_options.tabId || fview.selectedTab || fview.items.length-1))
        fview.view.setSelectedItemIndex(fview.items.length-1);
    },

    attrUpdate: function(key, value, oldValue, data, firstTime) {
      var fview = this;

      if (key === 'selectedTab') {
        // On init, just the reactive var, setSelectedItemIndex called in add()
        if (firstTime)
          fview.properties.set('selectedTab', value);
        else
          fview.view.setSelectedItemIndex(fview.itemMap.toIdx(value));
      }
    }

  });
});