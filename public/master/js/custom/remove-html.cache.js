/**
 * Created by dfash on 9/11/16.
 * Remove all cached templates from the browser
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .run(['$rootScope', '$templateCache', function($rootScope, $templateCache) {
            $rootScope.$on('$viewContentLoaded', function() {
                //$templateCache.removeAll();
            });
        }]);
})();