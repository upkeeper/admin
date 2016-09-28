namespace upk {
    'use strict';
    class DetailUsersController {

        user: User;
        roles: Role[];

        static $inject: Array<string> = ['UserService', '$location', '$routeParams', 'RoleService'];
        constructor(private UserService: IUserService, private $location: ng.ILocationService, private $routeParams: any,
            private RoleService: IRoleService) {
            UserService.getUser($routeParams.id).then(data => this.user = data);
            RoleService.getRoles().then(data => this.roles = data);
        }

        save() {
            this.UserService.updateUser(this.user).then(res => this.$location.path('/Administration/Users'))
        }

        delete() {
            this.UserService.deleteUser(this.user.Id).then(res => this.$location.path('/Administration/Users'))
        }
    }

    angular
        .module('Upkeeper')
        .controller('DetailUsersController', DetailUsersController);
}