// import MessageInput from "./MessageInput";
// import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";

import ChatHeader from "./ChatHeader";
import Messages from "./MessageContent/Messages";
import "./ChatContainer.css"
import MessageInput from "./MessageInput/MessageInput";
function ChatContainer() {
  return (
    <div className="flex h-full min-w-0 flex-1 flex-col">
      <div className="chat-back-color"></div>
      <div className="chat-back-icon"/>
      <ChatHeader />
      <Messages />
      <MessageInput />

    </div>
  );
}

export default ChatContainer;