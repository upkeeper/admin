namespace upk {
    'use strict';

    class DetailUserController {

        user: User;

        static $inject: Array<string> = ['UserService', '$location', '$routeParams'];
        constructor(private UserService: IUserService, private $location: ng.ILocationService, private $routeParams: any) {
            UserService.getUser($routeParams.id).then(data => this.user = data);
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
        .controller('DetailUserController', DetailUserController);
}