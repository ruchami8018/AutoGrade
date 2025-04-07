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