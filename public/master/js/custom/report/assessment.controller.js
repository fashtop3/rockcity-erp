/**
 * Created by dfash on 6/22/16.
 */

(function() {
    angular
        .module('app.order')
        .controller('AssessmentController', ['$scope', '$rootScope', function($scope, $rootScope) {

            var vm = $scope;

            vm.partOne = { personal:{ date_confirm: {date:'', opened:false}, appraisal_date: {date:'', opened:false} },
                qualifications:[{date:'', opened:false},{date:'', opened:false},{date:'', opened:false},{date:'', opened:false}] };

            vm.partTwo = { review:[{}], performance:{}};
            vm.partThree = {competencies:{}};

            vm.supervisor = {};

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