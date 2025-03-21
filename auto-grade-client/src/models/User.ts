import { Exam } from "./Exam"

export type User = {
    name : string,
    mail : string,
    password : string,
    school ?: string,
    roles : Role [],
    exams : Exam [],
    isLoggedIn?:boolean
}

export enum Role {
    Admin,
    Teacher
}