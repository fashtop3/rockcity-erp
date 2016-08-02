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
                        "save": {method: 'POST',  headers: { 'X-Requested-With' :'XMLHttpRequest'}},
                        "update": {method:"PUT", headers: { 'X-Requested-With' :'XMLHttpRequest'}}
                    }
                )
            };

            this.getAssessment = function() {
                return $resource(baseURL + 'assessment/:id', null,
                    {
                        'save': {method:'PUT', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                        "delete": {method:"DELETE", headers: { 'X-Requested-With' :'XMLHttpRequest' }}
                    }
                );
            };

            this.supervisor = function() {
                return $resource(baseURL + 'supervisor', null,
                    {
                        "save": {method: 'POST',  headers: { 'X-Requested-With' :'XMLHttpRequest'}},
                        "update": {method:"PUT", headers: { 'X-Requested-With' :'XMLHttpRequest'}}
                    }
                )
            };

            this.getConfig = function() {
                return $resource(baseURL + 'assessconfig/:id', null,
                    {
                        'save': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                        'update': {method:'PUT', headers: { 'X-Requested-With' :'XMLHttpRequest' }},
                        "delete": {method:"DELETE", headers: { 'X-Requested-With' :'XMLHttpRequest' }}
                    }
                );
            };

            this.getActiveConfig = function() {
                return $resource(baseURL + 'activeconfig');
            };

            this.log = function() {
                return $resource(baseURL + "assessment/records/:id");
            };

        }]);
})();