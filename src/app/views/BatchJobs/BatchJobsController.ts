namespace upk {
    class BatchJobsControllers {
        searchbarvalue: string;
        batchJobs: Array<BatchJob>;

        static $inject = ['$location', 'batchJobService', 'PermissionService'];
        constructor(private $location: ng.ILocationService, private batchJobService: IBatchJobService, private PermissionService: IPermissionService) {
            this.searchbarvalue = "Batch Name: ";
            batchJobService.getBatchJobs().then(res => this.batchJobs = res.data);
            
        }

        editBatchjob(batchJob: BatchJob) {
            if (this.PermissionService.HasPermission('BatchJob_Create_Edit'))
                this.$location.path('/BatchJobs/' + batchJob.Id);
        }

        create() {
            this.$location.path('/BatchJobs/Create');
        }
    }
    angular.module('Upkeeper')
        .controller('BatchJobsController', BatchJobsControllers);
}

