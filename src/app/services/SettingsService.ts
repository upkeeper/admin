namespace upk {
    'use strict';

    export interface ISettingsService {
        listlimit: any;
        getGeneralSettings(): ng.IPromise<GeneralSettings>;
        saveGeneralSettings(settings: GeneralSettings): ng.IPromise<any>

    }
    class SettingsService implements ISettingsService {
        apiUrl: string;
        public listlimit = [
            { limit: 10 },
            { limit: 25 },
            { limit: 50 }
        ];

        static $inject: Array<string> = ['$http', 'CONFIG'];
        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig) {
            this.apiUrl = CONFIG.apiUrl;
        }

        getGeneralSettings(): ng.IPromise<GeneralSettings> {
            return this.$http.get(this.apiUrl + 'GeneralSettings').then(res => res.data);
        }

        saveGeneralSettings(settings: GeneralSettings): ng.IPromise<any> {
            return this.$http.put(this.apiUrl + 'GeneralSettings', settings);
        }
    }
    angular.module('Upkeeper')
        .service('SettingsService', SettingsService);
}

