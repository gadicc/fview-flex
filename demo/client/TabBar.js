FlowRouter.route('/TabBar', {
  name: 'TabBarDemo',
  action: function() { Session.set('currentRouteName', this.name); }
});