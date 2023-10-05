import mongoose from "mongoose";
import {SettingSiteType} from "@/types/SchemasType";

const SettingSchema = new mongoose.Schema<SettingSiteType>({
    slug : { type : String },
    siteName : { type : String },
    titleSeo : { type : String },
    descriptionSeo : { type : String },
    urlSite : { type : String },
    keywords : [{ type : String }],
    logo : {
        fileName : { type : String },
        alt : { type : String },
        url : { type : String },
    },
    logoDark : {
        fileName : { type : String },
        alt : { type : String },
        url : { type : String },
    },
    ogImage : {
        fileName : { type : String },
        alt : { type : String },
        url : { type : String },
    },
    icon : {
        fileName : { type : String },
        url : { type : String },
    },
},{timestamps : true});

export default mongoose.models?.settings ||
mongoose.model("settings", SettingSchema);