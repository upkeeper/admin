namespace upk {
    class GroupsController {
        searchbarvalue: string;
        groups: Array<Group>;

        static $inject: Array<string> = ['$location', 'groupService', 'PermissionService'];
        constructor(private $location: ng.ILocationService, private groupService: IGroupService, private PermissionService: IPermissionService) {
            this.searchbarvalue = "Group name: ";
            groupService.getGroups().then(data => this.groups = data);
        }

        editGroup(group: Group) {
            if (this.PermissionService.HasPermission('Group_Create_Edit'))
                this.$location.path('/Groups/' + group.Id);
        }

        create() {
            this.$location.path('/Groups/Create');
        }
    }
    angular.module('Upkeeper')
        .controller('GroupsController', GroupsController);
}

