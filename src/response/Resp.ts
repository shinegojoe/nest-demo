

class LogicErrorResponse {
    error: number
    message: string
    constructor(error: number, message: string) {
        this.error = error;
        this.message = message;
    }
}

class CreateResponse {
    status: string
    constructor() {
        this.status = "success";
    }
}


class UpdateResponse extends CreateResponse {
    constructor() {
        super();
    }
}


class DeleteResponse extends CreateResponse {
    constructor() {
        super();
    }
}




export { LogicErrorResponse, CreateResponse, UpdateResponse, DeleteResponse }

