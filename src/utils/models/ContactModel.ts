import mongoose from "mongoose";
import {ContactType} from "@/types/SchemasType";

const ContactSchema = new mongoose.Schema<ContactType>({
    name : { type : String },
    phone : { type : String },
    text : { type : String },
},{timestamps : true});

export default mongoose.models?.contact ||
mongoose.model("contact", ContactSchema);