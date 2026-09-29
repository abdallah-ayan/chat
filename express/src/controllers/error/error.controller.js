import "dotenv/config"
import devError from "./development/error.development.js"
import prodError from "./production/error.production.js"



export default function(error , req , res, next) {
    console.log(error)
    if(process.env.NODE_NV == "development") {
        devError(error , res);
    }else if(process.env.NODE_NV == "production")  {
        prodError(error , res);
    }
}