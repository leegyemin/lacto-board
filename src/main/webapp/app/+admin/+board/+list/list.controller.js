(function () {
    'use strict';

    angular
        .module('rocktoBoard')
        .controller('AdminBoardListController', AdminBoardListController);

    AdminBoardListController.$inject = ['$uibModal', '$stateParams', '$state', '$log', 'SweetAlert', 'Admin', 'boardList'];

    function AdminBoardListController($uibModal, $stateParams, $state, $log, SweetAlert, Admin, boardList) {
        var vm = this;

        // Variable Declarations
        vm.boardList = boardList;
        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.totalCount = null;

        // Function Declarations
        vm.search = search;

        initialize();
        searchSuccess(vm.boardList);

        // Function Implementations
        function initialize() {
            if ($stateParams.filter) {
                var filter = $stateParams.filter;
                vm.category = filter.category;
                vm.keywordType = filter.keywordType || 'all';
                vm.keyword = filter.keyword;
                vm.stateParamFilter = filter;
            }
            vm.totalCount = boardList.totalCount;
        }

        function searchSuccess(result) {
            var response = result.plain();
            vm.boardList = response.data;
            vm.currentPage = response.page;
            vm.totalCount = response.totalCount;
        }

        function search(isSearchButton) {
            var data = _buildSearchCondition();
            data.page = isSearchButton ? 1 : vm.currentPage;
            data.pageSize = vm.pageSize;

            $stateParams.filter = data;
            vm.stateParamFilter = $stateParams.filter;
            Admin.getBoardList(data).then(searchSuccess);
        }

        function _buildSearchCondition() {
            return {
                keywordType: vm.keywordType !== 'ALL' && vm.keyword ? vm.keywordType : undefined,
                keyword: vm.keyword ? vm.keyword : undefined
            };
        }

    }
})();
