/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function() {
    'use strict';

    angular
        .module('app.routes')
        .config([ '$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push('securityInterceptor');
        }])
        .provider('securityInterceptor', function() {
            this.$get = function($location, $q) {
                return function(promise) {
                    return promise.then(null, function(response) {
                        if(response.status === 403 || response.status === 401) {
                            $location.path('/unauthorized');
                        }
                        return $q.reject(response);
                    });
                };
            };
        })
        .config(routesConfig);



    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper){

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/page/login');

        //$urlRouterProvider.deferIntercept();

        //// Use instead
        //$urlRouterProvider.otherwise( function($injector) {
        //    var $state = $injector.get("$state");
        //    $state.go('/page/login');
        //});

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('privacy', {
                url: '/app/privacy',
                cache: false,
                templateUrl: 'app/pages/privacy.html',
                resolve: helper.resolveFor('loaders.css', 'spinkit', 'whirl', 'modernizr', 'icons'),
                controller: ['$rootScope', function($rootScope) {
                    $rootScope.app.layout.isBoxed = false;
                }]
            })
            .state('page', {
                url: '/page',
                data:{
                    authenticate:false
                },
                cache: false,
                templateUrl: 'app/pages/page.html',
                resolve: helper.resolveFor('loaders.css', 'spinkit', 'whirl', 'modernizr', 'icons'),
                controller: ['$rootScope', function($rootScope) {
                    $rootScope.app.layout.isBoxed = false;
                }]
            })
            .state('page.login', {
                url: '/login',
                title: 'Login',
                cache: false,
                templateUrl: 'app/pages/login.html',
                resolve: angular.extend(helper.resolveFor('loaders.css', 'spinkit', 'whirl'), {
                    '_token' : ['tokenService', function(tokenService) {
                        return tokenService.get();
                    }]
                }),
                controller: 'LoginFormController'
            })
            .state('page.register', {
                url: '/register',
                title: 'Register',
                cache: false,
                resolve: angular.extend(helper.resolveFor('loaders.css', 'spinkit', 'whirl'), {
                    '_token' : ['tokenService', function(tokenService) {
                        return tokenService.get();
                    }]
                }),
                templateUrl: 'app/pages/register.html'
            })
            .state('page.recover', {
                url: '/recover',
                title: 'Recover',
                cache: false,
                templateUrl: 'app/pages/recover.html'
            })
            .state('page.change', {
                url: '/recover/change?{e}&{m}',
                title: 'Change',
                cache: false,
                templateUrl: 'app/pages/recover-change.html'
            })
            .state('app', {
                url: '/app',
                abstract: true,
                cache: false,
                data:{
                    authenticate:true
                },
                templateUrl: helper.basepath('app.html'),
                resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl', 'oitozero.ngSweetAlert')
            })
            .state('app.dashboard', {
                url: '/dashboard',
                title: 'Dashboard',
                cache: false,
                templateUrl: helper.basepath('dashboard.html'),
                controller: 'DashboardController',
                resolve: angular.extend(helper.resolveFor('angularFileUpload', 'filestyle'), {
                    '_token' : ['tokenService', function(tokenService) {
                        return tokenService.get();
                    }]
                })
            })
            //.state('app.dashboard.profile', {
            //    url: '/profile',
            //    cache: false,
            //    templateUrl: 'app/template/profile.tpl.html',
            //    controller: 'DashboardController',
            //    resolve: helper.resolveFor('angularFileUpload', 'filestyle'),
            //})
            .state('app.dashboard.update', {
                url: '/profile/update',
                cache: false,
                templateUrl: 'app/template/profile-update.tpl.html',
                controller: 'DashboardController',
                resolve: helper.resolveFor('angularFileUpload', 'filestyle')

            })
            .state('app.dashboard.permissions', {
                url: '/permissions',
                cache: false,
                templateUrl: 'app/template/permissions.tpl.html',
                controller: 'DashboardController'
            })
            .state('app.mail', {
                url: '/mail',
                title: 'Mail',
                cache: false,
                templateUrl: helper.basepath('mail.html'),
                resolve: helper.resolveFor('ngWig', 'ui.select'),
                controller: 'MailController'
            })
            .state('app.sms', {
                url: '/sms',
                title: 'Sms',
                cache: false,
                templateUrl: helper.basepath('sms.html')
            })
            .state('app.people', {
                url: '/people',
                title: 'People',
                data: {
                    permissions: {
                        only: ["executive.director", "administration.dept", "admin"], //"view.verified.staff"
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                templateUrl: helper.basepath('people.html')
                //controller:"PeopleController"
            })
            .state('app.people.adduser', {
                url: '/create',
                data: {
                    permissions: {
                        only: 'register.staff',
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                title: 'People',
                templateUrl: helper.basepath('people-adduser.html'),
                controller:'PeopleController'
            })
            .state('app.people.edit', {
                url: '/:id/edit',
                title: 'People',
                data: {
                    permissions: {
                        only: 'register.staff',
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                templateUrl: helper.basepath('people-adduser.html'),
                controller: 'PeopleUpdateController',
                resolve: helper.resolveFor('whirl')
            })
            .state('app.roles', {
                url: '/roles',
                title: 'Permissions',
                cache: false,
                resolve: helper.resolveFor('modernizr', 'icons', 'toaster'),
                templateUrl: helper.basepath('roles.html')
            })
            .state('app.airtime', {
                url: '/airtime',
                title: 'Airtime',
                data: {
                    permissions: {
                        only: ["traffic", "accounting", "marketing", "head.accounting", "head.marketing", "executive.director", "administration.dept", "admin", "generate.airtime"],
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                templateUrl: helper.basepath('airtime.html'),
                resolve: angular.extend(helper.resolveFor('loaders.css', 'spinkit', 'datatables', 'oitozero.ngSweetAlert', 'ngDialog', 'ngTable', 'moment', 'localytics.directives', 'ui.bootstrap-slider')),
                //controller: 'AirtimeDefaultController'
            })
            .state('app.airtime.create', {
                url: '/create',
                title: 'Generate Airtime',
                cache: false,
                views: {
                    "@app": {
                        templateUrl: helper.basepath('airtime-create.html'),
                        controller: 'AirtimeCreateController'
                    }
                },
                resolve: helper.resolveFor('parsley', 'ui.select', 'taginput','inputmask','localytics.directives')
            })
            .state('app.airtime.details', {
                url: '/:id',
                title: 'Airtime',
                cache: false,
                templateUrl: helper.basepath('airtime-details.html'),
                controller: 'AirtimeDetailController'
            })
            .state('app.client', {
                url: '/client',
                title: 'Client',
                cache: false,
                templateUrl: helper.basepath('client.html'),
                resolve: helper.resolveFor('datatables')
            })
            .state('app.client.create', {
                url: '/create',
                cache: false,
                title: 'Register Client',
                views: {
                    '@app': {
                        resolve: helper.resolveFor('whirl'),
                        templateUrl: helper.basepath('client-create.html')
                    }
                }
            })
            .state('app.client.edit', {
                url: '/:id/edit',
                title: 'Update Client',
                cache: false,
                views: {
                    '@app' : {
                        templateUrl: helper.basepath('client-create.html'),
                        resolve: angular.extend({
                            clientUpdate: function () {
                                return true;
                            }
                        })
                    }
                }
            })
            .state('app.report', {
                url: '/report',
                title: 'Report',
                data: {
                    permissions: {
                        only: ["staff", "generate.report"],
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                templateUrl: helper.basepath('report.html'),
                controller: 'ReportController',
                resolve: helper.resolveFor('colorpicker.module', 'ui.select', 'codemirror', 'moment', 'taginput','inputmask','localytics.directives', 'ui.bootstrap-slider', 'ngWig', 'filestyle', 'textAngular')
            })
            .state('app.report.view', {
                url: '/view',
                title: 'Report',
                cache: false,
                templateUrl: helper.basepath('report-view.html'),
                resolve: helper.resolveFor('datatables'),
                controller: 'ReportViewController'
            })
            .state('app.unauthorized', {
                url: '/unauthorized',
                title: 'unauthorized',
                cache: false,
                templateUrl: helper.basepath('unauthorized.html')
            })
            .state('app.driver', {
                url: '/driver',
                title: 'Driver\'s Report',
                cache: false,
                data: {
                    permissions: {
                        only: ["driver"],
                        redirectTo: 'app.unauthorized'
                    }
                },
                resolve: angular.extend(helper.resolveFor('datatables', 'ui.select', 'textAngular')),
                templateUrl: helper.basepath('driver.html'),
                controller: 'DriverController'
            })
            .state('app.driver.editReport', {
                url: '/report/:id/edit',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                templateUrl: helper.basepath('driver-addreport.html'),
                controller: 'DriverController'
            })
            .state('app.driver.addReport', {
                url: '/report/add',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                templateUrl: helper.basepath('driver-addreport.html'),
                controller: 'DriverController'
            })
            .state('app.driver.viewReport', {
                url: '/report/view',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                templateUrl: helper.basepath('driver-viewreport.html'),
                controller: 'DriverReportViewCtrl'
            })
            .state('app.assessment', {
                url: '/assessment',
                abstract: true,
                cache: false,
                data: {
                    permissions: {
                        only: ["staff"],
                        redirectTo: 'app.unauthorized'
                    }
                },
                templateUrl: helper.basepath('assessment.html'),
                resolve: angular.extend(helper.resolveFor('datatables'))
            })
            .state('app.assessment.create', {
                url: '/create',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables', 'whirl')),
                templateUrl: helper.basepath('assessment-form.html'),
                controller: 'AssessmentController'
            })
            .state('app.assessment.edit', {
                url: '/:id/edit',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                views: {
                    "@app": {
                        templateUrl: helper.basepath('assessment-form.html')
                    }
                },
                controller: 'AssessmentController'
            })
            .state('app.assessment.view', {
                url: '/view',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                views: {
                    "@app": {
                        templateUrl: helper.basepath('assessment-record.html'),
                        controller: 'AssessmentRecordController'
                    }
                }
            })

            //Admin
            .state('app.admin', {
                url: '/admin',
                title: 'Admin',
                abstract: true,
                data: {
                    authenticate:true,
                    permissions: {
                        only: ["supervisor", "traffic", "accounting", "marketing", "head.accounting", "head.marketing", "executive.director", "administration.dept", "admin"],
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables'))
            })
            .state('app.admin.airtime', {
                url: '/airtime',
                title: 'Airtime',
                cache: false,
                views: {
                  '@app': {
                      templateUrl: helper.basepath('admin-airtime.html')
                  }
                },
                resolve: angular.extend(helper.resolveFor('loaders.css', 'spinkit', 'datatables', 'oitozero.ngSweetAlert', 'ngDialog', 'ngTable', 'moment', 'localytics.directives', 'ui.bootstrap-slider')),
                //controller: 'AirtimeDefaultController'
            })
            .state('app.admin.target', {
                url: '/target',
                title: 'Target',
                cache: false,
                views: {
                    "@app" : {
                        templateUrl: helper.basepath('target.html'),
                        controller: 'TargetController'
                    }
                },
                resolve: angular.extend(helper.resolveFor('datatables', 'ui.select'), {
                    '_token' : ['tokenService', function(tokenService) {
                        return tokenService.get();
                    }]
                })
            })
            .state('app.admin.vehicles', {
                url: '/vehicles',
                title: 'Vehicles',
                cache: false,
                views: {
                    "@app" : {
                        templateUrl: helper.basepath('vehicle.html'),
                        controller: 'VehicleController'
                    }
                },
                resolve: angular.extend(helper.resolveFor('datatables'), {
                    '_token' : ['tokenService', function(tokenService) {
                        return tokenService.get();
                    }]
                })
            })

            .state('app.admin.assessment-supervise', {
                url: '^/supervisor/:id',
                cache: false,
                data: {
                    permissions: {
                        only: ["supervisor"],
                        redirectTo: 'app.unauthorized'
                    }
                },
                views: {
                    '@app': {
                        templateUrl: helper.basepath('assessment-supervisor.html'),
                        controller: 'SupervisorController'
                    }
                },
                resolve: angular.extend(helper.resolveFor('datatables')),
            })
            .state('app.admin.assessment-log', {
                url: '/record/:id',
                cache: false,
                views: {
                    '@app': {
                        resolve: angular.extend(helper.resolveFor('datatables')),
                        templateUrl: helper.basepath('assessment-log.html'),
                        controller: 'AssessmentLogController'
                    }
                }
            })
            .state('app.admin.assessment-config', {
                url: '/settings',
                cache: false,
                views: {
                    '@app': {
                        resolve: angular.extend(helper.resolveFor('datatables')),
                        templateUrl: helper.basepath('assessment-config.html'),
                        //controller: 'AssessmentConfigController',
                        //ControllerAs: 'AssessConfig'
                    }
                }
            })
            .state('app.admin.staff-report', {
                url: '/staff/report/:id',
                cache: false,
                views: {
                    '@app': {
                        resolve: angular.extend(helper.resolveFor('datatables')),
                        templateUrl: helper.basepath('admin-report-view.html'),
                        controller: 'ReportViewController'
                    }
                }
            })
            .state('app.admin.driver-report', {
                url: '/driver/report/:id',
                cache: false,
                views: {
                    '@app': {
                        resolve: angular.extend(helper.resolveFor('datatables')),
                        templateUrl: helper.basepath('admin-driver-viewreport.html'),
                        controller: 'DriverReportViewCtrl'
                    }
                }
            })
            .state('app.admin.clients', {
                url: '/clients',
                cache: false,
                views: {
                    '@app': {
                        resolve: angular.extend(helper.resolveFor('datatables')),
                        templateUrl: helper.basepath('client.html')
                    }
                }
            })

                        // CUSTOM RESOLVES
            //   Add your own resolves properties
            //   following this object extend
            //   method
            // -----------------------------------
            // .state('app.someroute', {
            //   url: '/some_url',
            //   templateUrl: 'path_to_template.html',
            //   controller: 'someController',
            //   resolve: angular.extend(
            //     helper.resolveFor(), {
            //     // YOUR RESOLVES GO HERE
            //     }
            //   )
            // })
        ;

    } // routesConfig

})();



