(function() {
    'use strict';

    angular
        .module('rocktoBoard')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                'navbar@': {
                    templateUrl: 'app/shared/layouts/navbar/navbar.html',
                    controller: 'NavbarController',
                    controllerAs: 'vm'
                },
                'footer@': {
                    templateUrl: 'app/shared/layouts/footer/footer.html'
                }
            },
            resolve: {
                authorize: authorize
            }
        });
    }

    function authorize(Auth) {
        return Auth.authorize_new();
    }
})();
