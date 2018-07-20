(function() {
    'use strict';

    angular
        .module('rocktoBoard')
        .factory('responseInterceptor', responseInterceptor);

    responseInterceptor.$inject = ['$rootScope', '$q', '$injector', '$localStorage', '$sessionStorage', 'moment'];

    function responseInterceptor($rootScope, $q, $injector, $localStorage, $sessionStorage, moment) {
        var service = {
            response: response
        };

        return service;

        function response(data, operation, what, url, response, deferred) {
            // NOTE add a response interceptor
            // RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
            //     if (what === 'me') {
            //         data.extractedAuthority = data.authority;
            //         angular.forEach(data.authority, function (value) {
            //             data.extractedAuthority[value] = true;
            //         })
            //     }
            //     return data;
            // });

            return data;
        }
    }
})();
