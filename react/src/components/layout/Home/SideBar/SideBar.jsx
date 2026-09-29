import ActiveTabSwitch from "../../../common/Home/SideBar/ActiveTabSwitch.jsx"
import ChatsList from "../../../common/Home/SideBar/lists/ChatsList.jsx"
import ContactList from "../../../common/Home/SideBar/lists/ContactList.jsx"
import ProfileHeader from "../../../common/Home/SideBar/ProfileHeader"
import useChatStote from "./../../../../features/store/Home/useChatStore.js";
import GroupList from "./../../../../components/common/Home/SideBar/lists/GroupList.jsx"
import SearchInput from "../../../common/Home/SideBar/search/SearchInput.jsx";
import Profile from "../../../common/Home/SideBar/userProfile/Profile.jsx";
import AddGroup from "../../../common/Home/SideBar/addGroup/AddGroup.jsx";
import AddMembersToGroup from "../../../common/Home/SideBar/addGroup/AddMembersToGroup.jsx";
export default function SideBar({full}) {
  const { activeTab , selecterUserProfile , isOpenAddGroup , addMembersOpen , isSelectedGroup} = useChatStote()


  if(addMembersOpen && isSelectedGroup) 
    return<div className="bg-slate-800/50 backdrop-blur-sm h-full flex flex-col" style={{ width: full ? "100%" : "400px" }}>
      <AddMembersToGroup />
    </div>

  
  if(selecterUserProfile)
    return <div className="bg-slate-800/50 backdrop-blur-sm h-full flex flex-col" style={{ width: full ? "100%" : "400px" }}>
          <Profile />
    </div>


  if(isOpenAddGroup)
    return<div className="bg-slate-800/50 backdrop-blur-sm h-full flex flex-col" style={{ width: full ? "100%" : "400px" }}>
      <AddGroup />
    </div>


  return (
      <div className="bg-slate-800/50 backdrop-blur-sm h-full flex flex-col" style={{ width: full ? "100%" : "400px" }}>
        <ProfileHeader />
        <ActiveTabSwitch />
        {activeTab === "contacts" && <SearchInput />}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats" ? <ChatsList /> : activeTab === "contacts" ? <ContactList /> : <GroupList />}
        </div>
      </div>
  )
}
