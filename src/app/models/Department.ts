namespace upk {
    export interface Department {
        Id: string;
        Name: string;
        Description?: string;
        Organizationid?: string;
        Organization?: Organization;
        Deleted: boolean;
        Computers?: Computer[];
        Users?: User[];
    }
}
