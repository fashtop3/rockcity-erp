/**
 * Created by dfash on 5/27/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('ReportController', ['$scope', 'reportFactory', 'targetFactory', 'vehicleFactory',
            function($scope, reportFactory, targetFactory, vehicleFactory) {

                $scope.tab = 1;
                $scope.tasks = [{}];
                $scope.challenges = [{}];
                $scope.remittances = [{}];
                $scope.vehicles = [{}];

                $scope.targets = targetFactory.getMyTargets().query().$promise.then(
                    function (response) {
                        $scope.targets = response;
                    }
                );

                $scope.motors = vehicleFactory.vehicles().query().$promise.then(
                    function (response) {
                        $scope.motors = response;
                    }
                );

                $scope.closeAll = function(objArray) {
                    objArray.splice(1);
                };

                $scope.closeField = function(index, objArray) {
                    objArray.splice(index, 1);
                };

                $scope.addField = function(objArray) {
                    objArray.push({});
                };

                //
                $scope.isSelected = function (checkTab) {
                    return ($scope.tab === checkTab);
                };

                $scope.select = function(setTab) {
                    $scope.tab = setTab;
                };

                $scope.submitReport = function (form) {

                    var myReport = {"tasks": $scope.tasks, "challenges": $scope.challenges,
                        "remittances": $scope.remittances, "vehicles": $scope.vehicles,
                        "uploadedFiles": reportFactory.uploadedFiles
                    };

                    reportFactory.report().save(myReport,
                        function () {

                            $scope.tasks = [{}];
                            $scope.challenges = [{}];
                            $scope.remittances = [{}];
                            $scope.vehicles = [{}];
                            reportFactory.uploadedFiles = [];
                            reportFactory.files = [];
                            $scope.tab = 1;
                            form.$setPristine();
                        }, function () {

                        }
                    );
                    form.$setPristine();
                }

            }]);
})();