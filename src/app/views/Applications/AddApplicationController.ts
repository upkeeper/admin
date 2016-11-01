namespace upk {
    class AddApplicationController {

        application: Application;
        InstallConditions;
        RebootConditions;

        static $inject = ['$location', 'applicationService', '$scope', '$rootScope'];
        constructor(private $location: ng.ILocationService, private applicationService: IApplicationService,
            private $scope: ng.IScope, private $rootScope: IUpkRootScope) {
            let date = moment().format('YYYY-MM-DD HH:mm');

            this.application = { PackageDate: date, PublishTime: date, OrganizationId: this.$rootScope.currentOrganization };
            this.InstallConditions = this.applicationService.InstallConditions;
            this.RebootConditions = this.applicationService.RebootConditions;


            $(function () {
                $('#datetimepicker2').datetimepicker();
                $("#datetimepicker2").on("dp.change", function (e) {
                    var time = moment(e.date).format('YYYY-MM-DD HH:mm');
                    this.application.PublishTime = time;
                    this.$scope.$apply(() => {
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
