import { File } from "./File"

export type User = {
    id : number,
    name : string,
    email : string,
    password : string,
    role : string,
    files : File [],
    token?: string
}