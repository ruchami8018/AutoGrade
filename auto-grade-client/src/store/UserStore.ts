//----UNUSED
import { createContext, useReducer } from "react"
import { User } from "../models/User"
import { Action } from "../models/Action";
export const initialState: User = {
    id: 0,
    name: '',
    password: '',
    email: '',
    // school: '',
    role: '',
    exams: [],
    // isLoggedIn: false
};
export const UserContext=createContext<{
    currentUser: User,userDispatch:React.Dispatch<Action>}>
    ({currentUser:initialState,userDispatch:()=>{}});

export const userReducer=(current = initialState,action:Action): User =>{
    switch(action.type)
    {
        case 'CREATE':
            return {
                ...current,
                ...action.new_data,
                // isLoggedIn: true
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