/**
 * Created by dfash on 7/27/16.
 */
(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('DriverReportModalController', ModalController);

    ModalController.$inject = ['$uibModal'];
    function ModalController($uibModal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            vm.open = function (report) {

                var modalInstance = $uibModal.open({
                    templateUrl: 'app/template/driver-rpt-modal-temp.html',
                    controller: ModalInstanceCtrl,
                    resolve: angular.extend({
                        report: function() { return report; }
                    })
                });

                var state = $('#modal-state');
                modalInstance.result.then(function () {
                }, function () {
                });
            };

            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'report'];
            function ModalInstanceCtrl($scope, $uibModalInstance, report) {

                $scope.report = report;

                $scope.stringtodate = function(date) {
                    return new Date(date);
                };

                $scope.isTitle = function(mod) {
                    return mod == title;
                };

                $scope.ok = function () {
                    $uibModalInstance.close('closed');
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        }
    }

})();
