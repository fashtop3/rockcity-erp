angular.module("angular-jqcloud",[]).directive("jqcloud",["$parse",function(r){var e=jQuery.fn.jQCloud.defaults.get(),o=[];for(var t in e)e.hasOwnProperty(t)&&o.push(t);return{restrict:"E",template:"<div></div>",replace:!0,scope:{words:"=words"},link:function(e,t,d){for(var n={},u=0,a=o.length;a>u;u++){var l=o[u],i=d[l]||t.attr(l);void 0!==i&&(n[l]=r(i)())}jQuery(t).jQCloud(e.words,n),e.$watchCollection("words",function(){e.$evalAsync(function(){var r=[];$.extend(r,e.words),jQuery(t).jQCloud("update",r)})}),t.bind("$destroy",function(){jQuery(t).jQCloud("destroy")})}}}]);