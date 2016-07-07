/**
 * Created by dfash on 7/7/16.
 */

(function(){
    'use strict';

    angular
        .module('app.order')
        .service('assessmentService', ['$resource', 'baseURL', function($resource, baseURL) {

            this.assessment = function() {
                return $resource(baseURL + 'assessment', null,
                    {
                        "save": {method: 'POST',  headers: { 'X-Requested-With' :'XMLHttpRequest', 'Content-Type': 'application/json'}},
                        "update": {method:"PUT", headers: { 'X-Requested-With' :'XMLHttpRequest', 'Content-Type': 'application/json' }},
                        "delete": {method:"DELETE", headers: { 'X-Requested-With' :'XMLHttpRequest', 'Content-Type': 'application/json' }}
                    }
                )
            }

        }]);
})();