!function(){"use strict";var e={TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,PAGE_UP:33,PAGE_DOWN:34,HOME:36,END:35,BACKSPACE:8,DELETE:46,COMMAND:91,MAP:{91:"COMMAND",8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",17:"CTRL",18:"ALT",19:"PAUSEBREAK",20:"CAPSLOCK",27:"ESC",32:"SPACE",33:"PAGE_UP",34:"PAGE_DOWN",35:"END",36:"HOME",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN",43:"+",44:"PRINTSCREEN",45:"INSERT",46:"DELETE",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NUMLOCK",145:"SCROLLLOCK",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},isControl:function(t){var i=t.which;switch(i){case e.COMMAND:case e.SHIFT:case e.CTRL:case e.ALT:return!0}return!!t.metaKey},isFunctionKey:function(e){return e=e.which?e.which:e,e>=112&&e<=123},isVerticalMovement:function(t){return~[e.UP,e.DOWN].indexOf(t)},isHorizontalMovement:function(t){return~[e.LEFT,e.RIGHT,e.BACKSPACE,e.DELETE].indexOf(t)},toSeparator:function(t){var i={ENTER:"\n",TAB:"\t",SPACE:" "}[t];return i?i:e[t]?void 0:t}};void 0===angular.element.prototype.querySelectorAll&&(angular.element.prototype.querySelectorAll=function(e){return angular.element(this[0].querySelectorAll(e))}),void 0===angular.element.prototype.closest&&(angular.element.prototype.closest=function(e){for(var t=this[0],i=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector;t;){if(i.bind(t)(e))return t;t=t.parentElement}return!1});var t=0,i=angular.module("ui.select",[]).constant("uiSelectConfig",{theme:"bootstrap",searchEnabled:!0,sortable:!1,placeholder:"",refreshDelay:1e3,closeOnSelect:!0,dropdownPosition:"auto",generateId:function(){return t++},appendToBody:!1}).service("uiSelectMinErr",function(){var e=angular.$$minErr("ui.select");return function(){var t=e.apply(this,arguments),i=t.message.replace(new RegExp("\nhttp://errors.angularjs.org/.*"),"");return new Error(i)}}).directive("uisTranscludeAppend",function(){return{link:function(e,t,i,s,c){c(e,function(e){t.append(e)})}}}).filter("highlight",function(){function e(e){return(""+e).replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}return function(t,i){return i&&t?(""+t).replace(new RegExp(e(i),"gi"),'<span class="ui-select-highlight">$&</span>'):t}}).factory("uisOffset",["$document","$window",function(e,t){return function(i){var s=i[0].getBoundingClientRect();return{width:s.width||i.prop("offsetWidth"),height:s.height||i.prop("offsetHeight"),top:s.top+(t.pageYOffset||e[0].documentElement.scrollTop),left:s.left+(t.pageXOffset||e[0].documentElement.scrollLeft)}}}]);i.directive("uiSelectChoices",["uiSelectConfig","uisRepeatParser","uiSelectMinErr","$compile","$window",function(e,t,i,s,c){return{restrict:"EA",require:"^uiSelect",replace:!0,transclude:!0,templateUrl:function(t){t.addClass("ui-select-choices");var i=t.parent().attr("theme")||e.theme;return i+"/choices.tpl.html"},compile:function(l,n){if(!n.repeat)throw i("repeat","Expected 'repeat' expression.");return function(l,n,a,r,o){var u=a.groupBy,d=a.groupFilter;if(r.parseRepeatAttr(a.repeat,u,d),r.disableChoiceExpression=a.uiDisableChoice,r.onHighlightCallback=a.onHighlight,r.dropdownPosition=a.position?a.position.toLowerCase():e.dropdownPosition,u){var p=n.querySelectorAll(".ui-select-choices-group");if(1!==p.length)throw i("rows","Expected 1 .ui-select-choices-group but got '{0}'.",p.length);p.attr("ng-repeat",t.getGroupNgRepeatExpression())}var g=n.querySelectorAll(".ui-select-choices-row");if(1!==g.length)throw i("rows","Expected 1 .ui-select-choices-row but got '{0}'.",g.length);g.attr("ng-repeat",r.parserResult.repeatExpression(u)).attr("ng-if","$select.open"),c.document.addEventListener&&g.attr("ng-mouseenter","$select.setActiveItem("+r.parserResult.itemName+")").attr("ng-click","$select.select("+r.parserResult.itemName+",false,$event)");var h=n.querySelectorAll(".ui-select-choices-row-inner");if(1!==h.length)throw i("rows","Expected 1 .ui-select-choices-row-inner but got '{0}'.",h.length);h.attr("uis-transclude-append",""),c.document.addEventListener||h.attr("ng-mouseenter","$select.setActiveItem("+r.parserResult.itemName+")").attr("ng-click","$select.select("+r.parserResult.itemName+",false,$event)"),s(n,o)(l),l.$watch("$select.search",function(e){e&&!r.open&&r.multiple&&r.activate(!1,!0),r.activeIndex=r.tagging.isActivated?-1:0,!a.minimumInputLength||r.search.length>=a.minimumInputLength?r.refresh(a.refresh):r.items=[]}),a.$observe("refreshDelay",function(){var t=l.$eval(a.refreshDelay);r.refreshDelay=void 0!==t?t:e.refreshDelay})}}}}]),i.controller("uiSelectCtrl",["$scope","$element","$timeout","$filter","uisRepeatParser","uiSelectMinErr","uiSelectConfig","$parse","$injector",function(t,i,s,c,l,n,a,r,o){function u(e,t,i){if(e.findIndex)return e.findIndex(t,i);for(var s,c=Object(e),l=c.length>>>0,n=0;n<l;n++)if(s=c[n],t.call(i,s,n,c))return n;return-1}function d(){(f.resetSearchInput||void 0===f.resetSearchInput&&a.resetSearchInput)&&(f.search=v,f.selected&&f.items.length&&!f.multiple&&(f.activeIndex=u(f.items,function(e){return angular.equals(this,e)},f.selected)))}function p(e,t){var i,s,c=[];for(i=0;i<t.length;i++)for(s=0;s<e.length;s++)e[s].name==[t[i]]&&c.push(e[s]);return c}function g(t){var i=!0;switch(t){case e.DOWN:!f.open&&f.multiple?f.activate(!1,!0):f.activeIndex<f.items.length-1&&f.activeIndex++;break;case e.UP:!f.open&&f.multiple?f.activate(!1,!0):(f.activeIndex>0||0===f.search.length&&f.tagging.isActivated&&f.activeIndex>-1)&&f.activeIndex--;break;case e.TAB:f.multiple&&!f.open||f.select(f.items[f.activeIndex],!0);break;case e.ENTER:f.open&&(f.tagging.isActivated||f.activeIndex>=0)?f.select(f.items[f.activeIndex]):f.activate(!1,!0);break;case e.ESC:f.close();break;default:i=!1}return i}function h(){var e=i.querySelectorAll(".ui-select-choices-content"),t=e.querySelectorAll(".ui-select-choices-row");if(t.length<1)throw n("choices","Expected multiple .ui-select-choices-row but got '{0}'.",t.length);if(!(f.activeIndex<0)){var s=t[f.activeIndex],c=s.offsetTop+s.clientHeight-e[0].scrollTop,l=e[0].offsetHeight;c>l?e[0].scrollTop+=c-l:c<s.clientHeight&&(f.isGrouped&&0===f.activeIndex?e[0].scrollTop=0:e[0].scrollTop-=s.clientHeight-c)}}var f=this,v="";if(f.placeholder=a.placeholder,f.searchEnabled=a.searchEnabled,f.sortable=a.sortable,f.refreshDelay=a.refreshDelay,f.paste=a.paste,f.removeSelected=!1,f.closeOnSelect=!0,f.search=v,f.activeIndex=0,f.items=[],f.open=!1,f.focus=!1,f.disabled=!1,f.selected=void 0,f.dropdownPosition="auto",f.focusser=void 0,f.resetSearchInput=!0,f.multiple=void 0,f.disableChoiceExpression=void 0,f.tagging={isActivated:!1,fct:void 0},f.taggingTokens={isActivated:!1,tokens:void 0},f.lockChoiceExpression=void 0,f.clickTriggeredSelect=!1,f.$filter=c,f.$animate=function(){try{return o.get("$animate")}catch(e){return null}}(),f.searchInput=i.querySelectorAll("input.ui-select-search"),1!==f.searchInput.length)throw n("searchInput","Expected 1 input.ui-select-search but got '{0}'.",f.searchInput.length);f.isEmpty=function(){return angular.isUndefined(f.selected)||null===f.selected||""===f.selected||f.multiple&&0===f.selected.length},f.activate=function(e,c){if(!f.disabled&&!f.open){c||d(),t.$broadcast("uis:activate"),f.open=!0,f.activeIndex=f.activeIndex>=f.items.length?0:f.activeIndex,f.activeIndex===-1&&f.taggingLabel!==!1&&(f.activeIndex=0);var l=i.querySelectorAll(".ui-select-choices-content");f.$animate&&f.$animate.enabled(l[0])?f.$animate.on("enter",l[0],function(t,i){"close"===i&&s(function(){f.focusSearchInput(e)})}):s(function(){f.focusSearchInput(e)})}},f.focusSearchInput=function(e){f.search=e||f.search,f.searchInput[0].focus(),!f.tagging.isActivated&&f.items.length>1&&h()},f.findGroupByName=function(e){return f.groups&&f.groups.filter(function(t){return t.name===e})[0]},f.parseRepeatAttr=function(e,i,s){function c(e){var c=t.$eval(i);if(f.groups=[],angular.forEach(e,function(e){var t=angular.isFunction(c)?c(e):e[c],i=f.findGroupByName(t);i?i.items.push(e):f.groups.push({name:t,items:[e]})}),s){var l=t.$eval(s);angular.isFunction(l)?f.groups=l(f.groups):angular.isArray(l)&&(f.groups=p(f.groups,l))}f.items=[],f.groups.forEach(function(e){f.items=f.items.concat(e.items)})}function a(e){f.items=e}f.setItemsFn=i?c:a,f.parserResult=l.parse(e),f.isGrouped=!!i,f.itemProperty=f.parserResult.itemName;var o=f.parserResult.source,u=function(){var e=o(t);t.$uisSource=Object.keys(e).map(function(t){var i={};return i[f.parserResult.keyName]=t,i.value=e[t],i})};f.parserResult.keyName&&(u(),f.parserResult.source=r("$uisSource"+f.parserResult.filters),t.$watch(o,function(e,t){e!==t&&u()},!0)),f.refreshItems=function(e){e=e||f.parserResult.source(t);var i=f.selected;if(f.isEmpty()||angular.isArray(i)&&!i.length||!f.removeSelected)f.setItemsFn(e);else if(void 0!==e){var s=e.filter(function(e){return i&&i.indexOf(e)<0});f.setItemsFn(s)}"auto"!==f.dropdownPosition&&"up"!==f.dropdownPosition||t.calculateDropdownPos()},t.$watchCollection(f.parserResult.source,function(e){if(void 0===e||null===e)f.items=[];else{if(!angular.isArray(e))throw n("items","Expected an array but got '{0}'.",e);f.refreshItems(e),f.ngModel.$modelValue=null}})};var m;f.refresh=function(e){void 0!==e&&(m&&s.cancel(m),m=s(function(){t.$eval(e)},f.refreshDelay))},f.isActive=function(e){if(!f.open)return!1;var t=f.items.indexOf(e[f.itemProperty]),i=t==f.activeIndex;return!(!i||t<0&&f.taggingLabel!==!1||t<0&&f.taggingLabel===!1)&&(i&&!angular.isUndefined(f.onHighlightCallback)&&e.$eval(f.onHighlightCallback),i)},f.isDisabled=function(e){if(f.open){var t,i=f.items.indexOf(e[f.itemProperty]),s=!1;return i>=0&&!angular.isUndefined(f.disableChoiceExpression)&&(t=f.items[i],s=!!e.$eval(f.disableChoiceExpression),t._uiSelectChoiceDisabled=s),s}},f.select=function(e,i,c){if(void 0===e||!e._uiSelectChoiceDisabled){if(!f.items&&!f.search&&!f.tagging.isActivated)return;if(!e||!e._uiSelectChoiceDisabled){if(f.tagging.isActivated){if(f.taggingLabel===!1)if(f.activeIndex<0){if(e=void 0!==f.tagging.fct?f.tagging.fct(f.search):f.search,!e||angular.equals(f.items[0],e))return}else e=f.items[f.activeIndex];else if(0===f.activeIndex){if(void 0===e)return;if(void 0!==f.tagging.fct&&"string"==typeof e){if(e=f.tagging.fct(e),!e)return}else"string"==typeof e&&(e=e.replace(f.taggingLabel,"").trim())}if(f.selected&&angular.isArray(f.selected)&&f.selected.filter(function(t){return angular.equals(t,e)}).length>0)return void f.close(i)}t.$broadcast("uis:select",e);var l={};l[f.parserResult.itemName]=e,s(function(){f.onSelectCallback(t,{$item:e,$model:f.parserResult.modelMapper(t,l)})}),f.closeOnSelect&&f.close(i),c&&"click"===c.type&&(f.clickTriggeredSelect=!0)}}},f.close=function(e){f.open&&(f.ngModel&&f.ngModel.$setTouched&&f.ngModel.$setTouched(),d(),f.open=!1,t.$broadcast("uis:close",e))},f.setFocus=function(){f.focus||f.focusInput[0].focus()},f.clear=function(e){f.select(void 0),e.stopPropagation(),s(function(){f.focusser[0].focus()},0,!1)},f.toggle=function(e){f.open?(f.close(),e.preventDefault(),e.stopPropagation()):f.activate()},f.isLocked=function(e,t){var i,s=f.selected[t];return s&&!angular.isUndefined(f.lockChoiceExpression)&&(i=!!e.$eval(f.lockChoiceExpression),s._uiSelectChoiceLocked=i),i};var $=null;f.sizeSearchInput=function(){var e=f.searchInput[0],i=f.searchInput.parent().parent()[0],c=function(){return i.clientWidth*!!e.offsetParent},l=function(t){if(0===t)return!1;var i=t-e.offsetLeft-10;return i<50&&(i=t),f.searchInput.css("width",i+"px"),!0};f.searchInput.css("width","10px"),s(function(){null!==$||l(c())||($=t.$watch(c,function(e){l(e)&&($(),$=null)}))})},f.searchInput.on("keydown",function(i){var c=i.which;~[e.ENTER,e.ESC].indexOf(c)&&(i.preventDefault(),i.stopPropagation()),t.$apply(function(){var t=!1;if((f.items.length>0||f.tagging.isActivated)&&(g(c),f.taggingTokens.isActivated)){for(var l=0;l<f.taggingTokens.tokens.length;l++)f.taggingTokens.tokens[l]===e.MAP[i.keyCode]&&f.search.length>0&&(t=!0);t&&s(function(){f.searchInput.triggerHandler("tagged");var t=f.search.replace(e.MAP[i.keyCode],"").trim();f.tagging.fct&&(t=f.tagging.fct(t)),t&&f.select(t,!0)})}}),e.isVerticalMovement(c)&&f.items.length>0&&h(),c!==e.ENTER&&c!==e.ESC||(i.preventDefault(),i.stopPropagation())}),f.searchInput.on("paste",function(t){var i;if(i=window.clipboardData&&window.clipboardData.getData?window.clipboardData.getData("Text"):(t.originalEvent||t).clipboardData.getData("text/plain"),i=f.search+i,i&&i.length>0)if(f.taggingTokens.isActivated){var s=e.toSeparator(f.taggingTokens.tokens[0]),c=i.split(s||f.taggingTokens.tokens[0]);if(c&&c.length>0){var l=f.search;angular.forEach(c,function(e){var t=f.tagging.fct?f.tagging.fct(e):e;t&&f.select(t,!0)}),f.search=l||v,t.preventDefault(),t.stopPropagation()}}else f.paste&&(f.paste(i),f.search=v,t.preventDefault(),t.stopPropagation())}),f.searchInput.on("tagged",function(){s(function(){d()})}),t.$on("$destroy",function(){f.searchInput.off("keyup keydown tagged blur paste")})}]),i.directive("uiSelect",["$document","uiSelectConfig","uiSelectMinErr","uisOffset","$compile","$parse","$timeout",function(e,t,i,s,c,l,n){return{restrict:"EA",templateUrl:function(e,i){var s=i.theme||t.theme;return s+(angular.isDefined(i.multiple)?"/select-multiple.tpl.html":"/select.tpl.html")},replace:!0,transclude:!0,require:["uiSelect","^ngModel"],scope:!0,controller:"uiSelectCtrl",controllerAs:"$select",compile:function(c,a){var r=/{(.*)}\s*{(.*)}/.exec(a.ngClass);if(r){var o="{"+r[1]+", "+r[2]+"}";a.ngClass=o,c.attr("ng-class",o)}return angular.isDefined(a.multiple)?c.append("<ui-select-multiple/>").removeAttr("multiple"):c.append("<ui-select-single/>"),a.inputId&&(c.querySelectorAll("input.ui-select-search")[0].id=a.inputId),function(c,a,r,o,u){function d(e){if(h.open){var t=!1;if(t=window.jQuery?window.jQuery.contains(a[0],e.target):a[0].contains(e.target),!t&&!h.clickTriggeredSelect){var i=["input","button","textarea","select"],s=angular.element(e.target).controller("uiSelect"),l=s&&s!==h;l||(l=~i.indexOf(e.target.tagName.toLowerCase())),h.close(l),c.$digest()}h.clickTriggeredSelect=!1}}function p(){var t=s(a);m=angular.element('<div class="ui-select-placeholder"></div>'),m[0].style.width=t.width+"px",m[0].style.height=t.height+"px",a.after(m),$=a[0].style.width,e.find("body").append(a),a[0].style.position="absolute",a[0].style.left=t.left+"px",a[0].style.top=t.top+"px",a[0].style.width=t.width+"px"}function g(){null!==m&&(m.replaceWith(a),m=null,a[0].style.position="",a[0].style.left="",a[0].style.top="",a[0].style.width=$,h.setFocus())}var h=o[0],f=o[1];h.generatedId=t.generateId(),h.baseTitle=r.title||"Select box",h.focusserTitle=h.baseTitle+" focus",h.focusserId="focusser-"+h.generatedId,h.closeOnSelect=function(){return angular.isDefined(r.closeOnSelect)?l(r.closeOnSelect)():t.closeOnSelect}(),h.onSelectCallback=l(r.onSelect),h.onRemoveCallback=l(r.onRemove),h.limit=angular.isDefined(r.limit)?parseInt(r.limit,10):void 0,h.ngModel=f,h.choiceGrouped=function(e){return h.isGrouped&&e&&e.name},r.tabindex&&r.$observe("tabindex",function(e){h.focusInput.attr("tabindex",e),a.removeAttr("tabindex")}),c.$watch("searchEnabled",function(){var e=c.$eval(r.searchEnabled);h.searchEnabled=void 0!==e?e:t.searchEnabled}),c.$watch("sortable",function(){var e=c.$eval(r.sortable);h.sortable=void 0!==e?e:t.sortable}),r.$observe("disabled",function(){h.disabled=void 0!==r.disabled&&r.disabled}),r.$observe("resetSearchInput",function(){var e=c.$eval(r.resetSearchInput);h.resetSearchInput=void 0===e||e}),r.$observe("paste",function(){h.paste=c.$eval(r.paste)}),r.$observe("tagging",function(){if(void 0!==r.tagging){var e=c.$eval(r.tagging);h.tagging={isActivated:!0,fct:e!==!0?e:void 0}}else h.tagging={isActivated:!1,fct:void 0}}),r.$observe("taggingLabel",function(){void 0!==r.tagging&&("false"===r.taggingLabel?h.taggingLabel=!1:h.taggingLabel=void 0!==r.taggingLabel?r.taggingLabel:"(new)")}),r.$observe("taggingTokens",function(){if(void 0!==r.tagging){var e=void 0!==r.taggingTokens?r.taggingTokens.split("|"):[",","ENTER"];h.taggingTokens={isActivated:!0,tokens:e}}}),angular.isDefined(r.autofocus)&&n(function(){h.setFocus()}),angular.isDefined(r.focusOn)&&c.$on(r.focusOn,function(){n(function(){h.setFocus()})}),e.on("click",d),c.$on("$destroy",function(){e.off("click",d)}),u(c,function(e){var t=angular.element("<div>").append(e),s=t.querySelectorAll(".ui-select-match");if(s.removeAttr("ui-select-match"),s.removeAttr("data-ui-select-match"),1!==s.length)throw i("transcluded","Expected 1 .ui-select-match but got '{0}'.",s.length);a.querySelectorAll(".ui-select-match").replaceWith(s);var c=t.querySelectorAll(".ui-select-choices");if(c.removeAttr("ui-select-choices"),c.removeAttr("data-ui-select-choices"),1!==c.length)throw i("transcluded","Expected 1 .ui-select-choices but got '{0}'.",c.length);a.querySelectorAll(".ui-select-choices").replaceWith(c)});var v=c.$eval(r.appendToBody);(void 0!==v?v:t.appendToBody)&&(c.$watch("$select.open",function(e){e?p():g()}),c.$on("$destroy",function(){g()}));var m=null,$="",b=null,w="direction-up";c.$watch("$select.open",function(){"auto"!==h.dropdownPosition&&"up"!==h.dropdownPosition||c.calculateDropdownPos()});var x=function(e,t){e=e||s(a),t=t||s(b),b[0].style.position="absolute",b[0].style.top=t.height*-1+"px",a.addClass(w)},y=function(e,t){a.removeClass(w),e=e||s(a),t=t||s(b),b[0].style.position="",b[0].style.top=""};c.calculateDropdownPos=function(){if(h.open){if(b=angular.element(a).querySelectorAll(".ui-select-dropdown"),0===b.length)return;b[0].style.opacity=0,n(function(){if("up"===h.dropdownPosition)x();else{a.removeClass(w);var t=s(a),i=s(b),c=e[0].documentElement.scrollTop||e[0].body.scrollTop;t.top+t.height+i.height>c+e[0].documentElement.clientHeight?x(t,i):y(t,i)}b[0].style.opacity=1})}else{if(null===b||0===b.length)return;b[0].style.position="",b[0].style.top="",a.removeClass(w)}}}}}}]),i.directive("uiSelectMatch",["uiSelectConfig",function(e){return{restrict:"EA",require:"^uiSelect",replace:!0,transclude:!0,templateUrl:function(t){t.addClass("ui-select-match");var i=t.parent().attr("theme")||e.theme,s=t.parent().attr("multiple");return i+(s?"/match-multiple.tpl.html":"/match.tpl.html")},link:function(t,i,s,c){function l(e){c.allowClear=!!angular.isDefined(e)&&(""===e||"true"===e.toLowerCase())}c.lockChoiceExpression=s.uiLockChoice,s.$observe("placeholder",function(t){c.placeholder=void 0!==t?t:e.placeholder}),s.$observe("allowClear",l),l(s.allowClear),c.multiple&&c.sizeSearchInput()}}}]),i.directive("uiSelectMultiple",["uiSelectMinErr","$timeout",function(t,i){return{restrict:"EA",require:["^uiSelect","^ngModel"],controller:["$scope","$timeout",function(e,t){var i,s=this,c=e.$select;angular.isUndefined(c.selected)&&(c.selected=[]),e.$evalAsync(function(){i=e.ngModel}),s.activeMatchIndex=-1,s.updateModel=function(){i.$setViewValue(Date.now()),s.refreshComponent()},s.refreshComponent=function(){c.refreshItems(),c.sizeSearchInput()},s.removeChoice=function(i){var l=c.selected[i];if(!l._uiSelectChoiceLocked){var n={};n[c.parserResult.itemName]=l,c.selected.splice(i,1),s.activeMatchIndex=-1,c.sizeSearchInput(),t(function(){c.onRemoveCallback(e,{$item:l,$model:c.parserResult.modelMapper(e,n)})}),s.updateModel()}},s.getPlaceholder=function(){if(!c.selected||!c.selected.length)return c.placeholder}}],controllerAs:"$selectMultiple",link:function(s,c,l,n){function a(e){return angular.isNumber(e.selectionStart)?e.selectionStart:e.value.length}function r(t){function i(){switch(t){case e.LEFT:return~g.activeMatchIndex?u:n;case e.RIGHT:return~g.activeMatchIndex&&r!==n?o:(d.activate(),!1);case e.BACKSPACE:return~g.activeMatchIndex?(g.removeChoice(r),u):n;case e.DELETE:return!!~g.activeMatchIndex&&(g.removeChoice(g.activeMatchIndex),r)}}var s=a(d.searchInput[0]),c=d.selected.length,l=0,n=c-1,r=g.activeMatchIndex,o=g.activeMatchIndex+1,u=g.activeMatchIndex-1,p=r;return!(s>0||d.search.length&&t==e.RIGHT)&&(d.close(),p=i(),d.selected.length&&p!==!1?g.activeMatchIndex=Math.min(n,Math.max(l,p)):g.activeMatchIndex=-1,!0)}function o(e){if(void 0===e||void 0===d.search)return!1;var t=e.filter(function(e){return void 0!==d.search.toUpperCase()&&void 0!==e&&e.toUpperCase()===d.search.toUpperCase()}).length>0;return t}function u(e,t){var i=-1;if(angular.isArray(e))for(var s=angular.copy(e),c=0;c<s.length;c++)if(void 0===d.tagging.fct)s[c]+" "+d.taggingLabel===t&&(i=c);else{var l=s[c];angular.isObject(l)&&(l.isTag=!0),angular.equals(l,t)&&(i=c)}return i}var d=n[0],p=s.ngModel=n[1],g=s.$selectMultiple;d.multiple=!0,d.removeSelected=!0,d.focusInput=d.searchInput,p.$parsers.unshift(function(){for(var e,t={},i=[],c=d.selected.length-1;c>=0;c--)t={},t[d.parserResult.itemName]=d.selected[c],e=d.parserResult.modelMapper(s,t),i.unshift(e);return i}),p.$formatters.unshift(function(e){var t,i=d.parserResult.source(s,{$select:{search:""}}),c={};if(!i)return e;var l=[],n=function(e,i){if(e&&e.length){for(var n=e.length-1;n>=0;n--){if(c[d.parserResult.itemName]=e[n],t=d.parserResult.modelMapper(s,c),d.parserResult.trackByExp){var a=/(\w*)\./.exec(d.parserResult.trackByExp),r=/\.([^\s]+)/.exec(d.parserResult.trackByExp);if(a&&a.length>0&&a[1]==d.parserResult.itemName&&r&&r.length>0&&t[r[1]]==i[r[1]])return l.unshift(e[n]),!0}if(angular.equals(t,i))return l.unshift(e[n]),!0}return!1}};if(!e)return l;for(var a=e.length-1;a>=0;a--)n(d.selected,e[a])||n(i,e[a])||l.unshift(e[a]);return l}),s.$watchCollection(function(){return p.$modelValue},function(e,t){t!=e&&(p.$modelValue=null,g.refreshComponent())}),p.$render=function(){if(!angular.isArray(p.$viewValue)){if(!angular.isUndefined(p.$viewValue)&&null!==p.$viewValue)throw t("multiarr","Expected model value to be array but got '{0}'",p.$viewValue);d.selected=[]}d.selected=p.$viewValue,s.$evalAsync()},s.$on("uis:select",function(e,t){d.selected.length>=d.limit||(d.selected.push(t),g.updateModel())}),s.$on("uis:activate",function(){g.activeMatchIndex=-1}),s.$watch("$select.disabled",function(e,t){t&&!e&&d.sizeSearchInput()}),d.searchInput.on("keydown",function(t){var i=t.which;s.$apply(function(){var s=!1;e.isHorizontalMovement(i)&&(s=r(i)),s&&i!=e.TAB&&(t.preventDefault(),t.stopPropagation())})}),d.searchInput.on("keyup",function(t){if(e.isVerticalMovement(t.which)||s.$evalAsync(function(){d.activeIndex=d.taggingLabel===!1?-1:0}),d.tagging.isActivated&&d.search.length>0){if(t.which===e.TAB||e.isControl(t)||e.isFunctionKey(t)||t.which===e.ESC||e.isVerticalMovement(t.which))return;if(d.activeIndex=d.taggingLabel===!1?-1:0,d.taggingLabel===!1)return;var i,c,l,n,a=angular.copy(d.items),r=angular.copy(d.items),p=!1,g=-1;if(void 0!==d.tagging.fct){if(l=d.$filter("filter")(a,{isTag:!0}),l.length>0&&(n=l[0]),a.length>0&&n&&(p=!0,a=a.slice(1,a.length),r=r.slice(1,r.length)),i=d.tagging.fct(d.search),i.isTag=!0,r.filter(function(e){return angular.equals(e,d.tagging.fct(d.search))}).length>0)return;i.isTag=!0}else{if(l=d.$filter("filter")(a,function(e){return e.match(d.taggingLabel)}),l.length>0&&(n=l[0]),c=a[0],void 0!==c&&a.length>0&&n&&(p=!0,a=a.slice(1,a.length),r=r.slice(1,r.length)),i=d.search+" "+d.taggingLabel,u(d.selected,d.search)>-1)return;if(o(r.concat(d.selected)))return void(p&&(a=r,s.$evalAsync(function(){d.activeIndex=0,d.items=a})));if(o(r))return void(p&&(d.items=r.slice(1,r.length)))}p&&(g=u(d.selected,i)),g>-1?a=a.slice(g+1,a.length-1):(a=[],a.push(i),a=a.concat(r)),s.$evalAsync(function(){d.activeIndex=0,d.items=a})}}),d.searchInput.on("blur",function(){i(function(){g.activeMatchIndex=-1})})}}}]),i.directive("uiSelectSingle",["$timeout","$compile",function(t,i){return{restrict:"EA",require:["^uiSelect","^ngModel"],link:function(s,c,l,n){var a=n[0],r=n[1];r.$parsers.unshift(function(e){var t,i={};return i[a.parserResult.itemName]=e,t=a.parserResult.modelMapper(s,i)}),r.$formatters.unshift(function(e){var t,i=a.parserResult.source(s,{$select:{search:""}}),c={};if(i){var l=function(i){return c[a.parserResult.itemName]=i,t=a.parserResult.modelMapper(s,c),t==e};if(a.selected&&l(a.selected))return a.selected;for(var n=i.length-1;n>=0;n--)if(l(i[n]))return i[n]}return e}),s.$watch("$select.selected",function(e){r.$viewValue!==e&&r.$setViewValue(e)}),r.$render=function(){a.selected=r.$viewValue},s.$on("uis:select",function(e,t){a.selected=t}),s.$on("uis:close",function(e,i){t(function(){a.focusser.prop("disabled",!1),i||a.focusser[0].focus()},0,!1)}),s.$on("uis:activate",function(){o.prop("disabled",!0)});var o=angular.element("<input ng-disabled='$select.disabled' class='ui-select-focusser ui-select-offscreen' type='text' id='{{ $select.focusserId }}' aria-label='{{ $select.focusserTitle }}' aria-haspopup='true' role='button' />");i(o)(s),a.focusser=o,a.focusInput=o,c.parent().append(o),o.bind("focus",function(){s.$evalAsync(function(){a.focus=!0})}),o.bind("blur",function(){s.$evalAsync(function(){a.focus=!1})}),o.bind("keydown",function(t){return t.which===e.BACKSPACE?(t.preventDefault(),t.stopPropagation(),a.select(void 0),void s.$apply()):void(t.which===e.TAB||e.isControl(t)||e.isFunctionKey(t)||t.which===e.ESC||(t.which!=e.DOWN&&t.which!=e.UP&&t.which!=e.ENTER&&t.which!=e.SPACE||(t.preventDefault(),t.stopPropagation(),a.activate()),s.$digest()))}),o.bind("keyup input",function(t){t.which===e.TAB||e.isControl(t)||e.isFunctionKey(t)||t.which===e.ESC||t.which==e.ENTER||t.which===e.BACKSPACE||(a.activate(o.val()),o.val(""),s.$digest())})}}}]),i.directive("uiSelectSort",["$timeout","uiSelectConfig","uiSelectMinErr",function(e,t,i){return{require:"^^uiSelect",link:function(t,s,c,l){if(null===t[c.uiSelectSort])throw i("sort","Expected a list to sort");var n=angular.extend({axis:"horizontal"},t.$eval(c.uiSelectSortOptions)),a=n.axis,r="dragging",o="dropping",u="dropping-before",d="dropping-after";t.$watch(function(){return l.sortable},function(e){e?s.attr("draggable",!0):s.removeAttr("draggable")}),s.on("dragstart",function(e){s.addClass(r),(e.dataTransfer||e.originalEvent.dataTransfer).setData("text/plain",t.$index)}),s.on("dragend",function(){s.removeClass(r)});var p,g=function(e,t){this.splice(t,0,this.splice(e,1)[0])},h=function(e){e.preventDefault();var t="vertical"===a?e.offsetY||e.layerY||(e.originalEvent?e.originalEvent.offsetY:0):e.offsetX||e.layerX||(e.originalEvent?e.originalEvent.offsetX:0);t<this["vertical"===a?"offsetHeight":"offsetWidth"]/2?(s.removeClass(d),s.addClass(u)):(s.removeClass(u),s.addClass(d))},f=function(t){t.preventDefault();var i=parseInt((t.dataTransfer||t.originalEvent.dataTransfer).getData("text/plain"),10);e.cancel(p),p=e(function(){v(i)},20)},v=function(e){var i=t.$eval(c.uiSelectSort),l=i[e],n=null;n=s.hasClass(u)?e<t.$index?t.$index-1:t.$index:e<t.$index?t.$index:t.$index+1,g.apply(i,[e,n]),t.$apply(function(){t.$emit("uiSelectSort:change",{array:i,item:l,from:e,to:n})}),s.removeClass(o),s.removeClass(u),s.removeClass(d),s.off("drop",f)};s.on("dragenter",function(){s.hasClass(r)||(s.addClass(o),s.on("dragover",h),s.on("drop",f))}),s.on("dragleave",function(e){e.target==s&&(s.removeClass(o),s.removeClass(u),s.removeClass(d),s.off("dragover",h),s.off("drop",f))})}}}]),i.service("uisRepeatParser",["uiSelectMinErr","$parse",function(e,t){var i=this;i.parse=function(i){var s,c=/\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)/.test(i);if(s=i.match(/^\s*(?:([\s\S]+?)\s+as\s+)?(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(([\w\.]+)?\s*(|\s*[\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),!s)throw e("iexp","Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",i);if(!s[6]&&c)throw e("iexp","Expected expression in form of '_item_ as (_key_, _item_) in _ObjCollection_ [ track by _id_]' but got '{0}'.",i);return{itemName:s[4]||s[2],keyName:s[3],source:t(s[3]?s[6]:s[5]),sourceName:s[6],filters:s[7],trackByExp:s[8],modelMapper:t(s[1]||s[4]||s[2]),repeatExpression:function(e){var t=this.itemName+" in "+(e?"$group.items":"$select.items");return this.trackByExp&&(t+=" track by "+this.trackByExp),t}}},i.getGroupNgRepeatExpression=function(){return"$group in $select.groups"}}])}(),angular.module("ui.select").run(["$templateCache",function(e){e.put("bootstrap/choices.tpl.html",'<ul class="ui-select-choices ui-select-choices-content ui-select-dropdown dropdown-menu" role="listbox" ng-show="$select.items.length > 0"><li class="ui-select-choices-group" id="ui-select-choices-{{ $select.generatedId }}"><div class="divider" ng-show="$select.isGrouped && $index > 0"></div><div ng-show="$select.isGrouped" class="ui-select-choices-group-label dropdown-header" ng-bind="$group.name"></div><div id="ui-select-choices-row-{{ $select.generatedId }}-{{$index}}" class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}" role="option"><a href="" class="ui-select-choices-row-inner"></a></div></li></ul>'),e.put("bootstrap/match-multiple.tpl.html",'<span class="ui-select-match"><span ng-repeat="$item in $select.selected"><span class="ui-select-match-item btn btn-default btn-xs" tabindex="-1" type="button" ng-disabled="$select.disabled" ng-click="$selectMultiple.activeMatchIndex = $index;" ng-class="{\'btn-primary\':$selectMultiple.activeMatchIndex === $index, \'select-locked\':$select.isLocked(this, $index)}" ui-select-sort="$select.selected"><span class="close ui-select-match-close" ng-hide="$select.disabled" ng-click="$selectMultiple.removeChoice($index)">&nbsp;&times;</span> <span uis-transclude-append=""></span></span></span></span>'),e.put("bootstrap/match.tpl.html",'<div class="ui-select-match" ng-hide="$select.open" ng-disabled="$select.disabled" ng-class="{\'btn-default-focus\':$select.focus}"><span tabindex="-1" class="btn btn-default form-control ui-select-toggle" aria-label="{{ $select.baseTitle }} activate" ng-disabled="$select.disabled" ng-click="$select.activate()" style="outline: 0;"><span ng-show="$select.isEmpty()" class="ui-select-placeholder text-muted">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" class="ui-select-match-text pull-left" ng-class="{\'ui-select-allow-clear\': $select.allowClear && !$select.isEmpty()}" ng-transclude=""></span> <i class="caret pull-right" ng-click="$select.toggle($event)"></i> <a ng-show="$select.allowClear && !$select.isEmpty()" aria-label="{{ $select.baseTitle }} clear" style="margin-right: 10px" ng-click="$select.clear($event)" class="btn btn-xs btn-link pull-right"><i class="glyphicon glyphicon-remove" aria-hidden="true"></i></a></span></div>'),e.put("bootstrap/select-multiple.tpl.html",'<div class="ui-select-container ui-select-multiple ui-select-bootstrap dropdown form-control" ng-class="{open: $select.open}"><div><div class="ui-select-match"></div><input type="text" autocomplete="false" autocorrect="off" autocapitalize="off" spellcheck="false" class="ui-select-search input-xs" placeholder="{{$selectMultiple.getPlaceholder()}}" ng-disabled="$select.disabled" ng-hide="$select.disabled" ng-click="$select.activate()" ng-model="$select.search" role="combobox" aria-label="{{ $select.baseTitle }}" ondrop="return false;"></div><div class="ui-select-choices"></div></div>'),e.put("bootstrap/select.tpl.html",'<div class="ui-select-container ui-select-bootstrap dropdown" ng-class="{open: $select.open}"><div class="ui-select-match"></div><input type="text" autocomplete="false" tabindex="-1" aria-expanded="true" aria-label="{{ $select.baseTitle }}" aria-owns="ui-select-choices-{{ $select.generatedId }}" aria-activedescendant="ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}" class="form-control ui-select-search" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-show="$select.searchEnabled && $select.open"><div class="ui-select-choices"></div></div>'),
e.put("select2/choices.tpl.html",'<ul class="ui-select-choices ui-select-choices-content select2-results"><li class="ui-select-choices-group" ng-class="{\'select2-result-with-children\': $select.choiceGrouped($group) }"><div ng-show="$select.choiceGrouped($group)" class="ui-select-choices-group-label select2-result-label" ng-bind="$group.name"></div><ul role="listbox" id="ui-select-choices-{{ $select.generatedId }}" ng-class="{\'select2-result-sub\': $select.choiceGrouped($group), \'select2-result-single\': !$select.choiceGrouped($group) }"><li role="option" id="ui-select-choices-row-{{ $select.generatedId }}-{{$index}}" class="ui-select-choices-row" ng-class="{\'select2-highlighted\': $select.isActive(this), \'select2-disabled\': $select.isDisabled(this)}"><div class="select2-result-label ui-select-choices-row-inner"></div></li></ul></li></ul>'),e.put("select2/match-multiple.tpl.html",'<span class="ui-select-match"><li class="ui-select-match-item select2-search-choice" ng-repeat="$item in $select.selected" ng-class="{\'select2-search-choice-focus\':$selectMultiple.activeMatchIndex === $index, \'select2-locked\':$select.isLocked(this, $index)}" ui-select-sort="$select.selected"><span uis-transclude-append=""></span> <a href="javascript:;" class="ui-select-match-close select2-search-choice-close" ng-click="$selectMultiple.removeChoice($index)" tabindex="-1"></a></li></span>'),e.put("select2/match.tpl.html",'<a class="select2-choice ui-select-match" ng-class="{\'select2-default\': $select.isEmpty()}" ng-click="$select.toggle($event)" aria-label="{{ $select.baseTitle }} select"><span ng-show="$select.isEmpty()" class="select2-chosen">{{$select.placeholder}}</span> <span ng-hide="$select.isEmpty()" class="select2-chosen" ng-transclude=""></span> <abbr ng-if="$select.allowClear && !$select.isEmpty()" class="select2-search-choice-close" ng-click="$select.clear($event)"></abbr> <span class="select2-arrow ui-select-toggle"><b></b></span></a>'),e.put("select2/select-multiple.tpl.html",'<div class="ui-select-container ui-select-multiple select2 select2-container select2-container-multi" ng-class="{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled}"><ul class="select2-choices"><span class="ui-select-match"></span><li class="select2-search-field"><input type="text" autocomplete="false" autocorrect="off" autocapitalize="off" spellcheck="false" role="combobox" aria-expanded="true" aria-owns="ui-select-choices-{{ $select.generatedId }}" aria-label="{{ $select.baseTitle }}" aria-activedescendant="ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}" class="select2-input ui-select-search" placeholder="{{$selectMultiple.getPlaceholder()}}" ng-disabled="$select.disabled" ng-hide="$select.disabled" ng-model="$select.search" ng-click="$select.activate()" style="width: 34px;" ondrop="return false;"></li></ul><div class="ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open}"><div class="ui-select-choices"></div></div></div>'),e.put("select2/select.tpl.html",'<div class="ui-select-container select2 select2-container" ng-class="{\'select2-container-active select2-dropdown-open open\': $select.open, \'select2-container-disabled\': $select.disabled, \'select2-container-active\': $select.focus, \'select2-allowclear\': $select.allowClear && !$select.isEmpty()}"><div class="ui-select-match"></div><div class="ui-select-dropdown select2-drop select2-with-searchbox select2-drop-active" ng-class="{\'select2-display-none\': !$select.open}"><div class="select2-search" ng-show="$select.searchEnabled"><input type="text" autocomplete="false" autocorrect="false" autocapitalize="off" spellcheck="false" role="combobox" aria-expanded="true" aria-owns="ui-select-choices-{{ $select.generatedId }}" aria-label="{{ $select.baseTitle }}" aria-activedescendant="ui-select-choices-row-{{ $select.generatedId }}-{{ $select.activeIndex }}" class="ui-select-search select2-input" ng-model="$select.search"></div><div class="ui-select-choices"></div></div></div>'),e.put("selectize/choices.tpl.html",'<div ng-show="$select.open" class="ui-select-choices ui-select-dropdown selectize-dropdown single"><div class="ui-select-choices-content selectize-dropdown-content"><div class="ui-select-choices-group optgroup" role="listbox"><div ng-show="$select.isGrouped" class="ui-select-choices-group-label optgroup-header" ng-bind="$group.name"></div><div role="option" class="ui-select-choices-row" ng-class="{active: $select.isActive(this), disabled: $select.isDisabled(this)}"><div class="option ui-select-choices-row-inner" data-selectable=""></div></div></div></div></div>'),e.put("selectize/match.tpl.html",'<div ng-hide="($select.open || $select.isEmpty())" class="ui-select-match" ng-transclude=""></div>'),e.put("selectize/select.tpl.html",'<div class="ui-select-container selectize-control single" ng-class="{\'open\': $select.open}"><div class="selectize-input" ng-class="{\'focus\': $select.open, \'disabled\': $select.disabled, \'selectize-focus\' : $select.focus}" ng-click="$select.open && !$select.searchEnabled ? $select.toggle($event) : $select.activate()"><div class="ui-select-match"></div><input type="text" autocomplete="false" tabindex="-1" class="ui-select-search ui-select-toggle" ng-click="$select.toggle($event)" placeholder="{{$select.placeholder}}" ng-model="$select.search" ng-hide="!$select.searchEnabled || ($select.selected && !$select.open)" ng-disabled="$select.disabled" aria-label="{{ $select.baseTitle }}"></div><div class="ui-select-choices"></div></div>')}]);