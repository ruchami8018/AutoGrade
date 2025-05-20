import { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ExamsContext } from '../../store/ExamsStore';
import axios from 'axios';

interface DeleteExamProps {
  examId: number;
  open: boolean;
  onClose: () => void;
}

const DeleteExam = ({ examId, open, onClose }: DeleteExamProps) => {
  const { dispatch } = useContext(ExamsContext);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7158/api/Exam/${examId}`);
      dispatch({ type: 'DELETE_EXAM', payload: examId });
      onClose();
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>מחיקת מבחן</DialogTitle>
      <DialogContent>
        האם אתה בטוח שברצונך למחוק את המבחן?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button onClick={handleDelete} color="error" autoFocus>
          מחק
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteExam;


// =======================FROM GEMINY========

// import React, { useContext } from 'react';
// import { ExamsContext } from '../../store/ExamsStore';
// import { deleteExam } from '../../services/examService'; // ייבוא הפונקציה משירות המבחנים

// interface DeleteExamProps {
//     examId: number;
//     onClose: () => void;
// }

// const DeleteExam = ({ examId, onClose }: DeleteExamProps) => {
//     const { dispatch } = useContext(ExamsContext);

//     const handleDelete = async () => {
//         try {
//             const success = await deleteExam(examId);
//             if (success) {
//                 dispatch({ type: 'DELETE_EXAM', payload: examId });
//                 onClose();
//                 alert('המבחן נמחק בהצלחה.');
//             } else {
//                 alert('שגיאה במחיקת המבחן.');
//             }
//         } catch (error) {
//             alert('שגיאה במחיקת המבחן.');
//             console.error('שגיאה במחיקת המבחן:', error);
//         }
//     };

//     return (
//         <div>
//             <h3>האם אתה בטוח שברצונך למחוק מבחן זה?</h3>
//             <button onClick={handleDelete}>מחק</button>
//             <button onClick={onClose}>ביטול</button>
//         </div>
//     );
// };

// export default DeleteExam;