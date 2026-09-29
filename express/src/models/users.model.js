import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
const usersSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      maxlength: [20, "Full name cannot exceed 20 characters"],
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Please enter a valid email"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    description : {
      type : String ,
      trim : true ,
      maxlength : 200,
    },

    searchName : {
      type : String ,
      trim : true ,
      maxlength : 20,
      lowercase : true ,
      required: [true, "Search Name is required"],
      unique : true ,
    } ,

    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    },
    
    profilePic: {
      type: String,
      default: ""
    },
    profilePicPublicId: {
      type: String,
      default: "",
      select: false
    },
    groups: [{
      type: mongoose.Types.ObjectId
    }]
  },
  {
    timestamps: true,
  },
);

usersSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
})

usersSchema.methods.comparePassword = async function (pass) {
  return await bcrypt.compare(pass, this.password)
}

const User = mongoose.model("User", usersSchema);
export default User