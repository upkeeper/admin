namespace upk {
    'use strict';

    export class AppController {
        settings = this.SettingsService;
        listlimit = this.SettingsService.listlimit;
        limit = this.SettingsService.listlimit[0];
        authentication = this.authService.getAuthentication();
        selectedOrganization: string;
        organizations: Organization[] = [];

        static $inject: Array<string> = ['authService', '$rootScope', '$location', 'SettingsService', 'ApiService', 'PermissionService', '$window', 'organizationService'];
        constructor(private authService: IAuthService, private $rootScope, private $location: ng.ILocationService, private SettingsService: ISettingsService, private ApiService: IApiService, private PermissionService: IPermissionService, private $window, private OrganizationService: IOrganizationService) {
            OrganizationService.getOrganizations().then(res => {
                this.organizations = res;
                this.organizations.forEach(item => {
                    item.Number = item.Number.toString();
                })
            })
            $rootScope.listlimit = this.limit;
        }

        HasPermission(permission: string): boolean {
            return this.PermissionService.HasPermission(permission)
        }

        IsAdmin() {
            return this.PermissionService.IsAdmin();
        }

        isLoginScreen() {
            if (this.$location.path() == '/Login')
                return true;
            else
                return false;
        }

        setListLimit() {
            this.$rootScope.listlimit = this.limit;
        };

        setCurrentOrganization() {
            this.ApiService.setCurrentOrganization();
        }

        logout() {
            this.authService.logout();
        }

    }

    angular
        .module('Upkeeper')
        .controller('AppController', AppController);
}
