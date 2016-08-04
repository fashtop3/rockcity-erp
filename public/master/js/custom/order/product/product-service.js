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
