import Response from '../helpers/Response';
import ErrorHandler from '../helpers/Errorhandler';
import connection from '../db';
import Session from '../helpers/Session';
import { infoId } from '../helpers/constants';

export default class UpdateTeacherDetails extends Session {

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

        connection.query("update TEACHER set teacher_name = ?,dob=?,course_completed = ?,expert_in=?,email_id = ?," +
            " years_of_experience = ?,sub_id = ? where teacher_id = ?", [
            this.body.name,
            this.body.dob,
            this.body.course,
            this.body.expert_in,
            this.body.email_id,
            this.body.years_of_experience,
            this.body.sub_id,
            this.getUserId()
        ], (err, res) => {
            console.log(err)
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