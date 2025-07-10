import { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ExamsContext } from '../../store_NOT_IN_USE/ExamsStore_NU';
import axios from 'axios';

interface DeleteExamProps {
  examId: number;
  open: boolean;
  onClose: () => void;
}

const DeleteExam = ({ examId, open, onClose }: DeleteExamProps) => {
  const { dispatch } = useContext(ExamsContext);
  console.log("examId:", examId, "typeof:", typeof examId);
  const Api_base=import.meta.env.VITE_REACT_APP_BASE_API_URL;


  const isValidExamId = typeof examId === 'number' && examId > 0;

  const handleDelete = async () => {
    if (!isValidExamId) {
      console.error('Invalid exam ID. Cannot delete.');
      return;
    }

    try {
      await axios.delete(`${Api_base}/Exam/${examId}`);
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
        <Button 
          onClick={handleDelete} 
          color="error" 
          autoFocus 
          disabled={!isValidExamId}
        >
          מחק
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteExam;
