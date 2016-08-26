namespace upk {
    class LoginController {

        credentials;
        loginError: string;

        static $inject = ['$location', 'authService', 'ApiService'];
        constructor(private $location, private authService: IAuthService, private ApiService: IApiService) {
            this.credentials = {
                username: '',
                password: ''
            }
        }

        login() {
            this.authService.logout();
            this.authService.login(this.credentials.username, this.credentials.password).then((res: any) => {
                if (res.data.access_token) {
                    this.ApiService.setLoginParameters().then(res => {
                        this.$location.path('/Home');
                    });
                }
            },
                err => {
                    this.loginError = err;
                });
        };


    }
    angular.module('Upkeeper')
        .controller('LoginController', LoginController);
}