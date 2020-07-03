import connection from '../db';
import { infoId } from './constants';
import ErrorHandler from './Errorhandler';

export default class Session {

    constructor() {
        this.user_id = "";
        this.session_id = "";
        this.role = 0;
        this.errorObj = new ErrorHandler();
    }

    doProcess() {
        this.checkSession();
    }

    checkSession() {

        let sessionId = this.request.headers.authorization;
        connection.query('SELECT * FROM CODAGLOBAL.SESSION WHERE SESSION_ID = ?', [sessionId], (err, res) => {

            if (err) {
                this.errorObj.setInfoID = infoId.FAILED;
                this.errorObj.setInfoMsg = "An error occured";
                this.errorObj.send(this.httpResponse);
            }

            if (res.length > 0) {
                this.user_id = res[0].user_id;
                this.session_id = sessionId;
                this.role = res[0].role;
                this.controller();
            } else {
                this.errorObj.setInfoID = infoId.UNAUTHORIZED;
                this.errorObj.setInfoMsg = "Invalid Session";
                this.errorObj.status = 401;
                this.errorObj.send(this.httpResponse);
            }

        });
    }

    getUserId() {
        return this.user_id;
    }

    getSessionId() {
        return this.session_id;
    }

    getRole(){
        return this.role;
    }

}