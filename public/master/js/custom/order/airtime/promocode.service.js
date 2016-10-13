/**
 * Created by dfash on 9/28/16.
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .service('promocodeFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
            this.getReward = function() {
                return $resource(baseURL + 'promocode/reward?action=:a&code=:c');
            }
        }]);
})();