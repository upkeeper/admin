namespace upk {
    class ApplicationController {
        searchbarvalue = "Application Name: ";
        applications: Array<Application>;
        computers: Array<Computer>;

        toggleName = true;
        toggleVersion = true;
        toggleDescription = true;
        togglePriority = true;
        toggleLicenses = true;
        toggleInstalled = true;
        cols: any;
        selectedAll: boolean;

        static $inject = ['$location', 'applicationService', 'organizationService', 'PermissionService'];
        constructor(private $location: ng.ILocationService,
            private applicationService: IApplicationService,
            private organizationService: IOrganizationService,
            private PermissionService: IPermissionService) {

            applicationService.getApplications().then(data => this.applications = data);
            this.cols =
                [
                    { title: "Name", show: this.toggleName },
                    { title: "Version", show: this.toggleVersion },
                    { title: "Description", show: this.toggleDescription },
                    { title: "Priority", show: this.togglePriority },
                    { title: "Licenses", show: this.toggleLicenses },
                    { title: "Installed", show: this.toggleInstalled }
                ];
        }

        create() {
            this.$location.path('/Applications/Create');
        }

        delete() {
            angular.forEach(this.applications, item => {
                if (item.selected) {
                    this.applicationService.removeApplication(item.Id);
                }
            });
            this.applicationService.getApplications().then(data => this.applications = data);
        }

        editApplication(application) {
            if (this.PermissionService.HasPermission('Application_Create_Edit'))
                this.$location.path("/Applications/" + application.Id);
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
    }
    angular.module('Upkeeper')
        .controller('ApplicationController', ApplicationController);
}

