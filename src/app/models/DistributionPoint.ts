namespace upk {
    export interface DistributionPoint {
        OrganizationId: string;
        Id: string;
        Subnets: Array<Subnet>;
    }
}