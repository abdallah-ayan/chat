import { useState } from "react";
import {
  Pencil,
  Mail,
  XIcon,
} from "lucide-react";

import "./profileInfo.css";
import ProfileEdit from "./profileEdit";
import useAuthSore from "../../../../../../features/store/auth/useAuthSore";

export default function ProfileInfo({ setOpenProfile }) {
  const [isEditing, setIsEditing] = useState(false);

  const { userAuth } = useAuthSore();

  return (
    <div className="profile-info">

      <div className="absolute inset-0 overflow-hidden rounded-[10px]">

        {/* ================= PROFILE PAGE ================= */}

        <div className={`absolute inset-0 flex flex-col items-center transition-all duration-300 ease-out ${isEditing ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"}`}>

          {/* Back */}
          <button onClick={() => setOpenProfile(false)} type="button" className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white">
            <XIcon size={20} strokeWidth={1.8} />
          </button>


          {/* Image */}

          <div
            className="mt-8 h-28 w-28 rounded-full border-2 border-slate-600/50 bg-cover bg-center bg-no-repeat shadow-xl shadow-black/30"
            style={{
              backgroundImage: `url(${userAuth.profilePic || "/avatar.png"})`,
              objectFit: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Name */}
          <h2 className="mt-5 text-xl font-semibold tracking-wide text-slate-100">
            {userAuth.fullName}
          </h2>


          {/* Username */}
          {
            userAuth.searchName &&
            <p className="mt-1 text-sm font-medium text-[#8B9BC4]">
              @{userAuth.searchName}
            </p>
          }


          {/* Email */}
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#30354E] bg-[#202338] px-4 py-2 shadow-sm">
            <Mail size={14} strokeWidth={1.8} className="text-[#8B9BC4]" />
            <span className="text-sm font-medium text-slate-200">
              {userAuth.email}
            </span>
          </div>


          {/* Description */}
          {
            userAuth.description &&
            <p className="mt-7 mb-5 max-w-[250px] text-center text-sm leading-6 text-slate-400">
              {userAuth.description}
            </p>
          }


          {/* Edit */}
          <button type="button" onClick={() => setIsEditing(true)} className={`${userAuth.description ? "mt-7" : "mt-24"} flex h-11 w-52 items-center justify-center gap-2 rounded-xl border border-[#39405E] bg-[#252A40] text-sm font-semibold text-slate-200 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4A5375] hover:bg-[#2B314A] hover:text-white active:translate-y-0`}>
            <Pencil size={17} strokeWidth={1.8} />
            Edit Profile
          </button>

        </div>


        {/* ================= EDIT PAGE ================= */}

        <ProfileEdit
          setOpenProfile={setOpenProfile}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />

      </div>
    </div>
  );
}
