import toast from "react-hot-toast";

export default function asyncErrorHandler(func) {
    return async (...args)=> {
        try{
            return await func(...args);
        }catch(err) {
            if (err.response?.data?.message) {
                toast.error(err.response?.data?.message)
            } else if(err.message) {
                toast.error(err.message)
            }
            return false
        }
    }
}