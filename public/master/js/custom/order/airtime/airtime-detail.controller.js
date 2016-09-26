/**
 * Created by dfash on 6/11/16.
 */

(function () {
    angular
        .module('app.order')
        .controller('AirtimeDetailController', ['$scope', '$stateParams', 'airtimeFactory', '$state', '$rootScope',
            function($scope, $stateParams, airtimeFactory, $state, $rootScope) {

                //collapse the menu bar
                $rootScope.app.layout.isCollapsed = true;

                var vm = $scope;

                airtime();
                activate();


                ////////////////
                //

                vm.manage = {};


                $scope.alerts = [];
                $scope.closeAlert = function(index) {
                    $scope.alerts.splice(index, 1);
                };

                function airtime() {
                    vm.schedule = airtimeFactory.getAirtime().get({'id': parseInt($stateParams.id)}).$promise.then(
                        function (response) {
                            vm.schedule = response.schedule;
                            vm.prog_time = response.prog_time;
                            vm.manage.validate = vm.schedule.schedule_alert.validate;
                            vm.manage.recommend = vm.schedule.schedule_alert.recommend;
                            vm.manage.approved = vm.schedule.schedule_alert.approved;
                            vm.manage.programme = vm.schedule.schedule_alert.programme;
                        },
                        function() {
                            $state.go('app.airtime');
                        }
                    );
                }


                vm.prog_time = "";
                vm.progStartTime = function ($period) {
                    return new Date(vm.prog_time[$period + '_start']);
                };
                vm.progEndTime = function ($period) {
                    return new Date(vm.prog_time[$period + '_end']);
                };

                function activate() {

                    vm.airtimeRecommend = function() {
                        if(!(vm.manage.validate)) {
                            vm.manage.recommend = false;
                            return true;
                        }
                        return false;
                    };

                    vm.airtimeApproved = function() {
                        if(!(vm.manage.validate && vm.manage.recommend)) {
                            vm.manage.approved = false;
                            return true;
                        }
                        return false;
                    };

                    vm.airtimeProgramme = function () {

                        if(!(vm.manage.validate && vm.manage.recommend && vm.manage.approved)) {
                            vm.manage.programme = false;
                            return true;
                        }

                        return false;

                    };

                    vm.validateSchedule = function() {
                        $scope.alerts = [];
                        airtimeFactory.validateAirtime().save({'id': vm.schedule.schedule_alert.id}, vm.manage).$promise.then(
                            function(response) {
                                airtime();
                                $scope.alerts[0] = {'type':'success', 'msg':'Airtime has been validated'};
                            },
                            function(response) {
                                if(response.status == 403) {
                                    $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                }
                                if(response.status == 422) {
                                    $scope.alerts[0] = {'type':'warning', 'msg':response.data};
                                }
                            }
                        )
                    };

                    vm.recommendSchedule = function() {
                        $scope.alerts = [];
                        airtimeFactory.recommendAirtime().save({'id': vm.schedule.schedule_alert.id}, vm.manage).$promise.then(
                            function(response) {
                                airtime();
                                $scope.alerts[0] = {'type':'success', 'msg':'Airtime successfully recommended for approval'};
                            },
                            function(response) {
                                if(response.status == 403) {
                                    $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                }
                                if(response.status == 422) {
                                    $scope.alerts[0] = {'type':'warning', 'msg':response.data};
                                }
                            }

                        )
                    };

                    vm.approveSchedule = function() {
                        $scope.alerts = [];
                        airtimeFactory.approveAirtime().save({'id': vm.schedule.schedule_alert.id}, vm.manage).$promise.then(
                            function(response) {
                                airtime();
                                $scope.alerts[0] = {'type':'success', 'msg':'Airtime successfully approved for programme'};
                            },
                            function(response) {
                                if(response.status == 403) {
                                    $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                }
                                if(response.status == 422) {
                                    $scope.alerts[0] = {'type':'warning', 'msg':response.data};
                                }
                            }

                        )
                    };

                    vm.programmeSchedule = function() {
                        $scope.alerts = [];
                        airtimeFactory.programmeAirtime().save({'id': vm.schedule.schedule_alert.id}, vm.manage).$promise.then(
                            function(response) {
                                airtime();
                                $scope.alerts[0] = {'type':'success', 'msg':'Airtime saved for programme'};
                            },
                            function(response) {
                                if(response.status == 403) {
                                    $scope.alerts[0] = {'type':'danger', 'msg':response.data};
                                }
                                if(response.status == 422) {
                                    $scope.alerts[0] = {'type':'warning', 'msg':response.data};
                                }
                            }

                        )
                    };

                }
            }]);
})();