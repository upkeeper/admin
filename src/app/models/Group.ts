namespace upk {
    export interface Group {
        Id: string;
        selected: boolean;
        Source: string;
        Active: boolean;
        organizationId: string;
        Deleted: boolean;
        Locked: boolean;
        CategoryId: string;
        isDynamic: boolean;
    }
}
