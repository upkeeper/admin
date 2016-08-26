namespace upk {
    'use strict';

    export interface IConfigurationService {
        getConfig(): ng.IHttpPromise < Config[] > ;
        getSystemInformation(): ng.IPromise < ISystemInformation > ;
        updateConfig(config: Config): ng.IPromise < any > ;
    };
    class ConfigurationService implements IConfigurationService {
        apiUrl: string;

        static $inject: Array < string > = ['$http', 'CONFIG'];
        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig) {
            this.apiUrl = CONFIG.apiUrl;
        }

        getConfig() {
            return this.$http.get(this.apiUrl + 'Config');
        }

        getSystemInformation() {
            return this.$http.get(this.apiUrl + 'SystemInformation').then(res => res.data);
        }

        updateConfig(config: Config) {
            return this.$http.put(this.apiUrl + 'Config', config);
        }

    };
    angular.module('Upkeeper')
        .service('configurationService', ConfigurationService);
}