/**
 * Created by dfash on 9/29/16.
 */

(function () {
    'use strict';

    angular
        .module('app.order')
        .service('couponFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
            this.code = function() {
                return $resource(baseURL + 'promocode/generate', null, {'generate':{method:'POST'}});
            }
        }]);
})();