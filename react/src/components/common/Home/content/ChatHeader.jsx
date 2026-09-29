import { XIcon } from "lucide-react"
import useChatStore from "../../../../features/store/Home/useChatStore";
import useAuthSore from "../../../../features/store/auth/useAuthSore";

export default function ChatHeader() {
  const { setSelectedUser, selectedUser, setSelectedUserProfile, isSelectedGroup, members } = useChatStore();

  return (
    <div className="flex justify-between items-center bg-slate-800/80 border-b border-slate-700/50 max-h-[84px] px-6 py-10 flex-1" >
      <div className="flex items-center space-x-3">
        <div className={`avatar online`}>
          <button
            className="h-12 w-12 shrink-0 rounded-full border border-slate-600/50 bg-slate-800 bg-cover bg-center shadow-md transition-all duration-200 hover:scale-105 hover:border-cyan-400/50 hover:shadow-lg"
            onClick={() => setSelectedUserProfile(selectedUser._id)}
            style={{
              backgroundImage: `url(${selectedUser.profilePic || "/avatar.png"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          ></button>
        </div>

        <div>
          <h3 className="text-slate-200 font-medium">{isSelectedGroup ? selectedUser.name : selectedUser.fullName}</h3>
          {!isSelectedGroup && <p className="text-slate-400 text-sm">{true ? "Online" : "Offline"}</p>}
          {
            isSelectedGroup &&
            <div className="mt-1 flex min-w-0 items-center gap-1.5">
              <div className="flex min-w-0 items-center gap-1">
                {members.slice(0, 3).map((user, index) => (
                  <span
                    key={user._id}
                    className="max-w-[90px] truncate text-xs font-medium text-slate-500"
                  >
                    {user.fullName}
                    {index < Math.min(members.length, 3) - 1 && ","}
                  </span>
                ))}
              </div>

              {members.length > 3 && (
                <span className="shrink-0 text-[11px] font-medium text-slate-600">
                  +{members.length - 3}
                </span>
              )}
            </div>
          }
        </div>
      </div>

      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  )
}
