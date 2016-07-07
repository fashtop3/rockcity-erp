/**
 * Created by dfash on 6/22/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('AssessmentController', ['$scope', 'toaster', 'assessmentService',
            function($scope, toaster, assessmentService) {

            var vm = $scope;

            vm.partOne = { "personal":{ "date_confirm": {"date":'', "opened":false}, "appraisal_date": {"date":'', "opened":false} },
                "qualifications":[{"date":'', "opened":false},{"date":'', "opened":false},{"date":'', "opened":false},{"date":'', "opened":false}] };

            vm.partTwo = { "review":[{}], "performance":{}};
            vm.partThree = {"competencies":{}};

            vm.supervisor = {"attributes":{}, "habit":{}, "leadership":{}};


            //submit form
            vm.submitAssessment = function() {

                var data = {"partOne":vm.partOne, "partTwo":vm.partTwo, "partThree":vm.partThree};

                toaster.pop('wait', 'Assessment', 'Processing your request');

                assessmentService.assessment().save(data,
                    function () {
                        toaster.pop('success', 'Assessment', 'Data saved.');
                        //Todo: assessment records
                        //$timeout(function(){
                        //    $state.go('app.client');
                        //}, 500);
                    },
                    function (response) {
                        if(response.status == 403) {
                            vm.alerts[0] = {'type':'danger', 'msg':response.data};
                            toaster.pop('error', 'Assessment', 'Data submission Failed.');
                        }
                    }
                );
            };

            //START-DATE functions
            vm.today = function() {
                vm.dt = new Date();
            };
            vm.today();

            vm.clear = function () {
                vm.dt = null;
            };

            // Disable weekend selection
            vm.disabled = function(date, mode) {
                return false;
                //return ( mode === 'day' && ( date.getDay() === 0 /*|| date.getDay() === 6*/ ) );
            };

            vm.toggleMin = function() {
                vm.minDate = vm.minDate ? null : new Date();
            };
            vm.toggleMin();

            vm.open = function($event, dateObj) {
                $event.preventDefault();
                $event.stopPropagation();

                dateObj.opened = true;
            };

            vm.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            vm.initDate = new Date('2019-10-20');
            vm.dateFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            vm.dateFormat = vm.dateFormats[0];
        //END: Date functions
        }]);
})();