import { useEffect } from "react";
import NoChatsFound from "../default/NoChatsFound";
import UsersLoadingSkeleton from "../UsersLoadingSkeleton";
import useChatStore from "../../../../../features/store/Home/useChatStore";
import { Plus } from "lucide-react";

export default function ChatsList() {

  const { isGroupLoading, groups, getGroups, setOpenAddGroup, setSelectedUser, setIsSelectedGroup } = useChatStore();

  const handleClick = (group) => {
    setIsSelectedGroup(true);
    setSelectedUser(group);
  }
  useEffect(() => {
    getGroups();
  }, [])

  if (isGroupLoading)
    return <UsersLoadingSkeleton />

  if (groups.length == 0)
    return <NoChatsFound />
  return (
    <>
      <button
        type="button"
        onClick={() => setOpenAddGroup(true)}
        className="flex w-full items-center gap-3 rounded-lg bg-emerald-500/10 px-4 py-4 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/15 hover:text-emerald-300"
      >
        <Plus size={19} strokeWidth={2} />
        <span>Add Group</span>
      </button>

      {/* Section Divider */}
      <div>
        <div className="mt-6 mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-700/50" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
            Groups
          </span>
          <div className="h-px flex-1 bg-slate-700/50" />
        </div>
      </div>

      {groups.map((group) => (
        <div
          onClick={() => handleClick(group)}
          key={group._id}
          className="mb-2 cursor-pointer rounded-lg bg-cyan-500/10 p-4 transition-colors hover:bg-cyan-500/20"
        >
          <div className="flex items-center gap-3">
            <div className="avatar online">

              <div
                className="size-12 rounded-full overflow-hidden bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${group.profilePic || "/avatar.png"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />

            </div>

            <h4 className="truncate font-medium text-slate-200">
              {group.name}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}
