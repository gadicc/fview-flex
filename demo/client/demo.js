FView.ready(function() {
  // Famono: load famo.us shims and CSS
  famous.polyfills;
  famous.core.famous; // CSS
});

FlowRouter.route('/', {
  action: function() {
    FlowRouter.go('/FlexScrollView');
  }
})

//var getSession = function(sessionVar) { return Session.get('direction') }

Template.registerHelper('dstache', function() {
  return '{{';
});

Template.body.helpers({
  showId: function() {
    return FlowRouter.getRouteName();
  },
  layoutController: {
    flowOptions: {
      spring: {
        dampingRatio: 0.2,
        period: 500
      }
    }
  },
  createRenderables: {
    background: true,
    selectedItemOverlay: true
  }
});

Template.TabBarInitHack.onRendered(function() {
  // Since we're a non-fview template, the fview we get here is our parent's
  var fview = FView.from(this);

  this.autorun(function() {
    var tabId = fview.index(); // only reactive dep
    if (tabId && tabId !== FlowRouter.current().route.name /* non-reactive */)
      FlowRouter.go(tabId);
  });
});