namespace upk {
    'use strict';

    class DetailRoleController {

        role: Role;

        static $inject: Array<string> = ['RoleService', '$location', '$routeParams'];
        constructor(private RoleService: IRoleService, private $location: ng.ILocationService, private $routeParams: any) {
            RoleService.getRole($routeParams.id).then(data => this.role = data);
        }

        save() {
            this.RoleService.updateRole(this.role).then(res => this.$location.path('/Administration/Roles'));            
        }
    }

    angular
        .module('Upkeeper')
        .controller('DetailRoleController', DetailRoleController);
}