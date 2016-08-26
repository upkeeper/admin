namespace upk {
    'use strict';
    
    export interface IDistributionService {
        getDistributions(): ng.IPromise<DistributionPoint[]>;
        getDistributionPointDetail(id: string): ng.IHttpPromise<DistributionPoint>;
        addDistributionPoint(distributionPoint: DistributionPoint): ng.IHttpPromise<{}>;
        updateDistributionPoint(id: string, distributionPoint: DistributionPoint): ng.IHttpPromise<{}>;
        removeDistributionPoint(id: string): ng.IHttpPromise<{}>;
        getSubnets(id: string): ng.IHttpPromise<Subnet[]>;
        getSubnet(id: string, subnetId: string): ng.IPromise<Subnet>;
        addSubnet(id: string, subnet: Subnet): ng.IHttpPromise<{}>;
        updateSubnet(id: string, subnet: Subnet): ng.IHttpPromise<{}>;
        deleteSubnet(id: string, subnetId: string): ng.IHttpPromise<{}>;
    }

    class DistributionService implements IDistributionService {
        apiUrl: string;

        static $inject: Array<string> = ['$http', 'CONFIG', 'ApiService'];
        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig, private ApiService: IApiService) {
            this.apiUrl = CONFIG.apiUrl;
        };

        getDistributions(): ng.IPromise<DistributionPoint[]> {
            return this.$http.get(this.apiUrl + 'DistributionPoints').then(res => res.data);
        };

        getDistributionPointDetail(id: string) {
            return this.$http.get(this.apiUrl + 'DistributionPointDetail/' + id);
        };

        addDistributionPoint(distributionPoint: DistributionPoint) {
            distributionPoint.OrganizationId = this.ApiService.organization;
            return this.$http.post(this.apiUrl + 'DistributionPoint', distributionPoint);
        };

        updateDistributionPoint(id: string, distributionPoint: DistributionPoint) {
            return this.$http.put(this.apiUrl + 'DistributionPoint/' + id, distributionPoint);
        };

        removeDistributionPoint(id: string) {
            return this.$http.delete(this.apiUrl + 'DistributionPoint/' + id);
        };

        getSubnets(id: string) {
            return this.$http.get(this.apiUrl + 'DistributionPoint/' + id + '/Subnets');
        };

        getSubnet(id: string, subnetId: string): ng.IPromise<Subnet> {
            return this.$http.get(this.apiUrl + 'DistributionPoint/' + id + '/Subnet').then(res => res.data);
        }

        addSubnet(id: string, subnet: Subnet) {
            return this.$http.post(this.apiUrl + 'DistributionPoint/' + id + '/Subnet', subnet);
        };

        updateSubnet(id: string, subnet: Subnet) {
            return this.$http.put(this.apiUrl + 'DistributionPoint/' + id + '/Subnet', subnet)
        }

        deleteSubnet(id: string, subnetId: string) {
            return this.$http.delete(this.apiUrl + 'DistributionPoint/' + id + '/Subnet?subnetId=' + subnetId);
        };
    }
    angular.module('Upkeeper')
        .service('distributionService', DistributionService);
}

