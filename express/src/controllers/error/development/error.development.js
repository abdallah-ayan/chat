import Res from "./../../../utils/Json.js"
export default function (error , res){
    const status = error.status ?? 500;
    const message = error.message ?? "Interval Server Error";
    Res.getObject(res).status(status).state(status).message(message).error(error).end();
}