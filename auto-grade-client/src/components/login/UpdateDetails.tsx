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
            const res = await axios.put('http://localhost:5082/api/users', {//לבדוק את ה URL
                mail: currentUser.mail,
                name: nameRef.current?.value || currentUser.name,
                password: passwordRef.current?.value || currentUser.password,
                school: schoolRef.current?.value || currentUser.school

            }, {
                // headers: {
                //     'user-id': currentUser?.id
                // }
            });
            userDispatch({
                type: 'UPDATE',
                new_data: {
                    name: nameRef.current?.value || currentUser.name,
                    password: passwordRef.current?.value || currentUser.password,
                    mail: currentUser.mail,
                    school: schoolRef.current?.value || currentUser.school,
                    roles: currentUser.roles,
                    exams: currentUser.exams, // This line was missing a comma in your original code
                }
            });
            alert("העדכון בוצע בהצלחה");
            onClose();
        } catch (e: any) {
            console.error('Error updating user:', e);
            alert("העדכון נכשל");
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