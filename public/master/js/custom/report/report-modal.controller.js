/**
 * Created by dfash on 7/27/16.
 */
(function() {
    'use strict';

    angular
        .module('app.order')
        .controller('ReportModalController', ModalController);

    ModalController.$inject = ['$uibModal'];
    function ModalController($uibModal) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            vm.open = function (modalTitle, subReport) {

                var modalInstance = $uibModal.open({
                    templateUrl: 'app/template/rpt-modal-temp.html',
                    controller: ModalInstanceCtrl,
                    resolve: angular.extend({
                        title: function() { return modalTitle; },
                        subReportArr: function() { return subReport; }
                    })
                });

                var state = $('#modal-state');
                modalInstance.result.then(function () {
                    state.text('Modal dismissed with OK status');
                }, function () {
                    state.text('Modal dismissed with Cancel status');
                });
            };

            // Please note that $uibModalInstance represents a modal window (instance) dependency.
            // It is not the same as the $uibModal service used above.

            ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'subReportArr', 'title'];
            function ModalInstanceCtrl($scope, $uibModalInstance, subReportArr, title) {

                $scope.modalTitle = title;
                $scope.reportArr = angular.copy(subReportArr);

                $scope.startDate = function(date) {
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
