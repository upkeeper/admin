module upk {
    export interface IReportService {
        getReports(): ng.IPromise<any>;
    }

    class ReportService implements IReportService {
        apiUrl: string;

        static $inject = ['$http', 'CONFIG', 'ApiService', '$rootScope'];
        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig, private ApiService: IApiService, private $rootScope) {
            this.apiUrl = CONFIG.apiUrl;
        }
        getReports() {
            return this.$http.get(this.apiUrl + 'Reports').then(res => res.data);
        }
    }
    angular.module('Upkeeper')
        .service('reportService', ReportService);
}


