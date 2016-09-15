namespace upk {
    'use strict';

    export interface IComputerService {
        getComputers(): ng.IPromise<Computer[]>;
        getComputersWithPaging(id: string, page: string, pageSize: string): ng.IHttpPromise<Computer[]>;
        getComputerDetail(id: string): ng.IPromise<Computer>;
        addComputer(computer: Computer): ng.IHttpPromise<{}>;
        removeComputer(id: string): ng.IHttpPromise<{}>;
        updateComputer(id: string, computer: Computer): ng.IHttpPromise<{}>;
        getInstantFunctions(id: string): ng.IPromise<UpkFunction[]>;
        postInstantFunction(computerId: string, functionId: string, username: string): ng.IHttpPromise<UpkFunction>;
        postInstantFunctions(computerIds: Array<string>, functionId: string): ng.IPromise<any>;
        getListHardwares(id: string): ng.IHttpPromise<Hardware[]>;
        getListPlatforms(id: string): ng.IHttpPromise<Platform[]>;
        denyApplications<T>(id: string, items: Array<T>): ng.IHttpPromise<{}>;
        getComputerApplications(id: string, action: string): ng.IPromise<Application[]>;
        getComputerGroups(id: string, action: string): ng.IPromise<Group[]>;
        getComputerTasks(id: string, action: string): ng.IPromise<Task[]>;
        getComputerSettings(id: string): ng.IHttpPromise<Settings[]>;
        getComputerEvents(id: string): ng.IPromise<Events[]>;
        addComputerItems<T>(id: string, items: Array<T>, end: string): ng.IHttpPromise<{}>;
        removeComputerItems<T>(id: string, items: Array<T>, end: string): ng.IPromise<Array<T>>;
        getHardwareInventory(id: string): ng.IPromise<any>;
        getSoftwareInventory(id: string): ng.IPromise<any>;
        getUpdateInventory(id: string): ng.IPromise<any>;
        getMergedSettings(id: string): ng.IPromise<any>;
        getComputerExported(computers: string[]): ng.IPromise<any>;
    }
    class ComputerService implements IComputerService {
        apiUrl: string;

        static $inject: Array<string> = ['$http', 'CONFIG', 'ApiService'];
        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig, private ApiService: IApiService) {
            this.apiUrl = CONFIG.apiUrl;
        }

        getComputers() {
            return this.$http.get(this.apiUrl + 'Computers').then(res => res.data)
        }


        getComputersWithPaging(id: string, page: string, pageSize: string) {
            return this.$http.get(this.apiUrl + 'Computers/' + this.ApiService.organization + '/' + page + '/' + pageSize);
        }

        getComputerDetail(id: string) {
            return this.$http.get(this.apiUrl + 'ComputerDetail/' + id).then(res => res.data);
        };

        addComputer(computer: Computer) {
            return this.$http.post(this.apiUrl + 'Computer', computer);
        };

        removeComputer(id: string) {
            return this.$http.delete(this.apiUrl + 'Computer/' + id);
        };

        updateComputer(id: string, computer: Computer) {
            return this.$http.put(this.apiUrl + 'Computer/' + id, computer)
        };

        getInstantFunctions(id: string) {
            return this.$http.get(this.apiUrl + 'Computer/' + id + '/InstantFunctions').then(res => res.data);
        };

        postInstantFunction(id: string, functionId: string, username: string) {
            return this.$http.post(this.apiUrl + 'Computer/' + id + '/InstantTasks?functionId=' +
                functionId + '&userName=' + username, null);
        };

        postInstantFunctions(computerIds: Array<string>, functionId: string) {
            return this.$http.post(this.apiUrl + 'InstantTask/' + functionId + '/Computers', computerIds);
        }

        getListHardwares(id: string) {
            return this.$http.get(this.apiUrl + 'Computer/' + id + '/ListHardware');
        };

        getListPlatforms(id: string) {
            return this.$http.get(this.apiUrl + 'Computer/' + id + '/ListPlatforms');
        };

        denyApplications<T>(id: string, items: Array<T>) {
            return this.$http.post(this.apiUrl + 'Computers/' + id + '/DenyApplications', items);
        };

        getComputerApplications(id: string, action: string) {
            return this.$http.get(this.apiUrl + 'Computers/' + id + '/Applications?members=' + action).then(res => res.data);
        };

        getComputerGroups(id: string, action: string) {
            return this.$http.get(this.apiUrl + 'Computers/' + id + '/Groups?members=' + action).then(res => res.data);
        };

        getComputerTasks(id: string, action: string) {
            return this.$http.get(this.apiUrl + 'Computers/' + id + '/Tasks?members=' + action).then(res => res.data);
        };

        getComputerSettings(id: string) {
            return this.$http.get(this.apiUrl + 'Computers/' + id + '/Settings')
        };

        getComputerEvents(id: string) {
            let now = moment().format('YYYY-MM-DD');
            let earlier = moment().subtract(3, 'months').format('YYYY-MM-DD');
            return this.$http.get(this.apiUrl + 'Computer/' + id + '/Events?logLevel=0&startDate=' +
                earlier + '&endDate=' + now).then(res => res.data);
        };

        addComputerItems<T>(id: string, items: Array<T>, end: string) {
            return this.$http.post(this.apiUrl + 'Computers/' + id + '/' + end, items)
        };

        removeComputerItems<T>(id: string, items: Array<T>, end: string) {
            var removeUrl = this.apiUrl + 'Computers/' + id + '/' + end;

            return this.$http({
                method: 'DELETE',
                url: removeUrl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: items
            });
        };

        getHardwareInventory(id: string) {
            return this.$http.get(this.apiUrl + 'Computers/' + id + '/HardwareInventoryBasic').then(res => res.data);
        };

        getSoftwareInventory(id: string) {
            return this.$http.get(this.apiUrl + 'Computers/' + id + '/SoftwareInventory').then(res => res.data);
        };

        getUpdateInventory(id: string) {
            return this.$http.get(this.apiUrl + 'Computers/' + id + '/UpdateInventory').then(res => res.data);
        };

        getMergedSettings(id: string) {
            return this.$http.get(this.apiUrl + 'Computers/' + id + '/MergedSettings').then(res => res.data);
        };

        getComputerExported(computersIds: string[]) {
            return this.$http.post(this.apiUrl + 'Computers/Export', computersIds);
        }
    }
    angular.module('Upkeeper')
        .service('computerService', ComputerService);
}