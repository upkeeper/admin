namespace upk {
    class EditDepartmentsController {

        department: Department;
        computers: Array<Computer>;
        addComputers: Array<Computer>;
        users: Array<User>;
        addUsers: Array<User>;

        static $inject = ['$location', '$routeParams', 'departmentsService'];
        constructor(private $location, private $routeParams, private departmentsService: IDepartmentService) {
            departmentsService.getDepartmentDetail($routeParams.id).then(res => this.department = res.data);
            departmentsService.getDepartmentComputers($routeParams.id, "True").then(res => this.computers = res.data);
            departmentsService.getDepartmentUsers($routeParams.id, "True").then(res => this.users = res.data);
        }

        save() {
            this.departmentsService.updateDepartment(this.$routeParams.id, this.department).then(() => this.$location.path('/Departments'));
        };

        delete() {
            this.departmentsService.removeDepartment(this.department.Id).then(() => this.$location.path('/Departments'));
        };

        getAddApplicationComputers() {
            this.departmentsService.getDepartmentComputers(this.$routeParams.id, "False").then(res => this.addComputers = res.data);
        };

        getAddUsers() {
            this.departmentsService.getDepartmentUsers(this.$routeParams.id, "False").then(res => this.addUsers = res.data);
        };

        addComputer() {
            var computers = [];
            for (var i = 0; i < this.addComputers.length; i++) {
                if (this.addComputers[i].selected === true) {
                    computers.push(this.addComputers[i].Id);
                }
            }
            this.departmentsService.addDepartmentItems(this.$routeParams.id, computers, 'Computers').then(() => {
                this.departmentsService.getDepartmentComputers(this.$routeParams.id, "True").then(res => this.computers = res.data);
            });
        };

        removeComputer() {
            var computers = [];
            for (var i = 0; i < this.computers.length; i++) {
                if (this.computers[i].selected === true) {
                    computers.push(this.computers[i].Id);
                }
            }
            this.departmentsService.removeDepartmentItems(this.$routeParams.id, computers, 'Computers').then(() => {
                this.departmentsService.getDepartmentComputers(this.$routeParams.id, "True").then(res => this.computers = res.data);
            });
        };

        addUser() {
            var users = [];
            for (var i = 0; i < this.addUsers.length; i++) {
                if (this.addUsers[i].selected === true) {
                    users.push(this.addUsers[i].Id);
                }
            }
            this.departmentsService.addDepartmentItems(this.$routeParams.id, users, 'Users').then(() => {
                this.departmentsService.getDepartmentUsers(this.$routeParams.id, "True").then(res => {
                    this.users = res.data;
                });
            });
        };

        removeUser() {
            var users = [];
            for (var i = 0; i < this.users.length; i++) {
                if (this.users[i].selected === true) {
                    users.push(this.users[i].Id);
                }
            }
            this.departmentsService.removeDepartmentItems(this.$routeParams.id, users, 'Users').then(() => {
                this.departmentsService.getDepartmentUsers(this.$routeParams.id, "True").then(res => {
                    this.users = res.data;
                });
            });
        };
    }
    angular.module('Upkeeper')
        .controller('EditDepartmentsController', EditDepartmentsController);
}

