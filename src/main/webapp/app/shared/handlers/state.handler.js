(function() {
    'use strict';

    angular
        .module('rocktoBoard')
        .factory('stateHandler', stateHandler);

    stateHandler.$inject = ['$log', '$rootScope', '$state', '$sessionStorage', '$window', 'Auth', 'Principal', 'VERSION', 'SweetAlert', '$uibModalStack', 'SiteService'];

    /*eslint no-console: 0*/
    function stateHandler($log, $rootScope, $state, $sessionStorage, $window, Auth, Principal, VERSION, SweetAlert, $uibModalStack, SiteService) {
        return {
            initialize: initialize
        };

        function initialize() {
            $rootScope.VERSION = VERSION;

            var stateChangeStart = $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams, fromState) {
                console.groupEnd();
                console.group(toState.name + ' (' + toState.url + ')');
                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                $rootScope.fromState = fromState;
                $rootScope.stateResolved = false;

                if (toState.external) {
                    event.preventDefault();
                    $window.open(toState.url, '_self');
                }

                // Close all modals or alerts if exist
                $uibModalStack.dismissAll();
                if (fromState.name !== toState.name) {
                    SweetAlert.close();
                }

                if (Principal.isIdentityResolved()) {
                    if (!Principal.isAuthenticated() &&
                        toState.name !== 'home' &&
                        toState.name !== 'privacypolicy' &&
                        toState.name !== 'support.whatispeppermint' &&
                        toState.name !== 'sessionexpired' &&
                        toState.name !== 'serviceunavailable') {
                        $rootScope.stateResolved = true;
                        event.preventDefault();
                        $state.go('home');
                        return;
                    }
                    var _identity = Principal.getAuthority();
                    var _site = SiteService.site();
                    var _authorites = toState.data ? toState.data.authorities[_site] : null;

                    if (!_.isEmpty(_authorites) && _authorites.indexOf(_identity) === -1) {
                        $rootScope.stateResolved = true;
                        event.preventDefault();
                        $state.go('accessdenied');
                        return;
                    }
                    Auth.authorize_new(false, event);
                } else {
                    Auth.storePreviousState($rootScope.toState.name, $rootScope.toStateParams);
                }
            });

            var stateChangeSuccess = $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
                $rootScope.stateResolved = true;
            });

            var stateChangeError = $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
                $log.error(event);
                $log.error('$stateChangeError: \'' + fromState.url + '(' + fromState.name + ')\' --> \'' + toState.url + '(' + toState.name + ')\'');
                $rootScope.stateResolved = true;
                $state.go('error');
            });

            $rootScope.$on('$destroy', function() {
                if (angular.isDefined(stateChangeStart) &&
                    stateChangeStart !== null) {
                    stateChangeStart();
                }
                if (angular.isDefined(stateChangeSuccess) && stateChangeSuccess !== null) {
                    stateChangeSuccess();
                }
                if (angular.isDefined(stateChangeError) && stateChangeError !== null) {
                    stateChangeError();
                }
            });
        }
    }
})();
