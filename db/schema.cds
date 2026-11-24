using {
    cuid,
    managed
} from '@sap/cds/common';

namespace leave.management;

entity Employees : cuid, managed {
    employee_id   : Integer;
    title         : String;
    first_name    : String;
    last_name     : String;
    name          : String = concat(
        first_name, ' ', last_name
    ) @Common.Label: 'Name';
    email         : String;
    leave_balance : Association to one Leaves;
    leave_request : Association to many LeaveRequests
                        on leave_request.employee = $self;
    manager_email : String;
    manager       : Association to Employees
                        on manager.email = manager_email;
}

entity Leaves : cuid, managed {
    employee              : Association to one Employees;
    earned_leave          : Decimal;
    advanced_earned_leave : Decimal;
    personal_leave        : Decimal;
    total_leave           : Decimal = earned_leave + advanced_earned_leave + personal_leave;
}

entity LeaveRequests : cuid, managed {
    employee   : Association to one Employees @Common.Label: 'Name';
    start_date : Date                         @Common.Label: 'Start Date';
    end_date   : Date                         @Common.Label: 'End Date';
    reason     : String                       @Common.Label: 'Reason';
    type       : leave_type                   @Common.Label: 'Leave Type';
    status     : request_status               @readonly  @Common.Label: 'Leave Status';
}

type request_status : String enum {
    approved;
    rejected;
}

type leave_type     : String enum {
    EL;
    AEL;
    PL;
}

entity RequestStatusVH {
    key status : String;
        text   : String

}

entity LeaveTypeVH {
    key type : String;
        text : String;
}
