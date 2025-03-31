// import { User } from "../models/User";
// import axios from "axios"; // לניהול קריאות HTTP
// import { makeAutoObservable, runInAction } from "mobx"; // לניהול state עם MobX
// class UserStore {
//     user: User | null = null;
//     usersList: User[] = []
//     private apiEndpoint = '';//למלא אותו בURL של השרת
//     constructor() {
//         makeAutoObservable(this)
//     }
//     // setAuthorId(id:string)
//     // {
//     //     this.authorId=id
//     // }
//     async getAllUsers() {
//         try {
//             const response = await axios.get<User[]>(this.apiEndpoint);
//             runInAction(() => {
//                 this.usersList = response.data;
//             });
//         } catch (error) {
//             console.error('Error fetching users:', error);
//             if (axios.isAxiosError(error)) {
//                 if (error.response) {
//                     console.error('Server responded with:', error.response.data);
//                     console.error('Status code:', error.response.status);
//                 } else if (error.request) {
//                     console.error('No response received');
//                 } else {
//                     console.error('Error setting up request');
//                 }
//             }
            
//             throw error;
//         }
//     }
    
//     async getUserById(userPassword: string) {
//         if (this.usersList.length === 0) {
//             await this.getAllUsers();
//         }
//         const user = this.usersList.find(r => r.password.toString() === userPassword);
//         if (!user) {
//             console.error('user not found. Details:', {
//                 searchPassword: userPassword,
//                 usersPassword: this.usersList.map(r => r.password),
//                 usersCount: this.usersList.length
//             });
//             throw new Error(`משתמש לא נמצא עם סיסמה ${userPassword}`);
//         }
//         return user;
//     }

//     async addUser(user: Partial<User>) {
//         try {
//             const response = await axios.post<User>(this.apiEndpoint, user);
//             runInAction(() => {
//                 this.usersList.push(response.data);
//             });
//         } catch (error) {
//             console.error('שגיאה בהוספת משתמש', error);
//             throw error;
//         }
//     }
// }
// export default new UserStore()


import { createContext } from "react"
import { User } from "../models/User"
import { Exam } from "../models/Exam"
import { Action } from "../models/Action";
import { List } from "immutable";

export const initialState: User = {
    name: '',
    password: '',
    mail: '',
    school: '',
    roles: '', 
    exams: List<Exam>(), 
    isLoggedIn: false
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
              isLoggedIn: true
             }
        case 'UPDATE':
            return {
                ...current, 
                ...action.new_data
            }
        default:
            return current

    }

}
