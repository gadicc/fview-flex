# fview-flex

Sp IjzerenHein's [famous-flex](https://github.com/IjzerenHein/famous-flex)
is pretty friggin' awesome, and without a doubt the best community component for
Famo.us by a substantial distance.  This is the start of a
[famous-views](http://famous-views.meteor.com/) wrapper for it (for Meteor).

**VERY EARLY RELEASE!!!  Feel free to play around but don't use this for
anything serious.**  Currently this only works for `mjn:famous`, support
for `raix:famono` coming soon.

[Live demo](http://fview-flex.meteor.com/)

## Usage:

```jade
  +ContainerSurface perspective=500 overflow="hidden"
    +FlexScrollView layout="WheelLayout" direction="Y" layoutOptions=layoutOptions
      +famousEach surfaces
        +Surface style=style
          | #{_id}
```

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

## Progress

**famous-views** is developed in my spare time.  **fview-flex** is developed in
my spare time from famous-views :)  I'm not sure how quickly I'll get the full
list below implemented, however, I'll definitely prioritize according to demand.
[Open an issue](https://github.com/gadicc/fview-flex/issues) for feature /
prioritization requests, and I'll try get to these first, especially if there
are a lot of `+1`'s.

* **Standard Layouts** ([full docs](https://github.com/IjzerenHein/famous-flex#standard-layouts))
  * *--- Non-scrollable ---*
  * [x] GridLayout
  * [x] ProportionalLayout
  * [ ] HeaderFooterLayout (TODO, see what's different vs famo.us' one)
  * [ ] NavBarLayout
  * [ ] TabBarLayout
  * *--- Scrollable ----*
  * [ ] ListLayout (started, [ ] stickyHeaders)
  * [x] CollectionLayout
  * [x] WheelLayout

* **Widgets**
  * [ ] DatePicker
  * [ ] TabBar

* **LayoutControllers**, **LayoutHelpers**, etc.
