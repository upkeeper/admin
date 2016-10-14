namespace upk {
    'use strict';

    export interface IUserService {
        getUsers(): ng.IPromise<Array<User>>;
        getADUsers(): ng.IPromise<Array<User>>;
        getUser(id: string): ng.IPromise<User>;
        addUser(user: User): ng.IPromise<{}>;
        updateUser(user: User): ng.IPromise<{}>;
        deleteUser(id: string): ng.IPromise<{}>;

        getUserRoles(id: string, member: boolean): ng.IPromise<Role[]>;
        addUserRole(id: string, rolesId: Array<String>): ng.IPromise<{}>;
        addUserRoles(id: string, roles: Role[]);
        deleteUserRole(id: string): ng.IPromise<{}>;
        getUserOrganizations(id: string): ng.IPromise<any>;


    }
    class UserService implements IUserService {
        apiUrl: string;

        static $inject: Array<string> = ['$http', 'CONFIG'];
        constructor(private $http: ng.IHttpService, private CONFIG) {
            this.apiUrl = CONFIG.apiUrl;
        }

        getUsers(): ng.IPromise<User[]> {
            return this.$http.get(this.apiUrl + 'Users?upKeeperUsers=true').then(res => res.data);
        }

        getADUsers(): ng.IPromise<User[]> {
            return this.$http.get(this.apiUrl + 'Users?upkeeperUsers=false').then(res => res.data);
        }

        getUser(id: string): ng.IPromise<User> {
            return this.$http.get(this.apiUrl + 'User/' + id).then(res => res.data);
        }

        getUserOrganizations(id: string) {
            return this.$http.get(this.apiUrl + 'User/' + id + '/Organizations');
        }


        addUser(user: User): ng.IPromise<any> {
            user.Deleted = false;
            user.Source = 'upKeeper';
            return this.$http.post(this.apiUrl + 'User', user);
        }

        updateUser(user: User): ng.IPromise<any> {
            return this.$http.put(this.apiUrl + 'User', user);
        }

        deleteUser(id: string): ng.IPromise<any> {
            return this.$http.delete(this.apiUrl + 'User/' + id);
        }

        getUserRoles(id: string, member: boolean): ng.IPromise<Array<Role>> {
            return this.$http.get(this.apiUrl + 'User/' + id + '/Roles?member=' + member).then(res => res.data);
        }
        addUserRole(id: string, rolesId: Array<String>) {
            return this.$http.get(this.apiUrl + 'User/' + id);
        }
        addUserRoles(id: string, roles: Role[]) {
            return this.$http.post(this.apiUrl + 'User/' + id + '/Roles', roles);
        }
        deleteUserRole(id: string): ng.IPromise<{}> {
            return this.$http.delete(this.apiUrl + 'User/' + id + '/Roles');
        }

        /* getDevices() {
             return this.$http.get('http://localhost:1338/devices').then(res => res.data);
         }*/
    }
    angular
        .module('Upkeeper')
        .service('UserService', UserService);
}
