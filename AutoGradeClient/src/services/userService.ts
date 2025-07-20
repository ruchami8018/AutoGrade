import axios from "axios"

const API_URL = `${import.meta.env.VITE_REACT_APP_BASE_API_URL!}/Auth`;

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

export const LoginWithGoogle = async (idToken: string) => {
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