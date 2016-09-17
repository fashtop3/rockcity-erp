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
                vm.permissions = [];
                vm.roles = [];

                this.loadPermissions = function() {
                    $http.get(baseURL + "user/permissions").then(
                        function(response) {
                            vm.permissions = response.data.permissions;
                            vm.roles = response.data.roles;

                            //// kick-off router and start the application rendering
                            //$urlRouter.sync();
                            //// Also enable router to listen to url changes
                            //$urlRouter.listen();
                        }, function () {
                            vm.permissions = [];
                            vm.roles = [];
                        });
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
