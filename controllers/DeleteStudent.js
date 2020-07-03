import Response from '../helpers/Response';
import ErrorHandler from '../helpers/Errorhandler';
import connection from '../db';
import Session from '../helpers/Session';
import { infoId } from '../helpers/constants';

export default class DeleteStudent extends Session {

    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.params;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.deleteStudent();
    }

    deleteStudent() {
        if (this.getRole() === 3) {
            this.errorObj.setStatus = 401;
            this.errorObj.setInfoID = infoId.FAILED
            this.errorObj.setInfoMsg = "Unauthorized";
            this.errorObj.send(this.httpResponse);
            return;
        }
        console.log(this.body.student_id)
        connection.query("delete from STUDENT where student_id = ?", [this.body.student_id], (err, res) => {
            if (err) {
                this.errorObj.setInfoID = infoId.FAILED;
                this.errorObj.setInfoMsg = "An error occured";
                this.errorObj.send(this.httpResponse);
            }

            if (res.affectedRows > 0) {
                this.responseObj.setInfoID = infoId.SUCCESS;
                this.responseObj.setData = data;
                this.responseObj.infoMsg = "Delete successful";
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