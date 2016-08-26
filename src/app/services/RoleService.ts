namespace upk {
    'use strict';

    export interface IRoleService {
        getRoles(): ng.IPromise<Array<Role>>;
        getRole(id: string): ng.IPromise<Role>;
        addRole(role: Role): ng.IPromise<{}>;
        removeRole(id: string): ng.IPromise<{}>;
        updateRole(role: Role): ng.IPromise<{}>;
        getRolePermissions(id: string, member: boolean): ng.IPromise<Array<Permission>>;
        addRolePermission(id: string, permissionsId: Array<String>): ng.IPromise<{}>;
        removeRolePermission(id: string): ng.IPromise<{}>;
    }
    class RoleService implements IRoleService {
        apiUrl: string;

        static $inject: Array<string> = ['$http', 'CONFIG'];
        constructor(private $http: ng.IHttpService,  private CONFIG) {
            this.apiUrl = CONFIG.apiUrl;
        }

        getRoles(): ng.IPromise<Role[]> {
            return this.$http.get(this.apiUrl + 'Roles').then(res => res.data);
        }

        getRole(id: string): ng.IPromise<Role> {
            return this.$http.get(this.apiUrl + 'Role/' + id).then(res => res.data);
        }

        addRole(role: Role): ng.IPromise<any> {
            return this.$http.post(this.apiUrl + 'Role', role);
        }

        removeRole(id: string): ng.IPromise<{}> {
            return this.$http.delete(this.apiUrl + 'Role/' + id);
        }

        updateRole(role: Role): ng.IPromise<{}> {
            return this.$http.put(this.apiUrl + 'Role', role);
        }

        getRolePermissions(id: string, member: boolean): ng.IPromise<Array<Permission>> {
            return this.$http.get(this.apiUrl + 'Role/' + id + '/Permissions?members=' + member).then(res => res.data);
        }

        addRolePermission(id: string, permissionsId: Array<String>): ng.IPromise<{}> {
            return this.$http.post(this.apiUrl + 'Role/' + id + 'Permission', null);
        }

        removeRolePermission(id: string): ng.IPromise<{}> {
            return this.$http.delete(this.apiUrl + 'Role/' + id + '/Permission');
        }

    }
    angular
        .module('Upkeeper')
        .service('RoleService', RoleService);
}


