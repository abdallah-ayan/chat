import { useEffect, useState } from "react";
import { ArrowLeft, Check, Users } from "lucide-react";
import useChatStore from "../../../../../features/store/Home/useChatStore";
import { Commet, OrbitProgress } from "react-loading-indicators";

export default function AddMembersToGroup() {
    const {
        getContacts,
        isContactsLoading,
        contacts,
        setAddMembersOpen,
        addUsersToGroup,
        members,
        addMembersLoading,
    } = useChatStore();

    const users = contacts.filter(
        (contact) =>
            !members.some(
                (member) =>
                    member._id.toString() === contact._id.toString()
            )
    );

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

    const handleAddMembers = () => {
        const form = {
            users: selectedUsers,
        };

        addUsersToGroup(form);
    };

    const canAddMembers = selectedUsers.length >= 1;

    return (
        <div className="flex h-full min-h-0 flex-col">

            {/* Header */}
            <div className="px-5 pb-5 pt-6">
                <div className="flex items-center gap-4">

                    <button onClick={() => setAddMembersOpen(false)} type="button" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-700/30 text-slate-400 transition hover:bg-slate-700/50 hover:text-slate-200">
                        <ArrowLeft size={20} strokeWidth={1.8} />
                    </button>

                    <div>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-100">
                            Add To Group
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Add people to this group
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

            {/* Members Header */}
            <div className="flex items-center justify-between px-5 pb-5 pt-5">

                <div>
                    <h3 className="text-sm font-medium text-slate-200">
                        Users
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

                {addMembersLoading ? (

                    <div className="flex h-full w-full items-center justify-center pb-32">
                        <Commet color="#97A3B3" size="medium" text="" textColor="" />
                    </div>

                ) : isContactsLoading ? (

                    <div className="flex h-full w-full items-center justify-center pb-32">
                        <OrbitProgress variant="spokes" color="#97A3B3" size="medium" text="" textColor="" />
                    </div>

                ) : contacts.length === 0 ? (

                    <div className="flex h-full flex-col items-center justify-center px-6 pb-16 text-center">

                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-slate-500">
                            <Users size={24} strokeWidth={1.6} />
                        </div>

                        <h3 className="text-sm font-semibold text-slate-300">
                            No contacts found
                        </h3>

                        <p className="mt-1.5 max-w-[250px] text-xs leading-5 text-slate-500">
                            Add contacts before adding people to this group.
                        </p>

                    </div>

                ) : users.length === 0 ? (

                    <div className="flex h-full flex-col items-center justify-center px-6 pb-16 text-center">

                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-slate-500">
                            <Users size={24} strokeWidth={1.6} />
                        </div>

                        <h3 className="text-sm font-semibold text-slate-300">
                            No users available
                        </h3>

                        <p className="mt-1.5 max-w-[250px] text-xs leading-5 text-slate-500">
                            All your contacts are already members of this group.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-1">

                        {users.map((user) => {

                            const selected = selectedUsers.includes(user._id);

                            return (
                                <button key={user._id} type="button" onClick={() => toggleUser(user._id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${selected ? "bg-emerald-500/10" : "hover:bg-slate-700/30"}`}>

                                    <div className={`h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 transition ${selected ? "ring-emerald-400/40" : "ring-slate-700/50"}`}>
                                        <img src={user.profilePic || "/avatar.png"} alt={user.fullName} className="h-full w-full object-cover" />
                                    </div>

                                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-200">
                                        {user.fullName}
                                    </span>

                                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${selected ? "border-emerald-400 bg-emerald-500 text-slate-950" : "border-slate-700 bg-transparent"}`}>
                                        {selected && (
                                            <Check size={12} strokeWidth={3} />
                                        )}
                                    </div>

                                </button>
                            );
                        })}

                    </div>
                )}

            </div>

            {/* Footer */}
            <div className="px-5 py-4">

                <button type="button" onClick={handleAddMembers} disabled={!canAddMembers} className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-slate-700/50 disabled:text-slate-500 enabled:bg-emerald-600 enabled:text-white enabled:hover:bg-emerald-500">
                    Add Members
                </button>

            </div>

        </div>
    );
}