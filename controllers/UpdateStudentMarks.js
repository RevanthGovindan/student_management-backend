import Response from '../helpers/Response';
import ErrorHandler from '../helpers/Errorhandler';
import connection from '../db';
import Session from '../helpers/Session';
import { infoId } from '../helpers/constants';

export default class UpdateStudentMarks extends Session {

    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.body.data;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.updateMarks();
    }

    updateMarks() {
        if (this.getRole() === 3) {
            this.errorObj.setStatus = 401;
            this.errorObj.setInfoID = infoId.FAILED
            this.errorObj.setInfoMsg = "Unauthorized";
            this.errorObj.send(this.httpResponse);
            return;
        }
        connection.query("update MARKS set marks = ? where studend_id = ? and subject_id = ?", [this.body.marks,
        this.body.studend_id,
        this.body.subject_id], (err, res) => {
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
                this.errorObj.setStatus = 204;
                this.errorObj.setInfoID = infoId.FAILED
                this.errorObj.setInfoMsg = "No data Found";
                this.errorObj.send(this.httpResponse);
            }
        });
    }

}