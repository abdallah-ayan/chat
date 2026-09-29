import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        required: [true, "Sender ID is required"],
        ref: "User"
    },
    receiverId: {
        type: mongoose.Types.ObjectId,
        required: [true, "Receiver ID is required"],
        ref: "User"
    },
    text: {
        type: String,
        trim: true,
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});

messageSchema.pre("validate" , function() {
    if(!this.text && !this.image) 
        return this.invalidate("text", "Message must contain text or image");
})

const Message = mongoose.model("Message", messageSchema);
export default Message