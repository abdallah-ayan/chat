import { useEffect } from "react";
import NoChatsFound from "../default/NoChatsFound";
import UsersLoadingSkeleton from "../UsersLoadingSkeleton";
import useChatStore from "../../../../../features/store/Home/useChatStore";
import useAuthSore from "../../../../../features/store/auth/useAuthSore";

export default function ChatsList() {

  const { getContacts, isContactsLoading, contacts, setSelectedUser, setIsSelectedGroup } = useChatStore();

  const { onlineUsers } = useAuthSore();
  useEffect(() => {
    getContacts()
  }, [])

  if (isContactsLoading)
    return <UsersLoadingSkeleton />

  if (contacts.length == 0)
    return <NoChatsFound />

  return (
    <>
      {
        contacts.map((user) => (
          <div
            onClick={() => {
              setIsSelectedGroup(false)
              setSelectedUser(user)
            }}
            key={user._id}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`avatar online`}>

                <div
                  className="size-12 rounded-full overflow-hidden bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${user.profilePic || "/avatar.png"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />

                 {onlineUsers.includes(user._id) && (
                  <span className="absolute top-[1px] left-[1px] size-3 rounded-full bg-emerald-400 border-2 border-[#1D1E32]" />
                )}

              </div>
              <h4 className="text-slate-200 font-medium truncate">{user.fullName}</h4>
            </div>
          </div>
        ))
      }

    </>
  );
}
