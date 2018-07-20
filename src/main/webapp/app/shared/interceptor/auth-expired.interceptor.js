(function() {
    'use strict';

    angular
        .module('rocktoBoard')
        .factory('authExpiredInterceptor', authExpiredInterceptor);

    authExpiredInterceptor.$inject = ['$rootScope', '$q', '$injector', '$localStorage', '$sessionStorage', 'moment'];

    function authExpiredInterceptor($rootScope, $q, $injector, $localStorage, $sessionStorage, moment) {
        var service = {
            responseError: responseError
        };

        return service;

        function responseError(response) {
            if (response.status === 401) {
                var Auth = $injector.get('Auth');
                Auth.logout_new();
                delete $localStorage.jwt;

                var $state = $injector.get('$state');
                $state.go('sessionexpired');

                var SiteService = $injector.get('SiteService');
                SiteService.site(null);

                var Principal = $injector.get('Principal');
                if (Principal.isAuthenticated()) {
                    Auth.authorize_new(true);
                }
            }
            return $q.reject(response);
        }
    }
})();
