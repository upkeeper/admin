module upk {
    'use strict';
    export interface IGroupService {
        getGroups(): ng.IPromise<Group[]>;
        getGroupNames(): ng.IHttpPromise<Array<String>>;
        getGroupDetail(id: string): ng.IHttpPromise<Group>;
        addGroup(group: Group): ng.IHttpPromise<{}>;
        removeGroup(group: string): ng.IHttpPromise<{}>;
        updateGroup(id: string, group: Group): ng.IHttpPromise<{}>;
        addGroupItems<T>(id: string, items: Array<T>, end: string): ng.IHttpPromise<{}>;
        getGroupApplications(id: string, action: string): ng.IHttpPromise<Application[]>;
        getGroupComputers(id: string, action: string): ng.IHttpPromise<Computer[]>;
        getGroupTasks(id: string, action: string): ng.IHttpPromise<Task[]>;
        getGroupSettings(id: string): ng.IPromise<String>;
        saveSettings(id: string, settings: string): ng.IPromise<{}>;
        removeGroupItems<T>(id: string, items: Array<T>, end: string, action?: string): ng.IPromise<{}>;

    }

    class GroupService implements IGroupService {
        apiUrl: string;

        static $inject: Array<string> = ['$http','CONFIG', 'ApiService'];
        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig, private ApiService: IApiService) {
            this.apiUrl = CONFIG.apiUrl;
        }

        getGroups(): ng.IPromise<Group[]> {
            return this.$http.get(this.apiUrl + 'Groups').then(res => res.data);
        };

        getGroupNames() {
            return this.$http.get(this.apiUrl + 'GroupNames')
        }

        getGroupDetail(id: string) {
            return this.$http.get(this.apiUrl + 'GroupDetail/' + id);
        };

        getGroupSettings(id: string): ng.IPromise<String> {
            return this.$http.get(this.apiUrl + 'Group/' + id + '/Settings').then(res => res.data);
        }

        saveSettings(id: string, settings: string): ng.IPromise<{}> {
            var url = this.apiUrl + 'Group/' + id + '/Settings?settings=' + settings;
            return this.$http({
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

        addGroup(group: Group) {
            group.organizationId = this.ApiService.organizationId;
            group.Source = 'upKeeper';
            group.Active = true;
            return this.$http.post(this.apiUrl + 'Group', group);
        };

        removeGroup(id: string) {
            return this.$http.delete(this.apiUrl + 'Group/' + id)
        };

        updateGroup(id: string, group: Group) {
            return this.$http.put(this.apiUrl + 'Group/' + id, group)
        };

        addGroupItems<T>(id: string, items: Array<T>, end: string) {
            return this.$http.post(this.apiUrl + 'Group/' + id + '/' + end, items);
        };

        removeGroupItems<T>(id: string, items: Array<T>, end: string, action?: string) {
            if (action)
                var removeUrl = this.apiUrl + 'Group/' + id + '/' + end + '?withoutAction=' + action;
            else
                var removeUrl = this.apiUrl + 'Group/' + id + '/' + end;

            return this.$http({
                method: 'DELETE',
                url: removeUrl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: items
            })
        };

        getGroupApplications(id: string, action: string) {
            return this.$http.get(this.apiUrl + 'Group/' + id + '/Applications?members=' + action);
        };

        getGroupComputers(id: string, action: string) {
            return this.$http.get(this.apiUrl + 'Group/' + id + '/Computers?members=' + action);
        };

        getGroupTasks(id: string, action: string) {
            return this.$http.get(this.apiUrl + 'Group/' + id + '/Tasks?members=' + action);
        };
    }
    angular.module('Upkeeper')
        .service('groupService', GroupService);
}
