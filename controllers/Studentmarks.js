import Response from '../helpers/Response';
import ErrorHandler from '../helpers/Errorhandler';
import connection from '../db';
import Session from '../helpers/Session';
import { infoId } from '../helpers/constants';

export default class Studentmarks extends Session {

    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.body.data;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.getMarks();
    }

    getMarks() {
        connection.query("select s.subject_name,m.marks,m.subject_id,m.test_no from MARKS m,SUBJECTS s where m.subject_id = s.subject_id and "+
        "m.studend_id = ?", [this.getUserId()], (err, res) => {
            if (err) {
                this.errorObj.setInfoID = infoId.FAILED;
                this.errorObj.setInfoMsg = "An error occured";
                this.errorObj.send(this.httpResponse);
            }
            if (res.length > 0) {       
                this.responseObj.setInfoID = infoId.SUCCESS;
                this.responseObj.setData = res;
                this.responseObj.infoMsg = "Student Marks";
                this.responseObj.send(this.httpResponse);
            } else {
                this.errorObj.setStatus = 204;
                this.errorObj.setInfoID = infoId.FAILED
                this.errorObj.setInfoMsg = "No data Found";
                this.errorObj.send(this.httpResponse);
            }
        });
    }

}