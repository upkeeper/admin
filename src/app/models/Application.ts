namespace upk {
    export interface Application {
        PackageDate: Date;
        OrganizationId: string;
        PublishTime: Date;
        selected?: boolean;
        Id?: string;
        Path?: string;
        Priority?: number;
        InstallCommand?: string;
        InstallConditions?: number;
    }
}