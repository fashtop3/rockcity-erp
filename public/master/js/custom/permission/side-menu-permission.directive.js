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
                    console.log('Linking....');
                }
            }
        });
})();