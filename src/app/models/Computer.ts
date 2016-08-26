namespace upk{
    export interface Computer {
        Id: string
        Name: string;
        Deleted: boolean;
        selected?: boolean;
        Uuid?: string;
        SerialNumber?: string;
        OrganizationId?: string;
        HardwareId?: string;
        PlatformId?: string;
        Description?:string;
        Locked: boolean;
        CategoryId: string;
        TeamViewerId: string;
        Disabled: boolean;
        StartInstallDate: Date;
        InstallDate: Date;
        ServiceOSPath: string;
        UserName: string;
        SecondaryDNS: string;
        PrimaryDNS: string;
        DefaultGateway: string;
        SubnetMask: string;
        IPAdress: string;
        MACAddress: string;
        ClientVersion: string;
        ServiceOSType: string;
        Location: string;
        Extra1: string;
        Extra2: string;
        Extra3: string;
        Extra4: string;
        Extra5: string;
    }
}
