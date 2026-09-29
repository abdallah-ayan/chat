import { useEffect, useRef, useState } from "react";
import useChatStore from "../../../../../features/store/Home/useChatStore";
import useAuthSore from "../../../../../features/store/auth/useAuthSore";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

export default function Messages() {
    const { selectedUser, getMessagesWithChat, messages, isMessagesLoading, isSelectedGroup, handleGroupData  , listenToMessage , unListenToMessage} = useChatStore();
    const { userAuth } = useAuthSore();
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);

    const endMessages = useRef(null);
    useEffect(() => {
        if (!selectedUser) return;
        if (isSelectedGroup)
            handleGroupData(selectedUser._id);
        else
            getMessagesWithChat(selectedUser._id);
    }, [selectedUser, isSelectedGroup]);
    useEffect(() => {
        endMessages.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    useEffect(() => {
        const handleResize = () => {
            const newValue = window.innerWidth < 1000 && isSelectedGroup;

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
        listenToMessage();
        return () => unListenToMessage();
    } , [])

    if (isMessagesLoading)
        return <MessagesLoadingSkeleton />;
    return (
        <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="mx-auto space-y-4">
                {messages.map((msg, index) => {
                    const isReceived = msg.receiverId == userAuth._id;
                    const isMyMessage = userAuth._id == msg.senderId;
                    if (isSelectedGroup) {

                        const previousMsg = messages[index - 1];

                        // أظهر الصورة فقط إذا كانت أول رسالة
                        // أو إذا كان المرسل مختلف عن الرسالة السابقة
                        const showImage =
                            index === 0 ||
                            previousMsg?.senderId?.toString() !==
                            msg.senderId?.toString();

                        return (
                            <div key={msg._id} className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}>
                                <div className={`flex items-start gap-3 ${isMyMessage ? "flex-row-reverse" : "flex-row"}`}>

                                    {
                                        showImage &&
                                        <div
                                            style={{
                                                width: "46px",
                                                height: "46px",
                                                minWidth: "46px",
                                                minHeight: "46px",
                                                marginRight: isMyMessage ? "0px" : "10px",
                                                marginLeft: isMyMessage ? "10px" : "0px",
                                                backgroundImage: `url(${msg.senderImage?.trim() ? msg.senderImage : "/avatar.png"})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                            className="shrink-0 overflow-hidden rounded-full border border-slate-700/80 bg-slate-800 shadow-lg"
                                        />
                                    }
                                    <div className={`flex flex-col ${showImage && !isMyMessage ? "" : "ms-16"} ${!showImage && isMyMessage ? "me-16" : ""} ${isMyMessage ? "items-end" : "items-start"}`}>
                                        <div className={`mb-1.5 flex items-center gap-2 ${isMyMessage ? "mr-1" : "ml-1"}`} style={{ width: "fit-content" }}>
                                            <span style={{ width: "fit-content", display: "block" }} className={`text-xs font-semibold tracking-wide ${isMyMessage ? "text-cyan-300" : "text-emerald-400"}`}>{isMyMessage ? "You" : msg.senderName}</span>
                                        </div>
                                        <div style={{ maxWidth: "333px" }} className={`relative px-4 py-3 text-sm ${isMyMessage ? "rounded-[18px_4px_18px_18px] bg-cyan-600 text-white" : "rounded-[4px_18px_18px_18px] bg-slate-800 text-slate-200"}`}>
                                            {isMyMessage ? (
                                                <span className="absolute -right-2 top-[0px] h-0 w-0" style={{ width: "10px", height: "10px", background: "rgb(8 145 178)", clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
                                            ) : (
                                                <span className="absolute -left-[8px] top-0 h-[10px] w-[10px]" style={{ background: "rgb(30 41 59)", clipPath: "polygon(100% 0, 100% 100%, 0 0)" }} />
                                            )}
                                            {msg.image && (
                                                <div
                                                    style={{
                                                        justifySelf : "center" ,
                                                        width: isSmallScreen ? "200px" : "300px",
                                                        marginBottom: "10px",
                                                        backgroundImage: `url(${msg.image})`,
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                        backgroundRepeat: "no-repeat",
                                                        borderRadius: "10px",
                                                    }}
                                                    className="overflow-hidden rounded-md bg-white/25 aspect-square"
                                                />
                                            )}
                                            {msg.text && (
                                                <p className="break-words">{msg.text}</p>
                                            )}
                                            <p className={`mt-1 text-right text-xs ${isMyMessage ? "text-cyan-100" : "text-slate-500"}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return isReceived ? (
                        <div key={msg._id} className="flex justify-start">
                            <div style={{ maxWidth: "333px" }} className="relative max-w-[75%] rounded-[18px_18px_18px_4px] bg-slate-800 px-4 py-3 text-sm text-slate-200">
                                <span className="absolute bottom-0 left-[-10px] h-6 w-4 bg-slate-800 [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
                                {msg.image && (
                                    <div
                                        style={{
                                            justifySelf : "center" ,
                                            width: isSmallScreen ? "200px" : "300px",
                                            marginBottom: "10px",
                                            backgroundImage: `url(${msg.image})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            borderRadius: "10px",
                                            aspectRatio: "1 / 1",
                                        }}
                                        className="overflow-hidden rounded-md bg-white/25"
                                    />
                                )}
                                {msg.text && (
                                    <p>{msg.text}</p>
                                )}
                                <p className="mt-1 text-right text-xs text-slate-500">
                                    {new Date(msg.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div key={msg._id} className="flex justify-end">
                            <div style={{ maxWidth: "333px" }} className="relative max-w-[75%] rounded-[18px_18px_4px_18px] bg-cyan-600 px-4 py-3 text-sm text-white">
                                <span className="absolute bottom-0 right-[-10px] h-6 w-4 bg-cyan-600 [clip-path:polygon(0_0,0_100%,100%_100%)]" />
                                {msg.image && (
                                    <div
                                        style={{
                                            width: isSmallScreen ? "200px" : "300px",
                                            marginBottom: "10px",
                                            backgroundImage: `url(${msg.image})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            borderRadius: "10px",
                                        }}
                                        className="rounded-md bg-white/25 aspect-square"
                                    />
                                )}
                                {msg.text && (
                                    <p>{msg.text}</p>
                                )}
                                <p className="mt-1 text-right text-xs text-cyan-100">
                                    {new Date(msg.createdAt).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={endMessages} />
            </div>
        </div>
    );
}
