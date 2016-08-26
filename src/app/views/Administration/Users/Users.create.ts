namespace upk {
    'use strict';

    class CreateUserController {

        user: User;

        static $inject: Array<string> = ['UserService', '$location'];
        constructor(private UserService: IUserService, private $location: ng.ILocationService) {

        }

        save() {
            this.UserService.addUser(this.user).then(res => this.$location.path('/Administration/Users'))
        }

    }

    angular
        .module('Upkeeper')
        .controller('CreateUserController', CreateUserController);
}