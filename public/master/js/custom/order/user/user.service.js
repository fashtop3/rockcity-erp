/**
 * Created by dfash on 4/29/16.
 */

(function(){
    'use strict';

    angular
        .module('app.order')
        .service('userFactory', ['$urlRouter', '$http', '$resource', 'baseURL', '$q',
            function($urlRouter, $http, $resource, baseURL, $q) {

                var vm = this;
                vm.permissions = []; // ["create.airtime", "edit.airtime", "approve.airtime", "validate.airtime", "deny.airtime", "recommend.approval", "programme.airtime", "view.verified.staff", "generate.airtime", "programmes.airtime.approved", "verify.staff", "view.remittance", "view.report", "generate.report", "manage.target", "manage.vehicle", "register.staff"];
                vm.roles = [];//["admin", "traffic", "executive.director", "ict", "marketing", "accounting", "administration.dept", "programmes.dept", "head.accounting", "head.marketing", "news", "engineering", "driver", "staff", "supervisor"];

                this.loadPermissions = function(req) {
                    var deferred = $q.defer();
                    $http.get(baseURL + "user/permissions").then(
                        function(response) {
                            vm.permissions = response.data.permissions;
                            vm.roles = response.data.roles;
                            deferred.resolve(response);
                        }, function (response) {
                            vm.permissions = [];
                            vm.roles = [];
                            deferred.reject(response);
                        });

                    return deferred.promise;
                };

                this.userCan = function($slug) {
                    if(this.permissions.indexOf($slug) != -1)
                        return true;

                    return false;
                };

                this.userIs = function($slug){
                    if(this.roles.indexOf($slug) != -1)
                        return true;

                    return false;
                };

                this.adminUserUpdate = function() {
                    return $resource(baseURL + "admin/user/:id", null, {'update':{ method:'PUT'}});
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
                //
                //this.userUpdate = function(){
                //    return $resource(baseURL + "user/:id/edit", null, { 'save': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }} });
                //};

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


            }]);
})();
