FView.ready(function() {
  // Famono: load famo.us shims and CSS
  famous.polyfills;
  famous.core.famous; // CSS
});

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function() {
  this.redirect('FlexScrollView');
});

//var getSession = function(sessionVar) { return Session.get('direction') }

Template.registerHelper('dstache', function() {
  return '{{';
});

Template.layout.helpers({
  layoutController: {
    nodeSpring: {
      dampingRatio: 0.05,
      period: 400
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
    var tabId = fview.index();
    if (tabId && tabId !== Router.current().route.getName())
      Router.go(tabId);
  });
});