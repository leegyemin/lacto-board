(function () {
    'use strict';

    angular
        .module('rocktoBoard')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', 'Auth', 'Principal', 'Application', '$localStorage', 'authorityCon'];

    function NavbarController($state, Auth, Principal, Application, $localStorage, authorityCon) {
        var vm = this;

        // Variable Declarations
        vm.authority = '';
        vm.identity = {};
        vm.application = {};

        vm.isNavbarCollapsed = true;

        vm.$state = $state;
        vm.authorityCon = authorityCon;

        // Function Declarations
        vm.isAuthenticated = Principal.isAuthenticated;
        vm.getAuthority = Principal.getAuthority;

        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapse = collapse;
        vm.goMain = goMain;

        // Initialize
        initialize();

        // Function Implementations
        function initialize() {
            Principal.identity().then(function (identity) {
                vm.identity = identity;
            });
            vm.authority = vm.getAuthority();
        }

        function logout() {
            collapse();
            vm.navbarStyle = {'navbar-default': true};
            Auth.logout_new();
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
            $state.go('support.introduction');
        }

        function collapse() {
            vm.isNavbarCollapsed = true;
        }

        function goMain() {
            $state.go('home');
        }
    }
})();
