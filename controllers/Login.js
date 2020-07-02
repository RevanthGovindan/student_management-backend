import Response from '../helpers/Response';
import ErrorHandler from '../helpers/Errorhandler';
import connection from '../db';

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
        console.log(userName)
        console.log(password)

        connection.query("SELECT * FROM CREDENTIALS WHERE USER_ID = ? AND PASSWORD = md5(?)", [userName, password], (err, res) => {

            if (err)
                console.log("Error Selecting : %s ", err);

            console.log("res ", res);

        });

    }

};