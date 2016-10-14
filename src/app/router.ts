((): void => {
    angular.module('Upkeeper')
        .config(['$httpProvider', 'cfpLoadingBarProvider', ($httpProvider, cfpLoadingBarProvider) => {
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.interceptors.push('authInterceptorService');
            cfpLoadingBarProvider.includeBar = false;
            cfpLoadingBarProvider.latencyThreshold = 500;
        }])

        .config([
            '$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
                $routeProvider
                    .when('/', {
                        redirectTo: '/Login'
                    })
                    .when('/Login', {
                        templateUrl: 'views/app/views/Login/Login.html',
                        controller: 'LoginController',
                        controllerAs: 'vm'
                    })
                    .when('/Home', {
                        templateUrl: 'views/app/views/Home/HomeIndex.html',
                        controller: 'HomeController',
                        controllerAs: 'vm'
                    })
                    .when('/Applications', {
                        templateUrl: 'views/app/views/Applications/ApplicationsIndex.html',
                        controller: 'ApplicationController',
                        controllerAs: 'vm'
                    })
                    .when('/Applications/Create', {
                        templateUrl: 'views/app/views/Applications/AddApplication.html',
                        controller: 'AddApplicationController',
                        controllerAs: 'vm'
                    })
                    .when('/Applications/:id', {
                        templateUrl: 'views/app/views/Applications/EditApplication.html',
                        controller: 'EditApplicationController',
                        controllerAs: 'vm'
                    })
                    .when('/Computers', {
                        templateUrl: 'views/app/views/Computers/ComputersIndex.html',
                        controller: 'ComputerController',
                        controllerAs: 'vm'
                    })
                    .when('/Computers/Create', {
                        templateUrl: 'views/app/views/Computers/AddComputer.html',
                        controller: 'AddComputerController',
                        controllerAs: 'vm'
                    })
                    .when('/Computers/:id', {
                        templateUrl: 'views/app/views/Computers/EditComputer.html',
                        controller: 'EditComputerController',
                        controllerAs: 'vm'
                    })
                    .when('/Groups', {
                        templateUrl: 'views/app/views/Groups/GroupsIndex.html',
                        controller: 'GroupsController',
                        controllerAs: 'vm'
                    })
                    .when('/Groups/Create', {
                        templateUrl: 'views/app/views/Groups/AddGroup.html',
                        controller: 'AddGroupController',
                        controllerAs: 'vm'
                    })
                    .when('/Groups/:id', {
                        templateUrl: 'views/app/views/Groups/EditGroup.html',
                        controller: 'EditGroupController',
                        controllerAs: 'vm'
                    })
                    .when('/Hardware', {
                        templateUrl: 'views/app/views/Hardware/HardwareIndex.html',
                        controller: 'HardwareController',
                        controllerAs: 'vm'
                    })
                    .when('/Hardware/Create', {
                        templateUrl: 'views/app/views/Hardware/AddHardware.html',
                        controller: 'AddHardwareController',
                        controllerAs: 'vm'
                    })
                    .when('/Hardware/:id', {
                        templateUrl: 'views/app/views/Hardware/EditHardware.html',
                        controller: 'EditHardwareController',
                        controllerAs: 'vm'
                    })
                    .when('/Platforms', {
                        templateUrl: 'views/app/views/Platforms/PlatformsIndex.html',
                        controller: 'PlatformsController',
                        controllerAs: 'vm'
                    })
                    .when('/Platforms/Create', {
                        templateUrl: 'views/app/views/Platforms/AddPlatform.html',
                        controller: 'AddPlatformController',
                        controllerAs: 'vm'
                    })
                    .when('/Platforms/:id', {
                        templateUrl: 'views/app/views/Platforms/EditPlatform.html',
                        controller: 'EditPlatformController',
                        controllerAs: 'vm'
                    })
                    .when('/DistributionPoints', {
                        templateUrl: 'views/app/views/DistributionPoints/DistributionsIndex.html',
                        controller: 'DistributionsController',
                        controllerAs: 'vm'
                    })
                    .when('/DistributionPoints/Create', {
                        templateUrl: 'views/app/views/DistributionPoints/AddDistribution.html',
                        controller: 'AddDistributionController',
                        controllerAs: 'vm'
                    })
                    .when('/DistributionPoints/:id', {
                        templateUrl: 'views/app/views/DistributionPoints/EditDistribution.html',
                        controller: 'EditDistributionController',
                        controllerAs: 'vm'
                    })
                    .when('/Tasks', {
                        templateUrl: 'views/app/views/Tasks/TasksIndex.html',
                        controller: 'TasksController',
                        controllerAs: 'vm'
                    })
                    .when('/Tasks/Create', {
                        templateUrl: 'views/app/views/Tasks/AddTask.html',
                        controller: 'AddTaskController',
                        controllerAs: 'vm'
                    })
                    .when('/Tasks/:id', {
                        templateUrl: 'views/app/views/Tasks/EditTask.html',
                        controller: 'EditTaskController',
                        controllerAs: 'vm'
                    })
                    .when('/Configuration', {
                        templateUrl: 'views/app/views/Configuration/Configurationindex.html',
                        controller: 'ConfigurationController',
                        controllerAs: 'vm'
                    })
                    .when('/BatchJobs', {
                        templateUrl: 'views/app/views/BatchJobs/BatchJobsIndex.html',
                        controller: 'BatchJobsController',
                        controllerAs: 'vm'

                    })
                    .when('/BatchJobs/Create', {
                        templateUrl: 'views/app/views/BatchJobs/AddBatchjob.html',
                        controller: 'AddBatchJobController',
                        controllerAs: 'vm'

                    })
                    .when('/BatchJobs/:id', {
                        templateUrl: 'views/app/views/BatchJobs/EditBatchJob.html',
                        controller: 'EditBatchJobsController',
                        controllerAs: 'vm'
                    })
                    .when('/Reports', {
                        templateUrl: 'views/app/views/Reports/ReportsIndex.html',
                        controller: 'ReportsController',
                        controllerAs: 'vm'

                    })
                    .when('/Departments', {
                        templateUrl: 'views/app/views/Departments/DepartmentsIndex.html',
                        controller: 'DepartmentsController',
                        controllerAs: 'vm'

                    })
                    .when('/Departments/Create', {
                        templateUrl: 'views/app/views/Departments/AddDepartment.html',
                        controller: 'AddDepartmentController',
                        controllerAs: 'vm'

                    })
                    .when('/Departments/:id', {
                        templateUrl: 'views/app/views/Departments/EditDepartment.html',
                        controller: 'EditDepartmentsController',
                        controllerAs: 'vm'
                    })
                    .when('/Users', {
                        templateUrl: 'views/app/views/Users/UsersIndex.html',
                        controller: 'UsersController',
                        controllerAs: 'vm'
                    })
                    .when('/Users/Create', {
                        templateUrl: 'views/app/views/Users/UsersIndex.html',
                        controller: 'UsersController',
                        controllerAs: 'vm'
                    })
                    .when('/Users/:id', {
                        templateUrl: 'views/app/views/Users/EditUser.html',
                        controller: 'EditUserController',
                        controllerAs: 'vm'
                    })
                    .otherwise({
                        redirectTo: '/Home'
                    });
            }])

        .run([
            'ApiService', '$rootScope', '$location', 'authService', 'tokenService', 'organizationService',
            (ApiService, $rootScope, $location, authService, tokenService, organizationService: upk.IOrganizationService) => {
                authService.fillAuthData();

                $rootScope.$on('$routeChangeStart', (event, next, current) => {
                    if(next.$$route.originalPath === '/Login' && authService.isAuthenticated){
                        $location.path('/Home');
                    }
                    authService.fillAuthData();
                });
            }]);
})();

