namespace upk {
    export interface ITokenService {
        getToken(): Token;
        tokenExpired(): boolean;
        removeToken(): void;
        getOrganizationNumber(): string;
        getUsername(): string;
    }

    class TokenService implements ITokenService {
        constructor() {}

        getToken(): Token {
            var token: Token = JSON.parse(localStorage.getItem('upkeeperData'));
            if (token) {
                token.user_organization_roles_permissions = JSON.parse(token.user_organization_roles_permissions)
                return token;
            }
        }

        getOrganizationNumber(): string {
            return localStorage.getItem('organization');
        }

        tokenExpired() {
            var token = this.getToken();
            return false;
        }

        removeToken() {
            localStorage.removeItem('upkeeperData');
            localStorage.removeItem('organization');
        }

        getUsername() {
            var token: Token = JSON.parse(localStorage.getItem('upkeeperData'));
            if (token) {
                return token.userName;
            }
        }
    }
    angular.module('Upkeeper')
        .service('tokenService', TokenService);
}

