namespace upk {
    class EditTaskController {

        task: Task;
        computers: Array<Computer>;
        addComputers: Array<Computer>;
        groups: Array<Group>;
        addGroups: Array<Group>;
        InstallConditions: any;
        days: Array<number> = [];
        schemaTypes: any;

        static $inject = ['$location', '$routeParams', 'taskService'];
        constructor(private $location: ng.ILocationService, private $routeParams, private taskService: ITaskService) {
            for (let i = 0; i <= 31; i++) {
                this.days.push(i);
            }
            this.InstallConditions = [
                'Every day',
                'Every workday',
                'Now',
                'Once',
                'Specific days every month',
                'Specific days every week'
            ];

            taskService.getTaskDetail(this.$routeParams.id).then(res => this.task = res.data);
            taskService.getTaskComputers($routeParams.id, "True").then(res => this.computers = res.data);
            taskService.getTaskGroups($routeParams.id, "True").then(res => this.groups = res.data);
            taskService.getSchemaTypes().then(res => this.schemaTypes = res);
        }

        save() {
            this.taskService.updateTask(this.$routeParams.id, this.task).then(res => {
                this.$location.path('/Tasks');
            });
        }

        delete() {
            this.taskService.removeTask(this.task.Id).then(res => {
                this.$location.path('/Tasks');
            })
        }

        addComputer() {
            var computers = [];
            for (var i = 0; i < this.addComputers.length; i++) {
                if (this.addComputers[i].selected === true) {
                    computers.push(this.addComputers[i].Id);
                }
            }
            this.taskService.addTaskComputers(this.$routeParams.id, computers).then(function () {
                this.taskService.getTaskComputers(this.$routeParams.id, "True").query(function (data) {
                    this.computers = data;
                });
            });
        };

        removeComputer() {
            var computers = [];
            for (var i = 0; i < this.computers.length; i++) {
                if (this.computers[i].selected === true) {
                    computers.push(this.computers[i].Id);
                }
            }
            this.taskService.removeTaskComputers(this.$routeParams.id, computers).then(function () {
                this.taskService.getTaskComputers(this.$routeParams.id, "True").then(res =>
                    this.computers = res.data);
            });
        };

        addGroup() {
            var groups = [];
            for (var i = 0; i < this.addGroups.length; i++) {
                if (this.addGroups[i].selected === true) {
                    groups.push(this.addGroups[i].Id);
                }
            }
            this.taskService.addTaskGroups(this.$routeParams.id, groups).then(function () {
                this.taskService.getTaskGroups(this.$routeParams.id, "True").then(res => {
                    this.groups = res.data;
                });
            });
        };

        removeGroup() {
            var groups = [];
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].selected === true) {
                    groups.push(this.groups[i].Id);
                }
            }
            this.taskService.removeTaskGroups(this.$routeParams.id, groups).then(function () {
                this.taskService.getTaskGroups(this.$routeParams.id, "True").then(res => {
                    this.groups = res.data;
                });
            });
        }

        getAddApplicationComputers() {
            this.addComputers = [];
            this.taskService.getTaskComputers(this.$routeParams.id, "False").then(res => this.addComputers = res.data);
        };

        getAddComputerGroups() {
            this.addGroups = [];
            this.taskService.getTaskGroups(this.$routeParams.id, "False").then(res => this.addGroups = res.data);
        };
    }
    angular.module('Upkeeper')
        .controller('EditTaskController', EditTaskController);
}
