!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../clike/clike")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../clike/clike"],e):e(CodeMirror)}(function(e){"use strict";function t(e){for(var t={},n=0;n<e.length;++n)t[e[n]]=!0;return t}function n(e){(e.interpolationStack||(e.interpolationStack=[])).push(e.tokenize)}function i(e){return(e.interpolationStack||(e.interpolationStack=[])).pop()}function r(e){return e.interpolationStack?e.interpolationStack.length:0}function o(e,t,i,r){function o(t,i){for(var o=!1;!t.eol();){if(!r&&!o&&"$"==t.peek())return n(i),i.tokenize=a,"string";var l=t.next();if(l==e&&!o&&(!c||t.match(e+e))){i.tokenize=null;break}o=!r&&!o&&"\\"==l}return"string"}var c=!1;if(t.eat(e)){if(!t.eat(e))return"string";c=!0}return i.tokenize=o,o(t,i)}function a(e,t){return e.eat("$"),e.eat("{")?t.tokenize=null:t.tokenize=c,null}function c(e,t){return e.eatWhile(/[\w_]/),t.tokenize=i(t),"variable"}var l="this super static final const abstract class extends external factory implements get native operator set typedef with enum throw rethrow assert break case continue default in return new deferred async await try catch finally do else for if switch while import library export part of show hide is as".split(" "),u="try catch finally do else for if switch while".split(" "),f="true false null".split(" "),s="void bool num int double dynamic var String".split(" ");e.defineMIME("application/dart",{name:"clike",keywords:t(l),blockKeywords:t(u),builtin:t(s),atoms:t(f),hooks:{"@":function(e){return e.eatWhile(/[\w\$_\.]/),"meta"},"'":function(e,t){return o("'",e,t,!1)},'"':function(e,t){return o('"',e,t,!1)},r:function(e,t){var n=e.peek();return("'"==n||'"'==n)&&o(e.next(),e,t,!0)},"}":function(e,t){return r(t)>0&&(t.tokenize=i(t),null)}}}),e.registerHelper("hintWords","application/dart",l.concat(f).concat(s)),e.defineMode("dart",function(t){return e.getMode(t,"application/dart")},"clike")});