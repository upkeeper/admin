namespace upk {
    class ComputerController {

        searchbarvalue: string;
        orderBy: string;
        reverseSort: boolean;
        filterWeek: boolean;
        sortKey: string;
        isCollapsed: boolean;
        selectedAll: boolean;
        rotated: any;

        tasks: Array<String>;
        groups: Array<String>;
        hardwares: Array<String>;
        applications: Array<String>;
        platforms: Array<String>;
        functions: Array<UpkFunction>;
        selectedTask: any;

        

        computers: Array<Computer>;

        static $inject = ['$rootScope', '$location', 'computerService', 'taskService',
            'groupService', 'hardwareService', 'applicationService',
            'platformService', 'PermissionService'];
        constructor(private $rootScope: any, private $location, private computerService: IComputerService,
            private taskService: ITaskService, private groupService: IGroupService,
            private hardwareService: IHardwareService, private applicationService: IApplicationService,
            private platformService: IPlatformService, private PermissionService: IPermissionService) {

            this.searchbarvalue = 'Computer Name:';
            this.orderBy = 'name';
            this.reverseSort = false;
            this.filterWeek = false;
            this.sortKey = 'Name';
            this.isCollapsed = true;
            this.rotated = false;

            computerService.getComputers().then(data => this.computers = data);
            this.initFilters();

            this.isCollapsed = !this.$rootScope.isCollapsed;


        }

        toggleSearchBar() {
            this.$rootScope.isCollapsed = !this.$rootScope.isCollapsed;
            this.isCollapsed = !this.$rootScope.isCollapsed;
        }

        initFilters() {
            this.taskService.getTaskNames().then(res => this.tasks = res.data);
            this.groupService.getGroupNames().then(res => this.groups = res.data);
            this.hardwareService.getHardwareNames().then(res => this.hardwares = res.data);
            this.applicationService.getApplicationNames().then(res => this.applications = res);
            this.platformService.getPlatformNames().then(res => this.platforms = res.data);

            this.taskService.getTaskFunctions().then(res => this.functions = res);
        }

        checkAll() {
            if (this.selectedAll) {
                this.selectedAll = true;
            } else {
                this.selectedAll = false;
            }
            angular.forEach(this.computers, item => {
                item.selected = this.selectedAll;
            });
        }

        getComputerConnectionStatus(value) {
            if (value === 1) {
                return 'glow-green';
            } else if (value === 2) {
                return 'glow-orange';
            } else {
                return 'powered-off';
            }
        }

        editComputer(computer: Computer) {
            if (this.PermissionService.HasPermission('Computer_Create_Edit')) {
                this.$location.path('/Computers/' + computer.Id);
            }
        };

        create() {
            this.$location.path('/Computers/Create');
        };

        delete() {
            angular.forEach(this.computers, item => {
                if (item.selected) {
                    this.computerService.removeComputer(item.Id);
                }
            })
            this.computerService.getComputers().then(data => this.computers = data);
        }

        runInstantTask() {
            let selectedComputers = [];
            angular.forEach(this.computers, item => {
                if (item.selected) {
                    selectedComputers.push(item.Id);
                }
            });
            this.computerService.postInstantFunctions(selectedComputers, this.selectedTask.Key).then(res => { });

        }
        exportToExcel() {
            let selectedComputers = [];
            angular.forEach(this.computers, item => {
                if (item.selected) {
                    selectedComputers.push(item.Id);
                }
            });
            this.computerService.getComputerExported(selectedComputers).then(result => {
                console.log(result);
                if (window.navigator.msSaveOrOpenBlob) {
                    const blob = new Blob([decodeURIComponent(encodeURI(result.data))], {
                        type: 'text/csv;charset=utf-8;'
                    });
                    navigator.msSaveBlob(blob, 'export.csv');
                } else {
                    var a = document.createElement('a');
                    a.href = 'data:attachment/csv;charset=utf-8,' + encodeURI(result.data);
                    a.target = '_blank';
                    a.download = 'export.csv';
                    document.body.appendChild(a);
                    console.log(result.data);
                    a.click();
                }
            }, err => {
                console.log(err);
            });
        }

    }
    angular.module('Upkeeper')
        .controller('ComputerController', ComputerController);
}

