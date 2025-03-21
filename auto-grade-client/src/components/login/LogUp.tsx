
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { FormEvent, useContext, useRef } from 'react';
import { UserContext } from '../../store/UserStore';
import CommonModal from '../design/CommonModal';

const LogUp = ({ onClose }: { onClose: () => void }) => {

  const { userDispatch } = useContext(UserContext);
  const mailRef = useRef<HTMLInputElement>(null);
  const passwordREf = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const schoolRef = useRef<HTMLInputElement>(null);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('', {//להוסיף את ה APIENDPOINT
        mail: mailRef.current?.value,
        password: passwordREf.current?.value
      });
      if (res.data.userId) {
        userDispatch({
          type: 'CREATE',
          new_data: {
            name: nameRef.current?.value || '',
            password: passwordREf.current?.value || '',
            mail: mailRef.current?.value || '',
            school: schoolRef.current?.value || '',
            exams: [],
            roles: [],
            isLoggedIn: true
          }
        });
        alert("ההרשמה הצליחה");
        onClose();
      } else {
        alert("שגיאה בהרשמה");
      }
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        alert(e.response.data.message || "המשתמש כבר קיים");
      } else {
        alert("ההרשמה לא הצליחה");
      }
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