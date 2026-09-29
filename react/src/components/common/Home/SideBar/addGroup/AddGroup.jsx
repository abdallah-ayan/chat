
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Users } from "lucide-react";
import useChatStore from "../../../../../features/store/Home/useChatStore";
import GroupValidation from "../../../../../features/validation/home/GroupValidation";
import { Commet, OrbitProgress } from "react-loading-indicators";

export default function AddGroup() {
    const { getContacts, isContactsLoading, contacts , setOpenAddGroup , createGroupLoading } = useChatStore();

    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        getContacts();
    }, []);

    const toggleUser = (id) => {
        setSelectedUsers((prev) =>
            prev.includes(id)
                ? prev.filter((userId) => userId !== id)
                : [...prev, id]
        );
    };

    const handleCreateGroup = () => {
        const form = {
            name: groupName.trim(),
            users: selectedUsers,
        };

        GroupValidation(form);
    };

    const canCreate = selectedUsers.length >= 2;

    return (
        <div className="flex h-full min-h-0 flex-col">

            {/* Header */}
            <div className="px-5 pb-5 pt-6">
                <div className="flex items-center gap-4">
                    <button onClick={()=>setOpenAddGroup(false)} type="button" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-700/30 text-slate-400 transition hover:bg-slate-700/50 hover:text-slate-200">
                        <ArrowLeft size={20} strokeWidth={1.8} />
                    </button>

                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-100">
                            Create Group
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Create a space for your conversations
                        </p>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2 px-5">
                <div className="h-px flex-1 bg-slate-600/25" />

                <div className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-slate-600/50" />
                    <span className="h-1 w-1 rounded-full bg-slate-500/60" />
                    <span className="h-1 w-1 rounded-full bg-slate-600/50" />
                </div>

                <div className="h-px flex-1 bg-slate-600/25" />
            </div>

            {/* Group Name */}
            <div className="px-5 pb-5 pt-5">
                <div className="flex items-center gap-3 rounded-xl bg-slate-700/45 px-4 transition-colors focus-within:bg-slate-700/55">
                    <Users size={19} strokeWidth={1.8} className="shrink-0 text-slate-400" />

                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Group name"
                        maxLength={50}
                        className="h-12 w-full bg-transparent text-[15px] font-medium text-slate-100 outline-none placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Members Header */}
            <div className="flex items-center justify-between px-5 pb-3">
                <div>
                    <h3 className="text-sm font-medium text-slate-200">
                        Members
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-600">
                        Select people you want to add
                    </p>
                </div>

                <div className={`flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-semibold ${selectedUsers.length >= 3 ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-700/40 text-slate-500"}`}>
                    {selectedUsers.length}
                </div>
            </div>


            {/* Members */}
            <div className="group min-h-0 flex-1 overflow-y-auto px-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-600/30 hover:[&::-webkit-scrollbar-thumb]:bg-slate-500/40">
                {createGroupLoading ? 
                (
                     <div className="w-full flex justify-center h-full pb-32" style={{alignItems : "center"}}>
                        <Commet color="#97A3B3" size="medium" text="" textColor="" />
                    </div>
                )
                :isContactsLoading ? (
                     <div className="w-full flex justify-center h-full pb-32" style={{alignItems : "center"}}>
                        <OrbitProgress variant="spokes" color="#97A3B3" size="medium" text="" textColor="" />
                    </div>
                ) : contacts.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                        <Users size={28} className="mb-3 text-slate-600" strokeWidth={1.5} />

                        <p className="text-sm text-slate-400">
                            No contacts found
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                            Add contacts before creating a group.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {contacts.map((user) => {
                            const selected = selectedUsers.includes(user._id);

                            return (
                                <button
                                    key={user._id}
                                    type="button"
                                    onClick={() => toggleUser(user._id)}
                                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${selected ? "bg-emerald-500/10" : "hover:bg-slate-700/30"}`}
                                >
                                    <div className={`h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 transition ${selected ? "ring-emerald-400/40" : "ring-slate-700/50"}`}>
                                        <img
                                            src={user.profilePic || "/avatar.png"}
                                            alt={user.fullName}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-200">
                                        {user.fullName}
                                    </span>

                                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${selected ? "border-emerald-400 bg-emerald-500 text-slate-950" : "border-slate-700 bg-transparent"}`}>
                                        {selected && <Check size={12} strokeWidth={3} />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>



            {/* Footer */}
            <div className="px-5 py-4">
                <button
                    type="button"
                    onClick={handleCreateGroup}
                    disabled={!canCreate}
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-700/50 disabled:text-slate-500 enabled:bg-emerald-600 enabled:text-white enabled:hover:bg-emerald-500"
                >
                    Create Group
                </button>
            </div>

        </div>
    );
}