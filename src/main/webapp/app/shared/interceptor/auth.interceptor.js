(function() {
    'use strict';

    angular
        .module('rocktoBoard')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', '$injector', '$location', '$localStorage', '$sessionStorage', '$cookies'];

    function authInterceptor ($rootScope, $q, $injector, $location, $localStorage, $sessionStorage, $cookies) {
        var service = {
            request: request
        };

        return service;

        function request (config) {
            if (config && config.url.indexOf('.html') !== -1) {
                return config;
            }
            /*jshint camelcase: false */
            config.headers = config.headers || {};
            var token = $localStorage.jwt;
            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }
    }
})();
