FView.registerView('FlexLayoutController', Flex.LayoutController, {

  create: function(options) {
    options = _.extend({
      layoutOptions: {
          itemSize: [100, 100],
          margins: [20, 20],
          spacing: [20, 20],
          justify: true,
          cells: [3,3],
          ratios: [0.2, 0.5, 0.3]
      },
      flow: true,    // smoothly animates renderables when changing the layout
      direction: undefined,   // 0 = X, 1 = Y, undefined = use default from selected layout-function
      autoPipeEvents: true,
      alignment: 1
    }, options);

    if (typeof options.layout === 'string') {
      if (Flex[options.layout])
        options.layout = Flex[options.layout];
      else
        throw new Error("[FlexLayoutController] No such Layout " + options.layout);
    }

    var node = new this._view.constructor(options);

    /*
     * If no dataSource is specified, expect a typical famousEach setup
     */
    if (!options.dataSource) {
      // Quick hack for init order
      node.sequenceFrom = function(source) {
        node.setDataSource(source);
      };

      this.reflow = _.debounce(function() {
        famous.core.Engine.defer(function() {
          node.reflowLayout();
        });
      }, 10);
    }

    return node;
  },

  famousCreatedPost: function() {
    this.pipeChildrenTo = this.parent.pipeChildrenTo ?
      [ this.view, this.parent.pipeChildrenTo[0] ] :
      [ this.view ];
  },

  attrUpdate: function(key, value, oldValue, data, firstTime) {

    if (key === 'layout') {
      if (typeof value === 'string') {
        if (Flex[value])
          return this.view.setLayout(Flex[value]);
        else
          throw new Error("[FlexLayoutController] No such Layout " + value);
      } else
        return this.setLayout(value);
    }

    if (key === 'direction')
      return this.view.setDirection(value);

    if (key === 'layoutOptions')
      return this.view.setLayoutOptions(value);

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