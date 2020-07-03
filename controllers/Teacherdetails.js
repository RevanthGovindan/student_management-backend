import Response from '../helpers/Response';
import ErrorHandler from '../helpers/Errorhandler';
import connection from '../db';
import Session from '../helpers/Session';
import { infoId } from '../helpers/constants';

export default class Teacherdetails extends Session {

    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.body.data;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.getDetails();
    }

    getDetails() {

        connection.query("select t.teacher_name,s.subject_name ,t.teacher_id,t.dob,t.course_completed,t.expert_in,t.email_id,"
            + "t.years_of_experience from TEACHER t,SUBJECTS s where s.subject_id = t.sub_id "
            + "and t.teacher_id = ?", [this.getUserId()], (err, res) => {
                if (err) {
                    this.errorObj.setInfoID = infoId.FAILED;
                    this.errorObj.setInfoMsg = "An error occured";
                    this.errorObj.send(this.httpResponse);
                }
                if (res.length > 0) {
                    let data = {};
                    data.id = res[0].teacher_id;
                    data.name = res[0].teacher_name;
                    data.subject_name = res[0].subject_name;
                    data.dob = res[0].dob;
                    data.course_completed = res[0].course_completed;
                    data.expert_in = res[0].expert_in;
                    data.email_id = res[0].email_id;
                    data.years_of_experience = res[0].years_of_experience;
        
                    this.responseObj.setInfoID = infoId.SUCCESS;
                    this.responseObj.setData = data;
                    this.responseObj.infoMsg = "Teacher details";
                    this.responseObj.send(this.httpResponse);
                } else {
                    this.errorObj.setInfoID = infoId.FAILED
                    this.errorObj.setInfoMsg = "No data Found";
                    this.errorObj.send(this.httpResponse);
                }
            });
    }

}