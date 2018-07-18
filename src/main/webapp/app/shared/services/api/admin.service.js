(function () {
    'use strict';

    angular
        .module('rocktoBoard')
        .factory('Admin', Admin);

    Admin.$inject = ['Restangular'];

    function Admin(Restangular) {

        var admin = Restangular.one('admin');

        return {};

    }
})();
