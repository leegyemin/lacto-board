(function() {
    'use strict';

    angular
        .module('rocktoBoard', [
            'ngStorage',
            'ngResource',
            'ngCookies',
            'ngAnimate',
            'ngAria',
            'ngFileUpload',
            'ui.bootstrap',
            'ui.router',
            'infinite-scroll',
            'angularMoment',
            'ngFileSaver',
            'ngFx',
            'restangular',
            'angular-chartist',
            'fk.eternicode-datepicker',
            'pascalprecht.translate',
            'datamaps',
            'summernote'
        ])
        .run(run);

    run.$inject = ['stateHandler'];

    function run(stateHandler) {
        stateHandler.initialize();
    }
})();
