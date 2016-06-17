/**
 * Created by dfash on 5/27/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('ReportController', ['$scope', 'reportFactory', 'targetFactory', 'vehicleFactory',
            function($scope, reportFactory, targetFactory, vehicleFactory) {

                $scope.tab = 4;
                $scope.tasks = [{}];
                $scope.challenges = [{}];
                $scope.remittances = [{}];
                $scope.vehicles = [{}];
                $scope.uploads = [{}];

                //$scope.uploadFile = function(){
                //    var file = $scope.myFile;
                //    console.log('file is ' );
                //    console.dir(file);
                //    var uploadUrl = "/fileUpload";
                //    fileUpload.uploadFileToUrl(file, uploadUrl);
                //};

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

                    var myReport = {'tasks': $scope.tasks, 'challenges': $scope.challenges,
                        'remittances': $scope.remittances, 'vehicles': $scope.vehicles
                    };

                    reportFactory.report().save(myReport,
                        function (response) {

                            console.log(response);

                            $scope.tasks = [{}];
                            $scope.challenges = [{}];
                            $scope.remittances = [{}];
                            $scope.vehicles = [{}];

                            form.$setPristine();
                        }, function () {

                        }
                    );
                    form.$setPristine();
                }

            }]);
})();