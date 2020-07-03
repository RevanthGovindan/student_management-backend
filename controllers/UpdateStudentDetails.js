import Response from '../helpers/Response';
import ErrorHandler from '../helpers/Errorhandler';
import connection from '../db';
import Session from '../helpers/Session';
import { infoId } from '../helpers/constants';

export default class UpdateStudentDetails extends Session {

    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.body.data;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.updateDetails();
    }

    updateDetails() {
        if(this.body.student_id !== this.getUserId() && this.getRole() === 3){
            this.errorObj.setStatus = 401;
            this.errorObj.setInfoID = infoId.FAILED
            this.errorObj.setInfoMsg = "Unauthorized";
            this.errorObj.send(this.httpResponse);
            return;
        }
        connection.query("update STUDENT set student_name = ?,dob = ?,mother_name = ?,father_name = ?,course = ? where student_id = ?", [
            this.body.name,
            this.body.dob,
            this.body.mother_name,
            this.body.father_name,
            this.body.course,
            this.body.student_id
        ], (err, res) => {
            if (err) {
                this.errorObj.setInfoID = infoId.FAILED;
                this.errorObj.setInfoMsg = "An error occured";
                this.errorObj.send(this.httpResponse);
            }
            
            if (res.changedRows > 0) {
                let data = {};
                
                this.responseObj.setInfoID = infoId.SUCCESS;
                this.responseObj.setData = data;
                this.responseObj.infoMsg = "Update successful";
                this.responseObj.send(this.httpResponse);
            } else {
                this.errorObj.setInfoID = infoId.FAILED
                this.errorObj.setInfoMsg = "No data Found";
                this.errorObj.send(this.httpResponse);
            }
        });
    }

}