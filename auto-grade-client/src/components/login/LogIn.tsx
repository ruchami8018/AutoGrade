import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useContext, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/UserStore";
import CommonModal from "../design/CommonModal";
import { List } from 'immutable';
import { Exam } from '../../models/Exam';

const Login = ({ onClose }: { onClose: () => void }) => {
    const { userDispatch } = useContext(UserContext);
    const mailRef = useRef<HTMLInputElement>(null);
    const passwordREf = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    // const handleSubmit = async (e: FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post('http://localhost:5082/api/Users/login',//למלא את ה URL
    //             {
    //                 email: mailRef.current?.value,
    //                 password: passwordREf.current?.value
    //             })
    //         if (res.data && res.data.token) 
    //             localStorage.setItem("token", res.data.token);
            
    //         userDispatch({
    //             type: 'CREATE',
    //             new_data: {
    //                 password: res.data.user.password || '',
    //                 name: res.data.user.name || mailRef.current?.value || '',
    //                 mail: res.data.user.mail || '',
    //                 school: res.data.user.school || '',
    //                 roles: res.data.user.roles|| '',
    //                 exams: res.data.user.exams || List <Exam>([]),
    //                 isLoggedIn: true
    //             }
    //         });
    //         onClose();
    //     }
    //     catch (e: any) {
    //         if (e.status === 401) {
    //             alert("שם משתמש או סיסמה אינם נכונים");
    //         }
    //     }
    // }
    // const handleSubmit = async (e: FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         // https://localhost:7158/api/Users/register
    //       const res = await axios.post('https://localhost:7158/api/Users/login', {
    //         email: mailRef.current?.value,
    //         password: passwordREf.current?.value
    //       });
    //       // if (res.status === 200) {
    //         localStorage.setItem("token",res.data.token);
    //         userDispatch({
    //           type: 'CREATE', // השתמש באקשן מתאים ללוגין
    //           new_data: {
    //             name: res.data.User.name || mailRef.current?.value || '',
    //             mail: res.data.User.email || '',
    //             password: '', // אל תשמור סיסמה בסטור
    //             roles: res.data.User.role || '',
    //             school: res.data.User.school || '',
    //             exams: res.data.User.exams ? List<Exam>(JSON.parse(res.data.User.exams)) : List<Exam>([]), // טפל ב-Exams כמחרוזת JSON
    //             isLoggedIn: true
    //           }
    //         });
    //         alert("ההתחברות הצליחה");
    //         onClose();
    //         // navigate('/dashboard'); // אם אתה משתמש ב-React Router, נווט לדף הבית
    //       // } else {
    //       //   alert("שגיאה בהתחברות");
    //       // onClose();

    //       // }
    //       // onClose();
    //     } catch (e: any) {
    //       if (e.response && e.response.status === 401) {
    //         alert("שם משתמש או סיסמה אינם נכונים");
    //         // onClose();
    //       } else {
    //         alert("שגיאה בהתחברות");
    //         console.error("שגיאה בהתחברות:", e); // הדפס את השגיאה לקונסול לבדיקה
    //         // onClose();
    //       }
    //       onClose();

    //     }
    //   };

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!mailRef.current?.value || !passwordREf.current?.value) {
        alert("אנא מלא את כל השדות");
        return;
      }
    
      try {
        const res = await axios.post('https://localhost:7158/api/Users/login', {
          email: mailRef.current?.value,
          password: passwordREf.current?.value
        });
    
        if (res.data && res.data.token) {
          localStorage.setItem("token", res.data.token);
          userDispatch({
            type: 'CREATE',
            new_data: {
              name: res.data.user.name || mailRef.current?.value || '',
              mail: res.data.user.email || '',
              password: '',
              roles: res.data.user.role || '',
              school: res.data.user.school || '',
              exams: res.data.user.exams ? List<Exam>([]) : List<Exam>([]),
              isLoggedIn: true
            }
          });
         console.log("ההתחברות הצליחה");
          onClose();
        } else {
          alert("שגיאה בהתחברות");
        }
      } catch (e: any) {
        if (e.response && e.response.status === 401) {
          alert("שם משתמש או סיסמה אינם נכונים");
        } else {
          alert("שגיאה בהתחברות");
          console.error("שגיאה בהתחברות:", e);
        }
      }
    };

    return (
        <CommonModal
            open={true}
            onClose={onClose}
            title="התחברות"
        >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TextField
                    inputRef={mailRef}
                    label="מייל"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    inputRef={passwordREf}
                    label="סיסמה"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    התחבר
                </Button>
            </form>
        </CommonModal>
    );
};
export default Login;