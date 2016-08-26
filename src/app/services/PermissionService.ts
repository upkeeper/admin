namespace upk {
    'use strict';

    export interface IPermissionService {
        HasPermission(permission: string): boolean;
        IsAdmin(): boolean;
        Login();
        Logout();
    }

    class PermissionService implements IPermissionService {
        token: Token;
        isAdmin: boolean = false;

        static $inject: Array<string> = ['tokenService', '$q'];
        constructor(private tokenService: ITokenService, private $q: ng.IQService) {
            this.Login();
        }
        
        Login(){
            this.token = this.tokenService.getToken();
            if (this.token) {
                if (this.token.upkeeper_admin == "True") {
                    this.isAdmin = true;
                }
            }
            else
                this.isAdmin = false;
        }
        
        Logout(){
            this.token = null;
            this.isAdmin = false;
        }

        HasPermission(permission: string): boolean {
            if (this.isAdmin) {
                return true;
            }
            if (this.token && _.includes(this.token.user_organization_roles_permissions[this.tokenService.getOrganizationNumber()].permissions, permission)) {
                return true;
            }
            else {
                false
            }
        }

        IsAdmin(): boolean {
            if (this.isAdmin)
                return true;
            else
                return false;
        }
    }

    angular
        .module('Upkeeper')
        .service('PermissionService', PermissionService);
}