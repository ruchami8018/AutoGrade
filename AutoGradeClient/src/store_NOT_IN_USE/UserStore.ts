// //----UNUSED
// import { createContext } from "react"
// import { User } from "../models/User"
// import { Action } from "../models/Action";
// import { Exam } from "../models/Exam_NOT_IN_USE";
// import { List } from "immutable";

// export const initialState: User = {
//     id: 0,
//     name: '',
//     password: '',
//     email: '',
//     // school: '',
//     role: '',
//     exams: [],
//     // isLoggedIn: false
// };
// export const UserContext = createContext<{
//     currentUser: User, userDispatch: React.Dispatch<Action>
// }>
//     ({ currentUser: initialState, userDispatch: () => { } });

// export const userReducer = (current = initialState, action: Action): User => {
//     switch (action.type) {
//         case 'CREATE':
//             return {
//                 ...current,
//                 ...action.new_data,
//                 // isLoggedIn: true
//             }
//         case 'UPDATE':
//             return {
//                 ...current,
//                 ...action.new_data
//             }
//         case 'LOGOUT':
//             return initialState;
//         default:
//             return current

//     }

// }