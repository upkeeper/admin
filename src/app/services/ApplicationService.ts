namespace upk {
    'use strict';
    export interface IApplicationService {

        RebootConditions: Array<String>;
        InstallConditions: Array<String>;

        getApplications(): ng.IPromise<Application[]>;
        getApplicationNames(): ng.IPromise<Array<String>>;
        getApplicationDetail(id: string): ng.IPromise<Application>;
        addApplication(application: Application): ng.IPromise<Application>;
        removeApplication(id: string): ng.IPromise<{}>;
        updateApplication(id: string, application: Application): ng.IPromise<{}>;

        getApplicationComputers(id: string): ng.IPromise<Computer[]>;
        getAddApplicationComputers(id: string, action: string): ng.IPromise<Computer[]>;

        getRequiredApplications(id: string, action: string): ng.IPromise<Array<Application>>;
        addRequiredApplications(id: string, items: Array<Application>): ng.IPromise<{}>;
        removeRequiredApplications(id: string, items: Array<Application>): ng.IPromise<{}>;

        getConflictingApplications(id: string, action: string): ng.IPromise<Array<Application>>;
        addConflictingApplications(id: string, items: Array<Application>): ng.IPromise<{}>;
        removeConflictingApplications(id: string, items: Array<Application>): ng.IPromise<{}>;

        getApplicationGroups(id: string, action: string): ng.IPromise<Array<Group>>;
        getAddApplicationGroups(id: string, action: string): ng.IPromise<Array<Group>>;

        getApplicationHardwares(id: string): ng.IPromise<Hardware[]>;
        getAddApplicationHardwares(id: string): ng.IPromise<Hardware[]>;

        getApplicationEvents(id: string, startDate?: string, endDate?: string): ng.IPromise<Array<Event>>;
        getApplicationRequests(): ng.IPromise<{}>;

        removeApplicationItems<T>(id: string, items: Array<T>, end: string): ng.IPromise<{}>;
        addApplicationItems<T>(id: string, items: Array<T>, end: string): ng.IPromise<T>;
    }


    class ApplicationService implements IApplicationService {
        apiUrl: string;

        RebootConditions = [
            'No reboot',
            'By program',
            'By upKeeper after install/uninstall'
        ];
        InstallConditions = [
            'Wheater or not user is logged on',
            'Only when user is logged on',
            'Only when no user is logged on'
        ];

        static $inject = ['$http', 'CONFIG'];

        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig) {
            this.apiUrl = CONFIG.apiUrl;
        };

        getApplications(): ng.IPromise<Application[]> {
            return this.$http.get(this.CONFIG.apiUrl + 'Applications').then(res => res.data);
        };

        getApplicationNames(): ng.IPromise<Array<String>> {
            return this.$http.get(this.apiUrl + 'ApplicationNames').then(res => res.data);
        };

        addApplication(application: Application): ng.IPromise<{}> {
            return this.$http.post(this.apiUrl + 'Application', application);
        };

        removeApplication(id: string): ng.IPromise<{}> {
            return this.$http.delete(this.apiUrl + 'Application/' + id);
        };

        updateApplication(id: string, application: Application): ng.IPromise<{}> {
            return this.$http.put(this.apiUrl + 'Application/' + id, application);
        };

        getApplicationDetail(id: string): ng.IPromise<Application> {
            return this.$http.get(this.apiUrl + 'ApplicationDetail/' + id).then(res => res.data);
        };

        getApplicationComputers(id: string): ng.IPromise<Array<Computer>> {
            return this.$http.get(this.apiUrl + 'Application/' + id + '/Computers/True').then(res => res.data);
        };

        getAddApplicationComputers(id: string, action: string): ng.IPromise<Array<Computer>> {
            return this.$http.get(this.apiUrl + 'Application/' + id + '/Computers/' + action).then(res => res.data);
        };

        addApplicationItems<T>(id: string, items: Array<T>, end: string): ng.IPromise<{}> {
            return this.$http.post(this.apiUrl + 'Application/' + id + '/' + end, items);
        };

        removeApplicationItems<T>(id: string, items: Array<T>, end: string): ng.IPromise<{}> {
            var removeUrl = this.apiUrl + 'Application/' + id + '/' + end;

            return this.$http({
                method: 'DELETE',
                url: removeUrl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: items
            })
        };

        getRequiredApplications(id: string, action: string): ng.IPromise<Array<Application>> {
            return this.$http.get(this.apiUrl + 'RequiredApplications/' + id + '?members=' + action).then(res => res.data);
        };
        addRequiredApplications(id: string, items: Array<Application>): ng.IPromise<{}> {
            return this.$http.post(this.apiUrl + 'RequiredApplications/' + id, items);
        };
        removeRequiredApplications(id: string, items: Array<Application>): ng.IPromise<{}> {
            var removeUrl = this.apiUrl + 'RequiredApplications/' + id;

            return this.$http({
                method: 'DELETE',
                url: removeUrl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: items
            })
        };


        getConflictingApplications(id: string, action: string): ng.IPromise<Array<Application>> {
            return this.$http.get(this.apiUrl + 'ConflictingApplications/' + id + '?members=' + action).then(res => res.data);
        };
        addConflictingApplications(id: string, items: Array<Application>): ng.IPromise<{}> {
            return this.$http.post(this.apiUrl + 'ConflictingApplications/' + id, items);
        };
        removeConflictingApplications(id: string, items: Array<Application>): ng.IPromise<{}> {
            var removeUrl = this.apiUrl + 'ConflictingApplications/' + id;

            return this.$http({
                method: 'DELETE',
                url: removeUrl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: items
            })
        };

        getApplicationGroups(id: string, action: string): ng.IPromise<Array<Group>> {
            return this.$http.get(this.apiUrl + 'Application/' + id + '/Groups?members=' + action).then(res => res.data);
        };

        getAddApplicationGroups(id: string, action: string): ng.IPromise<{}> {
            return this.$http.get(this.apiUrl + 'Application/' + id + '/Groups?members=' + action).then(res => res.data);
        };

        getApplicationHardwares(id: string): ng.IPromise<Hardware[]> {
            return this.$http.get(this.apiUrl + 'Application/' + id + '/Hardware?members=True').then(res => res.data);
        };

        getAddApplicationHardwares(id: string): ng.IPromise<Hardware[]> {
            return this.$http.get(this.apiUrl + 'Application/' + id + '/Hardware?members=False').then(res => res.data);
        };

        getApplicationEvents(id: string, startDate?: string, endDate?: string): ng.IPromise<Array<Event>> {
            let now = moment().format('YYYY-MM-DD');
            let earlier = moment().subtract(3, 'months').format('YYYY-MM-DD');
            return this.$http.get(this.apiUrl + 'Application/' + id + '/Events?logLevel=0&startDate=' + earlier + '&endDate=' + now)
                .then(res => res.data);
        };

        getApplicationRequests(): any {
            return this.$http.get(this.apiUrl + 'RequestedApplications').then(res => res.data);
        };
    }

    angular.module('Upkeeper')
        .service('applicationService', ApplicationService);
}