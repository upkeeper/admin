namespace upk {
    class TasksController {
        searchbarvalue: string;
        tasks: Array<Task>;
        

        static $inject = ['$location', 'taskService', 'PermissionService'];
        constructor(private $location: ng.ILocationService, private taskService: ITaskService, private PermissionService: IPermissionService) {
            this.searchbarvalue = "Task: ";
            
            taskService.getTasks().then(data => {
                this.tasks = data
            })
        };

        editTask(task: Task) {
            if (this.PermissionService.HasPermission('Task_View'))
                this.$location.path('/Tasks/' + task.Id);
        };

        create() {
            if (this.PermissionService.HasPermission('Task_Create_Edit'))
                this.$location.path('/Tasks/Create');
        };
    }
    angular.module('Upkeeper')
        .controller('TasksController', TasksController);
}
