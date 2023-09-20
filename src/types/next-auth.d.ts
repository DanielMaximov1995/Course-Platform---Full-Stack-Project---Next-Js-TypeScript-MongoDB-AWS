import NextAuth from "next-auth"
import {UserType} from "@/types/SchemasType";

declare module "next-auth" {

    interface Session {
        user: UserType
    }
}