(function () {
    'use strict';

    angular
        .module('rocktoBoard')
        .controller('AdminBoardCreationController', AdminBoardCreationController);

    AdminBoardCreationController.$inject = ['$uibModal', '$state', '$stateParams', '$log', 'SweetAlert', 'Admin', 'Uploader', 'accountInfo', 'boardDetail'];

    function AdminBoardCreationController($uibModal, $state, $stateParams, $log, SweetAlert, Admin, Uploader, accountInfo, boardDetail) {
        var vm = this;

        // Variable Declarations
        vm.accountInfo = accountInfo.plain();

        // Function Declarations
        vm.write = write;
        vm.modify = modify;
        vm.imageUpload = imageUpload;
        vm.fileUpload = fileUpload;
        vm.deleteFile = deleteFile;

        initialize();

        // Function Implementations
        function initialize() {
            vm.data = {
                name: vm.accountInfo.nickName,
                accountCode: vm.accountInfo.accountCode,
                uploadFileList: [],
                imageFileList: [],
                deleteList: []
            };

            if (boardDetail && boardDetail.id) {
                vm.data.id = boardDetail.id;
                vm.data.title = boardDetail.title;
                vm.data.content = boardDetail.content;
                vm.data.uploadFileList = boardDetail.uploadFileList || [];
                vm.data.imageFileList = boardDetail.imageFileList || [];
            }

        }

        function write() {
            Admin.createBoard(vm.data).then(updateSuccess).catch(updateError);
        }

        function modify() {
            Admin.modifyBoard(vm.data).then(updateSuccess).catch(updateError);
        }

        function imageUpload(file) {
            if (file) {
                SweetAlert.process('Uploading');
                Uploader.uploadAdminImageFile(file[0]).then(function (resp) {
                    var data = {
                        path: resp.data.path,
                        keyPath: resp.data.keyPath,
                        originalName: resp.config.data.file.name
                    };
                    vm.editor.summernote('insertImage', resp.data.path, resp.config.data.file.name);
                    vm.data.imageFileList.push(data);
                    SweetAlert.close();
                });
            }
        }

        function fileUpload(file) {
            if (file) {
                SweetAlert.process('Uploading');
                Uploader.uploadAdminFile(file).then(function (resp) {
                    var data = {
                        path: resp.data.path,
                        keyPath: resp.data.keyPath,
                        originalName: resp.config.data.file.name
                    };
                    vm.data.uploadFileList.push(data);
                    SweetAlert.close();
                });
            }
        }

        function deleteFile(index, file) {
            vm.data.uploadFileList.splice(index, 1);
            vm.data.deleteList.push(file.keyPath);
        }

        function updateSuccess(result) {
            SweetAlert.success('Successfully saved.').then(function () {
                if (vm.data.id) {
                    $state.go('admin.boarddetail', {id: $stateParams.id}, {reload: true});
                } else {
                    $state.go('admin.boardlist');
                }
            });
        }

        function updateError(result) {
            SweetAlert.swal('', result.data.resultMessage, 'error');
        }

    }
})();
