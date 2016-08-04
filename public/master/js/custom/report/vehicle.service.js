/**
 * Created by dfash on 5/31/16.
 */

(function () {
    angular
        .module('app.order')
        .service('vehicleFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.vehicles = function() {
                return $resource(baseURL + 'vehicle/:id', null, {
                    'save': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'update':{method:'PUT', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'delete':{method:'DELETE'}
                });
            };

            this.driverReport = function() {
                return $resource(baseURL + 'driver/report/:id', null, {
                    'report': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'update':{method:'PUT', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'delete':{method:'DELETE'}
                });
            };

            this.getReports = function() {
                return $resource(baseURL + 'admin/driver-reps');
            }

        }]);
})();