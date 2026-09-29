import validator from "validator";
import asyncErrorHandler from "../../error/asyncErrorHandler";
import useAuthSore from "../../store/auth/useAuthSore";
const handleLoginValidation = asyncErrorHandler(
    (form) => {
        const {handleLogin} = useAuthSore.getState();
        const email = form?.email?.trim();
        const password = form?.password;

        if (!email) {
            throw new Error("Email is required");
        } else if (!validator.isEmail(email)) {
            throw new Error("Please enter a valid email");
        }

        if (!password) {
            throw new Error("Password is required")
        } else if (password.length < 6) {
            throw new Error("Password must be at least 6 characters")
        }

        handleLogin(form);
    }

)

export default handleLoginValidation

