(function () {
    'use strict';

    angular
        .module('rocktoBoard')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('admin.boardlist', {
            parent: 'board',
            url: '/admin/board/list',
            data: {
                authorities: ['AM'],
                pageTitle: 'Admin Board'
            },
            views: {
                'content@': {
                    templateUrl: 'app/+admin/+board/+list/list.html',
                    controller: 'AdminBoardListController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                boardList: boardList
            }
        });
    }

    function boardList(Admin, $stateParams) {
        return Admin.getBoardList($stateParams.filter);
    }
})();
