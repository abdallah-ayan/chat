import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react"
import useAuthSore from "../../../../features/store/auth/useAuthSore"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OrbitProgress } from "react-loading-indicators"
import { useNavigate } from "react-router"
import useChatStore from "../../../../features/store/Home/useChatStore";
import ProfileInfo from "./header/profile/profileInfo";
export default function ProfileHeader() {

  const { handleLogout, LogoutState, stopSuccess, userAuth } = useAuthSore();
  const { LogoutSuccess, isLogoutLoading } = LogoutState
  const { switchEnableSound, isEnableSound } = useChatStore()
  const [openProfile, setOpenProfile] = useState(false);
  const navigate = useNavigate();

  const audio = new Audio("/sounds/mouse-click.mp3")

  function switchSound() {
    audio.currentTime = 0;
    audio.play().catch(() => { })
    switchEnableSound()
  }

  useEffect(() => {
    if (LogoutSuccess) {
      toast.success("Logged out successfully.");
      stopSuccess();
      navigate("/login");
    }
  }, [LogoutState])

  return (
    <div className="p-6 border-b border-slate-700/50" style={{ zIndex: "101" }}>
      <div className="flex items-center justify-between">
        {openProfile && <ProfileInfo setOpenProfile={setOpenProfile} />}
        <div className="flex items-center gap-3">
          <div className="avatar online">

            <button
              onClick={() => setOpenProfile(true)}
              className="size-14 rounded-full relative bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${userAuth.profilePic || "/avatar.png"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

          </div>

          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {userAuth.fullName || "Your Name"}
            </h3>

            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {/* LOGOUT BTN */}
          {
            isLogoutLoading ?
              <OrbitProgress color="#E2E8F0" style={{ fontSize: "5px" }} text="" textColor="" />
              :
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <LogOutIcon className="size-5" />
              </button>
          }

          {/* SOUND TOGGLE BTN */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            {isEnableSound ? (
              <Volume2Icon onClick={switchSound} className="size-5" />
            ) : (
              <VolumeOffIcon onClick={switchSound} className="size-5" />
            )}
          </button>
        </div>

      </div>
    </div>
  )
}
