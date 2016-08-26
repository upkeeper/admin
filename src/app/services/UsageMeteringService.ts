namespace upk {
    'use strict';
    
    export interface IUsageMeteringService {
        getUsageMetering(): ng.IPromise<{}>;
        resetUsageMetering(): ng.IPromise<{}>;
    }

    class UsageMeteringService implements IUsageMeteringService {
        apiUrl: string;

        static $inject = ['$http', 'CONFIG', 'ApiService'];
        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig, private ApiService: IApiService) {
            this.apiUrl = CONFIG.apiUrl;
        };

        getUsageMetering(): ng.IPromise<{}> {
            return this.$http.get(this.apiUrl + 'UsageMetering').then(res => res.data);
        }

        resetUsageMetering(): ng.IPromise<{}> {
            return this.$http.post(this.apiUrl + 'UsageMetering/Reset', null);
        }
    }
    angular.module('Upkeeper')
        .service('usageMeteringService', UsageMeteringService);
}

