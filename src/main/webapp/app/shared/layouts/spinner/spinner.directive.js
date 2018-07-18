(function() {
    'use strict';

    angular
        .module('rocktoBoard')
        .directive('spinner', spinner);

    function spinner() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/shared/layouts/spinner/spinner.html',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element) {
        }
    }
})();
