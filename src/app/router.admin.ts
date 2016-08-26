((): void => {
    angular.module('Upkeeper')
        .config([
            '$routeProvider', ($routeProvider) => {
                $routeProvider
                    .when('/Administration/Home', {
                        templateUrl: 'views/app/views/Administration/Administration.home.html',
                        controller: 'AdministrationController',
                        controllerAs: 'vm',
                        resolve: { "administration": () => { return true } }
                    })
                    .when('/Administration/Users', {
                        templateUrl: 'views/app/views/Administration/Users/Users.home.html',
                        controller: 'AdminUsersController',
                        controllerAs: 'vm',
                        resolve: { "administration": () => { return true } }
                    })
                    .when('/Administration/Users/Create', {
                        templateUrl: 'views/app/views/Administration/Users/Users.detail.html',
                        controller: 'CreateUserController',
                        controllerAs: 'vm',
                        resolve: { "administration": () => { return true } }
                    })
                    .when('/Administration/Users/Detail/:id', {
                        templateUrl: 'views/app/views/Administration/Users/Users.detail.html',
                        controller: 'DetailUserController',
                        controllerAs: 'vm',
                        resolve: { "administration": () => { return true } }
                    })
                    .when('/Administration/Organizations', {
                        templateUrl: 'views/app/views/Administration/Organizations/Organizations.home.html',
                        controller: 'OrganizationsController',
                        controllerAs: 'vm',
                        resolve: { "administration": () => { return true } }
                    })
                    .when('/Administration/Organizations/Create', {
                        templateUrl: 'views/app/views/Administration/Organizations/Organizations.detail.html',
                        controller: 'CreateOrganizationController',
                        controllerAs: 'vm',
                        resolve: { "administration": () => { return true } }
                    })
                    .when('/Administration/Organizations/Detail/:id', {
                        templateUrl: 'views/app/views/Administration/Organizations/Organizations.detail.html',
                        controller: 'DetailOrganizationController',
                        controllerAs: 'vm',
                        resolve: { "administration": () => { return true } }
                    })
                    .when('/Administration/Roles', {
                        templateUrl: 'views/app/views/Administration/Roles/Roles.home.html',
                        controller: 'RolesController',
                        controllerAs: 'vm',
                        resolve: { "administration": () => { return true } }
                    }).when('/Administration/Roles/Detail/:id', {
                        templateUrl: 'views/app/views/Administration/Roles/Roles.detail.html',
                        controller: 'DetailRoleController',
                        controllerAs: 'vm',
                        resolve: { "administration": () => { return true } }
                    })
                    .when('/Administration/Categories', {
                        templateUrl: 'views/app/views/Administration/Categories/Categories.home.html',
                        controller: 'CategoriesController',
                        controllerAs: 'vm',
                        resolve: { "administration": () => { return true } }
                    })
                    .when('/Administration/Categories/Create', {
                        templateUrl: 'views/app/views/Administration/Categories/Categories.detail.html',
                        controller: 'CreateCategoryController',
                        controllerAs: 'vm',
                        resolve: { "administration": () => { return true } }
                    })
                    .when('/Administration/Categories/Detail/:id', {
                        templateUrl: 'views/app/views/Administration/Categories/Categories.detail.html',
                        controller: 'DetailCategoryController',
                        controllerAs: 'vm',
                        resolve: { "administration": () => { return true } }
                    })
                    .when('/Administration/License', {
                        templateUrl: 'views/app/views/Administration/License/License.home.html',
                        controller: 'LicenseController',
                        controllerAs: 'vm',
                        resolve: { "administration": () => { return true } }
                    })
            }
        ])
})();