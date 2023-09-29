import mongoose from "mongoose";
import {LessonType, UserType} from "@/types/SchemasType";

const LessonSchema = new mongoose.Schema<LessonType>({
    title : { type : String },
    description : { type : String },
    free : { type : Boolean , default : false },
    video : {
        fileName : { type : String },
        url : { type : String },
        duration : { type : Number },
    },
    files : [
        {
            fileName : { type : String },
            url : { type : String },
            title : { type : String },
        }
    ],
    order : { type : Number }
}, { timestamps : true })

export default mongoose.models?.lessons ||
mongoose.model("lessons", LessonSchema);