namespace upk {
    class DepartmentsController {
        searchbarvalue: string;
        departments: Array < Department > ;

        static $inject = ['$scope', '$location', 'departmentsService'];
        constructor(private $scope: ng.IScope, private $location: ng.ILocationService, private departmentsService: IDepartmentService) {
            this.searchbarvalue = "Department Name: ";
            departmentsService.getDepartments().then(res => this.departments = res.data);
        }

        editdepartment(department: Department) {
            this.$location.path('/Departments/' + department.Id);
        }

        create() {
            this.$location.path('/Departments/Create');
        }
    }
    angular.module('Upkeeper')
        .controller('DepartmentsController', DepartmentsController);
}