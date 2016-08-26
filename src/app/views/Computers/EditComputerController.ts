namespace upk {
    class EditComputerController {
        computer: Computer;
        hardwares: Hardware[];
        applications: Application[];
        platforms: Platform[];
        groups: Group[];
        addGroups: Group[];
        tasks: Task[];
        addTasks: Task[];
        events: Events[];
        computerHardware: Hardware;
        computerSoftware: any;
        computerUpdates: any;
        instantFunctions: any;
        cmModel: any;
        selectedInstantFunction: string;
        timer: any;
        mergedSettings: any;

        addApplications: Application[];

        static $inject: Array<String> = ['$location', '$routeParams', 'computerService', 'tokenService', '$alert', '$timeout', '$scope']
        constructor(private $location: ng.ILocationService, private $routeParams: any, private computerService: IComputerService, private tokenService: ITokenService, private $alert, private $timeout, private $scope) {
            computerService.getComputerDetail($routeParams.id).then(data => this.computer = data);
            computerService.getInstantFunctions($routeParams.id).then(data => this.instantFunctions = data);
            computerService.getListHardwares($routeParams.id).then(res => this.hardwares = res.data);
            computerService.getListPlatforms($routeParams.id).then(res => this.platforms = res.data);
            computerService.getComputerSettings($routeParams.id).then(res => this.cmModel = res.data)
            computerService.getComputerApplications($routeParams.id, "True").then(data => this.applications = data);
            computerService.getComputerGroups($routeParams.id, "True").then(data => this.groups = data);
            computerService.getComputerTasks($routeParams.id, "True").then(data => this.tasks = data);
            computerService.getComputerEvents($routeParams.id).then(data => this.events = data);
            computerService.getMergedSettings(this.$routeParams.id).then(data => this.mergedSettings = data);

            this.getLogLoop();
            $scope.$on('$destroy', event => {
                this.$timeout.cancel(this.timer);
            })
        }

        delete() {
            this.computerService.removeComputer(this.computer.Id).then(() => this.$location.path('/Computers'));
        };

        save() {
            this.computerService.updateComputer(this.computer.Id, this.computer).then(() => this.$location.path('/Computers'));
        };

        getAddComputerApplications() {
            this.addApplications = [];
            this.computerService.getComputerApplications(this.$routeParams.id, "False").then(data => this.addApplications = data)
        };

        addApplication() {
            var applications = [];
            for (var i = 0; i < this.addApplications.length; i++) {
                if (this.addApplications[i].selected === true) {
                    applications.push(this.addApplications[i].Id);
                }
            }
            this.computerService.addComputerItems(this.$routeParams.id, applications, 'Applications').then(() => {
                this.computerService.getComputerApplications(this.$routeParams.id, "True").then(data => this.applications = data);
            });
        };

        removeApplication() {
            var applications = [];
            for (var i = 0; i < this.applications.length; i++) {
                if (this.applications[i].selected === true) {
                    applications.push(this.applications[i].Id);
                }
            }
            this.computerService.removeComputerItems(this.$routeParams.id, applications, 'Applications').then(() => {
                this.computerService.getComputerApplications(this.$routeParams.id, "True").then(data => this.applications = data);
            });
        };

        denyApplication() {
            var applications = [];
            for (var i = 0; i < this.applications.length; i++) {
                if (this.applications[i].selected === true) {
                    applications.push(this.applications[i].Id);
                }
            }
            this.computerService.denyApplications(this.$routeParams.id, applications).then(res => console.log(res))
        };

        getAddComputerGroups() {
            this.addGroups = [];
            this.computerService.getComputerGroups(this.$routeParams.id, "False").then(data => this.addGroups = data)
        };

        addGroup() {
            var groups = [];
            for (var i = 0; i < this.addGroups.length; i++) {
                if (this.addGroups[i].selected === true) {
                    groups.push(this.addGroups[i].Id);
                }
            }
            this.computerService.addComputerItems(this.$routeParams.id, groups, 'Groups').then(() => {
                this.computerService.getComputerGroups(this.$routeParams.id, "True").then(data => this.groups = data);
            });
        };

        removeGroup() {
            var groups = [];
            for (var i = 0; i < this.groups.length; i++) {
                if (this.groups[i].selected === true) {
                    groups.push(this.groups[i].Id);
                }
            }
            this.computerService.removeComputerItems(this.$routeParams.id, grups, 'Groups').then(() => {
                this.computerService.getComputerGroups(this.$routeParams.id, "True").then(data => this.groups = data);
            });
        }

        getAddComputerTasks() {
            this.addTasks = [];
            this.computerService.getComputerTasks(this.$routeParams.id, "False").then(data => this.addTasks = data);
        }

        addTask() {
            var tasks = [];
            for (var i = 0; i < this.addTasks.length; i++) {
                if (this.addTasks[i].selected === true) {
                    tasks.push(this.addTasks[i].Id);
                }
            }
            this.computerService.addComputerItems(this.$routeParams.id, tasks, 'Tasks').then(() => {
                this.computerService.getComputerTasks(this.$routeParams.id, "True").then(data => this.tasks = data);
            });
        };

        removeTask() {
            var tasks = [];
            for (var i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].selected === true) {
                    tasks.push(this.tasks[i].Id);
                }
            }
            this.computerService.removeComputerItems(this.$routeParams.id, tasks, 'Tasks').then(() => {
                this.computerService.getComputerTasks(this.$routeParams.id, "True").then(data => this.tasks = data);
            });
        }

        getHardwareInventory() {
            this.computerService.getHardwareInventory(this.$routeParams.id).then(data => this.computerHardware = data);
            this.computerService.getSoftwareInventory(this.$routeParams.id).then(data => this.computerSoftware = data);
            this.computerService.getUpdateInventory(this.$routeParams.id).then(data => this.computerUpdates = data);
        };


        update_mirror() {
            var codeMirrorContainer: any = $(".CodeMirror")[0];
            codeMirrorContainer.CodeMirror.refresh();
        }

        initSettings() {
            setTimeout(this.update_mirror, 500);
        }

        runInstantFunction() {
            this.computerService.postInstantFunction(this.computer.Id, this.selectedInstantFunction, this.tokenService.getUsername()).then(res => {
                console.log(res);
                if (res.statusText == "OK")
                    this.$alert({ title: 'Action Completed: ' + res.statusText, placement: 'top', type: 'info', show: true, duration: 3 });
                else
                    this.$alert({ title: 'An error occured: ' + res.statusText, placement: 'top', type: 'danger', show: true, duration: 5 });
            });
        }

        getLogLoop() {
            this.timer = this.$timeout(() => {
            }, 15000)
            this.timer.then(() => {
                this.computerService.getComputerEvents(this.$routeParams.id).then(data => this.events = data);
                this.getLogLoop();
            }, err => {
            })
        }

        getMergedSettigns() {
            this.computerService.getMergedSettings(this.$routeParams.id).then(data => this.mergedSettings = data);
        }
    }

    angular.module('Upkeeper')
        .controller('EditComputerController', EditComputerController);
}