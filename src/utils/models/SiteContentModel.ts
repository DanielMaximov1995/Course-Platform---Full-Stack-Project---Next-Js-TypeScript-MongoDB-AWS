import mongoose from "mongoose";
import {SiteContentType} from "@/types/SchemasType";

const SiteContentSchema = new mongoose.Schema<SiteContentType>({
    slug : { type : String },
    title : { type : String },
    subTitle : { type : String },
    text : { type : String },
    pic : {
        fileName : { type : String },
        alt : { type : String },
        url : { type : String },
    },
    title1 : { type : String },
    subTitle1 : { type : String },
    text1 : { type : String },
    pic1 : {
        fileName : { type : String },
        alt : { type : String },
        url : { type : String },
    },
    boxesWithImage : [
        {
            title: {type: String},
            subTitle: {type: String},
            pic: {
                fileName: {type: String},
                url: {type: String},
                alt : { type : String },
            }
        }
    ],
    boxesWithIcon : [
        {
            title: {type: String},
            subTitle: {type: String},
            icon : {type: String}
        }
    ],
    title2: {type: String},
    subTitle2: {type: String},
    pic2: {
        fileName: {type: String},
        alt : { type : String },
        url: {type: String},
    }
}, { timestamps : true })

export default mongoose.models?.siteContent ||
mongoose.model("siteContent", SiteContentSchema);