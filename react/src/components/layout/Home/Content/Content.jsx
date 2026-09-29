import ChatContainer from '../../../common/Home/content/ChatContainer'
import NoConversationPlaceholder from '../../../common/Home/content/NoConversationPlaceholder'
import useChatStore from '../../../../features/store/Home/useChatStore'

export default function Content() {
  const {selectedUser} = useChatStore();
  return (
    <div className="flex-1 flex flex-col backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
    </div> 
  )
}



// 

// bg-slate-900/50 