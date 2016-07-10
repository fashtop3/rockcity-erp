/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Version: 3.3.1
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 * 
 */

// APP START
// ----------------------------------- 

(function() {
    'use strict';

    angular
        .module('angle', [
            'app.core',
            'app.routes',
            'app.sidebar',
            'app.navsearch',
            'app.preloader',
            'app.loadingbar',
            'app.translate',
            'app.settings',
            //'app.dashboard',
            'app.icons',
            'app.flatdoc',
            'app.notify',
            'app.bootstrapui',
            'app.elements',
            'app.panels',
            'app.charts',
            'app.forms',
            'app.locale',
            'app.maps',
            'app.pages',
            'app.tables',
            'app.extras',
            'app.mailbox',
            'app.utils',
            'app.order',
            //import
            'app.affix',
            'app.datetime',
        ])
})();


(function() {
    'use strict';

    angular
        .module('app.affix', [
            'ngStrap.affix'
        ]);
})();

(function() {
    'use strict';

    angular
        .module('app.bootstrapui', []);
})();
(function() {
    'use strict';

    angular
        .module('app.charts', []);
})();
(function() {
    'use strict';

    angular
        .module('app.colors', []);
})();
(function() {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngAnimate',
            'ngStorage',
            'ngCookies',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.router',

            //permission injection
            'permission',
            'permission.ui',

            'oc.lazyLoad',
            'cfp.loadingBar',
            'ngSanitize',
            'ngResource',
            'tmh.dynamicLocale',
            'ui.utils'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.dashboard', []);
})();
/**
 * Created by dfash on 5/3/16.
 */

(function() {
    'use strict';

    angular
        .module('app.datetime', [
            'mgcrea.ngStrap.core',
            'mgcrea.ngStrap.timepicker',
            'mgcrea.ngStrap.datepicker'
        ]);
})();

(function() {
    'use strict';

    angular
        .module('app.elements', []);
})();
(function() {
    'use strict';

    angular
        .module('app.extras', []);
})();
(function() {
    'use strict';

    angular
        .module('app.flatdoc', []);
})();
(function() {
    'use strict';

    angular
        .module('app.forms', []);
})();
(function() {
    'use strict';

    angular
        .module('app.icons', []);
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload', []);
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.locale', []);
})();
(function() {
    'use strict';

    angular
        .module('app.mailbox', []);
})();
(function() {
    'use strict';

    angular
        .module('app.maps', []);
})();
(function() {
    'use strict';

    angular
        .module('app.navsearch', []);
})();
(function() {
    'use strict';

    angular
        .module('app.notify', []);
})();
(function() {
    'use strict';

    angular
        .module('app.pages', []);
})();
(function() {
    'use strict';

    angular
        .module('app.panels', []);
})();
(function() {
    'use strict';

    angular
        .module('app.preloader', []);
})();


(function() {
    'use strict';

    angular
        .module('app.routes', [
            'app.lazyload'
        ]);
})();
(function() {
    'use strict';

    angular
        .module('app.settings', []);
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar', []);
})();
(function() {
    'use strict';

    angular
        .module('app.tables', []);
})();
(function() {
    'use strict';

    angular
        .module('app.translate', []);
})();
(function() {
    'use strict';

    angular
        .module('app.utils', [
          'app.colors'
          ]);
})();

(function(){
    'use strict';

    angular
        .module('ngStrap.affix', ['mgcrea.ngStrap.helpers.dimensions', 'mgcrea.ngStrap.helpers.debounce'])
        .provider('$affix', function () {

            var defaults = this.defaults = {
                offsetTop: 'auto',
                inlineStyles: true
            };

            this.$get = ["$window", "debounce", "dimensions", function ($window, debounce, dimensions) {

                var bodyEl = angular.element($window.document.body);
                var windowEl = angular.element($window);

                function AffixFactory (element, config) {

                    var $affix = {};

                    // Common vars
                    var options = angular.extend({}, defaults, config);
                    var targetEl = options.target;

                    // Initial private vars
                    var reset = 'affix affix-top affix-bottom';
                    var setWidth = false;
                    var initialAffixTop = 0;
                    var initialOffsetTop = 0;
                    var offsetTop = 0;
                    var offsetBottom = 0;
                    var affixed = null;
                    var unpin = null;

                    var parent = element.parent();
                    // Options: custom parent
                    if (options.offsetParent) {
                        if (options.offsetParent.match(/^\d+$/)) {
                            for (var i = 0; i < (options.offsetParent * 1) - 1; i++) {
                                parent = parent.parent();
                            }
                        } else {
                            parent = angular.element(options.offsetParent);
                        }
                    }

                    $affix.init = function () {

                        this.$parseOffsets();
                        initialOffsetTop = dimensions.offset(element[0]).top + initialAffixTop;
                        setWidth = !element[0].style.width;

                        // Bind events
                        targetEl.on('scroll', this.checkPosition);
                        targetEl.on('click', this.checkPositionWithEventLoop);
                        windowEl.on('resize', this.$debouncedOnResize);

                        // Both of these checkPosition() calls are necessary for the case where
                        // the user hits refresh after scrolling to the bottom of the page.
                        this.checkPosition();
                        this.checkPositionWithEventLoop();

                    };

                    $affix.destroy = function () {

                        // Unbind events
                        targetEl.off('scroll', this.checkPosition);
                        targetEl.off('click', this.checkPositionWithEventLoop);
                        windowEl.off('resize', this.$debouncedOnResize);

                    };

                    $affix.checkPositionWithEventLoop = function () {

                        // IE 9 throws an error if we use 'this' instead of '$affix'
                        // in this setTimeout call
                        setTimeout($affix.checkPosition, 1);

                    };

                    $affix.checkPosition = function () {
                        // if (!this.$element.is(':visible')) return

                        var scrollTop = getScrollTop();
                        var position = dimensions.offset(element[0]);
                        var elementHeight = dimensions.height(element[0]);

                        // Get required affix class according to position
                        var affix = getRequiredAffixClass(unpin, position, elementHeight);

                        // Did affix status changed this last check?
                        if (affixed === affix) return;
                        affixed = affix;

                        if (affix === 'top') {
                            unpin = null;
                            if (setWidth) {
                                element.css('width', '');
                            }
                            if (options.inlineStyles) {
                                element.css('position', (options.offsetParent) ? '' : 'relative');
                                element.css('top', '');
                            }
                        } else if (affix === 'bottom') {
                            if (options.offsetUnpin) {
                                unpin = -(options.offsetUnpin * 1);
                            } else {
                                // Calculate unpin threshold when affixed to bottom.
                                // Hopefully the browser scrolls pixel by pixel.
                                unpin = position.top - scrollTop;
                            }
                            if (setWidth) {
                                element.css('width', '');
                            }
                            if (options.inlineStyles) {
                                element.css('position', (options.offsetParent) ? '' : 'relative');
                                element.css('top', (options.offsetParent) ? '' : ((bodyEl[0].offsetHeight - offsetBottom - elementHeight - initialOffsetTop) + 'px'));
                            }
                        } else { // affix === 'middle'
                            unpin = null;
                            if (setWidth) {
                                element.css('width', element[0].offsetWidth + 'px');
                            }
                            if (options.inlineStyles) {
                                element.css('position', 'fixed');
                                element.css('top', initialAffixTop + 'px');
                            }
                        }

                        // Add proper affix class
                        element.removeClass(reset).addClass('affix' + ((affix !== 'middle') ? '-' + affix : ''));

                    };

                    $affix.$onResize = function () {
                        $affix.$parseOffsets();
                        $affix.checkPosition();
                    };
                    $affix.$debouncedOnResize = debounce($affix.$onResize, 50);

                    $affix.$parseOffsets = function () {
                        var initialPosition = element.css('position');
                        // Reset position to calculate correct offsetTop
                        if (options.inlineStyles) {
                            element.css('position', (options.offsetParent) ? '' : 'relative');
                        }

                        if (options.offsetTop) {
                            if (options.offsetTop === 'auto') {
                                options.offsetTop = '+0';
                            }
                            if (options.offsetTop.match(/^[-+]\d+$/)) {
                                initialAffixTop = - options.offsetTop * 1;
                                if (options.offsetParent) {
                                    offsetTop = dimensions.offset(parent[0]).top + (options.offsetTop * 1);
                                } else {
                                    offsetTop = dimensions.offset(element[0]).top - dimensions.css(element[0], 'marginTop', true) + (options.offsetTop * 1);
                                }
                            } else {
                                offsetTop = options.offsetTop * 1;
                            }
                        }

                        if (options.offsetBottom) {
                            if (options.offsetParent && options.offsetBottom.match(/^[-+]\d+$/)) {
                                // add 1 pixel due to rounding problems...
                                offsetBottom = getScrollHeight() - (dimensions.offset(parent[0]).top + dimensions.height(parent[0])) + (options.offsetBottom * 1) + 1;
                            } else {
                                offsetBottom = options.offsetBottom * 1;
                            }
                        }

                        // Bring back the element's position after calculations
                        if (options.inlineStyles) {
                            element.css('position', initialPosition);
                        }
                    };

                    // Private methods

                    function getRequiredAffixClass (_unpin, position, elementHeight) {
                        var scrollTop = getScrollTop();
                        var scrollHeight = getScrollHeight();

                        if (scrollTop <= offsetTop) {
                            return 'top';
                        } else if (_unpin !== null && (scrollTop + _unpin <= position.top)) {
                            return 'middle';
                        } else if (offsetBottom !== null && (position.top + elementHeight + initialAffixTop >= scrollHeight - offsetBottom)) {
                            return 'bottom';
                        }
                        return 'middle';
                    }

                    function getScrollTop () {
                        return targetEl[0] === $window ? $window.pageYOffset : targetEl[0].scrollTop;
                    }

                    function getScrollHeight () {
                        return targetEl[0] === $window ? $window.document.body.scrollHeight : targetEl[0].scrollHeight;
                    }

                    $affix.init();
                    return $affix;

                }

                return AffixFactory;

            }];

        })

        .directive('bsAffix', ["$affix", "$window", function ($affix, $window) {

            return {
                restrict: 'EAC',
                require: '^?bsAffixTarget',
                link: function postLink (scope, element, attr, affixTarget) {

                    var options = {scope: scope, target: affixTarget ? affixTarget.$element : angular.element($window)};
                    angular.forEach(['offsetTop', 'offsetBottom', 'offsetParent', 'offsetUnpin', 'inlineStyles'], function (key) {
                        if (angular.isDefined(attr[key])) {
                            var option = attr[key];
                            if (/true/i.test(option)) option = true;
                            if (/false/i.test(option)) option = false;
                            options[key] = option;
                        }
                    });

                    var affix = $affix(element, options);
                    scope.$on('$destroy', function () {
                        if (affix) affix.destroy();
                        options = null;
                        affix = null;
                    });

                }
            };

        }])

        .directive('bsAffixTarget', function () {
            return {
                controller: ["$element", function ($element) {
                    this.$element = $element;
                }]
            };
        });
})();

(function () {
    'use strict';

    angular.module('mgcrea.ngStrap.helpers.debounce', [])

        // @source jashkenas/underscore
        // @url https://github.com/jashkenas/underscore/blob/1.5.2/underscore.js#L693
        .factory('debounce', ["$timeout", function ($timeout) {
            return function (func, wait, immediate) {
                var timeout = null;
                return function () {
                    var context = this;
                    var args = arguments;
                    var callNow = immediate && !timeout;
                    if (timeout) {
                        $timeout.cancel(timeout);
                    }
                    timeout = $timeout(function later () {
                        timeout = null;
                        if (!immediate) {
                            func.apply(context, args);
                        }
                    }, wait, false);
                    if (callNow) {
                        func.apply(context, args);
                    }
                    return timeout;
                };
            };
        }])


// @source jashkenas/underscore
// @url https://github.com/jashkenas/underscore/blob/1.5.2/underscore.js#L661
        .factory('throttle', ["$timeout", function ($timeout) {
            return function (func, wait, options) {
                var timeout = null;
                if (!options) options = {};
                return function () {
                    var context = this;
                    var args = arguments;
                    if (!timeout) {
                        if (options.leading !== false) {
                            func.apply(context, args);
                        }
                        timeout = $timeout(function later () {
                            timeout = null;
                            if (options.trailing !== false) {
                                func.apply(context, args);
                            }
                        }, wait, false);
                    }
                };
            };
        }]);

})();
(function () {

    'use strict';

    angular.module('mgcrea.ngStrap.helpers.dimensions', [])

        .factory('dimensions', function () {

            var fn = {};

            /**
             * Test the element nodeName
             * @param element
             * @param name
             */
            var nodeName = fn.nodeName = function (element, name) {
                return element.nodeName && element.nodeName.toLowerCase() === name.toLowerCase();
            };

            /**
             * Returns the element computed style
             * @param element
             * @param prop
             * @param extra
             */
            fn.css = function (element, prop, extra) {
                var value;
                if (element.currentStyle) { // IE
                    value = element.currentStyle[prop];
                } else if (window.getComputedStyle) {
                    value = window.getComputedStyle(element)[prop];
                } else {
                    value = element.style[prop];
                }
                return extra === true ? parseFloat(value) || 0 : value;
            };

            /**
             * Provides read-only equivalent of jQuery's offset function:
             * @required-by bootstrap-tooltip, bootstrap-affix
             * @url http://api.jquery.com/offset/
             * @param element
             */
            fn.offset = function (element) {
                var boxRect = element.getBoundingClientRect();
                var docElement = element.ownerDocument;
                return {
                    width: boxRect.width || element.offsetWidth,
                    height: boxRect.height || element.offsetHeight,
                    top: boxRect.top + (window.pageYOffset || docElement.documentElement.scrollTop) - (docElement.documentElement.clientTop || 0),
                    left: boxRect.left + (window.pageXOffset || docElement.documentElement.scrollLeft) - (docElement.documentElement.clientLeft || 0)
                };
            };

            /**
             * Provides set equivalent of jQuery's offset function:
             * @required-by bootstrap-tooltip
             * @url http://api.jquery.com/offset/
             * @param element
             * @param options
             * @param i
             */
            fn.setOffset = function (element, options, i) {
                var curPosition;
                var curLeft;
                var curCSSTop;
                var curTop;
                var curOffset;
                var curCSSLeft;
                var calculatePosition;
                var position = fn.css(element, 'position');
                var curElem = angular.element(element);
                var props = {};

                // Set position first, in-case top/left are set even on static elem
                if (position === 'static') {
                    element.style.position = 'relative';
                }

                curOffset = fn.offset(element);
                curCSSTop = fn.css(element, 'top');
                curCSSLeft = fn.css(element, 'left');
                calculatePosition = (position === 'absolute' || position === 'fixed') &&
                    (curCSSTop + curCSSLeft).indexOf('auto') > -1;

                // Need to be able to calculate position if either
                // top or left is auto and position is either absolute or fixed
                if (calculatePosition) {
                    curPosition = fn.position(element);
                    curTop = curPosition.top;
                    curLeft = curPosition.left;
                } else {
                    curTop = parseFloat(curCSSTop) || 0;
                    curLeft = parseFloat(curCSSLeft) || 0;
                }

                if (angular.isFunction(options)) {
                    options = options.call(element, i, curOffset);
                }

                if (options.top !== null) {
                    props.top = (options.top - curOffset.top) + curTop;
                }
                if (options.left !== null) {
                    props.left = (options.left - curOffset.left) + curLeft;
                }

                if ('using' in options) {
                    options.using.call(curElem, props);
                } else {
                    curElem.css({
                        top: props.top + 'px',
                        left: props.left + 'px'
                    });
                }
            };

            /**
             * Provides read-only equivalent of jQuery's position function
             * @required-by bootstrap-tooltip, bootstrap-affix
             * @url http://api.jquery.com/offset/
             * @param element
             */
            fn.position = function (element) {

                var offsetParentRect = {top: 0, left: 0};
                var offsetParentEl;
                var offset;

                // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
                if (fn.css(element, 'position') === 'fixed') {

                    // We assume that getBoundingClientRect is available when computed position is fixed
                    offset = element.getBoundingClientRect();

                } else {

                    // Get *real* offsetParentEl
                    offsetParentEl = offsetParentElement(element);

                    // Get correct offsets
                    offset = fn.offset(element);
                    if (!nodeName(offsetParentEl, 'html')) {
                        offsetParentRect = fn.offset(offsetParentEl);
                    }

                    // Add offsetParent borders
                    offsetParentRect.top += fn.css(offsetParentEl, 'borderTopWidth', true);
                    offsetParentRect.left += fn.css(offsetParentEl, 'borderLeftWidth', true);
                }

                // Subtract parent offsets and element margins
                return {
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                    top: offset.top - offsetParentRect.top - fn.css(element, 'marginTop', true),
                    left: offset.left - offsetParentRect.left - fn.css(element, 'marginLeft', true)
                };

            };

            /**
             * Returns the closest, non-statically positioned offsetParent of a given element
             * @required-by fn.position
             * @param element
             */
            function offsetParentElement (element) {
                var docElement = element.ownerDocument;
                var offsetParent = element.offsetParent || docElement;
                if (nodeName(offsetParent, '#document')) return docElement.documentElement;
                while (offsetParent && !nodeName(offsetParent, 'html') && fn.css(offsetParent, 'position') === 'static') {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || docElement.documentElement;
            }

            /**
             * Provides equivalent of jQuery's height function
             * @required-by bootstrap-affix
             * @url http://api.jquery.com/height/
             * @param element
             * @param outer
             */
            fn.height = function (element, outer) {
                var value = element.offsetHeight;
                if (outer) {
                    value += fn.css(element, 'marginTop', true) + fn.css(element, 'marginBottom', true);
                } else {
                    value -= fn.css(element, 'paddingTop', true) + fn.css(element, 'paddingBottom', true) + fn.css(element, 'borderTopWidth', true) + fn.css(element, 'borderBottomWidth', true);
                }
                return value;
            };

            /**
             * Provides equivalent of jQuery's width function
             * @required-by bootstrap-affix
             * @url http://api.jquery.com/width/
             * @param element
             * @param outer
             */
            fn.width = function (element, outer) {
                var value = element.offsetWidth;
                if (outer) {
                    value += fn.css(element, 'marginLeft', true) + fn.css(element, 'marginRight', true);
                } else {
                    value -= fn.css(element, 'paddingLeft', true) + fn.css(element, 'paddingRight', true) + fn.css(element, 'borderLeftWidth', true) + fn.css(element, 'borderRightWidth', true);
                }
                return value;
            };

            return fn;

        });

})();
/**=========================================================
 * Module: demo-alerts.js
 * Provides a simple demo for pagination
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('AlertDemoCtrl', AlertDemoCtrl);

    function AlertDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.alerts = [
            { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
            { type: 'warning', msg: 'Well done! You successfully read this important alert message.' }
          ];

          vm.addAlert = function() {
            vm.alerts.push({msg: 'Another alert!'});
          };

          vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
          };
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .config(bootstrapuiConfig);

    bootstrapuiConfig.$inject = ['$uibTooltipProvider'];
    function bootstrapuiConfig($uibTooltipProvider){
      $uibTooltipProvider.options({appendToBody: true});
    }
})();
/**=========================================================
 * Module: demo-buttons.js
 * Provides a simple demo for buttons actions
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('ButtonsCtrl', ButtonsCtrl);

    function ButtonsCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.singleModel = 1;

          vm.radioModel = 'Middle';

          vm.checkModel = {
            left: false,
            middle: true,
            right: false
          };
        }
    }
})();

/**=========================================================
 * Module: demo-carousel.js
 * Provides a simple demo for bootstrap ui carousel
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('CarouselDemoCtrl', CarouselDemoCtrl);

    function CarouselDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.myInterval = 5000;

          var slides = vm.slides = [];
          vm.addSlide = function(id) {
            id = id || 8;
            slides.push({
              image: 'app/img/bg' + id + '.jpg',
              text: ['More','Extra','Lots of','Surplus'][slides.length % 2] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 2]
            });
          };

          vm.addSlide(4);
          vm.addSlide(7);
          vm.addSlide(8);

        }
    }
})();

/**=========================================================
 * Module: demo-datepicker.js
 * Provides a simple demo for bootstrap datepicker
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('DatepickerDemoCtrl', DatepickerDemoCtrl);

    function DatepickerDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.today = function() {
            vm.dt = new Date();
          };
          vm.today();

          vm.clear = function () {
            vm.dt = null;
          };

          // Disable weekend selection
          vm.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
          };

          vm.toggleMin = function() {
            vm.minDate = vm.minDate ? null : new Date();
          };
          vm.toggleMin();

          vm.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = true;
          };

          vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
          };

          vm.initDate = new Date('2019-10-20');
          vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
          vm.format = vm.formats[0];
        }
    }
})();


/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('ModalController', ModalController);

    ModalController.$inject = ['$uibModal'];
    function ModalController($uibModal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.open = function (size) {

            var modalInstance = $uibModal.open({
              templateUrl: '/myModalContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });

            var state = $('#modal-state');
            modalInstance.result.then(function () {
              state.text('Modal dismissed with OK status');
            }, function () {
              state.text('Modal dismissed with Cancel status');
            });
          };

          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance'];
          function ModalInstanceCtrl($scope, $uibModalInstance) {

            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
          }
        }
    }

})();

/**=========================================================
 * Module: demo-pagination.js
 * Provides a simple demo for pagination
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('PaginationDemoCtrl', PaginationDemoCtrl);

    function PaginationDemoCtrl() {
        var vm = this;


        activate();

        ////////////////

        function activate() {
          vm.totalItems = 64;
          vm.currentPage = 4;

          vm.setPage = function (pageNo) {
            vm.currentPage = pageNo;
          };

          vm.pageChanged = function() {
            console.log('Page changed to: ' + vm.currentPage);
          };

          vm.maxSize = 5;
          vm.bigTotalItems = 175;
          vm.bigCurrentPage = 1;
        }
    }
})();

/**=========================================================
 * Module: demo-popover.js
 * Provides a simple demo for popovers
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('PopoverDemoCtrl', PopoverDemoCtrl);

    function PopoverDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.dynamicPopover = 'Hello, World!';
          vm.dynamicPopoverTitle = 'Title';
        }
    }
})();

/**=========================================================
 * Module: demo-progress.js
 * Provides a simple demo to animate progress bar
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('ProgressDemoCtrl', ProgressDemoCtrl);

    function ProgressDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.max = 200;

          vm.random = function() {
            var value = Math.floor((Math.random() * 100) + 1);
            var type;

            if (value < 25) {
              type = 'success';
            } else if (value < 50) {
              type = 'info';
            } else if (value < 75) {
              type = 'warning';
            } else {
              type = 'danger';
            }

            vm.showWarning = (type === 'danger' || type === 'warning');

            vm.dynamic = value;
            vm.type = type;
          };
          vm.random();

          vm.randomStacked = function() {
            vm.stacked = [];
            var types = ['success', 'info', 'warning', 'danger'];

            for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
                var index = Math.floor((Math.random() * 4));
                vm.stacked.push({
                  value: Math.floor((Math.random() * 30) + 1),
                  type: types[index]
                });
            }
          };
          vm.randomStacked();
        }
    }
})();

/**=========================================================
 * Module: demo-rating.js
 * Provides a demo for ratings UI
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('RatingDemoCtrl', RatingDemoCtrl);

    function RatingDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.rate = 7;
          vm.max = 10;
          vm.isReadonly = false;

          vm.hoveringOver = function(value) {
            vm.overStar = value;
            vm.percent = 100 * (value / vm.max);
          };

          vm.ratingStates = [
            {stateOn: 'fa fa-check', stateOff: 'fa fa-check-circle'},
            {stateOn: 'fa fa-star', stateOff: 'fa fa-star-o'},
            {stateOn: 'fa fa-heart', stateOff: 'fa fa-ban'},
            {stateOn: 'fa fa-heart'},
            {stateOff: 'fa fa-power-off'}
          ];
        }
    }
})();

/**=========================================================
 * Module: demo-timepicker.js
 * Provides a simple demo for bootstrap ui timepicker
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('TimepickerDemoCtrl', TimepickerDemoCtrl);

    function TimepickerDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.mytime = new Date();

          vm.hstep = 1;
          vm.mstep = 15;

          vm.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
          };

          vm.ismeridian = true;
          vm.toggleMode = function() {
            vm.ismeridian = ! vm.ismeridian;
          };

          vm.update = function() {
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            vm.mytime = d;
          };

          vm.changed = function () {
            console.log('Time changed to: ' + vm.mytime);
          };

          vm.clear = function() {
            vm.mytime = null;
          };
        }
    }
})();

/**=========================================================
 * Module: demo-tooltip.js
 * Provides a simple demo for tooltip
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('TooltipDemoCtrl', TooltipDemoCtrl);

    function TooltipDemoCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.dynamicTooltip = 'Hello, World!';
          vm.dynamicTooltipText = 'dynamic';
          vm.htmlTooltip = 'I\'ve been made <b>bold</b>!';

          vm.autoplace = function (context, source) {
            //return (predictTooltipTop(source) < 0) ?  "bottom": "top";
            var pos = 'top';
            if(predictTooltipTop(source) < 0)
              pos = 'bottom';
            if(predictTooltipLeft(source) < 0)
              pos = 'right';
            return pos;
          };

            // Predicts tooltip top position 
            // based on the trigger element
            function predictTooltipTop(el) {
              var top = el.offsetTop;
              var height = 40; // asumes ~40px tooltip height

              while(el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
              }
              return (top - height) - (window.pageYOffset);
            }

            // Predicts tooltip top position 
            // based on the trigger element
            function predictTooltipLeft(el) {
              var left = el.offsetLeft;
              var width = el.offsetWidth;

              while(el.offsetParent) {
                el = el.offsetParent;
                left += el.offsetLeft;
              }
              return (left - width) - (window.pageXOffset);
            }
        }
    }
})();

/**=========================================================
 * Module: demo-typeahead.js
 * Provides a simple demo for typeahead
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.bootstrapui')
        .controller('TypeaheadCtrl', TypeaheadCtrl);

    TypeaheadCtrl.$inject = ['$http'];
    function TypeaheadCtrl($http) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.selected = undefined;
          vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

          // Any function returning a promise object can be used to load values asynchronously
          vm.getLocation = function(val) {
            return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
              params: {
                address: val,
                sensor: false
              }
            }).then(function(res){
              var addresses = [];
              angular.forEach(res.data.results, function(item){
                /*jshint -W106*/
                addresses.push(item.formatted_address);
              });
              return addresses;
            });
          };

          vm.statesWithFlags = [{'name':'Alabama','flag':'5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'},{'name':'Alaska','flag':'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'},{'name':'Arizona','flag':'9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'},{'name':'Arkansas','flag':'9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'},{'name':'California','flag':'0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'},{'name':'Colorado','flag':'4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'},{'name':'Connecticut','flag':'9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},{'name':'Delaware','flag':'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'},{'name':'Florida','flag':'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'},{'name':'Georgia','flag':'5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'},{'name':'Hawaii','flag':'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'},{'name':'Idaho','flag':'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'},{'name':'Illinois','flag':'0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'},{'name':'Indiana','flag':'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'},{'name':'Iowa','flag':'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'},{'name':'Kansas','flag':'d/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'},{'name':'Kentucky','flag':'8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'},{'name':'Louisiana','flag':'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'},{'name':'Maine','flag':'3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},{'name':'Maryland','flag':'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'},{'name':'Massachusetts','flag':'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},{'name':'Michigan','flag':'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'},{'name':'Minnesota','flag':'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'},{'name':'Mississippi','flag':'4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'},{'name':'Missouri','flag':'5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'},{'name':'Montana','flag':'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'},{'name':'Nebraska','flag':'4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'},{'name':'Nevada','flag':'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'},{'name':'New Hampshire','flag':'2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},{'name':'New Jersey','flag':'9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'},{'name':'New Mexico','flag':'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'},{'name':'New York','flag':'1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'},{'name':'North Carolina','flag':'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'},{'name':'North Dakota','flag':'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'},{'name':'Ohio','flag':'4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'},{'name':'Oklahoma','flag':'6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'},{'name':'Oregon','flag':'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'},{'name':'Pennsylvania','flag':'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'},{'name':'Rhode Island','flag':'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},{'name':'South Carolina','flag':'6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'},{'name':'South Dakota','flag':'1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'},{'name':'Tennessee','flag':'9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'},{'name':'Texas','flag':'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'},{'name':'Utah','flag':'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'},{'name':'Vermont','flag':'4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'},{'name':'Virginia','flag':'4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'},{'name':'Washington','flag':'5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'},{'name':'West Virginia','flag':'2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'},{'name':'Wisconsin','flag':'2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'},{'name':'Wyoming','flag':'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];

        }
    }
})();

/**=========================================================
 * Module: chartist.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('ChartistController', ChartistController);

    function ChartistController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // Line chart
          // ----------------------------------- 

          vm.lineData = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            series: [
              [12, 9, 7, 8, 5],
              [2, 1, 3.5, 7, 3],
              [1, 3, 4, 5, 6]
            ]
          };

          vm.lineOptions = {
            fullWidth: true,
            height: 220,
            chartPadding: {
              right: 40
            }
          };

          // Bar bipolar
          // ----------------------------------- 

          vm.barBipolarOptions = {
            high: 10,
            low: -10,
            height: 220,
            axisX: {
              labelInterpolationFnc: function(value, index) {
                return index % 2 === 0 ? value : null;
              }
            }
          };

          vm.barBipolarData = {
            labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
            series: [
              [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
            ]
          };


          // Bar horizontal
          // ----------------------------------- 

          vm.barHorizontalData = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            series: [
              [5, 4, 3, 7, 5, 10, 3],
              [3, 2, 9, 5, 4, 6, 4]
            ]
          };

          vm.barHorizontalOptions = {
            seriesBarDistance: 10,
            reverseData: true,
            horizontalBars: true,
            height: 220,
            axisY: {
              offset: 70
            }
          };

          // Smil Animations
          // ----------------------------------- 

          // Let's put a sequence number aside so we can use it in the event callbacks
          var seq = 0,
            delays = 80,
            durations = 500;

          vm.smilData = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            series: [
              [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
              [4,  5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
              [5,  3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
              [3,  4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
            ]
          };

          vm.smilOptions = {
            low: 0,
            height: 260
          };

          vm.smilEvents = {
            created: function() {
              seq = 0;
            },
            draw: function(data) {
              seq++;

              if(data.type === 'line') {
                // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
                data.element.animate({
                  opacity: {
                    // The delay when we like to start the animation
                    begin: seq * delays + 1000,
                    // Duration of the animation
                    dur: durations,
                    // The value where the animation should start
                    from: 0,
                    // The value where it should end
                    to: 1
                  }
                });
              } else if(data.type === 'label' && data.axis === 'x') {
                data.element.animate({
                  y: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.y + 100,
                    to: data.y,
                    // We can specify an easing function from Chartist.Svg.Easing
                    easing: 'easeOutQuart'
                  }
                });
              } else if(data.type === 'label' && data.axis === 'y') {
                data.element.animate({
                  x: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 100,
                    to: data.x,
                    easing: 'easeOutQuart'
                  }
                });
              } else if(data.type === 'point') {
                data.element.animate({
                  x1: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                  },
                  x2: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                  },
                  opacity: {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'easeOutQuart'
                  }
                });
              } 
            }
          };


          // SVG PATH animation
          // ----------------------------------- 

          vm.pathData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            series: [
              [1, 5, 2, 5, 4, 3],
              [2, 3, 4, 8, 1, 2],
              [5, 4, 3, 2, 1, 0.5]
            ]
          };

          vm.pathOptions = {
            low: 0,
            showArea: true,
            showPoint: false,
            fullWidth: true,
            height: 260
          };

          vm.pathEvents = {
            draw: function(data) {
              if(data.type === 'line' || data.type === 'area') {
                data.element.animate({
                  d: {
                    begin: 2000 * data.index,
                    dur: 2000,
                    from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                    to: data.path.clone().stringify(),
                    easing: Chartist.Svg.Easing.easeOutQuint
                  }
                });
              }
            }
          };

        }
    }
})();


/**=========================================================
 * Module: chart.controller.js
 * Controller for ChartJs
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('ChartJSController', ChartJSController);

    ChartJSController.$inject = ['Colors'];
    function ChartJSController(Colors) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // random values for demo
          var rFactor = function(){ return Math.round(Math.random()*100); };

          // Line chart
          // ----------------------------------- 

          vm.lineData = {
              labels : ['January','February','March','April','May','June','July'],
              datasets : [
                {
                  label: 'My First dataset',
                  fillColor : 'rgba(114,102,186,0.2)',
                  strokeColor : 'rgba(114,102,186,1)',
                  pointColor : 'rgba(114,102,186,1)',
                  pointStrokeColor : '#fff',
                  pointHighlightFill : '#fff',
                  pointHighlightStroke : 'rgba(114,102,186,1)',
                  data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
                },
                {
                  label: 'My Second dataset',
                  fillColor : 'rgba(35,183,229,0.2)',
                  strokeColor : 'rgba(35,183,229,1)',
                  pointColor : 'rgba(35,183,229,1)',
                  pointStrokeColor : '#fff',
                  pointHighlightFill : '#fff',
                  pointHighlightStroke : 'rgba(35,183,229,1)',
                  data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
                }
              ]
            };


          vm.lineOptions = {
            scaleShowGridLines : true,
            scaleGridLineColor : 'rgba(0,0,0,.05)',
            scaleGridLineWidth : 1,
            bezierCurve : true,
            bezierCurveTension : 0.4,
            pointDot : true,
            pointDotRadius : 4,
            pointDotStrokeWidth : 1,
            pointHitDetectionRadius : 20,
            datasetStroke : true,
            datasetStrokeWidth : 2,
            datasetFill : true,
          };


          // Bar chart
          // ----------------------------------- 

          vm.barData = {
              labels : ['January','February','March','April','May','June','July'],
              datasets : [
                {
                  fillColor : Colors.byName('info'),
                  strokeColor : Colors.byName('info'),
                  highlightFill: Colors.byName('info'),
                  highlightStroke: Colors.byName('info'),
                  data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
                },
                {
                  fillColor : Colors.byName('primary'),
                  strokeColor : Colors.byName('primary'),
                  highlightFill : Colors.byName('primary'),
                  highlightStroke : Colors.byName('primary'),
                  data : [rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor(),rFactor()]
                }
              ]
          };
          
          vm.barOptions = {
            scaleBeginAtZero : true,
            scaleShowGridLines : true,
            scaleGridLineColor : 'rgba(0,0,0,.05)',
            scaleGridLineWidth : 1,
            barShowStroke : true,
            barStrokeWidth : 2,
            barValueSpacing : 5,
            barDatasetSpacing : 1,
          };


          //  Doughnut chart
          // ----------------------------------- 
          
          vm.doughnutData = [
                {
                  value: 300,
                  color: Colors.byName('purple'),
                  highlight: Colors.byName('purple'),
                  label: 'Purple'
                },
                {
                  value: 50,
                  color: Colors.byName('info'),
                  highlight: Colors.byName('info'),
                  label: 'Info'
                },
                {
                  value: 100,
                  color: Colors.byName('yellow'),
                  highlight: Colors.byName('yellow'),
                  label: 'Yellow'
                }
              ];

          vm.doughnutOptions = {
            segmentShowStroke : true,
            segmentStrokeColor : '#fff',
            segmentStrokeWidth : 2,
            percentageInnerCutout : 85,
            animationSteps : 100,
            animationEasing : 'easeOutBounce',
            animateRotate : true,
            animateScale : false
          };

          // Pie chart
          // ----------------------------------- 

          vm.pieData =[
                {
                  value: 300,
                  color: Colors.byName('purple'),
                  highlight: Colors.byName('purple'),
                  label: 'Purple'
                },
                {
                  value: 40,
                  color: Colors.byName('yellow'),
                  highlight: Colors.byName('yellow'),
                  label: 'Yellow'
                },
                {
                  value: 120,
                  color: Colors.byName('info'),
                  highlight: Colors.byName('info'),
                  label: 'Info'
                }
              ];

          vm.pieOptions = {
            segmentShowStroke : true,
            segmentStrokeColor : '#fff',
            segmentStrokeWidth : 2,
            percentageInnerCutout : 0, // Setting this to zero convert a doughnut into a Pie
            animationSteps : 100,
            animationEasing : 'easeOutBounce',
            animateRotate : true,
            animateScale : false
          };

          // Polar chart
          // ----------------------------------- 
          
          vm.polarData = [
                {
                  value: 300,
                  color: Colors.byName('pink'),
                  highlight: Colors.byName('pink'),
                  label: 'Red'
                },
                {
                  value: 50,
                  color: Colors.byName('purple'),
                  highlight: Colors.byName('purple'),
                  label: 'Green'
                },
                {
                  value: 100,
                  color: Colors.byName('pink'),
                  highlight: Colors.byName('pink'),
                  label: 'Yellow'
                },
                {
                  value: 140,
                  color: Colors.byName('purple'),
                  highlight: Colors.byName('purple'),
                  label: 'Grey'
                },
              ];

          vm.polarOptions = {
            scaleShowLabelBackdrop : true,
            scaleBackdropColor : 'rgba(255,255,255,0.75)',
            scaleBeginAtZero : true,
            scaleBackdropPaddingY : 1,
            scaleBackdropPaddingX : 1,
            scaleShowLine : true,
            segmentShowStroke : true,
            segmentStrokeColor : '#fff',
            segmentStrokeWidth : 2,
            animationSteps : 100,
            animationEasing : 'easeOutBounce',
            animateRotate : true,
            animateScale : false
          };


          // Radar chart
          // ----------------------------------- 

          vm.radarData = {
            labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
            datasets: [
              {
                label: 'My First dataset',
                fillColor: 'rgba(114,102,186,0.2)',
                strokeColor: 'rgba(114,102,186,1)',
                pointColor: 'rgba(114,102,186,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(114,102,186,1)',
                data: [65,59,90,81,56,55,40]
              },
              {
                label: 'My Second dataset',
                fillColor: 'rgba(151,187,205,0.2)',
                strokeColor: 'rgba(151,187,205,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: [28,48,40,19,96,27,100]
              }
            ]
          };

          vm.radarOptions = {
            scaleShowLine : true,
            angleShowLineOut : true,
            scaleShowLabels : false,
            scaleBeginAtZero : true,
            angleLineColor : 'rgba(0,0,0,.1)',
            angleLineWidth : 1,
            /*jshint -W109*/
            pointLabelFontFamily : "'Arial'",
            pointLabelFontStyle : 'bold',
            pointLabelFontSize : 10,
            pointLabelFontColor : '#565656',
            pointDot : true,
            pointDotRadius : 3,
            pointDotStrokeWidth : 1,
            pointHitDetectionRadius : 20,
            datasetStroke : true,
            datasetStrokeWidth : 2,
            datasetFill : true
          };
        }
    }
})();

/**=========================================================
 * Module: chart.js
 * Wrapper directive for chartJS. 
 * Based on https://gist.github.com/AndreasHeiberg/9837868
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        /* Aliases for various chart types */
        .directive('linechart',     chartJS('Line')      )
        .directive('barchart',      chartJS('Bar')       )
        .directive('radarchart',    chartJS('Radar')     )
        .directive('polarchart',    chartJS('PolarArea') )
        .directive('piechart',      chartJS('Pie')       )
        .directive('doughnutchart', chartJS('Doughnut')  )
        .directive('donutchart',    chartJS('Doughnut')  )
        ;

    function chartJS(type) {
        return function() {
            return {
                restrict: 'A',
                scope: {
                    data: '=',
                    options: '=',
                    id: '@',
                    width: '=',
                    height: '=',
                    resize: '=',
                    chart: '@',
                    segments: '@',
                    responsive: '=',
                    tooltip: '=',
                    legend: '='
                },
                link: function ($scope, $elem) {
                    var ctx = $elem[0].getContext('2d');
                    var autosize = false;

                    $scope.size = function () {
                        if ($scope.width <= 0) {
                            $elem.width($elem.parent().width());
                            ctx.canvas.width = $elem.width();
                        } else {
                            ctx.canvas.width = $scope.width || ctx.canvas.width;
                            autosize = true;
                        }

                        if($scope.height <= 0){
                            $elem.height($elem.parent().height());
                            ctx.canvas.height = ctx.canvas.width / 2;
                        } else {
                            ctx.canvas.height = $scope.height || ctx.canvas.height;
                            autosize = true;
                        }
                    };

                    $scope.$watch('data', function (newVal) {
                        if(chartCreated)
                            chartCreated.destroy();

                        // if data not defined, exit
                        if (!newVal) {
                            return;
                        }
                        if ($scope.chart) { type = $scope.chart; }

                        if(autosize){
                            $scope.size();
                            chart = new Chart(ctx);
                        }

                        if($scope.responsive || $scope.resize)
                            $scope.options.responsive = true;

                        if($scope.responsive !== undefined)
                            $scope.options.responsive = $scope.responsive;

                        chartCreated = chart[type]($scope.data, $scope.options);
                        chartCreated.update();
                        if($scope.legend)
                            angular.element($elem[0]).parent().after( chartCreated.generateLegend() );
                    }, true);

                    $scope.$watch('tooltip', function (newVal) {
                        if (chartCreated)
                            chartCreated.draw();
                        if(newVal===undefined || !chartCreated.segments)
                            return;
                        if(!isFinite(newVal) || newVal >= chartCreated.segments.length || newVal < 0)
                            return;
                        var activeSegment = chartCreated.segments[newVal];
                        activeSegment.save();
                        activeSegment.fillColor = activeSegment.highlightColor;
                        chartCreated.showTooltip([activeSegment]);
                        activeSegment.restore();
                    }, true);

                    $scope.size();
                    var chart = new Chart(ctx);
                    var chartCreated;

                    $scope.$on('$destroy', function() {
                        if(chartCreated)
                            chartCreated.destroy();
                    });
                }
            };
        };
    }
})();





/**=========================================================
 * Module: classy-loader.js
 * Enable use of classyloader directly from data attributes
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('classyloader', classyloader);

    classyloader.$inject = ['$timeout', 'Utils', '$window'];
    function classyloader ($timeout, Utils, $window) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          var $scroller       = $($window),
              inViewFlagClass = 'js-is-in-view'; // a classname to detect when a chart has been triggered after scroll

          // run after interpolation  
          $timeout(function(){
      
            var $element = $(element),
                options  = $element.data();
            
            // At lease we need a data-percentage attribute
            if(options) {
              if( options.triggerInView ) {

                $scroller.scroll(function() {
                  checkLoaderInVIew($element, options);
                });
                // if the element starts already in view
                checkLoaderInVIew($element, options);
              }
              else
                startLoader($element, options);
            }

          }, 0);

          function checkLoaderInVIew(element, options) {
            var offset = -20;
            if( ! element.hasClass(inViewFlagClass) &&
                Utils.isInView(element, {topoffset: offset}) ) {
              startLoader(element, options);
            }
          }
          function startLoader(element, options) {
            element.ClassyLoader(options).addClass(inViewFlagClass);
          }
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.charts')
        .service('ChartData', ChartData);

    ChartData.$inject = ['$resource'];
    function ChartData($resource) {
        this.load = load;

        ////////////////
      
        var opts = {
            get: { method: 'GET', isArray: true }
          };
        function load(source) {
          return $resource(source, {}, opts).get();
        }
    }
})();

/**=========================================================
 * Module: flot-chart.js
 * Setup options and data for flot chart directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('FlotChartController', FlotChartController);

    FlotChartController.$inject = ['$scope', 'ChartData', '$timeout'];
    function FlotChartController($scope, ChartData, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // BAR
          // -----------------------------------
          vm.barData = ChartData.load('server/chart/bar.json');
          vm.barOptions = {
              series: {
                  bars: {
                      align: 'center',
                      lineWidth: 0,
                      show: true,
                      barWidth: 0.6,
                      fill: 0.9
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                  tickColor: '#eee'
              },
              shadowSize: 0
          };

          // BAR STACKED
          // -----------------------------------
          vm.barStackeData = ChartData.load('server/chart/barstacked.json');
          vm.barStackedOptions = {
              series: {
                  stack: true,
                  bars: {
                      align: 'center',
                      lineWidth: 0,
                      show: true,
                      barWidth: 0.6,
                      fill: 0.9
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 200, // optional: use it for a clear represetation
                  position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                  tickColor: '#eee'
              },
              shadowSize: 0
          };

          // SPLINE
          // -----------------------------------
          vm.splineData = ChartData.load('server/chart/spline.json');
          vm.splineOptions = {
              series: {
                  lines: {
                      show: false
                  },
                  points: {
                      show: true,
                      radius: 4
                  },
                  splines: {
                      show: true,
                      tension: 0.4,
                      lineWidth: 1,
                      fill: 0.5
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 150, // optional: use it for a clear represetation
                  tickColor: '#eee',
                  position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                  tickFormatter: function (v) {
                      return v/* + ' visitors'*/;
                  }
              },
              shadowSize: 0
          };

          // AREA
          // -----------------------------------
          vm.areaData = ChartData.load('server/chart/area.json');
          vm.areaOptions = {
              series: {
                  lines: {
                      show: true,
                      fill: 0.8
                  },
                  points: {
                      show: true,
                      radius: 4
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  tickColor: '#eee',
                  position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                  tickFormatter: function (v) {
                      return v + ' visitors';
                  }
              },
              shadowSize: 0
          };

          // LINE
          // -----------------------------------
          vm.lineData = ChartData.load('server/chart/line.json');
          vm.lineOptions = {
              series: {
                  lines: {
                      show: true,
                      fill: 0.01
                  },
                  points: {
                      show: true,
                      radius: 4
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#eee',
                  mode: 'categories'
              },
              yaxis: {
                  position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                  tickColor: '#eee'
              },
              shadowSize: 0
          };

          // PIE
          // -----------------------------------
          vm.pieData = [{
              "label": "jQuery",
              "color": "#4acab4",
              "data": 30
            }, {
              "label": "CSS",
              "color": "#ffea88",
              "data": 40
            }, {
              "label": "LESS",
              "color": "#ff8153",
              "data": 90
            }, {
              "label": "SASS",
              "color": "#878bb6",
              "data": 75
            }, {
              "label": "Jade",
              "color": "#b2d767",
              "data": 120
            }];
          // Direct data temporarily added until fix: https://github.com/flot/flot/pull/1462
          // ChartData.load('server/chart/pie.json');

          vm.pieOptions = {
              series: {
                  pie: {
                      show: true,
                      innerRadius: 0,
                      label: {
                          show: true,
                          radius: 0.8,
                          formatter: function (label, series) {
                              return '<div class="flot-pie-label">' +
                              //label + ' : ' +
                              Math.round(series.percent) +
                              '%</div>';
                          },
                          background: {
                              opacity: 0.8,
                              color: '#222'
                          }
                      }
                  }
              }
          };

          // DONUT
          // -----------------------------------
          vm.donutData = [ { "color" : "#39C558",
                "data" : 60,
                "label" : "Coffee"
              },
              { "color" : "#00b4ff",
                "data" : 90,
                "label" : "CSS"
              },
              { "color" : "#FFBE41",
                "data" : 50,
                "label" : "LESS"
              },
              { "color" : "#ff3e43",
                "data" : 80,
                "label" : "Jade"
              },
              { "color" : "#937fc7",
                "data" : 116,
                "label" : "AngularJS"
              }
            ];
          // Direct data temporarily added until fix: https://github.com/flot/flot/pull/1462
          // ChartData.load('server/chart/donut.json');

          vm.donutOptions = {
              series: {
                  pie: {
                      show: true,
                      innerRadius: 0.5 // This makes the donut shape
                  }
              }
          };

          // REALTIME
          // -----------------------------------
          vm.realTimeOptions = {
              series: {
                lines: { show: true, fill: true, fillColor:  { colors: ['#a0e0f3', '#23b7e5'] } },
                shadowSize: 0 // Drawing is faster without shadows
              },
              grid: {
                  show:false,
                  borderWidth: 0,
                  minBorderMargin: 20,
                  labelMargin: 10
              },
              xaxis: {
                tickFormatter: function() {
                    return '';
                }
              },
              yaxis: {
                  min: 0,
                  max: 110
              },
              legend: {
                  show: true
              },
              colors: ['#23b7e5']
          };

          // Generate random data for realtime demo
          var data = [], totalPoints = 300;

          update();

          function getRandomData() {
            if (data.length > 0)
              data = data.slice(1);
            // Do a random walk
            while (data.length < totalPoints) {
              var prev = data.length > 0 ? data[data.length - 1] : 50,
                y = prev + Math.random() * 10 - 5;
              if (y < 0) {
                y = 0;
              } else if (y > 100) {
                y = 100;
              }
              data.push(y);
            }
            // Zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < data.length; ++i) {
              res.push([i, data[i]]);
            }
            return [res];
          }
          function update() {
            vm.realTimeData = getRandomData();
            $timeout(update, 30);
          }
          // end random data generation


          // PANEL REFRESH EVENTS
          // -----------------------------------

          $scope.$on('panel-refresh', function(event, id) {

            console.log('Simulating chart refresh during 3s on #'+id);

            // Instead of timeout you can request a chart data
            $timeout(function(){

              // directive listen for to remove the spinner
              // after we end up to perform own operations
              $scope.$broadcast('removeSpinner', id);

              console.log('Refreshed #' + id);

            }, 3000);

          });


          // PANEL DISMISS EVENTS
          // -----------------------------------

          // Before remove panel
          $scope.$on('panel-remove', function(event, id, deferred){

            console.log('Panel #' + id + ' removing');

            // Here is obligatory to call the resolve() if we pretend to remove the panel finally
            // Not calling resolve() will NOT remove the panel
            // It's up to your app to decide if panel should be removed or not
            deferred.resolve();

          });

          // Panel removed ( only if above was resolved() )
          $scope.$on('panel-removed', function(event, id){

            console.log('Panel #' + id + ' removed');

          });

        }
    }
})();

/**=========================================================
 * Module: flot.js
 * Initializes the Flot chart plugin and handles data refresh
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('flot', flot);

    flot.$inject = ['$http', '$timeout'];
    function flot ($http, $timeout) {

        var directive = {
          restrict: 'EA',
          template: '<div></div>',
          scope: {
            dataset: '=?',
            options: '=',
            series: '=',
            callback: '=',
            src: '='
          },
          link: link
        };
        return directive;

        function link(scope, element, attrs) {
          var height, plot, plotArea, width;
          var heightDefault = 220;

          plot = null;

          width = attrs.width || '100%';
          height = attrs.height || heightDefault;

          plotArea = $(element.children()[0]);
          plotArea.css({
            width: width,
            height: height
          });

          function init() {
            var plotObj;
            if(!scope.dataset || !scope.options) return;
            plotObj = $.plot(plotArea, scope.dataset, scope.options);
            scope.$emit('plotReady', plotObj);
            if (scope.callback) {
              scope.callback(plotObj, scope);
            }

            return plotObj;
          }

          function onDatasetChanged(dataset) {
            if (plot) {
              plot.setData(dataset);
              plot.setupGrid();
              return plot.draw();
            } else {
              plot = init();
              onSerieToggled(scope.series);
              return plot;
            }
          }
          scope.$watchCollection('dataset', onDatasetChanged, true);

          function onSerieToggled (series) {
            if( !plot || !series ) return;
            var someData = plot.getData();
            for(var sName in series) {
              angular.forEach(series[sName], toggleFor(sName));
            }
            
            plot.setData(someData);
            plot.draw();
            
            function toggleFor(sName) {
              return function (s, i){
                if(someData[i] && someData[i][sName])
                  someData[i][sName].show = s;
              };
            }
          }
          scope.$watch('series', onSerieToggled, true);
          
          function onSrcChanged(src) {

            if( src ) {

              $http.get(src)
                .success(function (data) {

                  $timeout(function(){
                    scope.dataset = data;
                  });

              }).error(function(){
                $.error('Flot chart: Bad request.');
              });
              
            }
          }
          scope.$watch('src', onSrcChanged);

        }
    }


})();

/**=========================================================
 * Module: morris.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('ChartMorrisController', ChartMorrisController);

    ChartMorrisController.$inject = ['$timeout', 'Colors'];
    function ChartMorrisController($timeout, Colors) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
         vm.chartdata = [
              { y: '2006', a: 100, b: 90 },
              { y: '2007', a: 75,  b: 65 },
              { y: '2008', a: 50,  b: 40 },
              { y: '2009', a: 75,  b: 65 },
              { y: '2010', a: 50,  b: 40 },
              { y: '2011', a: 75,  b: 65 },
              { y: '2012', a: 100, b: 90 }
          ];

          /* test data update
          $timeout(function(){
            vm.chartdata[0].a = 50;
            vm.chartdata[0].b = 50;
          }, 3000); */

          vm.donutdata = [
            {label: 'Download Sales', value: 12},
            {label: 'In-Store Sales',value: 30},
            {label: 'Mail-Order Sales', value: 20}
          ];

          vm.donutOptions = {
            Colors: [ Colors.byName('danger'), Colors.byName('yellow'), Colors.byName('warning') ],
            resize: true
          };

          vm.barOptions = {
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Series A', 'Series B'],
            xLabelMargin: 2,
            barColors: [ Colors.byName('info'), Colors.byName('danger') ],
            resize: true
          };

          vm.lineOptions = {
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Serie A', 'Serie B'],
            lineColors: ['#31C0BE', '#7a92a3'],
            resize: true
          };

          vm.areaOptions = {
            xkey: 'y',
            ykeys: ['a', 'b'],
            labels: ['Serie A', 'Serie B'],
            lineColors: [ Colors.byName('purple'), Colors.byName('info') ],
            resize: true
          };

        }
    }
})();

/**=========================================================
 * Module: morris.js
 * AngularJS Directives for Morris Charts
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('morrisBar',   morrisChart('Bar')   )
        .directive('morrisDonut', morrisChart('Donut') )
        .directive('morrisLine',  morrisChart('Line')  )
        .directive('morrisArea',  morrisChart('Area')  );

    function morrisChart(type) {
      return function () {
        return {
          restrict: 'EA',
          scope: {
            morrisData: '=',
            morrisOptions: '='
          },
          link: function($scope, element) {
            // start ready to watch for changes in data
            $scope.$watch('morrisData', function(newVal) {
              if (newVal) {
                $scope.morrisInstance.setData(newVal);
                $scope.morrisInstance.redraw();
              }
            }, true);
            // the element that contains the chart
            $scope.morrisOptions.element = element;
            // If data defined copy to options
            if($scope.morrisData)
              $scope.morrisOptions.data = $scope.morrisData;
            // Init chart
            $scope.morrisInstance = new Morris[type]($scope.morrisOptions);

          }
        };
      };
    }

})();

/**=========================================================
 * Module: PieChartsController.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('PieChartsController', PieChartsController);

    /*jshint -W069*/
    PieChartsController.$inject = ['Colors'];

    function PieChartsController(Colors) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // KNOB Charts

          vm.knobLoaderData1 = 80;
          vm.knobLoaderOptions1 = {
              width: '50%', // responsive
              displayInput: true,
              fgColor: Colors.byName('info')
            };

          vm.knobLoaderData2 = 45;
          vm.knobLoaderOptions2 = {
              width: '50%', // responsive
              displayInput: true,
              fgColor: Colors.byName('purple'),
              readOnly : true
            };

          vm.knobLoaderData3 = 30;
          vm.knobLoaderOptions3 = {
              width: '50%', // responsive
              displayInput: true,
              fgColor: Colors.byName('pink'),
              displayPrevious : true,
              thickness : 0.1,
              lineCap : 'round'
            };

          vm.knobLoaderData4 = 20;
          vm.knobLoaderOptions4 = {
              width: '50%', // responsive
              displayInput: true,
              fgColor: Colors.byName('info'),
              bgColor: Colors.byName('gray'),
              angleOffset: -125,
              angleArc: 250
            };

          // Easy Pie Charts

          vm.piePercent1 = 85;
          vm.piePercent2 = 45;
          vm.piePercent3 = 25;
          vm.piePercent4 = 60;

          vm.pieOptions1 = {
              animate:{
                  duration: 800,
                  enabled: true
              },
              barColor: Colors.byName('success'),
              trackColor: false,
              scaleColor: false,
              lineWidth: 10,
              lineCap: 'circle'
          };

          vm.pieOptions2= {
              animate:{
                  duration: 800,
                  enabled: true
              },
              barColor: Colors.byName('warning'),
              trackColor: false,
              scaleColor: false,
              lineWidth: 4,
              lineCap: 'circle'
          };

          vm.pieOptions3 = {
              animate:{
                  duration: 800,
                  enabled: true
              },
              barColor: Colors.byName('danger'),
              trackColor: false,
              scaleColor: Colors.byName('gray'),
              lineWidth: 15,
              lineCap: 'circle'
          };

          vm.pieOptions4 = {
              animate:{
                  duration: 800,
                  enabled: true
              },
              barColor: Colors.byName('danger'),
              trackColor: Colors.byName('yellow'),
              scaleColor: Colors.byName('gray-dark'),
              lineWidth: 15,
              lineCap: 'circle'
          };

          vm.randomize = function(type) {
            if ( type === 'easy') {
              vm.piePercent1 = random();
              vm.piePercent2 = random();
              vm.piePercent3 = random();
              vm.piePercent4 = random();
            }
            if ( type === 'knob') {
              vm.knobLoaderData1 = random();
              vm.knobLoaderData2 = random();
              vm.knobLoaderData3 = random();
              vm.knobLoaderData4 = random();
            }
          }

          function random() { return Math.floor((Math.random() * 100) + 1); }

        }
    }
})();

/**=========================================================
 * Module: rickshaw.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.charts')
        .controller('ChartRickshawController', ChartRickshawController);

    function ChartRickshawController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.renderers = [{
                  id: 'area',
                  name: 'Area'
              }, {
                  id: 'line',
                  name: 'Line'
              }, {
                  id: 'bar',
                  name: 'Bar'
              }, {
                  id: 'scatterplot',
                  name: 'Scatterplot'
              }];

          vm.palettes = [
              'spectrum14',
              'spectrum2000',
              'spectrum2001',
              'colorwheel',
              'cool',
              'classic9',
              'munin'
          ];

          vm.rendererChanged = function(id) {
              vm['options' + id] = {
                  renderer: vm['renderer' + id].id
              };
          };

          vm.paletteChanged = function(id) {
              vm['features' + id] = {
                  palette: vm['palette' + id]
              };
          };

          vm.changeSeriesData = function(id) {
              var seriesList = [];
              for (var i = 0; i < 3; i++) {
                  var series = {
                      name: 'Series ' + (i + 1),
                      data: []
                  };
                  for (var j = 0; j < 10; j++) {
                      series.data.push({x: j, y: Math.random() * 20});
                  }
                  seriesList.push(series);
                  vm['series' + id][i] = series;
              }
              //vm['series' + id] = seriesList;
          };

          vm.series0 = [];

          vm.options0 = {
            renderer: 'area'
          };

          vm.renderer0 = vm.renderers[0];
          vm.palette0 = vm.palettes[0];

          vm.rendererChanged(0);
          vm.paletteChanged(0);
          vm.changeSeriesData(0);  

          // Graph 2

          var seriesData = [ [], [], [] ];
          var random = new Rickshaw.Fixtures.RandomData(150);

          for (var i = 0; i < 150; i++) {
            random.addData(seriesData);
          }

          vm.series2 = [
            {
              color: '#c05020',
              data: seriesData[0],
              name: 'New York'
            }, {
              color: '#30c020',
              data: seriesData[1],
              name: 'London'
            }, {
              color: '#6060c0',
              data: seriesData[2],
              name: 'Tokyo'
            }
          ];

          vm.options2 = {
            renderer: 'area'
          };

        }
    }
})();

/**=========================================================
 * Module: sparkline.js
 * SparkLines Mini Charts
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.charts')
        .directive('sparkline', sparkline);

    function sparkline () {
        var directive = {
            restrict: 'EA',
            scope: {
              'sparkline': '='
            },
            controller: Controller
        };
        return directive;

    }
    Controller.$inject = ['$scope', '$element', '$timeout', '$window'];
    function Controller($scope, $element, $timeout, $window) {
      var runSL = function(){
        initSparLine();
      };

      $timeout(runSL);
  
      function initSparLine() {
        var options = $scope.sparkline,
            data = $element.data();
        
        if(!options) // if no scope options, try with data attributes
          options = data;
        else
          if(data) // data attributes overrides scope options
            options = angular.extend({}, options, data);

        options.type = options.type || 'bar'; // default chart is bar
        options.disableHiddenCheck = true;

        $element.sparkline('html', options);

        if(options.resize) {
          $($window).resize(function(){
            $element.sparkline('html', options);
          });
        }
      }

    }
    

})();

(function() {
    'use strict';

    angular
        .module('app.colors')
        .constant('APP_COLORS', {
          'primary':                '#5d9cec',
          'success':                '#27c24c',
          'info':                   '#23b7e5',
          'warning':                '#ff902b',
          'danger':                 '#f05050',
          'inverse':                '#131e26',
          'green':                  '#37bc9b',
          'pink':                   '#f532e5',
          'purple':                 '#7266ba',
          'dark':                   '#3a3f51',
          'yellow':                 '#fad732',
          'gray-darker':            '#232735',
          'gray-dark':              '#3a3f51',
          'gray':                   '#dde6e9',
          'gray-light':             '#e4eaec',
          'gray-lighter':           '#edf1f2'
        })
        ;
})();
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.colors')
        .service('Colors', Colors);

    Colors.$inject = ['APP_COLORS'];
    function Colors(APP_COLORS) {
        this.byName = byName;

        ////////////////

        function byName(name) {
          return (APP_COLORS[name] || '#fff');
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.core')
        .config(coreConfig);

    coreConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$animateProvider'];
    function coreConfig($controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider){

      var core = angular.module('app.core');
      // registering components after bootstrap
      core.controller = $controllerProvider.register;
      core.directive  = $compileProvider.directive;
      core.filter     = $filterProvider.register;
      core.factory    = $provide.factory;
      core.service    = $provide.service;
      core.constant   = $provide.constant;
      core.value      = $provide.value;

      // Disables animation on items with class .ng-no-animation
      $animateProvider.classNameFilter(/^((?!(ng-no-animation)).)*$/);

    }

})();
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('APP_MEDIAQUERY', {
          'desktopLG':             1200,
          'desktop':                992,
          'tablet':                 768,
          'mobile':                 480
        })
      ;

})();
(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams',  '$window', '$templateCache', 'Colors'];
    
    function appRun($rootScope, $state, $stateParams, $window, $templateCache, Colors) {
      
      // Set reference to access them from any scope
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.$storage = $window.localStorage;

      // Uncomment this to disable template cache
      /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (typeof(toState) !== 'undefined'){
            $templateCache.remove(toState.templateUrl);
          }
      });*/

      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $rootScope.colorByName = Colors.byName;

      // cancel click event easily
      $rootScope.cancel = function($event) {
        $event.stopPropagation();
      };

      // Hooks Example
      // ----------------------------------- 

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function(event, unfoundState/*, fromState, fromParams*/) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error){
          console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function(/*event, toState, toParams, fromState, fromParams*/) {
          // display new view from top
          $window.scrollTo(0, 0);
          // Save the route title
          $rootScope.currTitle = $state.current.title;
        });

      // Load a title dynamically
      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function() {
        var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        document.title = title;
        return title;
      };      

    }

})();


(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$scope', 'ChartData', '$timeout'];
    function DashboardController($scope, ChartData, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // SPLINE
          // ----------------------------------- 
          vm.splineData = ChartData.load('server/chart/spline.json');
          vm.splineOptions = {
              series: {
                  lines: {
                      show: false
                  },
                  points: {
                      show: true,
                      radius: 4
                  },
                  splines: {
                      show: true,
                      tension: 0.4,
                      lineWidth: 1,
                      fill: 0.5
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 150, // optional: use it for a clear represetation
                  tickColor: '#eee',
                  position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                  tickFormatter: function (v) {
                      return v/* + ' visitors'*/;
                  }
              },
              shadowSize: 0
          };


          // PANEL REFRESH EVENTS
          // ----------------------------------- 

          $scope.$on('panel-refresh', function(event, id) {
            
            console.log('Simulating chart refresh during 3s on #'+id);

            // Instead of timeout you can request a chart data
            $timeout(function(){
              
              // directive listen for to remove the spinner 
              // after we end up to perform own operations
              $scope.$broadcast('removeSpinner', id);
              
              console.log('Refreshed #' + id);

            }, 3000);

          });


          // PANEL DISMISS EVENTS
          // ----------------------------------- 

          // Before remove panel
          $scope.$on('panel-remove', function(event, id, deferred){
            
            console.log('Panel #' + id + ' removing');
            
            // Here is obligatory to call the resolve() if we pretend to remove the panel finally
            // Not calling resolve() will NOT remove the panel
            // It's up to your app to decide if panel should be removed or not
            deferred.resolve();
          
          });

          // Panel removed ( only if above was resolved() )
          $scope.$on('panel-removed', function(event, id){

            console.log('Panel #' + id + ' removed');

          });

        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardV2Controller', DashboardV2Controller);

    DashboardV2Controller.$inject = ['$rootScope', '$scope', '$state'];
    function DashboardV2Controller($rootScope, $scope, $state) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          
          // Change layout mode
          if( $state.includes('app-h') ) {
            // Setup layout horizontal for demo
            $rootScope.app.layout.horizontal = true;
            $scope.$on('$destroy', function(){
                $rootScope.app.layout.horizontal = false;
            });            
          }
          else {
            $rootScope.app.layout.isCollapsed = true;
          }

          // BAR STACKED
          // ----------------------------------- 
          vm.barStackedOptions = {
              series: {
                  stack: true,
                  bars: {
                      align: 'center',
                      lineWidth: 0,
                      show: true,
                      barWidth: 0.6,
                      fill: 0.9
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 200, // optional: use it for a clear represetation
                  position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
                  tickColor: '#eee'
              },
              shadowSize: 0
          };

          // SPLINE
          // ----------------------------------- 

          vm.splineOptions = {
              series: {
                  lines: {
                      show: false
                  },
                  points: {
                      show: true,
                      radius: 4
                  },
                  splines: {
                      show: true,
                      tension: 0.4,
                      lineWidth: 1,
                      fill: 0.5
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 150, // optional: use it for a clear represetation
                  tickColor: '#eee',
                  position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
                  tickFormatter: function (v) {
                      return v/* + ' visitors'*/;
                  }
              },
              shadowSize: 0
          };
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardV3Controller', DashboardV3Controller);

    DashboardV3Controller.$inject = ['$rootScope'];
    function DashboardV3Controller($rootScope) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // SPLINE
          // ----------------------------------- 

          vm.splineOptions = {
              series: {
                  lines: {
                      show: false
                  },
                  points: {
                      show: true,
                      radius: 4
                  },
                  splines: {
                      show: true,
                      tension: 0.4,
                      lineWidth: 1,
                      fill: 0.5
                  }
              },
              grid: {
                  borderColor: '#eee',
                  borderWidth: 1,
                  hoverable: true,
                  backgroundColor: '#fcfcfc'
              },
              tooltip: true,
              tooltipOpts: {
                  content: function (label, x, y) { return x + ' : ' + y; }
              },
              xaxis: {
                  tickColor: '#fcfcfc',
                  mode: 'categories'
              },
              yaxis: {
                  min: 0,
                  max: 150, // optional: use it for a clear represetation
                  tickColor: '#eee',
                  position: ($rootScope.app.layout.isRTL ? 'right' : 'left'),
                  tickFormatter: function (v) {
                      return v/* + ' visitors'*/;
                  }
              },
              shadowSize: 0
          };


          vm.seriesData = {
            'CA': 11100,   // Canada
            'DE': 2510,    // Germany
            'FR': 3710,    // France
            'AU': 5710,    // Australia
            'GB': 8310,    // Great Britain
            'RU': 9310,    // Russia
            'BR': 6610,    // Brazil
            'IN': 7810,    // India
            'CN': 4310,    // China
            'US': 839,     // USA
            'SA': 410      // Saudi Arabia
          };
          
          vm.markersData = [
            { latLng:[41.90, 12.45],  name:'Vatican City'          },
            { latLng:[43.73, 7.41],   name:'Monaco'                },
            { latLng:[-0.52, 166.93], name:'Nauru'                 },
            { latLng:[-8.51, 179.21], name:'Tuvalu'                },
            { latLng:[7.11,171.06],   name:'Marshall Islands'      },
            { latLng:[17.3,-62.73],   name:'Saint Kitts and Nevis' },
            { latLng:[3.2,73.22],     name:'Maldives'              },
            { latLng:[35.88,14.5],    name:'Malta'                 },
            { latLng:[41.0,-71.06],   name:'New England'           },
            { latLng:[12.05,-61.75],  name:'Grenada'               },
            { latLng:[13.16,-59.55],  name:'Barbados'              },
            { latLng:[17.11,-61.85],  name:'Antigua and Barbuda'   },
            { latLng:[-4.61,55.45],   name:'Seychelles'            },
            { latLng:[7.35,134.46],   name:'Palau'                 },
            { latLng:[42.5,1.51],     name:'Andorra'               }
          ];
        }
    }
})();
(function () {
    'use strict';

// NOTICE: This file was forked from the angular-material project (github.com/angular/material)
// MIT Licensed - Copyright (c) 2014-2015 Google, Inc. http://angularjs.org

    angular.module('mgcrea.ngStrap.core', [])
        .service('$bsCompiler', bsCompilerService);

    function bsCompilerService ($q, $http, $injector, $compile, $controller, $templateCache) {

        /*
         * @ngdoc service
         * @name $bsCompiler
         * @module material.core
         * @description
         * The $bsCompiler service is an abstraction of angular's compiler, that allows the developer
         * to easily compile an element with a templateUrl, controller, and locals.
         *
         * @usage
         * <hljs lang="js">
         * $bsCompiler.compile({
         *   templateUrl: 'modal.html',
         *   controller: 'ModalCtrl',
         *   locals: {
         *     modal: myModalInstance;
         *   }
         * }).then(function(compileData) {
         *   compileData.element; // modal.html's template in an element
         *   compileData.link(myScope); //attach controller & scope to element
         * });
         * </hljs>
         */

        /*
         * @ngdoc method
         * @name $bsCompiler#compile
         * @description A helper to compile an HTML template/templateUrl with a given controller,
         * locals, and scope.
         * @param {object} options An options object, with the following properties:
         *
         *    - `controller` - `{(string=|function()=}` Controller fn that should be associated with
         *      newly created scope or the name of a registered controller if passed as a string.
         *    - `controllerAs` - `{string=}` A controller alias name. If present the controller will be
         *      published to scope under the `controllerAs` name.
         *    - `template` - `{string=}` An html template as a string.
         *    - `templateUrl` - `{string=}` A path to an html template.
         *    - `transformTemplate` - `{function(template)=}` A function which transforms the template after
         *      it is loaded. It will be given the template string as a parameter, and should
         *      return a a new string representing the transformed template.
         *    - `resolve` - `{Object.<string, function>=}` - An optional map of dependencies which should
         *      be injected into the controller. If any of these dependencies are promises, the compiler
         *      will wait for them all to be resolved, or if one is rejected before the controller is
         *      instantiated `compile()` will fail..
         *      * `key` - `{string}`: a name of a dependency to be injected into the controller.
         *      * `factory` - `{string|function}`: If `string` then it is an alias for a service.
         *        Otherwise if function, then it is injected and the return value is treated as the
         *        dependency. If the result is a promise, it is resolved before its value is
         *        injected into the controller.
         *
         * @returns {object=} promise A promise, which will be resolved with a `compileData` object.
         * `compileData` has the following properties:
         *
         *   - `element` - `{element}`: an uncompiled element matching the provided template.
         *   - `link` - `{function(scope)}`: A link function, which, when called, will compile
         *     the element and instantiate the provided controller (if given).
         *   - `locals` - `{object}`: The locals which will be passed into the controller once `link` is
         *     called. If `bindToController` is true, they will be coppied to the ctrl instead
         *   - `bindToController` - `bool`: bind the locals to the controller, instead of passing them in.
         */
        this.compile = function (options) {

            if (options.template && /\.html$/.test(options.template)) {
                console.warn('Deprecated use of `template` option to pass a file. Please use the `templateUrl` option instead.');
                options.templateUrl = options.template;
                options.template = '';
            }

            var templateUrl = options.templateUrl;
            var template = options.template || '';
            var controller = options.controller;
            var controllerAs = options.controllerAs;
            var resolve = angular.copy(options.resolve || {});
            var locals = angular.copy(options.locals || {});
            var transformTemplate = options.transformTemplate || angular.identity;
            var bindToController = options.bindToController;

            // Take resolve values and invoke them.
            // Resolves can either be a string (value: 'MyRegisteredAngularConst'),
            // or an invokable 'factory' of sorts: (value: function ValueGetter($dependency) {})
            angular.forEach(resolve, function (value, key) {
                if (angular.isString(value)) {
                    resolve[key] = $injector.get(value);
                } else {
                    resolve[key] = $injector.invoke(value);
                }
            });
            // Add the locals, which are just straight values to inject
            // eg locals: { three: 3 }, will inject three into the controller
            angular.extend(resolve, locals);

            if (template) {
                resolve.$template = $q.when(template);
            } else if (templateUrl) {
                resolve.$template = fetchTemplate(templateUrl);
            } else {
                throw new Error('Missing `template` / `templateUrl` option.');
            }

            if (options.titleTemplate) {
                resolve.$template = $q.all([resolve.$template, fetchTemplate(options.titleTemplate)])
                    .then(function (templates) {
                        var templateEl = angular.element(templates[0]);
                        findElement('[ng-bind="title"]', templateEl[0])
                            .removeAttr('ng-bind')
                            .html(templates[1]);
                        return templateEl[0].outerHTML;
                    });
            }

            if (options.contentTemplate) {
                // TODO(mgcrea): deprecate?
                resolve.$template = $q.all([resolve.$template, fetchTemplate(options.contentTemplate)])
                    .then(function (templates) {
                        var templateEl = angular.element(templates[0]);
                        var contentEl = findElement('[ng-bind="content"]', templateEl[0])
                            .removeAttr('ng-bind')
                            .html(templates[1]);
                        // Drop the default footer as you probably don't want it if you use a custom contentTemplate
                        if (!options.templateUrl) contentEl.next().remove();
                        return templateEl[0].outerHTML;
                    });
            }

            // Wait for all the resolves to finish if they are promises
            return $q.all(resolve).then(function (locals) {

                var template = transformTemplate(locals.$template);
                if (options.html) {
                    template = template.replace(/ng-bind="/ig, 'ng-bind-html="');
                }
                // var element = options.element || angular.element('<div>').html(template.trim()).contents();
                var element = angular.element('<div>').html(template.trim()).contents();
                var linkFn = $compile(element);

                // Return a linking function that can be used later when the element is ready
                return {
                    locals: locals,
                    element: element,
                    link: function link (scope) {
                        locals.$scope = scope;

                        // Instantiate controller if it exists, because we have scope
                        if (controller) {
                            var invokeCtrl = $controller(controller, locals, true);
                            if (bindToController) {
                                angular.extend(invokeCtrl.instance, locals);
                            }
                            // Support angular@~1.2 invokeCtrl
                            var ctrl = angular.isObject(invokeCtrl) ? invokeCtrl : invokeCtrl();
                            // See angular-route source for this logic
                            element.data('$ngControllerController', ctrl);
                            element.children().data('$ngControllerController', ctrl);

                            if (controllerAs) {
                                scope[controllerAs] = ctrl;
                            }
                        }

                        return linkFn.apply(null, arguments);
                    }
                };
            });

        };

        function findElement (query, element) {
            return angular.element((element || document).querySelectorAll(query));
        }

        var fetchPromises = {};
        function fetchTemplate (template) {
            if (fetchPromises[template]) return fetchPromises[template];
            return (fetchPromises[template] = $http.get(template, {cache: $templateCache})
                .then(function (res) {
                    return res.data;
                }));
        }

    }
    bsCompilerService.$inject = ["$q", "$http", "$injector", "$compile", "$controller", "$templateCache"];

})();
(function () {
    'use strict';

    angular.module('mgcrea.ngStrap.helpers.dateFormatter', [])

        .service('$dateFormatter', ["$locale", "dateFilter", function ($locale, dateFilter) {

            // The unused `lang` arguments are on purpose. The default implementation does not
            // use them and it always uses the locale loaded into the `$locale` service.
            // Custom implementations might use it, thus allowing different directives to
            // have different languages.

            this.getDefaultLocale = function () {
                return $locale.id;
            };

            // Format is either a data format name, e.g. "shortTime" or "fullDate", or a date format
            // Return either the corresponding date format or the given date format.
            this.getDatetimeFormat = function (format, lang) {
                return $locale.DATETIME_FORMATS[format] || format;
            };

            this.weekdaysShort = function (lang) {
                return $locale.DATETIME_FORMATS.SHORTDAY;
            };

            function splitTimeFormat (format) {
                return /(h+)([:\.])?(m+)([:\.])?(s*)[ ]?(a?)/i.exec(format).slice(1);
            }

            // h:mm a => h
            this.hoursFormat = function (timeFormat) {
                return splitTimeFormat(timeFormat)[0];
            };

            // h:mm a => mm
            this.minutesFormat = function (timeFormat) {
                return splitTimeFormat(timeFormat)[2];
            };

            // h:mm:ss a => ss
            this.secondsFormat = function (timeFormat) {
                return splitTimeFormat(timeFormat)[4];
            };

            // h:mm a => :
            this.timeSeparator = function (timeFormat) {
                return splitTimeFormat(timeFormat)[1];
            };

            // h:mm:ss a => true, h:mm a => false
            this.showSeconds = function (timeFormat) {
                return !!splitTimeFormat(timeFormat)[4];
            };

            // h:mm a => true, H.mm => false
            this.showAM = function (timeFormat) {
                return !!splitTimeFormat(timeFormat)[5];
            };

            this.formatDate = function (date, format, lang, timezone) {
                return dateFilter(date, format, timezone);
            };

        }]);

})();
(function() {
    'use strict';

    angular.module('mgcrea.ngStrap.helpers.dateParser', [])

        .provider('$dateParser', ["$localeProvider", function ($localeProvider) {

            // define a custom ParseDate object to use instead of native Date
            // to avoid date values wrapping when setting date component values
            function ParseDate () {
                this.year = 1970;
                this.month = 0;
                this.day = 1;
                this.hours = 0;
                this.minutes = 0;
                this.seconds = 0;
                this.milliseconds = 0;
            }

            ParseDate.prototype.setMilliseconds = function (value) { this.milliseconds = value; };
            ParseDate.prototype.setSeconds = function (value) { this.seconds = value; };
            ParseDate.prototype.setMinutes = function (value) { this.minutes = value; };
            ParseDate.prototype.setHours = function (value) { this.hours = value; };
            ParseDate.prototype.getHours = function () { return this.hours; };
            ParseDate.prototype.setDate = function (value) { this.day = value; };
            ParseDate.prototype.setMonth = function (value) { this.month = value; };
            ParseDate.prototype.setFullYear = function (value) { this.year = value; };
            ParseDate.prototype.fromDate = function (value) {
                this.year = value.getFullYear();
                this.month = value.getMonth();
                this.day = value.getDate();
                this.hours = value.getHours();
                this.minutes = value.getMinutes();
                this.seconds = value.getSeconds();
                this.milliseconds = value.getMilliseconds();
                return this;
            };

            ParseDate.prototype.toDate = function () {
                return new Date(this.year, this.month, this.day, this.hours, this.minutes, this.seconds, this.milliseconds);
            };

            var proto = ParseDate.prototype;

            function noop () {
            }

            function isNumeric (n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            }

            function indexOfCaseInsensitive (array, value) {
                var len = array.length;
                var str = value.toString().toLowerCase();
                for (var i = 0; i < len; i++) {
                    if (array[i].toLowerCase() === str) { return i; }
                }
                return -1; // Return -1 per the "Array.indexOf()" method.
            }

            var defaults = this.defaults = {
                format: 'shortDate',
                strict: false
            };

            this.$get = ["$locale", "dateFilter", function ($locale, dateFilter) {

                var DateParserFactory = function (config) {

                    var options = angular.extend({}, defaults, config);

                    var $dateParser = {};

                    /* eslint-disable key-spacing, quote-props */
                    var regExpMap = {
                        'sss'   : '[0-9]{3}',
                        'ss'    : '[0-5][0-9]',
                        's'     : options.strict ? '[1-5]?[0-9]' : '[0-9]|[0-5][0-9]',
                        'mm'    : '[0-5][0-9]',
                        'm'     : options.strict ? '[1-5]?[0-9]' : '[0-9]|[0-5][0-9]',
                        'HH'    : '[01][0-9]|2[0-3]',
                        'H'     : options.strict ? '1?[0-9]|2[0-3]' : '[01]?[0-9]|2[0-3]',
                        'hh'    : '[0][1-9]|[1][012]',
                        'h'     : options.strict ? '[1-9]|1[012]' : '0?[1-9]|1[012]',
                        'a'     : 'AM|PM',
                        'EEEE'  : $locale.DATETIME_FORMATS.DAY.join('|'),
                        'EEE'   : $locale.DATETIME_FORMATS.SHORTDAY.join('|'),
                        'dd'    : '0[1-9]|[12][0-9]|3[01]',
                        'd'     : options.strict ? '[1-9]|[1-2][0-9]|3[01]' : '0?[1-9]|[1-2][0-9]|3[01]',
                        'MMMM'  : $locale.DATETIME_FORMATS.MONTH.join('|'),
                        'MMM'   : $locale.DATETIME_FORMATS.SHORTMONTH.join('|'),
                        'MM'    : '0[1-9]|1[012]',
                        'M'     : options.strict ? '[1-9]|1[012]' : '0?[1-9]|1[012]',
                        'yyyy'  : '[1]{1}[0-9]{3}|[2]{1}[0-9]{3}',
                        'yy'    : '[0-9]{2}',
                        'y'     : options.strict ? '-?(0|[1-9][0-9]{0,3})' : '-?0*[0-9]{1,4}'
                    };

                    var setFnMap = {
                        'sss'   : proto.setMilliseconds,
                        'ss'    : proto.setSeconds,
                        's'     : proto.setSeconds,
                        'mm'    : proto.setMinutes,
                        'm'     : proto.setMinutes,
                        'HH'    : proto.setHours,
                        'H'     : proto.setHours,
                        'hh'    : proto.setHours,
                        'h'     : proto.setHours,
                        'EEEE'  : noop,
                        'EEE'   : noop,
                        'dd'    : proto.setDate,
                        'd'     : proto.setDate,
                        'a'     : function (value) { var hours = this.getHours() % 12; return this.setHours(value.match(/pm/i) ? hours + 12 : hours); },
                        'MMMM'  : function (value) { return this.setMonth(indexOfCaseInsensitive($locale.DATETIME_FORMATS.MONTH, value)); },
                        'MMM'   : function (value) { return this.setMonth(indexOfCaseInsensitive($locale.DATETIME_FORMATS.SHORTMONTH, value)); },
                        'MM'    : function (value) { return this.setMonth(1 * value - 1); },
                        'M'     : function (value) { return this.setMonth(1 * value - 1); },
                        'yyyy'  : proto.setFullYear,
                        'yy'    : function (value) { return this.setFullYear(2000 + 1 * value); },
                        'y'     : function (value) { return (1 * value <= 50 && value.length === 2) ? this.setFullYear(2000 + 1 * value) : this.setFullYear(1 * value); }
                    };
                    /* eslint-enable key-spacing, quote-props */

                    var regex;
                    var setMap;

                    $dateParser.init = function () {
                        $dateParser.$format = $locale.DATETIME_FORMATS[options.format] || options.format;
                        regex = regExpForFormat($dateParser.$format);
                        setMap = setMapForFormat($dateParser.$format);
                    };

                    $dateParser.isValid = function (date) {
                        if (angular.isDate(date)) return !isNaN(date.getTime());
                        return regex.test(date);
                    };

                    $dateParser.parse = function (value, baseDate, format, timezone) {
                        // check for date format special names
                        if (format) format = $locale.DATETIME_FORMATS[format] || format;
                        if (angular.isDate(value)) value = dateFilter(value, format || $dateParser.$format, timezone);
                        var formatRegex = format ? regExpForFormat(format) : regex;
                        var formatSetMap = format ? setMapForFormat(format) : setMap;
                        var matches = formatRegex.exec(value);
                        if (!matches) return false;
                        // use custom ParseDate object to set parsed values
                        var date = baseDate && !isNaN(baseDate.getTime()) ? new ParseDate().fromDate(baseDate) : new ParseDate().fromDate(new Date(1970, 0, 1, 0));
                        for (var i = 0; i < matches.length - 1; i++) {
                            if (formatSetMap[i]) formatSetMap[i].call(date, matches[i + 1]);
                        }
                        // convert back to native Date object
                        var newDate = date.toDate();

                        // check new native Date object for day values overflow
                        if (parseInt(date.day, 10) !== newDate.getDate()) {
                            return false;
                        }

                        return newDate;
                    };

                    $dateParser.getDateForAttribute = function (key, value) {
                        var date;

                        if (value === 'today') {
                            var today = new Date();
                            date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (key === 'maxDate' ? 1 : 0), 0, 0, 0, (key === 'minDate' ? 0 : -1));
                        } else if (angular.isString(value) && value.match(/^".+"$/)) { // Support {{ dateObj }}
                            date = new Date(value.substr(1, value.length - 2));
                        } else if (isNumeric(value)) {
                            date = new Date(parseInt(value, 10));
                        } else if (angular.isString(value) && value.length === 0) { // Reset date
                            date = key === 'minDate' ? -Infinity : +Infinity;
                        } else {
                            date = new Date(value);
                        }

                        return date;
                    };

                    $dateParser.getTimeForAttribute = function (key, value) {
                        var time;

                        if (value === 'now') {
                            time = new Date().setFullYear(1970, 0, 1);
                        } else if (angular.isString(value) && value.match(/^".+"$/)) {
                            time = new Date(value.substr(1, value.length - 2)).setFullYear(1970, 0, 1);
                        } else if (isNumeric(value)) {
                            time = new Date(parseInt(value, 10)).setFullYear(1970, 0, 1);
                        } else if (angular.isString(value) && value.length === 0) { // Reset time
                            time = key === 'minTime' ? -Infinity : +Infinity;
                        } else {
                            time = $dateParser.parse(value, new Date(1970, 0, 1, 0));
                        }

                        return time;
                    };

                    /* Handle switch to/from daylight saving.
                     * Hours may be non-zero on daylight saving cut-over:
                     * > 12 when midnight changeover, but then cannot generate
                     * midnight datetime, so jump to 1AM, otherwise reset.
                     * @param  date  (Date) the date to check
                     * @return  (Date) the corrected date
                     *
                     * __ copied from jquery ui datepicker __
                     */
                    $dateParser.daylightSavingAdjust = function (date) {
                        if (!date) {
                            return null;
                        }
                        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
                        return date;
                    };

                    /* Correct the date for timezone offset.
                     * @param  date  (Date) the date to adjust
                     * @param  timezone  (string) the timezone to adjust for
                     * @param  undo  (boolean) to add or subtract timezone offset
                     * @return  (Date) the corrected date
                     */
                    $dateParser.timezoneOffsetAdjust = function (date, timezone, undo) {
                        if (!date) {
                            return null;
                        }
                        // Right now, only 'UTC' is supported.
                        if (timezone && timezone === 'UTC') {
                            date = new Date(date.getTime());
                            date.setMinutes(date.getMinutes() + (undo ? -1 : 1) * date.getTimezoneOffset());
                        }
                        return date;
                    };

                    // Private functions

                    function regExpForFormat (format) {
                        // `format` string can contain literal values.
                        // These need to be escaped by surrounding with
                        // single quotes (e.g. `"h 'in the morning'"`).
                        // In order to output a single quote, escape it - i.e.,
                        // two single quotes in a sequence (e.g. `"h 'o''clock'"`).

                        var re = buildDateAbstractRegex(format);
                        return buildDateParseRegex(re);
                    }

                    function buildDateAbstractRegex (format) {
                        var escapedFormat = escapeReservedSymbols(format);
                        var escapedLiteralFormat = escapedFormat.replace(/''/g, '\\\'');
                        var literalRegex = /('(?:\\'|.)*?')/;
                        var formatParts = escapedLiteralFormat.split(literalRegex);
                        var dateElements = Object.keys(regExpMap);
                        var dateRegexParts = [];

                        angular.forEach(formatParts, function (part) {
                            if (isFormatStringLiteral(part)) {
                                part = trimLiteralEscapeChars(part);
                            } else {
                                // Abstract replaces to avoid collisions
                                for (var i = 0; i < dateElements.length; i++) {
                                    part = part.split(dateElements[i]).join('${' + i + '}');
                                }
                            }
                            dateRegexParts.push(part);
                        });

                        return dateRegexParts.join('');
                    }

                    function escapeReservedSymbols (text) {
                        return text.replace(/\\/g, '[\\\\]')
                            .replace(/-/g, '[-]')
                            .replace(/\./g, '[.]')
                            .replace(/\*/g, '[*]')
                            .replace(/\+/g, '[+]')
                            .replace(/\?/g, '[?]')
                            .replace(/\$/g, '[$]')
                            .replace(/\^/g, '[^]')
                            .replace(/\//g, '[/]')
                            .replace(/\\s/g, '[\\s]');
                    }

                    function isFormatStringLiteral (text) {
                        return /^'.*'$/.test(text);
                    }

                    function trimLiteralEscapeChars (text) {
                        return text.replace(/^'(.*)'$/, '$1');
                    }

                    function buildDateParseRegex (abstractRegex) {
                        var dateElements = Object.keys(regExpMap);
                        var re = abstractRegex;

                        // Replace abstracted values
                        for (var i = 0; i < dateElements.length; i++) {
                            re = re.split('${' + i + '}').join('(' + regExpMap[dateElements[i]] + ')');
                        }

                        return new RegExp('^' + re + '$', ['i']);
                    }

                    function setMapForFormat (format) {
                        var re = buildDateAbstractRegex(format);
                        return buildDateParseValuesMap(re);
                    }

                    function buildDateParseValuesMap (abstractRegex) {
                        var dateElements = Object.keys(regExpMap);
                        var valuesRegex = new RegExp('\\${(\\d+)}', 'g');
                        var valuesMatch;
                        var keyIndex;
                        var valueKey;
                        var valueFunction;
                        var valuesFunctionMap = [];

                        /* eslint-disable no-cond-assign */
                        while ((valuesMatch = valuesRegex.exec(abstractRegex)) !== null) {
                            keyIndex = valuesMatch[1];
                            valueKey = dateElements[keyIndex];
                            valueFunction = setFnMap[valueKey];

                            valuesFunctionMap.push(valueFunction);
                        }

                        return valuesFunctionMap;
                    }

                    $dateParser.init();
                    return $dateParser;

                };

                return DateParserFactory;

            }];

        }]);

})();
(function () {
    'use strict';

    angular
        .module('mgcrea.ngStrap.datepicker', [
        'mgcrea.ngStrap.helpers.dateParser',
        'mgcrea.ngStrap.helpers.dateFormatter',
        'mgcrea.ngStrap.tooltip'])

        .provider('$datepicker', function () {

            var defaults = this.defaults = {
                animation: 'am-fade',
                // Uncommenting the following line will break backwards compatability
                // prefixEvent: 'datepicker',
                prefixClass: 'datepicker',
                placement: 'bottom-left',
                templateUrl: 'app/template/datepicker.tpl.html',
                trigger: 'focus',
                container: false,
                keyboard: true,
                html: false,
                delay: 0,
                // lang: $locale.id,
                useNative: false,
                dateType: 'date',
                dateFormat: 'shortDate',
                timezone: null,
                modelDateFormat: null,
                dayFormat: 'dd',
                monthFormat: 'MMM',
                yearFormat: 'yyyy',
                monthTitleFormat: 'MMMM yyyy',
                yearTitleFormat: 'yyyy',
                strictFormat: false,
                autoclose: false,
                minDate: -Infinity,
                maxDate: +Infinity,
                startView: 0,
                minView: 0,
                startWeek: 0,
                daysOfWeekDisabled: '',
                iconLeft: 'glyphicon glyphicon-chevron-left',
                iconRight: 'glyphicon glyphicon-chevron-right'
            };

            this.$get = ["$window", "$document", "$rootScope", "$sce", "$dateFormatter", "datepickerViews", "$tooltip", "$timeout", function ($window, $document, $rootScope, $sce, $dateFormatter, datepickerViews, $tooltip, $timeout) {

                var isNative = /(ip[ao]d|iphone|android)/ig.test($window.navigator.userAgent);
                var isTouch = ('createTouch' in $window.document) && isNative;
                if (!defaults.lang) defaults.lang = $dateFormatter.getDefaultLocale();

                function DatepickerFactory (element, controller, config) {

                    var $datepicker = $tooltip(element, angular.extend({}, defaults, config));
                    var parentScope = config.scope;
                    var options = $datepicker.$options;
                    var scope = $datepicker.$scope;
                    if (options.startView) options.startView -= options.minView;

                    // View vars

                    var pickerViews = datepickerViews($datepicker);
                    $datepicker.$views = pickerViews.views;
                    var viewDate = pickerViews.viewDate;
                    scope.$mode = options.startView;
                    scope.$iconLeft = options.iconLeft;
                    scope.$iconRight = options.iconRight;
                    var $picker = $datepicker.$views[scope.$mode];

                    // Scope methods

                    scope.$select = function (date) {
                        $datepicker.select(date);
                    };
                    scope.$selectPane = function (value) {
                        $datepicker.$selectPane(value);
                    };
                    scope.$toggleMode = function () {
                        $datepicker.setMode((scope.$mode + 1) % $datepicker.$views.length);
                    };

                    // Public methods

                    $datepicker.update = function (date) {
                        // console.warn('$datepicker.update() newValue=%o', date);
                        if (angular.isDate(date) && !isNaN(date.getTime())) {
                            $datepicker.$date = date;
                            $picker.update.call($picker, date);
                        }
                        // Build only if pristine
                        $datepicker.$build(true);
                    };

                    $datepicker.updateDisabledDates = function (dateRanges) {
                        options.disabledDateRanges = dateRanges;
                        for (var i = 0, l = scope.rows.length; i < l; i++) {
                            angular.forEach(scope.rows[i], $datepicker.$setDisabledEl);
                        }
                    };

                    $datepicker.select = function (date, keep) {
                        // console.warn('$datepicker.select', date, scope.$mode);
                        if (!angular.isDate(controller.$dateValue)) controller.$dateValue = new Date(date);
                        if (!scope.$mode || keep) {
                            controller.$setViewValue(angular.copy(date));
                            controller.$render();
                            if (options.autoclose && !keep) {
                                $timeout(function () { $datepicker.hide(true); });
                            }
                        } else {
                            angular.extend(viewDate, {year: date.getFullYear(), month: date.getMonth(), date: date.getDate()});
                            $datepicker.setMode(scope.$mode - 1);
                            $datepicker.$build();
                        }
                    };

                    $datepicker.setMode = function (mode) {
                        // console.warn('$datepicker.setMode', mode);
                        scope.$mode = mode;
                        $picker = $datepicker.$views[scope.$mode];
                        $datepicker.$build();
                    };

                    // Protected methods

                    $datepicker.$build = function (pristine) {
                        // console.warn('$datepicker.$build() viewDate=%o', viewDate);
                        if (pristine === true && $picker.built) return;
                        if (pristine === false && !$picker.built) return;
                        $picker.build.call($picker);
                    };

                    $datepicker.$updateSelected = function () {
                        for (var i = 0, l = scope.rows.length; i < l; i++) {
                            angular.forEach(scope.rows[i], updateSelected);
                        }
                    };

                    $datepicker.$isSelected = function (date) {
                        return $picker.isSelected(date);
                    };

                    $datepicker.$setDisabledEl = function (el) {
                        el.disabled = $picker.isDisabled(el.date);
                    };

                    $datepicker.$selectPane = function (value) {
                        var steps = $picker.steps;
                        // set targetDate to first day of month to avoid problems with
                        // date values rollover. This assumes the viewDate does not
                        // depend on the day of the month
                        var targetDate = new Date(Date.UTC(viewDate.year + ((steps.year || 0) * value), viewDate.month + ((steps.month || 0) * value), 1));
                        angular.extend(viewDate, {year: targetDate.getUTCFullYear(), month: targetDate.getUTCMonth(), date: targetDate.getUTCDate()});
                        $datepicker.$build();
                    };

                    $datepicker.$onMouseDown = function (evt) {
                        // Prevent blur on mousedown on .dropdown-menu
                        evt.preventDefault();
                        evt.stopPropagation();
                        // Emulate click for mobile devices
                        if (isTouch) {
                            var targetEl = angular.element(evt.target);
                            if (targetEl[0].nodeName.toLowerCase() !== 'button') {
                                targetEl = targetEl.parent();
                            }
                            targetEl.triggerHandler('click');
                        }
                    };

                    $datepicker.$onKeyDown = function (evt) {
                        if (!/(38|37|39|40|13)/.test(evt.keyCode) || evt.shiftKey || evt.altKey) return;
                        evt.preventDefault();
                        evt.stopPropagation();

                        if (evt.keyCode === 13) {
                            if (!scope.$mode) {
                                $datepicker.hide(true);
                            } else {
                                scope.$apply(function () { $datepicker.setMode(scope.$mode - 1); });
                            }
                            return;
                        }

                        // Navigate with keyboard
                        $picker.onKeyDown(evt);
                        parentScope.$digest();
                    };

                    // Private

                    function updateSelected (el) {
                        el.selected = $datepicker.$isSelected(el.date);
                    }

                    function focusElement () {
                        element[0].focus();
                    }

                    // Overrides

                    var _init = $datepicker.init;
                    $datepicker.init = function () {
                        if (isNative && options.useNative) {
                            element.prop('type', 'date');
                            element.css('-webkit-appearance', 'textfield');
                            return;
                        } else if (isTouch) {
                            element.prop('type', 'text');
                            element.attr('readonly', 'true');
                            element.on('click', focusElement);
                        }
                        _init();
                    };

                    var _destroy = $datepicker.destroy;
                    $datepicker.destroy = function () {
                        if (isNative && options.useNative) {
                            element.off('click', focusElement);
                        }
                        _destroy();
                    };

                    var _show = $datepicker.show;
                    $datepicker.show = function () {
                        if ((!isTouch && element.attr('readonly')) || element.attr('disabled')) return;
                        _show();
                        // use timeout to hookup the events to prevent
                        // event bubbling from being processed imediately.
                        $timeout(function () {
                            // if $datepicker is no longer showing, don't setup events
                            if (!$datepicker.$isShown) return;
                            $datepicker.$element.on(isTouch ? 'touchstart' : 'mousedown', $datepicker.$onMouseDown);
                            if (options.keyboard) {
                                element.on('keydown', $datepicker.$onKeyDown);
                            }
                        }, 0, false);
                    };

                    var _hide = $datepicker.hide;
                    $datepicker.hide = function (blur) {
                        if (!$datepicker.$isShown) return;
                        $datepicker.$element.off(isTouch ? 'touchstart' : 'mousedown', $datepicker.$onMouseDown);
                        if (options.keyboard) {
                            element.off('keydown', $datepicker.$onKeyDown);
                        }
                        _hide(blur);
                    };

                    return $datepicker;

                }

                DatepickerFactory.defaults = defaults;
                return DatepickerFactory;

            }];

        })

        .directive('bsDatepicker', ["$window", "$parse", "$q", "$dateFormatter", "$dateParser", "$datepicker", function ($window, $parse, $q, $dateFormatter, $dateParser, $datepicker) {

            // var defaults = $datepicker.defaults;
            var isNative = /(ip[ao]d|iphone|android)/ig.test($window.navigator.userAgent);

            return {
                restrict: 'EAC',
                require: 'ngModel',
                link: function postLink (scope, element, attr, controller) {

                    // Directive options
                    var options = {scope: scope};
                    angular.forEach(['template', 'templateUrl', 'controller', 'controllerAs', 'placement', 'container', 'delay', 'trigger', 'html', 'animation', 'autoclose', 'dateType', 'dateFormat', 'timezone', 'modelDateFormat', 'dayFormat', 'strictFormat', 'startWeek', 'startDate', 'useNative', 'lang', 'startView', 'minView', 'iconLeft', 'iconRight', 'daysOfWeekDisabled', 'id', 'prefixClass', 'prefixEvent'], function (key) {
                        if (angular.isDefined(attr[key])) options[key] = attr[key];
                    });

                    // use string regex match boolean attr falsy values, leave truthy values be
                    var falseValueRegExp = /^(false|0|)$/i;
                    angular.forEach(['html', 'container', 'autoclose', 'useNative'], function (key) {
                        if (angular.isDefined(attr[key]) && falseValueRegExp.test(attr[key])) {
                            options[key] = false;
                        }
                    });

                    // bind functions from the attrs to the show and hide events
                    angular.forEach(['onBeforeShow', 'onShow', 'onBeforeHide', 'onHide'], function (key) {
                        var bsKey = 'bs' + key.charAt(0).toUpperCase() + key.slice(1);
                        if (angular.isDefined(attr[bsKey])) {
                            options[key] = scope.$eval(attr[bsKey]);
                        }
                    });

                    // Initialize datepicker
                    var datepicker = $datepicker(element, controller, options);
                    options = datepicker.$options;
                    // Set expected iOS format
                    if (isNative && options.useNative) options.dateFormat = 'yyyy-MM-dd';

                    var lang = options.lang;

                    var formatDate = function (date, format) {
                        return $dateFormatter.formatDate(date, format, lang);
                    };

                    var dateParser = $dateParser({format: options.dateFormat, lang: lang, strict: options.strictFormat});

                    // Visibility binding support
                    if (attr.bsShow) {
                        scope.$watch(attr.bsShow, function (newValue, oldValue) {
                            if (!datepicker || !angular.isDefined(newValue)) return;
                            if (angular.isString(newValue)) newValue = !!newValue.match(/true|,?(datepicker),?/i);
                            if (newValue === true) {
                                datepicker.show();
                            } else {
                                datepicker.hide();
                            }
                        });
                    }

                    // Observe attributes for changes
                    angular.forEach(['minDate', 'maxDate'], function (key) {
                        // console.warn('attr.$observe(%s)', key, attr[key]);
                        if (angular.isDefined(attr[key])) {
                            attr.$observe(key, function (newValue) {
                                // console.warn('attr.$observe(%s)=%o', key, newValue);
                                datepicker.$options[key] = dateParser.getDateForAttribute(key, newValue);
                                // Build only if dirty
                                if (!isNaN(datepicker.$options[key])) datepicker.$build(false);
                                validateAgainstMinMaxDate(controller.$dateValue);
                            });
                        }
                    });

                    // Observe date format
                    if (angular.isDefined(attr.dateFormat)) {
                        attr.$observe('dateFormat', function (newValue) {
                            datepicker.$options.dateFormat = newValue;
                        });
                    }

                    // Watch model for changes
                    scope.$watch(attr.ngModel, function (newValue, oldValue) {
                        datepicker.update(controller.$dateValue);
                    }, true);

                    // Normalize undefined/null/empty array,
                    // so that we don't treat changing from undefined->null as a change.
                    function normalizeDateRanges (ranges) {
                        if (!ranges || !ranges.length) return null;
                        return ranges;
                    }

                    if (angular.isDefined(attr.disabledDates)) {
                        scope.$watch(attr.disabledDates, function (disabledRanges, previousValue) {
                            disabledRanges = normalizeDateRanges(disabledRanges);
                            previousValue = normalizeDateRanges(previousValue);

                            if (disabledRanges) {
                                datepicker.updateDisabledDates(disabledRanges);
                            }
                        });
                    }

                    function validateAgainstMinMaxDate (parsedDate) {
                        if (!angular.isDate(parsedDate)) return;
                        var isMinValid = isNaN(datepicker.$options.minDate) || parsedDate.getTime() >= datepicker.$options.minDate;
                        var isMaxValid = isNaN(datepicker.$options.maxDate) || parsedDate.getTime() <= datepicker.$options.maxDate;
                        var isValid = isMinValid && isMaxValid;
                        controller.$setValidity('date', isValid);
                        controller.$setValidity('min', isMinValid);
                        controller.$setValidity('max', isMaxValid);
                        // Only update the model when we have a valid date
                        if (isValid) controller.$dateValue = parsedDate;
                    }

                    // viewValue -> $parsers -> modelValue
                    controller.$parsers.unshift(function (viewValue) {
                        // console.warn('$parser("%s"): viewValue=%o', element.attr('ng-model'), viewValue);
                        var date;
                        // Null values should correctly reset the model value & validity
                        if (!viewValue) {
                            controller.$setValidity('date', true);
                            // BREAKING CHANGE:
                            // return null (not undefined) when input value is empty, so angularjs 1.3
                            // ngModelController can go ahead and run validators, like ngRequired
                            return null;
                        }
                        var parsedDate = dateParser.parse(viewValue, controller.$dateValue);
                        if (!parsedDate || isNaN(parsedDate.getTime())) {
                            controller.$setValidity('date', false);
                            // return undefined, causes ngModelController to
                            // invalidate model value
                            return;
                        }
                        validateAgainstMinMaxDate(parsedDate);

                        if (options.dateType === 'string') {
                            date = dateParser.timezoneOffsetAdjust(parsedDate, options.timezone, true);
                            return formatDate(date, options.modelDateFormat || options.dateFormat);
                        }
                        date = dateParser.timezoneOffsetAdjust(controller.$dateValue, options.timezone, true);
                        if (options.dateType === 'number') {
                            return date.getTime();
                        } else if (options.dateType === 'unix') {
                            return date.getTime() / 1000;
                        } else if (options.dateType === 'iso') {
                            return date.toISOString();
                        }
                        return new Date(date);
                    });

                    // modelValue -> $formatters -> viewValue
                    controller.$formatters.push(function (modelValue) {
                        // console.warn('$formatter("%s"): modelValue=%o (%o)', element.attr('ng-model'), modelValue, typeof modelValue);
                        var date;
                        if (angular.isUndefined(modelValue) || modelValue === null) {
                            date = NaN;
                        } else if (angular.isDate(modelValue)) {
                            date = modelValue;
                        } else if (options.dateType === 'string') {
                            date = dateParser.parse(modelValue, null, options.modelDateFormat);
                        } else if (options.dateType === 'unix') {
                            date = new Date(modelValue * 1000);
                        } else {
                            date = new Date(modelValue);
                        }
                        // Setup default value?
                        // if (isNaN(date.getTime())) {
                        //   var today = new Date();
                        //   date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
                        // }
                        controller.$dateValue = dateParser.timezoneOffsetAdjust(date, options.timezone);
                        return getDateFormattedString();
                    });

                    // viewValue -> element
                    controller.$render = function () {
                        // console.warn('$render("%s"): viewValue=%o', element.attr('ng-model'), controller.$viewValue);
                        element.val(getDateFormattedString());
                    };

                    function getDateFormattedString () {
                        return !controller.$dateValue || isNaN(controller.$dateValue.getTime()) ? '' : formatDate(controller.$dateValue, options.dateFormat);
                    }

                    // Garbage collection
                    scope.$on('$destroy', function () {
                        if (datepicker) datepicker.destroy();
                        options = null;
                        datepicker = null;
                    });

                }
            };

        }])

        .provider('datepickerViews', function () {

            // var defaults = this.defaults = {
            //   dayFormat: 'dd',
            //   daySplit: 7
            // };

            // Split array into smaller arrays
            function split (arr, size) {
                var arrays = [];
                while (arr.length > 0) {
                    arrays.push(arr.splice(0, size));
                }
                return arrays;
            }

            // Modulus operator
            function mod (n, m) {
                return ((n % m) + m) % m;
            }

            this.$get = ["$dateFormatter", "$dateParser", "$sce", function ($dateFormatter, $dateParser, $sce) {

                return function (picker) {

                    var scope = picker.$scope;
                    var options = picker.$options;

                    var lang = options.lang;
                    var formatDate = function (date, format) {
                        return $dateFormatter.formatDate(date, format, lang);
                    };
                    var dateParser = $dateParser({format: options.dateFormat, lang: lang, strict: options.strictFormat});

                    var weekDaysMin = $dateFormatter.weekdaysShort(lang);
                    var weekDaysLabels = weekDaysMin.slice(options.startWeek).concat(weekDaysMin.slice(0, options.startWeek));
                    var weekDaysLabelsHtml = $sce.trustAsHtml('<th class="dow text-center">' + weekDaysLabels.join('</th><th class="dow text-center">') + '</th>');

                    var startDate = picker.$date || (options.startDate ? dateParser.getDateForAttribute('startDate', options.startDate) : new Date());
                    var viewDate = {year: startDate.getFullYear(), month: startDate.getMonth(), date: startDate.getDate()};

                    var views = [{
                        format: options.dayFormat,
                        split: 7,
                        steps: {month: 1},
                        update: function (date, force) {
                            if (!this.built || force || date.getFullYear() !== viewDate.year || date.getMonth() !== viewDate.month) {
                                angular.extend(viewDate, {year: picker.$date.getFullYear(), month: picker.$date.getMonth(), date: picker.$date.getDate()});
                                picker.$build();
                            } else if (date.getDate() !== viewDate.date || date.getDate() === 1) {
                                // chaging picker current month will cause viewDate.date to be set to first day of the month,
                                // in $datepicker.$selectPane, so picker would not update selected day display if
                                // user picks first day of the new month.
                                // As a workaround, we are always forcing update when picked date is first day of month.
                                viewDate.date = picker.$date.getDate();
                                picker.$updateSelected();
                            }
                        },
                        build: function () {
                            var firstDayOfMonth = new Date(viewDate.year, viewDate.month, 1);
                            var firstDayOfMonthOffset = firstDayOfMonth.getTimezoneOffset();
                            var firstDate = new Date(+firstDayOfMonth - mod(firstDayOfMonth.getDay() - options.startWeek, 7) * 864e5);
                            var firstDateOffset = firstDate.getTimezoneOffset();
                            var today = dateParser.timezoneOffsetAdjust(new Date(), options.timezone).toDateString();
                            // Handle daylight time switch
                            if (firstDateOffset !== firstDayOfMonthOffset) firstDate = new Date(+firstDate + (firstDateOffset - firstDayOfMonthOffset) * 60e3);
                            var days = [];
                            var day;
                            for (var i = 0; i < 42; i++) { // < 7 * 6
                                day = dateParser.daylightSavingAdjust(new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate() + i));
                                days.push({date: day, isToday: day.toDateString() === today, label: formatDate(day, this.format), selected: picker.$date && this.isSelected(day), muted: day.getMonth() !== viewDate.month, disabled: this.isDisabled(day)});
                            }
                            scope.title = formatDate(firstDayOfMonth, options.monthTitleFormat);
                            scope.showLabels = true;
                            scope.labels = weekDaysLabelsHtml;
                            scope.rows = split(days, this.split);
                            this.built = true;
                        },
                        isSelected: function (date) {
                            return picker.$date && date.getFullYear() === picker.$date.getFullYear() && date.getMonth() === picker.$date.getMonth() && date.getDate() === picker.$date.getDate();
                        },
                        isDisabled: function (date) {
                            var time = date.getTime();

                            // Disabled because of min/max date.
                            if (time < options.minDate || time > options.maxDate) return true;

                            // Disabled due to being a disabled day of the week
                            if (options.daysOfWeekDisabled.indexOf(date.getDay()) !== -1) return true;

                            // Disabled because of disabled date range.
                            if (options.disabledDateRanges) {
                                for (var i = 0; i < options.disabledDateRanges.length; i++) {
                                    if (time >= options.disabledDateRanges[i].start && time <= options.disabledDateRanges[i].end) {
                                        return true;
                                    }
                                }
                            }

                            return false;
                        },
                        onKeyDown: function (evt) {
                            if (!picker.$date) {
                                return;
                            }
                            var actualTime = picker.$date.getTime();
                            var newDate;

                            if (evt.keyCode === 37) newDate = new Date(actualTime - 1 * 864e5);
                            else if (evt.keyCode === 38) newDate = new Date(actualTime - 7 * 864e5);
                            else if (evt.keyCode === 39) newDate = new Date(actualTime + 1 * 864e5);
                            else if (evt.keyCode === 40) newDate = new Date(actualTime + 7 * 864e5);

                            if (!this.isDisabled(newDate)) picker.select(newDate, true);
                        }
                    }, {
                        name: 'month',
                        format: options.monthFormat,
                        split: 4,
                        steps: {year: 1},
                        update: function (date, force) {
                            if (!this.built || date.getFullYear() !== viewDate.year) {
                                angular.extend(viewDate, {year: picker.$date.getFullYear(), month: picker.$date.getMonth(), date: picker.$date.getDate()});
                                picker.$build();
                            } else if (date.getMonth() !== viewDate.month) {
                                angular.extend(viewDate, {month: picker.$date.getMonth(), date: picker.$date.getDate()});
                                picker.$updateSelected();
                            }
                        },
                        build: function () {
                            // var firstMonth = new Date(viewDate.year, 0, 1);
                            var months = [];
                            var month;
                            for (var i = 0; i < 12; i++) {
                                month = new Date(viewDate.year, i, 1);
                                months.push({date: month, label: formatDate(month, this.format), selected: picker.$isSelected(month), disabled: this.isDisabled(month)});
                            }
                            scope.title = formatDate(month, options.yearTitleFormat);
                            scope.showLabels = false;
                            scope.rows = split(months, this.split);
                            this.built = true;
                        },
                        isSelected: function (date) {
                            return picker.$date && date.getFullYear() === picker.$date.getFullYear() && date.getMonth() === picker.$date.getMonth();
                        },
                        isDisabled: function (date) {
                            var lastDate = +new Date(date.getFullYear(), date.getMonth() + 1, 0);
                            return lastDate < options.minDate || date.getTime() > options.maxDate;
                        },
                        onKeyDown: function (evt) {
                            if (!picker.$date) {
                                return;
                            }
                            var actualMonth = picker.$date.getMonth();
                            var newDate = new Date(picker.$date);

                            if (evt.keyCode === 37) newDate.setMonth(actualMonth - 1);
                            else if (evt.keyCode === 38) newDate.setMonth(actualMonth - 4);
                            else if (evt.keyCode === 39) newDate.setMonth(actualMonth + 1);
                            else if (evt.keyCode === 40) newDate.setMonth(actualMonth + 4);

                            if (!this.isDisabled(newDate)) picker.select(newDate, true);
                        }
                    }, {
                        name: 'year',
                        format: options.yearFormat,
                        split: 4,
                        steps: {year: 12},
                        update: function (date, force) {
                            if (!this.built || force || parseInt(date.getFullYear() / 20, 10) !== parseInt(viewDate.year / 20, 10)) {
                                angular.extend(viewDate, {year: picker.$date.getFullYear(), month: picker.$date.getMonth(), date: picker.$date.getDate()});
                                picker.$build();
                            } else if (date.getFullYear() !== viewDate.year) {
                                angular.extend(viewDate, {year: picker.$date.getFullYear(), month: picker.$date.getMonth(), date: picker.$date.getDate()});
                                picker.$updateSelected();
                            }
                        },
                        build: function () {
                            var firstYear = viewDate.year - viewDate.year % (this.split * 3);
                            var years = [];
                            var year;
                            for (var i = 0; i < 12; i++) {
                                year = new Date(firstYear + i, 0, 1);
                                years.push({date: year, label: formatDate(year, this.format), selected: picker.$isSelected(year), disabled: this.isDisabled(year)});
                            }
                            scope.title = years[0].label + '-' + years[years.length - 1].label;
                            scope.showLabels = false;
                            scope.rows = split(years, this.split);
                            this.built = true;
                        },
                        isSelected: function (date) {
                            return picker.$date && date.getFullYear() === picker.$date.getFullYear();
                        },
                        isDisabled: function (date) {
                            var lastDate = +new Date(date.getFullYear() + 1, 0, 0);
                            return lastDate < options.minDate || date.getTime() > options.maxDate;
                        },
                        onKeyDown: function (evt) {
                            if (!picker.$date) {
                                return;
                            }
                            var actualYear = picker.$date.getFullYear();
                            var newDate = new Date(picker.$date);

                            if (evt.keyCode === 37) newDate.setYear(actualYear - 1);
                            else if (evt.keyCode === 38) newDate.setYear(actualYear - 4);
                            else if (evt.keyCode === 39) newDate.setYear(actualYear + 1);
                            else if (evt.keyCode === 40) newDate.setYear(actualYear + 4);

                            if (!this.isDisabled(newDate)) picker.select(newDate, true);
                        }
                    }];

                    return {
                        views: options.minView ? Array.prototype.slice.call(views, options.minView) : views,
                        viewDate: viewDate
                    };

                };

            }];

        });

})();
(function () {
    'use strict';

    angular
        .module('mgcrea.ngStrap.timepicker', [
            'mgcrea.ngStrap.helpers.dateParser',
            'mgcrea.ngStrap.helpers.dateFormatter',
            'mgcrea.ngStrap.tooltip'
        ])

        .provider('$timepicker', function () {

            var defaults = this.defaults = {
                animation: 'am-fade',
                // uncommenting the following line will break backwards compatability
                // prefixEvent: 'timepicker',
                prefixClass: 'timepicker',
                placement: 'bottom-left',
                templateUrl: 'app/template/timepicker.tpl.html',
                trigger: 'focus',
                container: false,
                keyboard: true,
                html: false,
                delay: 0,
                // lang: $locale.id,
                useNative: true,
                timeType: 'date',
                timeFormat: 'shortTime',
                timezone: null,
                modelTimeFormat: null,
                autoclose: false,
                minTime: -Infinity,
                maxTime: +Infinity,
                length: 5,
                hourStep: 1,
                minuteStep: 5,
                secondStep: 5,
                roundDisplay: false,
                iconUp: 'glyphicon glyphicon-chevron-up',
                iconDown: 'glyphicon glyphicon-chevron-down',
                arrowBehavior: 'pager'
            };

            this.$get = ["$window", "$document", "$rootScope", "$sce", "$dateFormatter", "$tooltip", "$timeout", function ($window, $document, $rootScope, $sce, $dateFormatter, $tooltip, $timeout) {

                var isNative = /(ip[ao]d|iphone|android)/ig.test($window.navigator.userAgent);
                var isTouch = ('createTouch' in $window.document) && isNative;
                if (!defaults.lang) {
                    defaults.lang = $dateFormatter.getDefaultLocale();
                }

                function timepickerFactory (element, controller, config) {

                    var $timepicker = $tooltip(element, angular.extend({}, defaults, config));
                    var parentScope = config.scope;
                    var options = $timepicker.$options;
                    var scope = $timepicker.$scope;

                    var lang = options.lang;
                    var formatDate = function (date, format, timezone) {
                        return $dateFormatter.formatDate(date, format, lang, timezone);
                    };

                    function floorMinutes (time) {
                        // coeff used to floor current time to nearest minuteStep interval
                        var coeff = 1000 * 60 * options.minuteStep;
                        return new Date(Math.floor(time.getTime() / coeff) * coeff);
                    }

                    // View vars

                    var selectedIndex = 0;
                    var defaultDate = options.roundDisplay ? floorMinutes(new Date()) : new Date();
                    var startDate = controller.$dateValue || defaultDate;
                    var viewDate = {
                        hour: startDate.getHours(),
                        meridian: startDate.getHours() < 12,
                        minute: startDate.getMinutes(),
                        second: startDate.getSeconds(),
                        millisecond: startDate.getMilliseconds()
                    };

                    var format = $dateFormatter.getDatetimeFormat(options.timeFormat, lang);

                    var hoursFormat = $dateFormatter.hoursFormat(format);
                    var timeSeparator = $dateFormatter.timeSeparator(format);
                    var minutesFormat = $dateFormatter.minutesFormat(format);
                    var secondsFormat = $dateFormatter.secondsFormat(format);
                    var showSeconds = $dateFormatter.showSeconds(format);
                    var showAM = $dateFormatter.showAM(format);

                    scope.$iconUp = options.iconUp;
                    scope.$iconDown = options.iconDown;

                    // Scope methods

                    scope.$select = function (date, index) {
                        $timepicker.select(date, index);
                    };
                    scope.$moveIndex = function (value, index) {
                        $timepicker.$moveIndex(value, index);
                    };
                    scope.$switchMeridian = function (date) {
                        $timepicker.switchMeridian(date);
                    };

                    // Public methods

                    $timepicker.update = function (date) {
                        // console.warn('$timepicker.update() newValue=%o', date);
                        if (angular.isDate(date) && !isNaN(date.getTime())) {
                            $timepicker.$date = date;
                            angular.extend(viewDate, {
                                hour: date.getHours(),
                                minute: date.getMinutes(),
                                second: date.getSeconds(),
                                millisecond: date.getMilliseconds()
                            });
                            $timepicker.$build();
                        } else if (!$timepicker.$isBuilt) {
                            $timepicker.$build();
                        }
                    };

                    $timepicker.select = function (date, index, keep) {
                        // console.warn('$timepicker.select', date, scope.$mode);
                        if (!controller.$dateValue || isNaN(controller.$dateValue.getTime())) controller.$dateValue = new Date(1970, 0, 1);
                        if (!angular.isDate(date)) date = new Date(date);
                        if (index === 0) controller.$dateValue.setHours(date.getHours());
                        else if (index === 1) controller.$dateValue.setMinutes(date.getMinutes());
                        else if (index === 2) controller.$dateValue.setSeconds(date.getSeconds());
                        controller.$setViewValue(angular.copy(controller.$dateValue));
                        controller.$render();
                        if (options.autoclose && !keep) {
                            $timeout(function () {
                                $timepicker.hide(true);
                            });
                        }
                    };

                    $timepicker.switchMeridian = function (date) {
                        if (!controller.$dateValue || isNaN(controller.$dateValue.getTime())) {
                            return;
                        }
                        var hours = (date || controller.$dateValue).getHours();
                        controller.$dateValue.setHours(hours < 12 ? hours + 12 : hours - 12);
                        controller.$setViewValue(angular.copy(controller.$dateValue));
                        controller.$render();
                    };

                    // Protected methods

                    $timepicker.$build = function () {
                        // console.warn('$timepicker.$build() viewDate=%o', viewDate);
                        var i;
                        var midIndex = scope.midIndex = parseInt(options.length / 2, 10);
                        var hours = [];
                        var hour;
                        for (i = 0; i < options.length; i++) {
                            hour = new Date(1970, 0, 1, viewDate.hour - (midIndex - i) * options.hourStep);
                            hours.push({
                                date: hour,
                                label: formatDate(hour, hoursFormat),
                                selected: $timepicker.$date && $timepicker.$isSelected(hour, 0),
                                disabled: $timepicker.$isDisabled(hour, 0)
                            });
                        }
                        var minutes = [];
                        var minute;
                        for (i = 0; i < options.length; i++) {
                            minute = new Date(1970, 0, 1, 0, viewDate.minute - (midIndex - i) * options.minuteStep);
                            minutes.push({
                                date: minute,
                                label: formatDate(minute, minutesFormat),
                                selected: $timepicker.$date && $timepicker.$isSelected(minute, 1),
                                disabled: $timepicker.$isDisabled(minute, 1)
                            });
                        }
                        var seconds = [];
                        var second;
                        for (i = 0; i < options.length; i++) {
                            second = new Date(1970, 0, 1, 0, 0, viewDate.second - (midIndex - i) * options.secondStep);
                            seconds.push({
                                date: second,
                                label: formatDate(second, secondsFormat),
                                selected: $timepicker.$date && $timepicker.$isSelected(second, 2),
                                disabled: $timepicker.$isDisabled(second, 2)
                            });
                        }

                        var rows = [];
                        for (i = 0; i < options.length; i++) {
                            if (showSeconds) {
                                rows.push([hours[i], minutes[i], seconds[i]]);
                            } else {
                                rows.push([hours[i], minutes[i]]);
                            }
                        }
                        scope.rows = rows;
                        scope.showSeconds = showSeconds;
                        scope.showAM = showAM;
                        scope.isAM = ($timepicker.$date || hours[midIndex].date).getHours() < 12;
                        scope.timeSeparator = timeSeparator;
                        $timepicker.$isBuilt = true;
                    };

                    $timepicker.$isSelected = function (date, index) {
                        if (!$timepicker.$date) return false;
                        else if (index === 0) {
                            return date.getHours() === $timepicker.$date.getHours();
                        } else if (index === 1) {
                            return date.getMinutes() === $timepicker.$date.getMinutes();
                        } else if (index === 2) {
                            return date.getSeconds() === $timepicker.$date.getSeconds();
                        }
                    };

                    $timepicker.$isDisabled = function (date, index) {
                        var selectedTime;
                        if (index === 0) {
                            selectedTime = date.getTime() + viewDate.minute * 6e4 + viewDate.second * 1e3;
                        } else if (index === 1) {
                            selectedTime = date.getTime() + viewDate.hour * 36e5 + viewDate.second * 1e3;
                        } else if (index === 2) {
                            selectedTime = date.getTime() + viewDate.hour * 36e5 + viewDate.minute * 6e4;
                        }
                        return selectedTime < options.minTime * 1 || selectedTime > options.maxTime * 1;
                    };

                    scope.$arrowAction = function (value, index) {
                        if (options.arrowBehavior === 'picker') {
                            $timepicker.$setTimeByStep(value, index);
                        } else {
                            $timepicker.$moveIndex(value, index);
                        }
                    };

                    $timepicker.$setTimeByStep = function (value, index) {
                        var newDate = new Date($timepicker.$date || startDate);
                        var hours = newDate.getHours();
                        var minutes = newDate.getMinutes();
                        var seconds = newDate.getSeconds();
                        if (index === 0) {
                            newDate.setHours(hours - (parseInt(options.hourStep, 10) * value));
                        } else if (index === 1) {
                            newDate.setMinutes(minutes - (parseInt(options.minuteStep, 10) * value));
                        } else if (index === 2) {
                            newDate.setSeconds(seconds - (parseInt(options.secondStep, 10) * value));
                        }
                        $timepicker.select(newDate, index, true);
                    };

                    $timepicker.$moveIndex = function (value, index) {
                        var targetDate;
                        if (index === 0) {
                            targetDate = new Date(1970, 0, 1, viewDate.hour + (value * options.length), viewDate.minute, viewDate.second);
                            angular.extend(viewDate, {
                                hour: targetDate.getHours()
                            });
                        } else if (index === 1) {
                            targetDate = new Date(1970, 0, 1, viewDate.hour, viewDate.minute + (value * options.length * options.minuteStep), viewDate.second);
                            angular.extend(viewDate, {
                                minute: targetDate.getMinutes()
                            });
                        } else if (index === 2) {
                            targetDate = new Date(1970, 0, 1, viewDate.hour, viewDate.minute, viewDate.second + (value * options.length * options.secondStep));
                            angular.extend(viewDate, {
                                second: targetDate.getSeconds()
                            });
                        }
                        $timepicker.$build();
                    };

                    $timepicker.$onMouseDown = function (evt) {
                        // Prevent blur on mousedown on .dropdown-menu
                        if (evt.target.nodeName.toLowerCase() !== 'input') evt.preventDefault();
                        evt.stopPropagation();
                        // Emulate click for mobile devices
                        if (isTouch) {
                            var targetEl = angular.element(evt.target);
                            if (targetEl[0].nodeName.toLowerCase() !== 'button') {
                                targetEl = targetEl.parent();
                            }
                            targetEl.triggerHandler('click');
                        }
                    };

                    $timepicker.$onKeyDown = function (evt) {
                        if (!/(38|37|39|40|13)/.test(evt.keyCode) || evt.shiftKey || evt.altKey) return;
                        evt.preventDefault();
                        evt.stopPropagation();

                        // Close on enter
                        if (evt.keyCode === 13) {
                            $timepicker.hide(true);
                            return;
                        }

                        // Navigate with keyboard
                        var newDate = new Date($timepicker.$date);
                        var hours = newDate.getHours();
                        var hoursLength = formatDate(newDate, hoursFormat).length;
                        var minutes = newDate.getMinutes();
                        var minutesLength = formatDate(newDate, minutesFormat).length;
                        var seconds = newDate.getSeconds();
                        var secondsLength = formatDate(newDate, secondsFormat).length;
                        var sepLength = 1;
                        var lateralMove = /(37|39)/.test(evt.keyCode);
                        var count = 2 + showSeconds * 1 + showAM * 1;

                        // Navigate indexes (left, right)
                        if (lateralMove) {
                            if (evt.keyCode === 37) selectedIndex = selectedIndex < 1 ? count - 1 : selectedIndex - 1;
                            else if (evt.keyCode === 39) selectedIndex = selectedIndex < count - 1 ? selectedIndex + 1 : 0;
                        }

                        // Update values (up, down)
                        var selectRange = [0, hoursLength];
                        var incr = 0;
                        if (evt.keyCode === 38) incr = -1;
                        if (evt.keyCode === 40) incr = +1;
                        var isSeconds = selectedIndex === 2 && showSeconds;
                        var isMeridian = selectedIndex === 2 && !showSeconds || selectedIndex === 3 && showSeconds;
                        if (selectedIndex === 0) {
                            newDate.setHours(hours + incr * parseInt(options.hourStep, 10));
                            // re-calculate hours length because we have changed hours value
                            hoursLength = formatDate(newDate, hoursFormat).length;
                            selectRange = [0, hoursLength];
                        } else if (selectedIndex === 1) {
                            newDate.setMinutes(minutes + incr * parseInt(options.minuteStep, 10));
                            // re-calculate minutes length because we have changes minutes value
                            minutesLength = formatDate(newDate, minutesFormat).length;
                            selectRange = [hoursLength + sepLength, minutesLength];
                        } else if (isSeconds) {
                            newDate.setSeconds(seconds + incr * parseInt(options.secondStep, 10));
                            // re-calculate seconds length because we have changes seconds value
                            secondsLength = formatDate(newDate, secondsFormat).length;
                            selectRange = [hoursLength + sepLength + minutesLength + sepLength, secondsLength];
                        } else if (isMeridian) {
                            if (!lateralMove) $timepicker.switchMeridian();
                            selectRange = [hoursLength + sepLength + minutesLength + sepLength + (secondsLength + sepLength) * showSeconds, 2];
                        }
                        $timepicker.select(newDate, selectedIndex, true);
                        createSelection(selectRange[0], selectRange[1]);
                        parentScope.$digest();
                    };

                    // Private

                    function createSelection (start, length) {
                        var end = start + length;
                        if (element[0].createTextRange) {
                            var selRange = element[0].createTextRange();
                            selRange.collapse(true);
                            selRange.moveStart('character', start);
                            selRange.moveEnd('character', end);
                            selRange.select();
                        } else if (element[0].setSelectionRange) {
                            element[0].setSelectionRange(start, end);
                        } else if (angular.isUndefined(element[0].selectionStart)) {
                            element[0].selectionStart = start;
                            element[0].selectionEnd = end;
                        }
                    }

                    function focusElement () {
                        element[0].focus();
                    }

                    // Overrides

                    var _init = $timepicker.init;
                    $timepicker.init = function () {
                        if (isNative && options.useNative) {
                            element.prop('type', 'time');
                            element.css('-webkit-appearance', 'textfield');
                            return;
                        } else if (isTouch) {
                            element.prop('type', 'text');
                            element.attr('readonly', 'true');
                            element.on('click', focusElement);
                        }
                        _init();
                    };

                    var _destroy = $timepicker.destroy;
                    $timepicker.destroy = function () {
                        if (isNative && options.useNative) {
                            element.off('click', focusElement);
                        }
                        _destroy();
                    };

                    var _show = $timepicker.show;
                    $timepicker.show = function () {
                        if ((!isTouch && element.attr('readonly')) || element.attr('disabled')) return;
                        _show();
                        // use timeout to hookup the events to prevent
                        // event bubbling from being processed imediately.
                        $timeout(function () {
                            if ($timepicker.$element) $timepicker.$element.on(isTouch ? 'touchstart' : 'mousedown', $timepicker.$onMouseDown);
                            if (options.keyboard) {
                                if (element) element.on('keydown', $timepicker.$onKeyDown);
                            }
                        }, 0, false);
                    };

                    var _hide = $timepicker.hide;
                    $timepicker.hide = function (blur) {
                        if (!$timepicker.$isShown) return;
                        if ($timepicker.$element) $timepicker.$element.off(isTouch ? 'touchstart' : 'mousedown', $timepicker.$onMouseDown);
                        if (options.keyboard) {
                            if (element) element.off('keydown', $timepicker.$onKeyDown);
                        }
                        _hide(blur);
                    };

                    return $timepicker;

                }

                timepickerFactory.defaults = defaults;
                return timepickerFactory;

            }];

        })


        .directive('bsTimepicker', ["$window", "$parse", "$q", "$dateFormatter", "$dateParser", "$timepicker", function ($window, $parse, $q, $dateFormatter, $dateParser, $timepicker) {

            var defaults = $timepicker.defaults;
            var isNative = /(ip[ao]d|iphone|android)/ig.test($window.navigator.userAgent);

            return {
                restrict: 'EAC',
                require: 'ngModel',
                link: function postLink (scope, element, attr, controller) {

                    // Directive options
                    var options = {
                        scope: scope
                    };
                    angular.forEach(['template', 'templateUrl', 'controller', 'controllerAs', 'placement', 'container', 'delay', 'trigger', 'keyboard', 'html', 'animation', 'autoclose', 'timeType', 'timeFormat', 'timezone', 'modelTimeFormat', 'useNative', 'hourStep', 'minuteStep', 'secondStep', 'length', 'arrowBehavior', 'iconUp', 'iconDown', 'roundDisplay', 'id', 'prefixClass', 'prefixEvent'], function (key) {
                        if (angular.isDefined(attr[key])) options[key] = attr[key];
                    });

                    // use string regex match boolean attr falsy values, leave truthy values be
                    var falseValueRegExp = /^(false|0|)$/i;
                    angular.forEach(['html', 'container', 'autoclose', 'useNative', 'roundDisplay'], function (key) {
                        if (angular.isDefined(attr[key]) && falseValueRegExp.test(attr[key])) {
                            options[key] = false;
                        }
                    });

                    // bind functions from the attrs to the show and hide events
                    angular.forEach(['onBeforeShow', 'onShow', 'onBeforeHide', 'onHide'], function (key) {
                        var bsKey = 'bs' + key.charAt(0).toUpperCase() + key.slice(1);
                        if (angular.isDefined(attr[bsKey])) {
                            options[key] = scope.$eval(attr[bsKey]);
                        }
                    });

                    // Initialize timepicker
                    if (isNative && (options.useNative || defaults.useNative)) options.timeFormat = 'HH:mm';
                    var timepicker = $timepicker(element, controller, options);
                    options = timepicker.$options;

                    var lang = options.lang;
                    var formatDate = function (date, format, timezone) {
                        return $dateFormatter.formatDate(date, format, lang, timezone);
                    };

                    // Visibility binding support
                    if (attr.bsShow) {
                        scope.$watch(attr.bsShow, function (newValue, oldValue) {
                            if (!timepicker || !angular.isDefined(newValue)) return;
                            if (angular.isString(newValue)) newValue = !!newValue.match(/true|,?(timepicker),?/i);
                            if (newValue === true) {
                                timepicker.show();
                            } else {
                                timepicker.hide();
                            }
                        });
                    }

                    // Initialize parser
                    var dateParser = $dateParser({
                        format: options.timeFormat,
                        lang: lang
                    });

                    // Observe attributes for changes
                    angular.forEach(['minTime', 'maxTime'], function (key) {
                        // console.warn('attr.$observe(%s)', key, attr[key]);
                        if (angular.isDefined(attr[key])) {
                            attr.$observe(key, function (newValue) {
                                timepicker.$options[key] = dateParser.getTimeForAttribute(key, newValue);
                                if (!isNaN(timepicker.$options[key])) timepicker.$build();
                                validateAgainstMinMaxTime(controller.$dateValue);
                            });
                        }
                    });

                    // Watch model for changes
                    scope.$watch(attr.ngModel, function (newValue, oldValue) {
                        // console.warn('scope.$watch(%s)', attr.ngModel, newValue, oldValue, controller.$dateValue);
                        timepicker.update(controller.$dateValue);
                    }, true);

                    function validateAgainstMinMaxTime (parsedTime) {
                        if (!angular.isDate(parsedTime)) return;
                        var isMinValid = isNaN(options.minTime) || new Date(parsedTime.getTime()).setFullYear(1970, 0, 1) >= options.minTime;
                        var isMaxValid = isNaN(options.maxTime) || new Date(parsedTime.getTime()).setFullYear(1970, 0, 1) <= options.maxTime;
                        var isValid = isMinValid && isMaxValid;
                        controller.$setValidity('date', isValid);
                        controller.$setValidity('min', isMinValid);
                        controller.$setValidity('max', isMaxValid);
                        // Only update the model when we have a valid date
                        if (!isValid) {
                            return;
                        }
                        controller.$dateValue = parsedTime;
                    }

                    // viewValue -> $parsers -> modelValue
                    controller.$parsers.unshift(function (viewValue) {
                        // console.warn('$parser("%s"): viewValue=%o', element.attr('ng-model'), viewValue);
                        var date;
                        // Null values should correctly reset the model value & validity
                        if (!viewValue) {
                            // BREAKING CHANGE:
                            // return null (not undefined) when input value is empty, so angularjs 1.3
                            // ngModelController can go ahead and run validators, like ngRequired
                            controller.$setValidity('date', true);
                            return null;
                        }
                        var parsedTime = angular.isDate(viewValue) ? viewValue : dateParser.parse(viewValue, controller.$dateValue);
                        if (!parsedTime || isNaN(parsedTime.getTime())) {
                            controller.$setValidity('date', false);
                            // Return undefined, causes ngModelController to
                            // invalidate model value
                            return undefined;
                        }
                        validateAgainstMinMaxTime(parsedTime);

                        if (options.timeType === 'string') {
                            date = dateParser.timezoneOffsetAdjust(parsedTime, options.timezone, true);
                            return formatDate(date, options.modelTimeFormat || options.timeFormat);
                        }
                        date = dateParser.timezoneOffsetAdjust(controller.$dateValue, options.timezone, true);
                        if (options.timeType === 'number') {
                            return date.getTime();
                        } else if (options.timeType === 'unix') {
                            return date.getTime() / 1000;
                        } else if (options.timeType === 'iso') {
                            return date.toISOString();
                        }
                        return new Date(date);
                    });

                    // modelValue -> $formatters -> viewValue
                    controller.$formatters.push(function (modelValue) {
                        // console.warn('$formatter("%s"): modelValue=%o (%o)', element.attr('ng-model'), modelValue, typeof modelValue);
                        var date;
                        if (angular.isUndefined(modelValue) || modelValue === null) {
                            date = NaN;
                        } else if (angular.isDate(modelValue)) {
                            date = modelValue;
                        } else if (options.timeType === 'string') {
                            date = dateParser.parse(modelValue, null, options.modelTimeFormat);
                        } else if (options.timeType === 'unix') {
                            date = new Date(modelValue * 1000);
                        } else {
                            date = new Date(modelValue);
                        }
                        // Setup default value?
                        // if(isNaN(date.getTime())) date = new Date(new Date().setMinutes(0) + 36e5);
                        controller.$dateValue = dateParser.timezoneOffsetAdjust(date, options.timezone);
                        return getTimeFormattedString();
                    });

                    // viewValue -> element
                    controller.$render = function () {
                        // console.warn('$render("%s"): viewValue=%o', element.attr('ng-model'), controller.$viewValue);
                        element.val(getTimeFormattedString());
                    };

                    function getTimeFormattedString () {
                        return !controller.$dateValue || isNaN(controller.$dateValue.getTime()) ? '' : formatDate(controller.$dateValue, options.timeFormat);
                    }

                    // Garbage collection
                    scope.$on('$destroy', function () {
                        if (timepicker) timepicker.destroy();
                        options = null;
                        timepicker = null;
                    });

                }
            };

        }]);

})();
'use strict';

angular.module('mgcrea.ngStrap.tooltip', ['mgcrea.ngStrap.core', 'mgcrea.ngStrap.helpers.dimensions'])

  .provider('$tooltip', function () {

    var defaults = this.defaults = {
      animation: 'am-fade',
      customClass: '',
      prefixClass: 'tooltip',
      prefixEvent: 'tooltip',
      container: false,
      target: false,
      placement: 'top',
      templateUrl: 'tooltip/tooltip.tpl.html',
      template: '',
      titleTemplate: false,
      trigger: 'hover focus',
      keyboard: false,
      html: false,
      show: false,
      title: '',
      type: '',
      delay: 0,
      autoClose: false,
      bsEnabled: true,
      viewport: {
        selector: 'body',
        padding: 0
      }
    };

    this.$get = ["$window", "$rootScope", "$bsCompiler", "$q", "$templateCache", "$http", "$animate", "$sce", "dimensions", "$$rAF", "$timeout", function ($window, $rootScope, $bsCompiler, $q, $templateCache, $http, $animate, $sce, dimensions, $$rAF, $timeout) {

      var isNative = /(ip[ao]d|iphone|android)/ig.test($window.navigator.userAgent);
      var isTouch = ('createTouch' in $window.document) && isNative;
      var $body = angular.element($window.document);

      function TooltipFactory (element, config) {

        var $tooltip = {};

        // Common vars
        var options = $tooltip.$options = angular.extend({}, defaults, config);
        var promise = $tooltip.$promise = $bsCompiler.compile(options);
        var scope = $tooltip.$scope = options.scope && options.scope.$new() || $rootScope.$new();

        var nodeName = element[0].nodeName.toLowerCase();
        if (options.delay && angular.isString(options.delay)) {
          var split = options.delay.split(',').map(parseFloat);
          options.delay = split.length > 1 ? {show: split[0], hide: split[1]} : split[0];
        }

        // Store $id to identify the triggering element in events
        // give priority to options.id, otherwise, try to use
        // element id if defined
        $tooltip.$id = options.id || element.attr('id') || '';

        // Support scope as string options
        if (options.title) {
          scope.title = $sce.trustAsHtml(options.title);
        }

        // Provide scope helpers
        scope.$setEnabled = function (isEnabled) {
          scope.$$postDigest(function () {
            $tooltip.setEnabled(isEnabled);
          });
        };
        scope.$hide = function () {
          scope.$$postDigest(function () {
            $tooltip.hide();
          });
        };
        scope.$show = function () {
          scope.$$postDigest(function () {
            $tooltip.show();
          });
        };
        scope.$toggle = function () {
          scope.$$postDigest(function () {
            $tooltip.toggle();
          });
        };
        // Publish isShown as a protected var on scope
        $tooltip.$isShown = scope.$isShown = false;

        // Private vars
        var timeout;
        var hoverState;

        // Fetch, compile then initialize tooltip
        var compileData;
        var tipElement;
        var tipContainer;
        var tipScope;
        promise.then(function (data) {
          compileData = data;
          $tooltip.init();
        });

        $tooltip.init = function () {

          // Options: delay
          if (options.delay && angular.isNumber(options.delay)) {
            options.delay = {
              show: options.delay,
              hide: options.delay
            };
          }

          // Replace trigger on touch devices ?
          // if(isTouch && options.trigger === defaults.trigger) {
          //   options.trigger.replace(/hover/g, 'click');
          // }

          // Options : container
          if (options.container === 'self') {
            tipContainer = element;
          } else if (angular.isElement(options.container)) {
            tipContainer = options.container;
          } else if (options.container) {
            tipContainer = findElement(options.container);
          }

          // Options: trigger
          bindTriggerEvents();

          // Options: target
          if (options.target) {
            options.target = angular.isElement(options.target) ? options.target : findElement(options.target);
          }

          // Options: show
          if (options.show) {
            scope.$$postDigest(function () {
              if (options.trigger === 'focus') {
                element[0].focus();
              } else {
                $tooltip.show();
              }
            });
          }

        };

        $tooltip.destroy = function () {

          // Unbind events
          unbindTriggerEvents();

          // Remove element
          destroyTipElement();

          // Destroy scope
          scope.$destroy();

        };

        $tooltip.enter = function () {

          clearTimeout(timeout);
          hoverState = 'in';
          if (!options.delay || !options.delay.show) {
            return $tooltip.show();
          }

          timeout = setTimeout(function () {
            if (hoverState === 'in') $tooltip.show();
          }, options.delay.show);

        };

        $tooltip.show = function () {
          if (!options.bsEnabled || $tooltip.$isShown) return;

          scope.$emit(options.prefixEvent + '.show.before', $tooltip);
          if (angular.isDefined(options.onBeforeShow) && angular.isFunction(options.onBeforeShow)) {
            options.onBeforeShow($tooltip);
          }
          var parent;
          var after;
          if (options.container) {
            parent = tipContainer;
            if (tipContainer[0].lastChild) {
              after = angular.element(tipContainer[0].lastChild);
            } else {
              after = null;
            }
          } else {
            parent = null;
            after = element;
          }


          // Hide any existing tipElement
          if (tipElement) destroyTipElement();
          // Fetch a cloned element linked from template
          tipScope = $tooltip.$scope.$new();
          tipElement = $tooltip.$element = compileData.link(tipScope, function (clonedElement, scope) {});

          // Set the initial positioning.  Make the tooltip invisible
          // so IE doesn't try to focus on it off screen.
          tipElement.css({top: '-9999px', left: '-9999px', right: 'auto', display: 'block', visibility: 'hidden'});

          // Options: animation
          if (options.animation) tipElement.addClass(options.animation);
          // Options: type
          if (options.type) tipElement.addClass(options.prefixClass + '-' + options.type);
          // Options: custom classes
          if (options.customClass) tipElement.addClass(options.customClass);

          // Append the element, without any animations.  If we append
          // using $animate.enter, some of the animations cause the placement
          // to be off due to the transforms.
          if (after) {
            after.after(tipElement);
          } else {
            parent.prepend(tipElement);
          }

          $tooltip.$isShown = scope.$isShown = true;
          safeDigest(scope);

          // Now, apply placement
          $tooltip.$applyPlacement();

          // Once placed, animate it.
          // Support v1.2+ $animate
          // https://github.com/angular/angular.js/issues/11713
          if (angular.version.minor <= 2) {
            $animate.enter(tipElement, parent, after, enterAnimateCallback);
          } else {
            $animate.enter(tipElement, parent, after).then(enterAnimateCallback);
          }
          safeDigest(scope);

          $$rAF(function () {
            // Once the tooltip is placed and the animation starts, make the tooltip visible
            if (tipElement) tipElement.css({visibility: 'visible'});

            // Bind events
            if (options.keyboard) {
              if (options.trigger !== 'focus') {
                $tooltip.focus();
              }
              bindKeyboardEvents();
            }
          });

          if (options.autoClose) {
            bindAutoCloseEvents();
          }

        };

        function enterAnimateCallback () {
          scope.$emit(options.prefixEvent + '.show', $tooltip);
          if (angular.isDefined(options.onShow) && angular.isFunction(options.onShow)) {
            options.onShow($tooltip);
          }
        }

        $tooltip.leave = function () {

          clearTimeout(timeout);
          hoverState = 'out';
          if (!options.delay || !options.delay.hide) {
            return $tooltip.hide();
          }
          timeout = setTimeout(function () {
            if (hoverState === 'out') {
              $tooltip.hide();
            }
          }, options.delay.hide);

        };

        var _blur;
        var _tipToHide;
        $tooltip.hide = function (blur) {

          if (!$tooltip.$isShown) return;
          scope.$emit(options.prefixEvent + '.hide.before', $tooltip);
          if (angular.isDefined(options.onBeforeHide) && angular.isFunction(options.onBeforeHide)) {
            options.onBeforeHide($tooltip);
          }

          // store blur value for leaveAnimateCallback to use
          _blur = blur;

          // store current tipElement reference to use
          // in leaveAnimateCallback
          _tipToHide = tipElement;

          // Support v1.2+ $animate
          // https://github.com/angular/angular.js/issues/11713
          if (angular.version.minor <= 2) {
            $animate.leave(tipElement, leaveAnimateCallback);
          } else {
            $animate.leave(tipElement).then(leaveAnimateCallback);
          }

          $tooltip.$isShown = scope.$isShown = false;
          safeDigest(scope);

          // Unbind events
          if (options.keyboard && tipElement !== null) {
            unbindKeyboardEvents();
          }

          if (options.autoClose && tipElement !== null) {
            unbindAutoCloseEvents();
          }
        };

        function leaveAnimateCallback () {
          scope.$emit(options.prefixEvent + '.hide', $tooltip);
          if (angular.isDefined(options.onHide) && angular.isFunction(options.onHide)) {
            options.onHide($tooltip);
          }

          // check if current tipElement still references
          // the same element when hide was called
          if (tipElement === _tipToHide) {
            // Allow to blur the input when hidden, like when pressing enter key
            if (_blur && options.trigger === 'focus') {
              return element[0].blur();
            }

            // clean up child scopes
            destroyTipElement();
          }
        }

        $tooltip.toggle = function (evt) {
          if (evt) { evt.preventDefault(); }
          if ($tooltip.$isShown) {
            $tooltip.leave();
          } else {
            $tooltip.enter();
          }
        };

        $tooltip.focus = function () {
          tipElement[0].focus();
        };

        $tooltip.setEnabled = function (isEnabled) {
          options.bsEnabled = isEnabled;
        };

        $tooltip.setViewport = function (viewport) {
          options.viewport = viewport;
        };

        // Protected methods

        $tooltip.$applyPlacement = function () {
          if (!tipElement) return;

          // Determine if we're doing an auto or normal placement
          var placement = options.placement;
          var autoToken = /\s?auto?\s?/i;
          var autoPlace = autoToken.test(placement);

          if (autoPlace) {
            placement = placement.replace(autoToken, '') || defaults.placement;
          }

          // Need to add the position class before we get
          // the offsets
          tipElement.addClass(options.placement);

          // Get the position of the target element
          // and the height and width of the tooltip so we can center it.
          var elementPosition = getPosition();
          var tipWidth = tipElement.prop('offsetWidth');
          var tipHeight = tipElement.prop('offsetHeight');

          // Refresh viewport position
          $tooltip.$viewport = options.viewport && findElement(options.viewport.selector || options.viewport);

          // If we're auto placing, we need to check the positioning
          if (autoPlace) {
            var originalPlacement = placement;
            var viewportPosition = getPosition($tooltip.$viewport);

            if (/bottom/.test(originalPlacement) && elementPosition.bottom + tipHeight > viewportPosition.bottom) {
              placement = originalPlacement.replace('bottom', 'top');
            } else if (/top/.test(originalPlacement) && elementPosition.top - tipHeight < viewportPosition.top) {
              placement = originalPlacement.replace('top', 'bottom');
            }

            if (/left/.test(originalPlacement) && elementPosition.left - tipWidth < viewportPosition.left) {
              placement = placement.replace('left', 'right');
            } else if (/right/.test(originalPlacement) && elementPosition.right + tipWidth > viewportPosition.width) {
              placement = placement.replace('right', 'left');
            }

            tipElement.removeClass(originalPlacement).addClass(placement);
          }

          // Get the tooltip's top and left coordinates to center it with this directive.
          var tipPosition = getCalculatedOffset(placement, elementPosition, tipWidth, tipHeight);
          applyPlacement(tipPosition, placement);
        };

        $tooltip.$onKeyUp = function (evt) {
          if (evt.which === 27 && $tooltip.$isShown) {
            $tooltip.hide();
            evt.stopPropagation();
          }
        };

        $tooltip.$onFocusKeyUp = function (evt) {
          if (evt.which === 27) {
            element[0].blur();
            evt.stopPropagation();
          }
        };

        $tooltip.$onFocusElementMouseDown = function (evt) {
          evt.preventDefault();
          evt.stopPropagation();
          // Some browsers do not auto-focus buttons (eg. Safari)
          if ($tooltip.$isShown) {
            element[0].blur();
          } else {
            element[0].focus();
          }
        };

        // bind/unbind events
        function bindTriggerEvents () {
          var triggers = options.trigger.split(' ');
          angular.forEach(triggers, function (trigger) {
            if (trigger === 'click' || trigger === 'contextmenu') {
              element.on(trigger, $tooltip.toggle);
            } else if (trigger !== 'manual') {
              element.on(trigger === 'hover' ? 'mouseenter' : 'focus', $tooltip.enter);
              element.on(trigger === 'hover' ? 'mouseleave' : 'blur', $tooltip.leave);
              if (nodeName === 'button' && trigger !== 'hover') {
                element.on(isTouch ? 'touchstart' : 'mousedown', $tooltip.$onFocusElementMouseDown);
              }
            }
          });
        }

        function unbindTriggerEvents () {
          var triggers = options.trigger.split(' ');
          for (var i = triggers.length; i--;) {
            var trigger = triggers[i];
            if (trigger === 'click' || trigger === 'contextmenu') {
              element.off(trigger, $tooltip.toggle);
            } else if (trigger !== 'manual') {
              element.off(trigger === 'hover' ? 'mouseenter' : 'focus', $tooltip.enter);
              element.off(trigger === 'hover' ? 'mouseleave' : 'blur', $tooltip.leave);
              if (nodeName === 'button' && trigger !== 'hover') {
                element.off(isTouch ? 'touchstart' : 'mousedown', $tooltip.$onFocusElementMouseDown);
              }
            }
          }
        }

        function bindKeyboardEvents () {
          if (options.trigger !== 'focus') {
            tipElement.on('keyup', $tooltip.$onKeyUp);
          } else {
            element.on('keyup', $tooltip.$onFocusKeyUp);
          }
        }

        function unbindKeyboardEvents () {
          if (options.trigger !== 'focus') {
            tipElement.off('keyup', $tooltip.$onKeyUp);
          } else {
            element.off('keyup', $tooltip.$onFocusKeyUp);
          }
        }

        var _autoCloseEventsBinded = false;
        function bindAutoCloseEvents () {
          // use timeout to hookup the events to prevent
          // event bubbling from being processed imediately.
          $timeout(function () {
            // Stop propagation when clicking inside tooltip
            tipElement.on('click', stopEventPropagation);

            // Hide when clicking outside tooltip
            $body.on('click', $tooltip.hide);

            _autoCloseEventsBinded = true;
          }, 0, false);
        }

        function unbindAutoCloseEvents () {
          if (_autoCloseEventsBinded) {
            tipElement.off('click', stopEventPropagation);
            $body.off('click', $tooltip.hide);
            _autoCloseEventsBinded = false;
          }
        }

        function stopEventPropagation (event) {
          event.stopPropagation();
        }

        // Private methods

        function getPosition ($element) {
          $element = $element || (options.target || element);

          var el = $element[0];
          var isBody = el.tagName === 'BODY';

          var elRect = el.getBoundingClientRect();
          var rect = {};

          // IE8 has issues with angular.extend and using elRect directly.
          // By coping the values of elRect into a new object, we can continue to use extend
          /* eslint-disable guard-for-in */
          for (var p in elRect) {
            // DO NOT use hasOwnProperty when inspecting the return of getBoundingClientRect.
            rect[p] = elRect[p];
          }
          /* eslint-enable guard-for-in */

          if (rect.width === null) {
            // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
            rect = angular.extend({}, rect, {width: elRect.right - elRect.left, height: elRect.bottom - elRect.top});
          }
          var elOffset = isBody ? {top: 0, left: 0} : dimensions.offset(el);
          var scroll = {scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.prop('scrollTop') || 0};
          var outerDims = isBody ? {width: document.documentElement.clientWidth, height: $window.innerHeight} : null;

          return angular.extend({}, rect, scroll, outerDims, elOffset);
        }

        function getCalculatedOffset (placement, position, actualWidth, actualHeight) {
          var offset;
          var split = placement.split('-');

          switch (split[0]) {
            case 'right':
              offset = {
                top: position.top + position.height / 2 - actualHeight / 2,
                left: position.left + position.width
              };
              break;
            case 'bottom':
              offset = {
                top: position.top + position.height,
                left: position.left + position.width / 2 - actualWidth / 2
              };
              break;
            case 'left':
              offset = {
                top: position.top + position.height / 2 - actualHeight / 2,
                left: position.left - actualWidth
              };
              break;
            default:
              offset = {
                top: position.top - actualHeight,
                left: position.left + position.width / 2 - actualWidth / 2
              };
              break;
          }

          if (!split[1]) {
            return offset;
          }

          // Add support for corners @todo css
          if (split[0] === 'top' || split[0] === 'bottom') {
            switch (split[1]) {
              case 'left':
                offset.left = position.left;
                break;
              case 'right':
                offset.left = position.left + position.width - actualWidth;
                break;
              default:
                break;
            }
          } else if (split[0] === 'left' || split[0] === 'right') {
            switch (split[1]) {
              case 'top':
                offset.top = position.top - actualHeight + position.height;
                break;
              case 'bottom':
                offset.top = position.top;
                break;
              default:
                break;
            }
          }

          return offset;
        }

        function applyPlacement (offset, placement) {
          var tip = tipElement[0];
          var width = tip.offsetWidth;
          var height = tip.offsetHeight;

          // manually read margins because getBoundingClientRect includes difference
          var marginTop = parseInt(dimensions.css(tip, 'margin-top'), 10);
          var marginLeft = parseInt(dimensions.css(tip, 'margin-left'), 10);

          // we must check for NaN for ie 8/9
          if (isNaN(marginTop)) marginTop = 0;
          if (isNaN(marginLeft)) marginLeft = 0;

          offset.top = offset.top + marginTop;
          offset.left = offset.left + marginLeft;

          // dimensions setOffset doesn't round pixel values
          // so we use setOffset directly with our own function
          dimensions.setOffset(tip, angular.extend({
            using: function (props) {
              tipElement.css({
                top: Math.round(props.top) + 'px',
                left: Math.round(props.left) + 'px',
                right: ''
              });
            }
          }, offset), 0);

          // check to see if placing tip in new offset caused the tip to resize itself
          var actualWidth = tip.offsetWidth;
          var actualHeight = tip.offsetHeight;

          if (placement === 'top' && actualHeight !== height) {
            offset.top = offset.top + height - actualHeight;
          }

          // If it's an exotic placement, exit now instead of
          // applying a delta and changing the arrow
          if (/top-left|top-right|bottom-left|bottom-right/.test(placement)) return;

          var delta = getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);

          if (delta.left) {
            offset.left += delta.left;
          } else {
            offset.top += delta.top;
          }

          dimensions.setOffset(tip, offset);

          if (/top|right|bottom|left/.test(placement)) {
            var isVertical = /top|bottom/.test(placement);
            var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
            var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';

            replaceArrow(arrowDelta, tip[arrowOffsetPosition], isVertical);
          }
        }

        // @source https://github.com/twbs/bootstrap/blob/v3.3.5/js/tooltip.js#L380
        function getViewportAdjustedDelta (placement, position, actualWidth, actualHeight) {
          var delta = {top: 0, left: 0};
          if (!$tooltip.$viewport) return delta;

          var viewportPadding = options.viewport && options.viewport.padding || 0;
          var viewportDimensions = getPosition($tooltip.$viewport);

          if (/right|left/.test(placement)) {
            var topEdgeOffset = position.top - viewportPadding - viewportDimensions.scroll;
            var bottomEdgeOffset = position.top + viewportPadding - viewportDimensions.scroll + actualHeight;
            if (topEdgeOffset < viewportDimensions.top) { // top overflow
              delta.top = viewportDimensions.top - topEdgeOffset;
            } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
              delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
            }
          } else {
            var leftEdgeOffset = position.left - viewportPadding;
            var rightEdgeOffset = position.left + viewportPadding + actualWidth;
            if (leftEdgeOffset < viewportDimensions.left) { // left overflow
              delta.left = viewportDimensions.left - leftEdgeOffset;
            } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
              delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
            }
          }

          return delta;
        }

        function replaceArrow (delta, dimension, isHorizontal) {
          var $arrow = findElement('.tooltip-arrow, .arrow', tipElement[0]);

          $arrow.css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
                .css(isHorizontal ? 'top' : 'left', '');
        }

        function destroyTipElement () {
          // Cancel pending callbacks
          clearTimeout(timeout);

          if ($tooltip.$isShown && tipElement !== null) {
            if (options.autoClose) {
              unbindAutoCloseEvents();
            }

            if (options.keyboard) {
              unbindKeyboardEvents();
            }
          }

          if (tipScope) {
            tipScope.$destroy();
            tipScope = null;
          }

          if (tipElement) {
            tipElement.remove();
            tipElement = $tooltip.$element = null;
          }
        }

        return $tooltip;

      }

      // Helper functions

      function safeDigest (scope) {
        /* eslint-disable no-unused-expressions */
        scope.$$phase || (scope.$root && scope.$root.$$phase) || scope.$digest();
        /* eslint-enable no-unused-expressions */
      }

      function findElement (query, element) {
        return angular.element((element || document).querySelectorAll(query));
      }

      return TooltipFactory;

    }];

  })

  .directive('bsTooltip', ["$window", "$location", "$sce", "$parse", "$tooltip", "$$rAF", function ($window, $location, $sce, $parse, $tooltip, $$rAF) {

    return {
      restrict: 'EAC',
      scope: true,
      link: function postLink (scope, element, attr, transclusion) {

        var tooltip;
        // Directive options
        var options = {scope: scope};
        angular.forEach(['template', 'templateUrl', 'controller', 'controllerAs', 'titleTemplate', 'placement', 'container', 'delay', 'trigger', 'html', 'animation', 'backdropAnimation', 'type', 'customClass', 'id'], function (key) {
          if (angular.isDefined(attr[key])) options[key] = attr[key];
        });

        // use string regex match boolean attr falsy values, leave truthy values be
        var falseValueRegExp = /^(false|0|)$/i;
        angular.forEach(['html', 'container'], function (key) {
          if (angular.isDefined(attr[key]) && falseValueRegExp.test(attr[key])) {
            options[key] = false;
          }
        });

        // bind functions from the attrs to the show and hide events
        angular.forEach(['onBeforeShow', 'onShow', 'onBeforeHide', 'onHide'], function (key) {
          var bsKey = 'bs' + key.charAt(0).toUpperCase() + key.slice(1);
          if (angular.isDefined(attr[bsKey])) {
            options[key] = scope.$eval(attr[bsKey]);
          }
        });

        // should not parse target attribute (anchor tag), only data-target #1454
        var dataTarget = element.attr('data-target');
        if (angular.isDefined(dataTarget)) {
          if (falseValueRegExp.test(dataTarget)) {
            options.target = false;
          } else {
            options.target = dataTarget;
          }
        }

        // overwrite inherited title value when no value specified
        // fix for angular 1.3.1 531a8de72c439d8ddd064874bf364c00cedabb11
        if (!scope.hasOwnProperty('title')) {
          scope.title = '';
        }

        // Observe scope attributes for change
        attr.$observe('title', function (newValue) {
          if (angular.isDefined(newValue) || !scope.hasOwnProperty('title')) {
            var oldValue = scope.title;
            scope.title = $sce.trustAsHtml(newValue);
            if (angular.isDefined(oldValue)) {
              $$rAF(function () {
                if (tooltip) tooltip.$applyPlacement();
              });
            }
          }
        });

        attr.$observe('disabled', function (newValue) {
          if (newValue && tooltip.$isShown) {
            tooltip.hide();
          }
        });

        // Support scope as an object
        if (attr.bsTooltip) {
          scope.$watch(attr.bsTooltip, function (newValue, oldValue) {
            if (angular.isObject(newValue)) {
              angular.extend(scope, newValue);
            } else {
              scope.title = newValue;
            }
            if (angular.isDefined(oldValue)) {
              $$rAF(function () {
                if (tooltip) tooltip.$applyPlacement();
              });
            }
          }, true);
        }

        // Visibility binding support
        if (attr.bsShow) {
          scope.$watch(attr.bsShow, function (newValue, oldValue) {
            if (!tooltip || !angular.isDefined(newValue)) return;
            if (angular.isString(newValue)) newValue = !!newValue.match(/true|,?(tooltip),?/i);
            if (newValue === true) {
              tooltip.show();
            } else {
              tooltip.hide();
            }
          });
        }

        // Enabled binding support
        if (attr.bsEnabled) {
          scope.$watch(attr.bsEnabled, function (newValue, oldValue) {
            // console.warn('scope.$watch(%s)', attr.bsEnabled, newValue, oldValue);
            if (!tooltip || !angular.isDefined(newValue)) return;
            if (angular.isString(newValue)) newValue = !!newValue.match(/true|1|,?(tooltip),?/i);
            if (newValue === false) {
              tooltip.setEnabled(false);
            } else {
              tooltip.setEnabled(true);
            }
          });
        }

        // Viewport support
        if (attr.viewport) {
          scope.$watch(attr.viewport, function (newValue) {
            if (!tooltip || !angular.isDefined(newValue)) return;
            tooltip.setViewport(newValue);
          });
        }

        // Initialize popover
        tooltip = $tooltip(element, options);

        // Garbage collection
        scope.$on('$destroy', function () {
          if (tooltip) tooltip.destroy();
          options = null;
          tooltip = null;
        });

      }
    };

  }]);


(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('AngularCarouselController', AngularCarouselController);

    function AngularCarouselController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.colors = ['#fc0003', '#f70008', '#f2000d', '#ed0012', '#e80017', '#e3001c', '#de0021', '#d90026', '#d4002b', '#cf0030', '#c90036', '#c4003b', '#bf0040', '#ba0045', '#b5004a', '#b0004f', '#ab0054', '#a60059', '#a1005e', '#9c0063', '#960069', '#91006e', '#8c0073', '#870078', '#82007d', '#7d0082', '#780087', '#73008c', '#6e0091', '#690096', '#63009c', '#5e00a1', '#5900a6', '#5400ab', '#4f00b0', '#4a00b5', '#4500ba', '#4000bf', '#3b00c4', '#3600c9', '#3000cf', '#2b00d4', '#2600d9', '#2100de', '#1c00e3', '#1700e8', '#1200ed', '#0d00f2', '#0800f7', '#0300fc'];

          function getSlide(target, style) {
              var i = target.length;
              return {
                  id: (i + 1),
                  label: 'slide #' + (i + 1),
                  img: 'http://lorempixel.com/1200/500/' + style + '/' + ((i + 1) % 10) ,
                  color: vm.colors[ (i*10) % vm.colors.length],
                  odd: (i % 2 === 0)
              };
          }

          function addSlide(target, style) {
              target.push(getSlide(target, style));
          }

          vm.carouselIndex = 3;
          vm.carouselIndex2 = 0;
          vm.carouselIndex2 = 1;
          vm.carouselIndex3 = 5;
          vm.carouselIndex4 = 5;

          function addSlides(target, style, qty) {
              for (var i=0; i < qty; i++) {
                  addSlide(target, style);
              }
          }

          // 1st ngRepeat demo
          vm.slides = [];
          addSlides(vm.slides, 'sports', 50);

          // 2nd ngRepeat demo
          vm.slides2 = [];
          addSlides(vm.slides2, 'sports', 10);

          // 3rd ngRepeat demo
          vm.slides3 = [];
          addSlides(vm.slides3, 'people', 50);

          // 4th ngRepeat demo
          vm.slides4 = [];
          addSlides(vm.slides4, 'city', 50);


          // 5th ngRepeat demo
          vm.slides6 = [];
          vm.carouselIndex6 = 0;
          addSlides(vm.slides6, 'sports', 10);
          vm.addSlide = function(at) {
              if(at==='head') {
                  vm.slides6.unshift(getSlide(vm.slides6, 'people'));
              } else {
                  vm.slides6.push(getSlide(vm.slides6, 'people'));
              }
          };
        }
    }
})();

/**=========================================================
 * Module: demo-dialog.js
 * Demo for multiple ngDialog Usage
 * - ngDialogProvider for default values not supported 
 *   using lazy loader. Include plugin in base.js instead.
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('DialogIntroCtrl', DialogIntroCtrl)
        .controller('DialogMainCtrl', DialogMainCtrl)
        .controller('InsideCtrl', InsideCtrl)
        .controller('SecondModalCtrl', SecondModalCtrl);

    DialogIntroCtrl.$inject = ['$scope', 'ngDialog', 'tpl'];
    // Called from the route state. 'tpl' is resolved before
    function DialogIntroCtrl($scope, ngDialog, tpl) {
        
        activate();

        ////////////////

        function activate() {
          // share with other controllers
          $scope.tpl = tpl;
          // open dialog window
          ngDialog.open({
            template: tpl.path,
            // plain: true,
            className: 'ngdialog-theme-default'
          });
        }
    }

    DialogMainCtrl.$inject = ['$scope', '$rootScope', 'ngDialog'];
    // Loads from view
    function DialogMainCtrl($scope, $rootScope, ngDialog) {

        activate();

        ////////////////

        function activate() {
          $rootScope.jsonData = '{"foo": "bar"}';
          $rootScope.theme = 'ngdialog-theme-default';

          $scope.directivePreCloseCallback = function (value) {
            if(confirm('Close it? MainCtrl.Directive. (Value = ' + value + ')')) {
              return true;
            }
            return false;
          };

          $scope.preCloseCallbackOnScope = function (value) {
            if(confirm('Close it? MainCtrl.OnScope (Value = ' + value + ')')) {
              return true;
            }
            return false;
          };

          $scope.open = function () {
            ngDialog.open({ template: 'firstDialogId', controller: 'InsideCtrl', data: {foo: 'some data'} });
          };

          $scope.openDefault = function () {
            ngDialog.open({
              template: 'firstDialogId',
              controller: 'InsideCtrl',
              className: 'ngdialog-theme-default'
            });
          };

          $scope.openDefaultWithPreCloseCallbackInlined = function () {
            ngDialog.open({
              template: 'firstDialogId',
              controller: 'InsideCtrl',
              className: 'ngdialog-theme-default',
              preCloseCallback: function(value) {
                if (confirm('Close it?  (Value = ' + value + ')')) {
                  return true;
                }
                return false;
              }
            });
          };

          $scope.openConfirm = function () {
            ngDialog.openConfirm({
              template: 'modalDialogId',
              className: 'ngdialog-theme-default'
            }).then(function (value) {
              console.log('Modal promise resolved. Value: ', value);
            }, function (reason) {
              console.log('Modal promise rejected. Reason: ', reason);
            });
          };

          $scope.openConfirmWithPreCloseCallbackOnScope = function () {
            ngDialog.openConfirm({
              template: 'modalDialogId',
              className: 'ngdialog-theme-default',
              preCloseCallback: 'preCloseCallbackOnScope',
              scope: $scope
            }).then(function (value) {
              console.log('Modal promise resolved. Value: ', value);
            }, function (reason) {
              console.log('Modal promise rejected. Reason: ', reason);
            });
          };

          $scope.openConfirmWithPreCloseCallbackInlinedWithNestedConfirm = function () {
            ngDialog.openConfirm({
              template: 'dialogWithNestedConfirmDialogId',
              className: 'ngdialog-theme-default',
              preCloseCallback: function(/*value*/) {

                var nestedConfirmDialog = ngDialog.openConfirm({
                  template:
                      '<p>Are you sure you want to close the parent dialog?</p>' +
                      '<div>' +
                        '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">No' +
                        '<button type="button" class="btn btn-primary" ng-click="confirm(1)">Yes' +
                      '</button></div>',
                  plain: true,
                  className: 'ngdialog-theme-default'
                });

                return nestedConfirmDialog;
              },
              scope: $scope
            })
            .then(function(value){
              console.log('resolved:' + value);
              // Perform the save here
            }, function(value){
              console.log('rejected:' + value);

            });
          };

          $scope.openInlineController = function () {
            $rootScope.theme = 'ngdialog-theme-default';

            ngDialog.open({
              template: 'withInlineController',
              controller: ['$scope', '$timeout', function ($scope, $timeout) {
                var counter = 0;
                var timeout;
                function count() {
                  $scope.exampleExternalData = 'Counter ' + (counter++);
                  timeout = $timeout(count, 450);
                }
                count();
                $scope.$on('$destroy', function () {
                  $timeout.cancel(timeout);
                });
              }],
              className: 'ngdialog-theme-default'
            });
          };

          $scope.openTemplate = function () {
            $scope.value = true;

            ngDialog.open({
              template: $scope.tpl.path,
              className: 'ngdialog-theme-default',
              scope: $scope
            });
          };

          $scope.openTemplateNoCache = function () {
            $scope.value = true;

            ngDialog.open({
              template: $scope.tpl.path,
              className: 'ngdialog-theme-default',
              scope: $scope,
              cache: false
            });
          };

          $scope.openTimed = function () {
            var dialog = ngDialog.open({
              template: '<p>Just passing through!</p>',
              plain: true,
              closeByDocument: false,
              closeByEscape: false
            });
            setTimeout(function () {
              dialog.close();
            }, 2000);
          };

          $scope.openNotify = function () {
            var dialog = ngDialog.open({
              template:
                '<p>You can do whatever you want when I close, however that happens.</p>' +
                '<div><button type="button" class="btn btn-primary" ng-click="closeThisDialog(1)">Close Me</button></div>',
              plain: true
            });
            dialog.closePromise.then(function (data) {
              console.log('ngDialog closed' + (data.value === 1 ? ' using the button' : '') + ' and notified by promise: ' + data.id);
            });
          };

          $scope.openWithoutOverlay = function () {
            ngDialog.open({
              template: '<h2>Notice that there is no overlay!</h2>',
              className: 'ngdialog-theme-default',
              plain: true,
              overlay: false
            });
          };

          $rootScope.$on('ngDialog.opened', function (e, $dialog) {
            console.log('ngDialog opened: ' + $dialog.attr('id'));
          });

          $rootScope.$on('ngDialog.closed', function (e, $dialog) {
            console.log('ngDialog closed: ' + $dialog.attr('id'));
          });

          $rootScope.$on('ngDialog.closing', function (e, $dialog) {
            console.log('ngDialog closing: ' + $dialog.attr('id'));
          });
        }
    
    } // DialogMainCtrl


    InsideCtrl.$inject = ['$scope', 'ngDialog'];
    function InsideCtrl($scope, ngDialog) {

        activate();

        ////////////////

        function activate() {
          $scope.dialogModel = {
            message : 'message from passed scope'
          };
          $scope.openSecond = function () {
            ngDialog.open({
              template: '<p class="lead m0"><a href="" ng-click="closeSecond()">Close all by click here!</a></h3>',
              plain: true,
              closeByEscape: false,
              controller: 'SecondModalCtrl'
            });
          };
        }
    }

    SecondModalCtrl.$inject = ['$scope', 'ngDialog'];
    function SecondModalCtrl($scope, ngDialog) {

        activate();

        ////////////////

        function activate() {
          $scope.closeSecond = function () {
            ngDialog.close();
          };
        }

    }


})();




/**=========================================================
 * Module: calendar-ui.js
 * This script handle the calendar demo with draggable 
 * events and events creations
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('InfiniteScrollController', InfiniteScrollController)
        .factory('datasource', datasource);

    function InfiniteScrollController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

          vm.loadMore = function() {
            var last = vm.images[vm.images.length - 1];
            for(var i = 1; i <= 10; i++) {
              vm.images.push(last + i);
            }
          };
        }
    }
    
    datasource.$inject = ['$log', '$timeout'];
    function datasource(console, $timeout) {

        var get = function(index, count, success) {
            return $timeout(function() {
                var i, result, _i, _ref;
                result = [];
                for (i = _i = index, _ref = index + count - 1; index <= _ref ? _i <= _ref : _i >= _ref; i = index <= _ref ? ++_i : --_i) {
                    result.push('item #' + i);
                }
                return success(result);
            }, 100);
        };
        return {
            get: get
        };
    }

})();

/**=========================================================
 * Module: masonry-deck.js
 * Demo for Angular Deck
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('MasonryDeckController', MasonryDeckController)
        .directive('imageloaded', imageloaded); // required by demo

    MasonryDeckController.$inject = ['RouteHelpers'];
    function MasonryDeckController(RouteHelpers) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.basepath = RouteHelpers.basepath;

          vm.photos = [
              {id: 'photo-1', name: 'Awesome photo', src: 'http://lorempixel.com/400/300/abstract'},
              {id: 'photo-2', name: 'Great photo', src: 'http://lorempixel.com/450/400/city'},
              {id: 'photo-3', name: 'Strange photo', src: 'http://lorempixel.com/400/300/people'},
              {id: 'photo-4', name: 'A photo?', src: 'http://lorempixel.com/400/300/transport'},
              {id: 'photo-5', name: 'What a photo', src: 'http://lorempixel.com/450/300/fashion'},
              {id: 'photo-6', name: 'Silly photo', src: 'http://lorempixel.com/400/300/technics'},
              {id: 'photo-7', name: 'Weird photo', src: 'http://lorempixel.com/410/350/sports'},
              {id: 'photo-8', name: 'Modern photo', src: 'http://lorempixel.com/400/300/nightlife'},
              {id: 'photo-9', name: 'Classical photo', src: 'http://lorempixel.com/400/300/nature'},
              {id: 'photo-10', name: 'Dynamic photo', src: 'http://lorempixel.com/420/300/abstract'},
              {id: 'photo-11', name: 'Neat photo', src: 'http://lorempixel.com/400/300/sports'},
              {id: 'photo-12', name: 'Bumpy photo', src: 'http://lorempixel.com/400/300/nightlife'},
              {id: 'photo-13', name: 'Brilliant photo', src: 'http://lorempixel.com/400/380/nature'},
              {id: 'photo-14', name: 'Excellent photo', src: 'http://lorempixel.com/480/300/technics'},
              {id: 'photo-15', name: 'Gorgeous photo', src: 'http://lorempixel.com/400/300/sports'},
              {id: 'photo-16', name: 'Lovely photo', src: 'http://lorempixel.com/400/300/nightlife'},
              {id: 'photo-17', name: 'A "wow" photo', src: 'http://lorempixel.com/400/300/nature'},
              {id: 'photo-18', name: 'Bodacious photo', src: 'http://lorempixel.com/400/300/abstract'}
          ];
        }
    }

    // Add class to img element when source is loaded
    function imageloaded () {
        // Copyright(c) 2013 André König <akoenig@posteo.de>
        // MIT Licensed
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          var cssClass = attrs.loadedclass;

          element.bind('load', function () {
              angular.element(element).addClass(cssClass);
          });
        }
    }

})();



/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('AbnTestController', AbnTestController);

    AbnTestController.$inject = ['$timeout', '$resource'];
    function AbnTestController($timeout, $resource) {
        var vm = this;

        activate();

        ////////////////

        /*jshint -W106*/
        function activate() {
          vm.my_tree_handler = function(branch) {

            vm.output = 'You selected: ' + branch.label;

            if (branch.data && branch.data.description) {
              vm.output += '(' + branch.data.description + ')';
              return vm.output;
            }
          };

          // onSelect event handlers
          var apple_selected = function(branch) {
            vm.output = 'APPLE! : ' + branch.label;
            return vm.output;
          };

          var treedata_avm = [
            {
              label: 'Animal',
              children: [
                {
                  label: 'Dog',
                  data: {
                    description: 'man\'s best friend'
                  }
                }, {
                  label: 'Cat',
                  data: {
                    description: 'Felis catus'
                  }
                }, {
                  label: 'Hippopotamus',
                  data: {
                    description: 'hungry, hungry'
                  }
                }, {
                  label: 'Chicken',
                  children: ['White Leghorn', 'Rhode Island Red', 'Jersey Giant']
                }
              ]
            }, {
              label: 'Vegetable',
              data: {
                definition: 'A plant or part of a plant used as food, typically as accompaniment to meat or fish, such as a cabbage, potato, carrot, or bean.',
                data_can_contain_anything: true
              },
              onSelect: function(branch) {
                vm.output = 'Vegetable: ' + branch.data.definition;
                return vm.output;
              },
              children: [
                {
                  label: 'Oranges'
                }, {
                  label: 'Apples',
                  children: [
                    {
                      label: 'Granny Smith',
                      onSelect: apple_selected
                    }, {
                      label: 'Red Delicous',
                      onSelect: apple_selected
                    }, {
                      label: 'Fuji',
                      onSelect: apple_selected
                    }
                  ]
                }
              ]
            }, {
              label: 'Mineral',
              children: [
                {
                  label: 'Rock',
                  children: ['Igneous', 'Sedimentary', 'Metamorphic']
                }, {
                  label: 'Metal',
                  children: ['Aluminum', 'Steel', 'Copper']
                }, {
                  label: 'Plastic',
                  children: [
                    {
                      label: 'Thermoplastic',
                      children: ['polyethylene', 'polypropylene', 'polystyrene', ' polyvinyl chloride']
                    }, {
                      label: 'Thermosetting Polymer',
                      children: ['polyester', 'polyurethane', 'vulcanized rubber', 'bakelite', 'urea-formaldehyde']
                    }
                  ]
                }
              ]
            }
          ];
          
          var treedata_geography = [
            {
              label: 'North America',
              children: [
                {
                  label: 'Canada',
                  children: ['Toronto', 'Vancouver']
                }, {
                  label: 'USA',
                  children: ['New York', 'Los Angeles']
                }, {
                  label: 'Mexico',
                  children: ['Mexico City', 'Guadalajara']
                }
              ]
            }, {
              label: 'South America',
              children: [
                {
                  label: 'Venezuela',
                  children: ['Caracas', 'Maracaibo']
                }, {
                  label: 'Brazil',
                  children: ['Sao Paulo', 'Rio de Janeiro']
                }, {
                  label: 'Argentina',
                  children: ['Buenos Aires', 'Cordoba']
                }
              ]
            }
          ];

          vm.my_data = treedata_avm;
          vm.try_changing_the_tree_data = function() {
            if (vm.my_data === treedata_avm) {
              vm.my_data = treedata_geography;
            } else {
              vm.my_data = treedata_avm;
            }
            return vm.my_data;
          };
          
          var tree;
          // This is our API control variable
          vm.my_tree = tree = {};
          vm.try_async_load = function() {
            
            vm.my_data = [];
            vm.doing_async = true;
            
            // Request tree data via $resource
            var remoteTree = $resource('server/treedata.json');
            
            return remoteTree.get(function(res){
              
              vm.my_data = res.data;

              vm.doing_async = false;
            
              return tree.expand_all();
            
            // we must return a promise so the plugin 
            // can watch when it's resolved
            }).$promise;
          };
          
          // Adds a new branch to the tree
          vm.try_adding_a_branch = function() {
            var b;
            b = tree.get_selected_branch();
            return tree.add_branch(b, {
              label: 'New Branch',
              data: {
                something: 42,
                'else': 43
              }
            });
          };

        }
    }
})();


/**=========================================================
 * Module: nestable.js
 * Nestable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('NestableController', NestableController);

    function NestableController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.items =  [
            {
              item: {text: 'a'},
              children: []
            },
            {
              item: {text: 'b'},
              children: [
                {
                  item: {text: 'c'},
                  children: []
                },
                {
                  item: {text: 'd'},
                  children: []
                }
              ]
            },
            {
              item: {text: 'e'},
              children: []
            },
            {
              item: {text: 'f'},
              children: []
            }
          ];

          vm.items2 =  [
            {
              item: {text: '1'},
              children: []
            },
            {
              item: {text: '2'},
              children: [
                {
                  item: {text: '3'},
                  children: []
                },
                {
                  item: {text: '4'},
                  children: []
                }
              ]
            },
            {
              item: {text: '5'},
              children: []
            },
            {
              item: {text: '6'},
              children: []
            }
          ];

        }
    }
})();

/**=========================================================
 * Module: scroll.js
 * Make a content box scrollable
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .directive('scrollable', scrollable);

    function scrollable () {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var defaultHeight = 250;
          element.slimScroll({
              height: (attrs.height || defaultHeight)
          });
        }
    }

})();

/**=========================================================
 * Module: sortable.js
 * Sortable controller
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('SortableController', SortableController);

    SortableController.$inject = ['$scope'];
    function SortableController($scope) {
        // doesn't support controllerAs syntax https://github.com/voidberg/html5sortable/issues/86

        activate();

        ////////////////

        function activate() {
          // Single List
          $scope.data1 = [
            { id: 1, name: 'Donald Hoffman' },
            { id: 2, name: 'Wallace Barrett' },
            { id: 3, name: 'Marsha Hicks' },
            { id: 4, name: 'Roland Brown' }
          ];

          $scope.add = function () {
            $scope.data1.push({id: $scope.data1.length + 1, name: 'Earl Knight'});
          };

          $scope.sortableCallback = function (sourceModel, destModel, start, end) {
            console.log(start + ' -> ' + end);
          };
          
          $scope.sortableOptions = {
              placeholder: '<div class="box-placeholder p0 m0"><div></div></div>',
              forcePlaceholderSize: true
          };
        }
    }

})();

/**=========================================================
 * Module: sweetalert.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('SweetAlertController', SweetAlertController);

    SweetAlertController.$inject = ['SweetAlert'];
    function SweetAlertController(SweetAlert) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.demo1 = function() {
            SweetAlert.swal('Here\'s a message');
          };

          vm.demo2 = function() {
            SweetAlert.swal('Here\'s a message!', 'It\'s pretty, isn\'t it?');
          };

          vm.demo3 = function() {
            SweetAlert.swal('Good job!', 'You clicked the button!', 'success');
          };

          vm.demo4 = function() {
            SweetAlert.swal({   
              title: 'Are you sure?',   
              text: 'Your will not be able to recover this imaginary file!',   
              type: 'warning',   
              showCancelButton: true,   
              confirmButtonColor: '#DD6B55',   
              confirmButtonText: 'Yes, delete it!',
              closeOnConfirm: false
            },  function(){  
              SweetAlert.swal('Booyah!');
            });
          };

          vm.demo5 = function() {
            SweetAlert.swal({   
              title: 'Are you sure?',   
              text: 'Your will not be able to recover this imaginary file!',   
              type: 'warning',   
              showCancelButton: true,   
              confirmButtonColor: '#DD6B55',   
              confirmButtonText: 'Yes, delete it!',   
              cancelButtonText: 'No, cancel plx!',   
              closeOnConfirm: false,   
              closeOnCancel: false 
            }, function(isConfirm){  
              if (isConfirm) {     
                SweetAlert.swal('Deleted!', 'Your imaginary file has been deleted.', 'success');   
              } else {     
                SweetAlert.swal('Cancelled', 'Your imaginary file is safe :)', 'error');   
              } 
            });
          };

          vm.demo6 = function() {
            SweetAlert.swal({   
              title: 'Sweet!',   
              text: 'Here\'s a custom image.',   
              imageUrl: 'http://oitozero.com/img/avatar.jpg' 
            });
          };
        }
    }
})();

/**=========================================================
 * Module: demo-toaster.js
 * Demos for toaster notifications
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('ToasterDemoCtrl', ToasterDemoCtrl);

    ToasterDemoCtrl.$inject = ['toaster'];
    function ToasterDemoCtrl(toaster) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.toaster = {
              type:  'success',
              title: 'Title',
              text:  'Message'
          };

          vm.pop = function() {
            toaster.pop(vm.toaster.type, vm.toaster.title, vm.toaster.text);
          };
        }
    }
})();

/**=========================================================
 * Module: tour.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.elements')
        .controller('TourCtrl', TourCtrl);

    TourCtrl.$inject = ['$scope'];
    function TourCtrl($scope) {

        activate();

        ////////////////

        function activate() {
          // BootstrapTour is not compatible with z-index based layout
          // so adding position:static for this case makes the browser
          // to ignore the property
          var section = angular.element('.wrapper > section');
          section.css({'position': 'static'});
          // finally restore on destroy and reuse the value declared in stylesheet
          $scope.$on('$destroy', function(){
            section.css({'position': ''});
          });
        }
    }
})();

/**=========================================================
 * Module: article.js
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.extras')
        .controller('ArticleController', ArticleController);

    function ArticleController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.htmlContent = 'Article content...';

          vm.postDemo = {};
          vm.postDemo.tags = ['coding', 'less'];
          vm.availableTags = ['coding', 'less', 'sass', 'angularjs', 'node', 'expressJS'];
          vm.postDemo.categories = ['JAVASCRIPT','WEB'];
          vm.availableCategories = ['JAVASCRIPT','WEB', 'BOOTSTRAP', 'SERVER', 'HTML5', 'CSS'];

          vm.reviewers = [
            { name: 'Adam',      email: 'adam@email.com',      age: 10 },
            { name: 'Amalie',    email: 'amalie@email.com',    age: 12 },
            { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30 },
            { name: 'Samantha',  email: 'samantha@email.com',  age: 31 },
            { name: 'Estefanía', email: 'estefanía@email.com', age: 16 },
            { name: 'Natasha',   email: 'natasha@email.com',   age: 54 },
            { name: 'Nicole',    email: 'nicole@email.com',    age: 43 },
            { name: 'Adrian',    email: 'adrian@email.com',    age: 21 }
          ];


          vm.alerts = [
            { type: 'info', msg: 'There is an autosaved version of this article that is more recent than the version below. <a href="#" class="text-white">Restore</a>' }
          ];

          vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
          };
        }
    }
})();

/**=========================================================
 * Module: calendar-ui.js
 * This script handle the calendar demo with draggable 
 * events and events creations
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.extras')
        .directive('calendar', calendar);

    calendar.$inject = ['$rootScope'];
    function calendar ($rootScope) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element) {
          
          if(!$.fn.fullCalendar) return;
          
          // The element that will display the calendar
          var calendar = element;

          var demoEvents = createDemoEvents();

          initExternalEvents(calendar);

          initCalendar(calendar, demoEvents, $rootScope.app.layout.isRTL);
        }
    }


    // global shared var to know what we are dragging
    var draggingEvent = null;


    /**
     * ExternalEvent object
     * @param jQuery Object elements Set of element as jQuery objects
     */
    function ExternalEvent(elements) {
        
        if (!elements) return;
        
        elements.each(function() {
            var $this = $(this);
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var calendarEventObject = {
                title: $.trim($this.text()) // use the element's text as the event title
            };

            // store the Event Object in the DOM element so we can get to it later
            $this.data('calendarEventObject', calendarEventObject);

            // make the event draggable using jQuery UI
            $this.draggable({
                zIndex: 1070,
                revert: true, // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });

        });
    }

    /**
     * Invoke full calendar plugin and attach behavior
     * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
     * @param  EventObject [events] An object with the event list to load when the calendar displays
     */
    function initCalendar(calElement, events, isRTL) {

        // check to remove elements from the list
        var removeAfterDrop = $('#remove-after-drop');

        calElement.fullCalendar({
            isRTL: isRTL,
            header: {
                left:   'prev,next today',
                center: 'title',
                right:  'month,agendaWeek,agendaDay'
            },
            buttonIcons: { // note the space at the beginning
                prev:    ' fa fa-caret-left',
                next:    ' fa fa-caret-right'
            },
            buttonText: {
                today: 'today',
                month: 'month',
                week:  'week',
                day:   'day'
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar 
            drop: function(date, allDay) { // this function is called when something is dropped
                
                var $this = $(this),
                    // retrieve the dropped element's stored Event Object
                    originalEventObject = $this.data('calendarEventObject');

                // if something went wrong, abort
                if(!originalEventObject) return;

                // clone the object to avoid multiple events with reference to the same object
                var clonedEventObject = $.extend({}, originalEventObject);

                // assign the reported date
                clonedEventObject.start = date;
                clonedEventObject.allDay = allDay;
                clonedEventObject.backgroundColor = $this.css('background-color');
                clonedEventObject.borderColor = $this.css('border-color');

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" 
                // (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                calElement.fullCalendar('renderEvent', clonedEventObject, true);
                
                // if necessary remove the element from the list
                if(removeAfterDrop.is(':checked')) {
                  $this.remove();
                }
            },
            eventDragStart: function (event/*, js, ui*/) {
              draggingEvent = event;
            },
            // This array is the events sources
            events: events
        });
    }

    /**
     * Inits the external events panel
     * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
     */
    function initExternalEvents(calElement){
      // Panel with the external events list
      var externalEvents = $('.external-events');

      // init the external events in the panel
      new ExternalEvent(externalEvents.children('div'));

      // External event color is danger-red by default
      var currColor = '#f6504d';
      // Color selector button
      var eventAddBtn = $('.external-event-add-btn');
      // New external event name input
      var eventNameInput = $('.external-event-name');
      // Color switchers
      var eventColorSelector = $('.external-event-color-selector .circle');

      // Trash events Droparea 
      $('.external-events-trash').droppable({
        accept:       '.fc-event',
        activeClass:  'active',
        hoverClass:   'hovered',
        tolerance:    'touch',
        drop: function(event, ui) {
          
          // You can use this function to send an ajax request
          // to remove the event from the repository
          
          if(draggingEvent) {
            var eid = draggingEvent.id || draggingEvent._id;
            // Remove the event
            calElement.fullCalendar('removeEvents', eid);
            // Remove the dom element
            ui.draggable.remove();
            // clear
            draggingEvent = null;
          }
        }
      });

      eventColorSelector.click(function(e) {
          e.preventDefault();
          var $this = $(this);

          // Save color
          currColor = $this.css('background-color');
          // De-select all and select the current one
          eventColorSelector.removeClass('selected');
          $this.addClass('selected');
      });

      eventAddBtn.click(function(e) {
          e.preventDefault();
          
          // Get event name from input
          var val = eventNameInput.val();
          // Dont allow empty values
          if ($.trim(val) === '') return;
          
          // Create new event element
          var newEvent = $('<div/>').css({
                              'background-color': currColor,
                              'border-color':     currColor,
                              'color':            '#fff'
                          })
                          .html(val);

          // Prepends to the external events list
          externalEvents.prepend(newEvent);
          // Initialize the new event element
          new ExternalEvent(newEvent);
          // Clear input
          eventNameInput.val('');
      });
    }

    /**
     * Creates an array of events to display in the first load of the calendar
     * Wrap into this function a request to a source to get via ajax the stored events
     * @return Array The array with the events
     */
    function createDemoEvents() {
      // Date for the calendar events (dummy data)
      var date = new Date();
      var d = date.getDate(),
          m = date.getMonth(),
          y = date.getFullYear();

      return  [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
                    backgroundColor: '#f56954', //red 
                    borderColor: '#f56954' //red
                },
                {
                    title: 'Long Event',
                    start: new Date(y, m, d - 5),
                    end: new Date(y, m, d - 2),
                    backgroundColor: '#f39c12', //yellow
                    borderColor: '#f39c12' //yellow
                },
                {
                    title: 'Meeting',
                    start: new Date(y, m, d, 10, 30),
                    allDay: false,
                    backgroundColor: '#0073b7', //Blue
                    borderColor: '#0073b7' //Blue
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false,
                    backgroundColor: '#00c0ef', //Info (aqua)
                    borderColor: '#00c0ef' //Info (aqua)
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false,
                    backgroundColor: '#00a65a', //Success (green)
                    borderColor: '#00a65a' //Success (green)
                },
                {
                    title: 'Open Google',
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: '//google.com/',
                    backgroundColor: '#3c8dbc', //Primary (light-blue)
                    borderColor: '#3c8dbc' //Primary (light-blue)
                }
            ];
    }

})();

(function() {
    'use strict';

    angular
        .module('app.extras')
        .service('LoadTreeService', LoadTreeService);

    LoadTreeService.$inject = ['$resource'];
    function LoadTreeService($resource) {
        // Loads the list of files to populate the treeview
        return $resource('server/editor/filetree.json');
    }

})();
/**=========================================================
 * Module: code-editor.js
 * Codemirror code editor controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.extras')
        .controller('CodeEditorController', CodeEditorController);

    CodeEditorController.$inject = ['$rootScope', '$scope', '$http', '$ocLazyLoad', 'filetree'];
    function CodeEditorController($rootScope, $scope, $http, $ocLazyLoad, filetree) {
        var vm = this;

        layout();
        activate();

        ////////////////
        /*jshint -W106*/
        function layout() {
          // Setup the layout mode 
          $rootScope.app.useFullLayout = true;
          $rootScope.app.hiddenFooter = true;
          $rootScope.app.layout.isCollapsed = true;
          
          // Restore layout for demo
          $scope.$on('$destroy', function(){
              $rootScope.app.useFullLayout = false;
              $rootScope.app.hiddenFooter = false;
          });

        }

        function activate() {

          // Set the tree data into the scope
          vm.filetree_data = filetree;

          // Available themes
          vm.editorThemes = ['3024-day','3024-night','ambiance-mobile','ambiance','base16-dark','base16-light','blackboard','cobalt','eclipse','elegant','erlang-dark','lesser-dark','mbo','mdn-like','midnight','monokai','neat','neo','night','paraiso-dark','paraiso-light','pastel-on-dark','rubyblue','solarized','the-matrix','tomorrow-night-eighties','twilight','vibrant-ink','xq-dark','xq-light'];

          vm.editorOpts = {
            mode: 'javascript',
            lineNumbers: true,
            matchBrackets: true,
            theme: 'mbo',
            viewportMargin: Infinity
          };

          vm.refreshEditor = 0;

          // Load dinamically the stylesheet for the selected theme
          // You can use ozLazyLoad to load also the mode js based 
          // on the file extension that is loaded (see handle_filetree)
          vm.loadTheme = function() {
            var BASE = 'vendor/codemirror/theme/';
            $ocLazyLoad.load(BASE + vm.editorOpts.theme + '.css');
            vm.refreshEditor = !vm.refreshEditor;
          };
          // load default theme
          vm.loadTheme(vm.editorOpts.theme);
          // Add some initial text
          vm.code = '// Open a file from the left menu \n' +
                        '// It will be requested to the server and loaded into the editor\n' +
                        '// Also try adding a New File from the toolbar\n';


          // Tree

          var selectedBranch;
          vm.handle_filetree = function(branch) {
            
            selectedBranch = branch;

            var basePath = 'server/editor/';
            var isFolder = !!branch.children.length;

            console.log('You selected: ' + branch.label + ' - isFolder? ' + isFolder);

            if ( ! isFolder ) {

              $http
                .get( basePath + branch.path )
                .success(function(response){
                  
                  console.log('Loaded.. ' + branch.path);
                  // set the new code into the editor
                  vm.code = response;
                  
                  vm.editorOpts.mode = detectMode(branch.path);
                  console.log( 'Mode is: ' + vm.editorOpts.mode);

                });
            }
          };

          function detectMode(file) {
            var ext = file.split('.');
            ext = ext ? ext[ext.length - 1] : '';
            switch (ext) {
              case 'html':  return 'htmlmixed';
              case 'css':   return 'css';
              default:      return 'javascript';
            }
          }

          var tree;
          tree = vm.filetree = {};

          // Adds a new branch to the tree
          vm.new_filetree = function() {
            var b;
            b = tree.get_selected_branch();

            // if we select a leaf -> select the parent folder
            if ( b && b.children.length === 0 ) {
              b = tree.get_parent_branch(b);
            }
            
            return tree.add_branch(b, {
              'label': 'another.html',
              'path': 'source/another.html'
            });
          };
        }
    }
})();


(function() {
    'use strict';

    angular
        .module('app.extras')
        .controller('TodoController', TodoController);

    TodoController.$inject = ['$filter'];
    function TodoController($filter) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
           vm.items = [
            {
              todo: {title: 'Meeting with Mark at 7am.', description: 'Pellentesque convallis mauris eu elit imperdiet quis eleifend quam aliquet. '},
              complete: true
            },
            {
              todo: {title: 'Call Sonya. Talk about the new project.', description: ''},
              complete: false
            },
            {
              todo: {title: 'Find a new place for vacations', description: ''},
              complete: false
            }
            ];
          
          vm.editingTodo = false;
          vm.todo = {};

          vm.addTodo = function() {
            
            if( vm.todo.title === '' ) return;
            if( !vm.todo.description ) vm.todo.description = '';
            
            if( vm.editingTodo ) {
              vm.todo = {};
              vm.editingTodo = false;
            }
            else {
              vm.items.push({todo: angular.copy(vm.todo), complete: false});
              vm.todo.title = '';
              vm.todo.description = '';
            }
          };
          
          vm.editTodo = function(index, $event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.todo = vm.items[index].todo;
            vm.editingTodo = true;
          };

          vm.removeTodo = function(index/*, $event*/) {
            vm.items.splice(index, 1);
          };
          
          vm.clearAll = function() {
            vm.items = [];
          };

          vm.totalCompleted = function() {
            return $filter('filter')(vm.items, function(item){
              return item.complete;
            }).length;
          };

          vm.totalPending = function() {
            return $filter('filter')(vm.items, function(item){
              return !item.complete;
            }).length;
          };

        }
    }
})();

/**=========================================================
 * Module: word-cloud.js
 * Controller for jqCloud
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.extras')
        .controller('WordCloudController', WordCloudController);

    function WordCloudController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.words = [
              {
                text: 'Lorem',
                weight: 13
                //link: 'http://themicon.co'
              }, {
                text: 'Ipsum',
                weight: 10.5
              }, {
                text: 'Dolor',
                weight: 9.4
              }, {
                text: 'Sit',
                weight: 8
              }, {
                text: 'Amet',
                weight: 6.2
              }, {
                text: 'Consectetur',
                weight: 5
              }, {
                text: 'Adipiscing',
                weight: 5
              }, {
                text: 'Sit',
                weight: 8
              }, {
                text: 'Amet',
                weight: 6.2
              }, {
                text: 'Consectetur',
                weight: 5
              }, {
                text: 'Adipiscing',
                weight: 5
              }
          ];
        }
    }
})();

/**=========================================================
 * Module: flatdoc.js
 * Creates the flatdoc markup and initializes the plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.flatdoc')
        .directive('flatdoc', flatdoc);

    function flatdoc () {

        var directive = {
            template: '<div role="flatdoc"><div role="flatdoc-menu"></div><div role="flatdoc-content"></div></div>',
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          Flatdoc.run({
            fetcher: Flatdoc.file(attrs.src)
          });
          
          var $root = $('html, body');
          $(document).on('flatdoc:ready', function() {
            var docMenu = $('[role="flatdoc-menu"]');
            docMenu.find('a').on('click', function(e) {
              e.preventDefault(); e.stopPropagation();
              
              var $this = $(this);
              
              docMenu.find('a.active').removeClass('active');
              $this.addClass('active');

              $root.animate({
                    scrollTop: $(this.getAttribute('href')).offset().top - ($('.topnavbar').height() + 10)
                }, 800);
            });

          });
        }
    }


})();

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('ColorPickerController', ColorPickerController);

    function ColorPickerController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
           vm.hexPicker = {
              color: ''
            };

            vm.rgbPicker = {
              color: ''
            };

            vm.rgbaPicker = {
              color: ''
            };

            vm.nonInput = {
              color: ''
            };

            vm.resetColor = function() {
              vm.hexPicker = {
                color: '#ff0000'
              };
            };

            vm.resetRBGColor = function() {
              vm.rgbPicker = {
                color: 'rgb(255,255,255)'
              };
            };

            vm.resetRBGAColor = function() {
              vm.rgbaPicker = {
                color: 'rgb(255,255,255, 0.25)'
              };
            };

            vm.resetNonInputColor = function() {
              vm.nonInput = {
                color: '#ffffff'
              };
            };
        }
    }
})();
/**=========================================================
 * Module: filestyle.js
 * Initializes the fielstyle plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('filestyle', filestyle);

    function filestyle () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          var options = element.data();
          
          // old usage support
          options.classInput = element.data('classinput') || options.classInput;
          
          element.filestyle(options);
        }
    }

})();

/**=========================================================
 * Module: form-imgcrop.js
 * Image crop controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('ImageCropController', ImageCropController);

    ImageCropController.$inject = ['$scope'];
    function ImageCropController($scope) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.reset = function() {
            vm.myImage        = '';
            vm.myCroppedImage = '';
            vm.imgcropType    = 'square';
          };

          vm.reset();

          var handleFileSelect=function(evt) {
            var file=evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
              $scope.$apply(function(/*$scope*/){
                vm.myImage=evt.target.result;
              });
            };
            if(file)
              reader.readAsDataURL(file);
          };
          
          angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        }
    }
})();

/**=========================================================
 * Module: FormValidationController
 * Input validation with UI Validate
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('FormValidationController', FormValidationController);

    function FormValidationController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.notBlackListed = function(value) {
            var blacklist = ['some@mail.com','another@email.com'];
            return blacklist.indexOf(value) === -1;
          };

          vm.words = function(value) {
            return value && value.split(' ').length;
          };

          vm.submitted = false;
          vm.validateInput = function(name, type) {
            var input = vm.formValidate[name];
            return (input.$dirty || vm.submitted) && input.$error[type];
          };

          // Submit form
          vm.submitForm = function() {
            vm.submitted = true;
            if (vm.formValidate.$valid) {
              console.log('Submitted!!');
            } else {
              console.log('Not valid!!');
              return false;
            }
          };
        }
    }
})();

/**=========================================================
 * Module: form-wizard.js
 * Handles form wizard plugin and validation
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('formWizard', formWizard);

    formWizard.$inject = ['$parse'];
    function formWizard ($parse) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: true
        };
        return directive;

        function link(scope, element, attrs) {
          var validate = $parse(attrs.validateSteps)(scope),
              wiz = new Wizard(attrs.steps, !!validate, element);
          scope.wizard = wiz.init();
        }

        function Wizard (quantity, validate, element) {
          
          var self = this;
          self.quantity = parseInt(quantity,10);
          self.validate = validate;
          self.element = element;
          
          self.init = function() {
            self.createsteps(self.quantity);
            self.go(1); // always start at fist step
            return self;
          };

          self.go = function(step) {
            
            if ( angular.isDefined(self.steps[step]) ) {

              if(self.validate && step !== 1) {
                var form = $(self.element),
                    group = form.children().children('div').get(step - 2);

                if (false === form.parsley().validate( group.id )) {
                  return false;
                }
              }

              self.cleanall();
              self.steps[step] = true;
            }
          };

          self.active = function(step) {
            return !!self.steps[step];
          };

          self.cleanall = function() {
            for(var i in self.steps){
              self.steps[i] = false;
            }
          };

          self.createsteps = function(q) {
            self.steps = [];
            for(var i = 1; i <= q; i++) self.steps[i] = false;
          };

        }
    }


})();

/**=========================================================
 * Module: form-xeditable.js
 * Form xEditable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('FormxEditableController', FormxEditableController);

    FormxEditableController.$inject = ['$scope', 'editableOptions', 'editableThemes', '$filter', '$http'];
    function FormxEditableController($scope, editableOptions, editableThemes, $filter, $http) {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {

          editableOptions.theme = 'bs3';

          editableThemes.bs3.inputClass = 'input-sm';
          editableThemes.bs3.buttonsClass = 'btn-sm';
          editableThemes.bs3.submitTpl = '<button type="submit" class="btn btn-success"><span class="fa fa-check"></span></button>';
          editableThemes.bs3.cancelTpl = '<button type="button" class="btn btn-default" ng-click="$form.$cancel()">'+
                                           '<span class="fa fa-times text-muted"></span>'+
                                         '</button>';

          vm.user = {
            email: 'email@example.com',
            tel: '123-45-67',
            number: 29,
            range: 10,
            url: 'http://example.com',
            search: 'blabla',
            color: '#6a4415',
            date: null,
            time: new Date(),
            datetime: null,
            month: null,
            week: null,
            desc: 'Sed pharetra euismod dolor, id feugiat ante volutpat eget. '
          };

          // Local select
          // ----------------------------------- 

          vm.user2 = {
            status: 2
          };

          vm.statuses = [
            {value: 1, text: 'status1'},
            {value: 2, text: 'status2'},
            {value: 3, text: 'status3'},
            {value: 4, text: 'status4'}
          ];

          vm.showStatus = function() {
            var selected = $filter('filter')(vm.statuses, {value: vm.user2.status});
            return (vm.user2.status && selected.length) ? selected[0].text : 'Not set';
          };

          // select remote
          // ----------------------------------- 

          vm.user3 = {
            id: 4,
            text: 'admin' // original value
          };

          vm.groups = [];

          vm.loadGroups = function() {
            return vm.groups.length ? null : $http.get('server/xeditable-groups.json').success(function(data) {
              vm.groups = data;
            });
          };

          $scope.$watch('user3.id', function(newVal, oldVal) {
            if (newVal !== oldVal) {
              var selected = $filter('filter')(vm.groups, {id: vm.user3.id});
              vm.user3.text = selected.length ? selected[0].text : null;
            }
          });

          // Typeahead
          // ----------------------------------- 

          vm.user4 = {
            state: 'Arizona'
          };

          vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

        }
    }
})();


(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('FormDemoCtrl', FormDemoCtrl);

    FormDemoCtrl.$inject = ['$resource'];
    function FormDemoCtrl($resource) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          // the following allow to request array $resource instead of object (default)
          var actions = {'get': {method: 'GET', isArray: true}};
          
          // Tags inputs
          // ----------------------------------- 
          var Cities = $resource('server/cities.json', {}, actions);

          Cities.get(function(data){

              vm.cities = data;

          });
          // for non ajax form just fill the scope variable
          // vm.cities = ['Amsterdam','Washington','Sydney','Beijing','Cairo'];

          // Slider demo values
          vm.slider1 = 5;
          vm.slider2 = 10;
          vm.slider3 = 15;
          vm.slider4 = 20;
          vm.slider5 = 25;
          vm.slider6 = 30;
          vm.slider7 = 10;
          vm.slider8 = [250,750];

          // Chosen data
          // ----------------------------------- 

          var States = $resource('server/chosen-states.json', {},  {'query':    {method:'GET', isArray:true} });

          vm.states = States.query();


          vm.alertSubmit = function(){
            alert('Form submitted!');
            return false;
          };

          // Angular wysiwyg 
          // ----------------------------------- 

          vm.wysiwygContent = '<p> Write something here.. </p>';

          // Text Angular (wysiwyg)
          // ----------------------------------- 
          
          vm.htmlContent = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><a href="https://github.com/fraywing/textAngular">Source</a> </p>';

        }
    }
})();

/**=========================================================
 * Module: masked,js
 * Initializes the masked inputs
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('masked', masked);

    function masked () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          var $elem = $(element);
          if($.fn.inputmask)
            $elem.inputmask();
        }
    }

})();

/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs a AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform a OR.
 */

(function() {
    'use strict';

    angular
        .module('app.forms')
        .filter('propsFilter', propsFilter);

    function propsFilter() {
        return filterFilter;

        ////////////////
        function filterFilter(items, props) {
          var out = [];

          if (angular.isArray(items)) {
            items.forEach(function(item) {
              var itemMatches = false;

              var keys = Object.keys(props);
              for (var i = 0; i < keys.length; i++) {
                var prop = keys[i];
                var text = props[prop].toLowerCase();
                if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                  itemMatches = true;
                  break;
                }
              }

              if (itemMatches) {
                out.push(item);
              }
            });
          } else {
            // Let the output be the input untouched
            out = items;
          }

          return out;
        }
    }

})();
/**=========================================================
 * Module: tags-input.js
 * Initializes the tag inputs plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('tagsinput', tagsinput);

    tagsinput.$inject = ['$timeout'];
    function tagsinput ($timeout) {
        var directive = {
            link: link,
            require: 'ngModel',
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs, ngModel) {
          element.on('itemAdded itemRemoved', function(){
            // check if view value is not empty and is a string
            // and update the view from string to an array of tags
            if(ngModel.$viewValue && ngModel.$viewValue.split) {
              ngModel.$setViewValue( ngModel.$viewValue.split(',') );
              ngModel.$render();
            }
          });

          $timeout(function(){
            element.tagsinput();
          });
        }
    }

})();

/**=========================================================
 * Module: uiselect.js
 * uiSelect controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('uiSelectController', uiSelectController);

    uiSelectController.$inject = ['$scope', '$http'];
    function uiSelectController($scope, $http) {
        /* jshint validthis:true */
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.disabled = undefined;

          vm.enable = function() {
            vm.disabled = false;
          };

          vm.disable = function() {
            vm.disabled = true;
          };

          vm.clear = function() {
            vm.person.selected = undefined;
            vm.address.selected = undefined;
            vm.country.selected = undefined;
          };

          vm.person = {};
          vm.people = [
            { name: 'Adam',      email: 'adam@email.com',      age: 10 },
            { name: 'Amalie',    email: 'amalie@email.com',    age: 12 },
            { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30 },
            { name: 'Samantha',  email: 'samantha@email.com',  age: 31 },
            { name: 'Estefanía', email: 'estefanía@email.com', age: 16 },
            { name: 'Natasha',   email: 'natasha@email.com',   age: 54 },
            { name: 'Nicole',    email: 'nicole@email.com',    age: 43 },
            { name: 'Adrian',    email: 'adrian@email.com',    age: 21 }
          ];

          vm.address = {};
          vm.refreshAddresses = function(address) {
            var params = {address: address, sensor: false};
            return $http.get(
              '//maps.googleapis.com/maps/api/geocode/json',
              {params: params}
            ).then(function(response) {
              vm.addresses = response.data.results;
            });
          };

          vm.country = {};
          vm.countries = [ // Taken from https://gist.github.com/unceus/6501985
            {name: 'Afghanistan', code: 'AF'},
            {name: 'Åland Islands', code: 'AX'},
            {name: 'Albania', code: 'AL'},
            {name: 'Algeria', code: 'DZ'},
            {name: 'American Samoa', code: 'AS'},
            {name: 'Andorra', code: 'AD'},
            {name: 'Angola', code: 'AO'},
            {name: 'Anguilla', code: 'AI'},
            {name: 'Antarctica', code: 'AQ'},
            {name: 'Antigua and Barbuda', code: 'AG'},
            {name: 'Argentina', code: 'AR'},
            {name: 'Armenia', code: 'AM'},
            {name: 'Aruba', code: 'AW'},
            {name: 'Australia', code: 'AU'},
            {name: 'Austria', code: 'AT'},
            {name: 'Azerbaijan', code: 'AZ'},
            {name: 'Bahamas', code: 'BS'},
            {name: 'Bahrain', code: 'BH'},
            {name: 'Bangladesh', code: 'BD'},
            {name: 'Barbados', code: 'BB'},
            {name: 'Belarus', code: 'BY'},
            {name: 'Belgium', code: 'BE'},
            {name: 'Belize', code: 'BZ'},
            {name: 'Benin', code: 'BJ'},
            {name: 'Bermuda', code: 'BM'},
            {name: 'Bhutan', code: 'BT'},
            {name: 'Bolivia', code: 'BO'},
            {name: 'Bosnia and Herzegovina', code: 'BA'},
            {name: 'Botswana', code: 'BW'},
            {name: 'Bouvet Island', code: 'BV'},
            {name: 'Brazil', code: 'BR'},
            {name: 'British Indian Ocean Territory', code: 'IO'},
            {name: 'Brunei Darussalam', code: 'BN'},
            {name: 'Bulgaria', code: 'BG'},
            {name: 'Burkina Faso', code: 'BF'},
            {name: 'Burundi', code: 'BI'},
            {name: 'Cambodia', code: 'KH'},
            {name: 'Cameroon', code: 'CM'},
            {name: 'Canada', code: 'CA'},
            {name: 'Cape Verde', code: 'CV'},
            {name: 'Cayman Islands', code: 'KY'},
            {name: 'Central African Republic', code: 'CF'},
            {name: 'Chad', code: 'TD'},
            {name: 'Chile', code: 'CL'},
            {name: 'China', code: 'CN'},
            {name: 'Christmas Island', code: 'CX'},
            {name: 'Cocos (Keeling) Islands', code: 'CC'},
            {name: 'Colombia', code: 'CO'},
            {name: 'Comoros', code: 'KM'},
            {name: 'Congo', code: 'CG'},
            {name: 'Congo, The Democratic Republic of the', code: 'CD'},
            {name: 'Cook Islands', code: 'CK'},
            {name: 'Costa Rica', code: 'CR'},
            {name: 'Cote D\'Ivoire', code: 'CI'},
            {name: 'Croatia', code: 'HR'},
            {name: 'Cuba', code: 'CU'},
            {name: 'Cyprus', code: 'CY'},
            {name: 'Czech Republic', code: 'CZ'},
            {name: 'Denmark', code: 'DK'},
            {name: 'Djibouti', code: 'DJ'},
            {name: 'Dominica', code: 'DM'},
            {name: 'Dominican Republic', code: 'DO'},
            {name: 'Ecuador', code: 'EC'},
            {name: 'Egypt', code: 'EG'},
            {name: 'El Salvador', code: 'SV'},
            {name: 'Equatorial Guinea', code: 'GQ'},
            {name: 'Eritrea', code: 'ER'},
            {name: 'Estonia', code: 'EE'},
            {name: 'Ethiopia', code: 'ET'},
            {name: 'Falkland Islands (Malvinas)', code: 'FK'},
            {name: 'Faroe Islands', code: 'FO'},
            {name: 'Fiji', code: 'FJ'},
            {name: 'Finland', code: 'FI'},
            {name: 'France', code: 'FR'},
            {name: 'French Guiana', code: 'GF'},
            {name: 'French Polynesia', code: 'PF'},
            {name: 'French Southern Territories', code: 'TF'},
            {name: 'Gabon', code: 'GA'},
            {name: 'Gambia', code: 'GM'},
            {name: 'Georgia', code: 'GE'},
            {name: 'Germany', code: 'DE'},
            {name: 'Ghana', code: 'GH'},
            {name: 'Gibraltar', code: 'GI'},
            {name: 'Greece', code: 'GR'},
            {name: 'Greenland', code: 'GL'},
            {name: 'Grenada', code: 'GD'},
            {name: 'Guadeloupe', code: 'GP'},
            {name: 'Guam', code: 'GU'},
            {name: 'Guatemala', code: 'GT'},
            {name: 'Guernsey', code: 'GG'},
            {name: 'Guinea', code: 'GN'},
            {name: 'Guinea-Bissau', code: 'GW'},
            {name: 'Guyana', code: 'GY'},
            {name: 'Haiti', code: 'HT'},
            {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
            {name: 'Holy See (Vatican City State)', code: 'VA'},
            {name: 'Honduras', code: 'HN'},
            {name: 'Hong Kong', code: 'HK'},
            {name: 'Hungary', code: 'HU'},
            {name: 'Iceland', code: 'IS'},
            {name: 'India', code: 'IN'},
            {name: 'Indonesia', code: 'ID'},
            {name: 'Iran, Islamic Republic Of', code: 'IR'},
            {name: 'Iraq', code: 'IQ'},
            {name: 'Ireland', code: 'IE'},
            {name: 'Isle of Man', code: 'IM'},
            {name: 'Israel', code: 'IL'},
            {name: 'Italy', code: 'IT'},
            {name: 'Jamaica', code: 'JM'},
            {name: 'Japan', code: 'JP'},
            {name: 'Jersey', code: 'JE'},
            {name: 'Jordan', code: 'JO'},
            {name: 'Kazakhstan', code: 'KZ'},
            {name: 'Kenya', code: 'KE'},
            {name: 'Kiribati', code: 'KI'},
            {name: 'Korea, Democratic People\'s Republic of', code: 'KP'},
            {name: 'Korea, Republic of', code: 'KR'},
            {name: 'Kuwait', code: 'KW'},
            {name: 'Kyrgyzstan', code: 'KG'},
            {name: 'Lao People\'s Democratic Republic', code: 'LA'},
            {name: 'Latvia', code: 'LV'},
            {name: 'Lebanon', code: 'LB'},
            {name: 'Lesotho', code: 'LS'},
            {name: 'Liberia', code: 'LR'},
            {name: 'Libyan Arab Jamahiriya', code: 'LY'},
            {name: 'Liechtenstein', code: 'LI'},
            {name: 'Lithuania', code: 'LT'},
            {name: 'Luxembourg', code: 'LU'},
            {name: 'Macao', code: 'MO'},
            {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
            {name: 'Madagascar', code: 'MG'},
            {name: 'Malawi', code: 'MW'},
            {name: 'Malaysia', code: 'MY'},
            {name: 'Maldives', code: 'MV'},
            {name: 'Mali', code: 'ML'},
            {name: 'Malta', code: 'MT'},
            {name: 'Marshall Islands', code: 'MH'},
            {name: 'Martinique', code: 'MQ'},
            {name: 'Mauritania', code: 'MR'},
            {name: 'Mauritius', code: 'MU'},
            {name: 'Mayotte', code: 'YT'},
            {name: 'Mexico', code: 'MX'},
            {name: 'Micronesia, Federated States of', code: 'FM'},
            {name: 'Moldova, Republic of', code: 'MD'},
            {name: 'Monaco', code: 'MC'},
            {name: 'Mongolia', code: 'MN'},
            {name: 'Montserrat', code: 'MS'},
            {name: 'Morocco', code: 'MA'},
            {name: 'Mozambique', code: 'MZ'},
            {name: 'Myanmar', code: 'MM'},
            {name: 'Namibia', code: 'NA'},
            {name: 'Nauru', code: 'NR'},
            {name: 'Nepal', code: 'NP'},
            {name: 'Netherlands', code: 'NL'},
            {name: 'Netherlands Antilles', code: 'AN'},
            {name: 'New Caledonia', code: 'NC'},
            {name: 'New Zealand', code: 'NZ'},
            {name: 'Nicaragua', code: 'NI'},
            {name: 'Niger', code: 'NE'},
            {name: 'Nigeria', code: 'NG'},
            {name: 'Niue', code: 'NU'},
            {name: 'Norfolk Island', code: 'NF'},
            {name: 'Northern Mariana Islands', code: 'MP'},
            {name: 'Norway', code: 'NO'},
            {name: 'Oman', code: 'OM'},
            {name: 'Pakistan', code: 'PK'},
            {name: 'Palau', code: 'PW'},
            {name: 'Palestinian Territory, Occupied', code: 'PS'},
            {name: 'Panama', code: 'PA'},
            {name: 'Papua New Guinea', code: 'PG'},
            {name: 'Paraguay', code: 'PY'},
            {name: 'Peru', code: 'PE'},
            {name: 'Philippines', code: 'PH'},
            {name: 'Pitcairn', code: 'PN'},
            {name: 'Poland', code: 'PL'},
            {name: 'Portugal', code: 'PT'},
            {name: 'Puerto Rico', code: 'PR'},
            {name: 'Qatar', code: 'QA'},
            {name: 'Reunion', code: 'RE'},
            {name: 'Romania', code: 'RO'},
            {name: 'Russian Federation', code: 'RU'},
            {name: 'Rwanda', code: 'RW'},
            {name: 'Saint Helena', code: 'SH'},
            {name: 'Saint Kitts and Nevis', code: 'KN'},
            {name: 'Saint Lucia', code: 'LC'},
            {name: 'Saint Pierre and Miquelon', code: 'PM'},
            {name: 'Saint Vincent and the Grenadines', code: 'VC'},
            {name: 'Samoa', code: 'WS'},
            {name: 'San Marino', code: 'SM'},
            {name: 'Sao Tome and Principe', code: 'ST'},
            {name: 'Saudi Arabia', code: 'SA'},
            {name: 'Senegal', code: 'SN'},
            {name: 'Serbia and Montenegro', code: 'CS'},
            {name: 'Seychelles', code: 'SC'},
            {name: 'Sierra Leone', code: 'SL'},
            {name: 'Singapore', code: 'SG'},
            {name: 'Slovakia', code: 'SK'},
            {name: 'Slovenia', code: 'SI'},
            {name: 'Solomon Islands', code: 'SB'},
            {name: 'Somalia', code: 'SO'},
            {name: 'South Africa', code: 'ZA'},
            {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
            {name: 'Spain', code: 'ES'},
            {name: 'Sri Lanka', code: 'LK'},
            {name: 'Sudan', code: 'SD'},
            {name: 'Suriname', code: 'SR'},
            {name: 'Svalbard and Jan Mayen', code: 'SJ'},
            {name: 'Swaziland', code: 'SZ'},
            {name: 'Sweden', code: 'SE'},
            {name: 'Switzerland', code: 'CH'},
            {name: 'Syrian Arab Republic', code: 'SY'},
            {name: 'Taiwan, Province of China', code: 'TW'},
            {name: 'Tajikistan', code: 'TJ'},
            {name: 'Tanzania, United Republic of', code: 'TZ'},
            {name: 'Thailand', code: 'TH'},
            {name: 'Timor-Leste', code: 'TL'},
            {name: 'Togo', code: 'TG'},
            {name: 'Tokelau', code: 'TK'},
            {name: 'Tonga', code: 'TO'},
            {name: 'Trinidad and Tobago', code: 'TT'},
            {name: 'Tunisia', code: 'TN'},
            {name: 'Turkey', code: 'TR'},
            {name: 'Turkmenistan', code: 'TM'},
            {name: 'Turks and Caicos Islands', code: 'TC'},
            {name: 'Tuvalu', code: 'TV'},
            {name: 'Uganda', code: 'UG'},
            {name: 'Ukraine', code: 'UA'},
            {name: 'United Arab Emirates', code: 'AE'},
            {name: 'United Kingdom', code: 'GB'},
            {name: 'United States', code: 'US'},
            {name: 'United States Minor Outlying Islands', code: 'UM'},
            {name: 'Uruguay', code: 'UY'},
            {name: 'Uzbekistan', code: 'UZ'},
            {name: 'Vanuatu', code: 'VU'},
            {name: 'Venezuela', code: 'VE'},
            {name: 'Vietnam', code: 'VN'},
            {name: 'Virgin Islands, British', code: 'VG'},
            {name: 'Virgin Islands, U.S.', code: 'VI'},
            {name: 'Wallis and Futuna', code: 'WF'},
            {name: 'Western Sahara', code: 'EH'},
            {name: 'Yemen', code: 'YE'},
            {name: 'Zambia', code: 'ZM'},
            {name: 'Zimbabwe', code: 'ZW'}
          ];


          // Multiple
          vm.someGroupFn = function (item){

            if (item.name[0] >= 'A' && item.name[0] <= 'M')
                return 'From A - M';

            if (item.name[0] >= 'N' && item.name[0] <= 'Z')
                return 'From N - Z';

          };

          vm.counter = 0;
          vm.someFunction = function (item, model){
            vm.counter++;
            vm.eventResult = {item: item, model: model};
          };

          vm.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];

          vm.multipleDemo = {};
          vm.multipleDemo.colors = ['Blue','Red'];
          vm.multipleDemo.selectedPeople = [vm.people[5], vm.people[4]];
          vm.multipleDemo.selectedPeopleWithGroupBy = [vm.people[8], vm.people[6]];
          vm.multipleDemo.selectedPeopleSimple = ['samantha@email.com','wladimir@email.com'];
        }
    }

})();

/**=========================================================
 * Module: upload.js
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .controller('FileUploadController', FileUploadController);

    FileUploadController.$inject = ['FileUploader'];
    function FileUploadController(FileUploader) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          var uploader = vm.uploader = new FileUploader({
              url: 'server/upload.php'
          });

          // FILTERS

          uploader.filters.push({
              name: 'customFilter',
              fn: function(/*item, options*/) {
                  return this.queue.length < 10;
              }
          });

          // CALLBACKS

          uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
              console.info('onWhenAddingFileFailed', item, filter, options);
          };
          uploader.onAfterAddingFile = function(fileItem) {
              console.info('onAfterAddingFile', fileItem);
          };
          uploader.onAfterAddingAll = function(addedFileItems) {
              console.info('onAfterAddingAll', addedFileItems);
          };
          uploader.onBeforeUploadItem = function(item) {
              console.info('onBeforeUploadItem', item);
          };
          uploader.onProgressItem = function(fileItem, progress) {
              console.info('onProgressItem', fileItem, progress);
          };
          uploader.onProgressAll = function(progress) {
              console.info('onProgressAll', progress);
          };
          uploader.onSuccessItem = function(fileItem, response, status, headers) {
              console.info('onSuccessItem', fileItem, response, status, headers);
          };
          uploader.onErrorItem = function(fileItem, response, status, headers) {
              console.info('onErrorItem', fileItem, response, status, headers);
          };
          uploader.onCancelItem = function(fileItem, response, status, headers) {
              console.info('onCancelItem', fileItem, response, status, headers);
          };
          uploader.onCompleteItem = function(fileItem, response, status, headers) {
              console.info('onCompleteItem', fileItem, response, status, headers);
          };
          uploader.onCompleteAll = function() {
              console.info('onCompleteAll');
          };

          console.info('uploader', uploader);
        }
    }
})();

/**=========================================================
 * Module: validate-form.js
 * Initializes the validation plugin Parsley
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.forms')
        .directive('validateForm', validateForm);

    function validateForm () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          var $elem = $(element);
          if($.fn.parsley)
            $elem.parsley();
        }
    }

})();

/**=========================================================
 * Module: skycons.js
 * Include any animated weather icon from Skycons
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.icons')
        .directive('skycon', skycon);

    function skycon () {

        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          var skycons = new Skycons({'color': (attrs.color || 'white')});

          element.html('<canvas width="' + attrs.width + '" height="' + attrs.height + '"></canvas>');

          skycons.add(element.children()[0], attrs.skycon);

          skycons.play();
        }
    }

})();

(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .config(lazyloadConfig);

    lazyloadConfig.$inject = ['$ocLazyLoadProvider', 'APP_REQUIRES'];
    function lazyloadConfig($ocLazyLoadProvider, APP_REQUIRES){

      // Lazy Load modules configuration
      $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: APP_REQUIRES.modules
      });

    }
})();
(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            scripts: {
                'whirl':              ['vendor/whirl/dist/whirl.css'],
                'classyloader':       ['vendor/jquery-classyloader/js/jquery.classyloader.min.js'],
                'animo':              ['vendor/animo.js/animo.js'],
                'fastclick':          ['vendor/fastclick/lib/fastclick.js'],
                'modernizr':          ['vendor/modernizr/modernizr.custom.js'],
                'animate':            ['vendor/animate.css/animate.min.css'],
                'skycons':            ['vendor/skycons/skycons.js'],
                'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                    'vendor/simple-line-icons/css/simple-line-icons.css'],
                'weather-icons':      ['vendor/weather-icons/css/weather-icons.min.css',
                    'vendor/weather-icons/css/weather-icons-wind.min.css'],
                'sparklines':         ['vendor/sparkline/index.js'],
                'wysiwyg':            ['vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                    'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
                'slimscroll':         ['vendor/slimScroll/jquery.slimscroll.min.js'],
                'screenfull':         ['vendor/screenfull/dist/screenfull.js'],
                'vector-map':         ['vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                    'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
                'vector-map-maps':    ['vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                    'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'],
                'loadGoogleMapsJS':   ['vendor/load-google-maps/load-google-maps.js'],
                'flot-chart':         ['vendor/Flot/jquery.flot.js'],
                'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                    'vendor/Flot/jquery.flot.resize.js',
                    'vendor/Flot/jquery.flot.pie.js',
                    'vendor/Flot/jquery.flot.time.js',
                    'vendor/Flot/jquery.flot.categories.js',
                    'vendor/flot-spline/js/jquery.flot.spline.min.js'],
                // jquery core and widgets
                'jquery-ui':          ['vendor/jquery-ui/ui/core.js',
                    'vendor/jquery-ui/ui/widget.js'],
                // loads only jquery required modules and touch support
                'jquery-ui-widgets':  ['vendor/jquery-ui/ui/core.js',
                    'vendor/jquery-ui/ui/widget.js',
                    'vendor/jquery-ui/ui/mouse.js',
                    'vendor/jquery-ui/ui/draggable.js',
                    'vendor/jquery-ui/ui/droppable.js',
                    'vendor/jquery-ui/ui/sortable.js',
                    'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'],
                'moment' :            ['vendor/moment/min/moment-with-locales.min.js'],
                'inputmask':          ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.js'],
                'flatdoc':            ['vendor/flatdoc/flatdoc.js'],
                'codemirror':         ['vendor/codemirror/lib/codemirror.js',
                    'vendor/codemirror/lib/codemirror.css'],
                // modes for common web files
                'codemirror-modes-web': ['vendor/codemirror/mode/javascript/javascript.js',
                    'vendor/codemirror/mode/xml/xml.js',
                    'vendor/codemirror/mode/htmlmixed/htmlmixed.js',
                    'vendor/codemirror/mode/css/css.js'],
                'taginput' :          ['vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                    'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'],
                'filestyle':          ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
                'parsley':            ['vendor/parsleyjs/dist/parsley.min.js'],
                'fullcalendar':       ['vendor/fullcalendar/dist/fullcalendar.min.js',
                    'vendor/fullcalendar/dist/fullcalendar.css'],
                'gcal':               ['vendor/fullcalendar/dist/gcal.js'],
                'chartjs':            ['vendor/Chart.js/Chart.js'],
                'morris':             ['vendor/raphael/raphael.js',
                    'vendor/morris.js/morris.js',
                    'vendor/morris.js/morris.css'],
                'loaders.css':          ['vendor/loaders.css/loaders.css'],
                'spinkit':              ['vendor/spinkit/css/spinkit.css']
            },
            // Angular based script (use the right module name)
            modules: [
                {name: 'toaster',                   files: ['vendor/angularjs-toaster/toaster.js',
                    'vendor/angularjs-toaster/toaster.css']},
                {name: 'localytics.directives',     files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js',
                    'vendor/chosen_v1.2.0/chosen.min.css',
                    'vendor/angular-chosen-localytics/chosen.js'],
                    serie: true},
                {name: 'ngDialog',                  files: ['vendor/ngDialog/js/ngDialog.min.js',
                    'vendor/ngDialog/css/ngDialog.min.css',
                    'vendor/ngDialog/css/ngDialog-theme-default.min.css'] },
                {name: 'ngWig',                     files: ['vendor/ngWig/dist/ng-wig.min.js'] },
                {name: 'ngTable',                   files: ['vendor/ng-table/dist/ng-table.min.js',
                    'vendor/ng-table/dist/ng-table.min.css']},
                {name: 'ngTableExport',             files: ['vendor/ng-table-export/ng-table-export.js']},
                {name: 'angularBootstrapNavTree',   files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                    'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css']},
                {name: 'htmlSortable',              files: ['vendor/html.sortable/dist/html.sortable.js',
                    'vendor/html.sortable/dist/html.sortable.angular.js']},
                {name: 'xeditable',                 files: ['vendor/angular-xeditable/dist/js/xeditable.js',
                    'vendor/angular-xeditable/dist/css/xeditable.css']},
                {name: 'angularFileUpload',         files: ['vendor/angular-file-upload/dist/angular-file-upload.js']},
                {name: 'ngImgCrop',                 files: ['vendor/ng-img-crop/compile/unminified/ng-img-crop.js',
                    'vendor/ng-img-crop/compile/unminified/ng-img-crop.css']},
                {name: 'ui.select',                 files: ['vendor/angular-ui-select/dist/select.js',
                    'vendor/angular-ui-select/dist/select.css']},
                {name: 'ui.codemirror',             files: ['vendor/angular-ui-codemirror/ui-codemirror.js']},
                {name: 'angular-carousel',          files: ['vendor/angular-carousel/dist/angular-carousel.css',
                    'vendor/angular-carousel/dist/angular-carousel.js']},
                {name: 'infinite-scroll',           files: ['vendor/ngInfiniteScroll/build/ng-infinite-scroll.js']},
                {name: 'ui.bootstrap-slider',       files: ['vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                    'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                    'vendor/angular-bootstrap-slider/slider.js']},
                {name: 'ui.grid',                   files: ['vendor/angular-ui-grid/ui-grid.min.css',
                    'vendor/angular-ui-grid/ui-grid.min.js']},
                {name: 'textAngular',               files: ['vendor/textAngular/dist/textAngular.css',
                    'vendor/textAngular/dist/textAngular-rangy.min.js',
                    'vendor/textAngular/dist/textAngular-sanitize.js',
                    'vendor/textAngular/src/globals.js',
                    'vendor/textAngular/src/factories.js',
                    'vendor/textAngular/src/DOM.js',
                    'vendor/textAngular/src/validators.js',
                    'vendor/textAngular/src/taBind.js',
                    'vendor/textAngular/src/main.js',
                    'vendor/textAngular/dist/textAngularSetup.js'
                ], serie: true},
                {name: 'angular-rickshaw',          files: ['vendor/d3/d3.min.js',
                    'vendor/rickshaw/rickshaw.js',
                    'vendor/rickshaw/rickshaw.min.css',
                    'vendor/angular-rickshaw/rickshaw.js'], serie: true},
                {name: 'angular-chartist',          files: ['vendor/chartist/dist/chartist.min.css',
                    'vendor/chartist/dist/chartist.js',
                    'vendor/angular-chartist.js/dist/angular-chartist.js'], serie: true},
                {name: 'ui.map',                    files: ['vendor/angular-ui-map/ui-map.js']},
                {name: 'datatables',                files: ['vendor/datatables/media/css/jquery.dataTables.css',
                    'vendor/datatables/media/js/jquery.dataTables.js',
                    'vendor/angular-datatables/dist/angular-datatables.js'], serie: true},
                {name: 'angular-jqcloud',           files: ['vendor/jqcloud2/dist/jqcloud.css',
                    'vendor/jqcloud2/dist/jqcloud.js',
                    'vendor/angular-jqcloud/angular-jqcloud.js']},
                {name: 'angularGrid',               files: ['vendor/ag-grid/dist/ag-grid.css',
                    'vendor/ag-grid/dist/ag-grid.js',
                    'vendor/ag-grid/dist/theme-dark.css',
                    'vendor/ag-grid/dist/theme-fresh.css']},
                {name: 'ng-nestable',               files: ['vendor/ng-nestable/src/angular-nestable.js',
                    'vendor/nestable/jquery.nestable.js']},
                {name: 'akoenig.deckgrid',          files: ['vendor/angular-deckgrid/angular-deckgrid.js']},
                {name: 'oitozero.ngSweetAlert',     files: ['vendor/sweetalert/dist/sweetalert.css',
                    'vendor/sweetalert/dist/sweetalert.min.js',
                    'vendor/angular-sweetalert/SweetAlert.js']},
                {name: 'bm.bsTour',                 files: ['vendor/bootstrap-tour/build/css/bootstrap-tour.css',
                    'vendor/bootstrap-tour/build/js/bootstrap-tour-standalone.js',
                    'vendor/angular-bootstrap-tour/dist/angular-bootstrap-tour.js'], serie: true},
                {name: 'ui.knob',                   files: ['vendor/angular-knob/src/angular-knob.js',
                    'vendor/jquery-knob/dist/jquery.knob.min.js']},
                {name: 'easypiechart',              files: ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.min.js']},
                {name: 'colorpicker.module',        files: ['vendor/angular-bootstrap-colorpicker/css/colorpicker.css',
                    'vendor/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js']},
                {name:'affix',                      files: ['vendor/affix/affix.js', 'vendor/affix/debounce.js', 'vendor/affix/dimensions.js']}

            ]
        })
    ;

})();

(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .config(loadingbarConfig)
        ;
    loadingbarConfig.$inject = ['cfpLoadingBarProvider'];
    function loadingbarConfig(cfpLoadingBarProvider){
      cfpLoadingBarProvider.includeBar = true;
      cfpLoadingBarProvider.includeSpinner = false;
      cfpLoadingBarProvider.latencyThreshold = 500;
      cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }
})();
(function() {
    'use strict';

    angular
        .module('app.loadingbar')
        .run(loadingbarRun)
        ;
    loadingbarRun.$inject = ['$rootScope', '$timeout', 'cfpLoadingBar'];
    function loadingbarRun($rootScope, $timeout, cfpLoadingBar){

      // Loading bar transition
      // ----------------------------------- 
      var thBar;
      $rootScope.$on('$stateChangeStart', function() {
          if($('.wrapper > section').length) // check if bar container exists
            thBar = $timeout(function() {
              cfpLoadingBar.start();
            }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function(event) {
          event.targetScope.$watch('$viewContentLoaded', function () {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete();
          });
      });

    }

})();
(function() {
    'use strict';

    angular
        .module('app.locale')
        .config(localeConfig)
        ;
    localeConfig.$inject = ['tmhDynamicLocaleProvider'];
    function localeConfig(tmhDynamicLocaleProvider){
  
      tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');
      // tmhDynamicLocaleProvider.useStorage('$cookieStore');

    }
})();
/**=========================================================
 * Module: locale.js
 * Demo for locale settings
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.locale')
        .controller('LocalizationController', LocalizationController);

    LocalizationController.$inject = ['$rootScope', 'tmhDynamicLocale', '$locale'];
    function LocalizationController($rootScope, tmhDynamicLocale, $locale) {

        activate();

        ////////////////

        function activate() {
          $rootScope.availableLocales = {
            'en': 'English',
            'es': 'Spanish',
            'de': 'German',
            'fr': 'French',
            'ar': 'Arabic',
            'ja': 'Japanese',
            'ko': 'Korean',
            'zh': 'Chinese'};
          
          $rootScope.model = {selectedLocale: 'en'};
          
          $rootScope.$locale = $locale;
          
          $rootScope.changeLocale = tmhDynamicLocale.set;
        }
    }
})();

/**=========================================================
 * Module: demo-pagination.js
 * Provides a simple demo for pagination
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.mailbox')
        .controller('MailboxController', MailboxController);

    function MailboxController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.folders = [
            {name: 'Inbox',   folder: 'inbox',   alert: 42, icon: 'fa-inbox' },
            {name: 'Starred', folder: 'starred', alert: 10, icon: 'fa-star' },
            {name: 'Sent',    folder: 'sent',    alert: 0,  icon: 'fa-paper-plane-o' },
            {name: 'Draft',   folder: 'draft',   alert: 5,  icon: 'fa-edit' },
            {name: 'Trash',   folder: 'trash',   alert: 0,  icon: 'fa-trash'}
          ];

          vm.labels = [
            {name: 'Red',     color: 'danger'},
            {name: 'Pink',    color: 'pink'},
            {name: 'Blue',    color: 'info'},
            {name: 'Yellow',  color: 'warning'}
          ];

          vm.mail = {
            cc: false,
            bcc: false
          };
          // Mailbox editr initial content
          vm.content = '<p>Type something..</p>';
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.mailbox')
        .controller('MailFolderController', MailFolderController);

    MailFolderController.$inject = ['mails', '$stateParams'];
    function MailFolderController(mails, $stateParams) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          
          vm.folder = {};
          // no filter for inbox
          vm.folder.folder = $stateParams.folder === 'inbox' ? '' : $stateParams.folder;

          mails.all().then(function(mails){
            vm.mails = mails;
          });
        }
    }
})();

// A RESTful factory for retrieving mails from json file

(function() {
    'use strict';

    angular
        .module('app.mailbox')
        .factory('mails', mails);

    mails.$inject = ['$http'];
    function mails($http) {
        var service = {
            all: all,
            get: get
        };
        return service;

        ////////////////
        
        function readMails() {
          var path = 'server/mails.json';
          return $http.get(path).then(function (resp) {
            return resp.data.mails;
          });
        }

        function all() {
          return readMails();
        }

        function get(id) {
          return readMails().then(function(mails){
            for (var i = 0; i < mails.length; i++) {
              if (+mails[i].id === +id) return mails[i];
            }
            return null;
          });
        }
    }
})();


(function() {
    'use strict';

    angular
        .module('app.mailbox')
        .controller('MailViewController', MailViewController);

    MailViewController.$inject = ['mails', '$stateParams'];
    function MailViewController(mails, $stateParams) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          mails.get($stateParams.mid).then(function(mail){
            vm.mail = mail;
          });
        }
    }
})();

/**=========================================================
 * Module: modals.js
 * Provides a simple way to implement bootstrap modals from templates
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('ModalGmapController', ModalGmapController);

    ModalGmapController.$inject = ['$uibModal'];
    function ModalGmapController($uibModal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          vm.open = function (size) {

            //var modalInstance =
            $uibModal.open({
              templateUrl: '/myModalContent.html',
              controller: ModalInstanceCtrl,
              size: size
            });
          };

          // Please note that $uibModalInstance represents a modal window (instance) dependency.
          // It is not the same as the $uibModal service used above.

          ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', '$timeout'];
          function ModalInstanceCtrl($scope, $uibModalInstance, $timeout) {

            $uibModalInstance.opened.then(function () {
              var position = new google.maps.LatLng(33.790807, -117.835734);

              $scope.mapOptionsModal = {
                zoom: 14,
                center: position,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };

              // we use timeout to wait maps to be ready before add a markers
              $timeout(function(){
                // 1. Add a marker at the position it was initialized
                new google.maps.Marker({
                  map: $scope.myMapModal,
                  position: position
                });
                // 2. Trigger a resize so the map is redrawed
                google.maps.event.trigger($scope.myMapModal, 'resize');
                // 3. Move to the center if it is misaligned
                $scope.myMapModal.panTo(position);
              });

            });

            $scope.ok = function () {
              $uibModalInstance.close('closed');
            };

            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };

          }

        }
    }

})();


(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('GMapController', GMapController);

    GMapController.$inject = ['$timeout'];
    function GMapController($timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          var position = [
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.790807, -117.835734),
              new google.maps.LatLng(33.787453, -117.835858)
            ];
          
          vm.addMarker = addMarker;
          // we use timeout to wait maps to be ready before add a markers
          $timeout(function(){
            addMarker(vm.myMap1, position[0]);
            addMarker(vm.myMap2, position[1]);
            addMarker(vm.myMap3, position[2]);
            addMarker(vm.myMap5, position[3]);
          });

          vm.mapOptions1 = {
            zoom: 14,
            center: position[0],
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          };

          vm.mapOptions2 = {
            zoom: 19,
            center: position[1],
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          vm.mapOptions3 = {
            zoom: 14,
            center: position[2],
            mapTypeId: google.maps.MapTypeId.SATELLITE
          };

          vm.mapOptions4 = {
            zoom: 14,
            center: position[3],
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          // for multiple markers
          $timeout(function(){
            addMarker(vm.myMap4, position[3]);
            addMarker(vm.myMap4, position[4]);
          });

          // custom map style
          var MapStyles = [{'featureType':'water','stylers':[{'visibility':'on'},{'color':'#bdd1f9'}]},{'featureType':'all','elementType':'labels.text.fill','stylers':[{'color':'#334165'}]},{featureType:'landscape',stylers:[{color:'#e9ebf1'}]},{featureType:'road.highway',elementType:'geometry',stylers:[{color:'#c5c6c6'}]},{featureType:'road.arterial',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'road.local',elementType:'geometry',stylers:[{color:'#fff'}]},{featureType:'transit',elementType:'geometry',stylers:[{color:'#d8dbe0'}]},{featureType:'poi',elementType:'geometry',stylers:[{color:'#cfd5e0'}]},{featureType:'administrative',stylers:[{visibility:'on'},{lightness:33}]},{featureType:'poi.park',elementType:'labels',stylers:[{visibility:'on'},{lightness:20}]},{featureType:'road',stylers:[{color:'#d8dbe0',lightness:20}]}];
          vm.mapOptions5 = {
            zoom: 14,
            center: position[3],
            styles: MapStyles,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          };

          ///////////////
          
          function addMarker(map, position) {
            return new google.maps.Marker({
              map: map,
              position: position
            });
          }

        }
    }
})();

/**=========================================================
 * Module: vector-map.js.js
 * Init jQuery Vector Map plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.maps')
        .directive('vectorMap', vectorMap);

    vectorMap.$inject = ['VectorMap'];
    function vectorMap (VectorMap) {
        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
              seriesData: '=',
              markersData: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
          
          var defaultColors = {
              markerColor:  '#23b7e5',      // the marker points
              bgColor:      'transparent',      // the background
              scaleColors:  ['#878c9a'],    // the color of the region in the serie
              regionFill:   '#bbbec6'       // the base region color
          };

          var mapHeight   = attrs.height || '300',
              options     = {
                markerColor:  attrs.markerColor  || defaultColors.markerColor,
                bgColor:      attrs.bgColor      || defaultColors.bgColor,
                scale:        attrs.scale        || 1,
                scaleColors:  attrs.scaleColors  || defaultColors.scaleColors,
                regionFill:   attrs.regionFill   || defaultColors.regionFill,
                mapName:      attrs.mapName      || 'world_mill_en'
              };
          
          element.css('height', mapHeight);
          
          VectorMap.init( element , options, scope.seriesData, scope.markersData);
        }
    }

})();

/**=========================================================
 * Module: vector-map.js
 * Services to initialize vector map plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.maps')
        .service('VectorMap', VectorMap);

    function VectorMap() {
        this.init = init;

        ////////////////

        function init($element, opts, series, markers) {
          $element.vectorMap({
            map:             opts.mapName,
            backgroundColor: opts.bgColor,
            zoomMin:         1,
            zoomMax:         8,
            zoomOnScroll:    false,
            regionStyle: {
              initial: {
                'fill':           opts.regionFill,
                'fill-opacity':   1,
                'stroke':         'none',
                'stroke-width':   1.5,
                'stroke-opacity': 1
              },
              hover: {
                'fill-opacity': 0.8
              },
              selected: {
                fill: 'blue'
              },
              selectedHover: {
              }
            },
            focusOn:{ x:0.4, y:0.6, scale: opts.scale},
            markerStyle: {
              initial: {
                fill: opts.markerColor,
                stroke: opts.markerColor
              }
            },
            onRegionLabelShow: function(e, el, code) {
              if ( series && series[code] )
                el.html(el.html() + ': ' + series[code] + ' visitors');
            },
            markers: markers,
            series: {
                regions: [{
                    values: series,
                    scale: opts.scaleColors,
                    normalizeFunction: 'polynomial'
                }]
            },
          });
        }
    }
})();

/**=========================================================
 * Module: vmaps,js
 * jVector Maps support
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.maps')
        .controller('VectorMapController', VectorMapController);

    function VectorMapController() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.seriesData = {
            'CA': 11100,   // Canada
            'DE': 2510,    // Germany
            'FR': 3710,    // France
            'AU': 5710,    // Australia
            'GB': 8310,    // Great Britain
            'RU': 9310,    // Russia
            'BR': 6610,    // Brazil
            'IN': 7810,    // India
            'CN': 4310,    // China
            'US': 839,     // USA
            'SA': 410      // Saudi Arabia
          };
          
          vm.markersData = [
            { latLng:[41.90, 12.45],  name:'Vatican City'          },
            { latLng:[43.73, 7.41],   name:'Monaco'                },
            { latLng:[-0.52, 166.93], name:'Nauru'                 },
            { latLng:[-8.51, 179.21], name:'Tuvalu'                },
            { latLng:[7.11,171.06],   name:'Marshall Islands'      },
            { latLng:[17.3,-62.73],   name:'Saint Kitts and Nevis' },
            { latLng:[3.2,73.22],     name:'Maldives'              },
            { latLng:[35.88,14.5],    name:'Malta'                 },
            { latLng:[41.0,-71.06],   name:'New England'           },
            { latLng:[12.05,-61.75],  name:'Grenada'               },
            { latLng:[13.16,-59.55],  name:'Barbados'              },
            { latLng:[17.11,-61.85],  name:'Antigua and Barbuda'   },
            { latLng:[-4.61,55.45],   name:'Seychelles'            },
            { latLng:[7.35,134.46],   name:'Palau'                 },
            { latLng:[42.5,1.51],     name:'Andorra'               }
          ];
        }
    }
})();

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .directive('searchOpen', searchOpen)
        .directive('searchDismiss', searchDismiss);

    //
    // directives definition
    // 
    
    function searchOpen () {
        var directive = {
            controller: searchOpenController,
            restrict: 'A'
        };
        return directive;

    }

    function searchDismiss () {
        var directive = {
            controller: searchDismissController,
            restrict: 'A'
        };
        return directive;
        
    }

    //
    // Contrller definition
    // 
    
    searchOpenController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchOpenController ($scope, $element, NavSearch) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.toggle);
    }

    searchDismissController.$inject = ['$scope', '$element', 'NavSearch'];
    function searchDismissController ($scope, $element, NavSearch) {
      
      var inputSelector = '.navbar-form input[type="text"]';

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode === 27) // ESC
            NavSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', NavSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', NavSearch.dismiss);
    }

})();


/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
(function() {
    'use strict';

    angular
        .module('app.navsearch')
        .service('NavSearch', NavSearch);

    function NavSearch() {
        this.toggle = toggle;
        this.dismiss = dismiss;

        ////////////////

        var navbarFormSelector = 'form.navbar-form';

        function toggle() {
          var navbarForm = $(navbarFormSelector);

          navbarForm.toggleClass('open');
          
          var isOpen = navbarForm.hasClass('open');
          
          navbarForm.find('input')[isOpen ? 'focus' : 'blur']();
        }

        function dismiss() {
          $(navbarFormSelector)
            .removeClass('open') // Close control
            .find('input[type="text"]').blur() // remove focus
            .val('') // Empty input
            ;
        }        
    }
})();

/**=========================================================
 * Module: demo-notify.js
 * Provides a simple demo for notify
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.notify')
        .controller('NotifyDemoCtrl', NotifyDemoCtrl);

    NotifyDemoCtrl.$inject = ['Notify', '$timeout'];
    function NotifyDemoCtrl(Notify, $timeout) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          vm.msgHtml = '<em class="fa fa-check"></em> Message with icon..';

          vm.notifyMsg = 'Some messages here..';
          vm.notifyOpts = {
            status: 'danger',
            pos: 'bottom-center'
          };

          // Service usage example
          $timeout(function(){
            
            Notify.alert( 
                'This is a custom message from notify..', 
                {status: 'success'}
            );
          
          }, 500);
        }
    }
})();

/**=========================================================
 * Module: notify.js
 * Directive for notify plugin
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.notify')
        .directive('notify', notify);

    notify.$inject = ['$window', 'Notify'];
    function notify ($window, Notify) {

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              options: '=',
              message: '='
            }
        };
        return directive;

        function link(scope, element) {

          element.on('click', function (e) {
            e.preventDefault();
            Notify.alert(scope.message, scope.options);
          });
        }

    }

})();


/**=========================================================
 * Module: notify.js
 * Create a notifications that fade out automatically.
 * Based on Notify addon from UIKit (http://getuikit.com/docs/addons_notify.html)
 =========================================================*/

(function() {
    'use strict';
    angular
        .module('app.notify')
        .service('Notify', Notify);

    Notify.$inject = ['$timeout'];
    function Notify($timeout) {

        this.alert = notifyAlert;

        ////////////////

        function notifyAlert(msg, opts) {
            if ( msg ) {
                $timeout(function(){
                    $.notify(msg, opts || {});
                });
            }
        }
    }

})();

/**
 * Notify Addon definition as jQuery plugin
 * Adapted version to work with Bootstrap classes
 * More information http://getuikit.com/docs/addons_notify.html
 */
(function($){
    'use strict';
    var containers = {},
        messages   = {},
        notify     =  function(options){
            if ($.type(options) === 'string') {
                options = { message: options };
            }
            if (arguments[1]) {
                options = $.extend(options, $.type(arguments[1]) === 'string' ? {status:arguments[1]} : arguments[1]);
            }
            return (new Message(options)).show();
        },
        closeAll  = function(group, instantly){
            var id;
            if(group) {
                for(id in messages) { if(group===messages[id].group) messages[id].close(instantly); }
            } else {
                for(id in messages) { messages[id].close(instantly); }
            }
        };
    var Message = function(options){
        // var $this = this;
        this.options = $.extend({}, Message.defaults, options);
        this.uuid    = 'ID'+(new Date().getTime())+'RAND'+(Math.ceil(Math.random() * 100000));
        this.element = $([
            // @geedmo: alert-dismissable enables bs close icon
            '<div class="uk-notify-message alert-dismissable">',
                '<a class="close">&times;</a>',
                '<div>'+this.options.message+'</div>',
            '</div>'
        ].join('')).data('notifyMessage', this);
        // status
        if (this.options.status) {
            this.element.addClass('alert alert-'+this.options.status);
            this.currentstatus = this.options.status;
        }
        this.group = this.options.group;
        messages[this.uuid] = this;
        if(!containers[this.options.pos]) {
            containers[this.options.pos] = $('<div class="uk-notify uk-notify-'+this.options.pos+'"></div>').appendTo('body').on('click', '.uk-notify-message', function(){
                $(this).data('notifyMessage').close();
            });
        }
    };
    $.extend(Message.prototype, {
        uuid: false,
        element: false,
        timout: false,
        currentstatus: '',
        group: false,
        show: function() {
            if (this.element.is(':visible')) return;
            var $this = this;
            containers[this.options.pos].show().prepend(this.element);
            var marginbottom = parseInt(this.element.css('margin-bottom'), 10);
            this.element.css({'opacity':0, 'margin-top': -1*this.element.outerHeight(), 'margin-bottom':0}).animate({'opacity':1, 'margin-top': 0, 'margin-bottom':marginbottom}, function(){
                if ($this.options.timeout) {
                    var closefn = function(){ $this.close(); };
                    $this.timeout = setTimeout(closefn, $this.options.timeout);
                    $this.element.hover(
                        function() { clearTimeout($this.timeout); },
                        function() { $this.timeout = setTimeout(closefn, $this.options.timeout);  }
                    );
                }
            });
            return this;
        },
        close: function(instantly) {
            var $this    = this,
                finalize = function(){
                    $this.element.remove();
                    if(!containers[$this.options.pos].children().length) {
                        containers[$this.options.pos].hide();
                    }
                    delete messages[$this.uuid];
                };
            if(this.timeout) clearTimeout(this.timeout);
            if(instantly) {
                finalize();
            } else {
                this.element.animate({'opacity':0, 'margin-top': -1* this.element.outerHeight(), 'margin-bottom':0}, function(){
                    finalize();
                });
            }
        },
        content: function(html){
            var container = this.element.find('>div');
            if(!html) {
                return container.html();
            }
            container.html(html);
            return this;
        },
        status: function(status) {
            if(!status) {
                return this.currentstatus;
            }
            this.element.removeClass('alert alert-'+this.currentstatus).addClass('alert alert-'+status);
            this.currentstatus = status;
            return this;
        }
    });
    Message.defaults = {
        message: '',
        status: 'normal',
        timeout: 5000,
        group: null,
        pos: 'top-center'
    };
    
    $.notify          = notify;
    $.notify.message  = Message;
    $.notify.closeAll = closeAll;
    
    return notify;
}(jQuery));

/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.pages')
        .controller('LoginFormController', LoginFormController);

    LoginFormController.$inject = ['$http', '$state'];
    function LoginFormController($http, $state) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
          // bind here all data from the form
          vm.account = {};
          // place the message if something goes wrong
          vm.authMsg = '';

          vm.login = function() {
            vm.authMsg = '';

            if(vm.loginForm.$valid) {

              $http
                .post('api/account/login', {email: vm.account.email, password: vm.account.password})
                .then(function(response) {
                  // assumes if ok, response is an object with some data, if not, a string with error
                  // customize according to your api
                  if ( !response.account ) {
                    vm.authMsg = 'Incorrect credentials.';
                  }else{
                    $state.go('app.dashboard');
                  }
                }, function() {
                  vm.authMsg = 'Server Request Error';
                });
            }
            else {
              // set as dirty if the user click directly to login so we show the validation messages
              /*jshint -W106*/
              vm.loginForm.account_email.$dirty = true;
              vm.loginForm.account_password.$dirty = true;
            }
          };
        }
    }
})();

///**=========================================================
// * Module: access-register.js
// * Demo for register account api
// =========================================================*/
//
//(function() {
//    'use strict';
//
//    angular
//        .module('app.pages')
//        .controller('RegisterFormController', RegisterFormController);
//
//    RegisterFormController.$inject = ['$http', '$state'];
//    function RegisterFormController($http, $state) {
//        var vm = this;
//
//        activate();
//
//        ////////////////
//
//        function activate() {
//          // bind here all data from the form
//          vm.account = {};
//          // place the message if something goes wrong
//          vm.authMsg = '';
//
//          vm.register = function() {
//            vm.authMsg = '';
//
//            if(vm.registerForm.$valid) {
//
//              $http
//                .post('api/account/register', {email: vm.account.email, password: vm.account.password})
//                .then(function(response) {
//                  // assumes if ok, response is an object with some data, if not, a string with error
//                  // customize according to your api
//                  if ( !response.account ) {
//                    vm.authMsg = response;
//                  }else{
//                    $state.go('app.dashboard');
//                  }
//                }, function() {
//                  vm.authMsg = 'Server Request Error';
//                });
//            }
//            else {
//              // set as dirty if the user click directly to login so we show the validation messages
//              /*jshint -W106*/
//              vm.registerForm.account_email.$dirty = true;
//              vm.registerForm.account_password.$dirty = true;
//              vm.registerForm.account_agreed.$dirty = true;
//
//            }
//          };
//        }
//    }
//})();

/**=========================================================
 * Collapse panels * [panel-collapse]
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelCollapse', panelCollapse);

    function panelCollapse () {
        var directive = {
            controller: Controller,
            restrict: 'A',
            scope: false
        };
        return directive;
    }

    Controller.$inject = ['$scope', '$element', '$timeout', '$localStorage'];
    function Controller ($scope, $element, $timeout, $localStorage) {
      var storageKeyName = 'panelState';

      // Prepare the panel to be collapsible
      var $elem   = $($element),
          parent  = $elem.closest('.panel'), // find the first parent panel
          panelId = parent.attr('id');

      // Load the saved state if exists
      var currentState = loadPanelState( panelId );
      if ( typeof currentState !== 'undefined') {
        $timeout(function(){
            $scope[panelId] = currentState; },
          10);
      }

      // bind events to switch icons
      $element.bind('click', function(e) {
        e.preventDefault();
        savePanelState( panelId, !$scope[panelId] );

      });
  
      // Controller helpers
      function savePanelState(id, state) {
        if(!id) return false;
        var data = angular.fromJson($localStorage[storageKeyName]);
        if(!data) { data = {}; }
        data[id] = state;
        $localStorage[storageKeyName] = angular.toJson(data);
      }
      function loadPanelState(id) {
        if(!id) return false;
        var data = angular.fromJson($localStorage[storageKeyName]);
        if(data) {
          return data[id];
        }
      }
    }

})();

/**=========================================================
 * Dismiss panels * [panel-dismiss]
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelDismiss', panelDismiss);

    function panelDismiss () {

        var directive = {
            controller: Controller,
            restrict: 'A'
        };
        return directive;

    }

    Controller.$inject = ['$scope', '$element', '$q', 'Utils'];
    function Controller ($scope, $element, $q, Utils) {
      var removeEvent   = 'panel-remove',
          removedEvent  = 'panel-removed';

      $element.on('click', function (e) {
        e.preventDefault();

        // find the first parent panel
        var parent = $(this).closest('.panel');

        removeElement();

        function removeElement() {
          var deferred = $q.defer();
          var promise = deferred.promise;
          
          // Communicate event destroying panel
          $scope.$emit(removeEvent, parent.attr('id'), deferred);
          promise.then(destroyMiddleware);
        }

        // Run the animation before destroy the panel
        function destroyMiddleware() {
          if(Utils.support.animation) {
            parent.animo({animation: 'bounceOut'}, destroyPanel);
          }
          else destroyPanel();
        }

        function destroyPanel() {

          var col = parent.parent();
          parent.remove();
          // remove the parent if it is a row and is empty and not a sortable (portlet)
          col
            .filter(function() {
            var el = $(this);
            return (el.is('[class*="col-"]:not(.sortable)') && el.children('*').length === 0);
          }).remove();

          // Communicate event destroyed panel
          $scope.$emit(removedEvent, parent.attr('id'));

        }

      });
    }
})();



/**=========================================================
 * Refresh panels
 * [panel-refresh] * [data-spinner="standard"]
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('panelRefresh', panelRefresh);

    function panelRefresh () {
        var directive = {
            controller: Controller,
            restrict: 'A',
            scope: false
        };
        return directive;

    }

    Controller.$inject = ['$scope', '$element'];
    function Controller ($scope, $element) {
      var refreshEvent   = 'panel-refresh',
          whirlClass     = 'whirl',
          defaultSpinner = 'standard';

      // catch clicks to toggle panel refresh
      $element.on('click', function (e) {
        e.preventDefault();

        var $this   = $(this),
            panel   = $this.parents('.panel').eq(0),
            spinner = $this.data('spinner') || defaultSpinner
            ;

        // start showing the spinner
        panel.addClass(whirlClass + ' ' + spinner);

        // Emit event when refresh clicked
        $scope.$emit(refreshEvent, panel.attr('id'));

      });

      // listen to remove spinner
      $scope.$on('removeSpinner', removeSpinner);

      // method to clear the spinner when done
      function removeSpinner (ev, id) {
        if (!id) return;
        var newid = id.charAt(0) === '#' ? id : ('#'+id);
        angular
          .element(newid)
          .removeClass(whirlClass);
      }
    }
})();



/**=========================================================
 * Module panel-tools.js
 * Directive tools to control panels.
 * Allows collapse, refresh and dismiss (remove)
 * Saves panel state in browser storage
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('paneltool', paneltool);

    paneltool.$inject = ['$compile', '$timeout'];
    function paneltool ($compile, $timeout) {
        var directive = {
            link: link,
            restrict: 'E',
            scope: false
        };
        return directive;

        function link(scope, element, attrs) {

          var templates = {
            /* jshint multistr: true */
            collapse:'<a href="#" panel-collapse="" uib-tooltip="Collapse Panel" ng-click="{{panelId}} = !{{panelId}}"> \
                        <em ng-show="{{panelId}}" class="fa fa-plus ng-no-animation"></em> \
                        <em ng-show="!{{panelId}}" class="fa fa-minus ng-no-animation"></em> \
                      </a>',
            dismiss: '<a href="#" panel-dismiss="" uib-tooltip="Close Panel">\
                       <em class="fa fa-times"></em>\
                     </a>',
            refresh: '<a href="#" panel-refresh="" data-spinner="{{spinner}}" uib-tooltip="Refresh Panel">\
                       <em class="fa fa-refresh"></em>\
                     </a>'
          };

          var tools = scope.panelTools || attrs;

          $timeout(function() {
            element.html(getTemplate(element, tools )).show();
            $compile(element.contents())(scope);

            element.addClass('pull-right');
          });

          function getTemplate( elem, attrs ){
            var temp = '';
            attrs = attrs || {};
            if(attrs.toolCollapse)
              temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')) );
            if(attrs.toolDismiss)
              temp += templates.dismiss;
            if(attrs.toolRefresh)
              temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
            return temp;
          }
        }// link
    }

})();

/**=========================================================
 * Module: demo-panels.js
 * Provides a simple demo for panel actions
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .controller('PanelsCtrl', PanelsCtrl);

    PanelsCtrl.$inject = ['$scope', '$timeout'];
    function PanelsCtrl($scope, $timeout) {

        activate();

        ////////////////

        function activate() {

          // PANEL COLLAPSE EVENTS
          // ----------------------------------- 

          // We can use panel id name for the boolean flag to [un]collapse the panel
          $scope.$watch('panelDemo1',function(newVal){
              
              console.log('panelDemo1 collapsed: ' + newVal);

          });


          // PANEL DISMISS EVENTS
          // ----------------------------------- 

          // Before remove panel
          $scope.$on('panel-remove', function(event, id, deferred){
            
            console.log('Panel #' + id + ' removing');
            
            // Here is obligatory to call the resolve() if we pretend to remove the panel finally
            // Not calling resolve() will NOT remove the panel
            // It's up to your app to decide if panel should be removed or not
            deferred.resolve();
          
          });

          // Panel removed ( only if above was resolved() )
          $scope.$on('panel-removed', function(event, id){

            console.log('Panel #' + id + ' removed');

          });


          // PANEL REFRESH EVENTS
          // ----------------------------------- 

          $scope.$on('panel-refresh', function(event, id) {
            var secs = 3;
            
            console.log('Refreshing during ' + secs +'s #'+id);

            $timeout(function(){
              // directive listen for to remove the spinner 
              // after we end up to perform own operations
              $scope.$broadcast('removeSpinner', id);
              
              console.log('Refreshed #' + id);

            }, 3000);

          });

          // PANELS VIA NG-REPEAT
          // ----------------------------------- 

          $scope.panels = [
            {
              id: 'panelRepeat1',
              title: 'Panel Title 1',
              body: 'Nulla eget lorem leo, sit amet elementum lorem. '
            },
            {
              id: 'panelRepeat2',
              title: 'Panel Title 2',
              body: 'Nulla eget lorem leo, sit amet elementum lorem. '
            },
            {
              id: 'panelRepeat3',
              title: 'Panel Title 3',
              body: 'Nulla eget lorem leo, sit amet elementum lorem. '
            }
          ];
        }

    } //PanelsCtrl

})();


/**=========================================================
 * Drag and drop any panel based on jQueryUI portlets
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.panels')
        .directive('portlet', portlet);

    portlet.$inject = ['$timeout', '$localStorage'];
    function portlet ($timeout, $localStorage) {
      var storageKeyName = 'portletState';

      return {
        restrict: 'A',
        link: link
      };

      /////////////

      function link(scope, element) {
          
        // not compatible with jquery sortable
        if(!$.fn.sortable) return;

        element.sortable({
          connectWith:          '[portlet]', // same like directive 
          items:                'div.panel',
          handle:               '.portlet-handler',
          opacity:              0.7,
          placeholder:          'portlet box-placeholder',
          cancel:               '.portlet-cancel',
          forcePlaceholderSize: true,
          iframeFix:            false,
          tolerance:            'pointer',
          helper:               'original',
          revert:               200,
          forceHelperSize:      true,
          update:               savePortletOrder,
          create:               loadPortletOrder
        });

      }


      function savePortletOrder(event/*, ui*/) {
        var self = event.target;
        var data = angular.fromJson($localStorage[storageKeyName]);
        
        if(!data) { data = {}; }

        data[self.id] = $(self).sortable('toArray');

        if(data) {
          $timeout(function() {
            $localStorage[storageKeyName] = angular.toJson(data);
          });
        }
      }

      function loadPortletOrder(event) {
        var self = event.target;
        var data = angular.fromJson($localStorage[storageKeyName]);

        if(data) {
          
          var porletId = self.id,
              panels   = data[porletId];

          if(panels) {
            var portlet = $('#'+porletId);
            
            $.each(panels, function(index, value) {
               $('#'+value).appendTo(portlet);
            });
          }

        }
      }

    }

})();
 
(function() {
    'use strict';

    angular
        .module('app.preloader')
        .directive('preloader', preloader);

    preloader.$inject = ['$animate', '$timeout', '$q'];
    function preloader ($animate, $timeout, $q) {

        var directive = {
            restrict: 'EAC',
            template: 
              '<div class="preloader-progress">' +
                  '<div class="preloader-progress-bar" ' +
                       'ng-style="{width: loadCounter + \'%\'}"></div>' +
              '</div>'
            ,
            link: link
        };
        return directive;

        ///////

        function link(scope, el) {

          scope.loadCounter = 0;

          var counter  = 0,
              timeout;

          // disables scrollbar
          angular.element('body').css('overflow', 'hidden');
          // ensure class is present for styling
          el.addClass('preloader');

          appReady().then(endCounter);

          timeout = $timeout(startCounter);

          ///////

          function startCounter() {

            var remaining = 100 - counter;
            counter = counter + (0.015 * Math.pow(1 - Math.sqrt(remaining), 2));

            scope.loadCounter = parseInt(counter, 10);

            timeout = $timeout(startCounter, 20);
          }

          function endCounter() {

            $timeout.cancel(timeout);

            scope.loadCounter = 100;

            $timeout(function(){
              // animate preloader hiding
              $animate.addClass(el, 'preloader-hidden');
              // retore scrollbar
              angular.element('body').css('overflow', '');
            }, 300);
          }

          function appReady() {
            var deferred = $q.defer();
            var viewsLoaded = 0;
            // if this doesn't sync with the real app ready
            // a custom event must be used instead
            var off = scope.$on('$viewContentLoaded', function () {
              viewsLoaded ++;
              // we know there are at least two views to be loaded 
              // before the app is ready (1-index.html 2-app*.html)
              if ( viewsLoaded === 2) {
                // with resolve this fires only once
                $timeout(function(){
                  deferred.resolve();
                }, 3000);

                off();
              }

            });

            return deferred.promise;
          }

        } //link
    }

})();
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;

    RouteHelpersProvider.$inject = ['APP_REQUIRES'];
    function RouteHelpersProvider(APP_REQUIRES) {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        resolveFor: resolveFor,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
            resolveFor: resolveFor
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'app/views/' + uri;
      }

      // Generates a resolve object by passing script names
      // previously configured in constant.APP_REQUIRES
      function resolveFor() {
        var _args = arguments;
        return {
          deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
            // Creates a promise chain for each argument
            var promise = $q.when(1); // empty promise
            for(var i=0, len=_args.length; i < len; i ++){
              promise = andThen(_args[i]);
            }
            return promise;

            // creates promise to chain dynamically
            function andThen(_arg) {
              // also support a function that returns a promise
              if(typeof _arg === 'function')
                  return promise.then(_arg);
              else
                  return promise.then(function() {
                    // if is a module, pass the name. If not, pass the array
                    var whatToLoad = getRequired(_arg);
                    // simple error check
                    if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                    // finally, return a promise
                    return $ocLL.load( whatToLoad );
                  });
            }
            // check and returns required data
            // analyze module items with the form [name: '', files: []]
            // and also simple array of script files (for not angular js)
            function getRequired(name) {
              if (APP_REQUIRES.modules)
                  for(var m in APP_REQUIRES.modules)
                      if(APP_REQUIRES.modules[m].name && APP_REQUIRES.modules[m].name === name)
                          return APP_REQUIRES.modules[m];
              return APP_REQUIRES.scripts && APP_REQUIRES.scripts[name];
            }

          }]};
      } // resolveFor

    }


})();


/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config([ '$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('securityInterceptor');
        }])
        .provider('securityInterceptor', function() {
            this.$get = ["$location", "$q", function($location, $q) {
                return function(promise) {
                    return promise.then(null, function(response) {
                        if(response.status === 403 || response.status === 401) {
                            $location.path('/unauthorized');
                        }
                        return $q.reject(response);
                    });
                };
            }];
        })
        .config(routesConfig);



    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/page/login');

        //$urlRouterProvider.deferIntercept();

        //// Use instead
        //$urlRouterProvider.otherwise( function($injector) {
        //    var $state = $injector.get("$state");
        //    $state.go('/page/login');
        //});

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('privacy', {
                url: '/app/privacy',
                cache: false,
                templateUrl: 'app/pages/privacy.html',
                resolve: helper.resolveFor('loaders.css', 'spinkit', 'whirl', 'modernizr', 'icons'),
                controller: ['$rootScope', function($rootScope) {
                    $rootScope.app.layout.isBoxed = false;
                }]
            })
            .state('page', {
                url: '/page',
                data:{
                    authenticate:false
                },
                cache: false,
                templateUrl: 'app/pages/page.html',
                resolve: helper.resolveFor('loaders.css', 'spinkit', 'whirl', 'modernizr', 'icons'),
                controller: ['$rootScope', function($rootScope) {
                    $rootScope.app.layout.isBoxed = false;
                }]
            })
            .state('page.login', {
                url: '/login',
                title: 'Login',
                cache: false,
                templateUrl: 'app/pages/login.html',
                resolve: angular.extend(helper.resolveFor('loaders.css', 'spinkit', 'whirl'), {
                    '_token' : ['tokenService', function(tokenService) {
                        return tokenService.get();
                    }]
                }),
                controller: 'LoginFormController'
            })
            .state('page.register', {
                url: '/register',
                title: 'Register',
                cache: false,
                resolve: angular.extend(helper.resolveFor('loaders.css', 'spinkit', 'whirl'), {
                    '_token' : ['tokenService', function(tokenService) {
                        return tokenService.get();
                    }]
                }),
                templateUrl: 'app/pages/register.html'
            })
            .state('page.recover', {
                url: '/recover',
                title: 'Recover',
                cache: false,
                templateUrl: 'app/pages/recover.html'
            })
            .state('page.change', {
                url: '/recover/change?{e}&{m}',
                title: 'Change',
                cache: false,
                templateUrl: 'app/pages/recover-change.html'
            })
            .state('app', {
                url: '/app',
                abstract: true,
                cache: false,
                data:{
                    authenticate:true
                },
                templateUrl: helper.basepath('app.html'),
                resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl', 'oitozero.ngSweetAlert')
            })
            .state('app.dashboard', {
                url: '/dashboard',
                title: 'Dashboard',
                cache: false,
                templateUrl: helper.basepath('dashboard.html'),
                controller: 'DashboardController',
                resolve: angular.extend(helper.resolveFor('angularFileUpload', 'filestyle'), {
                    '_token' : ['tokenService', function(tokenService) {
                        return tokenService.get();
                    }]
                })
            })
            //.state('app.dashboard.profile', {
            //    url: '/profile',
            //    cache: false,
            //    templateUrl: 'app/template/profile.tpl.html',
            //    controller: 'DashboardController',
            //    resolve: helper.resolveFor('angularFileUpload', 'filestyle'),
            //})
            .state('app.dashboard.update', {
                url: '/profile/update',
                cache: false,
                templateUrl: 'app/template/profile-update.tpl.html',
                controller: 'DashboardController',
                resolve: helper.resolveFor('angularFileUpload', 'filestyle')

            })
            .state('app.dashboard.permissions', {
                url: '/permissions',
                cache: false,
                templateUrl: 'app/template/permissions.tpl.html',
                controller: 'DashboardController'
            })
            .state('app.mail', {
                url: '/mail',
                title: 'Mail',
                cache: false,
                templateUrl: helper.basepath('mail.html'),
                resolve: helper.resolveFor('ngWig', 'ui.select'),
                controller: 'MailController'
            })
            .state('app.sms', {
                url: '/sms',
                title: 'Sms',
                cache: false,
                templateUrl: helper.basepath('sms.html')
            })
            .state('app.people', {
                url: '/people',
                title: 'People',
                data: {
                    permissions: {
                        only: 'view.verified.staff',
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                templateUrl: helper.basepath('people.html'),
                controller: 'PeopleController'
            })
            .state('app.people.adduser', {
                url: '/create',
                data: {
                    permissions: {
                        only: 'register.staff',
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                title: 'People',
                templateUrl: helper.basepath('people-adduser.html')
            })
            .state('app.people.edit', {
                url: '/:id/edit',
                title: 'People',
                data: {
                    permissions: {
                        only: 'register.staff',
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                templateUrl: helper.basepath('people-adduser.html'),
                controller: 'PeopleUpdateController',
                resolve: helper.resolveFor('whirl')
            })
            .state('app.roles', {
                url: '/roles',
                title: 'Permissions',
                cache: false,
                resolve: helper.resolveFor('modernizr', 'icons', 'toaster'),
                templateUrl: helper.basepath('roles.html')
            })
            .state('app.airtime', {
                url: '/airtime',
                title: 'Airtime',
                cache: false,
                templateUrl: helper.basepath('airtime.html'),
                resolve: angular.extend(helper.resolveFor('loaders.css', 'spinkit', 'whirl', 'datatables','parsley', 'ui.select', 'oitozero.ngSweetAlert', 'ngDialog', 'ngTable', 'ngTableExport', 'moment', 'localytics.directives', 'ui.bootstrap-slider')),
                //controller: 'AirtimeDefaultController'
            })
            .state('app.airtime.create', {
                url: '/create',
                data: {
                    permissions: {
                        only: ['generate.airtime', 'admin'],
                        redirectTo: 'app.unauthorized'
                    }
                },
                title: 'Generate Airtime',
                cache: false,
                templateUrl: helper.basepath('airtime-create.html'),
                controller: 'AirtimeCreateController',
                resolve: helper.resolveFor('parsley', 'ui.select', 'taginput','inputmask','localytics.directives')

            })
            .state('app.airtime.details', {
                url: '/:id',
                title: 'Airtime',
                cache: false,
                templateUrl: helper.basepath('airtime-details.html'),
                controller: 'AirtimeDetailController'
            })
            .state('app.client', {
                url: '/client',
                title: 'Client',
                cache: false,
                templateUrl: helper.basepath('client.html'),
                resolve: helper.resolveFor('datatables')
            })
            .state('app.client.create', {
                url: '/create',
                cache: false,
                title: 'Register Client',
                views: {
                    '@app': {
                        resolve: helper.resolveFor('whirl'),
                        templateUrl: helper.basepath('client-create.html')
                    }
                }
            })
            .state('app.client.edit', {
                url: '/:id/edit',
                title: 'Update Client',
                cache: false,
                views: {
                    '@app' : {
                        templateUrl: helper.basepath('client-create.html'),
                        resolve: angular.extend({
                            clientUpdate: function () {
                                return true;
                            }
                        })
                    }
                }
            })
            .state('app.report', {
                url: '/report',
                title: 'Report',
                data: {
                    permissions: {
                        only: 'generate.report',
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                templateUrl: helper.basepath('report.html'),
                controller: 'ReportController',
                resolve: helper.resolveFor('colorpicker.module', 'ui.select', 'codemirror', 'moment', 'taginput','inputmask','localytics.directives', 'ui.bootstrap-slider', 'ngWig', 'filestyle', 'textAngular')
            })
            .state('app.target', {
                url: '/target',
                title: 'Target',
                data: {
                    permissions: {
                        only: 'manage.target',
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                templateUrl: helper.basepath('target.html'),
                controller: 'TargetController',
                resolve: angular.extend(helper.resolveFor('datatables', 'ui.select'), {
                    '_token' : ['tokenService', function(tokenService) {
                        return tokenService.get();
                    }]
                })
            })
            .state('app.vehicles', {
                url: '/vehicles',
                title: 'Vehicles',
                data: {
                    permissions: {
                        only: 'manage.vehicle',
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                templateUrl: helper.basepath('vehicle.html'),
                controller: 'VehicleController',
                resolve: angular.extend(helper.resolveFor('datatables'), {
                    '_token' : ['tokenService', function(tokenService) {
                        return tokenService.get();
                    }]
                })
            })

            .state('app.unauthorized', {
                url: '/unauthorized',
                title: 'unauthorized',
                cache: false,
                templateUrl: helper.basepath('unauthorized.html')
            })
            .state('app.driver', {
                url: '/driver',
                title: 'Driver\'s Report',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables', 'ui.select', 'textAngular')),
                templateUrl: helper.basepath('driver.html'),
                controller: 'DriverController'
            })
            .state('app.driver.editReport', {
                url: '/report/:id/edit',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                templateUrl: helper.basepath('driver-addreport.html'),
                controller: 'DriverController'
            })
            .state('app.driver.addReport', {
                url: '/report/add',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                templateUrl: helper.basepath('driver-addreport.html'),
                controller: 'DriverController'
            })
            .state('app.driver.viewReport', {
                url: '/report/view',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                templateUrl: helper.basepath('driver-viewreport.html'),
                controller: 'DriverReportViewCtrl'
            })
            .state('app.assessment', {
                url: '/assessment',
                abstract: true,
                cache: false,
                templateUrl: helper.basepath('assessment.html'),
                resolve: angular.extend(helper.resolveFor('datatables'))
            })
            .state('app.assessment.create', {
                url: '/create',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables', 'whirl')),
                templateUrl: helper.basepath('assessment-form.html'),
                controller: 'AssessmentController'
            })
            .state('app.assessment.edit', {
                url: '/:id/edit',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                templateUrl: helper.basepath('assessment-form.html'),
                controller: 'AssessmentController'
            })
            .state('app.assessment.view', {
                url: '/view',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                templateUrl: helper.basepath('assessment-record.html'),
                controller: 'AssessmentRecordController'
            })
            .state('app.assessment.supervise', {
                url: '^/supervisor/:id',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                templateUrl: helper.basepath('assessment-supervisor.html'),
                controller: 'SupervisorController'
            })
            .state('app.assessment.log', {
                url: '/record/:id',
                cache: false,
                views: {
                    '@app': {
                        resolve: angular.extend(helper.resolveFor('datatables')),
                        templateUrl: helper.basepath('assessment-log.html'),
                        controller: 'AssessmentLogController'
                    }
                }
            })
            .state('app.assessment.config', {
                url: '/settings',
                cache: false,
                views: {
                    '@app': {
                        resolve: angular.extend(helper.resolveFor('datatables')),
                        templateUrl: helper.basepath('assessment-config.html'),
                        controller: 'AssessmentConfigController'
                    }
                }
            })
            //.state('app', {
          //    url: '/app',
          //    abstract: true,
          //    templateUrl: helper.basepath('app.html'),
          //    resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
          //})
          //.state('app.dashboard', {
          //    url: '/dashboard',
          //    title: 'Dashboard',
          //    templateUrl: helper.basepath('dashboard.html'),
          //    resolve: helper.resolveFor('flot-chart','flot-chart-plugins', 'weather-icons')
          //})
          //.state('app.dashboard_v2', {
          //    url: '/dashboard_v2',
          //    title: 'Dashboard v2',
          //    templateUrl: helper.basepath('dashboard_v2.html'),
          //    controller: 'DashboardV2Controller',
          //    controllerAs: 'dash2',
          //    resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
          //})
          //.state('app.dashboard_v3', {
          //    url: '/dashboard_v3',
          //    title: 'Dashboard v3',
          //    controller: 'DashboardV3Controller',
          //    controllerAs: 'dash3',
          //    templateUrl: helper.basepath('dashboard_v3.html'),
          //    resolve: helper.resolveFor('flot-chart','flot-chart-plugins', 'vector-map', 'vector-map-maps')
          //})
          //.state('app.widgets', {
          //    url: '/widgets',
          //    title: 'Widgets',
          //    templateUrl: helper.basepath('widgets.html'),
          //    resolve: helper.resolveFor('loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'ui.map')
          //})
          //.state('app.buttons', {
          //    url: '/buttons',
          //    title: 'Buttons',
          //    templateUrl: helper.basepath('buttons.html')
          //})
          //.state('app.colors', {
          //    url: '/colors',
          //    title: 'Colors',
          //    templateUrl: helper.basepath('colors.html')
          //})
          //.state('app.localization', {
          //    url: '/localization',
          //    title: 'Localization',
          //    templateUrl: helper.basepath('localization.html')
          //})
          //.state('app.infinite-scroll', {
          //    url: '/infinite-scroll',
          //    title: 'Infinite Scroll',
          //    templateUrl: helper.basepath('infinite-scroll.html'),
          //    resolve: helper.resolveFor('infinite-scroll')
          //})
          //.state('app.navtree', {
          //    url: '/navtree',
          //    title: 'Nav Tree',
          //    templateUrl: helper.basepath('nav-tree.html'),
          //    resolve: helper.resolveFor('angularBootstrapNavTree')
          //})
          //.state('app.nestable', {
          //    url: '/nestable',
          //    title: 'Nestable',
          //    templateUrl: helper.basepath('nestable.html'),
          //    resolve: helper.resolveFor('ng-nestable')
          //})
          //.state('app.sortable', {
          //    url: '/sortable',
          //    title: 'Sortable',
          //    templateUrl: helper.basepath('sortable.html'),
          //    resolve: helper.resolveFor('htmlSortable')
          //})
          //.state('app.notifications', {
          //    url: '/notifications',
          //    title: 'Notifications',
          //    templateUrl: helper.basepath('notifications.html')
          //})
          //.state('app.carousel', {
          //    url: '/carousel',
          //    title: 'Carousel',
          //    templateUrl: helper.basepath('carousel.html'),
          //    resolve: helper.resolveFor('angular-carousel')
          //})
          //.state('app.ngdialog', {
          //    url: '/ngdialog',
          //    title: 'ngDialog',
          //    templateUrl: helper.basepath('ngdialog.html'),
          //    resolve: angular.extend(helper.resolveFor('ngDialog'),{
          //      tpl: function() { return { path: helper.basepath('ngdialog-template.html') }; }
          //    }),
          //    controller: 'DialogIntroCtrl'
          //})
          //.state('app.sweetalert', {
          //  url: '/sweetalert',
          //  title: 'SweetAlert',
          //  templateUrl: helper.basepath('sweetalert.html'),
          //  resolve: helper.resolveFor('oitozero.ngSweetAlert')
          //})
          //.state('app.tour', {
          //  url: '/tour',
          //  title: 'Tour',
          //  templateUrl: helper.basepath('tour.html'),
          //  resolve: helper.resolveFor('bm.bsTour')
          //})
          //.state('app.interaction', {
          //    url: '/interaction',
          //    title: 'Interaction',
          //    templateUrl: helper.basepath('interaction.html')
          //})
          //.state('app.spinners', {
          //    url: '/spinners',
          //    title: 'Spinners',
          //    templateUrl: helper.basepath('spinners.html'),
          //    resolve: helper.resolveFor('loaders.css', 'spinkit')
          //})
          //.state('app.dropdown-animations', {
          //    url: '/dropdown-animations',
          //    title: 'Dropdown Animations',
          //    templateUrl: helper.basepath('dropdown-animations.html')
          //})
          //.state('app.panels', {
          //    url: '/panels',
          //    title: 'Panels',
          //    templateUrl: helper.basepath('panels.html')
          //})
          //.state('app.portlets', {
          //    url: '/portlets',
          //    title: 'Portlets',
          //    templateUrl: helper.basepath('portlets.html'),
          //    resolve: helper.resolveFor('jquery-ui', 'jquery-ui-widgets')
          //})
          //.state('app.maps-google', {
          //    url: '/maps-google',
          //    title: 'Maps Google',
          //    templateUrl: helper.basepath('maps-google.html'),
          //    resolve: helper.resolveFor('loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'ui.map')
          //})
          //.state('app.maps-vector', {
          //    url: '/maps-vector',
          //    title: 'Maps Vector',
          //    templateUrl: helper.basepath('maps-vector.html'),
          //    controller: 'VectorMapController',
          //    controllerAs: 'vmap',
          //    resolve: helper.resolveFor('vector-map', 'vector-map-maps')
          //})
          //.state('app.grid', {
          //    url: '/grid',
          //    title: 'Grid',
          //    templateUrl: helper.basepath('grid.html')
          //})
          //.state('app.grid-masonry', {
          //    url: '/grid-masonry',
          //    title: 'Grid Masonry',
          //    templateUrl: helper.basepath('grid-masonry.html')
          //})
          //.state('app.grid-masonry-deck', {
          //    url: '/grid-masonry-deck',
          //    title: 'Grid Masonry',
          //    templateUrl: helper.basepath('grid-masonry-deck.html'),
          //    resolve: helper.resolveFor('spinkit', 'akoenig.deckgrid')
          //})
          //.state('app.typo', {
          //    url: '/typo',
          //    title: 'Typo',
          //    templateUrl: helper.basepath('typo.html')
          //})
          //.state('app.icons-font', {
          //    url: '/icons-font',
          //    title: 'Icons Font',
          //    templateUrl: helper.basepath('icons-font.html'),
          //    resolve: helper.resolveFor('icons')
          //})
          //.state('app.icons-weather', {
          //    url: '/icons-weather',
          //    title: 'Icons Weather',
          //    templateUrl: helper.basepath('icons-weather.html'),
          //    resolve: helper.resolveFor('weather-icons', 'skycons')
          //})
          //.state('app.form-standard', {
          //    url: '/form-standard',
          //    title: 'Form Standard',
          //    templateUrl: helper.basepath('form-standard.html')
          //})
          //.state('app.form-extended', {
          //    url: '/form-extended',
          //    title: 'Form Extended',
          //    templateUrl: helper.basepath('form-extended.html'),
          //    resolve: helper.resolveFor('colorpicker.module', 'codemirror', 'moment', 'taginput','inputmask','localytics.directives', 'ui.bootstrap-slider', 'ngWig', 'filestyle', 'textAngular')
          //})
          //.state('app.form-validation', {
          //    url: '/form-validation',
          //    title: 'Form Validation',
          //    templateUrl: helper.basepath('form-validation.html'),
          //    resolve: helper.resolveFor('ui.select', 'taginput','inputmask','localytics.directives')
          //})
          //.state('app.form-parsley', {
          //    url: '/form-parsley',
          //    title: 'Form Validation - Parsley',
          //    templateUrl: helper.basepath('form-parsley.html'),
          //    resolve: helper.resolveFor('parsley')
          //})
          //.state('app.form-wizard', {
          //    url: '/form-wizard',
          //    title: 'Form Wizard',
          //    templateUrl: helper.basepath('form-wizard.html'),
          //    resolve: helper.resolveFor('parsley')
          //})
          //.state('app.form-upload', {
          //    url: '/form-upload',
          //    title: 'Form upload',
          //    templateUrl: helper.basepath('form-upload.html'),
          //    resolve: helper.resolveFor('angularFileUpload', 'filestyle')
          //})
          //.state('app.form-xeditable', {
          //    url: '/form-xeditable',
          //    templateUrl: helper.basepath('form-xeditable.html'),
          //    resolve: helper.resolveFor('xeditable')
          //})
          //.state('app.form-imagecrop', {
          //    url: '/form-imagecrop',
          //    templateUrl: helper.basepath('form-imagecrop.html'),
          //    resolve: helper.resolveFor('ngImgCrop', 'filestyle')
          //})
          //.state('app.form-uiselect', {
          //    url: '/form-uiselect',
          //    templateUrl: helper.basepath('form-uiselect.html'),
          //    controller: 'uiSelectController',
          //    controllerAs: 'uisel',
          //    resolve: helper.resolveFor('ui.select')
          //})
          //.state('app.chart-flot', {
          //    url: '/chart-flot',
          //    title: 'Chart Flot',
          //    templateUrl: helper.basepath('chart-flot.html'),
          //    resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
          //})
          //.state('app.chart-radial', {
          //    url: '/chart-radial',
          //    title: 'Chart Radial',
          //    templateUrl: helper.basepath('chart-radial.html'),
          //    resolve: helper.resolveFor('classyloader', 'ui.knob', 'easypiechart')
          //})
          //.state('app.chart-js', {
          //    url: '/chart-js',
          //    title: 'Chart JS',
          //    templateUrl: helper.basepath('chart-js.html'),
          //    resolve: helper.resolveFor('chartjs')
          //})
          //.state('app.chart-rickshaw', {
          //    url: '/chart-rickshaw',
          //    title: 'Chart Rickshaw',
          //    templateUrl: helper.basepath('chart-rickshaw.html'),
          //    resolve: helper.resolveFor('angular-rickshaw')
          //})
          //.state('app.chart-morris', {
          //    url: '/chart-morris',
          //    title: 'Chart Morris',
          //    templateUrl: helper.basepath('chart-morris.html'),
          //    resolve: helper.resolveFor('morris')
          //})
          //.state('app.chart-chartist', {
          //    url: '/chart-chartist',
          //    title: 'Chart Chartist',
          //    templateUrl: helper.basepath('chart-chartist.html'),
          //    resolve: helper.resolveFor('angular-chartist')
          //})
          //.state('app.table-standard', {
          //    url: '/table-standard',
          //    title: 'Table Standard',
          //    templateUrl: helper.basepath('table-standard.html')
          //})
          //.state('app.table-extended', {
          //    url: '/table-extended',
          //    title: 'Table Extended',
          //    templateUrl: helper.basepath('table-extended.html')
          //})
          //.state('app.table-datatable', {
          //    url: '/table-datatable',
          //    title: 'Table Datatable',
          //    templateUrl: helper.basepath('table-datatable.html'),
          //    resolve: helper.resolveFor('datatables')
          //})
          //.state('app.table-xeditable', {
          //    url: '/table-xeditable',
          //    templateUrl: helper.basepath('table-xeditable.html'),
          //    resolve: helper.resolveFor('xeditable')
          //})
          //.state('app.table-ngtable', {
          //    url: '/table-ngtable',
          //    templateUrl: helper.basepath('table-ngtable.html'),
          //    resolve: helper.resolveFor('ngTable', 'ngTableExport')
          //})
          //.state('app.table-uigrid', {
          //    url: '/table-uigrid',
          //    templateUrl: helper.basepath('table-uigrid.html'),
          //    resolve: helper.resolveFor('ui.grid')
          //})
          //.state('app.table-angulargrid', {
          //    url: '/table-angulargrid',
          //    templateUrl: helper.basepath('table-angulargrid.html'),
          //    resolve: helper.resolveFor('angularGrid')
          //})
          //.state('app.timeline', {
          //    url: '/timeline',
          //    title: 'Timeline',
          //    templateUrl: helper.basepath('timeline.html')
          //})
          //.state('app.calendar', {
          //    url: '/calendar',
          //    title: 'Calendar',
          //    templateUrl: helper.basepath('calendar.html'),
          //    resolve: helper.resolveFor('jquery-ui', 'jquery-ui-widgets', 'moment', 'fullcalendar')
          //})
          //.state('app.invoice', {
          //    url: '/invoice',
          //    title: 'Invoice',
          //    templateUrl: helper.basepath('invoice.html')
          //})
          //.state('app.search', {
          //    url: '/search',
          //    title: 'Search',
          //    templateUrl: helper.basepath('search.html'),
          //    resolve: helper.resolveFor('moment', 'localytics.directives', 'ui.bootstrap-slider')
          //})
          //.state('app.todo', {
          //    url: '/todo',
          //    title: 'Todo List',
          //    templateUrl: helper.basepath('todo.html'),
          //    controller: 'TodoController',
          //    controllerAs: 'todo'
          //})
          //.state('app.profile', {
          //    url: '/profile',
          //    title: 'Profile',
          //    templateUrl: helper.basepath('profile.html'),
          //    resolve: helper.resolveFor('loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'ui.map')
          //})
          //.state('app.code-editor', {
          //    url: '/code-editor',
          //    templateUrl: helper.basepath('code-editor.html'),
          //    controller: 'CodeEditorController',
          //    controllerAs: 'coder',
          //    resolve: {
          //        deps: helper.resolveFor('codemirror', 'ui.codemirror', 'codemirror-modes-web', 'angularBootstrapNavTree').deps,
          //        filetree: ['LoadTreeService', function (LoadTreeService) {
          //            return LoadTreeService.get().$promise.then(function (res) {
          //                return res.data;
          //            });
          //        }]
          //    }
          //})
          //.state('app.template', {
          //    url: '/template',
          //    title: 'Blank Template',
          //    templateUrl: helper.basepath('template.html')
          //})
          //.state('app.documentation', {
          //    url: '/documentation',
          //    title: 'Documentation',
          //    templateUrl: helper.basepath('documentation.html'),
          //    resolve: helper.resolveFor('flatdoc')
          //})
          //// Forum
          //// -----------------------------------
          //.state('app.forum', {
          //    url: '/forum',
          //    title: 'Forum',
          //    templateUrl: helper.basepath('forum.html')
          //})
          //.state('app.forum-topics', {
          //    url: '/forum/topics/:catid',
          //    title: 'Forum Topics',
          //    templateUrl: helper.basepath('forum-topics.html')
          //})
          //.state('app.forum-discussion', {
          //    url: '/forum/discussion/:topid',
          //    title: 'Forum Discussion',
          //    templateUrl: helper.basepath('forum-discussion.html')
          //})
          //// Blog
          //// -----------------------------------
          //.state('app.blog', {
          //    url: '/blog',
          //    title: 'Blog',
          //    templateUrl: helper.basepath('blog.html'),
          //    resolve: helper.resolveFor('angular-jqcloud')
          //})
          //.state('app.blog-post', {
          //    url: '/post',
          //    title: 'Post',
          //    templateUrl: helper.basepath('blog-post.html'),
          //    resolve: helper.resolveFor('angular-jqcloud')
          //})
          //.state('app.articles', {
          //    url: '/articles',
          //    title: 'Articles',
          //    templateUrl: helper.basepath('blog-articles.html'),
          //    resolve: helper.resolveFor('datatables')
          //})
          //.state('app.article-view', {
          //    url: '/article/:id',
          //    title: 'Article View',
          //    templateUrl: helper.basepath('blog-article-view.html'),
          //    resolve: helper.resolveFor('ui.select', 'textAngular')
          //})
          //// eCommerce
          //// -----------------------------------
          //.state('app.orders', {
          //    url: '/orders',
          //    title: 'Orders',
          //    templateUrl: helper.basepath('ecommerce-orders.html'),
          //    resolve: helper.resolveFor('datatables')
          //})
          //.state('app.order-view', {
          //    url: '/order-view',
          //    title: 'Order View',
          //    templateUrl: helper.basepath('ecommerce-order-view.html')
          //})
          //.state('app.products', {
          //    url: '/products',
          //    title: 'Products',
          //    templateUrl: helper.basepath('ecommerce-products.html'),
          //    resolve: helper.resolveFor('datatables')
          //})
          //.state('app.product-view', {
          //    url: '/product/:id',
          //    title: 'Product View',
          //    templateUrl: helper.basepath('ecommerce-product-view.html')
          //})
          //// Mailbox
          //// -----------------------------------
          //.state('app.mailbox', {
          //    url: '/mailbox',
          //    title: 'Mailbox',
          //    abstract: true,
          //    templateUrl: helper.basepath('mailbox.html')
          //})
          //.state('app.mailbox.folder', {
          //    url: '/folder/:folder',
          //    title: 'Mailbox',
          //    templateUrl: helper.basepath('mailbox-inbox.html')
          //})
          //.state('app.mailbox.view', {
          //    url : '/{mid:[0-9]{1,4}}',
          //    title: 'View mail',
          //    templateUrl: helper.basepath('mailbox-view.html'),
          //    resolve: helper.resolveFor('ngWig')
          //})
          //.state('app.mailbox.compose', {
          //    url: '/compose',
          //    title: 'Mailbox',
          //    templateUrl: helper.basepath('mailbox-compose.html'),
          //    resolve: helper.resolveFor('ngWig')
          //})
          ////
          //// Multiple level example
          //// -----------------------------------
          //.state('app.multilevel', {
          //    url: '/multilevel',
          //    title: 'Multilevel',
          //    template: '<h3>Multilevel Views</h3>' + '<div class="lead ba p">View @ Top Level ' + '<div ui-view=""></div> </div>'
          //})
          //.state('app.multilevel.level1', {
          //    url: '/level1',
          //    title: 'Multilevel - Level1',
          //    template: '<div class="lead ba p">View @ Level 1' + '<div ui-view=""></div> </div>'
          //})
          //.state('app.multilevel.level1.item', {
          //    url: '/item',
          //    title: 'Multilevel - Level1',
          //    template: '<div class="lead ba p"> Menu item @ Level 1</div>'
          //})
          //.state('app.multilevel.level1.level2', {
          //    url: '/level2',
          //    title: 'Multilevel - Level2',
          //    template: '<div class="lead ba p">View @ Level 2'  + '<div ui-view=""></div> </div>'
          //})
          //.state('app.multilevel.level1.level2.level3', {
          //    url: '/level3',
          //    title: 'Multilevel - Level3',
          //    template: '<div class="lead ba p">View @ Level 3' + '<div ui-view=""></div> </div>'
          //})
          //.state('app.multilevel.level1.level2.level3.item', {
          //    url: '/item',
          //    title: 'Multilevel - Level3 Item',
          //    template: '<div class="lead ba p"> Menu item @ Level 3</div>'
          //})
          ////
          //// Single Page Routes
          //// -----------------------------------
          //.state('page', {
          //    url: '/page',
          //    templateUrl: 'app/pages/page.html',
          //    resolve: helper.resolveFor('modernizr', 'icons'),
          //    controller: ['$rootScope', function($rootScope) {
          //        $rootScope.app.layout.isBoxed = false;
          //    }]
          //})
          //.state('page.login', {
          //    url: '/login',
          //    title: 'Login',
          //    templateUrl: 'app/pages/login.html'
          //})
          //.state('page.register', {
          //    url: '/register',
          //    title: 'Register',
          //    templateUrl: 'app/pages/register.html'
          //})
          //.state('page.recover', {
          //    url: '/recover',
          //    title: 'Recover',
          //    templateUrl: 'app/pages/recover.html'
          //})
          //.state('page.lock', {
          //    url: '/lock',
          //    title: 'Lock',
          //    templateUrl: 'app/pages/lock.html'
          //})
          //.state('page.404', {
          //    url: '/404',
          //    title: 'Not Found',
          //    templateUrl: 'app/pages/404.html'
          //})
          ////
          //// Horizontal layout
          //// -----------------------------------
          //.state('app-h', {
          //    url: '/app-h',
          //    abstract: true,
          //    templateUrl: helper.basepath( 'app-h.html' ),
          //    resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
          //})
          //.state('app-h.dashboard_v2', {
          //    url: '/dashboard_v2',
          //    title: 'Dashboard v2',
          //    templateUrl: helper.basepath('dashboard_v2.html'),
          //    controller: 'DashboardV2Controller',
          //    controllerAs: 'dash2',
          //    resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
          //})
          //
          // CUSTOM RESOLVES
          //   Add your own resolves properties
          //   following this object extend
          //   method
          // -----------------------------------
          // .state('app.someroute', {
          //   url: '/some_url',
          //   templateUrl: 'path_to_template.html',
          //   controller: 'someController',
          //   resolve: angular.extend(
          //     helper.resolveFor(), {
          //     // YOUR RESOLVES GO HERE
          //     }
          //   )
          // })
          ;

    } // routesConfig

})();


/**
 * Created by dfash on 6/10/16.
 */

(function() {
    'use strict';

    angular
        .module('app.routes')
        .run(['$rootScope', '$state', 'loginFactory', '$location',
            function ($rootScope, $state, loginFactory, $location) {


                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                    //if toState requires authenticate and user is not logged in
                    if (toState.data.authenticate) {

                        //if user is not logged in
                        if(!loginFactory.getUserStatus()) {

                            //save anticipated state
                            loginFactory.toState = toState;

                            $state.transitionTo('page.login');
                            event.preventDefault();
                        }

                        //handle when user refreshes unauthorized page
                        if(toState.name == 'app.unauthorized' && fromState.name == '') {
                            $state.go('app.dashboard');
                        }

                    }

                    //if toState is 'page.login' And user is already logged in
                    if (toState.name == 'page.login' && loginFactory.getUserStatus()) {

                        if (fromState.name != '') {
                            $state.go(fromState.name);//return state
                        }
                        else {
                            $state.go('app.dashboard');//go to default state
                        }
                        event.preventDefault();
                    }

                    //confirm if user is logged in
                    if (loginFactory.getUserStatus()) {
                        loginFactory.authCheck();
                    }
                });

            }])
})();
(function() {
  'use strict';

  angular
      .module('app.settings')
      .run(settingsRun);

  settingsRun.$inject = ['$rootScope', '$localStorage'];

  function settingsRun($rootScope, $localStorage){

    // Global Settings
    // -----------------------------------
    $rootScope.app = {
      name: 'Rockcity FM Radio',
      description: 'Rockcity FM Radio Station Ogun state',
      year: ((new Date()).getFullYear()),
      layout: {
        isFixed: true,
        isCollapsed: false,
        isBoxed: false,
        isRTL: false,
        horizontal: false,
        isFloat: false,
        asideHover: false,
        theme: null,
        asideScrollbar: false
      },
      useFullLayout: false,
      hiddenFooter: false,
      offsidebarOpen: false,
      asideToggled: false,
      viewAnimation: 'ng-fadeInUp'
    };

    // Setup the layout mode
    $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout === 'app-h') ;

     //Restore layout settings [*** UNCOMMENT TO ENABLE ***]
     //if( angular.isDefined($localStorage.layout) )
     //  $rootScope.app.layout = $localStorage.layout;
     //else
     //  $localStorage.layout = $rootScope.app.layout;
     //
     //$rootScope.$watch('app.layout', function () {
     //  $localStorage.layout = $rootScope.app.layout;
     //}, true);

    // Close submenu when sidebar change from collapsed to normal
    $rootScope.$watch('app.layout.isCollapsed', function(newValue) {
      if( newValue === false )
        $rootScope.$broadcast('closeSidebarMenu');
    });

  }

})();

/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$rootScope', '$scope', '$state', 'SidebarLoader', 'Utils'];
    function SidebarController($rootScope, $scope, $state, SidebarLoader,  Utils) {

        activate();

        ////////////////

        function activate() {
            var collapseList = [];

            // demo: when switch from collapse to hover, close all items
            $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
                if ( newVal === false && oldVal === true) {
                    closeAllBut(-1);
                }
            });


            // Load menu from json file
            // -----------------------------------

            SidebarLoader.getMenu(sidebarReady);

            function sidebarReady(items) {
                $scope.menuItems = items;
            }

            // Handle sidebar and collapse items
            // ----------------------------------

            $scope.getFormattedPermission =  function (item) {
                if(item.permissions != "undefined")
                    return item.permissions;
            };

            $scope.getMenuItemPropClasses = function(item) {
                return (item.heading ? 'nav-heading' : '') +
                    (isActive(item) ? ' active' : '') ;
            };

            $scope.addCollapse = function($index, item) {
                collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
            };

            $scope.isCollapse = function($index) {
                return (collapseList[$index]);
            };

            $scope.toggleCollapse = function($index, isParentItem) {

                // collapsed sidebar doesn't toggle drodopwn
                if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

                // make sure the item index exists
                if( angular.isDefined( collapseList[$index] ) ) {
                    if ( ! $scope.lastEventFromChild ) {
                        collapseList[$index] = !collapseList[$index];
                        closeAllBut($index);
                    }
                }
                else if ( isParentItem ) {
                    closeAllBut(-1);
                }

                $scope.lastEventFromChild = isChild($index);

                return true;

            };

            // Controller helpers
            // -----------------------------------

            // Check item and children active state
            function isActive(item) {

                if(!item) return;

                if( !item.sref || item.sref === '#') {
                    var foundActive = false;
                    angular.forEach(item.submenu, function(value) {
                        if(isActive(value)) foundActive = true;
                    });
                    return foundActive;
                }
                else
                    return $state.is(item.sref) || $state.includes(item.sref);
            }

            function closeAllBut(index) {
                index += '';
                for(var i in collapseList) {
                    if(index < 0 || index.indexOf(i) < 0)
                        collapseList[i] = true;
                }
            }

            function isChild($index) {
                /*jshint -W018*/
                return (typeof $index === 'string') && !($index.indexOf('-') < 0);
            }

        } // activate
    }

})();

/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sidebar', sidebar);

    sidebar.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];
    function sidebar ($rootScope, $timeout, $window, Utils) {
        var $win = angular.element($window);
        var directive = {
            // bindToController: true,
            // controller: Controller,
            // controllerAs: 'vm',
            link: link,
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true
            // scope: {}
        };
        return directive;

        function link(scope, element, attrs) {

          var currentState = $rootScope.$state.current.name;
          var $sidebar = element;

          var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
          var subNav = $();

          $sidebar.on( eventName, '.nav > li', function() {

            if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

              subNav.trigger('mouseleave');
              subNav = toggleMenuItem( $(this), $sidebar);

              // Used to detect click and touch events outside the sidebar          
              sidebarAddBackdrop();

            }

          });

          scope.$on('closeSidebarMenu', function() {
            removeFloatingNav();
          });

          // Normalize state when resize to mobile
          $win.on('resize', function() {
            if( ! Utils.isMobile() )
          	asideToggleOff();
          });

          // Adjustment on route changes
          $rootScope.$on('$stateChangeStart', function(event, toState) {
            currentState = toState.name;
            // Hide sidebar automatically on mobile
            asideToggleOff();

            $rootScope.$broadcast('closeSidebarMenu');
          });

      	  // Autoclose when click outside the sidebar
          if ( angular.isDefined(attrs.sidebarAnyclickClose) ) {
            
            var wrapper = $('.wrapper');
            var sbclickEvent = 'click.sidebar';
            
            $rootScope.$watch('app.asideToggled', watchExternalClicks);

          }

          //////

          function watchExternalClicks(newVal) {
            // if sidebar becomes visible
            if ( newVal === true ) {
              $timeout(function(){ // render after current digest cycle
                wrapper.on(sbclickEvent, function(e){
                  // if not child of sidebar
                  if( ! $(e.target).parents('.aside').length ) {
                    asideToggleOff();
                  }
                });
              });
            }
            else {
              // dettach event
              wrapper.off(sbclickEvent);
            }
          }

          function asideToggleOff() {
            $rootScope.app.asideToggled = false;
            if(!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      	  }
        }
        
        ///////

        function sidebarAddBackdrop() {
          var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
          $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
            removeFloatingNav();
          });
        }

        // Open the collapse sidebar submenu items when on touch devices 
        // - desktop only opens on hover
        function toggleTouchItem($element){
          $element
            .siblings('li')
            .removeClass('open')
            .end()
            .toggleClass('open');
        }

        // Handles hover to open items under collapsed menu
        // ----------------------------------- 
        function toggleMenuItem($listItem, $sidebar) {

          removeFloatingNav();

          var ul = $listItem.children('ul');
          
          if( !ul.length ) return $();
          if( $listItem.hasClass('open') ) {
            toggleTouchItem($listItem);
            return $();
          }

          var $aside = $('.aside');
          var $asideInner = $('.aside-inner'); // for top offset calculation
          // float aside uses extra padding on aside
          var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
          var subNav = ul.clone().appendTo( $aside );
          
          toggleTouchItem($listItem);

          var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
          var vwHeight = $win.height();

          subNav
            .addClass('nav-floating')
            .css({
              position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
              top:      itemTop,
              bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
            });

          subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove();
          });

          return subNav;
        }

        function removeFloatingNav() {
          $('.dropdown-backdrop').remove();
          $('.sidebar-subnav.nav-floating').remove();
          $('.sidebar li.open').removeClass('open');
        }
    }


})();


(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .service('SidebarLoader', SidebarLoader);

    SidebarLoader.$inject = ['$http'];
    function SidebarLoader($http) {
        this.getMenu = getMenu;

        ////////////////

        function getMenu(onReady, onError) {
          var menuJson = 'server/sidebar-menu.json',
              menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            
          onError = onError || function() { alert('Failure loading menu'); };

          $http
            .get(menuURL)
            .success(onReady)
            .error(onError);
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope', '$scope', '$cookies'];
    function UserBlockController($rootScope, $scope, $cookies) {

        activate();

        ////////////////


        function activate() {

            var profile = angular.fromJson($cookies.get('auth'));

            $rootScope.user = {
                name:     profile.lastname,
                job:      'Administrator',
                picture:  'app/img/user/04.jpg',
            };

            // Hides/show user avatar on sidebar
            $rootScope.toggleUserBlock = function(){
                $rootScope.$broadcast('toggleUserBlock');
            };

            $rootScope.userBlockVisible = true;

            var detach = $rootScope.$on('toggleUserBlock', function(/*event, args*/) {

                $rootScope.userBlockVisible = ! $rootScope.userBlockVisible;

            });

            $scope.$on('$destroy', detach);
        }
    }
})();

/**=========================================================
 * Module: angular-grid.js
 * Example for Angular Grid
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('AngularGridController', AngularGridController);

    AngularGridController.$inject = ['$http'];
    function AngularGridController($http) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            // Basic
            var columnDefs = [
                {headerName: 'Athlete', field: 'athlete', width: 150},
                {headerName: 'Age', field: 'age', width: 90},
                {headerName: 'Country', field: 'country', width: 120},
                {headerName: 'Year', field: 'year', width: 90},
                {headerName: 'Date', field: 'date', width: 110},
                {headerName: 'Sport', field: 'sport', width: 110},
                {headerName: 'Gold', field: 'gold', width: 100},
                {headerName: 'Silver', field: 'silver', width: 100},
                {headerName: 'Bronze', field: 'bronze', width: 100},
                {headerName: 'Total', field: 'total', width: 100}
            ];

            vm.gridOptions = {
                columnDefs: columnDefs,
                rowData: null,
                ready: function(api){
                  api.sizeColumnsToFit();
                }
            };

            // Filter Example
            var irishAthletes = ['John Joe Nevin','Katie Taylor','Paddy Barnes','Kenny Egan','Darren Sutherland', 'Margaret Thatcher', 'Tony Blair', 'Ronald Regan', 'Barack Obama'];

            var columnDefsFilter = [
                {headerName: 'Athlete', field: 'athlete', width: 150, filter: 'set',
                    filterParams: { cellHeight: 20, values: irishAthletes} },
                {headerName: 'Age', field: 'age', width: 90, filter: 'number'},
                {headerName: 'Country', field: 'country', width: 120},
                {headerName: 'Year', field: 'year', width: 90},
                {headerName: 'Date', field: 'date', width: 110},
                {headerName: 'Sport', field: 'sport', width: 110},
                {headerName: 'Gold', field: 'gold', width: 100, filter: 'number'},
                {headerName: 'Silver', field: 'silver', width: 100, filter: 'number'},
                {headerName: 'Bronze', field: 'bronze', width: 100, filter: 'number'},
                {headerName: 'Total', field: 'total', width: 100, filter: 'number'}
            ];

            vm.gridOptions1 = {
                columnDefs: columnDefsFilter,
                rowData: null,
                enableFilter: true,
                ready: function(api){
                  api.sizeColumnsToFit();
                }

            };


            // Pinning Example

            vm.gridOptions2 = {
                columnDefs: columnDefs,
                rowData: null,
                pinnedColumnCount: 2,
                ready: function(api){
                  api.sizeColumnsToFit();
                }
            };

            //-----------------------------
            // Get the data from SERVER
            //-----------------------------

            $http.get('server/ag-owinners.json')
                .then(function(res){
                    // basic
                    vm.gridOptions.api.setRowData(res.data);
                    vm.gridOptions.api.sizeColumnsToFit();
                    // filter
                    vm.gridOptions1.api.setRowData(res.data);
                    vm.gridOptions1.api.sizeColumnsToFit();

                    // pinning
                    vm.gridOptions2.api.setRowData(res.data);
                    vm.gridOptions2.api.sizeColumnsToFit();
                });

        }
    }
})();

/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('DataTableController', DataTableController);

    DataTableController.$inject = ['$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder'];
    function DataTableController($resource, DTOptionsBuilder, DTColumnDefBuilder) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // Ajax

          $resource('server/datatable.json').query().$promise.then(function(persons) {
             vm.persons = persons;
          });

          // Changing data

          vm.heroes = [{
              'id': 860,
              'firstName': 'Superman',
              'lastName': 'Yoda'
            }, {
              'id': 870,
              'firstName': 'Ace',
              'lastName': 'Ventura'
            }, {
              'id': 590,
              'firstName': 'Flash',
              'lastName': 'Gordon'
            }, {
              'id': 803,
              'firstName': 'Luke',
              'lastName': 'Skywalker'
            }
          ];

          vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
          vm.dtColumnDefs = [
              DTColumnDefBuilder.newColumnDef(0),
              DTColumnDefBuilder.newColumnDef(1),
              DTColumnDefBuilder.newColumnDef(2),
              DTColumnDefBuilder.newColumnDef(3).notSortable()
          ];
          vm.person2Add = _buildPerson2Add(1);
          vm.addPerson = addPerson;
          vm.modifyPerson = modifyPerson;
          vm.removePerson = removePerson;

          function _buildPerson2Add(id) {
              return {
                  id: id,
                  firstName: 'Foo' + id,
                  lastName: 'Bar' + id
              };
          }
          function addPerson() {
              vm.heroes.push(angular.copy(vm.person2Add));
              vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
          }
          function modifyPerson(index) {
              vm.heroes.splice(index, 1, angular.copy(vm.person2Add));
              vm.person2Add = _buildPerson2Add(vm.person2Add.id + 1);
          }
          function removePerson(index) {
              vm.heroes.splice(index, 1);
          }

        }
    }
})();

/**=========================================================
 * Module: ng-grid.js
 * ngGrid demo
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('NGGridController', NGGridController);

    NGGridController.$inject = ['$scope', '$http', '$timeout'];
    function NGGridController($scope, $http, $timeout) {

        activate();

        ////////////////

        function activate() {

          $scope.filterOptions = {
              filterText: '',
              useExternalFilter: true
          };
          $scope.totalServerItems = 0;
          $scope.pagingOptions = {
              pageSizes:   [250, 500, 1000],  // page size options
              pageSize:    250,              // default page size
              currentPage: 1                 // initial page
          };

          $scope.gridOptions = {
              data:             'myData',
              enablePaging:     true,
              showFooter:       true,
              rowHeight:        36,
              headerRowHeight:  38,
              totalServerItems: 'totalServerItems',
              pagingOptions:    $scope.pagingOptions,
              filterOptions:    $scope.filterOptions
          };

          $scope.setPagingData = function(data, page, pageSize){
              // calc for pager
              var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
              // Store data from server
              $scope.myData = pagedData;
              // Update server side data length
              $scope.totalServerItems = data.length;

              if (!$scope.$$phase) {
                  $scope.$apply();
              }

          };

          $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            var ngGridResourcePath = 'server/ng-grid-data.json';

            $timeout(function () {

                if (searchText) {
                    var ft = searchText.toLowerCase();
                    $http.get(ngGridResourcePath).success(function (largeLoad) {
                        var data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) !== -1;
                        });
                        $scope.setPagingData(data,page,pageSize);
                    });
                } else {
                    $http.get(ngGridResourcePath).success(function (largeLoad) {
                        $scope.setPagingData(largeLoad,page,pageSize);
                    });
                }
            }, 100);
          };


          $scope.$watch('pagingOptions', function (newVal, oldVal) {
              if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
              }
          }, true);
          $scope.$watch('filterOptions', function (newVal, oldVal) {
              if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
              }
          }, true);

          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.tables')
        .service('ngTableDataService', ngTableDataService);

    function ngTableDataService() {
        /* jshint validthis:true */
        var self = this;
        this.cache = null;
        this.getData = getData;

        ////////////////

        function getData($defer, params, api) {
          // if no cache, request data and filter
          if ( ! self.cache ) {
            if ( api ) {
              api.get(function(data){
                self.cache = data;
                filterdata($defer, params);
              });
            }
          }
          else {
            filterdata($defer, params);
          }
          
          function filterdata($defer, params) {
            var from = (params.page() - 1) * params.count();
            var to = params.page() * params.count();
            var filteredData = self.cache.result.slice(from, to);

            params.total(self.cache.total);
            $defer.resolve(filteredData);
          }

        }
    }
})();

/**=========================================================
 * Module: NGTableCtrl.js
 * Controller for ngTables
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('NGTableCtrl', NGTableCtrl);
    /*jshint -W055 */
    NGTableCtrl.$inject = ['$filter', 'ngTableParams', '$resource', '$timeout', 'ngTableDataService'];
    function NGTableCtrl($filter, ngTableParams, $resource, $timeout, ngTableDataService) {
        var vm = this;
        vm.title = 'Controller';

        activate();

        ////////////////

        function activate() {
          var data = [
              {name: 'Moroni',  age: 50, money: -10   },
              {name: 'Tiancum', age: 43, money: 120   },
              {name: 'Jacob',   age: 27, money: 5.5   },
              {name: 'Nephi',   age: 29, money: -54   },
              {name: 'Enos',    age: 34, money: 110   },
              {name: 'Tiancum', age: 43, money: 1000  },
              {name: 'Jacob',   age: 27, money: -201  },
              {name: 'Nephi',   age: 29, money: 100   },
              {name: 'Enos',    age: 34, money: -52.5 },
              {name: 'Tiancum', age: 43, money: 52.1  },
              {name: 'Jacob',   age: 27, money: 110   },
              {name: 'Nephi',   age: 29, money: -55   },
              {name: 'Enos',    age: 34, money: 551   },
              {name: 'Tiancum', age: 43, money: -1410 },
              {name: 'Jacob',   age: 27, money: 410   },
              {name: 'Nephi',   age: 29, money: 100   },
              {name: 'Enos',    age: 34, money: -100  }
          ];

          // SELECT ROWS
          // ----------------------------------- 

          vm.data = data;

          vm.tableParams3 = new ngTableParams({
              page: 1,            // show first page
              count: 10          // count per page
          }, {
              total: data.length, // length of data
              getData: function ($defer, params) {
                  // use build-in angular filter
                  var filteredData = params.filter() ?
                          $filter('filter')(data, params.filter()) :
                          data;
                  var orderedData = params.sorting() ?
                          $filter('orderBy')(filteredData, params.orderBy()) :
                          data;

                  params.total(orderedData.length); // set total for recalc pagination
                  $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
              }
          });

          vm.changeSelection = function(user) {
            console.info(user);
          };

          // EXPORT CSV
          // -----------------------------------  

          var data4 = [{name: 'Moroni', age: 50},
              {name: 'Tiancum', age: 43},
              {name: 'Jacob', age: 27},
              {name: 'Nephi', age: 29},
              {name: 'Enos', age: 34},
              {name: 'Tiancum', age: 43},
              {name: 'Jacob', age: 27},
              {name: 'Nephi', age: 29},
              {name: 'Enos', age: 34},
              {name: 'Tiancum', age: 43},
              {name: 'Jacob', age: 27},
              {name: 'Nephi', age: 29},
              {name: 'Enos', age: 34},
              {name: 'Tiancum', age: 43},
              {name: 'Jacob', age: 27},
              {name: 'Nephi', age: 29},
              {name: 'Enos', age: 34}];

          vm.tableParams4 = new ngTableParams({
              page: 1,            // show first page
              count: 10           // count per page
          }, {
              total: data4.length, // length of data4
              getData: function($defer, params) {
                  $defer.resolve(data4.slice((params.page() - 1) * params.count(), params.page() * params.count()));
              }
          });


          // SORTING
          // ----------------------------------- 



          vm.tableParams = new ngTableParams({
              page: 1,            // show first page
              count: 10,          // count per page
              sorting: {
                  name: 'asc'     // initial sorting
              }
          }, {
              total: data.length, // length of data
              getData: function($defer, params) {
                  // use build-in angular filter
                  var orderedData = params.sorting() ?
                          $filter('orderBy')(data, params.orderBy()) :
                          data;
          
                  $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
              }
          });

          // FILTERS
          // ----------------------------------- 

          vm.tableParams2 = new ngTableParams({
              page: 1,            // show first page
              count: 10,          // count per page
              filter: {
                  name: '',
                  age: ''
                  // name: 'M'       // initial filter
              }
          }, {
              total: data.length, // length of data
              getData: function($defer, params) {
                  // use build-in angular filter
                  var orderedData = params.filter() ?
                         $filter('filter')(data, params.filter()) :
                         data;

                  vm.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                  params.total(orderedData.length); // set total for recalc pagination
                  $defer.resolve(vm.users);
              }
          });

          // AJAX
          
          var Api = $resource('server/table-data.json');

          vm.tableParams5 = new ngTableParams({
              page: 1,            // show first page
              count: 10           // count per page
          }, {
              total: 0,           // length of data
              counts: [],         // hide page counts control
              getData: function($defer, params) {
                  
                  // Service using cache to avoid mutiple requests
                  ngTableDataService.getData( $defer, params, Api);
                  
                  /* direct ajax request to api (perform result pagination on the server)
                  Api.get(params.url(), function(data) {
                      $timeout(function() {
                          // update table params
                          params.total(data.total);
                          // set new data
                          $defer.resolve(data.result);
                      }, 500);
                  });
                  */
              }
          });
        }
    }
})();



/**=========================================================
 * Module: demo-buttons.js
 * Provides a simple demo for buttons actions
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('TablexEditableController', TablexEditableController);

    TablexEditableController.$inject = ['$filter', '$http', 'editableOptions', 'editableThemes','$q'];
    function TablexEditableController($filter, $http, editableOptions, editableThemes, $q) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // editable row
          // ----------------------------------- 
          vm.users = [
            {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
            {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
            {id: 3, name: 'awesome user3', status: 2, group: null}
          ];

          vm.statuses = [
            {value: 1, text: 'status1'},
            {value: 2, text: 'status2'},
            {value: 3, text: 'status3'},
            {value: 4, text: 'status4'}
          ];

          vm.groups = [];
          vm.loadGroups = function() {
            return vm.groups.length ? null : $http.get('server/xeditable-groups.json').success(function(data) {
              vm.groups = data;
            });
          };

          vm.showGroup = function(user) {
            if(user.group && vm.groups.length) {
              var selected = $filter('filter')(vm.groups, {id: user.group});
              return selected.length ? selected[0].text : 'Not set';
            } else {
              return user.groupName || 'Not set';
            }
          };

          vm.showStatus = function(user) {
            var selected = [];
            if(user.status) {
              selected = $filter('filter')(vm.statuses, {value: user.status});
            }
            return selected.length ? selected[0].text : 'Not set';
          };

          vm.checkName = function(data, id) {
            if (id === 2 && data !== 'awesome') {
              return 'Username 2 should be `awesome`';
            }
          };

          vm.saveUser = function(data, id) {
            //vm.user not updated yet
            angular.extend(data, {id: id});
            console.log('Saving user: ' + id);
            // return $http.post('/saveUser', data);
          };

          // remove user
          vm.removeUser = function(index) {
            vm.users.splice(index, 1);
          };

          // add user
          vm.addUser = function() {
            vm.inserted = {
              id: vm.users.length+1,
              name: '',
              status: null,
              group: null,
              isNew: true
            };
            vm.users.push(vm.inserted);
          };

          // editable column
          // ----------------------------------- 


          vm.saveColumn = function(column) {
            var results = [];
            angular.forEach(vm.users, function(/*user*/) {
              // results.push($http.post('/saveColumn', {column: column, value: user[column], id: user.id}));
              console.log('Saving column: ' + column);
            });
            return $q.all(results);
          };

          // editable table
          // ----------------------------------- 

          // filter users to show
          vm.filterUser = function(user) {
            return user.isDeleted !== true;
          };

          // mark user as deleted
          vm.deleteUser = function(id) {
            var filtered = $filter('filter')(vm.users, {id: id});
            if (filtered.length) {
              filtered[0].isDeleted = true;
            }
          };

          // cancel all changes
          vm.cancel = function() {
            for (var i = vm.users.length; i--;) {
              var user = vm.users[i];
              // undelete
              if (user.isDeleted) {
                delete user.isDeleted;
              }
              // remove new 
              if (user.isNew) {
                vm.users.splice(i, 1);
              }
            }
          };

          // save edits
          vm.saveTable = function() {
            var results = [];
            for (var i = vm.users.length; i--;) {
              var user = vm.users[i];
              // actually delete user
              if (user.isDeleted) {
                vm.users.splice(i, 1);
              }
              // mark as not new 
              if (user.isNew) {
                user.isNew = false;
              }

              // send on server
              // results.push($http.post('/saveUser', user));
              console.log('Saving Table...');
            }

            return $q.all(results);
          };

        }
    }
})();

/**=========================================================
 * Module: UIGridController
  =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.tables')
        .controller('UIGridController', UIGridController);

    UIGridController.$inject = ['uiGridConstants', '$http'];
    function UIGridController(uiGridConstants, $http) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

          // Basic example
          // ----------------------------------- 

          vm.gridOptions = {
            rowHeight: 34,
            data: [
              {
                  'name': 'Wilder Gonzales',
                  'gender': 'male',
                  'company': 'Geekko'
              },
              {
                  'name': 'Georgina Schultz',
                  'gender': 'female',
                  'company': 'Suretech'
              },
              {
                  'name': 'Carroll Buchanan',
                  'gender': 'male',
                  'company': 'Ecosys'
              },
              {
                  'name': 'Valarie Atkinson',
                  'gender': 'female',
                  'company': 'Hopeli'
              },
              {
                  'name': 'Schroeder Mathews',
                  'gender': 'male',
                  'company': 'Polarium'
              },
              {
                  'name': 'Ethel Price',
                  'gender': 'female',
                  'company': 'Enersol'
              },
              {
                  'name': 'Claudine Neal',
                  'gender': 'female',
                  'company': 'Sealoud'
              },
              {
                  'name': 'Beryl Rice',
                  'gender': 'female',
                  'company': 'Velity'
              },
              {
                  'name': 'Lynda Mendoza',
                  'gender': 'female',
                  'company': 'Dogspa'
              },
              {
                  'name': 'Sarah Massey',
                  'gender': 'female',
                  'company': 'Bisba'
              },
              {
                  'name': 'Robles Boyle',
                  'gender': 'male',
                  'company': 'Comtract'
              },
              {
                  'name': 'Evans Hickman',
                  'gender': 'male',
                  'company': 'Parleynet'
              },
              {
                  'name': 'Dawson Barber',
                  'gender': 'male',
                  'company': 'Dymi'
              },
              {
                  'name': 'Bruce Strong',
                  'gender': 'male',
                  'company': 'Xyqag'
              },
              {
                  'name': 'Nellie Whitfield',
                  'gender': 'female',
                  'company': 'Exospace'
              },
              {
                  'name': 'Jackson Macias',
                  'gender': 'male',
                  'company': 'Aquamate'
              },
              {
                  'name': 'Pena Pena',
                  'gender': 'male',
                  'company': 'Quarx'
              },
              {
                  'name': 'Lelia Gates',
                  'gender': 'female',
                  'company': 'Proxsoft'
              },
              {
                  'name': 'Letitia Vasquez',
                  'gender': 'female',
                  'company': 'Slumberia'
              },
              {
                  'name': 'Trevino Moreno',
                  'gender': 'male',
                  'company': 'Conjurica'
              }
            ]
          };
          
          // Complex example
          // ----------------------------------- 

          var data = [];
           
          vm.gridOptionsComplex = {
              showGridFooter: true,
              showColumnFooter: true,
              enableFiltering: true,
              columnDefs: [
                  { field: 'name', width: '13%' },
                  { field: 'address.street',aggregationType: uiGridConstants.aggregationTypes.sum, width: '13%' },
                  { field: 'age', aggregationType: uiGridConstants.aggregationTypes.avg, aggregationHideLabel: true, width: '13%' },
                  { name: 'ageMin', field: 'age', aggregationType: uiGridConstants.aggregationTypes.min, width: '13%', displayName: 'Age for min' },
                  { name: 'ageMax', field: 'age', aggregationType: uiGridConstants.aggregationTypes.max, width: '13%', displayName: 'Age for max' },
                  { name: 'customCellTemplate', 
                    field: 'age', 
                    width: '14%', 
                    footerCellTemplate: '<div class="ui-grid-cell-contents bg-info text-center">Custom HTML</div>' 
                  },
                  { name: 'registered', field: 'registered', width: '20%', cellFilter: 'date', footerCellFilter: 'date', aggregationType: uiGridConstants.aggregationTypes.max }
              ],
              data: data,
              onRegisterApi: function(gridApi) {
                vm.gridApi = gridApi;
              }
          };
           
          $http.get('server/uigrid-complex.json')
            .success(function(data) {
              data.forEach( function(row) {
                row.registered = Date.parse(row.registered);
              });
              vm.gridOptionsComplex.data = data;
            });


           vm.gridOptions1 = {
              paginationPageSizes: [25, 50, 75],
              paginationPageSize: 25,
              columnDefs: [
                { name: 'name' },
                { name: 'gender' },
                { name: 'company' }
              ]
            };
           
            $http.get('server/uigrid-100.json')
            .success(function (data) {
              vm.gridOptions1.data = data;
            });

        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.translate')
        .config(translateConfig)
        ;
    translateConfig.$inject = ['$translateProvider'];
    function translateConfig($translateProvider){

      $translateProvider.useStaticFilesLoader({
          prefix : 'app/i18n/',
          suffix : '.json'
      });

      $translateProvider.preferredLanguage('en');
      $translateProvider.useLocalStorage();
      $translateProvider.usePostCompiling(true);
      $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    }
})();
(function() {
    'use strict';

    angular
        .module('app.translate')
        .run(translateRun)
        ;
    translateRun.$inject = ['$rootScope', '$translate'];
    
    function translateRun($rootScope, $translate){

      // Internationalization
      // ----------------------

      $rootScope.language = {
        // Handles language dropdown
        listIsOpen: false,
        // list of available languages
        available: {
          'en':       'English',
          'es_AR':    'Español'
        },
        // display always the current ui language
        init: function () {
          var proposedLanguage = $translate.proposedLanguage() || $translate.use();
          var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
          $rootScope.language.selected = $rootScope.language.available[ (proposedLanguage || preferredLanguage) ];
        },
        set: function (localeId) {
          // Set the new idiom
          $translate.use(localeId);
          // save a reference for the current language
          $rootScope.language.selected = $rootScope.language.available[localeId];
          // finally toggle dropdown
          $rootScope.language.listIsOpen = ! $rootScope.language.listIsOpen;
        }
      };

      $rootScope.language.init();

    }
})();
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('animateEnabled', animateEnabled);

    animateEnabled.$inject = ['$animate'];
    function animateEnabled ($animate) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          scope.$watch(function () {
            return scope.$eval(attrs.animateEnabled, scope);
          }, function (newValue) {
            $animate.enabled(!!newValue, element);
          });
        }
    }

})();

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Browser', Browser);

    Browser.$inject = ['$window'];
    function Browser($window) {
      return $window.jQBrowser;
    }

})();

/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('resetKey', resetKey);

    resetKey.$inject = ['$state', '$localStorage'];
    function resetKey ($state, $localStorage) {
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              resetKey: '@'
            }
        };
        return directive;

        function link(scope, element) {
          element.on('click', function (e) {
              e.preventDefault();

              if(scope.resetKey) {
                delete $localStorage[scope.resetKey];
                $state.go($state.current, {}, {reload: true});
              }
              else {
                $.error('No storage key specified for reset.');
              }
          });
        }
    }

})();

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('toggleFullscreen', toggleFullscreen);

    toggleFullscreen.$inject = ['Browser'];
    function toggleFullscreen (Browser) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          // Not supported under IE
          if( Browser.msie ) {
            element.addClass('hide');
          }
          else {
            element.on('click', function (e) {
                e.preventDefault();

                if (screenfull.enabled) {
                  
                  screenfull.toggle();
                  
                  // Switch icon indicator
                  if(screenfull.isFullscreen)
                    $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                  else
                    $(this).children('em').removeClass('fa-compress').addClass('fa-expand');

                } else {
                  $.error('Fullscreen not enabled');
                }

            });
          }
        }
    }


})();

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('loadCss', loadCss);

    function loadCss () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
          element.on('click', function (e) {
              if(element.is('a')) e.preventDefault();
              var uri = attrs.loadCss,
                  link;

              if(uri) {
                link = createLink(uri);
                if ( !link ) {
                  $.error('Error creating stylesheet link element.');
                }
              }
              else {
                $.error('No stylesheet location defined.');
              }

          });
        }
        
        function createLink(uri) {
          var linkId = 'autoloaded-stylesheet',
              oldLink = $('#'+linkId).attr('id', linkId + '-old');

          $('head').append($('<link/>').attr({
            'id':   linkId,
            'rel':  'stylesheet',
            'href': uri
          }));

          if( oldLink.length ) {
            oldLink.remove();
          }

          return $('#'+linkId);
        }
    }

})();

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('now', now);

    now.$inject = ['dateFilter', '$interval'];
    function now (dateFilter, $interval) {
        var directive = {
            link: link,
            restrict: 'EA'
        };
        return directive;

        function link(scope, element, attrs) {
          var format = attrs.format;

          function updateTime() {
            var dt = dateFilter(new Date(), format);
            element.text(dt);
          }

          updateTime();
          var intervalPromise = $interval(updateTime, 1000);

          scope.$on('$destroy', function(){
            $interval.cancel(intervalPromise);
          });

        }
    }

})();

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('checkAll', checkAll);

    function checkAll () {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element) {
          element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            // Make sure to affect only the correct checkbox column
            table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
              .prop('checked', checkbox[0].checked);

          });
        }
    }

})();

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/
(function() {
    'use strict';

    angular
        .module('app.utils')
        .directive('triggerResize', triggerResize);

    triggerResize.$inject = ['$window', '$timeout'];
    function triggerResize ($window, $timeout) {
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attributes) {
          element.on('click', function(){
            $timeout(function(){
              // all IE friendly dispatchEvent
              var evt = document.createEvent('UIEvents');
              evt.initUIEvent('resize', true, false, $window, 0);
              $window.dispatchEvent(evt);
              // modern dispatchEvent way
              // $window.dispatchEvent(new Event('resize'));
            }, attributes.triggerResize || 300);
          });
        }
    }

})();

/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.utils')
        .service('Utils', Utils);

    Utils.$inject = ['$window', 'APP_MEDIAQUERY'];
    function Utils($window, APP_MEDIAQUERY) {

        var $html = angular.element('html'),
            $win  = angular.element($window),
            $body = angular.element('body');

        return {
          // DETECTION
          support: {
            transition: (function() {
                    var transitionEnd = (function() {

                        var element = document.body || document.documentElement,
                            transEndEventNames = {
                                WebkitTransition: 'webkitTransitionEnd',
                                MozTransition: 'transitionend',
                                OTransition: 'oTransitionEnd otransitionend',
                                transition: 'transitionend'
                            }, name;

                        for (name in transEndEventNames) {
                            if (element.style[name] !== undefined) return transEndEventNames[name];
                        }
                    }());

                    return transitionEnd && { end: transitionEnd };
                })(),
            animation: (function() {

                var animationEnd = (function() {

                    var element = document.body || document.documentElement,
                        animEndEventNames = {
                            WebkitAnimation: 'webkitAnimationEnd',
                            MozAnimation: 'animationend',
                            OAnimation: 'oAnimationEnd oanimationend',
                            animation: 'animationend'
                        }, name;

                    for (name in animEndEventNames) {
                        if (element.style[name] !== undefined) return animEndEventNames[name];
                    }
                }());

                return animationEnd && { end: animationEnd };
            })(),
            requestAnimationFrame: window.requestAnimationFrame ||
                                   window.webkitRequestAnimationFrame ||
                                   window.mozRequestAnimationFrame ||
                                   window.msRequestAnimationFrame ||
                                   window.oRequestAnimationFrame ||
                                   function(callback){ window.setTimeout(callback, 1000/60); },
            /*jshint -W069*/
            touch: (
                ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
                (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
                (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
                (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
                false
            ),
            mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
          },
          // UTILITIES
          isInView: function(element, options) {
              /*jshint -W106*/
              var $element = $(element);

              if (!$element.is(':visible')) {
                  return false;
              }

              var window_left = $win.scrollLeft(),
                  window_top  = $win.scrollTop(),
                  offset      = $element.offset(),
                  left        = offset.left,
                  top         = offset.top;

              options = $.extend({topoffset:0, leftoffset:0}, options);

              if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
                  left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
                return true;
              } else {
                return false;
              }
          },
          
          langdirection: $html.attr('dir') === 'rtl' ? 'right' : 'left',

          isTouch: function () {
            return $html.hasClass('touch');
          },

          isSidebarCollapsed: function () {
            return $body.hasClass('aside-collapsed');
          },

          isSidebarToggled: function () {
            return $body.hasClass('aside-toggled');
          },

          isMobile: function () {
            return $win.width() < APP_MEDIAQUERY.tablet;
          }

        };
    }
})();

(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
            'app.sidebar'
            /*...*/
        ]);
})();

(function() {
    'use strict';

    angular
        .module('app.order', ['ngFileUpload'])
        .constant("baseURL", "/api/")
})();

// To run this code, edit file index.html or index.jade and change
// html data-ng-app attribute from angle to myAppName
// ----------------------------------------------------------------------

(function() {
    'use strict';

    angular
        .module('custom')
        .controller('Controller', Controller);

    Controller.$inject = ['$log'];
    function Controller($log) {
        // for controllerAs syntax
        // var vm = this;

        activate();

        ////////////////

        function activate() {
          $log.log('I\'m a line from custom.js');
        }
    }
})();

/**
 * Created by dfash on 5/30/16.
 */

(function () {
    angular
        .module('app.order')
        .service('tokenService', ['$http', 'baseURL', '$q', function ($http, baseURL, $q) {

            this.get = function () {
                return $http.get(baseURL + 'csrf').then(
                    function (response) {
                        return response.data;
                    },
                    function (response) {
                        return response;
                    }
                );
            }
        }])
})();
/**
 * Created by dfash on 4/29/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('LoginFormController', ['$scope', 'loginFactory', '$cookies', '$rootScope', '$state', '_token', '$window',
            function($scope, loginFactory, $cookies, $rootScope, $state, _token, $window) {

                $scope.account = {email:'fashtop3@gmail.com', password:'ericson', _token: _token.data};

                $scope.authMsg = false;

                $scope.login = function () {

                    $scope.disabled = true;

                    loginFactory.user().login($scope.account).$promise.then(
                        function(response) {

                            $rootScope.auth = response;
                            $cookies.put('auth', JSON.stringify($rootScope.auth));
                            $rootScope.authenticated = true;

                            if(loginFactory.toState){

                                if(loginFactory.toState.name == 'app.unauthorized') {
                                    $state.go('app.dashboard');
                                    return;
                                }

                                $window.history.back();
                                //if(loginFactory.toState.name == 'app.airtime.details'){}
                                //$state.go(loginFactory.toState.name);
                            }
                            else {

                                $state.go('app.dashboard');
                            }

                        },
                        function (response) {
                            $scope.disabled = false;
                            if(response.status == 403) {
                                $scope.authMsg = response.data;
                            }
                            else if(response.status == 422) {
                                $scope.authMsg = 'Username or password not valid';
                            }
                            else {
                                $scope.authMsg = 'Access denied! Try refreshing this page';
                            }
                        }
                    );
                };

                $scope.logout = function() {
                    loginFactory.logout();
                };
            }]);
})();


/**
 * Created by dfash on 4/29/16.
 */

(function () {
    angular
        .module('app.order')
        .service('loginFactory', ['$resource', '$cookies', '$rootScope', 'baseURL', '$state', 'PermissionStore', 'RoleStore',
            function($resource, $cookies, $rootScope, baseURL, $state, PermissionStore, RoleStore) {

                this.toState = null;
                this.toParams = null;

                this.getUserStatus = function() {
                    var status = $cookies.get('auth');
                    if(status) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };

                this.userData = function() {
                    var userObj = angular.fromJson($cookies.get('auth'));
                    return userObj;
                };

                this.authCheck = function() {
                    $resource(baseURL + 'auth/check').get(
                        function () {},
                        function () {
                            redirect();
                        }
                    );
                };

                $rootScope.logout = function() {
                    $resource(baseURL + 'auth/logout').query(
                        function (response) {
                            redirect();
                        }
                    );

                };

                //$rootScope.logout = function() {
                //    $resource(baseURL + 'auth/logout', null, {
                //        'doLogout': { method: 'GET', headers: { 'X-Requested-With' :'XMLHttpRequest' }} }).doLogout(
                //        function (response) {
                //            redirect();
                //        }
                //    );
                //
                //};

                this.user = function() {
                    return $resource(baseURL + 'auth', null, {
                        'login': {
                            method:'POST',
                            headers: { 'X-Requested-With' :'XMLHttpRequest' }
                        }
                    });
                };

                function redirect()
                {
                    $cookies.remove('auth');

                    $rootScope.authenticated = false;
                    $state.go('page.login');
                }

            }]);
})();
/**
 * Created by dfash on 6/9/16.
 */

(function () {
    angular
        .module('app.core')
        .config(['$urlRouterProvider', function ($urlRouterProvider) {

            // Prevent router from automatic state resolving
            $urlRouterProvider.deferIntercept();

            // Use instead
            $urlRouterProvider.otherwise( function($injector) {
                var $state = $injector.get("$state");
                $state.go('page.login');
            });
        }]);
})();
/**
 * Created by dfash on 6/9/16.
 */

(function () {
    angular
        .module('app.core')
        .run(permissionRun);

    function permissionRun(userFactory, PermissionStore, RoleStore, $urlRouter, $http){
        //PermissionStore
        //    .definePermission('create.airtime', function () {
        //        return userFactory.userCan('approve.airtime');
        //    });
        //

        // Example ajax call
            $http
                .get('/api/permission/controls')
                .then(function (permissions) {
                    //console.log(permissions);
                    // Use RoleStore and PermissionStore to define permissions and roles
                    angular.forEach(permissions.data.permissions, function ($permission) {
                        //console.log($permission.slug);
                        PermissionStore.definePermission($permission.slug, function () {
                            return userFactory.userCan($permission.slug);
                        })
                    });

                    //save roles
                    angular.forEach(permissions.data.roles, function ($roles) {
                        RoleStore.defineRole($roles.slug, function () {
                            return userFactory.userIs($roles.slug);
                        })
                    });
                    // or even set up whole session
                })
                .then(function () {

                    //console.log(PermissionStore.getStore());
                    //console.log(RoleStore.getStore());

                    // Once permissions are set-up
                    // kick-off router and start the application rendering
                    $urlRouter.sync();
                    // Also enable router to listen to url changes
                    $urlRouter.listen();
                });
    }
    permissionRun.$inject = ["userFactory", "PermissionStore", "RoleStore", "$urlRouter", "$http"];


})();
/**
 * Created by dfash on 7/6/16.
 */
(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .directive('sideMenuPermission', function() {

            return {
                restrict: 'AE',
                link: function (scope, elem, attrs) {
                    //console.log(attrs);
                    //console.log(scope.$eval(attrs.sideMenuPermission));
                    console.log('Linking....');
                }
            }
        });
})();
/**
 * Created by dfash on 5/5/16.
 */

(function () {
    'use strict';

    angular
        .module('app.order')
        .controller('RegisterFormController', ['$scope', 'registerFactory', 'loginFactory', '$timeout',
            function($scope, registerFactory, loginFactory, $timeout) {

                $scope.register = {lastname:'', firstname:'', email:'',
                    password:'', password_confirm:'', agreed:false};
                $scope.disabled = false;

                $scope.submitReg = function() {

                    $scope.authMsg = '';

                    $scope.disabled = true;
                    //posts data to the server $scope.register
                    registerFactory.register().save($scope.register,
                        function() {
                            $scope.authMsg = false;
                            $scope.succMsg = "Account created successfully";
                            $scope.register = {lastname:'', firstname:'', email:'',
                                password:'', password_confirm:'', agreed:false};
                            $scope.registerForm.$setPristine();
                            $scope.disabled = false;

                        },
                        function (response) {
                            if(response.status == 403) {

                                $scope.succMsg = false;
                                $scope.disabled = false;
                                $scope.authMsg = "Registration failed. " + response.data;

                            }
                            else {
                                $scope.succMsg = false;
                                $scope.disabled = false;
                                $scope.authMsg = "Server error please try again later..";
                            }
                        }
                    )
                }
            }]);
})();



/**
 * Created by dfash on 4/29/16.
 */

(function () {
    'use strict';

    angular
        .module('app.order')
        .service('registerFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.register = function() {
                return $resource(baseURL + 'user', null, { 'save':{method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}});
            }
        }]);
})();
/**
 * Created by dfash on 7/10/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('AssessmentConfigController', ['$scope', '$state', 'assessmentService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert',
            function ($scope, $state, assessmentService, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert) {

                var vm = $scope;

                vm.config = {"enable":false, "starts": "", "ends": ""};
                vm.configs = {};

                activate();

                ////////////////

                vm.submitSettings = function () {
                    if(angular.isDefined(vm.config.id)) {
                        assessmentService.getConfig().update({'id':parseInt(vm.config.id)}, vm.config,
                            function(response){
                                $state.reload();
                            },
                            function(response) {
                                if(response.status == 403) {
                                    vm.configsMessage = "Error: " + response.status + " " + response.statusText;
                                }
                            }
                        );
                    }
                    else {
                        assessmentService.getConfig().save(vm.config,
                            function(response){
                                $state.reload();
                            },
                            function(response) {
                                if(response.status == 403) {
                                    vm.configsMessage = "Error: " + response.status + " " + response.statusText;
                                }
                            }
                        );
                    }
                };

                vm.editConfig = function($index) {
                    vm.config.id = vm.configs[$index].id;
                    vm.config.enable = vm.configs[$index].enable == 1 ? true : false;
                    vm.config.starts = new Date(vm.configs[$index].starts);
                    vm.config.ends = new Date(vm.configs[$index].ends);
                };

                vm.isUpdate = function($index) {
                    return vm.config.id == vm.configs[$index].id;
                };


                /////////////

                function activate() {

                    // Changing data

                    assessmentService.getConfig().query().$promise.then(
                        function(response){
                            vm.configs = response;
                        },
                        function(response) {
                            vm.configsMessage = "Error: " + response.status + " " + response.statusText;
                        }
                    );


                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(100)
                        .withPaginationType('full_numbers');

                    vm.dtColumnDefs = [
                        DTColumnDefBuilder.newColumnDef(0).notSortable(),
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(2),
                        DTColumnDefBuilder.newColumnDef(3).notSortable()
                    ];

                    vm.remove = remove;

                    //TODO: add notification message
                    function remove($index)
                    {
                        (function() {
                            SweetAlert.swal({
                                title: 'Are you sure you want to delete this Schedule?',
                                text: 'Your will not be able to recover your selected data back!',
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#DD6B55',
                                confirmButtonText: 'Yes, delete it!',
                                cancelButtonText: 'No, cancel pls!',
                                closeOnConfirm: false,
                                closeOnCancel: false
                            }, function(isConfirm){
                                if (isConfirm) {
                                    assessmentService.getConfig().delete({'id':parseInt(vm.configs[$index].id)}).$promise.then(
                                        function () {
                                            vm.configs.splice($index, 1);
                                            vm.alerts[0] = {'type':'success', 'msg':'Schedule removed successfully'};
                                        },
                                        function () {
                                            if(response.status == 403) {
                                                vm.configMessage = "Error: " + response.status + " " + response.statusText;
                                            }
                                        }
                                    );
                                } else {
                                    SweetAlert.swal('Cancelled', 'Settings is safe :)', 'error');
                                }
                            });
                        })();

                    }

                }

            }]);
})();

(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('AssessConfigDatePickerCtrl', AssessConfigDatePickerCtrl);

    function AssessConfigDatePickerCtrl() {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.today = function() {
                vm.dt = new Date();
            };
            vm.today();

            vm.clear = function () {
                vm.dt = null;
            };

            // Disable weekend selection
            vm.disabled = function(date, mode) {
                return false;
                //return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            vm.toggleMin = function() {
                vm.minDate = vm.minDate ? null : new Date();
            };
            vm.toggleMin();

            vm.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                vm.opened = true;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2019-10-20');
            vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            vm.format = vm.formats[0];
        }
    }
})();


/**
 * Created by dfash on 7/10/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('AssessmentLogController', ['$scope', function ($scope) {

        }]);
})();
/**
 * Created by dfash on 7/9/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('DriverReportViewCtrl', ['$scope', '$rootScope', 'vehicleFactory', 'SweetAlert', 'DTOptionsBuilder', 'DTColumnDefBuilder',
            function($scope, $rootScope, vehicleFactory, SweetAlert, DTOptionsBuilder, DTColumnDefBuilder) {

                var vm = $scope;
                //collapse the menu bar
                $rootScope.app.layout.isCollapsed = true;
                vm.reports = {};

                vm.alerts = [];
                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };


                activate();

                ////////////////

                function activate() {

                    // Changing data

                    vehicleFactory.driverReport().query().$promise.then(
                        function(response){
                            vm.reports = response;
                        },
                        function(response) {
                            vm.reportMessage = "Error: " + response.status + " " + response.statusText;
                        }
                    );

                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(100)
                        .withPaginationType('full_numbers');

                    vm.dtColumnDefs = [
                        DTColumnDefBuilder.newColumnDef(0),
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(2),
                        DTColumnDefBuilder.newColumnDef(3),
                        DTColumnDefBuilder.newColumnDef(4).notSortable(),
                        DTColumnDefBuilder.newColumnDef(5).notSortable()
                    ];

                    vm.removeReport = removeReport;

                    function removeReport($index)
                    {
                        (function() {
                            SweetAlert.swal({
                                title: 'Are you sure you want to delete this report?',
                                text: 'Your will not be able to recover your selected data back!',
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#DD6B55',
                                confirmButtonText: 'Yes, delete it!',
                                cancelButtonText: 'No, cancel pls!',
                                closeOnConfirm: false,
                                closeOnCancel: false
                            }, function(isConfirm){
                                if (isConfirm) {
                                    vehicleFactory.driverReport().delete({'id':parseInt(vm.reports[$index].id)}).$promise.then(
                                        function () {

                                            vm.reports.splice($index, 1);
                                            vm.alerts[0] = {'type':'success', 'msg':'Report removed successfully'};
                                        },
                                        function () {
                                            if(response.status == 403) {
                                                vm.reportMessage = "Error: " + response.status + " " + response.statusText;
                                            }
                                        }
                                    );
                                } else {
                                    SweetAlert.swal('Cancelled', 'Report is safe :)', 'error');
                                }
                            });
                        })();

                    }

                }

            }]);
})();
/**
 * Created by dfash on 6/22/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('DriverController', ['$scope', '$rootScope', 'vehicleFactory', '$state', '$stateParams',
            function($scope, $rootScope, vehicleFactory, $state, $stateParams) {

                //collapse the menu bar
                $rootScope.app.layout.isCollapsed = true;

                var vm = $scope;
                vm.report = { "info":{} }; // "water_level": "0", "oil_level": "0"};

                activate();
                ////////////////

                vm.motors = vehicleFactory.vehicles().query().$promise.then(
                    function (response) {
                        vm.motors = response;
                    }
                );

                vm.validateInput = function(name, type) {
                    var input = vm.reportForm[name];
                    return (!input.$pristine || vm.submitted) && input.$error[type];
                };


                if($state.is('app.driver.editReport')) {

                    if(angular.isDefined($stateParams.id)) {

                        console.log($stateParams.id);
                        vehicleFactory.driverReport().get({'id': parseInt($stateParams.id)}).$promise.then(
                            function (response) {
                                vm.report = response;
                            },
                            function (response) {
                                $state.go('app.driver.viewReport');
                            }
                        );
                    }

                }

                function activate() {
                    //vm.report.info.time_inspect = new Date();
                    //vm.report.info.time_washed = new Date();

                    vm.hstep = 1;
                    vm.mstep = 15;

                    vm.options = {
                        hstep: [1, 2, 3],
                        mstep: [1, 5, 10, 15, 25, 30]
                    };

                    vm.ismeridian = true;
                    vm.toggleMode = function() {
                        vm.ismeridian = ! vm.ismeridian;
                    };

                    vm.update = function() {
                        var d = new Date();
                        d.setHours( 14 );
                        d.setMinutes( 0 );
                        vm.mytime = d;
                    };

                    vm.changed = function () {
                        console.log('Time changed to: ' + vm.mytime);
                    };

                    vm.clear = function() {
                        vm.mytime = null;
                    };
                }

                vm.submitReport = function(form) {

                    vm.report.vehicle_id = vm.report.vehicle.id;

                    //if its edit mode
                    //Todo: add message to the screen
                    if($state.is('app.driver.editReport')) {
                        vehicleFactory.driverReport().update({'id':parseInt($stateParams.id)}, vm.report,
                            function (response) {
                                vm.report = response;
                                $scope.alerts[0] = {'type':'success', 'msg':'Report updated successfully'};
                                form.$setPristine();
                            }, function(response){
                                if(response.status == 403) {
                                    $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                }
                            }
                        );
                    }
                    else {
                        vehicleFactory.driverReport().report(vm.report,
                            function () {
                                vm.report = { "vehicle":vm.report.vehicle, "info":{} };
                                $scope.alerts[0] = {'type':'success', 'msg':'Report saved successfully'};
                                form.$setPristine();
                            }, function(response){
                                if(response.status == 403) {
                                    $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                }
                            }
                        );
                    }
                }

            }]);
})();
/**
 * Created by dfash on 6/16/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
            $scope.uploadFiles = function (files, errFiles) {
                $scope.files = files;
                $scope.errFiles = errFiles;
                angular.forEach(files, function (file) {
                    file.upload = Upload.upload({
                        url: '/api/vehicle',
                        data: {file: file}
                    });

                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                        });
                    }, function (response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function (evt) {
                        console.log(evt.data);
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                });
            }
        }]);

//        .controller('MyCtrl', ['$scope', 'Upload', function ($scope, Upload) {
//            // upload later on reportForm submit or something similar
//            $scope.submitUpload = function() {
//                if ($scope.reportForm.file.$valid && $scope.file) {
//                    $scope.upload($scope.file);
//                }
//            };
//
//            // upload on file select or drop
//            $scope.upload = function (file) {
//                Upload.upload({
//                    url: 'upload/url',
//                    data: {file: file, 'username': $scope.username}
//                }).then(function (resp) {
//                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
//                }, function (resp) {
//                    console.log('Error status: ' + resp.status);
//                }, function (evt) {
//                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
//                });
//            };
//            // for multiple files:
////            $scope.uploadFiles = function (files) {
////                if (files && files.length) {
////                    for (var i = 0; i < files.length; i++) {
////                        Upload.upload({..., data: {file: files[i]}, ...})...;
////                }
////                // or send them all together for HTML5 browsers:
////                Upload.upload({..., data: {file: files}, ...})...;
////        }
////}
//}]);


})();
/**
 * Created by dfash on 6/1/16.
 */

(function () {
    //angular
    //    .module('app.order')
    //    .directive('fileModel', ['$parse', function ($parse) {
    //    return {
    //        restrict: 'A',
    //        link: function(scope, element, attrs) {
    //            var model = $parse(attrs.fileModel);
    //            var modelSetter = model.assign;
    //
    //            element.bind('change', function(){
    //                scope.$apply(function(){
    //                    modelSetter(scope, element[0].files[0]);
    //                });
    //            });
    //        }
    //    };
    //}]);
})();
/**
 * Created by dfash on 6/1/16.
 */

(function () {
    //angular
    //    .module('app.order')
    //    .service('fileUpload', ['$http', function ($http) {
    //        this.uploadFileToUrl = function(file, uploadUrl){
    //            var fd = new FormData();
    //            fd.append('file', file);
    //            $http.post(uploadUrl, fd, {
    //                transformRequest: angular.identity,
    //                headers: {'Content-Type': undefined}
    //            }).success(function(){
    //                })
    //                .error(function(){
    //                });
    //        }
    //    }]);

})();
/**
 * Created by dfash on 5/27/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('ReportController', ['$scope', 'reportFactory', 'targetFactory', 'vehicleFactory',
            function($scope, reportFactory, targetFactory, vehicleFactory) {

                $scope.tab = 4;
                $scope.tasks = [{}];
                $scope.challenges = [{}];
                $scope.remittances = [{}];
                $scope.vehicles = [{}];
                $scope.uploads = [{}];

                //$scope.uploadFile = function(){
                //    var file = $scope.myFile;
                //    console.log('file is ' );
                //    console.dir(file);
                //    var uploadUrl = "/fileUpload";
                //    fileUpload.uploadFileToUrl(file, uploadUrl);
                //};

                $scope.targets = targetFactory.getMyTargets().query().$promise.then(
                    function (response) {
                        $scope.targets = response;
                    }
                );

                $scope.motors = vehicleFactory.vehicles().query().$promise.then(
                    function (response) {
                        $scope.motors = response;
                    }
                );

                $scope.closeAll = function(objArray) {
                    objArray.splice(1);
                };

                $scope.closeField = function(index, objArray) {
                    objArray.splice(index, 1);
                };

                $scope.addField = function(objArray) {
                    objArray.push({});
                };

                //
                $scope.isSelected = function (checkTab) {
                    return ($scope.tab === checkTab);
                };

                $scope.select = function(setTab) {
                    $scope.tab = setTab;
                };

                $scope.submitReport = function (form) {

                    var myReport = {'tasks': $scope.tasks, 'challenges': $scope.challenges,
                        'remittances': $scope.remittances, 'vehicles': $scope.vehicles
                    };

                    reportFactory.report().save(myReport,
                        function (response) {

                            console.log(response);

                            $scope.tasks = [{}];
                            $scope.challenges = [{}];
                            $scope.remittances = [{}];
                            $scope.vehicles = [{}];

                            form.$setPristine();
                        }, function () {

                        }
                    );
                    form.$setPristine();
                }

            }]);
})();
/**
 * Created by dfash on 6/1/16.
 */

(function () {
    angular
        .module('app.order')
        .service('reportFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.report = function() {
                return $resource(baseURL + 'report', null, {
                    'save': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}
                });
            }

        }]);
})();
///**
// * Created by dfash on 6/1/16.
// */
//
//(function () {
//    angular
//        .module('app.order')
//        .controller('TargetCreateController', ['$scope', 'userFactory', function($scope, userFactory) {

//            $scope.marketers = userFactory.marketers().query().$promise.then(
//                function(response) {
//                    $scope.marketers = response;
//                }
//            );
//
//
//        }]);
//})();

/**
 * Created by dfash on 6/5/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('TargetManageController', ['$scope', 'targetFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert',
            function($scope, targetFactory, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert) {

                var vm = $scope;

                vm.alerts = [];
                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };

                activate();

                ////////////////

                function activate() {

                    // Changing data

                    targetFactory.target().query().$promise.then(function(response) {
                        vm.targets = response;
                    });

                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(100)
                        .withPaginationType('full_numbers');

                    vm.dtColumnDefs = [
                        //DTColumnDefBuilder.newColumnDef(0).notSortable(),
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(4),
                        DTColumnDefBuilder.newColumnDef(5).notSortable()
                    ];

                    vm.modifyTarget = modifyTarget;
                    vm.removeTarget = removeTarget;

                    function modifyTarget($index)
                    {
                        vm.target.id = vm.targets[$index].id;
                        vm.target.name = vm.targets[$index].name;
                        vm.target.startDate = new Date(vm.targets[$index].startDate.toString());
                        vm.target.duration = vm.targets[$index].duration;
                        vm.target.user_id = vm.targets[$index].user_id.toString();
                        vm.target.amount = vm.targets[$index].amount;

                        vm.select(1);
                    }

                    function removeTarget($index)
                    {
                        //alert box for clearing cart
                        (function() {
                            SweetAlert.swal({
                                title: 'Are you sure you want to delete this target?',
                                text: 'Your will not be able to recover your selected data back!',
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#DD6B55',
                                confirmButtonText: 'Yes, delete it!',
                                cancelButtonText: 'No, cancel pls!',
                                closeOnConfirm: false,
                                closeOnCancel: false
                            }, function(isConfirm){
                                if (isConfirm) {
                                    //Todo: confirm first
                                    targetFactory.getTargets().delete({'id':parseInt(vm.targets[$index].id)}).$promise.then(
                                        function () {
                                            vm.targets.splice($index, 1);
                                            $scope.alerts[0] = {'type':'success', 'msg':'Target deleted successfully'};
                                        }, function(){
                                            $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                        }
                                    );
                                    SweetAlert.swal('Deleted!', 'Selected target has been deleted.', 'success');
                                } else {
                                    SweetAlert.swal('Cancelled', 'Your data is safe :)', 'error');
                                }
                            });
                        })();
                    }

                }
            }
        ]);
})();
/**
 * Created by dfash on 5/27/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('TargetController', ['$scope', 'userFactory', 'targetFactory', '_token',
            function($scope, userFactory, targetFactory, _token) {

                $scope.tab = 1;

                $scope.target = { '_token': _token.data};
                //
                $scope.isSelected = function (checkTab) {
                    return ($scope.tab === checkTab);
                };

                $scope.select = function(setTab) {
                    $scope.tab = setTab;

                };

                $scope.marketers = userFactory.marketers()
                    .query().$promise.then(
                    function (response) {
                        $scope.marketers = response;
                    }, function (response) {
                    }
                );

                $scope.alerts = [];
                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };

                $scope.submitTarget = function(form) {
                    if(angular.isDefined($scope.target.id))
                    {
                        targetFactory.getTargets().update({'id':parseInt($scope.target.id)}, $scope.target).$promise.then(
                            function () {
                                $scope.alerts[0] = {'type':'success', 'msg':'Target saved successfully'};
                                $scope.target = { '_token': _token.data};
                                form.$setPristine();
                            }, function(){
                                $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                            }
                        );
                    }
                    else {
                        targetFactory.target().save($scope.target,
                            function () {
                                $scope.alerts[0] = {'type':'success', 'msg':'Target saved successfully'};
                                $scope.target = { '_token': _token.data};
                                form.$setPristine();
                            }, function(){
                                $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                            }
                        );
                    }
                };

                activateDate();
                //date module
                function activateDate() {
                    $scope.today = function () {
                        $scope.dt = new Date();
                    };

                    $scope.today();

                    $scope.clear = function () {
                        $scope.dt = null;
                    };

                    // Disable weekend selection
                    $scope.disabled = function (date, mode) {
                        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
                    };

                    $scope.toggleMin = function () {
                        $scope.minDate = $scope.minDate ? null : new Date();
                    };
                    $scope.toggleMin();

                    $scope.open = function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        $scope.opened = true;
                    };

                    $scope.dateOptions = {
                        formatYear: 'yy',
                        startingDay: 1
                    };

                    $scope.initDate = new Date('2019-10-20');
                    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                    $scope.format = $scope.formats[0];
                }

            }]);
})();
/**
 * Created by dfash on 6/1/16.
 */

(function () {
    angular
        .module('app.order')
        .service('targetFactory', ['$resource', 'baseURL', function($resource, baseURL) {
            this.target = function() {
                return $resource(baseURL + "target", null, {'save':{method:"POST", headers: { 'X-Requested-With' :'XMLHttpRequest' }}});
            };

            this.getTargets = function() {
                return $resource(baseURL + "target/:id", null, {
                    'update':{method:"PUT", headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'save':{method:"POST", headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'delete':{method:"DELETE"}
                });
            };

            this.getMyTargets = function() {
                return $resource(baseURL + "target/:id/user");
            };

        }]);
})();
///**
// * Created by dfash on 6/1/16.
// */
//
//(function () {
//    angular
//        .module('app.order')
//        .controller('VehicleCreateController', ['$scope', 'vehicleFactory', '_token',
//            function($scope, vehicleFactory, _token) {
//
//
//                $scope.vehicleForm = {/*'name': '', 'reg': '232', 'engineNo': 324535, 'colour':'err2',*/ '_token': ''};//_token.data};
//
//                $scope.alerts = [];
//                $scope.closeAlert = function(index) {
//                    $scope.alerts.splice(index, 1);
//                };
//
//                $scope.submitVehicle = function() {
//                    $scope.vehicleForm = {'name': '', 'reg': '', 'engineNo':'', 'colour':'', '_token': _token.data};
//                    $scope.vForm.$setPristine();
//                    //vehicleFactory.vehicle().save($scope.vehicleForm,
//                    //    function () {
//                    //        $scope.alerts[0] = {'type':'success', 'msg':'Vehicle added successfully'};
//                    //        $scope.vehicleForm = {'name': '', 'reg': '', 'engineNo':'', 'colour':'', '_token': _token.data};
//                    //        $scope.vForm.$setPristine();
//                    //    },
//                    //    function (response) {
//                    //        $scope.alerts[0] = {'type':'danger', 'msg':response.data};
//                    //    }
//                    //);
//                };
//
//            }]);
//})();
/**
 * Created by dfash on 6/6/16.
 */

/**
 * Created by dfash on 6/5/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('VehicleManageController', ['$scope', 'vehicleFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert',
            function($scope, vehicleFactory, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert) {

                var vm = $scope;

                vm.alerts = [];
                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };

                activate();

                ////////////////

                function activate() {

                    // Changing data

                    vehicleFactory.vehicles().query().$promise.then(function(response) {
                        vm.vehicles = response;
                    });

                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(10)
                        .withPaginationType('full_numbers');

                    vm.dtColumnDefs = [
                        //DTColumnDefBuilder.newColumnDef(0).notSortable(),
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(4).notSortable()
                    ];

                    vm.modifyVehicle = modifyVehicle;
                    vm.removeVehicle = removeVehicle;

                    function modifyVehicle($index)
                    {
                        vm.vehicleForm.id = vm.vehicles[$index].id;
                        vm.vehicleForm.name = vm.vehicles[$index].name;
                        vm.vehicleForm.reg = vm.vehicles[$index].reg;
                        vm.vehicleForm.eng = vm.vehicles[$index].eng;
                        vm.vehicleForm.colour = vm.vehicles[$index].colour;

                        vm.select(2);
                    }

                    function removeVehicle($index)
                    {
                        //alert box for clearing cart
                        (function() {
                            SweetAlert.swal({
                                title: 'Are you sure you want to delete this vehicle?',
                                text: 'Your will not be able to recover your selected items back!',
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#DD6B55',
                                confirmButtonText: 'Yes, delete it!',
                                cancelButtonText: 'No, cancel pls!',
                                closeOnConfirm: false,
                                closeOnCancel: false
                            }, function(isConfirm){
                                if (isConfirm) {
                                    vehicleFactory.vehicles().delete({'id':parseInt(vm.vehicles[$index].id)}).$promise.then(
                                        function () {
                                            vm.vehicles.splice($index, 1);
                                            $scope.alerts[0] = {'type':'success', 'msg':'Vehicle removed successfully'};
                                            SweetAlert.swal('Deleted!', 'Selected vehicle has been deleted.', 'success');
                                        }, function(){
                                            if(response.status == 403) {
                                                $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                                SweetAlert.swal('Cancelled', response.data, 'error');
                                            }
                                        }
                                    );
                                } else {
                                    SweetAlert.swal('Cancelled', 'Your data is safe :)', 'error');
                                }
                            });
                        })();
                    }

                }
            }
        ]);
})();
/**
 * Created by dfash on 5/31/16.
 */

(function () {
    angular
        .module('app.order')
        .service('vehicleFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.vehicles = function() {
                return $resource(baseURL + 'vehicle/:id', null, {
                    'save': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'update':{method:'PUT', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'delete':{method:'DELETE'}
                });
            };

            this.driverReport = function() {
                return $resource(baseURL + 'driver/report/:id', null, {
                    'report': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'update':{method:'PUT', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'delete':{method:'DELETE'}
                });
            }

        }]);
})();
/**
 * Created by dfash on 5/27/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('VehicleController', ['$scope', 'vehicleFactory', '_token',
            function($scope, vehicleFactory, _token) {

                $scope.vehicleForm = {/*'name': '', 'reg': '232', 'engineNo': 324535, 'colour':'err2',*/ '_token': _token.data};

                //console.log(_token);
                $scope.tab = 1;
                $scope.vehicles = [{}];

                //
                $scope.isSelected = function (checkTab) {
                    return ($scope.tab === checkTab);
                };

                $scope.select = function(setTab) {
                    $scope.tab = setTab;

                };


                $scope.alerts = [];
                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };

                $scope.submitVehicle = function(form) {

                    if(angular.isDefined($scope.vehicleForm.id))
                    {
                        vehicleFactory.vehicles().update({'id':parseInt($scope.vehicleForm.id)}, $scope.vehicleForm).$promise.then(
                            function () {
                                $scope.alerts[0] = {'type':'success', 'msg':'Vehicle updated successfully'};
                                $scope.vehicleForm = { '_token': _token.data};
                                form.$setPristine();
                            }, function(){
                                $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                            }
                        );
                    }
                    else {
                        vehicleFactory.vehicles().save($scope.vehicleForm,
                            function () {
                                $scope.alerts[0] = {'type':'success', 'msg':'Vehicle added successfully'};
                                $scope.vehicleForm = {'name': '', 'reg': '', 'engineNo':'', 'colour':'', '_token': _token.data};
                                form.$setPristine();

                                $scope.select(1);
                            },
                            function (response) {
                                $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                            }
                        );
                    }
                };

            }]);
})();
/**
 * Created by dfash on 4/29/16.
 */

(function() {

    'use strict';

    angular
        .module('app.order')
        .controller('AirtimeCreateController',
        ["$scope", "$cookies", "$rootScope", "toaster", "clientFactory", "userFactory", "productFactory", "airtimeFactory", "SweetAlert", "$uibModal", "$timeout", "$state", "loginFactory", function($scope, $cookies, $rootScope, toaster, clientFactory, userFactory, productFactory, airtimeFactory, SweetAlert, $uibModal, $timeout, $state, loginFactory) {

            var vm = $scope;
            //collapse the menu bar
            $rootScope.app.layout.isCollapsed = true;

            vm.tab = 1;
            vm.bulkValid = false;
            vm.slotValid = false;
            vm.cart = [];
            vm.orderButton = undefined;
            vm.btn = {};

            vm.form = {
                price: 0.00,
                period: '',

                no_slots: "0",
                slot_start_date: "",
                slot_end_date: "",
                fixSpotPrice: "",

                broadcast: "0",
                bulk_start_date:'',
                bulk_end_date:'',
                bulkPrice: "",
                discount: '0',
                commission: '0',
                agree: false,
            };

            vm.cartTotals = 0;
            vm.vat = 0;
            vm.dsctAmnt = 0;
            vm.commAmnt = 0;
            vm.totalWOComm = 0;
            vm.totalWComm = 0;

            vm.periods = [{value:'premium', label:'Premium' }, {value:'regular', label:'Regular'}];

            vm.client = {};
            //TODO: implement this for
            vm.refreshClient = function(search) {
                clientFactory.getClients().query().$promise.then(
                    function (response) {
                        vm.clients = response;
                    }
                );
            };

            vm.slot_start_date = "";
            vm.slot_end_date = "";

            vm.getSlotRange = function(n) {
                return new Array(parseInt(n));
            };

            vm.maxSlotRange = 0;

            vm.maxSlotRangeChange = function() {
                vm.maxSlotRange = angular.copy(vm.form.no_slots);
                vm.form.fixSpotPrice =  parseFloat(vm.product.selected.prices[vm.price.index][vm.form.period]) * parseInt(vm.maxSlotRange);
            };

            vm.bulkRangeChanged = function() {
                vm.form.bulkPrice =  parseFloat(vm.product.selected.prices[vm.price.index][vm.form.period]) * parseInt(vm.form.broadcast);
            };

            vm.clearBulk = function() {
                vm.form.broadcast = 0;
                vm.form.bulk_start_date = null;
                vm.form.bulk_end_date = null;
                vm.bulkRangeChanged();
            };

            vm.clearSlot = function() {
                vm.form.no_slots = 0;
                vm.form.slot_start_date = null;
                vm.form.slot_end_date = null;
                vm.maxSlotRange = 0;
                vm.fixForDate = {};
                vm.scheduleSlots = [];
                vm.btn.fixslot = false;
                vm.form.fixSpotPrice =  parseFloat(vm.product.selected.prices[vm.price.index][vm.form.period]) * parseInt(vm.form.no_slots);
            };

            vm.fixForDate = {};
            vm.scheduleSlots = [];

            //validation for add slot button if all fixed time is set
            vm.checkScheduleSlot = function() {
                var valid = true;
                if(vm.scheduleSlots.length) {
                    for(var i=0; i<vm.scheduleSlots.length; i++) {
                        valid = vm.scheduleSlots[i].tofix == vm.scheduleSlots[i].times.length;
                    }
                }
                return valid;
            };

            //push into table
            vm.pushToSchedule = function() {
                vm.fixForDate.times = [];
                vm.scheduleSlots.push(vm.fixForDate);
                vm.recalculateSlot();
            };

            //recalculate slot if any changes
            vm.recalculateSlot = function() {
                var slot = angular.copy(vm.fixForDate.slot);
                vm.maxSlotRange = parseInt(vm.maxSlotRange) - parseInt(slot);

                vm.fixForDate = {slot:"1"};
            };

            //remove fixed spot from the table
            vm.removeSchedule = function($index) {
                vm.maxSlotRange = parseInt(vm.maxSlotRange) + parseInt(vm.scheduleSlots[$index].slot);
                vm.scheduleSlots.splice($index, 1);

                vm.calcFixedPrice();
            };

            vm.calcFixedPrice = function () {

                vm.form.fixSpotPrice =  parseFloat(vm.product.selected.prices[vm.price.index][vm.form.period]) * parseInt(vm.form.no_slots);

                //selected  product price
                var selProdPrice = parseFloat(vm.product.selected.prices[vm.price.index][vm.form.period]);

                for(var i = 0; i < vm.scheduleSlots.length; i++) {
                    var schtable = vm.scheduleSlots[i];

                    //cal normal price for tofix slot and remove it from already calculated price
                    var price = parseInt(schtable.tofix) * parseFloat(selProdPrice);

                    vm.form.fixSpotPrice = parseFloat(vm.form.fixSpotPrice) + ( (parseInt(vm.product.selected.surcharge) / 100) * parseFloat(price) );
                }
            };

            //submit order
            vm.submitOrder = function () {

                var airtime = {};

                airtime.marketer = vm.marketer.selected;

                airtime.client = vm.client.selected;

                airtime.sub = {
                    'discount':vm.form.discount,
                    'discountAmt':vm.dsctAmnt,
                    'commission': vm.form.commission,
                    'commissionAmt': vm.commAmnt,
                    'subTotal': vm.cartTotals,
                    'vat': vm.vat,
                    'grandTotal': vm.totalWOComm,
                };

                airtime.cart = vm.cart;

                toaster.pop('wait', 'Order', 'Processing your request');

                vm.orderButton = true;
                airtimeFactory.order().save(airtime,
                    function (response) {

                        toaster.pop('success', 'Order', 'Order has been received.');
                        $timeout(function () {
                            $state.go('app.airtime');
                        }, 500);
                    },
                    function (response) {
                        vm.orderButton = false;
                        if(response.status == 403) {
                            toaster.pop('error', 'Order', response.data);
                        }
                        else{
                            toaster.pop('error', 'Order', 'Failed to process order!. please contact the administrator');
                        }
                    }
                );
            };


            //set default to current user
            vm.marketer = {'selected': loginFactory.userData()};

            userFactory.marketers().query().$promise.then(
                function (response) {
                    vm.marketers = response;
                }
            );

            vm.product = {};
            vm.price = {index:'0'};
            vm.products = productFactory.getProducts().query().$promise.then(
                function (response) {
                    vm.products = response;
                }
            );

            vm.doDiscountCalc = function () {
                vm.vat = (5/100)*vm.cartTotals;
                vm.dsctAmnt = ((vm.form.discount)/100)*vm.cartTotals;
                vm.commAmnt = ((vm.form.commission)/100)*vm.cartTotals;;
                vm.totalWOComm = (vm.cartTotals + vm.vat) - vm.dsctAmnt - vm.commAmnt;
                vm.totalWComm = (vm.cartTotals + vm.vat) - vm.dsctAmnt;
            };

            //get total price of a product
            vm.calProductSubscription = function(itemIdx) {
                var sum = 0;
                for(var j=0; j<vm.cart[itemIdx].subscriptions.length; j++) {

                    var subObj = vm.cart[itemIdx].subscriptions[j];

                    sum += parseFloat(subObj.amount);// + parseFloat(subObj.subChargePrice);
                }
                return sum;
            };

            vm.calcCartTotalPrice = function() {
                var sum = 0;
                for(var i=0; i<vm.cart.length; i++) {
                    sum += vm.calProductSubscription(i);
                }
                vm.cartTotals = sum;

                //do discount calculations
                vm.doDiscountCalc();
            };

            vm.deleteCartItem = function(index) {
                delete vm.cart.splice(index,1);
                vm.calcCartTotalPrice();
            };

            vm.deleteSubscription = function(itemIndex, subIndex) {
                vm.cart[itemIndex].subscriptions.splice(subIndex, 1);
                if(vm.cart[itemIndex].subscriptions.length == 0) vm.deleteCartItem(itemIndex);
                vm.calcCartTotalPrice();
            };

            vm.productPrice = function () {
                return parseFloat(vm.form.price);
            };

            vm.addBulk = function() {
                //TODO: do validation here
                if(vm.product.selected == '') return;

                //pick number of broadcast
                //pick bulkstartdate
                //pick bulkenddate

                var data = {
                    broadcast:vm.form.broadcast,
                    bulk_start_date:vm.form.bulk_start_date,
                    bulk_end_date:vm.form.bulk_end_date,
                    period: vm.form.period,
                    amount: parseFloat(vm.form.bulkPrice),
                };

                vm.addItemToCart(); //attempts adding item to cart

                var index = vm.cartItemIndex(vm.product.selected.id);
                //for(var i = 0; i<vm.form.broadcast; i++)
                //{
                vm.cart[index].subscriptions.push(data);
                //}

                vm.calcCartTotalPrice();//recalculate cart price

                vm.clearBulk();

            };

            //on add slot button clicked
            vm.addSlot = function() {
                if(vm.product.selected == '') return;
                if(vm.form.price == 0) return;

                //new item object is created here to the vm
                vm.addItemToCart();

                //pick number if slot
                //pick slot start date
                //pick slot end date
                //pick slot calculated price
                //pick isFixedOrDisplaced
                //pick programmes fixtures (object) schedule

                var data = {
                    slots: vm.form.no_slots,
                    slot_start_date: vm.form.slot_start_date,
                    slot_end_date: vm.form.slot_end_date,
                    isFixedOrDisplaced: vm.btn.fixslot,
                    period: vm.form.period,
                    amount: parseFloat(vm.form.fixSpotPrice),
                    schedule: vm.scheduleSlots
                };
                var index = vm.cartItemIndex(vm.product.selected.id); //item obj created in vm.addItemToCart();
                vm.cart[index].subscriptions.push(data);

                vm.calcCartTotalPrice();

                vm.clearSlot();
            };

            vm.clearScheduleTimes = function (schedule) {
                schedule.times = [];
            };

            vm.minusBroadcast = function(itemIdx, subIdx) {
                if(vm.cart[itemIdx].subscriptions[subIdx].broadcast == 501) return;
                --vm.cart[itemIdx].subscriptions[subIdx].broadcast;
                vm.calcCartTotalPrice();
            };

            vm.plusBroadcast = function (itemIdx, subIdx) {
                ++vm.cart[itemIdx].subscriptions[subIdx].broadcast;
                vm.calcCartTotalPrice();
            };

            vm.searchCartItem = function(product_id){
                for(var i= 0; i<vm.cart.length; i++){
                    if(vm.cart[i].id == product_id)
                        return true;
                }
                return false;
            };

            vm.cartItemIndex = function(product_id) {
                for(var i= 0; i<vm.cart.length; i++){
                    if(vm.cart[i].id == product_id)
                        return i;
                }
            };

            vm.productChanged = function() {
                vm.price = {index:0};
                vm.form.period = 'premium';
                vm.form.price = vm.product.selected.prices[vm.price.index][vm.form.period];
                vm.clearSlot();
                vm.clearBulk();
            };

            vm.addItemToCart = function() {
                var selectedProduct = angular.copy(vm.product.selected);
                //selectedProduct.price = angular.copy(vm.product.selected.prices[vm.price.index]);
                selectedProduct.subscriptions = [];
                //check if product is not existing in the cart
                if (!vm.searchCartItem(selectedProduct.id)) {
                    vm.cart.push(selectedProduct);
                }
            };

            vm.durationChange =  function() {
                vm.form.period = 'premium';
                vm.form.price = vm.product.selected.prices[vm.price.index][vm.form.period];
            };

            vm.onPeriodChange = function() {
                vm.form.price = vm.product.selected.prices[vm.price.index][vm.form.period];
            };

            //validate bulk date and time
            vm.bulkValidate = function (type) {
                vm.bulkValid = false;

                if(type == 'date') {
                    var bsd = new Date(vm.form.bulk_start_date);
                    bsd.setHours(0,0,0,0);
                    var bed = new Date(vm.form.bulk_end_date);
                    bed.setHours(0,0,0,0);

                    if(bed <= bsd) {
                        vm.form.bulk_end_date = null;
                    }
                }

                if(type == 'time')
                {
                    var bst = new Date(vm.form.bulk_start_date);
                    var bet = new Date(vm.form.bulk_end_date);

                    if(bet.getTime() <= bst.getTime()) {
                        vm.form.bulk_end_date = null;
                    }
                }

                if(vm.form.bulk_start_date && vm.form.bulk_end_date && vm.form.broadcast > 0)
                {
                    vm.bulkValid = true;
                }

                return vm.bulkValid;
            };

            //alert box for clearing cart
            vm.emptyCart = function() {
                SweetAlert.swal({
                    title: 'Are you sure you want to empty your cart?',
                    text: 'Your will not be able to recover your selected items back!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel pls!',
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function(isConfirm){
                    if (isConfirm) {
                        vm.cart = [];
                        vm.calcCartTotalPrice();
                        SweetAlert.swal('Deleted!', 'Your cart is now empty.', 'success');
                    } else {
                        SweetAlert.swal('Cancelled', 'Your item is safe :)', 'error');
                    }
                });
            };

            activateOpenCartModal();

            function activateOpenCartModal() {

                vm.openCart = function (size) {

                    var modalInstance = $uibModal.open({
                        templateUrl: 'app/template/cart.tpl.html',
                        controller: OpenCartModalInstanceCtrl,
                        size: size,
                        resolve: {
                            cart: function () {
                                return vm.cart;
                            },
                            $rootScope: function() {
                                return vm;
                            }
                        },
                        cache: false
                    });

                    var state = $('#modal-state');
                    modalInstance.result.then(function () {
                        state.text('Modal dismissed with OK status');
                    }, function () {
                        state.text('Modal dismissed with Cancel status');
                    });
                };

                // Please note that $uibModalInstance represents a modal window (instance) dependency.
                // It is not the same as the $uibModal service used above.

                OpenCartModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', '$rootScope', 'cart'];
                function OpenCartModalInstanceCtrl($scope, $uibModalInstance, $rootScope, cart) {

                    var vm = $scope;

                    vm.cart = $rootScope.cart;

                    vm.calProductSubscription = function (itemIdx) {
                        return $rootScope.calProductSubscription(itemIdx);
                    };
                    vm.minusBroadcast = function(itemIdx, subIdx) {
                        $rootScope.minusBroadcast(itemIdx, subIdx);
                    };

                    vm.plusBroadcast = function (itemIdx, subIdx) {
                        $rootScope.plusBroadcast(itemIdx, subIdx);
                    };

                    vm.deleteCartItem = function(idx) {
                        $rootScope.deleteCartItem(idx);
                    };

                    vm.deleteSubscription = function(itemIdx, subIdx) {
                        $rootScope.deleteSubscription(itemIdx, subIdx);
                    };

                    vm.ok = function () {
                        $uibModalInstance.close('closed');
                    };

                    vm.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                }
            }

        }]);
})();

(function(){

    'use strict';

    angular
        .module('app.order')
        .controller('SlotStartDateCtrl', ['$scope', function($scope) {

            var vm = this;

            activateDate();
            //date module
            function activateDate() {
                vm.today = function () {
                    vm.dt = new Date();
                };

                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function (date, mode) {
                    return false;
                    //return ( mode === 'day' /*&& ( date.getDay() === 0 || date.getDay() === 6 ) */);
                };

                vm.toggleMin = function () {
                    vm.minDate = $scope.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.format = vm.formats[0];
            }
        }])
})();

(function(){

    'use strict';

    angular
        .module('app.order')
        .controller('SlotEndDateCtrl', ['$scope', function($scope) {

            var vm = this;

            activateDate();
            //date module
            function activateDate() {
                vm.today = function () {
                    vm.dt = new Date();
                };

                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function (date, mode) {

                    return false;
                    //return ( mode === 'day' /*&& ( date.getDay() === 0 || date.getDay() === 6 ) */);
                };

                vm.toggleMin = function () {
                    vm.minDate = $scope.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.format = vm.formats[0];
            }
        }])
})();

(function(){

    'use strict';

    angular
        .module('app.order')
        .controller('FixedSlotDateCtrl', ['$scope', function($scope) {

            var vm = this;

            activateDate();
            //date module
            function activateDate() {
                vm.today = function () {
                    vm.dt = new Date();
                };

                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function (date, mode) {
                    return false;
                    //return ( mode === 'day' /*&& ( date.getDay() === 0 || date.getDay() === 6 ) */);
                };

                vm.toggleMin = function () {
                    vm.minDate = $scope.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.format = vm.formats[0];
            }
        }])
})();

(function(){

    'use strict';

    angular
        .module('app.order')
        .controller('BulkStartDateCtrl', ['$scope', function($scope) {

            var vm = this;

            activateDate();
            //date module
            function activateDate() {
                vm.today = function () {
                    vm.dt = new Date();
                };

                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function (date, mode) {
                    return false;
                    //return ( mode === 'day' /*&& ( date.getDay() === 0 || date.getDay() === 6 ) */);
                };

                vm.toggleMin = function () {
                    vm.minDate = $scope.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.format = vm.formats[0];
            }
        }])
})();

(function(){

    'use strict';

    angular
        .module('app.order')
        .controller('BulkEndDateCtrl', ['$scope', function($scope) {

            var vm = this;

            activateDate();
            //date module
            function activateDate() {
                vm.today = function () {
                    vm.dt = new Date();
                };

                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function (date, mode) {
                    return false;
                    //return ( mode === 'day' /*&& ( date.getDay() === 0 || date.getDay() === 6 ) */);
                };

                vm.toggleMin = function () {
                    vm.minDate = $scope.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    vm.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.format = vm.formats[0];
            }
        }])
})();


(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('SlotTimeModalCtrl', SlotTimeModalCtrl);

    SlotTimeModalCtrl.$inject = ['$uibModal'];
    function SlotTimeModalCtrl($uibModal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            vm.open = function (size, $schedule) {

                var modalInstance = $uibModal.open({
                    templateUrl: '/myModalContent.html',
                    controller: ModalInstanceCtrl,
                    size: size,
                    resolve: {
                        $schedule: function () {
                            return $schedule;
                        }
                    },
                    cache: false
                });

                var state = $('#modal-state');
                modalInstance.result.then(function () {
                    state.text('Modal dismissed with OK status');
                }, function () {
                    state.text('Modal dismissed with Cancel status');
                });
            };

            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', '$schedule'];
            function ModalInstanceCtrl($scope, $uibModalInstance, $schedule) {

                $scope.scheduleRef = $schedule;

                $scope.getSlotRange = function(n) {
                    return new Array(parseInt(n));
                };

                $scope.ok = function () {
                    $uibModalInstance.close('closed');
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        }
    }

})();

/**
 * Created by dfash on 5/25/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('AirtimeDefaultController', ['$scope', '$resource', 'baseURL', '$filter', 'ngTableParams', '$timeout', 'ngTableDataService', 'DTOptionsBuilder', 'DTColumnDefBuilder',
            function($scope, $resource, baseURL, $filter, ngTableParams, $timeout, ngTableDataService, DTOptionsBuilder, DTColumnDefBuilder) {

                var vm = $scope;

                vm.showData = false;
                vm.dataMessage = 'Loading...';
                vm.isDisabled = false;


                activate();

                vm.search = function() {

                    vm.isDisabled = true;

                    $resource(baseURL + 'airtime?min=:min&max=:max').query({'min': vm.min_date, 'max': vm.max_date}).$promise.then(
                        function (response) {
                            vm.isDisabled = false;
                            vm.schedules = response;
                        }
                    );
                };

                ////////////////

                function activate() {

                    ////class
                    vm.propClass = function(val) {
                        return val == 1 ? 'label-success' : 'label-info';
                    };

                    /////date
                    vm.today = function() {
                        vm.dt = new Date();
                    };
                    vm.today();

                    vm.clear = function () {
                        vm.dt = null;
                    };

                    // Disable weekend selection
                    vm.disabled = function(date, mode) {
                        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
                    };

                    vm.toggleMin = function() {
                        vm.minDate = vm.minDate ? null : new Date();
                    };
                    vm.toggleMin();

                    vm.dateChanged = function(){
                      if(vm.max_date <= vm.min_date){
                          vm.max_date = null;
                      }
                    };

                    vm.min_open = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        vm.min_opened = true;
                    };

                    vm.max_open = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        vm.max_opened = true;
                    };

                    vm.dateOptions = {
                        formatYear: 'yy',
                        startingDay: 1
                    };

                    vm.initDate = new Date('2019-10-20');
                    vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                    vm.format = vm.formats[0];


                    // Changing data

                    $resource(baseURL + 'airtime').query().$promise.then(
                        function (response) {
                            vm.schedules = response;
                        }
                    );


                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(100)
                        .withPaginationType('full_numbers');

                    vm.dtColumnDefs = [
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(7).notSortable()
                    ];

                }

            }]);
})();
/**
 * Created by dfash on 6/11/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('AirtimeDetailController', ['$scope', '$stateParams', 'airtimeFactory', '$state',
            function($scope, $stateParams, airtimeFactory, $state) {

                var vm = $scope;

                airtime();
                activate();


                ////////////////
                //

                vm.manage = {};


                $scope.alerts = [];
                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };

                function airtime() {
                    vm.schedule = airtimeFactory.getAirtime().get({'id': parseInt($stateParams.id)}).$promise.then(
                        function (response) {
                            vm.schedule = response;
                            vm.manage.validate = vm.schedule.schedule_alert.validate;
                            vm.manage.recommend = vm.schedule.schedule_alert.recommend;
                            vm.manage.approved = vm.schedule.schedule_alert.approved;
                            vm.manage.programme = vm.schedule.schedule_alert.programme;
                        },
                        function() {
                            $state.go('app.airtime');
                        }
                    );
                }




                function activate() {

                    vm.airtimeRecommend = function() {
                        if(!(vm.manage.validate)) {
                            vm.manage.recommend = false;
                            return true;
                        }
                        return false;
                    };


                    vm.airtimeApproved = function() {
                        if(!(vm.manage.validate && vm.manage.recommend)) {
                            vm.manage.approved = false;
                            return true;
                        }
                        return false;
                    };

                    vm.airtimeProgramme = function () {

                        if(!(vm.manage.validate && vm.manage.recommend && vm.manage.approved)) {
                            vm.manage.programme = false;
                            return true;
                        }

                        return false;

                    };

                    vm.validateSchedule = function() {
                        $scope.alerts = [];
                        airtimeFactory.validateAirtime().save({'id': vm.schedule.schedule_alert.id}, vm.manage).$promise.then(
                            function(response) {
                                airtime();
                                $scope.alerts[0] = {'type':'success', 'msg':'Airtime has been validated'};
                            },
                            function(response) {
                                if(response.status == 403) {
                                    $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                }
                                if(response.status == 422) {
                                    $scope.alerts[0] = {'type':'warning', 'msg':response.data};
                                }
                            }
                        )
                    };

                    vm.recommendSchedule = function() {
                        $scope.alerts = [];
                        airtimeFactory.recommendAirtime().save({'id': vm.schedule.schedule_alert.id}, vm.manage).$promise.then(
                            function(response) {
                                airtime();
                                $scope.alerts[0] = {'type':'success', 'msg':'Airtime successfully recommended for approval'};
                            },
                            function(response) {
                                if(response.status == 403) {
                                    $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                }
                                if(response.status == 422) {
                                    $scope.alerts[0] = {'type':'warning', 'msg':response.data};
                                }
                            }

                        )
                    };

                    vm.approveSchedule = function() {
                        $scope.alerts = [];
                        airtimeFactory.approveAirtime().save({'id': vm.schedule.schedule_alert.id}, vm.manage).$promise.then(
                            function(response) {
                                airtime();
                                $scope.alerts[0] = {'type':'success', 'msg':'Airtime successfully approved for programme'};
                            },
                            function(response) {
                                if(response.status == 403) {
                                    $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                }
                                if(response.status == 422) {
                                    $scope.alerts[0] = {'type':'warning', 'msg':response.data};
                                }
                            }

                        )
                    };

                    vm.programmeSchedule = function() {
                        $scope.alerts = [];
                        airtimeFactory.programmeAirtime().save({'id': vm.schedule.schedule_alert.id}, vm.manage).$promise.then(
                            function(response) {
                                airtime();
                                $scope.alerts[0] = {'type':'success', 'msg':'Airtime saved for programme'};
                            },
                            function(response) {
                                if(response.status == 403) {
                                    $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                }
                                if(response.status == 422) {
                                    $scope.alerts[0] = {'type':'warning', 'msg':response.data};
                                }
                            }

                        )
                    };

                }
            }]);
})();
/**
 * Created by dfash on 6/7/16.
 */

(function () {
    angular
        .module('app.order')
        .service('airtimeGenService', ['$resource', 'baseURL', function($resource, baseURL) {


        }]);
})();
/**
 * Created by dfash on 5/25/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('AirtimeController', ['$scope', '$resource', 'baseURL', '$filter', 'ngTableParams', '$timeout', 'ngTableDataService', 'DTOptionsBuilder', 'DTColumnDefBuilder',
            function($scope, $resource, baseURL, $filter, ngTableParams, $timeout, ngTableDataService, DTOptionsBuilder, DTColumnDefBuilder) {

                var vm = $scope;

                vm.showData = false;
                vm.dataMessage = 'Loading...';

                activate();

                ////////////////

                function activate() {

                    // Changing data

                    $resource(baseURL + 'airtime').query().$promise.then(
                        function (response) {
                            vm.schedules = response;
                        }
                    );


                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(100)
                        .withPaginationType('full_numbers');

                    vm.dtColumnDefs = [
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(6).notSortable()
                    ];

                }
            }]);
})();
/**
 * Created by dfash on 6/7/16.
 */

(function () {
    angular
        .module('app.order')
        .service('airtimeFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.order = function () {
                return $resource(baseURL + 'airtime', null, {'save':{'method':'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}})
            };

            this.getAirtime = function () {
                return $resource(baseURL + 'airtime/:id');
            };

            this.validateAirtime = function () {
                return $resource(baseURL + 'airtime/:id/validate', null, {'save':{'method': 'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}});
            };

            this.recommendAirtime = function () {
                return $resource(baseURL + 'airtime/:id/recommend', null, {'save':{'method': 'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}});
            };

            this.approveAirtime = function () {
                return $resource(baseURL + 'airtime/:id/approve', null, {'save':{'method': 'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}});
            };

            this.programmeAirtime = function () {
                return $resource(baseURL + 'airtime/:id/programme', null, {'save':{'method': 'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}});
            };

        }]);
})();
/**
 * Created by dfash on 7/8/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('AssessmentRecordController', ['$scope', 'assessmentService', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert',
            function($scope, assessmentService, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert) {

            var vm = $scope;

            vm.showRecords = false;
            vm.assessMessage = "Loading...";

            vm.alerts = [];
            vm.closeAlert = function(index) {
                vm.alerts.splice(index, 1);
            };

            //
            assessmentService.getAssessment().query()
                .$promise.then(
                function (response) {
                    vm.records = response;
                    vm.showRecords = true;
                }, function (response) {
                    if(response.status == 403) {
                        vm.assessMessage = "Error: " + response.status + " " + response.statusText;
                    }
                }
            );



            activate();

            ////////////////

            function activate() {

                // Changing data
                vm.dtOptions = DTOptionsBuilder.newOptions()
                    .withDisplayLength(100)
                    .withPaginationType('full_numbers');

                vm.dtColumnDefs = [
                    DTColumnDefBuilder.newColumnDef(0),
                    DTColumnDefBuilder.newColumnDef(1),
                    DTColumnDefBuilder.newColumnDef(2).notSortable()
                ];

                vm.remove = remove;

                function remove($index)
                {
                    //Todo: there is a bug here .... on delete record, the dialog boxes doesn't close
                    (function() {
                        SweetAlert.swal({
                            title: 'Are you sure you want to delete this record?',
                            text: 'Your will not be able to recover your selected data back!',
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'Yes, delete it!',
                            cancelButtonText: 'No, cancel pls!',
                            closeOnConfirm: false,
                            closeOnCancel: false
                        }, function(isConfirm){
                            if (isConfirm) {
                                assessmentService.getAssessment().delete({'id':parseInt(vm.records[$index].id)}).$promise.then(
                                    function () {

                                        vm.records.splice($index, 1);
                                        vm.alerts[0] = {'type':'success', 'msg':'Assessment data removed successfully'};
                                    },
                                    function (response) {
                                        if(response.status == 403) {
                                            vm.alerts[0] = {'type':'danger', 'msg':response.data};
                                        }
                                    }
                                );
                            } else {
                                SweetAlert.swal('Cancelled', 'Assessment data is safe :)', 'error');
                            }
                        });
                    })();

                }

            }
        }]);
})();
/**
 * Created by dfash on 6/22/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('AssessmentController', ['$scope', 'toaster', 'assessmentService', '$state', '$stateParams',
            function($scope, toaster, assessmentService, $state, $stateParams) {

                var vm = $scope;
                vm.disableForm = false;
                vm.showTimeFrame = false;
                $scope.config = {};

                $scope.form = {
                    "id": null, "preview": 0,
                    "part_one": { "personal":{ "date_confirm": {"date":'', "opened":false}, "appraisal_date": {"date":'', "opened":false} },
                        "qualifications":[{"date":'', "opened":false},{"date":'', "opened":false},{"date":'', "opened":false},{"date":'', "opened":false}]},
                    "part_two": { "review":[{}], "performance":{}},
                    "part_three": {"competencies":{}},
                    "supervisor": {"preview":0,"attributes":{}, "habit":{}, "leadership":{}}
                };



                assessmentService.getActiveConfig().get().$promise.then(
                    function (response) {
                        vm.showTimeFrame = true;
                        $scope.config = response;

                        if($state.is('app.assessment.create'))
                            $scope.form.assessment_config_id = response.id;

                        checkRouting(response);
                    },
                    function() {
                        vm.disableForm = true;
                    }
                );


                //routes to edit if user has a data already submitted
                function checkRouting(response) {
                    if($state.is('app.assessment.create')) {
                        if (angular.isDefined(response.assessment)) {
                            $state.go('app.assessment.edit', {"id": response.assessment.id});
                        }
                    }
                }

                //routing from create or from url
                if($state.is('app.assessment.edit')) {
                    assessmentService.getAssessment().get({"id":$stateParams.id}).$promise.then(
                        function (response) {
                            $scope.form = response;

                            checkDataResp();
                        },
                        function() {
                            $state.go('app.assessment.create', {"id":$scope.form.id});
                        }
                    );
                }

                vm.submitPreview = function() {
                    $scope.form.preview = 0;

                    toaster.pop('wait', 'Assessment', 'Processing your request');

                    assessmentService.assessment().save($scope.form,
                        function (response) {

                            $scope.form = response;
                            toaster.pop('success', 'Assessment', 'Data saved.');

                            checkDataResp();

                            $state.go('app.assessment.edit', {"id":$scope.form.id});
                        },
                        function (response) {
                            toaster.pop('error', 'Assessment', 'Data submission Failed.');
                        }
                    );
                };

                //submit form
                vm.submitAssessment = function() {

                    $scope.form.preview = 1;

                    toaster.pop('wait', 'Assessment', 'Processing your request');

                    assessmentService.assessment().save($scope.form,
                        function () {
                            toaster.pop('success', 'Assessment', 'Data submitted for review.');
                            $state.go('app.assessment.view');
                        },
                        function (response) {
                            if(response.status == 403) {
                                vm.alerts[0] = {'type':'danger', 'msg':response.data};
                                toaster.pop('error', 'Assessment', 'Data submission Failed.');
                            }
                        }
                    );
                };

                var checkDataResp = function() {
                    if(angular.isDefined($scope.form.part_two.review) && $scope.form.part_two.review.length == 0) {
                        if($scope.form.part_two.review[0].length == 0)
                            $scope.form.part_two.review = [{}];
                    }

                    if(angular.isDefined($scope.form.part_two.performance) && $scope.form.part_two.performance.length == 0) {
                        $scope.form.part_two.performance = {};
                    }

                    if(angular.isDefined($scope.form.part_three.competencies) && $scope.form.part_three.competencies.length == 0) {
                        $scope.form.part_three.competencies = {};
                    }
                };

                //START-DATE functions
                vm.today = function() {
                    vm.dt = new Date();
                };
                vm.today();

                vm.clear = function () {
                    vm.dt = null;
                };

                // Disable weekend selection
                vm.disabled = function(date, mode) {
                    return false;
                    //return ( mode === 'day' && ( date.getDay() === 0 /*|| date.getDay() === 6*/ ) );
                };

                vm.toggleMin = function() {
                    vm.minDate = vm.minDate ? null : new Date();
                };
                vm.toggleMin();

                vm.open = function($event, dateObj) {
                    $event.preventDefault();
                    $event.stopPropagation();

                    dateObj.opened = true;
                };

                vm.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                vm.initDate = new Date('2019-10-20');
                vm.dateFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                vm.dateFormat = vm.dateFormats[0];
                //END: Date functions
            }]);
})();
/**
 * Created by dfash on 7/7/16.
 */

(function(){
    'use strict';

    angular
        .module('app.order')
        .service('assessmentService', ['$resource', 'baseURL', function($resource, baseURL) {

            this.assessment = function() {
                return $resource(baseURL + 'assessment', null,
                    {
                        "save": {method: 'POST',  headers: { 'X-Requested-With' :'XMLHttpRequest'}},
                        "update": {method:"PUT", headers: { 'X-Requested-With' :'XMLHttpRequest'}}
                    }
                )
            };

            this.getAssessment = function() {
                return $resource(baseURL + 'assessment/:id', null,
                    {
                        'save': {method:'PUT', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                        "delete": {method:"DELETE", headers: { 'X-Requested-With' :'XMLHttpRequest' }}
                    }
                );
            };

            this.supervisor = function() {
                return $resource(baseURL + 'supervisor', null,
                    {
                        "save": {method: 'POST',  headers: { 'X-Requested-With' :'XMLHttpRequest'}},
                        "update": {method:"PUT", headers: { 'X-Requested-With' :'XMLHttpRequest'}}
                    }
                )
            };

            this.getConfig = function() {
                return $resource(baseURL + 'assessconfig/:id', null,
                    {
                        'save': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                        'update': {method:'PUT', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                        "delete": {method:"DELETE", headers: { 'X-Requested-With' :'XMLHttpRequest' }}
                    }
                );
            };

            this.getActiveConfig = function() {
                return $resource(baseURL + 'activeconfig');
            };


        }]);
})();
/**
 * Created by dfash on 7/6/16.
 */

(function () {
    'use strict';

    angular
        .module('app.order')
        .service('assessmentServices', ['$scope', function($scope) {


        }]);
})();
/**
 * Created by dfash on 7/8/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('SupervisorController', ['$scope', 'toaster', 'assessmentService', '$state', '$stateParams',
            function($scope, toaster, assessmentService, $state, $stateParams) {

                var vm = this;

                $scope.supervisor = {"preview":0,"attributes":{}, "habit":{}, "leadership":{}};


                //manages for routing
                assessmentService.getAssessment().get({"id":$stateParams.id}).$promise.then(
                    function (response) {
                        if(response.supervisor != null)
                            $scope.supervisor = response.supervisor;
                        else {
                            $scope.supervisor.assessment_id = response.id;
                            checkDataResp();
                        }
                    },
                    function() {
                        $state.go('app.assessment.view');
                    }
                );


                $scope.submitPreview = function() {
                    $scope.supervisor.preview = 0;

                    toaster.pop('wait', 'Assessment', 'Processing your request');

                    //set the function
                    assessmentService.supervisor().save($scope.supervisor,
                        function (response) {

                            $scope.supervisor = response;
                            toaster.pop('success', 'Supervisor', 'Data saved.');

                            checkDataResp();

                        },
                        function (response) {
                            toaster.pop('error', 'Supervisor', 'Data submission Failed.');
                        }
                    );
                };

                //submit form
                $scope.submitComment = function() {

                    $scope.supervisor.preview = 1;

                    toaster.pop('wait', 'Supervisor', 'Processing your request');

                    assessmentService.supervisor().save($scope.supervisor,
                        function () {
                            toaster.pop('success', 'Supervisor', 'Data submitted.');
                            $state.go('app.assessment.view');
                        },
                        function (response) {
                            if(response.status == 403) {
                                vm.alerts[0] = {'type':'danger', 'msg':response.data};
                                toaster.pop('error', 'Supervisor', 'Data submission Failed.');
                            }
                        }
                    );
                };

                var checkDataResp = function() {
                    if($scope.supervisor.habit != "undefined" && $scope.supervisor.attributes.length == 0) {
                        $scope.supervisor.attributes = {};
                    }

                    if($scope.supervisor.habit != "undefined" && $scope.supervisor.habit.length == 0) {
                        $scope.supervisor.habbit = {};
                    }

                    if($scope.supervisor.leadership != "undefined" && $scope.supervisor.leadership.length == 0) {
                        $scope.supervisor.leadership = {};
                    }
                };

            }]);
})();
/**
 * Created by dfash on 6/19/16.
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('ClientFormController', [
            '$scope', 'clientFactory', 'toaster', '$stateParams', '$rootScope', '$state', '$timeout',
            function($scope, clientFactory, toaster, $stateParams, $rootScope, $state, $timeout) {

                var vm = $scope;
                vm.disableView = false;

                vm.client = {name:'', address:'', title:'Mr', firstname:'', lastname:'', mobile:'', email:''};

                vm.alerts = [];
                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };

                if($state.is('app.client.edit')) {

                    vm.disableView = false;

                    vm.client = clientFactory.getClients().get({id: parseInt($stateParams.id, 10)})
                        .$promise.then(
                        function(response) {
                            vm.client = response;
                        },
                        function (response) {

                            vm.disableView = true;

                            if(response.status == 403){
                                vm.alerts[0] = {'type':'danger', 'msg':response.data};
                            }
                            else if(response.status == 404){
                                vm.alerts[0] = {'type':'danger', 'msg': "Client not found!."};
                            }
                        }
                    );
                }

                vm.clientSubmit = function() {

                    toaster.pop('wait', 'Client', 'Processing your request');

                    if(vm.client.id) {
                        clientFactory.update().save({'id':vm.client.id}, vm.client,
                            function() {
                                toaster.pop('success', 'Client', 'Data updated.');
                                $timeout(function(){
                                    $state.go('app.client');
                                }, 500);
                            },
                            function (response) {
                                if(response.status == 403) {
                                    vm.alerts[0] = {'type':'danger', 'msg':response.data};
                                    toaster.pop('error', 'Client', 'Data update Failed.');
                                }
                            }
                        );
                    }
                    else
                    {
                        clientFactory.client().save(vm.client,
                            function(){
                                toaster.pop('success', 'Client Registration', 'Registration Successful.');
                                $timeout(function(){
                                    $state.go('app.client');
                                }, 1000);
                            },
                            function() {
                                if(response.status == 403) {
                                    vm.alerts[0] = {'type':'danger', 'msg':response.data};
                                    toaster.pop('error', 'Client', response.data);
                                }
                            }
                        );
                    }
                };

            }]);
})();


/**
 * Created by dfash on 4/29/16.
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('ClientController', ['$scope', '$stateParams', 'clientFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert',
            function($scope, $stateParams, clientFactory, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert) {

                var vm = $scope;

                vm.showClient = false;
                vm.clientMessage = "Loading...";

                vm.alerts = [];
                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };

                if(angular.isDefined($stateParams.id)) {

                    //get client by id
                    vm.client = clientFactory.getClients().get({id: parseInt($stateParams.id, 10)})
                        .$promise.then(
                        function (response) {
                            vm.client = response;
                            vm.showClient = true;
                        }, function (response) {
                            if(response.status == 403) {
                                vm.clientMessage = "Error: " + response.status + " " + response.statusText;
                            }
                        }
                    )
                }



                activate();

                ////////////////

                function activate() {

                    // Changing data

                    clientFactory.getClients().query().$promise.then(
                        function(response){
                            vm.clients = response;
                            vm.showclient = true;
                        },
                        function(response) {
                            vm.clientMessage = "Error: " + response.status + " " + response.statusText;
                        }
                    );


                    vm.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(100)
                        .withPaginationType('full_numbers');

                    vm.dtColumnDefs = [
                        DTColumnDefBuilder.newColumnDef(1),
                        DTColumnDefBuilder.newColumnDef(2).notSortable(),
                        DTColumnDefBuilder.newColumnDef(3).notSortable(),
                        DTColumnDefBuilder.newColumnDef(4).notSortable(),
                        DTColumnDefBuilder.newColumnDef(5).notSortable()
                    ];

                    vm.removeClient = removeClient;

                    function removeClient($index)
                    {
                        (function() {
                            SweetAlert.swal({
                                title: 'Are you sure you want to delete this client?',
                                text: 'Your will not be able to recover your selected data back!',
                                type: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#DD6B55',
                                confirmButtonText: 'Yes, delete it!',
                                cancelButtonText: 'No, cancel pls!',
                                closeOnConfirm: false,
                                closeOnCancel: false
                            }, function(isConfirm){
                                if (isConfirm) {
                                    clientFactory.client().delete({'id':parseInt(vm.clients[$index].id)}).$promise.then(
                                        function () {

                                            vm.clients.splice($index, 1);
                                            vm.alerts[0] = {'type':'success', 'msg':'Client removed successfully'};
                                        },
                                        function () {
                                            if(response.status == 403) {
                                                vm.clientMessage = "Error: " + response.status + " " + response.statusText;
                                            }
                                        }
                                    );
                                } else {
                                    SweetAlert.swal('Cancelled', 'Client data is safe :)', 'error');
                                }
                            });
                        })();

                    }

                }

            }]);
})();
/**
 * Created by dfash on 4/29/16.
 */

(function(){
    'use strict';

    angular
        .module('app.order')
        .service('clientFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.getClients = function(){
                return $resource(baseURL + "client/:id");
            };

            this.clientEdit = function(){
                return $resource(baseURL + "client/:id/edit");
            };

            this.update = function(){
                return $resource(baseURL + "client/:id", null, { 'save': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }} });
            };

            this.client = function() {
                return $resource(baseURL + 'client/:id', null, { 'save':{method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'delete':{method:'DELETE', headers: { 'X-Requested-With' :'XMLHttpRequest' }}});
            };

        }]);
})();
/**
 * Created by dfash on 5/18/16.
 */
(function () {
    'use strict';

    angular
        .module('app.order')
        .controller('DashboardController', ['loginFactory', '$scope', '$resource', 'baseURL', 'FileUploader', '_token', 'toaster',
            function(loginFactory, $scope, $resource, baseURL, FileUploader, _token, toaster) {

                var vm = $scope;
                
                vm.alerts = [];

                vm.profile = {_token: _token};

                vm.reset = {_token: _token};

                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };


                $resource(baseURL + 'contacts').query().$promise.then(
                    function (response) {
                        vm.contacts = response;
                    }
                );

                //profile
                vm.profile = loginFactory.userData();

                //uploader object
                vm.uploader = new FileUploader({
                    url: baseURL +'user/'+vm.profile.id+'/upload'
                });

                //upload
                vm.uploader.onErrorItem = function(fileItem, response, status, headers) {
                    console.info('onErrorItem', fileItem, response, status, headers);
                };

                //upload
                vm.uploader.onCompleteAll = function() {
                    vm.uploader.clearQueue();
                };


                //submit profile form
                vm.updateProfile = function() {
                    $resource(baseURL + 'user/:id', null, {'update':{method:'PUT'}})
                        .update({'id':vm.profile.id}, vm.profile,
                        function () {
                            vm.alerts[0] = {'type':'success', 'msg':'Profile updated successfully'};
                        },
                        function (response) {
                            if(response.status == 403) {
                                vm.alerts[0] = {'type':'danger', 'msg':'Profile update failed'};
                            }
                        }
                    );

                    //console.log(vm.profile);
                    //vm.uploader.uploadAll();
                };

                vm.updatePassword = function() {
                    $resource(baseURL + 'user/:id?action=password', null, {'update':{method:'PUT'}})
                        .update({'id':vm.profile.id}, vm.reset,
                        function () {
                            vm.alerts[0] = {'type':'success', 'msg':'Profile updated successfully'};
                            toaster.pop('success', 'Sent', 'Reset link has been sent to your mail');
                        },
                        function (response) {
                            if(response.status == 403) {
                                vm.alerts[0] = {'type':'danger', 'msg':'Profile update failed'};                            toaster.pop('success', 'Sent', 'Reset link has been sent to your mail ');
                                toaster.pop('error', 'Error', 'Failed to reset password');
                            }
                            else{
                                toaster.pop('error', 'Error', 'Failed: contact administrator');
                            }
                        }
                    );
                }
            }]);
})();
/**
 * Created by dfash on 5/23/16.
 */

(function(){
    'use strict';

    angular
        .module('app.order')
        .controller('MailController', ['$scope', 'mailFactory', '$timeout', function($scope, mailFactory, $timeout) {

            $scope.mail = {'to':{}, 'subject':'', 'cc':'', 'bcc':'',};
            $scope.content = null;

            $scope.disabled = undefined;

            $scope.alerts = [];

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.mailbox = {};

            mailFactory.contacts().query().$promise.then(
                function (response) {
                    $scope.mailbox = response;
                }
            );

            $scope.sendMail = function() {

                $scope.alerts = [];
                $scope.mailMsg = 'Please wait...';
                $scope.disabled = true;
                $scope.mail.msg = $scope.content;
                $scope.mail.to = $scope.mailbox.selected.email;

                mailFactory.mail().send($scope.mail,
                    function (response) {
                        $scope.mail = {'to':{}, 'subject':'', 'cc':'', 'bcc':''};
                        $scope.content = null;
                        $scope.disabled = false;
                        $scope.mailoutForm.$setPristine();
                        $scope.alerts[0] = {'type':'success', 'msg':'Mail sent successfully'};

                        //$timeout(doTimeOut(), 1000);
                    },
                    function (response) {
                        $scope.disabled = false;

                        if(response.status == 403) {
                            $scope.alerts[0] = {'type':'danger', 'msg':'Mail not sent'};
                        }
                        else {
                            $scope.alerts[0] = {'type':'danger', 'msg':'Error sending mail!. Contact the administrator'};
                        }

                        //$timeout(doTimeOut(), 500);
                    }
                );
            };

        }]);
})();
/**
 * Created by dfash on 5/23/16.
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .service('mailFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.mail = function () {
                return $resource(baseURL + 'mail/mailout', null, { 'send': {method:'POST'} });
            };

            this.contacts = function () {
                return $resource(baseURL + 'contacts');
            };

        }]);
})();
/**
 * Created by dfash on 6/4/16.
 */

(function(){
    'use strict';

    angular
        .module('app.order')
        .controller('PeopleUpdateController', ['$scope', 'toaster', 'userFactory', '$stateParams',
            function($scope, toaster, userFactory, $stateParams){

                var vm = $scope;

                vm.disableView = false;

                vm.account = {'firstname':'','lastname':'', 'email':'', 'password':'', 'password_confirm':'',
                    'status':0, 'roles':{}, 'permissions':{} };

                vm.alerts = [];
                vm.closeAlert = function(index) {
                    vm.alerts.splice(index, 1);
                };

                //returns registered users
                vm.account = userFactory.getUsers()
                    .get({id: parseInt($stateParams.id)}).$promise.then(
                    function (response) {
                        vm.disableView = false;
                        vm.account = response;
                        check();
                    },function (response) {

                        vm.disableView = true;

                        if(response.status == 403){
                            vm.alerts[0] = {'type':'danger', 'msg':response.data};
                        }
                        else if(response.status == 404){
                            vm.alerts[0] = {'type':'danger', 'msg': "User not found!."};
                        }
                    }
                );

                function check()
                {
                    var roles = angular.copy(vm.account.roles);
                    var permissions = angular.copy(vm.account.permissions);

                    vm.account.roles = {};
                    vm.account.permissions = {};

                    angular.forEach(roles, function (value, key) {
                        vm.account.roles[value.id] = true;
                    });

                    angular.forEach(permissions, function (value, key) {
                        vm.account.permissions[value.id] = true;
                    });
                }

                vm.submitUserForm = function() {
                    toaster.pop('wait', 'User', 'Processing your request');

                    validateRolesPerm();

                    userFactory.getUsers().update({'id': parseInt($stateParams.id)}, vm.account).$promise.then(
                        function() {
                            //vm.account = {'status':0, 'roles':{}, 'permissions':{} };
                            vm.alerts[0] = {'type':'success', 'msg':'Account successfully updated'};
                            toaster.pop('success', 'User', 'Account updated successfully');
                        },
                        function(response) {
                            if(response.status == 403) {
                                vm.alerts[0] = {'type':'danger', 'msg':response.data};
                                toaster.pop('error', response.statusText, response.data);
                            }
                            else {
                                vm.alerts[0] = {'type':'danger', 'msg':'Token mismatch... Please refresh'};
                                toaster.pop('error', response.statusText, response.data);
                            }

                        }
                    );
                };

                function validateRolesPerm() {

                    var roles = angular.copy(vm.account.roles);
                    var permissions = angular.copy(vm.account.permissions);

                    vm.account.roles = {};
                    vm.account.permissions = {};

                    angular.forEach(roles, function (value, key) {
                        if (value == true) {
                            this[key] = true;
                        }
                    }, vm.account.roles);

                    angular.forEach(permissions, function (value, key) {
                        if (value == true) {
                            this[key] = true;
                        }
                    }, vm.account.permissions);
                }

            }]);
})();

/**
 * Created by dfash on 5/21/16.
 */
(function(){
    'use strict';

    angular
        .module('app.order')
        .controller('PeopleController', ['$scope', 'toaster', 'userFactory', 'registerFactory', 'permissionFactory', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'SweetAlert',
        function($scope, toaster, userFactory, registerFactory, permissionFactory, DTOptionsBuilder, DTColumnDefBuilder, SweetAlert){

            var vm = $scope;

            //vm.search = {'roles': {'name':""}, 'permissions': {'name':""}, status:"0" };

            vm.account = {'firstname':'','lastname':'', 'email':'', 'password':'', 'password_confirm':'',
                'status':0, 'roles':{}, 'permissions':{} };
            vm.showPeople = false;
            vm.showPermissions = false;
            vm.peopleMessage = 'Loading...';

            vm.alerts = [];
            vm.closeAlert = function(index) {
                vm.alerts.splice(index, 1);
            };
            //return roles from database
            permissionFactory.getRoles().query().$promise.then(
                function(response){
                    vm.roles = response;
                }
            );

            //returns permission from database
            permissionFactory.getPermissions().query().$promise.then(
                function(response){
                    vm.permissions = response;
                }
            );

            ///////////////////

            activate();

            ////////////////

            function activate() {

                // Changing data

                //returns registered users
                userFactory.getUsers()
                    .query().$promise.then(
                    function (response) {
                        vm.people = response;
                        vm.showPeople = true;
                    },function (response) {
                        if(response.status == 403) {
                            vm.showPeople = false;
                            vm.peopleMessage = "Error: " + response.status + " " + response.statusText;
                        }
                    }
                );


                vm.dtOptions = DTOptionsBuilder.newOptions()
                    .withDisplayLength(100)
                    .withPaginationType('full_numbers');

                vm.dtColumnDefs = [
                    DTColumnDefBuilder.newColumnDef(1),
                    DTColumnDefBuilder.newColumnDef(2),
                    DTColumnDefBuilder.newColumnDef(3),
                    DTColumnDefBuilder.newColumnDef(4).notSortable()
                ];

                vm.removeUser = removeUser;

                function removeUser($index)
                {
                    //alert box for clearing cart
                    (function() {
                        SweetAlert.swal({
                            title: 'Are you sure you want to delete this user?',
                            text: 'Your will not be able to recover your selected data back!',
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'Yes, delete it!',
                            cancelButtonText: 'No, cancel pls!',
                            closeOnConfirm: false,
                            closeOnCancel: false
                        }, function(isConfirm){
                            if (isConfirm) {
                                userFactory.getUsers().delete({'id':parseInt(vm.people[$index].id)}).$promise.then(
                                    function () {
                                        vm.people.splice($index, 1);
                                        $scope.alerts[0] = {'type':'success', 'msg':'User has been deleted successfully'};
                                        SweetAlert.swal('Deleted!', 'User has been deleted.', 'success');
                                    }, function(response){
                                        if(response.status == 403) {
                                            $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                            SweetAlert.swal('Cancelled', response.data, 'error');
                                        }
                                    }
                                );
                            } else {
                                SweetAlert.swal('Cancelled', 'User data is safe :)', 'error');
                            }
                        });
                    })();
                }

            }


            vm.submitUserForm = function() {
                toaster.pop('wait', 'User', 'Processing your request');

                validateRolesPerm();

                registerFactory.register().save(vm.account,
                    function(response) {
                        vm.account = {'status':0, 'roles':{}, 'permissions':{} };
                        vm.alerts[0] = {'type':'success', 'msg':response.data};
                        toaster.pop('success', 'User', 'Account successfully created');
                    },
                    function(response) {
                        if(response.status == 403) {
                            $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                            toaster.pop('error', response.statusText, response.data);
                        }
                        else {
                            $scope.alerts[0] = {'type':'danger', 'msg':'Token mismatch... Please refresh'};
                            toaster.pop('error', response.statusText, response.data);
                        }
                    }
                );
            };

            function validateRolesPerm() {

                var roles = angular.copy(vm.account.roles);
                var permissions = angular.copy(vm.account.permissions);

                vm.account.roles = {};
                vm.account.permissions = {};

                angular.forEach(roles, function (value, key) {
                    if (value == true) {
                        this[key] = true;
                    }
                }, vm.account.roles);

                angular.forEach(permissions, function (value, key) {
                    if (value == true) {
                        this[key] = true;
                    }
                }, vm.account.permissions);
            }

        }]);
})();

/**
 * Created by dfash on 4/30/16.
 */

/**
 * Created by dfash on 4/29/16.
 */

(function() {

    'use strict';

    angular
        .module('app.order')
        .service('permissionFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.getRoles = function() {
                return $resource(baseURL + "role");
            };

            this.roleEdit = function() {
                return $resource(baseURL + "role/:id/edit", null, { 'update': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }} });
            };

            this.getPermissions = function() {
                return $resource(baseURL + "permission");
            };
        }]);
})();
/**
 * Created by dfash on 4/30/16.
 */

/**
 * Created by dfash on 4/29/16.
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('RolesController', ['$scope', '$uibModal', '$stateParams', 'rolesFactory',
            function($scope, $uibModal, $stateParams, permissionFactory) {

                $scope.showRoles = false;
                $scope.roleMessage = 'loading..';
                $scope.roleEdit = false;
                $scope.permissionEdit = false;

                $scope.roles = permissionFactory.roles().query().$promise.then(
                    function(response){
                        $scope.roles = response;
                        $scope.showRoles = true;
                    },
                    function(response) {
                        $scope.showRoles = false;
                        console.log(response);
                    }
                );

                //role modal on edit click
                $scope.editRole = function (size, role) {

                    //console.log($scope.role);
                    var modalInstance = $uibModal.open({
                        templateUrl: '/roleModal.html',
                        controller: RoleModalInstanceCtrl,
                        size: size,
                        resolve: {
                            role: function () {
                                return role;
                            }
                        }
                    });

                    //TODO: button event of the dialog
                    modalInstance.result.then(function (updatedRole) { //on closed
                        console.log('updated: ', updatedRole);
                        //TODO: update database and reload $scope.roles
                        //TODO: Flash message
                    }, function () {
                        //on cancel clicked
                    });

                    //instance of the modal dialog
                    RoleModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'role'];
                    function RoleModalInstanceCtrl($scope, $uibModalInstance, role) {

                        $scope.role = angular.copy(role);
                        $scope.title = angular.copy(role.name);

                        $scope.ok = function () {
                            $uibModalInstance.close($scope.role);
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }

                };

                $scope.editPermission = function (size, role) {

                    var modalInstance = $uibModal.open({
                        templateUrl: '/permissionModal.html',
                        controller: PermissionModalInstanceCtrl,
                        size: size,
                        resolve: {
                            role: function () {
                                return role;
                            }
                        }
                    });

                    //TODO: button event of the dialog
                    modalInstance.result.then(function (updatedPerm) { //on closed
                        //TODO: update database with the new permission
                        //TODO: Flash message
                    }, function () {
                        //on cancel clicked
                    });

                    //instance of the modal dialog
                    PermissionModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance','permissionFactory', 'role'];
                    function PermissionModalInstanceCtrl($scope, $uibModalInstance, rolesFactory, role) {

                        $scope.role = angular.copy(role);
                        $scope.permMessage = 'loading...';
                        $scope.showPermissions = false;

                        $scope.permissions = rolesFactory.roles().query().$promise.then(
                            function(response){
                                $scope.permissions = response;
                                $scope.showPermissions = true;
                            },
                            function(response) {
                                $scope.showPermissions = false;
                                $scope.permMessage  = response.statusText;
                            }
                        );

                        $scope.ok = function () {
                            $uibModalInstance.close('close');
                        };

                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };
                    }

                };


            }]);
})();
/**
 * Created by dfash on 5/3/16.
 */

(function(){
    'use strict';

    angular
        .module('app.order')
        .service('productFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.getProducts = function(){
                return $resource(baseURL + "product/:id", null, null);
            };

            //this.clientUpdate = function(){
            //    return $resource(baseURL + "client/:id/edit", null, { 'update': {method:'POST'} });
            //};
            //
            //this.client = function() {
            //    return $resource(baseURL + '/client/:id', null, { 'save':{method:'POST'}});
            //};

        }]);
})();

/**
 * Created by dfash on 6/13/16.
 */

(function () {
    'use strict';

    angular
        .module('app.order')
        .controller('RecoverPasswordController', ['$scope', 'userFactory', '$state', '$stateParams',
            function($scope, userFactory, $state, $stateParams) {

                var vm = $scope;

                vm.recover = {email:''};

                vm.disableView = false;

                if($state.is('page.change')) {
                    vm.recover.email = $stateParams.e;
                    vm.recover.token = $stateParams.m;
                }

                vm.submitRecoverForm = function() {
                    vm.showSuccess = false;
                    vm.showError = false;
                    vm.disableView = true;
                    //posts data to the server vm.register
                    userFactory.recover().confirm(vm.recover).$promise.then(
                        function() {
                            vm.disableView = false;
                            vm.showSuccess = true;
                            vm.showError = false;
                            vm.authMsg = "Reset link has been sent to your email.";
                            vm.recover = {email:''};
                            vm.registerForm.$setPristine();
                        },
                        function (response) {
                            if(response.status == 403) {
                                vm.showSuccess = false;
                                vm.showError = true;
                                vm.disableView = false;
                                vm.authMsg = response.data;
                            }
                        }
                    )
                };

                vm.submitChangePwd = function() {
                    vm.showSuccess = false;
                    vm.showError = false;
                    vm.disableView = true;
                    userFactory.recover().change(vm.recover).$promise.then(
                        function() {
                            vm.disableView = false;
                            vm.showSuccess = true;
                            vm.showError = false;
                            vm.authMsg = "Password successfully changed.";
                            vm.recover = {};
                            vm.changePwdForm.$setPristine();
                        },
                        function(response) {
                            if(response.status == 403) {
                                vm.showSuccess = false;
                                vm.showError = true;
                                vm.disableView = false;
                                vm.authMsg = response.data;
                            }
                        }
                    );
                }
            }]);
})();
/**
 * Created by dfash on 5/3/16.
 */

/**
 * Created by dfash on 4/29/16.
 */

(function(){
    'use strict';

    angular
        .module('app.order')
        .service('userFactory', ["$http", "$resource", "baseURL", "$q", function($http, $resource, baseURL, $q) {

            //check if user [register|generate...] == permissions
            this.userCan = function($slug){
                return $http
                    .get(baseURL + "user/can/"+ $slug)
                    .then(function() {
                        return $q.resolve();
                    }, function () {
                        return $q.reject();
                    }
                );
            };

            //check if user is [admin|marketer|....] == roles
            this.userIs = function($slug){
                return $http
                    .get(baseURL + "user/is/"+ $slug)
                    .then(function() {
                        return $q.resolve();
                    }, function () {
                        return $q.reject();
                    }
                );
            };

            //get all user or get usr by id
            this.getUsers = function(){
                return $resource(baseURL + "user/:id", null, {
                    'update':{
                        method:'PUT',
                        headers: { 'X-Requested-With' :'XMLHttpRequest' }
                    },
                    'delete':{method:"DELETE"}
                });
            };

            this.userUpdate = function(){
                return $resource(baseURL + "user/:id/edit", null, { 'save': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }} });
            };

            //get all marketers
            this.marketers = function() {
                return $resource(baseURL + "user/marketers");
            };

            //check and send a confirmation email for recovery
            this.recover = function() {
                return $resource(baseURL + "user/recover", null, {
                    'confirm': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'change': {method:'PUT', headers: { 'X-Requested-With' :'XMLHttpRequest' }} });
            };


        }]);
})();

/**
 * Created by dfash on 5/21/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('UserModelController', ['$scope', 'loginFactory', function($scope, loginFactory) {
            //$scope.logout = function() {
            //    loginFactory.logout();
            //};
        }]);
})();