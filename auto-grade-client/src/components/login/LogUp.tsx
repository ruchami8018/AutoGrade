import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { FormEvent, useContext, useRef } from 'react';
import { UserContext } from '../../store/UserStore';
import CommonModal from '../design/CommonModal';
import { List } from 'immutable';
import { Exam } from '../../models/Exam';

const LogUp = ({ onClose }: { onClose: () => void }) => {

  const { userDispatch } = useContext(UserContext);
  const mailRef = useRef<HTMLInputElement>(null);
  const passwordREf = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const schoolRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:7158/api/Users/register', {//להוסיף את ה APIENDPOINT
        email: mailRef.current?.value,
        password: passwordREf.current?.value,
        name: nameRef.current?.value,
        school: schoolRef.current?.value,
        role:'user'
      });

        localStorage.setItem("token", res.data.token);
        userDispatch({
          type: 'CREATE',
          new_data: {
            id: res.data.id,
            name: nameRef.current?.value || '',
            password: passwordREf.current?.value || '',
            email: mailRef.current?.value || '',
            school: schoolRef.current?.value || '',
            exams: List <Exam>([]),
            role:'user',
            isLoggedIn: true
          }
        });
        // alert("ההרשמה הצליחה");
        onClose();
      // } catch (error) {
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message || "המשתמש כבר קיים");
      } else {
        alert("ההרשמה לא הצליחה");
      }
      onClose();
      console.error(e);
    }
  }
  return (
    <CommonModal 
      open={true} 
      onClose={onClose} 
      title="הרשמה"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          inputRef={nameRef}
          label="שם"
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          inputRef={mailRef}
          label="מייל"
          variant="outlined"
          fullWidth
          required
        />
                <TextField
          inputRef={schoolRef}
          label="בית ספר"
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
          הירשם
        </Button>
      </form>
    </CommonModal>
  );
};
export default LogUp;



// import React, { useState, useContext } from 'react';
// import { Button, TextField } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../store/UserStore';
// import { signupUser } from '../../services/userService';
// import CommonModal from '../design/CommonModal';

// const LogUp = ({ onClose }: { onClose: () => void }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [school, setSchool] = useState('');
//   const { userDispatch } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const user = await signupUser(name, email, password, school);
//       if (user) {
//         userDispatch({ type: 'CREATE', new_data: user });
//         onClose();
//         navigate('/ExamsDashboard');
//       }
//     } catch (error: any) {
//       alert(error.response?.data?.message || 'הרשמה נכשלה. נסה שוב.');
//     }
//   };

//   return (
//     <CommonModal
//       open={true}
//       onClose={onClose}
//       title="הרשמה"
//     >
//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//         <TextField
//           label="שם"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           variant="outlined"
//           fullWidth
//           required
//         />
//         <TextField
//           label="מייל"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           variant="outlined"
//           fullWidth
//           required
//         />
//         <TextField
//           label="בית ספר"
//           value={school}
//           onChange={(e) => setSchool(e.target.value)}
//           variant="outlined"
//           fullWidth
//           required
//         />
//         <TextField
//           label="סיסמה"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           variant="outlined"
//           fullWidth
//           required
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//         >
//           הירשם
//         </Button>
//       </form>
//     </CommonModal>
//   );
// };

// export default LogUp;