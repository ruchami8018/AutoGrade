// import { useState, useContext, useEffect } from 'react';
// import { Container, TextField, Button, Box, Typography } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
// import { UserContext } from '../../store/UserStore';
// import { ExamsContext } from '../../store/ExamsStore';
// import axios from 'axios';
// import { CloudUpload } from '@mui/icons-material';

// const UpdateExam = () => {
//   const navigate = useNavigate();
//   const { examId } = useParams<{ examId: string }>();
//   const { currentUser } = useContext(UserContext);
//   const { dispatch } = useContext(ExamsContext);
  
//   const [examData, setExamData] = useState({
//     subject: '',
//     title: '',
//     class: '',
//     exampleExamPath: ''
//   });
  
//   const [file, setFile] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);

//   useEffect(() => {
//     const fetchExam = async () => {
//       try {
//         const response = await axios.put(`https://localhost:7158/api/Exam/${examId}`);
//         const exam = response.data;
//         setExamData({
//           subject: exam.subject,
//           title: exam.title,
//           class: exam.class,
//           exampleExamPath: exam.exampleExamPath
//         });
//       } catch (error) {
//         console.error('Error fetching exam:', error);
//       }
//     };

//     if (examId) {
//       fetchExam();
//     }
//   }, [examId]);

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = async (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       const droppedFile = e.dataTransfer.files[0];
//       setFile(droppedFile);
//       await uploadFile(droppedFile);
//     }
//   };

//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
//       setFile(selectedFile);
//       await uploadFile(selectedFile);
//     }
//   };

//   const uploadFile = async (fileToUpload: File) => {
//     try {
//       // 1. קבלת URL להעלאה מהשרת
//       const presignedUrlResponse = await axios.get(`https://localhost:7158/api/ExamUpload/presigned-url`, {
//         params: { fileName: fileToUpload.name }
//       });
      
//       const uploadUrl = presignedUrlResponse.data.url;

//       // 2. העלאת הקובץ ל-S3
//       await axios.put(uploadUrl, fileToUpload, {
//         headers: {
//           'Content-Type': fileToUpload.type
//         }
//       });

//       // 3. עדכון ה-state עם הנתיב לקובץ
//       setExamData(prev => ({
//         ...prev,
//         exampleExamPath: uploadUrl.split('?')[0] // שומרים רק את ה-URL הבסיסי ללא פרמטרים
//       }));

//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`https://localhost:7158/api/Exam/${examId}`, {
//         id: examId,
//         userId: currentUser.id,
//         ...examData
//       });

//       dispatch({
//         type: "UPDATE_EXAM",
//         payload: response.data
//       });

//       navigate('/ExamsDashboard');
//     } catch (error) {
//       console.error('Error updating exam:', error);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <h2>עדכון מבחן</h2>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="נושא"
//           value={examData.subject}
//           onChange={(e) => setExamData({ ...examData, subject: e.target.value })}
//           margin="normal"
//           // required
//         />
//         <TextField
//           fullWidth
//           label="כותרת"
//           value={examData.title}
//           onChange={(e) => setExamData({ ...examData, title: e.target.value })}
//           margin="normal"
//           // required
//         />
//         <TextField
//           fullWidth
//           label="כיתה"
//           value={examData.class}
//           onChange={(e) => setExamData({ ...examData, class: e.target.value })}
//           margin="normal"
//           // required
//         />
        
//         <Box
//           sx={{
//             mt: 2,
//             p: 3,
//             border: '2px dashed',
//             borderColor: isDragging ? 'primary.main' : 'grey.300',
//             borderRadius: 1,
//             textAlign: 'center',
//             bgcolor: isDragging ? 'action.hover' : 'background.paper',
//             cursor: 'pointer'
//           }}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           onClick={() => document.getElementById('fileInput')?.click()}
//         >
//           <input
//             type="file"
//             id="fileInput"
//             style={{ display: 'none' }}
//             onChange={handleFileSelect}
//           />
//           <CloudUpload sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
//           <Typography>
//             {file ? file.name : examData.exampleExamPath ? 'החלף קובץ קיים' : 'גרור לכאן קובץ או לחץ לבחירה'}
//           </Typography>
//         </Box>

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//           disabled={!examData.subject || !examData.title || !examData.class}
//         >
//           עדכן מבחן
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default UpdateExam;

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
    // נוודא ש- examId קיים לפני שאנו שולחים בקשת API
    if (!examId) {
      console.error('Exam ID is missing');
      return;
    }

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

    fetchExam();
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
      const presignedUrlResponse = await axios.get(`https://localhost:7158/api/ExamUpload/presigned-url`, {
        params: { fileName: fileToUpload.name }
      });
      
      const uploadUrl = presignedUrlResponse.data.url;

      await axios.put(uploadUrl, fileToUpload, {
        headers: {
          'Content-Type': fileToUpload.type
        }
      });

      setExamData(prev => ({
        ...prev,
        exampleExamPath: uploadUrl.split('?')[0]
      }));

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // נוודא ש- examId קיים
    if (!examId) {
      console.error('Exam ID is missing');
      return;
    }

    // הכנת אובייקט עדכון שנשלח רק עם שדות ששונו
    const updatedExamData: any = {};

    if (examData.subject !== '') updatedExamData.subject = examData.subject;
    if (examData.title !== '') updatedExamData.title = examData.title;
    if (examData.class !== '') updatedExamData.class = examData.class;
    if (examData.exampleExamPath !== '') updatedExamData.exampleExamPath = examData.exampleExamPath;

    try {
      const response = await axios.put(`https://localhost:7158/api/Exam/${examId}`, {
        id: examId,
        userId: currentUser.id,
        ...updatedExamData // שליחת רק שדות ששונו
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
        />
        <TextField
          fullWidth
          label="כותרת"
          value={examData.title}
          onChange={(e) => setExamData({ ...examData, title: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="כיתה"
          value={examData.class}
          onChange={(e) => setExamData({ ...examData, class: e.target.value })}
          margin="normal"
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
          disabled={!(examData.subject || examData.title || examData.class || file)}
        >
          עדכן מבחן
        </Button>
      </form>
    </Container>
  );
};

export default UpdateExam;
