/**
 * Created by dfash on 6/1/16.
 */

(function () {
    angular
        .module('app.order')
        .service('targetFactory', ['$resource', 'baseURL', function($resource, baseURL) {
            this.target = function() {
                return $resource(baseURL + "target", null, {'save':{method:"POST", headers: { 'X-Requested-With' :'XMLHttpRequest' }}});
            };

            this.getTargets = function() {
                return $resource(baseURL + "target/:id", null, {
                    'update':{method:"PUT", headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'save':{method:"POST", headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                    'delete':{method:"DELETE"}
                });
            };

            this.getMyTargets = function() {
                return $resource(baseURL + "target/:id/user");
            };

        }]);
})();