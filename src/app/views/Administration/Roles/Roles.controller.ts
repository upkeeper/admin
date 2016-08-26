namespace upk {
    'use strict';

    class RolesController {

        roles: Array<Role>

        static $inject: Array<string> = ['RoleService', '$location'];
        constructor(private RoleService: IRoleService, private $location: ng.ILocationService) {
            RoleService.getRoles().then(data => this.roles = data);
        }
        
        editRole(role: Role) {
            this.$location.path('/Administration/Roles/Detail/' + role.Id);
        }        
    }

    angular
        .module('Upkeeper')
        .controller('RolesController', RolesController);
}