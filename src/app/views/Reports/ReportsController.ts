namespace upk {
    class ReportsController {

        reports: any;
        static $inject = ['$location', 'reportService'];
        constructor(private $location: ng.ILocationService, private reportService: IReportService) {
            reportService.getReports().then(data => this.reports = data);
        }
    }
    angular.module('Upkeeper')
        .controller('ReportsController', ReportsController);
}

