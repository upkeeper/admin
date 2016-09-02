namespace upk {
    'use strict';
    export interface IAuthService {
        login(username: string, password: string): ng.IPromise<Token>;
        logout(): void;
        refreshToken(): ng.IPromise<Token>;
        isAuthenticated(): boolean;
        fillAuthData(): void;
        getAuthentication(): Object;
    }
    export class AuthService implements IAuthService {
        apiUrl: string;
        public _authentication = {
            isAuth: false,
            userName: '',
            useRefreshTokens: false
        };

        baseUrl: string;

        static $inject: Array<string> = ['$http', '$rootScope', 'CONFIG', '$q', 'tokenService', '$window', 'ApiService', '$location'];
        constructor(private $http: ng.IHttpService, private $rootScope: any, private CONFIG: config.IConfig,
            private $q: ng.IQService, private tokenService: ITokenService, private $window,
            private ApiService: IApiService, private $location) {
            this.apiUrl = CONFIG.apiUrl;
            this.baseUrl = CONFIG.baseUrl;
        }

        login(username: string, password: string): ng.IPromise<Token> {
            var deferred = this.$q.defer();
            var data = 'grant_type=password&username=' + username + '&password=' + password + '&client_id=' + this.CONFIG.clientId;

            this.$http.post(this.baseUrl + 'token', data,
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then((res: any) => {
                    this._authentication.isAuth = true;

                    localStorage.setItem('upkeeperData', JSON.stringify(res.data));
                    deferred.resolve(res);
                }, err => {
                    console.log(err);
                    deferred.reject(err);
                });
            return deferred.promise;
        }


        refreshToken(): ng.IPromise<Token> {
            var deferred = this.$q.defer();

            var token = this.tokenService.getToken();

            if (token) {
                var data = 'grant_type=refresh_token&refresh_token=' + token.refresh_token + '&client_id=' + this.CONFIG.clientId;
                localStorage.removeItem('upkeeperData');
                this.$http.post(this.baseUrl + 'token', data,
                    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                    .then(res => {
                        localStorage.setItem('upkeeperData', JSON.stringify(res.data));
                        deferred.resolve(res);

                    }, err => {
                        this.logout();
                        deferred.reject(err);
                    });
            } else {
                deferred.reject();
                console.log('Failed getting refreshtoken');
            }

            return deferred.promise;
        }


        fillAuthData() {
            var authData = this.tokenService.getToken();
            if (authData) {
                this.$rootScope.currentOrganization = localStorage.getItem('organizationId');
                this.$rootScope.currentOrgName = localStorage.getItem('organizationName');
                this._authentication.isAuth = true;
                this._authentication.userName = authData.userName;
                this._authentication.useRefreshTokens = true;
                this.$rootScope.isLoggedIn = true;

                this.ApiService.login();
            } else {
                this.logout();
            }
        };

        logout() {
            this._authentication.isAuth = false;
            this._authentication.userName = '';
            this._authentication.useRefreshTokens = false;
            this.$rootScope.isLoggedIn = false;
            this.tokenService.removeToken();
            this.ApiService.logout();
            this.$location.path('/Login');
        }

        isAuthenticated() {
            return this._authentication.isAuth;
        }

        getAuthentication() {
            return this._authentication;
        }

    }
    angular.module('Upkeeper')
        .service('authService', AuthService);
}

