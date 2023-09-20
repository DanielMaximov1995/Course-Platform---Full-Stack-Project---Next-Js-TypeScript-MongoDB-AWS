import mongoose from "mongoose";
import {UserType} from "@/types/SchemasType";

const UserSchema = new mongoose.Schema<UserType>({
    fName : { type : String },
    lName : { type : String },
    fullName : { type : String },
    email : { type : String },
    isAdmin : { type : String },
    phone : { type : String }
})

export default mongoose.models?.users ||
mongoose.model("users", UserSchema);