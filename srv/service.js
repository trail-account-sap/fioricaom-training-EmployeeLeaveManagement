const cds = require('@sap/cds');
const { SELECT } = require('@sap/cds/lib/ql/cds-ql');

const { Employees, Leaved, LeaveRequests } = cds.entities;

module.exports = srv => {

    const db = cds.db;
    /*       srv.on('READ', 'Employees', async (req,res) => {
            results = [];
            results =  db.run(
                SELECT.from(Employees).where({ID : req.data.ID})
            )
            return results;
        }) */


    /* srv.before('CREATE' , 'LeaveRequests', async(req,res) =>{
        if (!req.data.ID)

    }) */

    srv.on('CREATE', 'LeaveRequests', async (req, res) => {
        const employee = await db.run(SELECT.from(Employees).where({ employee_id: req.data.employee_id }));
        const ID = employee;
        console.log(ID);
        results = [];
        results = await db.run([
            INSERT.into(LeaveRequests).entries(req.data)
        ])



            .then((resolve, reject) => {
                if (resolve) {
                    return req.data;
                } else {
                    return req.error(400, 'Leave Request failed');
                }
            })

            .catch(error => {
                return req.error(500, 'Internal Server Error');
            })

        return results;
    })

    srv.before('RequestLeave', async (req) => {
        results = [];
        results = await db.run(
            SELECT.one.from(Employees).where({ employee_id: req.data.employee_id })
        );
        if (!results) {
            req.reject(404, 'Employee not found in the system. Please check the People Partner');
        }
        req.data.employee_ID = results.ID;
        req.data.status = "pending";
        //console.log(results.ID)
    })

    srv.on('RequestLeave', async (req) => {
        await db.run([INSERT.into(LeaveRequests).entries(req.data)]);
        delete req.data.employee_ID;
        return req.data;
    })

    srv.on('READ', 'LeaveRequests', async (req) => {
        console.log(req.user);
        const lReq = await db.run(req.query);
        return lReq;
    })

    /* srv.before('NEW', 'LeaveRequests', async req => {
        const employee = await SELECT.one
            .from('leave.management.Employees')
            .where({ email: req.user.attr.email });

        if (employee) {
            req.data.employee_ID = employee.ID;
            req.data.email = employee.email
        }
    }); */

    /* srv.on('CREATE', 'LeaveRequests', async (req) => {
        req.error(500, 'Error');
        console.log(req.data);
        return req.data;
    }) */



}