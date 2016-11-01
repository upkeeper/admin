namespace upk {
    'use strict';

    export interface IApiService {
        apiUrl: string;
        organization: string;
        organizationId: string;

        setCurrentOrganization(orgname: string): void;
        setLoginParameters(): ng.IPromise<any>;
        getOrganizationSummary(): ng.IPromise<any>;
        logout(): void;
        login(): void;
    }
    class ApiService implements IApiService {
        public apiUrl: string;
        public organization: string;
        public organizationId: string;
        public organizationName: string;

        static $inject: Array<string> = ['tokenService', 'UserService', 'organizationService',
            '$rootScope', 'CONFIG', '$window', '$q', 'PermissionService', '$http'];
        constructor(private tokenService: ITokenService,
            private userService: IUserService,
            private organizationService: IOrganizationService,
            private $rootScope: any,
            private CONFIG: config.IConfig,
            private $window: any,
            private $q: ng.IQService,
            private PermissionService: IPermissionService,
            private $http: ng.IHttpService) {
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
            let token: any = this.tokenService.getOrganizations();
            this.organization = localStorage.getItem('organization');
            this.organizationId = localStorage.getItem('organizationId');
            this.organizationName = localStorage.getItem('organizationName');
            if (this.organization) {
                token = JSON.parse(token);
                if (this.organizationName) {
                    this.organizationId = token.filter(o => o.Name === this.organizationName)[0].Id;
                }
                this.$rootScope.currentOrganization = localStorage.getItem('organizationId');
                this.$rootScope.currentOrgName = localStorage.getItem('organizationName');
                this.setApiUrl();
                this.PermissionService.Login();
            } else {
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

        getOrganizationSummary() {
            let now = moment().format('YYYY-MM-DD');
            let earlier = moment().subtract(3, 'months').format('YYYY-MM-DD');
            console.log(this.organizationId)
            return this.$http.get(this.CONFIG.apiUrl + 'Organization/' + this.organizationId + '/Summary?startDate=' +
                earlier + '&endDate=' + now)
                .then(res => res.data);
        }
    }
    angular
        .module('Upkeeper')
        .service('ApiService', ApiService);
}