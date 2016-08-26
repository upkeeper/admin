namespace upk {
    class AddDistributionController {

        distribution: DistributionPoint;

        static $inject = ['$location', 'distributionService'];
        constructor(private $location, private distributionService: IDistributionService) {

        }

        save() {
            this.distributionService.addDistributionPoint(this.distribution).then(() => this.$location.path('/DistributionPoints'))
        }
    }
    angular.module('Upkeeper')
        .controller('AddDistributionController', AddDistributionController);
}

