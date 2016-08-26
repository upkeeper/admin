namespace upk {
    export interface Platform {
        Id?: string;
        Name: string;
        Description: string;
        Architecture?: number;
        SetupCommand?: string;
        SetupParameters?: string;
        Path?: string;
        Visible: boolean;
        Type: number;
        Deleted: boolean;
        IsExternal?: boolean;
    }
}
