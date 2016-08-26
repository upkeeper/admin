namespace upk {
    class EditGroupController {

        group: Group;
        categories: Array<Category>;
        applications: Array<Application>;
        addApplications: Array<Application>;
        computers: Array<Computer>;
        addComputers: Array<Computer>;
        tasks: Array<Task>;
        addTasks: Array<Task>;
        cmModel: any;

        static $inject = ['$location', '$routeParams', 'groupService', 'categoryService'];
        constructor(private $location: ng.ILocationService, private $routeParams, private groupService: IGroupService, private categoryService: ICategoryService) {
            groupService.getGroupDetail(this.$routeParams.id).then(res => this.group = res.data);
            categoryService.getCategories().then(data => this.categories = data);
            groupService.getGroupApplications($routeParams.id, "True").then(res => this.applications = res.data);
            groupService.getGroupComputers($routeParams.id, "True").then(res => this.computers = res.data);
            groupService.getGroupTasks($routeParams.id, "True").then(res => this.tasks = res.data);
            groupService.getGroupSettings($routeParams.id).then(data => this.cmModel = data);
        }

        save() {
            this.groupService.updateGroup(this.$routeParams.id, this.group).then(() => this.$location.path('/Groups'));
        }

        delete() {
            this.groupService.removeGroup(this.group.Id).then(() => this.$location.path('/Groups'));
        }

        update_mirror() {
            var codeMirrorContainer = $(".CodeMirror")[0];
            codeMirrorContainer.CodeMirror.refresh();
        }
        initSettings() {
            setTimeout(this.update_mirror, 200);
        }

        getAddComputerApplications() {
            this.addApplications = [];
            this.groupService.getGroupApplications(this.$routeParams.id, "False").then(res => this.addApplications = res.data);
        };

        addApplication() {
            var applications = [];
            for (var i = 0; i < this.addApplications.length; i++) {
                if (this.addApplications[i].selected === true) {
                    applications.push(this.addApplications[i].Id);
                }
            }
            this.groupService.addGroupItems(this.$routeParams.id, applications, 'Applications').then(() => {
                this.groupService.getGroupApplications(this.$routeParams.id, "True").then(res => {
                    this.applications = res.data;
                });
            });
        };

        removeApplication() {
            var applications = [];
            for (var i = 0; i < this.applications.length; i++) {
                if (this.applications[i].selected === true) {
                    applications.push(this.applications[i].Id);
                }
            }
            this.groupService.removeGroupItems(this.$routeParams.id, applications, 'Applications', "True").then(() => {
                this.groupService.getGroupApplications(this.$routeParams.id, "True").then(res => {
                    this.applications = res.data;
                });
            });
        }

        getAddApplicationComputers() {
            this.addComputers = [];
            this.groupService.getGroupComputers(this.$routeParams.id, "False").then(res => {
                this.addComputers = res.data;
            });
        }

        addComputer() {
            var computers = [];
            for (var i = 0; i < this.addComputers.length; i++) {
                if (this.addComputers[i].selected === true) {
                    computers.push(this.addComputers[i].Id);
                }
            }
            this.groupService.addGroupItems(this.$routeParams.id, computers, 'Computers').then(() => {
                this.groupService.getGroupComputers(this.$routeParams.id, "True").then(res => vm.computers = res.data);
            });
        };

        removeComputer() {
            var computers = [];
            for (var i = 0; i < this.computers.length; i++) {
                if (this.computers[i].selected === true) {
                    computers.push(this.computers[i].Id);
                }
            }
            this.groupService.removeGroupItems(this.$routeParams.id, computers, 'Computers').then(() => {
                this.groupService.getGroupComputers(this.$routeParams.id, "True").then(res => {
                    this.computers = res.data;
                });
            });
        }

        getAddComputerTasks() {
            this.addTasks = [];
            this.groupService.getGroupTasks(this.$routeParams.id, "False").then(res => {
                this.addTasks = res.data;
            });
        };

        addTask() {
            var tasks = [];
            for (var i = 0; i < this.addTasks.length; i++) {
                if (this.addTasks[i].selected === true) {
                    tasks.push(this.addTasks[i].Id);
                }
            }
            this.groupService.addGroupItems(this.$routeParams.id, tasks, 'Tasks').then(() => {
                this.groupService.getGroupTasks(this.$routeParams.id, "True").then(res => {
                    this.tasks = res.data;
                });
            });
        };

        removeTask() {
            var tasks = [];
            for (var i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].selected === true) {
                    tasks.push(this.tasks[i].Id);
                }
            }
            this.groupService.removeGroupItems(this.$routeParams.id, tasks, 'Tasks').then(() => {
                this.groupService.getGroupTasks(this.$routeParams.id, "True").then(res => {
                    this.tasks = res.data;
                });
            });
        };
    }

    angular.module('Upkeeper')
        .controller('EditGroupController', EditGroupController);
}
