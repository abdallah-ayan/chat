import { create } from "zustand"
import { getChatLogic, getContactsLogic, deleteGroupLogic , getGroupsLogic, getSearchLogic, getMessageByIdLogic, sendMessageLogic, createGroupLogic, getGroupDataLogic, removeUserLogic, leaveFromGroupLogic, editFromGroupLogic, editGroupImageLogic, deleteGroupImageLogic, addUsersToGroupLogic } from "../../logic/home/homeLogic";
import toast from "react-hot-toast";
import useAuthSore from "../auth/useAuthSore";

export default create((set, get) => ({
    activeTab: localStorage.getItem("activeTab") ?? "chats",
    isUsersLoading: true,
    isContactsLoading: true,
    isGroupLoading: true,
    isMessagesLoading: false,
    createGroupLoading: false,
    editGroupLoading: false,
    editGroupImageLoading: false,
    addMembersLoading:false,
    groupDeleteLoading:false,
    contacts: [],
    roles: [],
    chats: [],
    groups: [],
    messages: [],
    members: [],
    addMembersOpen :  JSON.parse(localStorage.getItem("addMembersOpen")) ?? false, 
    isSelectedGroup: JSON.parse(localStorage.getItem("isSelectedGroup")) ?? false,
    isOpenAddGroup: JSON.parse(localStorage.getItem("isOpenAddGroup")) ?? false,
    isEnableSound: JSON.parse(localStorage.getItem("isEnableSound")) ?? false,
    selectedUser: JSON.parse(localStorage.getItem("selectedUser")) ?? null,
    selecterUserProfile: (localStorage.getItem("selecterUserProfile") == "null" ? null : localStorage.getItem("selecterUserProfile")) ?? null,
    leaveGroupLoading: false,

    setAddMembersOpen : (val) => {
        localStorage.setItem("addMembersOpen", val);
        set({ addMembersOpen: val });
    },
    setAddMembersLoading : (val) => {
        localStorage.setItem("addMembersLoading", val);
        set({ addMembersLoading: val });
    },
    setIsSelectedGroup: (val) => {
        localStorage.setItem("isSelectedGroup", val);
        set({ isSelectedGroup: val });
    },

    setSelectedUserProfile: (val) => {
        localStorage.setItem("selecterUserProfile", val);
        set({ selecterUserProfile: val });
    },


    setOpenAddGroup: (val) => {
        localStorage.setItem("isOpenAddGroup", val);
        set({ isOpenAddGroup: val });
    },


    switchEnableSound: () => {
        const val = get().isEnableSound;
        localStorage.setItem("isEnableSound", !val)
        set({ isEnableSound: !val })
    },

    setContactsLoading: (value) => {
        set({ isContactsLoading: value })
    },

    setActiveTap: (tap) => {
        set({ activeTab: tap });
        localStorage.setItem("activeTab", tap);
    },
    getChats: async () => {
        set({ isUsersLoading: true });
        const users = await getChatLogic();
        if (users) {
            set({ chats: users });
        }
        set({ isUsersLoading: false });
    },
    getContacts: async () => {
        set({ isContactsLoading: true });
        const users = await getContactsLogic();
        if (users) {
            set({ contacts: users });
        }
        set({ isContactsLoading: false });
    },
    getGroups: async () => {
        set({ isGroupLoading: true });
        const groups = await getGroupsLogic();
        if (groups) {
            set({ groups: groups });
        }
        set({ isGroupLoading: false });
    },
    searchChats: async (name) => {
        set({ isContactsLoading: true });
        const users = await getSearchLogic(name);
        if (users) {
            set({ contacts: users });
        }
        set({ isContactsLoading: false });
    },

    setSelectedUser: (user) => {
        if (!user) {
            localStorage.setItem("selecterUserProfile", null);
            set({ selecterUserProfile: null });
        }
        set({ selectedUser: user });
        localStorage.setItem("selectedUser", JSON.stringify(user))
    },

    getMessagesWithChat: async (id) => {
        set({ isMessagesLoading: true });
        const messages = await getMessageByIdLogic(id);
        if (messages) {
            set({ messages })
        }
        set({ isMessagesLoading: false });
    },

    sendMessage: async (form) => {
        const { userAuth } = useAuthSore.getState();
        const currentMessage = {
            _id : new Date().getTime() / 10,
            senderId: userAuth._id,
            receiverId: get().selectedUser._id,
            text: form.text,
            image: form.image,
            createdAt: new Date().toISOString()
        };
        set({ messages: [...get().messages, currentMessage] })
        const message = await sendMessageLogic({ form, id: get().selectedUser._id });
        if (message) {
            const currentMessages = [...get().messages];
            currentMessages.pop();
            set({ messages: [...currentMessages, message] })
        }
    },

    handleCreateGroup: async (form) => {
        set({ createGroupLoading: true });
        const group = await createGroupLogic(form);
        if (group) {
            get().setActiveTap("groups");
            get().setOpenAddGroup(false);
            toast.success("Your group has been created");
        };
        set({ createGroupLoading: false });
    },

    handleGroupData: async (id) => {
        set({ isMessagesLoading: true });
        const data = await getGroupDataLogic(id);
        if (data) {
            set({ messages: data.messages });
            set({ members: data.users });
            set({ roles: data.role });
        }
        set({ isMessagesLoading: false });
    },

    removeUser: async (id) => {
        if (!get().isSelectedGroup) return
        set({
            members: get().members.filter(user => user._id != id)
        });
        const group = await removeUserLogic({
            userId: id,
            groupId: get().selectedUser._id
        })
        if (group) {
            toast.success("User removed successfully");
        }
    },

    leaveFromGroup: async () => {
        set({ leaveGroupLoading: true });
        if (!get().isSelectedGroup) return
        const res = await leaveFromGroupLogic(get().selectedUser._id)
        if (res) {
            set({ selectedUser: null });
            get().setActiveTap("groups");
            get().setIsSelectedGroup(false);
            get().setSelectedUser(null);
            get().setSelectedUserProfile(null);
            toast.success("User removed successfully");
        }
        set({ leaveGroupLoading: false });
    },

    handleEditGroup: async (form) => {
        set({ editGroupLoading: true });
        const res = await editFromGroupLogic(form, get().selectedUser._id);
        if (res) {
            toast.success("Group updated successfully");
            get().setSelectedUser(res.group);
        }
        set({ editGroupLoading: false });
    },

    editGroupImage: async (image) => {
        set({ editGroupImageLoading: true });
        const res = await editGroupImageLogic(image, get().selectedUser._id);
        if (res) {
            toast.success("Group image has updated successfully");
            get().setSelectedUser(res.group);
            set({ editGroupImageLoading: false });
            return true
        }
        set({ editGroupImageLoading: false });
    },

    deleteGroupImage: async () => {
        set({ editGroupImageLoading: true });
        const res = await deleteGroupImageLogic(get().selectedUser._id);
        if (res) {
            toast.success("Group image has deleted successfully");
            get().setSelectedUser(res.group);
        }
        set({ editGroupImageLoading: false });
        if(res) return true
    },

    addUsersToGroup : async (form) => {
        set({addMembersLoading : true});
        const res = await addUsersToGroupLogic(form , get().selectedUser._id);
        if(res) {
            await get().handleGroupData(get().selectedUser._id);
            get().setAddMembersOpen(false);
            toast.success("Users added to the group successfully");
        }
        set({addMembersLoading : false});
    },

    deleteGroup : async () => {
        set({groupDeleteLoading : true});
        const state = await deleteGroupLogic( get().selectedUser._id);
        if(state) {
            set({ selectedUser: null });
            get().setActiveTap("groups");
            get().setIsSelectedGroup(false);
            get().setSelectedUser(null);
            get().setSelectedUserProfile(null);
            toast.success("group deleted successfully")
        }
        set({groupDeleteLoading : false});
    },

    listenToMessage : () => {
        const {socket} = useAuthSore.getState();
        if(!socket) return 
        if(!socket.connected) return

        socket.on("newMessage" , (message)=> {
            set({messages : [...get().messages , message] })
        })
    },

    unListenToMessage : () => {
        const {socket} = useAuthSore.getState();
        if(!socket) return 
        if(!socket.connected) return
        socket.off("newMessage")
    }
    
}));
