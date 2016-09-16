namespace upk {
    class EditUserController {
        user: User;
        devices: Array<any>;

        static $inject = ['$location', '$routeParams', 'UserService']
        constructor(private $location: ng.ILocationService, private $routeParams, private UserService: IUserService) {
            UserService.getUser($routeParams.id).then(res => this.user = res);
            UserService.getDevices().then(res => this.devices = res);
        }

        public save() {
            this.UserService.updateUser(this.user).then(() => {
                this.$location.path('/Users');
            });
        }
    }
    angular
        .module('Upkeeper')
        .controller('EditUserController', EditUserController);
}