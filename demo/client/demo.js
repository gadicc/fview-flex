var layoutOptions = {
  GridLayout: [ 'cells', 'margins', 'spacing' ],
  ProportionalLayout: [ 'ratios' ],
  ListLayout: [ 'itemSize', 'margins', 'spacing' ],
  CollectionLayout: [ 'itemSize', 'justify', 'margins', 'spacing' ],
  // FullScreen: [ 'margins', 'spacing' ],
  WheelLayout: [ 'itemSize', 'diameter', 'radialOpacity' ]
};

Session.setDefault('cells', [4,4]);
Session.setDefault('margins', [10,10,10,10]);
Session.setDefault('ratios', [1,2,3,1]);
Session.setDefault('justify', [0,0]);
Session.setDefault('diameter', 500);
Session.setDefault('radialOpacity', 0);
// set in autorun below
// Session.setDefault('itemSize', [90,90]);
// Session.setDefault('spacing', [10,10]);

// Switch between scalar/array for itemSize when necessary w/ history
var itemSizeOld = [ [150,150], 70 ];
var spacingOld = [ [10,10], 2 ];
Tracker.autorun(function(c) {
  var type = Session.equals('layout', 'WheelLayout')
    || Session.equals('layout', 'ListLayout') ? 1 : 0;
  if (!c.firstRun) {
    itemSizeOld[type?0:1] = Tracker.nonreactive(function() {
      return Session.get('itemSize');
    });
    spacingOld[type?0:1] = Tracker.nonreactive(function() {
      return Session.get('spacing');
    });
  }
  Session.set('itemSize', itemSizeOld[type]);
  Session.set('spacing', spacingOld[type]);
});

Surfaces = new Meteor.Collection(null);

Meteor.startup(function() {
  for (var i=0; i < 60; i++)
    Surfaces.insert({
      name: '#'+(i+1),
      index: i,
      style: "background: hsl(" + (i * 360 / 60) + ", 100%, 50%)",
      show: Math.random() < 0.4
    });
});

//var getSession = function(sessionVar) { return Session.get('direction') }

Template.registerHelper('dstache', function() {
  return '{{';
});

Template.body.helpers({
  layout: function() {
    return Session.get('layout');
  },

  layoutOptions: function() {
    var out = {};
    _.each(layoutOptions[Session.get('layout')], function(option) {
      out[option] = Session.get(option);
    });
    return out;
  },

  direction: function() {
    return Session.get('direction');
  },

  surfaces: function() {
    return Surfaces.find({ show: true },
      { sort: { index: Session.get('order') } } );
  }
});

Session.setDefault('direction', 0);
Session.setDefault('layout', 'CollectionLayout');
Session.setDefault('order', 1);

Template.body.events({
  'click .surfaceAction': function(event) {
    var add = event.currentTarget.getAttribute('data-action') === 'add';
    var sids = _.pluck(Surfaces.find({show:!add}, {fields:{_id:1}}).fetch(), '_id');
    var id = sids[Math.floor((Math.random()-0.001) * sids.length)];
    Surfaces.update(id, { $set: { show: add }});
  },
  'change #layoutPicker': function(event) {
    Session.set('layout', event.currentTarget.value);
  },
  'change #directionPicker': function(event) {
    Session.set('direction', parseInt(event.currentTarget.value));
  },
  'change #orderPicker': function(event) {
    Session.set('order', parseInt(event.currentTarget.value));
  }
});

Template.header.helpers({
  surfaceCount: function() {
    return Surfaces.find({show:true}).count();
  },

  layouts: _.keys(layoutOptions),

  directions: (function() {
    var out = [];
    for (key in famous.utilities.Utility.Direction)
      if (key !== 'Z') // ok this got a bit stupid :)
        out.push({key: key, value: famous.utilities.Utility.Direction[key]});
    return out;
  })(),

  layoutOptions: function() {
    return layoutOptions[ Session.get('layout') ];
  },
  layoutOptionValue: function() {
    return JSON.stringify( Session.get( this.valueOf() ) );
  },

  isLayoutSelected: function() {
    return Session.equals('layout', this.valueOf());
  },
  isDirectionSelected: function() {
    return Session.equals('direction', this.value);
  },
  isOrderDescending: function() {
    return Session.equals('order', -1);
  }

});

Template.header.events({
  'change input.picker': function(event) {
    Session.set(this.valueOf(), JSON.parse(event.currentTarget.value));
  }
});