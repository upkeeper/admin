namespace upk {
    export interface Permission {
        Id: string;
        Name: string;
        Description: string;
        Roles: Array<Role>;
    }
}
