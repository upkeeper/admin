namespace upk {
    export interface UserOrganizationRole {
        UserId: string;
        Organizationid: string;
        RoleId: string;
        User: User;
        Organization: Organization;
        Role: Role;
    }
}
