namespace upk {
    export interface Task {
        Id?: string;
        selected?: boolean;
        OrganizationId?: string;
        FunctionId?: string;
        Name?: string;
        SequenceNumber?: number;
        SchemaTypeId?: string;
        Description?: string;
        ClientCommand?: string;
        ClientParameter?: string;
        Created?: Date;
        Instant?: boolean;
        SchemaStartDate?: Date;
        SchemaEndDate?: Date;
        StartTime?: Date;
        StartTimeMaxOffset?: number;
        RandomizeStartTime?: boolean;
        DaysOfMonth?: number;
        DasOfWeek?: number;
        SchemaType?: any;
        Function?: UpkFunction;
        Organization?: Organization;
        Deleted: boolean;
    }
}
