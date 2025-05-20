import { useState, useContext, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../store/UserStore';
import { ExamsContext } from '../../store/ExamsStore';
import axios from 'axios';
import { CloudUpload } from '@mui/icons-material';

const UpdateExam = () => {
  const navigate = useNavigate();
  const { examId } = useParams<{ examId: string }>();
  const { currentUser } = useContext(UserContext);
  const { dispatch } = useContext(ExamsContext);
  
  const [examData, setExamData] = useState({
    subject: '',
    title: '',
    class: '',
    exampleExamPath: ''
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await axios.put(`https://localhost:7158/api/Exam/${examId}`);
        const exam = response.data;
        setExamData({
          subject: exam.subject,
          title: exam.title,
          class: exam.class,
          exampleExamPath: exam.exampleExamPath
        });
      } catch (error) {
        console.error('Error fetching exam:', error);
      }
    };

    if (examId) {
      fetchExam();
    }
  }, [examId]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      await uploadFile(droppedFile);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      await uploadFile(selectedFile);
    }
  };

  const uploadFile = async (fileToUpload: File) => {
    try {
      // 1. קבלת URL להעלאה מהשרת
      const presignedUrlResponse = await axios.get(`https://localhost:7158/api/ExamUpload/presigned-url`, {
        params: { fileName: fileToUpload.name }
      });
      
      const uploadUrl = presignedUrlResponse.data.url;

      // 2. העלאת הקובץ ל-S3
      await axios.put(uploadUrl, fileToUpload, {
        headers: {
          'Content-Type': fileToUpload.type
        }
      });

      // 3. עדכון ה-state עם הנתיב לקובץ
      setExamData(prev => ({
        ...prev,
        exampleExamPath: uploadUrl.split('?')[0] // שומרים רק את ה-URL הבסיסי ללא פרמטרים
      }));

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://localhost:7158/api/Exam/${examId}`, {
        id: examId,
        userId: currentUser.id,
        ...examData
      });

      dispatch({
        type: "UPDATE_EXAM",
        payload: response.data
      });

      navigate('/ExamsDashboard');
    } catch (error) {
      console.error('Error updating exam:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>עדכון מבחן</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="נושא"
          value={examData.subject}
          onChange={(e) => setExamData({ ...examData, subject: e.target.value })}
          margin="normal"
          // required
        />
        <TextField
          fullWidth
          label="כותרת"
          value={examData.title}
          onChange={(e) => setExamData({ ...examData, title: e.target.value })}
          margin="normal"
          // required
        />
        <TextField
          fullWidth
          label="כיתה"
          value={examData.class}
          onChange={(e) => setExamData({ ...examData, class: e.target.value })}
          margin="normal"
          // required
        />
        
        <Box
          sx={{
            mt: 2,
            p: 3,
            border: '2px dashed',
            borderColor: isDragging ? 'primary.main' : 'grey.300',
            borderRadius: 1,
            textAlign: 'center',
            bgcolor: isDragging ? 'action.hover' : 'background.paper',
            cursor: 'pointer'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
          <CloudUpload sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography>
            {file ? file.name : examData.exampleExamPath ? 'החלף קובץ קיים' : 'גרור לכאן קובץ או לחץ לבחירה'}
          </Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={!examData.subject || !examData.title || !examData.class}
        >
          עדכן מבחן
        </Button>
      </form>
    </Container>
  );
};

export default UpdateExam;


// =======================FROM GEMINY========

// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fetchExamById, updateExam } from '../../services/examService';
// import { UserContext } from '../../store/UserStore'; // ייבוא הפונקציות משירות המבחנים

// const UpdateExam = () => {
//     const { examId } = useParams();
//     const navigate = useNavigate();
//     const { currentUser } = useContext(UserContext);
//     const [subject, setSubject] = useState('');
//     const [title, setTitle] = useState('');
//     const [classNumber, setClassNumber] = useState<number>(0);
//     const [exampleExamPath, setExampleExamPath] = useState(''); // הוספת סטייט עבור נתיב קובץ לדוגמה

//     useEffect(() => {
//         const loadExamDetails = async () => {
//             if (examId) {
//                 try {
//                     const examDetails = await fetchExamById(Number(examId));
//                     if (examDetails) {
//                         setSubject(examDetails.subject);
//                         setTitle(examDetails.title);
//                         setClassNumber(examDetails.class);
//                         setExampleExamPath(examDetails.exampleExamPath || ''); // טעינת נתיב קובץ לדוגמה
//                     }
//                 } catch (error) {
//                     alert('שגיאה בטעינת פרטי המבחן.');
//                     console.error('שגיאה בטעינת פרטי המבחן:', error);
//                 }
//             }
//         };

//         loadExamDetails();
//     }, [examId]);

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         if (examId) {
//             try {
//                 if (!currentUser.id) {
//                     throw new Error('משתמש לא מחובר');
//                 }
//                 await updateExam(Number(examId), currentUser.id, subject, title, classNumber, exampleExamPath);
//                 navigate('/ExamsDashboard');
//                 alert('המבחן עודכן בהצלחה.');
//             } catch (error) {
//                 alert('שגיאה בעדכון המבחן.');
//                 console.error('שגיאה בעדכון המבחן:', error);
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>עדכון מבחן</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="subject">נושא:</label>
//                     <input
//                         type="text"
//                         id="subject"
//                         value={subject}
//                         onChange={(e) => setSubject(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="title">כותרת:</label>
//                     <input
//                         type="text"
//                         id="title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="classNumber">כיתה:</label>
//                     <input
//                         type="number"
//                         id="classNumber"
//                         value={classNumber}
//                         onChange={(e) => setClassNumber(Number(e.target.value))}
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="exampleExamPath">נתיב קובץ לדוגמה:</label>
//                     <input
//                         type="text"
//                         id="exampleExamPath"
//                         value={exampleExamPath}
//                         onChange={(e) => setExampleExamPath(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">עדכן מבחן</button>
//                 <button type="button" onClick={() => navigate('/ExamsDashboard')}>
//                     ביטול
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default UpdateExam;