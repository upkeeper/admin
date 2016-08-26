namespace upk {
    class AddDepartmentController {
        department: Department;

        static $inject = ['$location', 'departmentsService', '$rootScope'];
        constructor(private $location, private departmentsService: IDepartmentService, private $rootScope) {}

        save() {
            this.department.Organizationid = this.$rootScope.currentOrganization;
            this.departmentsService.addDepartment(this.department).then(() => this.$location.path('/Departments'));
        };
    }
    angular.module('Upkeeper')
        .controller('AddDepartmentController', AddDepartmentController);
}