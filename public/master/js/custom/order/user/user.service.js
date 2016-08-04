/**
 * Created by dfash on 4/29/16.
 */

(function(){
    'use strict';

    angular
        .module('app.order')
        .service('userFactory', function($http, $resource, baseURL, $q) {

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


        });
})();
