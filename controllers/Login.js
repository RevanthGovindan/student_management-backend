import Response from '../helpers/Response';
import ErrorHandler from '../helpers/Errorhandler';
import connection from '../db';
import { getUUID } from '../helpers/utils';

import { infoId } from '../helpers/constants';

export default class Login {
    constructor(request, httpResponse) {
        this.request = request;
        this.body = request.body.data;
        this.httpResponse = httpResponse;
        this.responseObj = new Response();
        this.errorObj = new ErrorHandler();
    }

    validateLogin() {
        let userName = this.body.user_name;
        let password = this.body.password;
        let data = {};

        connection.query("SELECT * FROM CREDENTIALS WHERE USER_ID = ? AND PASSWORD = md5(?)", [userName, password], (err, res) => {

            if (err) {
                this.errorObj.setInfoID = infoId.FAILED;
                this.errorObj.setInfoMsg = "An error occured";
                this.errorObj.send(this.httpResponse);
            }

            if (res.length > 0) {
                let id = res[0].id;
                let role = res[0].role;
                let user_id = res[0].user_id;
                if (role === 3) {
                    connection.query("SELECT student_name,student_id FROM STUDENT WHERE STUDENT_ID= ?", [id], (err1, res1) => {
                        if (err1) {
                            this.errorObj.setInfoID = infoId.FAILED;
                            this.errorObj.setInfoMsg = "An error occured";
                            this.errorObj.send(this.httpResponse);
                        }

                        if (res1.length > 0) {
                            let result = res1[0];
                            data.id = result.student_id;
                            data.name = result.student_name;
                            data.role = role;
                            this.createSession(data);
                        }
                    });
                } else if (role === 2) {
                    connection.query("SELECT teacher_id,teacher_name FROM TEACHER WHERE teacher_id= ?", [id], (err1, res1) => {
                        if (err1) {
                            this.errorObj.setInfoID = infoId.FAILED;
                            this.errorObj.setInfoMsg = "An error occured";
                            this.errorObj.send(this.httpResponse);
                        }

                        if (res1.length > 0) {
                            let result = res1[0];
                            data.id = result.teacher_id;
                            data.name = result.teacher_name;
                            data.role = role;
                            this.createSession(data);
                        }
                    });
                } else {
                    data.id = id;
                    data.name = user_id;
                    data.role = 1;
                    this.createSession(data);
                }
            } else {
                this.errorObj.setStatus = 401;
                this.errorObj.setInfoID = infoId.UNAUTHORIZED;
                this.errorObj.setInfoMsg = "Invalid user details";
                this.errorObj.send(this.httpResponse);
            }

        });

    }


    createSession(user) {
        let sessionId = getUUID();
        connection.query('INSERT INTO SESSION VALUES(?,?,CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE SESSION_ID = ?,CREATED_AT=CURRENT_TIMESTAMP', [sessionId, user.id,sessionId], (err, res) => {
            if (err) {
                this.errorObj.setInfoID = infoId.FAILED;
                this.errorObj.setInfoMsg = "An error occured";
                this.errorObj.send(this.httpResponse);
            }
            
            if (res.affectedRows > 0) {
                user.sessionId = sessionId;
                this.responseObj.setInfoID = infoId.SUCCESS;
                this.responseObj.setData = user;
                this.responseObj.infoMsg = "Account Details";
                this.responseObj.send(this.httpResponse);
            } else {
                this.errorObj.setStatus = 401;
                this.errorObj.setInfoID = infoId.UNAUTHORIZED;
                this.errorObj.setInfoMsg = "Invalid user details";
                this.errorObj.send(this.httpResponse);
            }
        });
    }

};