namespace upk {
    'use strict';
    export interface IPlatformService {
        getPlatforms(): ng.IHttpPromise<Platform[]>;
        getPlatformNames(): ng.IHttpPromise<Array<String>>;
        addPlatform(platform: Platform): ng.IHttpPromise<{}>;
        removePlatform(id: string): ng.IHttpPromise<{}>;
        updatePlatform(id: string, platform: Platform): ng.IHttpPromise<{}>;
        getPlatformDetail(id: string): ng.IHttpPromise<Platform>;
        updateSettings(id: string, settings: string): ng.IHttpPromise<{}>;
        getPlatformSettings(id: string): ng.IHttpPromise<{ Settings }>;
    }

    class PlatformService implements IPlatformService {
        apiUrl: string;

        static $inject: Array<string> = ['$http',  'CONFIG', 'ApiService'];
        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig, private ApiService: IApiService) {
            this.apiUrl = CONFIG.apiUrl;
        }

        getPlatforms() {
            return this.$http.get(this.apiUrl + 'Platforms');
        }

        getPlatformNames() {
            return this.$http.get(this.apiUrl + 'PlatformNames');
        }

        addPlatform(platform: Platform) {
            return this.$http.post(this.apiUrl + 'Platform', platform);
        }

        removePlatform(id: string) {
            return this.$http.delete(this.apiUrl + 'Platform/' + id);
        }

        updatePlatform(id: string, platform: Platform) {
            return this.$http.put(this.apiUrl + 'Platform/' + id, platform);
        };

        getPlatformDetail(id: string) {
            return this.$http.get(this.apiUrl + 'Platform/' + id);
        };

        getPlatformSettings(id: string) {
            return this.$http.get(this.apiUrl + 'Platform/' + id + '/Settings');
        };

        updateSettings(id: string, settings: Settings) {
            return this.$http.put(this.apiUrl + 'Platform' + id + '/Settings', settings)
        };
    }
    angular.module('Upkeeper')
        .service('platformService', PlatformService);
}

