namespace upk {
    'use strict';

    export interface IDepartmentService {
        getDepartments(): ng.IHttpPromise<Department[]>;
        getDepartmentDetail(id: string): ng.IHttpPromise<Department>;
        getDepartmentComputers(id: string, action: string): ng.IHttpPromise<Computer[]>;
        getDepartmentUsers(id: string, action: string): ng.IHttpPromise<User[]>;
        addDepartment(department: Department): ng.IHttpPromise<{}>;
        removeDepartment(id: string): ng.IHttpPromise<{}>;
        updateDepartment(id: string, department: Department): ng.IHttpPromise<{}>;
        addDepartmentItems<T>(id: string, items: Array<T>, end: string): ng.IHttpPromise<{}>;
        removeDepartmentItems<T>(id: string, items: Array<T>, end: string): ng.IPromise<Array<T>>;

    }

    class DepartmentService implements IDepartmentService {
        apiUrl: string;

        static $inject: Array<String> = ['$http', 'CONFIG', 'ApiService'];
        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig, private ApiService: IApiService) {
            this.apiUrl = CONFIG.apiUrl;
        }

        getDepartments() {
            return this.$http.get(this.apiUrl + 'Departments')
        }

        getDepartmentDetail(id: string) {
            return this.$http.get(this.apiUrl + 'Department/' + id);
        }

        addDepartment(department: Department) {
            department.Deleted = false;

            return this.$http.post(this.apiUrl + 'Department', department)
        }

        removeDepartment(id: string) {
            return this.$http.delete(this.apiUrl + 'Department/' + id);
        }

        updateDepartment(id: string, department: Department) {
            return this.$http.put(this.apiUrl + 'Department/' + id, department);
        }
        getDepartmentComputers(id: string, action: string) {
            return this.$http.get(this.apiUrl + 'Department/' + id + '/Computers?members=' + action);
        };

        getDepartmentUsers(id: string, action: string) {
            return this.$http.get(this.apiUrl + 'Department/' + id + '/Users?members=' + action);
        }

        addDepartmentItems<T>(id: string, items: Array<T>, end: string) {
            return this.$http.post(this.apiUrl + 'Department/' + id + '/' + end, items);
        }

        removeDepartmentItems<T>(id: string, items: Array<T>, end: string) {
            var removeUrl = this.apiUrl + 'Department/' + id + '/' + end;

            return this.$http({
                method: 'DELETE',
                url: removeUrl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: items
            })
        };
    }
    angular.module('Upkeeper')
        .service('departmentsService', DepartmentService)
}