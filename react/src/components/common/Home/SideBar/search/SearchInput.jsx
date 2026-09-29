import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import useChatStore from "../../../../../features/store/Home/useChatStore";
import useKeyboardSound from "../../../../../../hooks/useKeyboardSound";

export default function SearchInput() {
  const [name , setName] = useState(null);
  const {searchChats , setContactsLoading , isEnableSound} = useChatStore();
  const {play} = useKeyboardSound();
  useEffect(()=> {
    if(name == null) return
    setContactsLoading(true);
    const time = setTimeout(() => {
        searchChats(name);
    }, 500);
    return () => clearTimeout(time)
  },[name])

  return (
    <div className="p-3">
      <div className="flex h-11 w-full items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4">
        <Search className="h-5 w-5 text-slate-500" />

        <input
          onChange={(e)=>{
            isEnableSound && play()
            setName(e.target.value)
          }}
          type="text"
          placeholder="Search conversations..."
          className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600"
        />
      </div>
    </div>
  );
}