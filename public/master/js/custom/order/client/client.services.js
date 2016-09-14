/**
 * Created by dfash on 4/29/16.
 */

(function(){
    'use strict';

    angular
        .module('app.order')
        .service('clientFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.getAllClients = function(){
                return $resource(baseURL + "admin/clients");
            };

            this.update = function(){
                return $resource(baseURL + "client/:id/edit", null, {
                    'save': {method:'PUT', headers: { 'X-Requested-With' :'XMLHttpRequest' }}
                });
            };

            this.clients = function() {
                return $resource(baseURL + 'client/:id', null, {
                    'save':{method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'delete':{method:'DELETE', headers: { 'X-Requested-With' :'XMLHttpRequest' }}
                });
            };

        }]);
})();