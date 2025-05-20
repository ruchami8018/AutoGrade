import axios from "axios";
import { User } from "../models/User";

const API_URL = "https://localhost:7158/api/User"; // ודא שזה ה-URL הנכון

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("שגיאה בהתחברות:", error);
        return null;
    }
};

export const signupUser = async (name: string, email: string, password: string, school: string) => {
    try {
        const response = await axios.post(API_URL, { name, email, password, school, role: 'user' }); // ברירת מחדל של תפקיד
        return response.data;
    } catch (error) {
        console.error("שגיאה בהרשמה:", error);
        return null;
    }
};

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