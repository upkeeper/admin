

namespace upk.config {
    export interface IConfig {
        apiUrl: string;
        version: string;
        baseUrl: string;
        clientId: string;
    }
    /*
    class Config {
        static get Default(): any {
            return {
                baseUrl: 'http://upkeeperapi/',
                apiUrl: 'http://upkeeperapi/api/1/',
                version: '4.0',
                clientId: 'ngAuthApp'
            }
        }
    }
    angular.module('Upkeeper').constant('CONFIG', Config.Default);
    */
}
