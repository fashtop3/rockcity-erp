/**
 * Created by dfash on 6/7/16.
 */

(function () {
    angular
        .module('app.order')
        .service('airtimeFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.order = function () {
                return $resource(baseURL + 'airtime', null, {'save':{'method':'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}})
            };

            this.getAirtime = function () {
                return $resource(baseURL + 'airtime/:id');
            };

            this.validateAirtime = function () {
                return $resource(baseURL + 'airtime/:id/validate', null, {'save':{'method': 'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}});
            };

            this.recommendAirtime = function () {
                return $resource(baseURL + 'airtime/:id/recommend', null, {'save':{'method': 'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}});
            };

            this.approveAirtime = function () {
                return $resource(baseURL + 'airtime/:id/approve', null, {'save':{'method': 'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}});
            };

            this.programmeAirtime = function () {
                return $resource(baseURL + 'airtime/:id/programme', null, {'save':{'method': 'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}});
            };

        }]);
})();