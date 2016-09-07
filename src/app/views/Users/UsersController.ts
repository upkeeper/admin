namespace upk {
    class UsersController {
        searchbarvalue = 'User: ';
        users: Array<User>;
        static $inject = ['$location', 'UserService'];

        constructor(private $location: ng.ILocationService, private userService: IUserService) {
            userService.getADUsers().then(res => this.users = res);
         }

         public create(){

         }
    }

    angular.module('Upkeeper')
        .controller('UsersController', UsersController);
}