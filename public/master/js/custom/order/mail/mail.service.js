/**
 * Created by dfash on 5/23/16.
 */

(function() {
    'use strict';

    angular
        .module('app.order')
        .service('mailFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.mail = function () {
                return $resource(baseURL + 'mail/mailout', null, { 'send': {method:'POST'} });
            };

            this.contacts = function () {
                return $resource(baseURL + 'contacts');
            };

        }]);
})();