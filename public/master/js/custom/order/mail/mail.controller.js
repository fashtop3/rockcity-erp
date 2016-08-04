/**
 * Created by dfash on 5/23/16.
 */

(function(){
    'use strict';

    angular
        .module('app.order')
        .controller('MailController', ['$scope', 'mailFactory', '$timeout', function($scope, mailFactory, $timeout) {

            $scope.mail = {'to':{}, 'subject':'', 'cc':'', 'bcc':'',};
            $scope.content = null;

            $scope.disabled = undefined;

            $scope.alerts = [];

            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.mailbox = {};

            mailFactory.contacts().query().$promise.then(
                function (response) {
                    $scope.mailbox = response;
                }
            );

            $scope.sendMail = function() {

                $scope.alerts = [];
                $scope.mailMsg = 'Please wait...';
                $scope.disabled = true;
                $scope.mail.msg = $scope.content;
                $scope.mail.to = $scope.mailbox.selected.email;

                mailFactory.mail().send($scope.mail,
                    function (response) {
                        $scope.mail = {'to':{}, 'subject':'', 'cc':'', 'bcc':''};
                        $scope.content = null;
                        $scope.disabled = false;
                        $scope.mailoutForm.$setPristine();
                        $scope.alerts[0] = {'type':'success', 'msg':'Mail sent successfully'};

                        //$timeout(doTimeOut(), 1000);
                    },
                    function (response) {
                        $scope.disabled = false;

                        if(response.status == 403) {
                            $scope.alerts[0] = {'type':'danger', 'msg':'Mail not sent'};
                        }
                        else {
                            $scope.alerts[0] = {'type':'danger', 'msg':'Error sending mail!. Contact the administrator'};
                        }

                        //$timeout(doTimeOut(), 500);
                    }
                );
            };

        }]);
})();