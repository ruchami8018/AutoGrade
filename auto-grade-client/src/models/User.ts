import { Exam } from "./Exam"
import { List } from "immutable";

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
