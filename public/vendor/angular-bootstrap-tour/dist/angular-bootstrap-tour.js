!function(t){"use strict"}(angular.module("bm.bsTour",[])),function(t){"use strict";t.provider("TourConfig",[function(){var t={prefixOptions:!1,prefix:"bsTour"};this.set=function(e,n){t[e]=n},this.$get=[function(){var e={};return e.get=function(e){return t[e]},e}]}])}(angular.module("bm.bsTour")),function(t){"use strict";t.controller("TourController",["$filter","$timeout",function(t,e){function n(e){var n=t("orderBy")(e,"order");return angular.forEach(n,function(t,e){t.next=n[e+1]?e+1:-1,t.prev=e-1}),n}var r,o=this,a=[],u=angular.noop,i={};o.refreshTour=function(){a=a.filter(function(t){return t!==i}),a[0]&&a[0].redirectPrev&&a.unshift(i),a[a.length-1]&&a[a.length-1].redirectNext&&a.push(i),r&&(r._options.steps=[],r.addSteps(n(a)))},o.addStep=function(t){~a.indexOf(t)||(a.push(t),o.refreshTour(),u(t))},o.removeStep=function(t){~a.indexOf(t)&&(a.splice(a.indexOf(t),1),o.refreshTour())},o.getSteps=function(){return a},o.waitFor=function(t){r.end(),u=function(n){n.stepId===t&&(r.setCurrentStep(a.indexOf(n)),e(function(){r.start(!0)}))}},o.init=function(t){return t.steps=n(a),r=new Tour(t)}}])}(angular.module("bm.bsTour")),function(t){"use strict";function e(){return["TourHelpers",function(t){return{restrict:"EA",scope:!0,controller:"TourController",link:function(e,n,r,o){var a,u={},i="onStart onEnd afterGetState afterSetState afterRemoveState onShow onShown onHide onHidden onNext onPrev onPause onResume".split(" "),c="name container keyboard storage debug redirect duration basePath backdrop orphan".split(" ");t.attachInterpolatedValues(r,u,c),t.attachEventHandlers(e,r,u,i),a=t.attachTemplate(e,r,u),e.$watchCollection(o.getSteps,function(t){e.stepCount=t.length}),r.tourOptions&&angular.extend(u,e.$eval(r.tourOptions)),r[t.getAttrName("options")]&&angular.extend(u,e.$eval(r[t.getAttrName("options")])),a.then(function(){e.tour=o.init(u),e.tour.refresh=o.refreshTour})}}}]}t.directive("tour",e()),t.directive("bsTour",e())}(angular.module("bm.bsTour")),function(t){"use strict";t.factory("TourHelpers",["$templateCache","$http","$compile","TourConfig","$q",function(t,e,n,r,o){function a(t,e){return function(){var r=angular.element(t);return n(r)(e)}}function u(n,r){return e.get(n,{cache:t}).success(function(t){return t?a(t,r):""})}function i(t){return"true"===t?!0:"false"===t?!1:t}var c,s={};return c=s.safeApply=function(t,e){var n=t.$$phase;"$apply"===n||"$digest"===n?e&&"function"==typeof e&&e():t.$apply(e)},s.attachTemplate=function(t,e,n){var r,i=o.defer();return e[s.getAttrName("template")]?(r=a(t.$eval(e[s.getAttrName("template")]),t),n.template=r,i.resolve(r)):e[s.getAttrName("templateUrl")]?u(e[s.getAttrName("templateUrl")],t).then(function(t){t&&(n.template=t,i.resolve(t))}):i.resolve(),i.promise},s.attachEventHandlers=function(t,e,n,r){angular.forEach(r,function(r){e[s.getAttrName(r)]&&(n[r]=function(n){c(t,function(){t.$eval(e[s.getAttrName(r)])})})})},s.attachInterpolatedValues=function(t,e,n){angular.forEach(n,function(n){t[s.getAttrName(n)]&&(e[n]=i(t[s.getAttrName(n)]),t.$observe(s.getAttrName(n),function(t){e[n]=i(t)}))})},s.getAttrName=function(t){return r.get("prefixOptions")?r.get("prefix")+t.charAt(0).toUpperCase()+t.substr(1):t},s}])}(angular.module("bm.bsTour")),function(t){"use strict";function e(){return["TourHelpers","$location",function(t,e){return{restrict:"EA",scope:!0,require:"^tour",link:function(n,r,o,a){function u(){var e;return o[t.getAttrName("skip")]&&(e=n.$eval(o[t.getAttrName("skip")])),e||(e=!!l.path||r.is(":hidden")&&!o.availableWhenHidden),e}function i(r,o,u){var i=l[r];l[r]=function(r){i&&i(r),a.waitFor(u),t.safeApply(n,function(){e.path(o)})}}var c,s,p,l={element:r,stepId:o.tourStep},f="onShow onShown onHide onHidden onNext onPrev onPause onResume".split(" "),d="content title path animation container placement backdrop redirect orphan reflex duration nextStep prevStep nextPath prevPath".split(" ");t.attachInterpolatedValues(o,l,d),c=o.$observe(t.getAttrName("order"),function(t){l.order=isNaN(1*t)?0:1*t,a.refreshTour()}),t.attachEventHandlers(n,o,l,f),p=t.attachTemplate(n,o,l),s=n.$watch(u,function(t){t?a.removeStep(l):a.addStep(l)}),n.$on("$destroy",function(){a.removeStep(l),c(),s()}),o[t.getAttrName("options")]&&angular.extend(l,n.$eval(o[t.getAttrName("options")])),l.nextPath&&(l.redirectNext=!0,i("onNext",l.nextPath,l.nextStep)),l.prevPath&&(l.redirectPrev=!0,i("onPrev",l.prevPath,l.prevStep)),p.then(function(){a.addStep(l),n.tourStep=l})}}}]}t.directive("tourStep",e()),t.directive("bsTourStep",e())}(angular.module("bm.bsTour"));