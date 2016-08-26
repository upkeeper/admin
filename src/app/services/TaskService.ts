module upk {
    export interface ITaskService {
        getTasks(): ng.IPromise<Task[]>;
        getTaskNames(): ng.IHttpPromise<Array<String>>;
        addTask(task: Task): ng.IHttpPromise<{}>;
        getTaskDetail(id: string): ng.IHttpPromise<Task>;
        updateTask(id: string, task: Task): ng.IHttpPromise<{}>;
        removeTask(id: string): ng.IHttpPromise<{}>;
        getTaskComputers(id: string, action: string): ng.IHttpPromise<Computer[]>;
        addTaskComputers(id: string, items: Array<Computer>): ng.IHttpPromise<{}>;
        getTaskGroups(id: string, action: string): ng.IHttpPromise<Group[]>;
        addTaskGroups(id: string, items: Array<Group>): ng.IHttpPromise<{}>;
        removeTaskComputers(id: string, items: Array<Computer>): ng.IPromise<{}>;
        removeTaskGroups(id: string, items: Array<Group>);
        getTaskFunctions(): ng.IPromise<Array<any>>;
        getSchemaTypes(): ng.IPromise<Array<any>>;
    }

    class TaskService implements ITaskService {
        apiUrl: string;

        static $inject = ['$http', 'CONFIG', 'ApiService', '$rootScope'];
        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig, private ApiService: IApiService, private $rootScope) {
            this.apiUrl = CONFIG.apiUrl;
        }
        getTasks(): ng.IPromise<Task[]> {
            return this.$http.get(this.apiUrl + 'Tasks').then(res => res.data);
        }

        getTaskNames() {
            return this.$http.get(this.apiUrl + 'TaskNames');
        }

        addTask(task: Task) {
            task.OrganizationId = this.$rootScope.currentOrganization;
            if(task.Deleted == undefined)
                task.Deleted = false;
            return this.$http.post(this.apiUrl + 'Task', task)
        }

        getTaskDetail(id: string) {
            return this.$http.get(this.apiUrl + 'Task/' + id);
        };

        updateTask(id: string, task: Task) {
            return this.$http.put(this.apiUrl + 'Task/' + id, task)
        }

        removeTask(id: string) {
            return this.$http.delete(this.apiUrl + 'Task/' + id)
        }

        getTaskComputers(id: string, action: string) {
            return this.$http.get(this.apiUrl + 'Task/' + id + '/Computers?members=' + action);
        };

        addTaskComputers(id: string, items: Array<Computer>) {
            return this.$http.post(this.apiUrl + 'Task/' + id + '/Computers', items);
        };

        getTaskGroups(id: string, action: string) {
            return this.$http.get(this.apiUrl + 'Task/' + id + '/Groups?members=' + action);
        };

        addTaskGroups(id: string, items: Array<Group>) {
            return this.$http.post(this.apiUrl + 'Task/' + id + '/Groups', items)
        };

        removeTaskComputers(id: string, items: Array<Computer>) {
            var removeUrl = this.apiUrl + 'Task/' + id + '/Computers';

            return this.$http({
                method: 'DELETE',
                url: removeUrl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: items
            })
        };

        removeTaskGroups(id: string, items: Array<Group>) {
            var removeUrl = this.apiUrl + 'Task/' + id + '/Groups';

            return this.$http({
                method: 'DELETE',
                url: removeUrl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: items
            })
        };

        getTaskFunctions() {
            return this.$http.get(this.apiUrl + 'Tasks/Functions').then(res => res.data);
        }

        getSchemaTypes(){
            return this.$http.get(this.apiUrl + `Tasks/Schematypes?intervalBased=false`).then(res => res.data);
        }
    }
    angular.module('Upkeeper')
        .service('taskService', TaskService);
}


