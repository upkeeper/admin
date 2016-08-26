namespace upk {
    'use strict';

    export interface IApiService {
        apiUrl: string;
        organization: string;
        organizationId: string;

        setCurrentOrganization(): void;
        setLoginParameters(): ng.IPromise<any>;
        logout(): void;
        login(): void;
    }
    class ApiService implements IApiService {
        public apiUrl: string;
        public organization: string;
        public organizationId: string;

        static $inject: Array<string> = ['organizationService', '$rootScope', 'CONFIG', '$window', '$q', 'PermissionService'];
        constructor(private organizationService: IOrganizationService, private $rootScope, private CONFIG: config.IConfig, private $window, private $q: ng.IQService, private PermissionService) {
        }

        setApiUrl() {
            this.CONFIG.apiUrl = this.CONFIG.baseUrl + 'api/' + localStorage.getItem('organization') + '/';
        }

        setCurrentOrganization() {
            localStorage.setItem('organization', this.organization);
            localStorage.setItem('organizationId', this.organizationId);
            this.$window.location.reload();
        }

        setLoginParameters() {
            var deferred = this.$q.defer();
            this.organization = localStorage.getItem('organization');
            this.organizationId = localStorage.getItem('organizationId');
            this.organizationService.getOrganizations().then(res => {
                if (this.organization) {
                    this.$rootScope.currentOrganization = localStorage.getItem('organizationId');
                    this.setApiUrl();
                    this.PermissionService.Login();
                }
                else {
                    this.organization = res[0].Number;
                    this.organizationId = res[0].Id;
                    localStorage.setItem('organization', res[0].Number);
                    this.$rootScope.currentOrganization = res[0].Id;
                    localStorage.setItem('organizationId', res[0].Id);
                    this.setApiUrl();
                    this.PermissionService.Login();
                }
                deferred.resolve();
            })
            return deferred.promise
        }

        logout() {
            this.PermissionService.Logout();
            this.organization = null;
        }

        login() {
            this.setLoginParameters();
        }
    }
    angular
        .module('Upkeeper')
        .service('ApiService', ApiService)
}