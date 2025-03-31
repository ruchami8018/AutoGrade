
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

      // try {
      //   // const response = await register(name, email, password, "User");
      //   const { token, user } = res;
      //   // console.log('tttt' + token);
      //   // console.log('uuuu', user);
      //   localStorage.setItem("token", token);

      //   userDispatch({
      //       type: "REGISTER",
      //       data: user,
      //   });

        localStorage.setItem("token", res.data.token);
        userDispatch({
          type: 'CREATE',
          new_data: {
            name: nameRef.current?.value || '',
            password: passwordREf.current?.value || '',
            mail: mailRef.current?.value || '',
            school: schoolRef.current?.value || '',
            exams: List <Exam>([]),
            roles:'user',
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