## vNEXT

## v0.0.7

* Update to latest famous-flex, famous-autosizetextarea, famous-refresh-loader
* Famous-views wrapper for TabBar
* Extra Flex modules: LayoutNodeManager, LayoutController,
  AnimationController, TabBarController

## v0.0.6

* Fix for AutosizeTextareaSurface.prototype error (deps)

## v0.0.5

* add HeaderFooterLayout
* add LayoutDockHelper
* add DatePicker & TabBar
* add useful views RefreshLoader & AutosizeTextareaSurface
* bugfixes

A massive thanks to @ShawnOceanHu for his work on *all of the above*, including
sample code in the README.

## v0.0.4

* Bugfix: don't pipe events from parent ContainerSurface AND child surfaces,
  as the double piping breaks fluid flicking.  Instead, do one or the other,
  and also, change the way we pipe ContainerSurface to work better on Mac.

* Bump famous-flex, work correctly with now deprecated GridLayout.
  thanks @ShawnOceanHu.

## v0.0.3

* Bugfix: don't bail on `Cannot set property '_isDirty' of null` on removedAt
  if the containing view destroyed before defer time.

## v0.0.2

* famono support
* Demo: .noselect on surfaces makes it a tiny bit easier (but still pretty
  hard) to "flick" with mouse
