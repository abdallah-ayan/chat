import SideBar from '../../components/layout/Home/SideBar/SideBar'
import Content from '../../components/layout/Home/Content/Content'
import "./Home.css"
import useChatStore from '../../features/store/Home/useChatStore';
import { useEffect, useState } from 'react';
export default function Home() {
  const { selectedUser, addMembersOpen, isOpenAddGroup, selecterUserProfile , handleGroupData , isSelectedGroup} = useChatStore();
  const sideShow = !selectedUser || addMembersOpen || isOpenAddGroup || selecterUserProfile;

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => {
      const newValue = window.innerWidth < 800;

      setIsSmallScreen(prev => {
        if (prev === newValue) return prev;
        return newValue;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(()=> {
    if(isSmallScreen && isSelectedGroup) {
      const groupId = selectedUser?._id;
      if(selectedUser?._id) handleGroupData(groupId);
    }
  } , [])


  return (
    <div>
      <div className="Home relative w-full" style={{ height: "100vh" }}>
        {(sideShow && isSmallScreen) && <SideBar full={true} />}
        {(!sideShow &&  isSmallScreen) && <Content />}
        {!isSmallScreen && <SideBar />}
        {!isSmallScreen && <Content />}
      </div>
    </div>
  )
}
