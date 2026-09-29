import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [20, "name cannot exceed 20 characters"],
        required: [true, "name is required"],
        trim: true,
    },
    description : {
        type : String,
        maxlength : [200 , "description cannot exceed 200 characters"]
    } ,
    users: [{
        id: {
            type: mongoose.Types.ObjectId,
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"]
        }
    }],
    messages: [{
        type: mongoose.Types.ObjectId,
        default: []
    }],
    profilePic: {
        type: String,
        default: ""
    },
    profilePicPublicId: {
        type: String,
        default: "",
        select: false
    },
    sendAll: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});


const Group = mongoose.model("Group", groupSchema);
export default Group