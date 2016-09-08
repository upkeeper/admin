namespace upk {
    class UsersController {
        searchbarvalue = 'User: ';
        users: Array<User>;
        static $inject = ['$location', 'UserService'];

        constructor(private $location: ng.ILocationService, private userService: IUserService) {
            userService.getADUsers().then(res => this.users = res);
        }

        public editUser(user: User) {
            console.log(user);
            this.$location.path('/Users/' + user.Id);
        }

        public create() {
            this.$location.path('/Users/Create');
        }
    }

    angular.module('Upkeeper')
        .controller('UsersController', UsersController);
}