// import { Exam } from "./Exam"
// import { List } from "immutable";

import { List } from "immutable";
import { Exam } from "./Exam";

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    school?: string,
    role: string,
    exams: List<Exam>,
    isLoggedIn?: boolean
}

// export type User = {
//     id : number,
//     name : string,
//     email : string,
//     password : string,
//     role : string,
//     exams : File [],
//     school?: string
// }
