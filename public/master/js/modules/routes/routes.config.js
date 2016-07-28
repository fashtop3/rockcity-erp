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
                templateUrl: helper.basepath('people.html'),
                controller: 'PeopleController'
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
                templateUrl: helper.basepath('people-adduser.html')
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
                        only: ["staff", "admin"],
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
                        only: ["traffic", "accounting", "marketing", "head.accounting", "head.marketing", "executive.director", "administration.dept", "admin", "generate.airtime"],
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false
            })
            .state('app.admin.airtime', {
                url: '/airtime',
                title: 'Airtime',
                data: {
                    permissions: {
                        only: ["traffic", "accounting", "marketing", "head.accounting", "head.marketing", "executive.director", "administration.dept", "admin", "generate.airtime"],
                        redirectTo: 'app.unauthorized'
                    }
                },
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
                data: {
                    permissions: {
                        only: ["admin", "executive.director", "administration.dept", "manage.target"],
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                views: {
                    "@app" : {
                        templateUrl: helper.basepath('target.html')
                    }
                },
                controller: 'TargetController',
                resolve: angular.extend(helper.resolveFor('datatables', 'ui.select'), {
                    '_token' : ['tokenService', function(tokenService) {
                        return tokenService.get();
                    }]
                })
            })
            .state('app.admin.vehicles', {
                url: '/vehicles',
                title: 'Vehicles',
                data: {
                    permissions: {
                        only: ["admin", "executive.director", "administration.dept", "manage.vehicle"],
                        redirectTo: 'app.unauthorized'
                    }
                },
                cache: false,
                views: {
                    "@app" : {
                        templateUrl: helper.basepath('vehicle.html')
                    }
                },
                controller: 'VehicleController',
                resolve: angular.extend(helper.resolveFor('datatables'), {
                    '_token' : ['tokenService', function(tokenService) {
                        return tokenService.get();
                    }]
                })
            })

            .state('app.assessment.supervise', {
                url: '^/supervisor/:id',
                cache: false,
                resolve: angular.extend(helper.resolveFor('datatables')),
                templateUrl: helper.basepath('assessment-supervisor.html'),
                controller: 'SupervisorController'
            })
            .state('app.assessment.log', {
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
            .state('app.assessment.config', {
                url: '/settings',
                cache: false,
                views: {
                    '@app': {
                        resolve: angular.extend(helper.resolveFor('datatables')),
                        templateUrl: helper.basepath('assessment-config.html'),
                        controller: 'AssessmentConfigController'
                    }
                }
            })


            //.state('app', {
          //    url: '/app',
          //    abstract: true,
          //    templateUrl: helper.basepath('app.html'),
          //    resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
          //})
          //.state('app.dashboard', {
          //    url: '/dashboard',
          //    title: 'Dashboard',
          //    templateUrl: helper.basepath('dashboard.html'),
          //    resolve: helper.resolveFor('flot-chart','flot-chart-plugins', 'weather-icons')
          //})
          //.state('app.dashboard_v2', {
          //    url: '/dashboard_v2',
          //    title: 'Dashboard v2',
          //    templateUrl: helper.basepath('dashboard_v2.html'),
          //    controller: 'DashboardV2Controller',
          //    controllerAs: 'dash2',
          //    resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
          //})
          //.state('app.dashboard_v3', {
          //    url: '/dashboard_v3',
          //    title: 'Dashboard v3',
          //    controller: 'DashboardV3Controller',
          //    controllerAs: 'dash3',
          //    templateUrl: helper.basepath('dashboard_v3.html'),
          //    resolve: helper.resolveFor('flot-chart','flot-chart-plugins', 'vector-map', 'vector-map-maps')
          //})
          //.state('app.widgets', {
          //    url: '/widgets',
          //    title: 'Widgets',
          //    templateUrl: helper.basepath('widgets.html'),
          //    resolve: helper.resolveFor('loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'ui.map')
          //})
          //.state('app.buttons', {
          //    url: '/buttons',
          //    title: 'Buttons',
          //    templateUrl: helper.basepath('buttons.html')
          //})
          //.state('app.colors', {
          //    url: '/colors',
          //    title: 'Colors',
          //    templateUrl: helper.basepath('colors.html')
          //})
          //.state('app.localization', {
          //    url: '/localization',
          //    title: 'Localization',
          //    templateUrl: helper.basepath('localization.html')
          //})
          //.state('app.infinite-scroll', {
          //    url: '/infinite-scroll',
          //    title: 'Infinite Scroll',
          //    templateUrl: helper.basepath('infinite-scroll.html'),
          //    resolve: helper.resolveFor('infinite-scroll')
          //})
          //.state('app.navtree', {
          //    url: '/navtree',
          //    title: 'Nav Tree',
          //    templateUrl: helper.basepath('nav-tree.html'),
          //    resolve: helper.resolveFor('angularBootstrapNavTree')
          //})
          //.state('app.nestable', {
          //    url: '/nestable',
          //    title: 'Nestable',
          //    templateUrl: helper.basepath('nestable.html'),
          //    resolve: helper.resolveFor('ng-nestable')
          //})
          //.state('app.sortable', {
          //    url: '/sortable',
          //    title: 'Sortable',
          //    templateUrl: helper.basepath('sortable.html'),
          //    resolve: helper.resolveFor('htmlSortable')
          //})
          //.state('app.notifications', {
          //    url: '/notifications',
          //    title: 'Notifications',
          //    templateUrl: helper.basepath('notifications.html')
          //})
          //.state('app.carousel', {
          //    url: '/carousel',
          //    title: 'Carousel',
          //    templateUrl: helper.basepath('carousel.html'),
          //    resolve: helper.resolveFor('angular-carousel')
          //})
          //.state('app.ngdialog', {
          //    url: '/ngdialog',
          //    title: 'ngDialog',
          //    templateUrl: helper.basepath('ngdialog.html'),
          //    resolve: angular.extend(helper.resolveFor('ngDialog'),{
          //      tpl: function() { return { path: helper.basepath('ngdialog-template.html') }; }
          //    }),
          //    controller: 'DialogIntroCtrl'
          //})
          //.state('app.sweetalert', {
          //  url: '/sweetalert',
          //  title: 'SweetAlert',
          //  templateUrl: helper.basepath('sweetalert.html'),
          //  resolve: helper.resolveFor('oitozero.ngSweetAlert')
          //})
          //.state('app.tour', {
          //  url: '/tour',
          //  title: 'Tour',
          //  templateUrl: helper.basepath('tour.html'),
          //  resolve: helper.resolveFor('bm.bsTour')
          //})
          //.state('app.interaction', {
          //    url: '/interaction',
          //    title: 'Interaction',
          //    templateUrl: helper.basepath('interaction.html')
          //})
          //.state('app.spinners', {
          //    url: '/spinners',
          //    title: 'Spinners',
          //    templateUrl: helper.basepath('spinners.html'),
          //    resolve: helper.resolveFor('loaders.css', 'spinkit')
          //})
          //.state('app.dropdown-animations', {
          //    url: '/dropdown-animations',
          //    title: 'Dropdown Animations',
          //    templateUrl: helper.basepath('dropdown-animations.html')
          //})
          //.state('app.panels', {
          //    url: '/panels',
          //    title: 'Panels',
          //    templateUrl: helper.basepath('panels.html')
          //})
          //.state('app.portlets', {
          //    url: '/portlets',
          //    title: 'Portlets',
          //    templateUrl: helper.basepath('portlets.html'),
          //    resolve: helper.resolveFor('jquery-ui', 'jquery-ui-widgets')
          //})
          //.state('app.maps-google', {
          //    url: '/maps-google',
          //    title: 'Maps Google',
          //    templateUrl: helper.basepath('maps-google.html'),
          //    resolve: helper.resolveFor('loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'ui.map')
          //})
          //.state('app.maps-vector', {
          //    url: '/maps-vector',
          //    title: 'Maps Vector',
          //    templateUrl: helper.basepath('maps-vector.html'),
          //    controller: 'VectorMapController',
          //    controllerAs: 'vmap',
          //    resolve: helper.resolveFor('vector-map', 'vector-map-maps')
          //})
          //.state('app.grid', {
          //    url: '/grid',
          //    title: 'Grid',
          //    templateUrl: helper.basepath('grid.html')
          //})
          //.state('app.grid-masonry', {
          //    url: '/grid-masonry',
          //    title: 'Grid Masonry',
          //    templateUrl: helper.basepath('grid-masonry.html')
          //})
          //.state('app.grid-masonry-deck', {
          //    url: '/grid-masonry-deck',
          //    title: 'Grid Masonry',
          //    templateUrl: helper.basepath('grid-masonry-deck.html'),
          //    resolve: helper.resolveFor('spinkit', 'akoenig.deckgrid')
          //})
          //.state('app.typo', {
          //    url: '/typo',
          //    title: 'Typo',
          //    templateUrl: helper.basepath('typo.html')
          //})
          //.state('app.icons-font', {
          //    url: '/icons-font',
          //    title: 'Icons Font',
          //    templateUrl: helper.basepath('icons-font.html'),
          //    resolve: helper.resolveFor('icons')
          //})
          //.state('app.icons-weather', {
          //    url: '/icons-weather',
          //    title: 'Icons Weather',
          //    templateUrl: helper.basepath('icons-weather.html'),
          //    resolve: helper.resolveFor('weather-icons', 'skycons')
          //})
          //.state('app.form-standard', {
          //    url: '/form-standard',
          //    title: 'Form Standard',
          //    templateUrl: helper.basepath('form-standard.html')
          //})
          //.state('app.form-extended', {
          //    url: '/form-extended',
          //    title: 'Form Extended',
          //    templateUrl: helper.basepath('form-extended.html'),
          //    resolve: helper.resolveFor('colorpicker.module', 'codemirror', 'moment', 'taginput','inputmask','localytics.directives', 'ui.bootstrap-slider', 'ngWig', 'filestyle', 'textAngular')
          //})
          //.state('app.form-validation', {
          //    url: '/form-validation',
          //    title: 'Form Validation',
          //    templateUrl: helper.basepath('form-validation.html'),
          //    resolve: helper.resolveFor('ui.select', 'taginput','inputmask','localytics.directives')
          //})
          //.state('app.form-parsley', {
          //    url: '/form-parsley',
          //    title: 'Form Validation - Parsley',
          //    templateUrl: helper.basepath('form-parsley.html'),
          //    resolve: helper.resolveFor('parsley')
          //})
          //.state('app.form-wizard', {
          //    url: '/form-wizard',
          //    title: 'Form Wizard',
          //    templateUrl: helper.basepath('form-wizard.html'),
          //    resolve: helper.resolveFor('parsley')
          //})
          //.state('app.form-upload', {
          //    url: '/form-upload',
          //    title: 'Form upload',
          //    templateUrl: helper.basepath('form-upload.html'),
          //    resolve: helper.resolveFor('angularFileUpload', 'filestyle')
          //})
          //.state('app.form-xeditable', {
          //    url: '/form-xeditable',
          //    templateUrl: helper.basepath('form-xeditable.html'),
          //    resolve: helper.resolveFor('xeditable')
          //})
          //.state('app.form-imagecrop', {
          //    url: '/form-imagecrop',
          //    templateUrl: helper.basepath('form-imagecrop.html'),
          //    resolve: helper.resolveFor('ngImgCrop', 'filestyle')
          //})
          //.state('app.form-uiselect', {
          //    url: '/form-uiselect',
          //    templateUrl: helper.basepath('form-uiselect.html'),
          //    controller: 'uiSelectController',
          //    controllerAs: 'uisel',
          //    resolve: helper.resolveFor('ui.select')
          //})
          //.state('app.chart-flot', {
          //    url: '/chart-flot',
          //    title: 'Chart Flot',
          //    templateUrl: helper.basepath('chart-flot.html'),
          //    resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
          //})
          //.state('app.chart-radial', {
          //    url: '/chart-radial',
          //    title: 'Chart Radial',
          //    templateUrl: helper.basepath('chart-radial.html'),
          //    resolve: helper.resolveFor('classyloader', 'ui.knob', 'easypiechart')
          //})
          //.state('app.chart-js', {
          //    url: '/chart-js',
          //    title: 'Chart JS',
          //    templateUrl: helper.basepath('chart-js.html'),
          //    resolve: helper.resolveFor('chartjs')
          //})
          //.state('app.chart-rickshaw', {
          //    url: '/chart-rickshaw',
          //    title: 'Chart Rickshaw',
          //    templateUrl: helper.basepath('chart-rickshaw.html'),
          //    resolve: helper.resolveFor('angular-rickshaw')
          //})
          //.state('app.chart-morris', {
          //    url: '/chart-morris',
          //    title: 'Chart Morris',
          //    templateUrl: helper.basepath('chart-morris.html'),
          //    resolve: helper.resolveFor('morris')
          //})
          //.state('app.chart-chartist', {
          //    url: '/chart-chartist',
          //    title: 'Chart Chartist',
          //    templateUrl: helper.basepath('chart-chartist.html'),
          //    resolve: helper.resolveFor('angular-chartist')
          //})
          //.state('app.table-standard', {
          //    url: '/table-standard',
          //    title: 'Table Standard',
          //    templateUrl: helper.basepath('table-standard.html')
          //})
          //.state('app.table-extended', {
          //    url: '/table-extended',
          //    title: 'Table Extended',
          //    templateUrl: helper.basepath('table-extended.html')
          //})
          //.state('app.table-datatable', {
          //    url: '/table-datatable',
          //    title: 'Table Datatable',
          //    templateUrl: helper.basepath('table-datatable.html'),
          //    resolve: helper.resolveFor('datatables')
          //})
          //.state('app.table-xeditable', {
          //    url: '/table-xeditable',
          //    templateUrl: helper.basepath('table-xeditable.html'),
          //    resolve: helper.resolveFor('xeditable')
          //})
          //.state('app.table-ngtable', {
          //    url: '/table-ngtable',
          //    templateUrl: helper.basepath('table-ngtable.html'),
          //    resolve: helper.resolveFor('ngTable', 'ngTableExport')
          //})
          //.state('app.table-uigrid', {
          //    url: '/table-uigrid',
          //    templateUrl: helper.basepath('table-uigrid.html'),
          //    resolve: helper.resolveFor('ui.grid')
          //})
          //.state('app.table-angulargrid', {
          //    url: '/table-angulargrid',
          //    templateUrl: helper.basepath('table-angulargrid.html'),
          //    resolve: helper.resolveFor('angularGrid')
          //})
          //.state('app.timeline', {
          //    url: '/timeline',
          //    title: 'Timeline',
          //    templateUrl: helper.basepath('timeline.html')
          //})
          //.state('app.calendar', {
          //    url: '/calendar',
          //    title: 'Calendar',
          //    templateUrl: helper.basepath('calendar.html'),
          //    resolve: helper.resolveFor('jquery-ui', 'jquery-ui-widgets', 'moment', 'fullcalendar')
          //})
          //.state('app.invoice', {
          //    url: '/invoice',
          //    title: 'Invoice',
          //    templateUrl: helper.basepath('invoice.html')
          //})
          //.state('app.search', {
          //    url: '/search',
          //    title: 'Search',
          //    templateUrl: helper.basepath('search.html'),
          //    resolve: helper.resolveFor('moment', 'localytics.directives', 'ui.bootstrap-slider')
          //})
          //.state('app.todo', {
          //    url: '/todo',
          //    title: 'Todo List',
          //    templateUrl: helper.basepath('todo.html'),
          //    controller: 'TodoController',
          //    controllerAs: 'todo'
          //})
          //.state('app.profile', {
          //    url: '/profile',
          //    title: 'Profile',
          //    templateUrl: helper.basepath('profile.html'),
          //    resolve: helper.resolveFor('loadGoogleMapsJS', function() { return loadGoogleMaps(); }, 'ui.map')
          //})
          //.state('app.code-editor', {
          //    url: '/code-editor',
          //    templateUrl: helper.basepath('code-editor.html'),
          //    controller: 'CodeEditorController',
          //    controllerAs: 'coder',
          //    resolve: {
          //        deps: helper.resolveFor('codemirror', 'ui.codemirror', 'codemirror-modes-web', 'angularBootstrapNavTree').deps,
          //        filetree: ['LoadTreeService', function (LoadTreeService) {
          //            return LoadTreeService.get().$promise.then(function (res) {
          //                return res.data;
          //            });
          //        }]
          //    }
          //})
          //.state('app.template', {
          //    url: '/template',
          //    title: 'Blank Template',
          //    templateUrl: helper.basepath('template.html')
          //})
          //.state('app.documentation', {
          //    url: '/documentation',
          //    title: 'Documentation',
          //    templateUrl: helper.basepath('documentation.html'),
          //    resolve: helper.resolveFor('flatdoc')
          //})
          //// Forum
          //// -----------------------------------
          //.state('app.forum', {
          //    url: '/forum',
          //    title: 'Forum',
          //    templateUrl: helper.basepath('forum.html')
          //})
          //.state('app.forum-topics', {
          //    url: '/forum/topics/:catid',
          //    title: 'Forum Topics',
          //    templateUrl: helper.basepath('forum-topics.html')
          //})
          //.state('app.forum-discussion', {
          //    url: '/forum/discussion/:topid',
          //    title: 'Forum Discussion',
          //    templateUrl: helper.basepath('forum-discussion.html')
          //})
          //// Blog
          //// -----------------------------------
          //.state('app.blog', {
          //    url: '/blog',
          //    title: 'Blog',
          //    templateUrl: helper.basepath('blog.html'),
          //    resolve: helper.resolveFor('angular-jqcloud')
          //})
          //.state('app.blog-post', {
          //    url: '/post',
          //    title: 'Post',
          //    templateUrl: helper.basepath('blog-post.html'),
          //    resolve: helper.resolveFor('angular-jqcloud')
          //})
          //.state('app.articles', {
          //    url: '/articles',
          //    title: 'Articles',
          //    templateUrl: helper.basepath('blog-articles.html'),
          //    resolve: helper.resolveFor('datatables')
          //})
          //.state('app.article-view', {
          //    url: '/article/:id',
          //    title: 'Article View',
          //    templateUrl: helper.basepath('blog-article-view.html'),
          //    resolve: helper.resolveFor('ui.select', 'textAngular')
          //})
          //// eCommerce
          //// -----------------------------------
          //.state('app.orders', {
          //    url: '/orders',
          //    title: 'Orders',
          //    templateUrl: helper.basepath('ecommerce-orders.html'),
          //    resolve: helper.resolveFor('datatables')
          //})
          //.state('app.order-view', {
          //    url: '/order-view',
          //    title: 'Order View',
          //    templateUrl: helper.basepath('ecommerce-order-view.html')
          //})
          //.state('app.products', {
          //    url: '/products',
          //    title: 'Products',
          //    templateUrl: helper.basepath('ecommerce-products.html'),
          //    resolve: helper.resolveFor('datatables')
          //})
          //.state('app.product-view', {
          //    url: '/product/:id',
          //    title: 'Product View',
          //    templateUrl: helper.basepath('ecommerce-product-view.html')
          //})
          //// Mailbox
          //// -----------------------------------
          //.state('app.mailbox', {
          //    url: '/mailbox',
          //    title: 'Mailbox',
          //    abstract: true,
          //    templateUrl: helper.basepath('mailbox.html')
          //})
          //.state('app.mailbox.folder', {
          //    url: '/folder/:folder',
          //    title: 'Mailbox',
          //    templateUrl: helper.basepath('mailbox-inbox.html')
          //})
          //.state('app.mailbox.view', {
          //    url : '/{mid:[0-9]{1,4}}',
          //    title: 'View mail',
          //    templateUrl: helper.basepath('mailbox-view.html'),
          //    resolve: helper.resolveFor('ngWig')
          //})
          //.state('app.mailbox.compose', {
          //    url: '/compose',
          //    title: 'Mailbox',
          //    templateUrl: helper.basepath('mailbox-compose.html'),
          //    resolve: helper.resolveFor('ngWig')
          //})
          ////
          //// Multiple level example
          //// -----------------------------------
          //.state('app.multilevel', {
          //    url: '/multilevel',
          //    title: 'Multilevel',
          //    template: '<h3>Multilevel Views</h3>' + '<div class="lead ba p">View @ Top Level ' + '<div ui-view=""></div> </div>'
          //})
          //.state('app.multilevel.level1', {
          //    url: '/level1',
          //    title: 'Multilevel - Level1',
          //    template: '<div class="lead ba p">View @ Level 1' + '<div ui-view=""></div> </div>'
          //})
          //.state('app.multilevel.level1.item', {
          //    url: '/item',
          //    title: 'Multilevel - Level1',
          //    template: '<div class="lead ba p"> Menu item @ Level 1</div>'
          //})
          //.state('app.multilevel.level1.level2', {
          //    url: '/level2',
          //    title: 'Multilevel - Level2',
          //    template: '<div class="lead ba p">View @ Level 2'  + '<div ui-view=""></div> </div>'
          //})
          //.state('app.multilevel.level1.level2.level3', {
          //    url: '/level3',
          //    title: 'Multilevel - Level3',
          //    template: '<div class="lead ba p">View @ Level 3' + '<div ui-view=""></div> </div>'
          //})
          //.state('app.multilevel.level1.level2.level3.item', {
          //    url: '/item',
          //    title: 'Multilevel - Level3 Item',
          //    template: '<div class="lead ba p"> Menu item @ Level 3</div>'
          //})
          ////
          //// Single Page Routes
          //// -----------------------------------
          //.state('page', {
          //    url: '/page',
          //    templateUrl: 'app/pages/page.html',
          //    resolve: helper.resolveFor('modernizr', 'icons'),
          //    controller: ['$rootScope', function($rootScope) {
          //        $rootScope.app.layout.isBoxed = false;
          //    }]
          //})
          //.state('page.login', {
          //    url: '/login',
          //    title: 'Login',
          //    templateUrl: 'app/pages/login.html'
          //})
          //.state('page.register', {
          //    url: '/register',
          //    title: 'Register',
          //    templateUrl: 'app/pages/register.html'
          //})
          //.state('page.recover', {
          //    url: '/recover',
          //    title: 'Recover',
          //    templateUrl: 'app/pages/recover.html'
          //})
          //.state('page.lock', {
          //    url: '/lock',
          //    title: 'Lock',
          //    templateUrl: 'app/pages/lock.html'
          //})
          //.state('page.404', {
          //    url: '/404',
          //    title: 'Not Found',
          //    templateUrl: 'app/pages/404.html'
          //})
          ////
          //// Horizontal layout
          //// -----------------------------------
          //.state('app-h', {
          //    url: '/app-h',
          //    abstract: true,
          //    templateUrl: helper.basepath( 'app-h.html' ),
          //    resolve: helper.resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl')
          //})
          //.state('app-h.dashboard_v2', {
          //    url: '/dashboard_v2',
          //    title: 'Dashboard v2',
          //    templateUrl: helper.basepath('dashboard_v2.html'),
          //    controller: 'DashboardV2Controller',
          //    controllerAs: 'dash2',
          //    resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
          //})
          //
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

