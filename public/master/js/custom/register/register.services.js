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