namespace upk {
    'use strict';

    export interface ILicenseService {
        getLicense(): ng.IPromise<String>;
    }
    class LicenseService implements ILicenseService {
        apiUrl: string;

        static $inject: Array<string> = ['$http', 'CONFIG'];
        constructor(private $http: ng.IHttpService, private $rootScope, private CONFIG: config.IConfig) {
            this.apiUrl = CONFIG.apiUrl;
        }

        getLicense(): ng.IPromise<String> {
            return this.$http.get('').then(res => res.data);
        }
    }

    angular
        .module('Upkeeper')
        .service('LicenseService', LicenseService);
}