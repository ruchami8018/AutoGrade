import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useContext, useRef, FormEvent } from "react";
import { UserContext } from "../../store/UserStore";
import CommonModal from "../design/CommonModal";

const Update = ({ onClose }: { onClose: () => void }) => {

    const { currentUser, userDispatch } = useContext(UserContext);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const schoolRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.put('https://localhost:7158/api/Users/update', {//לבדוק את ה URL
                email: currentUser.email,
                password: passwordRef.current?.value || currentUser.password,
                school: schoolRef.current?.value || currentUser.school,
                name: nameRef.current?.value || currentUser.name
            }, {
            });
            localStorage.setItem("token", res.data.token);
            userDispatch({
                type: 'UPDATE',
                new_data: {
                    name: nameRef.current?.value || currentUser.name,
                    password: passwordRef.current?.value || currentUser.password,
                    email: currentUser.email,
                    school: schoolRef.current?.value || currentUser.school,
                    role: currentUser.role,
                    exams: currentUser.exams, // This line was missing a comma in your original code
                }
            });
            // alert("העדכון בוצע בהצלחה");
            onClose();
        } catch (e: any) {
            console.error('Error updating user:', e);
            alert("העדכון נכשל");
            onClose();

        }
    }
    return (
        <CommonModal
            open={true}
            onClose={onClose}
            title="עדכון פרטים אישיים"
        >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TextField
                    inputRef={nameRef}
                    label="שם"
                    variant="outlined"
                    fullWidth
                    defaultValue={currentUser.name}
                />
                <TextField
                    inputRef={passwordRef}
                    label="סיסמה"
                    variant="outlined"
                    fullWidth
                    defaultValue={currentUser.password}
                />
                <TextField
                    inputRef={schoolRef}
                    label="בית ספר"
                    type="text"
                    variant="outlined"
                    fullWidth
                    defaultValue={currentUser.school}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    עדכן פרטים
                </Button>
            </form>
        </CommonModal>
    );
};
export default Update;



// import React, { useState, useContext, useEffect } from 'react';
// import { UserContext } from '../../store/UserStore';
// import { updateUser, getUserById } from '../../services/userService'; // ייבוא הפונקציות משירות המשתמשים

// const UpdateDetails = ({ onClose }: { onClose: () => void }) => {
//   const { currentUser, userDispatch } = useContext(UserContext);
//   const [name, setName] = useState(currentUser.name || '');
//   const [email, setEmail] = useState(currentUser.email || '');
//   const [school, setSchool] = useState(currentUser.school || '');
//   const [password, setPassword] = useState(''); // אפשרות להוסיף שינוי סיסמה

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       if (currentUser.id) {
//         const userDetails = await getUserById(currentUser.id); // שימוש בפונקציה מהשירות
//         if (userDetails) {
//           setName(userDetails.name);
//           setEmail(userDetails.email);
//           setSchool(userDetails.school || '');
//         }
//       }
//     };

//     fetchUserDetails();
//   }, [currentUser.id]);

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (currentUser.id) {
//       const updatedUser = await updateUser(currentUser.id, { 
//         ...currentUser,
//         name, 
//         email, 
//         school
//       }); // שימוש בפונקציה מהשירות
//       if (updatedUser) {
//         userDispatch({ type: 'UPDATE', new_data: updatedUser });
//         onClose();
//         alert('הפרטים עודכנו בהצלחה!');
//       } else {
//         alert('עדכון הפרטים נכשל.');
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>עדכון פרטים</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">שם:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="email">אימייל:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="school">בית ספר:</label>
//           <input
//             type="text"
//             id="school"
//             value={school}
//             onChange={(e) => setSchool(e.target.value)}
//           />
//         </div>
//         {/* אפשרות להוסיף שדה לשינוי סיסמה */}
//         <button type="submit">עדכן</button>
//         <button type="button" onClick={onClose}>
//           ביטול
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateDetails;