"use strict";function uiCodemirrorDirective(r,e){function o(r,o,a,c){var d=angular.extend({value:o.text()},e.codemirror||{},r.$eval(a.uiCodemirror),r.$eval(a.uiCodemirrorOpts)),f=i(o,d);n(f,a.uiCodemirror||a.uiCodemirrorOpts,r),t(f,c,r),u(f,a.uiRefresh,r),r.$on("CodeMirror",function(r,e){if(!angular.isFunction(e))throw new Error("the CodeMirror event requires a callback function");e(f)}),angular.isFunction(d.onLoad)&&d.onLoad(f)}function i(r,e){var o;return"TEXTAREA"===r[0].tagName?o=window.CodeMirror.fromTextArea(r[0],e):(r.html(""),o=new window.CodeMirror(function(e){r.append(e)},e)),o}function n(r,e,o){function i(e,o){angular.isObject(e)&&n.forEach(function(i){if(e.hasOwnProperty(i)){if(o&&e[i]===o[i])return;r.setOption(i,e[i])}})}if(e){var n=Object.keys(window.CodeMirror.defaults);o.$watch(e,i,!0)}}function t(r,e,o){e&&(e.$formatters.push(function(r){if(angular.isUndefined(r)||null===r)return"";if(angular.isObject(r)||angular.isArray(r))throw new Error("ui-codemirror cannot use an object or an array as a model");return r}),e.$render=function(){var o=e.$viewValue||"";r.setValue(o)},r.on("change",function(r){var i=r.getValue();i!==e.$viewValue&&o.$evalAsync(function(){e.$setViewValue(i)})}))}function u(e,o,i){o&&i.$watch(o,function(o,i){o!==i&&r(function(){e.refresh()})})}return{restrict:"EA",require:"?ngModel",compile:function(){if(angular.isUndefined(window.CodeMirror))throw new Error("ui-codemirror needs CodeMirror to work... (o rly?)");return o}}}angular.module("ui.codemirror",[]).constant("uiCodemirrorConfig",{}).directive("uiCodemirror",uiCodemirrorDirective),uiCodemirrorDirective.$inject=["$timeout","uiCodemirrorConfig"];