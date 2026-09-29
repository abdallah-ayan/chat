import { useEffect, useState } from "react";
import {
  AtSign,
  LogOut,
  Pencil,
  XIcon,
} from "lucide-react";
import { OrbitProgress } from "react-loading-indicators";

import useChatStore from "../../../../../features/store/Home/useChatStore";
import useAuthSore from "../../../../../features/store/auth/useAuthSore";

import EditGroup from "./EditGroup";
import GroupImage from "./GroupImage";

export default function Profile() {
  const {
    setSelectedUserProfile,
    selectedUser,
    members,
    isSelectedGroup,
    setSelectedUser,
    setIsSelectedGroup,
    setActiveTap,
    roles,
    removeUser,
    leaveFromGroup,
    leaveGroupLoading,
  } = useChatStore();

  const { userAuth } = useAuthSore();

  /* ================= PAGE ================= */

  const [page, setPage] = useState("profile");

  /* ================= EDIT DATA ================= */

  const [fullName, setFullName] = useState(
    selectedUser?.fullName || ""
  );

  const [description, setDescription] = useState(
    selectedUser?.description || ""
  );

  const [imagePreview, setImagePreview] = useState(
    selectedUser?.profilePic || "/avatar.png"
  );

  /* ================= ROLE ================= */

  const role = roles.find(
    (ele) => ele.id == userAuth._id
  )?.role;

  /* ================= FUNCTIONS ================= */

  const leaveGroup = () => {
    leaveFromGroup();
  };

  const removeUserFromGroup = (id) => {
    removeUser(id);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="relative h-full w-full overflow-hidden px-1 py-6">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-1/2 top-8 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-[100px]" />

        <div className="absolute inset-x-0 bottom-0 h-[50%] opacity-[0.08] [background-image:linear-gradient(to_right,#94a3b8_1px,transparent_1px),linear-gradient(to_bottom,#94a3b8_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_90%,transparent)]" />

      </div>

      {/* ================= PAGES ================= */}

      <div className="absolute inset-0 overflow-hidden">

        {/* ====================================================== */}
        {/* ===================== PROFILE ======================== */}
        {/* ====================================================== */}

        <div className={`absolute inset-y-0 w-full overflow-hidden transition-[left] duration-300 ease-in-out ${page === "profile" ? "left-0" : "-left-full"}`}>

          {/* Close */}

          <button onClick={() => setSelectedUserProfile(null)} type="button" className="absolute left-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition duration-200 hover:bg-white/5 hover:text-white">
            <XIcon size={20} strokeWidth={1.8} />
          </button>

          {/* Edit Group */}

          {isSelectedGroup && role == "admin" && (
            <button type="button" onClick={() => setPage("edit")} aria-label="Edit group" className="group absolute right-5 top-5 z-20 flex size-9 shrink-0 items-center justify-center rounded-xl border border-slate-700/60 bg-slate-800/60 text-slate-400 shadow-sm transition-all duration-200 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 active:scale-95">
              <Pencil size={16} strokeWidth={1.8} className="transition-transform duration-200 group-hover:scale-105" />
            </button>
          )}

          {/* Profile Content */}

          <div className="relative z-10 flex h-full flex-col items-center pt-12">

            {/* Avatar */}

            <div className="relative">

              <div className="absolute -inset-6 rounded-full bg-blue-500/[0.055] blur-2xl" />

              <div className="absolute -inset-2 rounded-full border border-slate-600/60" />

              <img src={selectedUser?.profilePic || "/avatar.png"} alt="Profile" className="relative h-40 w-40 rounded-full border-2 border-slate-600/80 object-cover shadow-2xl shadow-black/50" />

            </div>

            {/* Name */}

            <h2 className="mt-6 text-center text-2xl font-semibold tracking-wide text-slate-100">
              {isSelectedGroup ? selectedUser?.name :selectedUser.fullName }
            </h2>

            {/* Username */}

            {!isSelectedGroup && (
              <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-400">

                <AtSign size={14} strokeWidth={1.8} className="text-slate-500" />

                <span>
                  {selectedUser?.searchName}
                </span>

              </div>
            )}

            {/* Description */}

            <p className="mt-5 max-w-[315px] text-center text-sm leading-6 text-slate-400">
              {selectedUser?.description || "This user hasn't added a description yet."}
            </p>

            {/* Members */}

            {isSelectedGroup && (
              <div className="mt-5 flex w-full flex-1 flex-col space-y-2 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700/50 hover:[&::-webkit-scrollbar-thumb]:bg-slate-600/60">

                {[...members]
                  .sort((a, b) =>
                    a._id == userAuth._id
                      ? -1
                      : b._id == userAuth._id
                        ? 1
                        : 0
                  )
                  .map((user) => (

                    <div key={user._id} onClick={() => { setActiveTap("contacts"); setIsSelectedGroup(false); setSelectedUserProfile(null); setSelectedUser(user); }} className="cursor-pointer rounded-lg bg-cyan-500/10 p-4 transition-colors hover:bg-cyan-500/20">

                      <div className="flex items-center gap-3">

                        <div className="avatar online">

                          <div className="size-12 rounded-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${user.profilePic || "/avatar.png"})` }} />

                        </div>

                        <h4 className="truncate font-medium text-slate-200">
                          {user.fullName}
                        </h4>

                        {role == "admin" && userAuth._id != user._id && (
                          <button onClick={(e) => { e.stopPropagation(); removeUserFromGroup(user._id); }} type="button" className="ml-auto shrink-0 text-slate-500 transition-colors hover:text-red-400" title="Remove from group">
                            <LogOut size={18} strokeWidth={2} />
                          </button>
                        )}

                      </div>

                    </div>

                  ))}

              </div>
            )}

            {/* Leave Group */}

            {isSelectedGroup && (
              <button onClick={leaveGroup} type="button" disabled={leaveGroupLoading} className="relative mb-5 mt-2 h-12 w-[90%] shrink-0 rounded-xl bg-red-900 py-3 text-sm font-medium text-slate-100 transition-colors hover:bg-red-800 disabled:cursor-not-allowed">

                {leaveGroupLoading ? (

                  <OrbitProgress variant="spokes" color="#c5c5c5" style={{ fontSize: "6px", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} text="" textColor="" />

                ) : (

                  <div className="flex items-center justify-center gap-2">

                    <LogOut size={17} strokeWidth={1.8} />

                    <span>
                      Leave group
                    </span>

                  </div>

                )}

              </button>
            )}

          </div>

        </div>

        {/* ====================================================== */}
        {/* ======================= EDIT ========================== */}
        {/* ====================================================== */}

        <div className={`absolute inset-y-0 w-full overflow-hidden transition-[left] duration-300 ease-in-out ${page === "edit" ? "left-0" : page === "image" ? "-left-full" : "left-full"}`}>

          <EditGroup imagePreview={imagePreview} fullName={fullName} setFullName={setFullName} description={description} setDescription={setDescription} setPage={setPage} />

        </div>

        {/* ====================================================== */}
        {/* ======================= IMAGE ========================= */}
        {/* ====================================================== */}

        <div className={`absolute inset-y-0 w-full overflow-hidden transition-[left] duration-300 ease-in-out ${page === "image" ? "left-0" : "left-full"}`}>

          <GroupImage setImagePreview={setImagePreview} imagePreview={imagePreview} setPage={setPage} handleImageChange={handleImageChange} />

        </div>

      </div>

    </div>
  );
}