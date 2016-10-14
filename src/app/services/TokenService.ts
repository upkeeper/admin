namespace upk {
    export interface ITokenService {
        getToken(): Token;
        tokenExpired(): boolean;
        removeToken(): void;
        getOrganizations(): any;
        getOrganizationNumber(): string;
        getUsername(): string;
    }

    class TokenService implements ITokenService {
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

        getOrganizations(): Array<Organization> {
            var token: Token = JSON.parse(localStorage.getItem('upkeeperData'));
            console.log(token.user_organizations);
            if (token) {
                return token.user_organizations;
            }
        }

        tokenExpired() {
            var token = this.getToken();
            return false;
        }

        removeToken() {
            localStorage.removeItem('upkeeperData');
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

