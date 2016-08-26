namespace upk {
    'use strict';

    export interface IBatchJobService {
        getBatchJobs(): ng.IHttpPromise<BatchJob[]>;
        getBatchJobDetail(id: string): ng.IHttpPromise<BatchJob>;
        addBatchJob(BatchJob: any): ng.IHttpPromise<{}>;
        removeBatchJob(BatchJob: any): ng.IHttpPromise<{}>;
        updateBatchJob(id: string, BatchJob: BatchJob): ng.IHttpPromise<{}>;
        getMessages(id: string): ng.IPromise<any>;
    }

    class BatchJobService implements IBatchJobService {
        apiUrl: string;

        static $inject: Array<string> = ['$http', 'CONFIG', 'ApiService'];
        constructor(private $http: ng.IHttpService, private CONFIG: config.IConfig, private ApiService: IApiService) {
            this.apiUrl = CONFIG.apiUrl;
        }

        getBatchJobs() {
            return this.$http.get(this.apiUrl + 'BatchJobs');
        }

        addBatchJob(batchJob: BatchJob) {
            batchJob.CreateComputer = false;
            return this.$http.post(this.apiUrl + 'BatchJob', batchJob);
        }

        updateBatchJob(id: string, batchJob: BatchJob) {
            return this.$http.put(this.apiUrl + 'BatchJob/' + id, batchJob);
        }

        removeBatchJob(id: string) {
            return this.$http.delete(this.apiUrl + 'BatchJob/' + id);
        }

        getBatchJobDetail(id: string) {
            return this.$http.get(this.apiUrl + 'Batchjob/' + id);
        };

        getMessages(id: string): ng.IPromise<any> {
            return this.$http.get(this.apiUrl + 'BatchJob/' + id + '/Messages').then(res => res.data);
        }


    }
    angular.module('Upkeeper')
        .service('batchJobService', BatchJobService);
}