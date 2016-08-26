(function() {
    angular.module('Upkeeper')
        .factory('authInterceptorService', ['$injector', '$location', '$q', 'tokenService', ($injector, $location, $q, tokenService) => {
            var authInterceptorServiceFactory: any;
            authInterceptorServiceFactory = {};
            var $http;

            var _request = config => {

                config.headers = config.headers || {};

                var authData = JSON.parse(localStorage.getItem('upkeeperData'));
                if (authData) {
                    config.headers.Authorization = 'Bearer ' + authData.access_token;
                }
                return config;
            }

            var _responseError = rejection => {
                var deferred = $q.defer();
                if (rejection.status === 401) {
                    console.log('ACCESS DENIED... Need new token')
                    var authService = $injector.get('authService');
                    authService.refreshToken().then(response => {
                        _retryHttpRequest(rejection.config, deferred);
                    }, () => {
                        authService.logout();
                        $location.path('/Login');
                        deferred.reject(rejection);
                    });
                } else {
                    deferred.reject(rejection);
                }
                return deferred.promise;
            }

            var _retryHttpRequest = (config, deferred) => {
                $http = $http || $injector.get('$http');
                $http(config).then(response => {
                    deferred.resolve(response);
                }, response => {
                    deferred.reject(response);
                });
            }

            authInterceptorServiceFactory.request = _request;
            authInterceptorServiceFactory.responseError = _responseError;

            return authInterceptorServiceFactory;
        }]);
})();