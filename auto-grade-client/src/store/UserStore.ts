//----UNUSED
import { createContext } from "react"
import { User } from "../models/User"
import { Action } from "../models/Action";
import { Exam } from "../models/Exam";
import { List } from "immutable";

const list: List<Exam> = List([{
    id: 1,
    userId: 1,
    subject: "math",
    title: "title",
    createdAt: "2025-07-07T12:00:00.000Z",
    class: 1,
    questions: [],
    exampleExamPath: "path",
    examUploads: [],
    contentType: "exam"
}
]);

export const initialState: User = {
    id: 0,
    name: '',
    password: '',
    email: '',
    school: '',
    role: '',
    exams: list,
    isLoggedIn: false
};
export const UserContext = createContext<{
    currentUser: User, userDispatch: React.Dispatch<Action>
}>
    ({ currentUser: initialState, userDispatch: () => { } });

export const userReducer = (current = initialState, action: Action): User => {
    switch (action.type) {
        case 'CREATE':
            return {
                ...current,
                ...action.new_data,
                isLoggedIn: true
            }
        case 'UPDATE':
            return {
                ...current,
                ...action.new_data
            }
        case 'LOGOUT':
            return initialState;
        default:
            return current

    }

}