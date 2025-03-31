import { Exam } from "./Exam"
import { List } from "immutable";

export type User = {
    name : string,
    mail : string,
    password : string,
    school ?: string,
    roles : string,
    exams : List<Exam> ,
    isLoggedIn?:boolean
}
