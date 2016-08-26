namespace upk {
    class ReportsController {

        static $inject = ['$location'];
        constructor(private $location: ng.ILocationService) {
        }
    }
    angular.module('Upkeeper')
        .controller('ReportsController', ReportsController);
}

