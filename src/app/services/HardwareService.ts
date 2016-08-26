namespace upk {
    'use strict';
    export interface IHardwareService {
        getHardwares(): ng.IHttpPromise < Hardware[] > ;
        getHardwareNames(): ng.IHttpPromise < Array < String >> ;
        getHardwareDetail(id: string): ng.IHttpPromise < Hardware > ;
        addHardware(hardware: Hardware): ng.IHttpPromise < {} > ;
        removeHardware(id: string): ng.IHttpPromise < {} > ;
        updateHardware(id: string, hardware: Hardware): ng.IHttpPromise < {} > ;
        getHardwareApplications(id: string, action: any): ng.IHttpPromise < {} > ;
        addHardwareItems(id: string, items: Array < any > , endpoint: any): ng.IPromise < {} > ;
        removeHardwareItems(id: string, items: Array < any > , end: string): ng.IPromise < {} > ;
        getConfiguration(id: string): {
            then(SuccessCallback: Function, FailCallback ? : Function): void
        };
        updateConfiguration(id: string, configuration: any): void;
        getSettings(id: string): ng.IHttpPromise < Settings > ;
        saveSettings(id: string, settings: string): ng.IPromise < {} > ;
    }

    class HardwareService implements IHardwareService {
        apiUrl: string;

        static $inject: Array < string > = ['$http', 'CONFIG', 'ApiService'];

        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig, private ApiService: IApiService) {
            this.apiUrl = CONFIG.apiUrl;
        };

        getHardwares() {
            return this.$http.get(this.apiUrl + 'Hardwares')
        };

        getHardwareNames() {
            return this.$http.get(this.apiUrl + 'HardwareNames');
        };

        getHardwareDetail(id: string) {
            return this.$http.get(this.apiUrl + 'Hardware/' + id);
        };

        addHardware(hardware: Hardware) {
            hardware.OrganizationId = this.ApiService.organization;
            return this.$http.post(this.apiUrl + 'Hardware', hardware);
        };

        removeHardware(id: string) {
            return this.$http.delete(this.apiUrl + 'Hardware/' + id);
        };

        updateHardware(id: string, hardware: Hardware) {
            return this.$http.put(this.apiUrl + 'Hardware/' + id, hardware)
        };

        getHardwareApplications(id: string, action: string) {
            return this.$http.get(this.apiUrl + 'Hardware/' + id + '/Applications?members=' + action);
        };

        addHardwareItems(id: string, items: Array < any > , end: string) {
            return this.$http.post(this.apiUrl + 'Hardware/' + id + '/' + end, items)
        };

        removeHardwareItems(id: string, items: Array < any > , end: string) {
            var removeUrl = this.apiUrl + 'Hardware/' + id + '/' + end;

            return this.$http({
                method: 'DELETE',
                url: removeUrl,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: items
            })
        };

        getConfiguration(id: string) {
            return this.$http.get(this.apiUrl + 'Hardware/' + id + '/Configuration')
        }

        updateConfiguration(id: string, config: any) {
            return this.$http.put(this.apiUrl + 'Hardware/' + id + '/Configuration', config)
        };

        getSettings(id: string) {
            return this.$http.get(this.apiUrl + '/Hardware/' + id + '/Settings')
        };

        saveSettings(id: string, settings: string): ng.IPromise < {} > {
            var url: string = this.apiUrl + 'Hardware/' + id + '/Settings?settings=' + settings;
            return this.$http({
                method: 'POST',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        };
    }
    angular.module('Upkeeper')
        .service('hardwareService', HardwareService);
}