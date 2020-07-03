import Response from '../helpers/Response';
import ErrorHandler from '../helpers/Errorhandler';
import connection from '../db';
import Session from '../helpers/Session';
import { infoId } from '../helpers/constants';

export default class DeleteTeacher extends Session {

    constructor(request, httpResponse) {
        super();
        this.request = request;
        this.body = request.params;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    controller() {
        this.deleteTeacher();
    }

    deleteTeacher() {
        if(this.getRole() !== 1){
            this.errorObj.setStatus = 401;
            this.errorObj.setInfoID = infoId.FAILED
            this.errorObj.setInfoMsg = "Unauthorized";
            this.errorObj.send(this.httpResponse);
            return;
        }
        connection.query("delete from TEACHER where teacher_id = ?", [this.body.teacher_id], (err, res) => {
            if (err) {
                this.errorObj.setInfoID = infoId.FAILED;
                this.errorObj.setInfoMsg = "An error occured";
                this.errorObj.send(this.httpResponse);
            }

            if (res.student_id > 0) {                
                this.responseObj.setInfoID = infoId.SUCCESS;
                this.responseObj.setData = {};
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