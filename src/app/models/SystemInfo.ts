namespace upk {
    export interface ISystemInformation {
        TotalPhysicalMemory: number;
        DiskDrivers: any;
        DatabaseServerName: string;
        DatabaseServerVersion: string;
        DatabaseName: string;
        WebVersion: string;
        DatabaseVersion: string;
        ApplicationServerVersion: string;
    }
}