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

        delete(application) {
            this.applicationService.removeApplication(application);
        }

        editApplication(application) {
            if (this.PermissionService.HasPermission('Application_Create_Edit'))
                this.$location.path("/Applications/" + application.Id);
        }
    }
    angular.module('Upkeeper')
        .controller('ApplicationController', ApplicationController);
}

