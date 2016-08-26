namespace upk {
    class AddApplicationController {

        application: Application;
        InstallConditions;
        RebootConditions;

        static $inject = ['$location', 'applicationService', '$scope', '$rootScope'];
        constructor(private $location: ng.ILocationService, private applicationService: IApplicationService,
            private $scope: ng.IScope, private $rootScope: IUpkRootScope) {
            let date = new Date();

            this.application = { PackageDate: date, PublishTime: date, OrganizationId: this.$rootScope.currentOrganization };
            this.InstallConditions = this.applicationService.InstallConditions;
            this.RebootConditions = this.applicationService.RebootConditions;


            $(function () {
                $('#datetimepicker2').datetimepicker();
                $("#datetimepicker2").on("dp.change", function (e) {
                    this.$scope.$apply(() => {
                        this.application.PublishTime = e.date.format('YYYY-MM-DD HH:mm');
                    })
                });
            });
        };

        save() {
            this.applicationService.addApplication(this.application).then(() => this.$location.path('/Applications'));
        };
    }

    angular.module('Upkeeper')
        .controller('AddApplicationController', AddApplicationController);
}
