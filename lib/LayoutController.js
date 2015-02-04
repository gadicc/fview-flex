FView.registerView('FlexLayoutController', Flex.LayoutController, {

  create: function(options) {
    options = _.extend({
      layoutOptions: {
          itemSize: [100, 100],
          margins: [20, 20],
          justify: true
      },
      flow: true,    // smoothly animates renderables when changing the layout
      direction: 1   // 0 = X, 1 = Y, undefined = use default from selected layout-function
    }, options);

    if (typeof options.layout === 'string') {
      if (Flex[options.layout])
        options.layout = Flex[options.layout];
      else
        throw new Error("[FlexLayoutController] No such Layout " + options.layout);
    }

    var node = new this._view.constructor(options);

    node.sequenceFrom = function(source) {
      node.setDataSource(source);
    };

    this.reflow = _.debounce(function() {
      famous.core.Engine.defer(function() {
        node.reflowLayout(); console.log('r');
      });
    }, 10);

    return node;
  },

  attrUpdate: function(key, value, oldValue, data, firstTime) {

    if (key === 'layout') {
      if (typeof value === 'string') {
        if (Flex[value])
          this.view.setLayout(Flex[value]);
        else
          throw new Error("[FlexLayoutController] No such Layout " + value);
      } else
        this.setLayout(value);
    }

  },

  addedAt: function(id, item, index, _super, eachView) {
    _super(); this.reflow();
  },
  movedTo: function(id, doc, fromIndex, toIndex, _super, eachView) {
    _super(); this.reflow();
  },
  removedAt: function(doc, index, _super, eachView) {
    _super(); this.reflow();
  }
  
});