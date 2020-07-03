import Response from '../helpers/Response';
import ErrorHandler from '../helpers/Errorhandler';
import connection from '../db';
import Session from '../helpers/Session';
import { infoId } from '../helpers/constants';

export default class Studentdetails extends Session {

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
        connection.query("select s.student_name, t.teacher_name,s.dob,s.mother_name,s.father_name,s.course " +
            "from STUDENT s, TEACHER t, STUDENT_TEACHER_MAP m " +
            "where t.teacher_id = m.teacher_id and m.studend_id = s.student_id  " +
            " and s.student_id = ?", [this.getUserId()], (err, res) => {
                if (err) {
                    this.errorObj.setInfoID = infoId.FAILED;
                    this.errorObj.setInfoMsg = "An error occured";
                    this.errorObj.send(this.httpResponse);
                }
                if (res.length > 0) {
                    let result = res[0];
                    let data = {};
                    data.name = result.student_name;
                    data.teacher_name = result.teacher_name;
                    data.dob = result.dob;
                    data.mother_name = result.mother_name;
                    data.father_name = result.father_name;
                    data.course = result.course;
                    this.responseObj.setInfoID = infoId.SUCCESS;
                    this.responseObj.setData = data;
                    this.responseObj.infoMsg = "Student Details";
                    this.responseObj.send(this.httpResponse);
                } else {
                    this.errorObj.setInfoID = infoId.FAILED
                    this.errorObj.setInfoMsg = "No data Found";
                    this.errorObj.send(this.httpResponse);
                }
            });
    }

}