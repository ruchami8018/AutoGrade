import { useContext, useEffect, useState } from 'react';
import { Container, Button, Typography, Box, Card, CardContent, CardActions, IconButton, Tooltip } from '@mui/material';
import { UserContext } from '../../store/UserStore';
import { ExamsContext } from '../../store/ExamsStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Exam } from '../../models/Exam';
import DeleteExam from './DeleteExam';
import { fetchExamsByUser } from '../../services/examService';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';


const ExamsDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  // const { state, dispatch } = useContext(ExamsContext);
  const [examToDelete, setExamToDelete] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [exams, setExams] = useState<Exam[]>([]);
  
  // פונקציה לצפייה בקובץ המבחן
  const viewExamFile = (exam: Exam) => {
    if (exam.exampleExamPath) {
      window.open(exam.exampleExamPath, '_blank');
    } else {
      alert('אין קובץ מבחן זמין לצפייה');
    }
  };
  
  // פונקציה להורדת קובץ המבחן
  const downloadExamFile = (exam: Exam) => {
    if (exam.exampleExamPath) {
      // יצירת אלמנט a זמני להורדת הקובץ
      const link = document.createElement('a');
      link.href = exam.exampleExamPath;
      link.download = `${exam.title}.${getFileExtension(exam.contentType)}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('אין קובץ מבחן זמין להורדה');
    }
  };
  
  // פונקציה עזר לקבלת סיומת הקובץ מסוג התוכן
  const getFileExtension = (contentType: string): string => {
    const extensionMap: {[key: string]: string} = {
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
      'application/vnd.ms-excel': 'xls',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
      'image/jpeg': 'jpg',
      'image/png': 'png'
    };
    
    return extensionMap[contentType] || 'pdf'; // ברירת מחדל היא pdf אם הסוג לא מוכר
  };

  // useEffect(() => {
  //   const fetchExams = async () => {
  //     try {
  //       dispatch({ type: "FETCH_EXAMS_START" });
  //       const response = await axios.get(`https://localhost:7158/api/Exam/user/${currentUser.id}`);
  //       dispatch({ type: "FETCH_EXAMS_SUCCESS", payload: response.data });
  //     } catch (error) {
  //       console.error('Error fetching exams:', error);
  //       dispatch({ type: "FETCH_EXAMS_ERROR", payload: 'Failed to fetch exams' });
  //     }
  //   } ;

  //   fetchExams();
  // }, [currentUser.id]);

  useEffect(() => {
    const loadExams = async () => {
        try {
            if (!currentUser.id) {
                setError("משתמש לא מחובר");
                setLoading(false);
                return;
            }
            const examsData = await fetchExamsByUser(currentUser.id);
            console.log("Fetched exams:", examsData);
            setExams(examsData);
        } catch (err) {
            setError("שגיאה בטעינת המבחנים");
        } finally {
            setLoading(false);
        }
    };
    loadExams();
    }, [currentUser.id]);
  // return (
  //   <Container maxWidth="lg">
  //     <Box sx={{ mt: 4, mb: 4 }}>
  //       <Typography variant="h4" component="h1" gutterBottom>
  //         המבחנים שלי
  //       </Typography>
  //       <Button 
  //         variant="contained" 
  //         color="primary" 
  //         onClick={() => navigate('/add-exam')}
  //         sx={{ mb: 2 }}
  //       >
  //         הוסף מבחן חדש
  //       </Button>

  //       {state.loading ? (
  //         <Typography>טוען מבחנים...</Typography>
  //       ) : state.error ? (
  //         <Typography color="error">{state.error}</Typography>
  //       ) : (
  //         <Box sx={{ 
  //           display: 'grid',
  //           gridTemplateColumns: {
  //             xs: '1fr',
  //             sm: 'repeat(2, 1fr)',
  //             md: 'repeat(3, 1fr)'
  //           },
  //           gap: 3
  //         }}>
  //           {state.exams.map((exam: Exam) => (
  //             <Card key={exam.id}>
  //               <CardContent>
  //                 <Typography variant="h6" component="h2">
  //                   {exam.title}
  //                 </Typography>
  //                 <Typography color="textSecondary">
  //                   נושא: {exam.subject}
  //                 </Typography>
  //                 <Typography color="textSecondary">
  //                   תאריך יצירה: {new Date(exam.createdAt).toLocaleDateString('he-IL')}
  //                 </Typography>
  //               </CardContent>
  //               <CardActions>
  //                 <Button 
  //                   size="small" 
  //                   onClick={() => navigate(`/exam/${exam.id}/update`)}
  //                 >
  //                   ערוך
  //                 </Button>
  //                 <Button 
  //                   size="small" 
  //                   color="error"
  //                   onClick={() => setExamToDelete(exam.id)}
  //                 >
  //                   מחק
  //                 </Button>
  //               </CardActions>
  //             </Card>
  //           ))}
  //         </Box>
  //       )}
  //     </Box>

  //     {examToDelete !== null && (
  //       <DeleteExam 
  //         examId={examToDelete} 
  //         open={true} 
  //         onClose={() => setExamToDelete(null)} 
  //       />
  //     )}
  //   </Container>
  // );

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
        ) : (
          exams.length > 0 ? (
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: 3
            }}>
              {exams.map((exam: Exam) => (
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
                    
                    {/* כפתור עין לצפייה בקובץ */}
                    <Tooltip title="צפה בקובץ המבחן">
                      <IconButton 
                        size="small" 
                        color="primary" 
                        onClick={() => viewExamFile(exam)}
                        disabled={!exam.exampleExamPath}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    
                    {/* כפתור הורדה */}
                    <Tooltip title="הורד את קובץ המבחן">
                      <IconButton 
                        size="small" 
                        color="primary" 
                        onClick={() => downloadExamFile(exam)}
                        disabled={!exam.exampleExamPath}
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography>אין מבחנים להציג</Typography>
          )
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




// =======================FROM GEMINY========

// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../../store/UserStore';
// import { ExamsContext } from '../../store/ExamsStore';
// import { fetchExamsByUser } from '../../services/examService'; // ייבוא הפונקציה משירות המבחנים
// import DeleteExam from './DeleteExam';

// const ExamsDashboard = () => {
//     const { currentUser } = useContext(UserContext);
//     const { state, dispatch } = useContext(ExamsContext);
//     const navigate = useNavigate();
//     const [deleteExamId, setDeleteExamId] = useState<number | null>(null);

//     useEffect(() => {
//         const loadExams = async () => {
//             if (currentUser.id) {
//                 dispatch({ type: 'FETCH_EXAMS_START' });
//                 try {
//                     const exams = await fetchExamsByUser(currentUser.id);
//                     dispatch({ type: 'FETCH_EXAMS_SUCCESS', payload: exams });
//                 } catch (error) {
//                     dispatch({ type: 'FETCH_EXAMS_ERROR', payload: 'שגיאה בטעינת המבחנים.' });
//                     console.error('שגיאה בטעינת המבחנים:', error);
//                 }
//             }
//         };

//         loadExams();
//     }, [currentUser.id, dispatch]);

//     const handleAddExam = () => {
//         navigate('/add-exam');
//     };

//     const handleUpdateExam = (examId: number) => {
//         navigate(`/update-exam/${examId}`);
//     };

//     const handleUploadExam = (examId: number) => {
//         navigate(`/upload-student-exam/${examId}`);
//     };

//     const openDeleteModal = (examId: number) => {
//         setDeleteExamId(examId);
//     };

//     const closeDeleteModal = () => {
//         setDeleteExamId(null);
//     };

//     if (state.loading) {
//         return <div>טוען מבחנים...</div>;
//     }

//     if (state.error) {
//         return <div>שגיאה: {state.error}</div>;
//     }

//     return (
//         <div>
//             <h2>רשימת המבחנים שלי</h2>
//             <button onClick={handleAddExam}>הוסף מבחן חדש</button>
//             {state.exams.isEmpty() ? (
//                 <p>אין מבחנים כרגע.</p>
//             ) : (
//                 <ul>
//                     {state.exams.map(exam => (
//                         <li key={exam.id}>
//                             {exam.title} ({exam.subject})
//                             <button onClick={() => handleUpdateExam(exam.id)}>עדכן</button>
//                             <button onClick={() => handleUploadExam(exam.id)}>העלה פתרונות</button>
//                             <button onClick={() => openDeleteModal(exam.id)}>מחק</button>
//                         </li>
//                     ))}
//                 </ul>
//             )}

//             {deleteExamId !== null && (
//                 <DeleteExam examId={deleteExamId} onClose={closeDeleteModal} />
//             )}
//         </div>
//     );
// };

// export default ExamsDashboard;