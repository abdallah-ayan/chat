import { useState } from "react";
import {
  ArrowLeft,
  UserRound,
  AtSign,
  FileText,
  Camera,
  XIcon,
} from "lucide-react";
import { OrbitProgress } from "react-loading-indicators"
import ProfileImageUpdate from "./profileImageUpdate";
import useAuthSore from "../../../../../../features/store/auth/useAuthSore";
import { editInfoValidation } from "../../../../../../features/validation/home/info";

export default function ProfileEdit({ isEditing, setIsEditing, setOpenProfile }) {
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const { userAuth, userInfoLoading } = useAuthSore();
  const [form, setForm] = useState({
    fullName: userAuth.fullName ?? "",
    searchName: userAuth.searchName ?? "",
    description: userAuth.description ?? ""
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    editInfoValidation(form)
  }

  return (
    <>
      {/* ================= EDIT PAGE ================= */}

      <form onSubmit={handleSubmit} className={`absolute inset-0 flex flex-col px-6 pt-5 transition-all duration-300 ease-out ${isEditing ? (isEditingPhoto ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100") : "translate-x-full opacity-0 pointer-events-none"}`}>

        {/* Header */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => {
              setIsEditingPhoto(false)
              setOpenProfile(false)
            }}
            className="absolute right-5 top-6 flex h-9 w-9  items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <XIcon size={20} strokeWidth={1.8} />
          </button>

          <button type="button" onClick={() => setIsEditing(false)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white">
            <ArrowLeft size={20} strokeWidth={1.8} />
          </button>

          <div className="ml-7">
            <h2 className="text-lg text-center font-semibold text-slate-100">
              Edit Profile
            </h2>

            <p className="mt-0.5 text-center text-xs text-slate-500">
              Update your information
            </p>
          </div>

        </div>


        {/* Profile Image */}

        <div className="mt-6 flex justify-center">
          <div className="relative">
            <div
              className="h-24 w-24 rounded-full border-2 border-[#353A54] shadow-xl shadow-black/30"
              style={{
                backgroundImage: `url(${userAuth.profilePic || "/avatar.png"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            <button
              type="button"
              onClick={() => setIsEditingPhoto(true)}
              className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-[#17192B] bg-[#303750] text-slate-200 shadow-md transition hover:bg-[#3A425E] hover:text-white"
            >
              <Camera size={14} strokeWidth={1.8} />
            </button>
          </div>
        </div>


        {/* Fields */}

        <div className="mt-6 space-y-3">

          {/* Name */}

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-slate-400">
              <UserRound size={13} />
              Name
            </label>

            <input onChange={handleChange} name="fullName" type="text" defaultValue={userAuth.fullName} className="h-10 w-full rounded-lg border border-[#30354E] bg-[#202338] px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-[#596581] focus:bg-[#23273D]" />
          </div>


          {/* Username */}

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-slate-400">
              <AtSign size={13} />
              Username
            </label>

            <input onChange={handleChange} name="searchName" type="text" defaultValue={userAuth.searchName ?? ""} placeholder="your search name" className="h-10 w-full rounded-lg border border-[#30354E] bg-[#202338] px-3 text-sm text-slate-100 outline-none transition focus:border-[#596581] focus:bg-[#23273D]" />
          </div>


          {/* Description */}

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-medium text-slate-400">
              <FileText size={13} />
              Description
            </label>

            <textarea onChange={handleChange} name="description" defaultValue={userAuth.description ?? ""} placeholder="your description" rows={4} className="profile-description block h-[100px] w-full resize-none overflow-y-auto rounded-lg border border-[#30354E] bg-[#202338] px-3 py-2 text-sm leading-5 text-slate-100 outline-none transition focus:border-[#596581] focus:bg-[#23273D]" />
          </div>

        </div>


        {/* Save */}

        <button type="submit" disabled={userInfoLoading} className="mt-auto mb-5 h-10 w-full rounded-lg border border-[#414964] bg-[#303750] text-sm font-semibold text-slate-100 shadow-lg shadow-black/20 transition-all duration-200 hover:border-[#515B78] hover:bg-[#39415C] hover:text-white">
          {
            userInfoLoading ?
              <OrbitProgress variant="spokes" color="#97A3B3" style={{ fontSize: "6px", marginTop: "4px" }} text="" textColor="" />
              : "Save Changes"
          }
        </button>

      </form>


      {/* ================= EDIT PHOTO PAGE ================= */}

      <ProfileImageUpdate
        setOpenProfile={setOpenProfile}
        isEditingPhoto={isEditingPhoto}
        setIsEditingPhoto={setIsEditingPhoto}
      />

    </>
  );
}
