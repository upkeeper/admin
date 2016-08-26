namespace upk {
    'use strict';

    export interface IUserService {
        getUsers(): ng.IPromise<Array<User>>;
        getUser(id: string): ng.IPromise<User>;
        addUser(user: User): ng.IPromise<{}>;
        updateUser(user: User): ng.IPromise<{}>;
        deleteUser(id: string): ng.IPromise<{}>;

        getUserRoles(id: string): ng.IPromise<Array<Role>>;
        addUserRole(id: string, rolesId: Array<String>): ng.IPromise<{}>;
        deleteUserRole(id: string): ng.IPromise<{}>;


    }
    class UserService implements IUserService {
        apiUrl: string;

        static $inject: Array<string> = ['$http', 'CONFIG'];
        constructor(private $http: ng.IHttpService, private CONFIG) {
            this.apiUrl = CONFIG.apiUrl;
        }

        getUsers(): ng.IPromise<User[]> {
            //return this.$http.get(`${this.apiUrl}Users?upKeeperUsers=false`).then(res => res.data);
            return this.$http.get(this.apiUrl + 'Users?upKeeperUsers=true').then(res => res.data);
        }

        getUser(id: string): ng.IPromise<User> {
            return this.$http.get(this.apiUrl + 'User/' + id).then(res => res.data);
        }

        addUser(user: User): ng.IPromise<{}> {
            user.Deleted = false;
            user.Source = 'upKeeper';
            return this.$http.post(this.apiUrl + 'User', user);
        }

        updateUser(user: User): ng.IPromise<{}> {
            return this.$http.put(this.apiUrl + 'User', user);
        }

        deleteUser(id: string): ng.IPromise<{}> {
            return this.$http.delete(this.apiUrl + 'User/' + id);
        }

        getUserRoles(id: string): ng.IPromise<Array<Role>> {
            return this.$http.get(this.apiUrl + 'User/' + id).then(res => res.data);
        }
        addUserRole(id: string, rolesId: Array<String>) {
            return this.$http.get(this.apiUrl + 'User/' + id);
        }
        deleteUserRole(id: string): ng.IPromise<{}> {
            return this.$http.delete(this.apiUrl + 'User/' + id + '/Roles');
        }
    }
    angular
        .module('Upkeeper')
        .service('UserService', UserService);
}
