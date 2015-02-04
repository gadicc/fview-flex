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
Session.setDefault('spacing', [10,10]);
Session.setDefault('ratios', [1,2,3,1]);
Session.setDefault('itemSize', [90,90]);  // wheel takes "70"
Session.setDefault('justify', [0,0]);
Session.setDefault('diameter', 500);
Session.setDefault('radialOpacity', 0);

Tracker.autorun(function() {
  // TODO, store and restore old value
  if (Session.equals('layout', 'WheelLayout'))
    Session.set('itemSize', 70);
  else
    Session.set('itemSize', [90,90]);
});

Surfaces = new Meteor.Collection(null);

Meteor.startup(function() {
  for (var i=1; i < 31; i++)
    Surfaces.insert({
      _id: 's'+i,
      style: "background: hsl(" + (i * 360 / 30) + ", 100%, 50%)"
    });
});

//var getSession = function(sessionVar) { return Session.get('direction') }

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
    return Surfaces.find();
  }
});

Session.setDefault('direction', 0);
Session.setDefault('layout', 'CollectionLayout');

Template.body.events({
  'change #layoutPicker': function(event) {
    Session.set('layout', event.currentTarget.value);
  },
  'change #directionPicker': function(event) {
    Session.set('direction', parseInt(event.currentTarget.value));
  }
});

Template.header.helpers({
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
  }

});

Template.header.events({
  'change input.picker': function(event) {
    Session.set(this.valueOf(), JSON.parse(event.currentTarget.value));
  }
});