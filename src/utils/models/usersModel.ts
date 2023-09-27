import mongoose from "mongoose";
import {UserType} from "@/types/SchemasType";

const UserSchema = new mongoose.Schema<UserType>({
    fName : { type : String },
    lName : { type : String },
    fullName : { type : String },
    email : { type : String , unique : true , required : true},
    isAdmin : { type : Boolean , default: false },
    phone : { type : String , required: true },
    lessonsCompleted : {
        1 : { type : Boolean , default: false },
        2 : { type : Boolean , default: false },
        3 : { type : Boolean , default: false },
        4 : { type : Boolean , default: false },
        5 : { type : Boolean , default: false },
    }
},{timestamps : true});

export default mongoose.models?.users ||
mongoose.model("users", UserSchema);