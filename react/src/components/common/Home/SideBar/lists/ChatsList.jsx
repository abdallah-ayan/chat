import { useEffect } from "react";
import NoChatsFound from "../default/NoChatsFound";
import UsersLoadingSkeleton from "../UsersLoadingSkeleton";
import useChatStore from "../../../../../features/store/Home/useChatStore";
import useAuthSore from "../../../../../features/store/auth/useAuthSore";

export default function ChatsList() {

  const { getChats, isUsersLoading, chats, setSelectedUser, setIsSelectedGroup } = useChatStore();

  const { onlineUsers } = useAuthSore();

  useEffect(() => {
    getChats()
  }, [])

  if (isUsersLoading)
    return <UsersLoadingSkeleton />

  if (chats.length == 0)
    return <NoChatsFound isChat={true} />

  return (
    <>
      {
        chats.map((user) => (
          <div
            onClick={() => {
              setSelectedUser(user)
              setIsSelectedGroup(false)
            }}
            key={user._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">

              <div className="relative">

                <div
                  className="avatar"
                >
                  <div
                    className="size-12 rounded-full overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${user.profilePic || "/avatar.png"})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </div>

                {onlineUsers.includes(user._id) && (
                  <span className="absolute top-[1px] left-[1px] size-3 rounded-full bg-emerald-400 border-2 border-[#1D1E32]" />
                )}

              </div>

              <h4 className="text-slate-200 font-medium truncate">
                {user.fullName}
              </h4>

            </div>
          </div>
        ))
      }
    </>
  );
}