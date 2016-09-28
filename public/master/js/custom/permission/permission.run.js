/**
 * Created by dfash on 6/9/16.
 */

(function () {
    angular
        .module('app.core')
        .run(permissionRun);

    permissionRun.$inject = ['userFactory', 'PermissionStore', 'RoleStore', '$urlRouter', '$http'];
    function permissionRun(userFactory, PermissionStore, RoleStore, $urlRouter, $http){
        //PermissionStore
        //    .definePermission('create.airtime', function () {
        //        return userFactory.userCan('approve.airtime');
        //    });
        //

        // Example ajax call
            $http({
                method: 'GET',
                url: '/api/permission/controls',
                headers: { 'permission-controls' : true }
            })
                //.get('/api/permission/controls')
                .then(function (permissions) {
                    //console.log(permissions);
                    // Use RoleStore and PermissionStore to define permissions and roles
                    angular.forEach(permissions.data.permissions, function ($permission) {
                        //console.log($permission.slug);
                        PermissionStore.definePermission($permission.slug, function () {
                            //console.log($permission.slug);
                            return userFactory.userCan($permission.slug);
                        })
                    });

                    //save roles
                    angular.forEach(permissions.data.roles, function ($roles) {
                        RoleStore.defineRole($roles.slug, function () {
                            //console.log($roles.slug);
                            return userFactory.userIs($roles.slug);
                        })
                    });
                    // or even set up whole session
                })
                .then(function () {

                    //console.log(PermissionStore.getStore());
                    //console.log(RoleStore.getStore());

                    // Once permissions are set-up
                    // kick-off router and start the application rendering
                    userFactory.loadPermissions().then(
                        function(){
                            $urlRouter.sync();
                            // Also enable router to listen to url changes
                            $urlRouter.listen();
                        },
                        function(){
                            $urlRouter.sync();
                            // Also enable router to listen to url changes
                            $urlRouter.listen();
                        }
                    );

                });
    }


})();