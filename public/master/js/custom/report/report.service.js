/**
 * Created by dfash on 6/1/16.
 */

(function () {
    angular
        .module('app.order')
        .service('reportFactory', ['$resource', 'baseURL', function($resource, baseURL) {

            this.files = [];
            this.errorFiles = [];
            this.uploadedFiles = [];

            this.appendUpload = function (filename) {
                this.uploadedFiles[this.uploadedFiles.length] = filename;

            };

            this.report = function() {
                return $resource(baseURL + 'report', null, {
                    'save': {method:'POST', headers: { 'X-Requested-With' :'XMLHttpRequest' }}
                });
            };

            this.getReports = function() {
                return $resource(baseURL + 'admin/staff-reps');
            }

        }]);
})();