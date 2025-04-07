import { useContext, useEffect, useState } from 'react';
import { Container, Button, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import { UserContext } from '../../store/UserStore';
import { ExamsContext } from '../../store/ExamsStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Exam } from '../../models/Exam';
import DeleteExam from './DeleteExam';

const ExamsDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { state, dispatch } = useContext(ExamsContext);
  const [examToDelete, setExamToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        dispatch({ type: "FETCH_EXAMS_START" });
        const response = await axios.get(`https://localhost:7158/api/Exam/user/${currentUser.id}`);
        dispatch({ type: "FETCH_EXAMS_SUCCESS", payload: response.data });
      } catch (error) {
        console.error('Error fetching exams:', error);
        dispatch({ type: "FETCH_EXAMS_ERROR", payload: 'Failed to fetch exams' });
      }
    };

    fetchExams();
  }, [currentUser.id, dispatch]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          המבחנים שלי
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/add-exam')}
          sx={{ mb: 2 }}
        >
          הוסף מבחן חדש
        </Button>

        {state.loading ? (
          <Typography>טוען מבחנים...</Typography>
        ) : state.error ? (
          <Typography color="error">{state.error}</Typography>
        ) : (
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 3
          }}>
            {state.exams.map((exam: Exam) => (
              <Card key={exam.id}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {exam.title}
                  </Typography>
                  <Typography color="textSecondary">
                    נושא: {exam.subject}
                  </Typography>
                  <Typography color="textSecondary">
                    תאריך יצירה: {new Date(exam.createdAt).toLocaleDateString('he-IL')}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => navigate(`/exam/${exam.id}/update`)}
                  >
                    ערוך
                  </Button>
                  <Button 
                    size="small" 
                    color="error"
                    onClick={() => setExamToDelete(exam.id)}
                  >
                    מחק
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {examToDelete !== null && (
        <DeleteExam 
          examId={examToDelete} 
          open={true} 
          onClose={() => setExamToDelete(null)} 
        />
      )}
    </Container>
  );
};

export default ExamsDashboard;