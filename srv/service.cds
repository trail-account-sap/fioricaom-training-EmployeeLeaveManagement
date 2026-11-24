using {leave.management as db} from '../db/schema';


service LeaveManagementService @(requires : 'authenticated-user'){
    entity Employees       as projection on db.Employees;
    entity Leaves          as projection on db.Leaves;
    
    @odata.draft.enabled
    entity LeaveRequests   as projection on db.LeaveRequests;

    entity RequestStatusVH as projection on db.RequestStatusVH;
    entity LeaveTypeVH     as projection on db.LeaveTypeVH;

    action RequestLeave(employee_id: Integer,
                        email: String,
                        start_date: Date,
                        end_date: Date,
                        reason: String,
                        type: String


    ) returns LeaveRequests;
}


