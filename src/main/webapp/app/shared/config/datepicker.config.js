(function() {
    'use strict';

    angular
        .module('rocktoBoard')
        .config(datepickerConfig);

    datepickerConfig.$inject = ['datepickerDefaultsProvider'];

    function datepickerConfig(datepickerDefaultsProvider) {
        datepickerDefaultsProvider.setDefaultOptions({
            format: 'yyyy/mm/dd',
            assumeNearbyYear: true,
            autoclose: true,
            todayHighlight: true,
            weekStart: 1
        });
    }

})();
