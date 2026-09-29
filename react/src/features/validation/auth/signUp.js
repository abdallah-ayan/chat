import validator from "validator";
import asyncErrorHandler from "../../error/asyncErrorHandler";
import useAuthSore from "../../store/auth/useAuthSore";
const handleSignUpValidation = asyncErrorHandler(
    (form) => {

        const { handleSignUp } = useAuthSore.getState();

        const fullName = form?.fullName?.trim();
        const email = form?.email?.trim();
        const password = form?.password;

        // Full Name
        if (!fullName) {
            throw new Error("Full name is required");
        } else if (fullName.length > 20) {
            throw new Error("Full name cannot exceed 20 characters");
        }

        // Email
        if (!email) {
            throw new Error("Email is required");
        } else if (!validator.isEmail(email)) {
            throw new Error("Please enter a valid email");
        }

        // Password
        if (!password) {
            throw new Error("Password is required");
        } else if (password.length < 6) {
            throw new Error("Password must be at least 6 characters");
        }

        handleSignUp(form);
    }
);

export default handleSignUpValidation;