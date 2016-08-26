namespace upk {
    class DistributionsController {
        searchbarvalue: string;
        distributions: Array<DistributionPoint>;

        static $inject = ['$location', 'distributionService', 'PermissionService'];
        constructor(private $location: ng.ILocationService, private distributionService: IDistributionService, private PermissionService: IPermissionService) {
            this.searchbarvalue = "Distribution Point: ";
            distributionService.getDistributions().then(data => this.distributions = data)
        }

        editDistribution(distribution: DistributionPoint) {
            if (this.PermissionService.HasPermission('Platform_Create_Edit'))
                this.$location.path('/DistributionPoints/' + distribution.Id);
        }

        create() {
            this.$location.path('/DistributionPoints/Create');
        }
    }
    angular.module('Upkeeper')
        .controller('DistributionsController', DistributionsController);
}

