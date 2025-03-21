import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useContext, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/UserStore";
import CommonModal from "../design/CommonModal";

const Login = ({ onClose }: { onClose: () => void }) => {
    const { userDispatch } = useContext(UserContext);
    const mailRef = useRef<HTMLInputElement>(null);
    const passwordREf = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('',//למלא את ה URL
                {
                    mail: mailRef.current?.value,
                    password: passwordREf.current?.value
                })
            userDispatch({
                type: 'CREATE',
                new_data: {
                    password: res.data.user.password || '',
                    name: res.data.user.name || mailRef.current?.value || '',
                    mail: res.data.user.mail || '',
                    school: res.data.user.school || '',
                    roles: res.data.user.roles || [],
                    exams: res.data.user.exams || [],
                    isLoggedIn: true
                }
            });
            onClose();
        }
        catch (e: any) {
            if (e.status === 401) {
                alert("שם משתמש או סיסמה אינם נכונים");
            }
        }
    }
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