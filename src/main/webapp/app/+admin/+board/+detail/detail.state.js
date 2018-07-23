(function () {
    'use strict';

    angular
        .module('rocktoBoard')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('admin.boarddetail', {
            parent: 'board',
            url: '/admin/board/detail/:id',
            data: {
                authorities: ['AM'],
                pageTitle: 'Admin Board'
            },
            views: {
                'content@': {
                    templateUrl: 'app/+admin/+board/+detail/detail.html',
                    controller: 'AdminBoardDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                boardDetail: boardDetail,
                accountInfo: accountInfo
            }
        });
    }

    function boardDetail(Admin, $stateParams) {
        return Admin.getBoard($stateParams.id);
    }

    function accountInfo(authorize, User) {
        return User.getMe();
    }
})();
