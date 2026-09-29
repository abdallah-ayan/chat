export default class CustomError extends Error {
    constructor(message , status , error = {}) {
        super(message);
        this.status = status;
        this.err = error ;
        this.isOpertional = true;
    }

    static getObject(message , status , error = {}) {
        return new CustomError(message , status , error )
    }
}