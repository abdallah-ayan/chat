import instanceAxios from "../../../lib/instanceAxios";
import asyncErrorHandler from "../../error/asyncErrorHandler";

export const handleLoginLogic = asyncErrorHandler(async (form) => {
    const res = await instanceAxios.post("/auth/login" , form)
    return res.data.data;
});

export const handleCheck = asyncErrorHandler(async (form) => {
    const res = await instanceAxios.post("/auth/check" )
    return res?.data?.data?.user;
});

export const handleSignUpLogic = asyncErrorHandler(async (form) => {
    const res = await instanceAxios.post("/auth/signup" , form)
    return res.data.data;
});


export const handeGoogleLoginLogic = asyncErrorHandler(async (body) => {
    const res = await instanceAxios.post("/auth/google/login" , body)
    return res.data.data.user
})

export const handeGoogleSignUpLogic = asyncErrorHandler(async (body) => {
    const res = await instanceAxios.post("/auth/google/signup" , body)
    return res.data.data.user
})

export const handleLogoutLogic = asyncErrorHandler(async () => {
    await instanceAxios.post("/auth/logout" )
    return true;
});