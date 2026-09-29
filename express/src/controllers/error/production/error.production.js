import Res from "./../../../utils/Json.js"


function ValidatorErrorHanlder(err) {
    err.status = 400
    err.message = err.message
}

function systemErrorHandler(err) {
    err.status = 500
    err.message = "Intervel Server Error"
}

function JsonWebTokenErrorHandler(err) {
    err.status = 401;
    err.message = "The token you provided is invalid.";
}

function TokenExpiredErrorHandler(err) {
    err.status = 401;
    err.message = "The token you provided has expired.";
}

function CastErrorHandler(err) {
    err.message = "The ID you entered is invalid"
    err.status = 400
}

function duplicateErrorHandler (err) { // test
    const ob = err.keyValue
    const key = Object.keys(ob)[0];
    const value = ob[key];
    err.message = `The value "${value}" for "${key}" already exists. Please use a different value.`;
    err.status = 400;
}


export default function (error , res){
    if(error.isOpertional) {
        return Res.getObject(res).status(error.status).state("error").message(error.message).end();
    }

    const err = Object.create(Object.getPrototypeOf(error),Object.getOwnPropertyDescriptors(error));
    if(error.code == "11000") duplicateErrorHandler(err)
    else if (error.name === "ValidationError" &&Object.values(error.errors).some(err => err.name === "CastError")) CastErrorHandler(err);
    else if (Object.values(error.errors ?? {}).some(err => err.name === "ValidatorError")) ValidatorErrorHanlder(err);
    else if(error.name == "JsonWebTokenError") JsonWebTokenErrorHandler(err)
    else if(error.name == "TokenExpiredError") TokenExpiredErrorHandler(err)
    else systemErrorHandler(err)
    Res.getObject(res).status(err.status).state("error").message(err.message).end();

}