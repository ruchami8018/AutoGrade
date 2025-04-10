// import { useContext, useEffect, useState } from 'react';
// import { Container, Button, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
// import { UserContext } from '../../store/UserStore';
// import { ExamsContext } from '../../store/ExamsStore';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Exam } from '../../models/Exam';
// import DeleteExam from './DeleteExam';
// import { fetchExamsByUser } from '../../services/examService';

// const ExamsDashboard = () => {
//   const navigate = useNavigate();
//   const { currentUser } = useContext(UserContext);
//   // const { state, dispatch } = useContext(ExamsContext);
//   const [examToDelete, setExamToDelete] = useState<number | null>(null);

//   const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>("");
//     const [exams, setExams] = useState<Exam[]>([]);

//   // useEffect(() => {
//   //   const fetchExams = async () => {
//   //     try {
//   //       dispatch({ type: "FETCH_EXAMS_START" });
//   //       const response = await axios.get(`https://localhost:7158/api/Exam/user/${currentUser.id}`);
//   //       dispatch({ type: "FETCH_EXAMS_SUCCESS", payload: response.data });
//   //     } catch (error) {
//   //       console.error('Error fetching exams:', error);
//   //       dispatch({ type: "FETCH_EXAMS_ERROR", payload: 'Failed to fetch exams' });
//   //     }
//   //   } ;

//   //   fetchExams();
//   // }, [currentUser.id]);

//   useEffect(() => {
//     const loadExams = async () => {
//         try {
//             if (!currentUser.id) {
//                 setError("משתמש לא מחובר");
//                 setLoading(false);
//                 return;
//             }
//             const examsData = await fetchExamsByUser(currentUser.id);
//             console.log("Fetched exams:", examsData);
//             setExams(examsData);
//         } catch (err) {
//             setError("שגיאה בטעינת המבחנים");
//         } finally {
//             setLoading(false);
//         }
//     };
//     loadExams();
//     }, [currentUser.id]);
//   // return (
//   //   <Container maxWidth="lg">
//   //     <Box sx={{ mt: 4, mb: 4 }}>
//   //       <Typography variant="h4" component="h1" gutterBottom>
//   //         המבחנים שלי
//   //       </Typography>
//   //       <Button 
//   //         variant="contained" 
//   //         color="primary" 
//   //         onClick={() => navigate('/add-exam')}
//   //         sx={{ mb: 2 }}
//   //       >
//   //         הוסף מבחן חדש
//   //       </Button>

//   //       {state.loading ? (
//   //         <Typography>טוען מבחנים...</Typography>
//   //       ) : state.error ? (
//   //         <Typography color="error">{state.error}</Typography>
//   //       ) : (
//   //         <Box sx={{ 
//   //           display: 'grid',
//   //           gridTemplateColumns: {
//   //             xs: '1fr',
//   //             sm: 'repeat(2, 1fr)',
//   //             md: 'repeat(3, 1fr)'
//   //           },
//   //           gap: 3
//   //         }}>
//   //           {state.exams.map((exam: Exam) => (
//   //             <Card key={exam.id}>
//   //               <CardContent>
//   //                 <Typography variant="h6" component="h2">
//   //                   {exam.title}
//   //                 </Typography>
//   //                 <Typography color="textSecondary">
//   //                   נושא: {exam.subject}
//   //                 </Typography>
//   //                 <Typography color="textSecondary">
//   //                   תאריך יצירה: {new Date(exam.createdAt).toLocaleDateString('he-IL')}
//   //                 </Typography>
//   //               </CardContent>
//   //               <CardActions>
//   //                 <Button 
//   //                   size="small" 
//   //                   onClick={() => navigate(`/exam/${exam.id}/update`)}
//   //                 >
//   //                   ערוך
//   //                 </Button>
//   //                 <Button 
//   //                   size="small" 
//   //                   color="error"
//   //                   onClick={() => setExamToDelete(exam.id)}
//   //                 >
//   //                   מחק
//   //                 </Button>
//   //               </CardActions>
//   //             </Card>
//   //           ))}
//   //         </Box>
//   //       )}
//   //     </Box>

//   //     {examToDelete !== null && (
//   //       <DeleteExam 
//   //         examId={examToDelete} 
//   //         open={true} 
//   //         onClose={() => setExamToDelete(null)} 
//   //       />
//   //     )}
//   //   </Container>
//   // );

