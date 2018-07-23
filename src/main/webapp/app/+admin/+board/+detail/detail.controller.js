(function () {
    'use strict';

    angular
        .module('rocktoBoard')
        .controller('AdminBoardDetailController', AdminBoardDetailController);

    AdminBoardDetailController.$inject = ['$uibModal', '$state', '$sce', '$log', 'SweetAlert', 'Admin', 'boardDetail', 'accountInfo'];

    function AdminBoardDetailController($uibModal, $state, $sce, $log, SweetAlert, Admin, boardDetail, accountInfo) {
        var vm = this;

        // Variable Declarations
        vm.board = boardDetail.plain();
        vm.accountInfo = accountInfo.plain();

        // Function Declarations
        vm.writeReply = writeReply;
        vm.modifyReply = modifyReply;
        vm.deleteReply = deleteReply;
        vm.deleteBoard = deleteBoard;
        vm.inactiveBoard = inactiveBoard;

        initialize();

        function initialize() {
            vm.board.content = $sce.trustAsHtml(vm.board.content);
        }

        function writeReply() {
            var data = {
                boardId: vm.board.id,
                name: vm.accountInfo.nickName,
                accountCode: vm.accountInfo.accountCode,
                content: vm.replyText
            };
            Admin.writeReply(data).then(updateSuccess).catch(updateError);
        }

        function modifyReply(data) {
            Admin.modifyReply(data).then(updateSuccess).catch(updateError);
            data.modify = false;
        }

        function deleteReply(reply_num) {
            SweetAlert.confirm('Do you want to delete this message?<br>All information you have entered will be deleted.').then(function () {
                SweetAlert.process('Deleting');
                Admin.deleteReply(reply_num).then(function () {
                    SweetAlert.success('Successfully deleted.').then(function () {
                        $state.go($state.current, {}, {reload: true});
                    });
                }).catch(function (result) {
                    SweetAlert.swal('', result.data.resultMessage, 'error');
                });
            });
        }

        function deleteBoard() {
            SweetAlert.confirm('Do you want to delete this message?<br>All information you have entered will be deleted.').then(function () {
                SweetAlert.process('Deleting');
                Admin.deleteBoard(vm.board.id).then(function () {
                    SweetAlert.success('Successfully deleted.').then(function () {
                        $state.go('admin.boardlist');
                    });
                }).catch(function (result) {
                    SweetAlert.swal('', result.data.resultMessage, 'error');
                });
            });
        }

        function inactiveBoard() {
            SweetAlert.confirm('Do you want to delete this message?<br>All information you have entered will be deleted.').then(function () {
                SweetAlert.process('Deleting');
                Admin.inactiveBoard(vm.board.id).then(function () {
                    SweetAlert.success('Successfully deleted.').then(function () {
                        $state.go('admin.boardlist');
                    });
                }).catch(function (result) {
                    SweetAlert.swal('', result.data.resultMessage, 'error');
                });
            });
        }

        function updateSuccess(result) {
            SweetAlert.success('Successfully saved.').then(
                $state.go($state.current, {}, {reload: true})
            );
        }

        function updateError(result) {
            SweetAlert.swal('', result.data.resultMessage, 'error');
        }

    }
})();
