import { ImageIcon, SendIcon, XIcon , ShieldAlert } from "lucide-react";
import { useRef, useState } from "react";
import useChatStore from "../../../../../features/store/Home/useChatStore";
import useKeyboardSound from "../../../../../../hooks/useKeyboardSound";
import useAuthSore from "../../../../../features/store/auth/useAuthSore";

export default function MessageInput() {
    const { sendMessage, isEnableSound, isSelectedGroup, selectedUser, roles } = useChatStore();
    const {userAuth} = useAuthSore();
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef();
    const { play } = useKeyboardSound();
    const handleSendMessage = (e) => {
        e.preventDefault();
        sendMessage({
            text: text,
            image: imagePreview
        });
        setText("")
        setImagePreview(null)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const base32Image = reader.result;
            setImagePreview(base32Image)
        }
    }

    const role = roles.find(
        (ele) => ele.id == userAuth._id
    )?.role;

    if (isSelectedGroup && !selectedUser.sendAll && role == "user") {
        return <>
   <>
    <div className="flex items-center justify-center gap-2 border-t border-slate-700/50 bg-[#0D1726] px-4 py-4">
        

        <p className="text-sm text-slate-500">
            Only admins can send messages in this group
        </p>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800">
            <ShieldAlert 
                size={15}
                strokeWidth={1.8}
                className="text-slate-500"
            />
        </div>

    </div>
</>
</>
    }
    return (
        <div className="p-4 border-t border-slate-700/50 bg-[#0D1726]">
            {imagePreview && (
                <div className=" mx-auto mb-3 flex items-center">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-slate-700"
                        />
                        <button
                            onClick={() => setImagePreview(null)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
                            type="button"
                        >
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="mx-auto flex space-x-4">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                        isEnableSound && play()
                        setText(e.target.value);
                    }}
                    className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4"
                    style={{ outline: "none", color: "white" }}
                    placeholder="Type your message..."
                />

                <input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className='hidden'
                />


                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${imagePreview ? "text-cyan-500" : ""
                        }`}
                >
                    <ImageIcon className="w-5 h-5" />
                </button>

                <button
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <SendIcon className="w-5 h-5" />
                </button>

            </form>
        </div>
    )
}
