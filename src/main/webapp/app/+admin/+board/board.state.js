(function () {
    'use strict';

    angular
        .module('rocktoBoard')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('board', {
            abstract: true,
            parent: 'admin',
            params: {
                filter: {
                    page: 1,
                    pageSize: 10
                }
            }
        });
    }
})();