//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ mt: 4, mb: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           המבחנים שלי
//         </Typography>
//         <Button 
//           variant="contained" 
//           color="primary" 
//           onClick={() => navigate('/add-exam')}
//           sx={{ mb: 2 }}
//         >
//           הוסף מבחן חדש
//         </Button>
  
//         {loading ? (
//           <Typography>טוען מבחנים...</Typography>
//         ) : error ? (
//           <Typography color="error">{error}</Typography>
//         ) : (
//           exams.length > 0 ? (
//             <Box sx={{
//               display: 'grid',
//               gridTemplateColumns: {
//                 xs: '1fr',
//                 sm: 'repeat(2, 1fr)',
//                 md: 'repeat(3, 1fr)'
//               },
//               gap: 3
//             }}>
//               {exams.map((exam: Exam) => (
//                 <Card key={exam.id}>
//                   <CardContent>
//                     <Typography variant="h6" component="h2">
//                       {exam.title}
//                     </Typography>
//                     <Typography color="textSecondary">
//                       נושא: {exam.subject}
//                     </Typography>
//                     <Typography color="textSecondary">
//                       תאריך יצירה: {new Date(exam.createdAt).toLocaleDateString('he-IL')}
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Button 
//                       size="small" 
//                       onClick={() => navigate(`/exam/${exam.id}/update`)}
//                     >
//                       ערוך
//                     </Button>
//                     <Button 
//                       size="small" 
//                       color="error"
//                       onClick={() => setExamToDelete(exam.id)}
//                     >
//                       מחק
//                     </Button>
//                   </CardActions>
//                 </Card>
//               ))}
//             </Box>
//           ) : (
//             <Typography>אין מבחנים להציג</Typography>
//           )
//         )}
//       </Box>
  
//       {examToDelete !== null && (
//         <DeleteExam 
//           examId={examToDelete} 
//           open={true} 
//           onClose={() => setExamToDelete(null)} 
//         />
//       )}
//     </Container>
//   );
  

// };

// export default ExamsDashboard;

import { useContext, useEffect, useState } from 'react';
import { Container, Button, Typography, Box, Card, CardContent, CardActions } from '@mui/material';
import { UserContext } from '../../store/UserStore';
import { useNavigate } from 'react-router-dom';
import { Exam } from '../../models/Exam';
import DeleteExam from './DeleteExam';
import { fetchExamsByUser } from '../../services/examService';

const ExamsDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [examToDelete, setExamToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [exams, setExams] = useState<Exam[]>([]);

  // פונקציה לטעינת המבחנים
  const loadExams = async () => {
    try {
      if (!currentUser.isLoggedIn) {
        setError("משתמש לא מחובר");
        setLoading(false);
        return;
      }
      const examsData = await fetchExamsByUser(currentUser.id);
      setExams(examsData);
    } catch (err) {
      setError("שגיאה בטעינת המבחנים");
    } finally {
      setLoading(false);
    }
  };

  // טעינת המבחנים בהשפעת ה-currentUser.id
  useEffect(() => {
    loadExams();
  }, [currentUser.id]);

  // פונקציה למחיקת מבחן מתוך הסטייט
  const handleDeleteSuccess = (examId: number) => {
    setExams((prevExams) => prevExams.filter((exam) => exam.id !== examId));
  };

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

        {loading ? (
          <Typography>טוען מבחנים...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : exams.length > 0 ? (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}>
            {exams.map((exam) => (
              <Card key={exam.id}>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {exam.title}
                  </Typography>
                  <Typography color="textSecondary">
                    נושא: {exam.subject}
                  </Typography>
                  {/* <Typography color="textSecondary">
                    תאריך יצירה: {new Date(exam.createdAt).toLocaleDateString('he-IL')}
                  </Typography> */}
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/update-exam`)}
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
        ) : (
          <Typography>אין מבחנים להציג</Typography>
        )}
      </Box>

      {examToDelete !== null && (
        <DeleteExam
          examId={examToDelete}
          open={true}
          onClose={() => setExamToDelete(null)}
          onDeleteSuccess={handleDeleteSuccess}  // העברת הפונקציה למחיקה
        />
      )}
    </Container>
  );
};

export default ExamsDashboard;
