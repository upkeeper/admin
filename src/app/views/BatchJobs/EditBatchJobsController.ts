namespace upk {
    class EditBatchJobsController {
        batchJob: BatchJob;
        messages: Array<any>;

        static $inject = ['$location', '$routeParams', 'batchJobService'];
        constructor(private $location: ng.ILocationService, private $routeParams, private batchJobService: IBatchJobService) {
            batchJobService.getBatchJobDetail(this.$routeParams.id).then(res => this.batchJob = res.data);
            batchJobService.getMessages(this.$routeParams.id).then(data => this.messages = data);
        };

        save() {
            this.batchJobService.updateBatchJob(this.$routeParams.id, this.batchJob).then((res) => {
                console.log(res)
                this.$location.path('/BatchJobs');
            })
        }

        delete() {
            this.batchJobService.removeBatchJob(this.batchJob.Id).then(() => this.$location.path('/BatchJobs'));
        }
    }
    angular.module('Upkeeper')
        .controller('EditBatchJobsController', EditBatchJobsController);
}

