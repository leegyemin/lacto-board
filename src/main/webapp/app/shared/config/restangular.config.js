(function() {
    'use strict';

    angular
        .module('rocktoBoard')
        .config(restangularConfig);

    restangularConfig.$inject = ['RestangularProvider'];

    function restangularConfig(RestangularProvider) {
        // RestangularProvider.setBaseUrl('/api/portal/v1/inapp');
        // RestangularProvider.setDefaultHttpFields({ cache: false });

        RestangularProvider.setDefaultHeaders({
            'Cache-Control': 'no-cache, max-age=0, must-revalidate, no-store',
            'Pragma': 'no-cache'
        });
    }

})();
