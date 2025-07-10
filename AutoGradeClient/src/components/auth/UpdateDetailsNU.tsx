import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useContext, useRef, FormEvent } from "react";
import { UserContext } from "../../context/UserReducer";
import CommonModal from "../design_NOT_IN_USE/CommonModal";

const Update = ({ onClose }: { onClose: () => void }) => {

    const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_API_URL!;
    const API_UPDATE_URL = `${API_BASE_URL}/api/Users/update`;
    const { user, userDispatch } = useContext(UserContext);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const schoolRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.put(API_UPDATE_URL, {//לבדוק את ה URL
                email: user.email,
                password: passwordRef.current?.value || user.password,
                // school: schoolRef.current?.value || currentUser.school, ---N
                name: nameRef.current?.value || user.name
            }, {
            });
            localStorage.setItem("token", res.data.token);
            userDispatch({
                type: 'UPDATE',
                data: {
                    name: nameRef.current?.value || user.name,
                    password: passwordRef.current?.value || user.password,
                    email: user.email,
                    // school: schoolRef.current?.value || currentUser.school, ---N
                    role: user.role,
                    exams: user.exams, // This line was missing a comma in your original code
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
                    defaultValue={user.name}
                />
                <TextField
                    inputRef={passwordRef}
                    label="סיסמה"
                    variant="outlined"
                    fullWidth
                    defaultValue={user.password}
                />
                <TextField
                    inputRef={schoolRef}
                    label="בית ספר"
                    type="text"
                    variant="outlined"
                    fullWidth
                    // defaultValue={currentUser.school}
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

