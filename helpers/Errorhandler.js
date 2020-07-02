export default class ErrorHandler {
    constructor() {
        this.status = 500;
        this.success = false;
        this.infoID = "001";
        this.infoMsg = "An Error Occured";
    }

    set setStatus(code) {
        this.status = code;
    }

    set setInfoID(code) {
        this.infoID = code;
    }

    set setInfoMsg(msg) {
        this.infoMsg = msg;
    }

    send(response) {
        let responseData = {
            infoID: this.infoID,
            infoMsg: this.infoMsg
        }
        response.status(this.status);
        response.send(responseData);
    }
}