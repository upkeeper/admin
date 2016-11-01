namespace upk {
    'use strict';
    class DetailUsersController {

        user: User;
        roles: Role[];
        addRoles: Role[];

        static $inject: Array<string> = ['UserService', '$location', '$routeParams', 'RoleService'];
        constructor(private UserService: IUserService, private $location: ng.ILocationService, private $routeParams: any,
            private RoleService: IRoleService) {
            UserService.getUser($routeParams.id).then(data => this.user = data);
            UserService.getUserRoles($routeParams.id, true).then(data => this.roles = data);
        }

        save() {
            this.UserService.updateUser(this.user).then(res => this.$location.path('/Administration/Users'));
        }

        delete() {
            this.UserService.deleteUser(this.user.Id).then(res => this.$location.path('/Administration/Users'));
        }

        getRoles() {
            this.UserService.getUserRoles(this.$routeParams.id, false).then(data => this.addRoles = data);
        }

        addRole() {
            var roles = [];
            this.addRoles.forEach(role => {
                if (role.selected === true) {
                    roles.push(role.Id);
                }
            })
            this.UserService.addUserRoles(this.$routeParams.id, roles).then(res => {
                console.log(res)
            })
        }
    }
    angular
        .module('Upkeeper')
        .controller('DetailUsersController', DetailUsersController);
}