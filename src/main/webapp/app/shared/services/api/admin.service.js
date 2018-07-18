(function () {
    'use strict';

    angular
        .module('rocktoBoard')
        .factory('Admin', Admin);

    Admin.$inject = ['Restangular'];

    function Admin(Restangular) {

        var admin = Restangular.one('admin');

        return {
            getBoardList: getBoardList,
            getBoard: getBoard,
            createBoard: createBoard,
            modifyBoard: modifyBoard,
            deleteBoard: deleteBoard,
            inactiveBoard: inactiveBoard,
            writeReply: writeReply,
            modifyReply: modifyReply,
            deleteReply: deleteReply
        };

        /**
         * get board list
         * @param data
         * @returns {*}
         */
        function getBoardList(data) {
            return admin.one('board').doPOST(data, 'list');
        }

        /**
         * get board
         * @param id
         * @returns {*}
         */
        function getBoard(id) {
            return admin.one('board').one('detail', id).doGET();
        }

        /**
         * create board
         * @param data
         * @returns {*}
         */
        function createBoard(data) {
            return admin.doPOST(data, 'board');
        }

        /**
         * modify board
         * @param data
         * @returns {*}
         */
        function modifyBoard(data) {
            return admin.doPUT(data, 'board');
        }

        /**
         * delete board
         * @param id
         * @returns {*}
         */
        function deleteBoard(id) {
            return admin.one('board', id).doDELETE();
        }

        function inactiveBoard(id) {
            return admin.one('board').one('inactive', id).doDELETE();
        }

        function writeReply(data) {
            return admin.one('board').doPOST(data, 'reply');
        }

        function modifyReply(data) {
            return admin.one('board').doPUT(data, 'reply');
        }

        function deleteReply(id) {
            return admin.one('board').one('reply', id).doDELETE();
        }
    }
})();
