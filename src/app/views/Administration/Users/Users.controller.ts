namespace upk {
    'use strict';

    class AdminUsersController {
        users: Array<User>;
        static $inject: Array<string> = ['UserService', '$location'];
        constructor(private UserService: IUserService, private $location: ng.ILocationService) {
            UserService.getUsers().then(data => this.users = data);
        }

        editUser(user: User) {
            this.$location.path('/Administration/Users/Detail/' + user.Id);
        }

        create() {
            this.$location.path('/Administration/Users/Create');
        }

    }

    angular
        .module('Upkeeper')
        .controller('AdminUsersController', AdminUsersController);
}