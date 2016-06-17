/**
 * Created by dfash on 5/30/16.
 */

(function () {
    angular
        .module('app.order')
        .service('tokenService', ['$http', 'baseURL', '$q', function ($http, baseURL, $q) {

            this.get = function () {
                return $http.get(baseURL + 'csrf').then(
                    function (response) {
                        return response.data;
                    },
                    function (response) {
                        return response;
                    }
                );
            }
        }])
})();