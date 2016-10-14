namespace upk {
    export interface Role {
        Id: string;
        Name: string;
        Description: string;
        Deleted: boolean;
        UserOrganizationRoles: Array<any>;
        Permissions: Array<Permission>;
        selected: boolean;
    }
}
