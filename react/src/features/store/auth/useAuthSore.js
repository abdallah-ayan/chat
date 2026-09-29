import { create } from "zustand";
import { handeGoogleLoginLogic, handleLogoutLogic, handeGoogleSignUpLogic, handleCheck, handleLoginLogic, handleSignUpLogic } from "../../logic/auth/auth";
import toast from "react-hot-toast";
import { deleteUserImageLogic, editUserImageLogic, editUserInfoLogic } from "../../logic/home/homeLogic";
import io from "socket.io-client"
export default create((set, get) => ({
    userAuth: null,
    userInfoLoading: false,
    userImageLoading: false,
    socket: null,
    checkLoading: true,
    onlineUsers: [],
    LoginState: {
        isLoginLoading: false,
        LoginSuccess: false
    },
    SignUpState: {
        isSignUpLoading: false,
        SignUpSuccess: false
    },
    LogoutState: {
        isLogoutLoading: false,
        LogoutSuccess: false
    },


    handleLogin: async (form) => {
        set({ LoginState: { ...get().LoginState, isLoginLoading: true } });
        set({ LoginState: { ...get().LoginState, LoginSuccess: false } });
        const user = await handleLoginLogic(form)
        if (user) {
            set({ userAuth: user });
            set({ LoginState: { ...get().LoginState, LoginSuccess: true } });
            get().connectSocket();
        }
        set({ LoginState: { ...get().LoginState, isLoginLoading: false } });
    },

    stopSuccess: () => {
        set({ LoginState: { ...get().LoginState, LoginSuccess: false } });
        set({ SignUpState: { ...get().SignUpState, SignUpSuccess: false } });
        set({ LogoutState: { ...get().LogoutState, LogoutSuccess: false } });
    },

    handleSignUp: async (form) => {
        set({ SignUpState: { ...get().SignUpState, isSignUpLoading: true } });
        set({ SignUpState: { ...get().SignUpState, SignUpSuccess: false } });
        const user = await handleSignUpLogic(form)
        if (user) {
            set({ userAuth: user });
            set({ SignUpState: { ...get().SignUpState, SignUpSuccess: true } });
            get().connectSocket();
        }
        set({ SignUpState: { ...get().SignUpState, isSignUpLoading: false } });
        // console.log(get().userAuth)
    },

    handleGoogleLogin: async (body) => {
        set({ LoginState: { ...get().LoginState, LoginSuccess: false } });
        const user = await handeGoogleLoginLogic(body);
        if (user) {
            set({ userAuth: user });
            set({ LoginState: { ...get().LoginState, LoginSuccess: true } });
            get().connectSocket();
        }
    },

    handleGoogleSignUp: async (body) => {
        set({ SignUpState: { ...get().SignUpState, isSignUpLoading: true } });
        set({ SignUpState: { ...get().SignUpState, SignUpSuccess: false } });
        const user = await handeGoogleSignUpLogic(body);
        if (user) {
            set({ userAuth: user });
            set({ SignUpState: { ...get().SignUpState, SignUpSuccess: true } });
            get().connectSocket();
        }
        set({ SignUpState: { ...get().SignUpState, isSignUpLoading: false } });
    },

    handleLogout: async () => {
        set({ LogoutState: { ...get().LogoutState, isLogoutLoading: true } });
        set({ LogoutState: { ...get().LogoutState, LogoutSuccess: false } });
        const state = await handleLogoutLogic();
        if (state) {
            set({ LogoutState: { ...get().LogoutState, LogoutSuccess: true } });
            localStorage.setItem("selectedUser", null);
            get().disconnectSocket();
        }
        set({ LogoutState: { ...get().LogoutState, isLogoutLoading: false } });
    },


    check: async () => {
        set({ checkLoading: true });
        const user = await handleCheck();
        if (user){
            set({ userAuth: user });
            get().connectSocket();
        } 
        else {
            set({ userAuth: null })
            localStorage.setItem("selectedUser", null);
        }
        set({ checkLoading: false });
    },

    handleEditInfo: async (form) => {
        set({ userInfoLoading: true });
        const user = await editUserInfoLogic(form);
        if (user) {
            set({ userAuth: user })
            toast.success("Your information has been updated successfully!");
        };
        set({ userInfoLoading: false });
    },

    handleEditImage: async (base32) => {
        set({ userImageLoading: true });
        const user = await editUserImageLogic(base32);
        if (user) {
            set({ userAuth: user })
            toast.success("Your image has been updated successfully!");
        };
        set({ userImageLoading: false });
    },
    handleDeleteImage: async (base32) => {
        set({ userImageLoading: true });
        const user = await deleteUserImageLogic(base32);
        if (user) {
            set({ userAuth: user })
            toast.success("Your image has been deleted successfully!");
        };
        set({ userImageLoading: false });
    },

    connectSocket: () => {
        if (!get().userAuth) return;
        if(get().socket?.connected) return;
        const socket = io(import.meta.env.VITE_SERVER_URL, {
            withCredentials: true
        });

        socket.on("getOnline", (usersId) => {
            set({ onlineUsers: usersId });
        });

        set({ socket });
    },

    disconnectSocket: () => {
        const socket = get().socket;
        if(!get().socket?.connected) return;

        if (!socket) return;

        socket.disconnect();

        set({ socket: null });
    }

}));



