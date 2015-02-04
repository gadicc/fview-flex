if (Meteor.isClient) {
  Surfaces = new Meteor.Collection(null);

  Meteor.startup(function() {
    for (var i=1; i < 31; i++)
      Surfaces.insert({
        _id: 's'+i,
        style: "background: hsl(" + (i * 360 / 30) + ", 100%, 50%)"
      });
  });

  Template.body.helpers({
    layout: function() {
      return Session.get('layout');
    },

    surfaces: function() {
      return Surfaces.find();
    }
  });

  Session.setDefault('layout', 'CollectionLayout');

  Template.body.events({
    'change #layoutPicker': function(event) {
      Session.set('layout', event.currentTarget.value);
    }
  });

  Template.header.helpers({
    layouts: function() {
      return ['CollectionLayout', 'GridLayout'];
      /*
      _option(value="ProportionLayout") ProportionLayout
      _option(value="ListLayout") ListLayout
      option(value="CollectionLayout") CollectionLayout
      _option(value="FullScreen") FullScreen
      _option(value="WheelLayout") WheelLayout
      */
    },
    isLayoutSelected: function() {
      return Session.equals('layout', this.valueOf());
    }

  });
}
