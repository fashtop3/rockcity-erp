/**
 * Created by dfash on 6/10/16.
 */

(function() {
    'use strict';

    angular
        .module('app.routes')
        .run(['$rootScope', '$state', 'loginFactory', 'userFactory', '$location', '$injector',
            function ($rootScope, $state, loginFactory, userFactory, $location, $injector) {


                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                    if (toState.data.authenticate) {
                        loginFactory.toState = toState; //intending state
                        if(!loginFactory.getUserStatus()) {
                            loginFactory.redirect();
                            event.preventDefault();
                        }

                        loginFactory.authCheck().then(
                            function () {
                                userFactory.loadPermissions(); //load permissions

                                if (toState.name == 'page.login') {

                                    if (fromState.name != '') {
                                        $state.go(fromState.name);//return state
                                    }
                                    else {
                                        $state.go('app.dashboard');//go to default state
                                    }
                                    event.preventDefault();
                                }

                                if(toState.name == 'app.unauthorized' && fromState.name == '') {
                                    $state.go('app.dashboard');
                                }
                            }
                            ,
                            function () {
                                if(!$state.is('page.login'))
                                    loginFactory.redirect();
                                event.preventDefault();
                            }
                        );
                    }//endif

                    //if toState requires authenticate and user is not logged in
                    //if (toState.data.authenticate) {
                    //    if(!loginFactory.getUserStatus()) {
                    //        //save anticipated state
                    //        loginFactory.toState = toState;
                    //
                    //        $state.transitionTo('page.login');
                    //        event.preventDefault();
                    //    }
                    //
                    //    //var $state = $injector.get("$state");
                    //    //handle when user refreshes unauthorized page
                    //    if(toState.name == 'app.unauthorized' && fromState.name == '') {
                    //        $state.go('app.dashboard');
                    //    }
                    //
                    //}





                    //if toState is 'page.login' And user is already logged in
                    //if (toState.name == 'page.login' && loginFactory.getUserStatus()) {
                    //
                    //    if (fromState.name != '') {
                    //        $state.go(fromState.name);//return state
                    //    }
                    //    else {
                    //        $state.go('app.dashboard');//go to default state
                    //    }
                    //    event.preventDefault();
                    //}


                });

            }])
})();