/**
 * Created by dfash on 5/27/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('TargetController', ['$scope', 'userFactory', 'targetFactory', '_token',
            function($scope, userFactory, targetFactory, _token) {

                $scope.tab = 1;

                $scope.target = { '_token': _token.data};
                //
                $scope.isSelected = function (checkTab) {
                    return ($scope.tab === checkTab);
                };

                $scope.select = function(setTab) {
                    $scope.tab = setTab;

                };

                $scope.marketers = userFactory.marketers()
                    .query().$promise.then(
                    function (response) {
                        $scope.marketers = response;
                    }, function (response) {
                    }
                );

                $scope.alerts = [];
                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };

                $scope.submitTarget = function(form) {
                    if(angular.isDefined($scope.target.id))
                    {
                        targetFactory.getTargets().update({'id':parseInt($scope.target.id)}, $scope.target).$promise.then(
                            function () {
                                $scope.alerts[0] = {'type':'success', 'msg':'Target saved successfully'};
                                $scope.target = { '_token': _token.data};
                                form.$setPristine();
                            }, function(){
                                $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                            }
                        );
                    }
                    else {
                        targetFactory.target().save($scope.target,
                            function () {
                                $scope.alerts[0] = {'type':'success', 'msg':'Target saved successfully'};
                                $scope.target = { '_token': _token.data};
                                form.$setPristine();
                            }, function(){
                                $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                            }
                        );
                    }
                };

                activateDate();
                //date module
                function activateDate() {
                    $scope.today = function () {
                        $scope.dt = new Date();
                    };

                    $scope.today();

                    $scope.clear = function () {
                        $scope.dt = null;
                    };

                    // Disable weekend selection
                    $scope.disabled = function (date, mode) {
                        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
                    };

                    $scope.toggleMin = function () {
                        $scope.minDate = $scope.minDate ? null : new Date();
                    };
                    $scope.toggleMin();

                    $scope.open = function ($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        $scope.opened = true;
                    };

                    $scope.dateOptions = {
                        formatYear: 'yy',
                        startingDay: 1
                    };

                    $scope.initDate = new Date('2019-10-20');
                    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                    $scope.format = $scope.formats[0];
                }

            }]);
})();