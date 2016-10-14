namespace upk {
    'use strict';

    export interface IApiService {
        apiUrl: string;
        organization: string;
        organizationId: string;

        setCurrentOrganization(orgname: string): void;
        setLoginParameters(): ng.IPromise<any>;
        logout(): void;
        login(): void;
    }
    class ApiService implements IApiService {
        public apiUrl: string;
        public organization: string;
        public organizationId: string;
        public organizationName: string;

        static $inject: Array<string> = ['tokenService', 'UserService', 'organizationService',
            '$rootScope', 'CONFIG', '$window', '$q', 'PermissionService'];
        constructor(private tokenService: ITokenService,
            private userService: IUserService,
            private organizationService: IOrganizationService,
            private $rootScope: any,
            private CONFIG: config.IConfig,
            private $window: any,
            private $q: ng.IQService,
            private PermissionService: IPermissionService) {
        }

        setApiUrl() {
            this.CONFIG.apiUrl = this.CONFIG.baseUrl + 'api/' + localStorage.getItem('organization') + '/';
        }

        setCurrentOrganization(orgname: string) {
            localStorage.setItem('organization', this.organization);
            localStorage.setItem('organizationId', this.organizationId);
            localStorage.setItem('organizationName', orgname);
            this.$window.location.reload();
        }

        setLoginParameters() {
            var deferred = this.$q.defer();
            this.organization = localStorage.getItem('organization');
            this.organizationId = localStorage.getItem('organizationId');
            this.organizationName = localStorage.getItem('organizationName');
            if (this.organization) {
                this.$rootScope.currentOrganization = localStorage.getItem('organizationId');
                this.$rootScope.currentOrgName = localStorage.getItem('organizationName');
                this.setApiUrl();
                this.PermissionService.Login();
            } else {
                const token = this.tokenService.getOrganizations();
                this.organization = token[0].Number;
                this.organizationId = token[0].Id;
                this.organizationName = token[0].Name;
                localStorage.setItem('organization', token[0].Number);
                localStorage.setItem('organizationId', token[0].Id);
                localStorage.setItem('organizationName', token[0].Name);
                this.$rootScope.currentOrganization = token[0].Id;
                this.setApiUrl();
                this.PermissionService.Login();
            }
            deferred.resolve();
            /*this.tokenService.getOrganizations().then(res => {
                console.log(res);
                if (this.organization) {
                    this.$rootScope.currentOrganization = localStorage.getItem('organizationId');
                    this.$rootScope.currentOrgName = localStorage.getItem('organizationName');
                    this.setApiUrl();
                    this.PermissionService.Login();
                } else {
                    this.organization = res[0].Number;
                    this.organizationId = res[0].Id;
                    this.organizationName = res[0].Name;
                    localStorage.setItem('organization', res[0].Number);
                    localStorage.setItem('organizationId', res[0].Id);
                    localStorage.setItem('organizationName', res[0].Name);
                    this.$rootScope.currentOrganization = res[0].Id;
                    this.setApiUrl();
                    this.PermissionService.Login();
                }
                deferred.resolve();
            });*/
            return deferred.promise;
        }

        logout() {
            this.PermissionService.Logout();
        }

        login() {
            this.setLoginParameters();
        }
    }
    angular
        .module('Upkeeper')
        .service('ApiService', ApiService);
}