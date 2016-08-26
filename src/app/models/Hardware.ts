namespace upk {
    export interface Hardware {
        Id: string;
        OrganizationId: string;
        Deleted: boolean;
        Description?: string;
        Vpro?: boolean;
        CatagoryId?: string;

        selected?: boolean;
    }
}
