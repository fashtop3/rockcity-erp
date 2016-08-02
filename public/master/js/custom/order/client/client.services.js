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