namespace upk {
    class AddBatchJobsController {

        batchJob: BatchJob;
        static $inject = ['$scope', '$location', 'batchJobService', '$rootScope'];
        constructor(private $scope, private $location: ng.ILocationService, private batchJobService: IBatchJobService, private $rootScope) {
        }

        save() {
            this.batchJob.Deleted = false;
            this.batchJob.OrganizationId = this.$rootScope.currentOrganization;
            this.batchJobService.addBatchJob(this.batchJob).then(res => {
                this.$location.path('/BatchJobs');
            }, err => {
                console.log(err);
            })
        }

    }
    angular.module('Upkeeper')
        .controller('AddBatchJobController', AddBatchJobsController);
}