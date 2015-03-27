# fview-flex

So IjzerenHein's [famous-flex](https://github.com/IjzerenHein/famous-flex)
is pretty friggin' awesome, and without a doubt the best community component for
Famo.us by a substantial distance.  This is the start of a
[famous-views](http://famous-views.meteor.com/) wrapper for it (for Meteor).

**VERY EARLY RELEASE!!!  Feel free to play around but don't use this for
anything serious.**  Works with both `mjn:famous` and  `raix:famono` (since
v0.0.2).

[Live demo](http://fview-flex.meteor.com/)

## Usage:

```jade
  +ContainerSurface perspective=500 overflow="hidden"
    +FlexScrollView layout="WheelLayout" direction="Y" layoutOptions=layoutOptions
      +famousEach surfaces
        +Surface style=style
          | #{_id}
```

Note: [Beware of overflow: hidden, it breaks z-translation quite badly](https://github.com/Famous/famous/issues/493) - if you don't need it, don't use it.

**Attributes**:

* All attributes are parsed using famous-views and given on init (i.e. you can give either a string or [fview string](http://famous-views.meteor.com/views/README) in the template, or use a template helper to give an actual value).  So you can use any option mentioned
in the famous-flex docs.
* `layout`, `direction`, `layoutOptions` are all reactive, see the
[demo source](https://github.com/gadicc/fview-flex/tree/master/demo/client)
for a good example.  
* If none of your layoutOptions are reactive, you can use straight JSON
directly from the template, e.g.
`layoutOptions='{ "itemSize": [50,90], "diameter": 500, "radialOpacity": 0 }'`.
* No problem to use a helper to return your own custom layout function to
`layout`.

You can also use `{{#FlexLayoutController}}` directly if you don't need
scrolling.

## Special behaviour

* If the FlexScrollView's immediate parent is a ContainerSurface, we'll set up
all the event piping for you.  Otherwise, by default, we'll still automatically
pipe all children to it, just like in regular ScrollView with famousEach.  But
generally you'll want to use a ContainerSurface to ensure smooth scrolling even
when going over "gaps" between the Surfaces.

## Progress

**famous-views** is developed in my spare time.  **fview-flex** is developed in
my spare time from famous-views :)  I'm not sure how quickly I'll get the full
list below implemented, however, I'll definitely prioritize according to demand.
[Open an issue](https://github.com/gadicc/fview-flex/issues) for feature /
prioritization requests, and I'll try get to these first, especially if there
are a lot of `+1`'s.

Basically you can use all the components of famous-flex right now, through js if not available for templates.

* **Standard Layouts** ([full docs](https://github.com/IjzerenHein/famous-flex#standard-layouts))
  * *--- Non-scrollable ---*
  * [x] GridLayout
  * [x] ProportionalLayout
  * [x] HeaderFooterLayout (compared to famo.us' HeaderFooterLayout, this could update the header/footer size dynamically)
  * [x] NavBarLayout
  * [x] TabBarLayout
  * *--- Scrollable ----*
  * [x] ListLayout ([x] stickyHeaders)
  * [x] CollectionLayout
  * [x] WheelLayout

* **LayoutHelpers(layout literals)**
  * [ ] LayoutDockHelper (add template support for dock literals)

* **Widgets**
  * [ ] DatePicker (add template support)
  * [ ] TabBar (add template support)

* **LayoutControllers**, **LayoutHelpers**, etc.

A DatePicker example(will add template support in the future :):
```
  var datePicker = new Flex.DatePicker({
    date: new Date(),
    perspective: 500,
    wheelLayout: {
      itemSize: 25,
      diameter: 100,
      radialOpacity: -0.5
    },
    createRenderables: {
      top: true,
      bottom: true
    },
    classes: ['transparent']
  });
  datePicker.setComponents([
    new Flex.DatePicker.Component.Month(),
    new Flex.DatePicker.Component.Day(),
    new Flex.DatePicker.Component.Year()
  ]);

  datePicker.on('datechange', function(event) {
    console.log('date-changed to: ' + event.date.toString());
  });
```

A HeaderFooterLayout example:
```
{{#FlexLayoutController layout='HeaderFooterLayout' layoutOptions=layoutOptions}}
  {{#Surface target="header" size="[undefined, 40]"}}
  {{/Surface}}
  {{#Surface target="content"}}
  {{/Surface}}
  {{#Surface target="footer" size="[undefined, 80]"}}
  {{/Surface}}
{{/FlexLayoutController}}
```

A LayoutDockHelper example:
```
The template:

<template name="dockExample">
{{#FlexLayoutController layout=layout dataSource=dataSource layoutOptions=layoutOptions}}
{{/FlexLayoutController}}
</template>

In JS:

Template.dockExample.helpers({
  'layout': function() {
    return {
      dock: [
        ['fill', 'background'],
        ['left', undefined, 8],
        ['top', undefined, 8],
        ['right', undefined, 8],
        ['bottom', undefined, 8],
        ['right', 'send', undefined, 1],
        ['fill', 'input', 1]
      ]
    };
  },
  'dataSource': function() {
    return {
      background: backgroundSurface,
      input: inputSurface,
      send:  sendSurface
    };
  },
  'layoutOptions': function() {
    return {
      margins: [0, 0, 0, 0]
    };
  }
});
```
I think future release can add support for layout literals(and other common layouts) like this:
```
{{#FlexLayoutController layout='HeaderFooterLayout/ListLayout/Dock/or whatever layout' margin="[10, 10, 10, 10]"}}
  {{#Surface target="left" size="[undefined, 100]"}}
    {{>templateA}}
  {{/Surface}}
  {{#Surface target="right" size="[undefined, 100]"}}
    {{>templateB}}
  {{/Surface}}
{{/FlexLayoutController}}
```

BTW, you can use RefreshLoader & AutosizeTextareaSurface like this:
```
var loader = new Flex.RefreshLoader(...);
```
