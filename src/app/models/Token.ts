namespace upk {
    export interface Token {
        access_token: string;
        userName: string;
        refresh_token: string;
        expires_in: number;
        token_type: string;
        issued: string;
        expires: string;
        user_organization_roles_permissions: any;
        user_organizations: any;
        upkeeper_admin: string;
    }
}