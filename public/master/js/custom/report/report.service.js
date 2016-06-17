/**
 * Created by dfash on 6/1/16.
 */

(function () {
    angular
        .module('app.order')
        .service('reportFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.report = function() {
                return $resource(baseURL + 'report', null, {
                    'save': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}
                });
            }

        }]);
})();