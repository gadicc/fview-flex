FView.ready(function() {
  // Famono: load famo.us shims and CSS
  famous.polyfills;
  famous.core.famous; // CSS
});

FlowRouter.route('/', {
  action: function() {
    FlowRouter.go('/FlexScrollView');
  }
});

//var getSession = function(sessionVar) { return Session.get('direction') }

Template.registerHelper('dstache', function() {
  return '{{';
});

Template.body.helpers({
  currentRouteName: function() {
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
  },
  tabBarRender: function() {
    var fview = FView.from(this);    
    this.autorun(function(c) {
      FlowRouter.go(fview.selectedTab());
    });
  }
});

/*
Template.TabBarInitHack.onRendered(function() {
  // Since we're a non-fview template, the fview we get here is our parent's
  var fview = FView.from(this);

  this.autorun(function(c) {
    // only reactive dep
    var tabId = fview.selectedTab();

    // give precendence to route, not initial tab index
    if (c.firstRun)
      return;

    console.log(tabId, FlowRouter.current().route.name);
    if (tabId && tabId !== FlowRouter.current().route.name /* non-reactive *//*)
      FlowRouter.go(tabId);
  });
});
*/