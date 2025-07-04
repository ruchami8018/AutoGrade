import axios from "axios";
import { User } from "../models/User";

// const API_URL = "https://localhost:7158/api/User"; // ודא שזה ה-URL הנכון
// const API_URL = "https://smartgrade.onrender.com/api/Auth"; // ודא שזה ה-URL הנכון

// export const loginUser = async (email: string, password: string) => {
//     try {
//         const response = await axios.post(`${API_URL}/login`, { email, password });
//         return response.data;
//     } catch (error) {
//         console.error("שגיאה בהתחברות:", error);
//         return null;
//     }
// };

// export const signupUser = async (name: string, email: string, password: string, school: string) => {
//     try {
//         const response = await axios.post(API_URL, { name, email, password, school, role: 'user' }); // ברירת מחדל של תפקיד
//         return response.data;
//     } catch (error) {
//         console.error("שגיאה בהרשמה:", error);
//         return null;
//     }
// };
const API_URL = `${import.meta.env.VITE_REACT_APP_BASE_API_URL!}/Auth`;
export const updateUser = async (userId: number, userData: User) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error("שגיאה בעדכון פרטי משתמש:", error);
        return null;
    }
};

export const getUserById = async (userId: number) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("שגיאה בשליפת פרטי משתמש:", error);
        return null;
    }
};

export const login = async (email : string, password : string) => {
    try {
        const response = await axios.post(API_URL + '/login' , 
        {
            email,
            password
        });
        console.log('login successfully!')
        console.log(response.data)
        return response.data
    } catch(error){
        console.error("שגיאה בהתחברות", error);
    }
}

export const register = async (name : string, email : string, 
    password : string, role : string) => {
    try {
        const response = await axios.post(API_URL + '/register' , 
        {
            name,
            email,
            password,
            role
        });
        console.log('register successfully!')
        return response.data
    } catch(error){
        console.error("שגיאה בהרשמה", error);
    }
}

export const loginWithGoogle = async (idToken: string) => {
    try {
      const response = await axios.post(API_URL + "/google", {
        idToken,
      });
      console.log("login with google successfully!");
      return response.data;
    } catch (error) {
      console.error("שגיאה בהתחברות עם גוגל", error);
      throw error; // כדאי לזרוק שוב כדי שהקומפוננטה תדע על השגיאה
    }
  };
