(function () {
    'use strict';

    angular
        .module('rocktoBoard')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('admin.boardcreation', {
            parent: 'board',
            url: '/admin/board/creation/:id',
            data: {
                authorities: ['AM'],
                pageTitle: 'Admin Board'
            },
            views: {
                'content@': {
                    templateUrl: 'app/+admin/+board/+creation/creation.html',
                    controller: 'AdminBoardCreationController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                accountInfo: accountInfo,
                boardDetail: boardDetail
            }
        });
    }

    function accountInfo(authorize, User) {
        return User.getMe();
    }

    function boardDetail(Admin, $stateParams) {
        if ($stateParams.id) {
            return Admin.getBoard($stateParams.id);
        } else {
            return null;
        }

    }
})();
