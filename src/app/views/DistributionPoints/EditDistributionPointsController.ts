namespace upk {
    'use strict';

    class EditDistributionController {

        distribution: DistributionPoint;
        subnet: Subnet;

        selectedSubnet: any;

        static $inject: Array<string> = ['$location', '$routeParams', 'distributionService'];
        constructor(private $location: ng.ILocationService, private $routeParams, private distributionService: IDistributionService) {
            distributionService.getDistributionPointDetail($routeParams.id).then(res => this.distribution = res.data);
            distributionService.getSubnets($routeParams.id).then(res => this.distribution.Subnets = res.data);
        }

        save() {
            this.distributionService.updateDistributionPoint(this.$routeParams.id, this.distribution).then(() => this.$location.path('/DistributionPoints'));
        };

        delete() {
            this.distributionService.removeDistributionPoint(this.distribution.Id).then(() => this.$location.path('/DistributionPoints'));
        };

        saveSubnet() {
            this.subnet.DistributionPointId = this.$routeParams.id;
            this.distributionService.addSubnet(this.$routeParams.id, this.subnet).then(res => this.distribution.Subnets.push(res.config.data));
            this.subnet = null;
        };

        selectSubnet(subnet: Subnet) {
            this.selectedSubnet = subnet;
        };

        updateSubnet() {
            this.distributionService.updateSubnet(this.$routeParams.id, this.selectedSubnet).then(data => {
                this.distributionService.getDistributionPointDetail(this.$routeParams.id).then(res => {
                    this.distribution = res.data;
                });
            });
            this.selectedSubnet = null;
        };

        deleteSubnet() {
            this.distributionService.deleteSubnet(this.$routeParams.id, this.selectedSubnet.Id).then(data => {
                this.selectedSubnet = null;
                this.distributionService.getDistributionPointDetail(this.$routeParams.id).then(res => {
                    this.distribution = res.data;
                });
            });
        };
    }

    angular
        .module('Upkeeper')
        .controller('EditDistributionController', EditDistributionController);
}