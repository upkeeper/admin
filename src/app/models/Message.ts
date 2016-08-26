namespace upk {
    export interface Message {
        Id ? : string;
        Title: string;
        Body ? : string;
        Published: string;
        UserId: string;
        UserFullname: string;
        ShowClients: boolean;
        Global: boolean;
        Vendor: boolean;
        OrganizationId: string;
        OrganizationName ? : string;
        Urgent: boolean;
    }
}