namespace upk {
    class AddTaskController {
        task: Task;
        functions: Array<UpkFunction>;
        days: Array<number> = [];
        schemaTypes: Array<any>;

        static $inject = ['$location', '$routeParams', 'taskService', '$scope'];
        constructor(private $location: ng.ILocationService, private $routeParams: ng.route.IRouteService, private taskService: ITaskService, private $scope: ng.IScope) {
            for (let i = 0; i <= 31; i++) {
                this.days.push(i);
            }
            taskService.getTaskFunctions().then(data => {
                this.functions = data
            });
            this.task = { Deleted: false }
            taskService.getSchemaTypes().then(res => this.schemaTypes = res);
        }

        save() {
            this.task.SequenceNumber = 0;
            this.task.SchemaTypeId = this.task.SchemaTypeId = this.schemaTypes[0].Key;
            this.taskService.addTask(this.task).then(res => {
                this.$location.path('/Tasks');
            }, err => {
                console.log(err)
            });
        };
    }
    angular.module('Upkeeper')
        .controller('AddTaskController', AddTaskController);
}