namespace upk {
    export interface BatchJob {
        Id: string;
        Scheduled: any;
        Deleted: boolean;
        CreateComputer: boolean;
        OrganizationId: string;
    }
}