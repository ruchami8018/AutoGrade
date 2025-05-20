import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../store/UserStore';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import CommonModal from '../design/CommonModal';

interface LoginProps {
  onClose: () => void;
}

const LogIn = ({ onClose }: LoginProps) => {
  const navigate = useNavigate();
  const { userDispatch } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7158/api/Users/login', {
        email: formData.email,
        password: formData.password
      });

      const { token, user } = response.data;
      
      // שמירת הטוקן ב-localStorage
      localStorage.setItem('token', token);
      
      // עדכון ה-state של המשתמש
      userDispatch({
        type: 'CREATE',
        new_data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          school: user.school,
          isLoggedIn: true
        }
      });

      onClose();
      navigate('/ExamsDashboard');
    } catch (error) {
      console.error('Login error:', error);
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
          label="אימייל"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          label="סיסמה"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

export default LogIn;



// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../store/UserStore';
// import { loginUser } from '../../services/userService'; // ייבוא הפונקציה משירות המשתמשים

// interface LoginProps {
//   onClose: () => void;
// }

// const LogIn: React.FC<LoginProps> = ({ onClose }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { userDispatch } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const user = await loginUser(email, password); // שימוש בפונקציה מהשירות
//     if (user) {
//       userDispatch({ type: 'CREATE', new_data: user });
//       onClose();
//       navigate('/ExamsDashboard');
//     } else {
//       alert('התחברות נכשלה. בדוק את האימייל והסיסמה.');
//     }
//   };

//   return (
//     <div>
//       <h2>התחברות</h2>
//       <form onSubmit={handleSubmit}>
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
//           <label htmlFor="password">סיסמה:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit">התחבר</button>
//         <button type="button" onClick={onClose}>
//           ביטול
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LogIn;