(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope', '$scope', '$cookies'];
    function UserBlockController($rootScope, $scope, $cookies) {

        activate();

        ////////////////


        function activate() {

            var profile = angular.fromJson($cookies.get('auth'));

            $rootScope.user = {
                name:     profile.lastname,
                job:      'Administrator',
                picture:  'app/img/user/04.jpg',
            };

            // Hides/show user avatar on sidebar
            $rootScope.toggleUserBlock = function(){
                $rootScope.$broadcast('toggleUserBlock');
            };

            $rootScope.userBlockVisible = true;

            var detach = $rootScope.$on('toggleUserBlock', function(/*event, args*/) {

                $rootScope.userBlockVisible = ! $rootScope.userBlockVisible;

            });

            $scope.$on('$destroy', detach);
        }
    }
})();
