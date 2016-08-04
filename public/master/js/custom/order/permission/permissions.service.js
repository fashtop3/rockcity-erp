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