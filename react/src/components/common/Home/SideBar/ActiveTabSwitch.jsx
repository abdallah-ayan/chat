import useChatStore from "../../../../features/store/Home/useChatStore";

function ActiveTabSwitch() {
  const { activeTab ,setActiveTap }=useChatStore();

  return (
    <div className="tabs tabs-boxed bg-transparent flex gap-3 p-2 m-2">
      <button
        onClick={()=>setActiveTap("chats")}
        className={`tab p-3 rounded-[12px] w-20 flex justify-center ${
          activeTab == "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"
        }`}
      >
        Chats
      </button>

      <button
        onClick={()=>setActiveTap("contacts")}
        className={`tab p-3 rounded-[12px] w-20 flex justify-center ${
          activeTab == "contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"
        }`}
      >
        Contacts
      </button>

      <button
        onClick={()=>setActiveTap("groups")}
        className={`tab p-3 rounded-[12px] w-20 flex justify-center ${
          activeTab == "groups" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"
        }`}
      >
        Groups
      </button>
    </div>
  );
}
export default ActiveTabSwitch;