// import { useState, useContext } from 'react';
// import { Container, TextField, Button, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../store/UserStore';
// import axios from 'axios';
// import { CloudUpload } from '@mui/icons-material';

// const AddExam = () => {
//   const navigate = useNavigate();
//   const { currentUser } = useContext(UserContext);
//   const [examData, setExamData] = useState({
//     subject: '',
//     title: '',
//     class: '',
//     exampleExamPath: ''
//   });
//   const [file, setFile] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);

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

//   // const uploadFile = async (fileToUpload: File) => {
//   //   try {
//   //     console.log('file type:', fileToUpload.type);
  
//   //     const presignedUrlResponse = await axios.get(`https://localhost:7158/api/ExamUpload/presigned-url`, {
//   //       params: {
//   //         fileName: fileToUpload.name
//   //         // 👇 אל תשלחי Content-Type לשרת כרגע
//   //         // contentType: fileToUpload.type
//   //       }
//   //     });
  
//   //     const uploadUrl = presignedUrlResponse.data.url;
  
//   //     // 👇 כאן תשלחי את הקובץ בלי headers
//   //     await axios.put(uploadUrl, fileToUpload);
  
//   //     // שמירת הנתיב של הקובץ ללא פרמטרים
//   //     setExamData(prev => ({
//   //       ...prev,
//   //       exampleExamPath: uploadUrl.split('?')[0]
//   //     }));
  
//   //   } catch (error) {
//   //     console.error('Error uploading file:', error);
//   //   }
//   // };
  

//   const uploadFile = async (fileToUpload: File) => {
//     try {
//       // 1. בקשת כתובת URL זמנית מהשרת, כולל Content-Type
//       const presignedUrlResponse = await axios.get(`https://localhost:7158/api/ExamUpload/presigned-url`, {
//         params: {
//           fileName: fileToUpload.name,
//           contentType: fileToUpload.type  // ⬅️ שליחת סוג הקובץ לשרת
//         }
//       });
  
//       const uploadUrl = presignedUrlResponse.data.url;
  
//       // 2. העלאת הקובץ ל-S3, עם Content-Type מתאים
//       await axios.put(uploadUrl, fileToUpload, {
//         headers: {
//           'Content-Type': fileToUpload.type  // ⬅️ שליחת Content-Type תואם
//         }
//       });
  
//       // 3. עדכון הנתיב לקובץ ב-state
//       setExamData(prev => ({
//         ...prev,
//         exampleExamPath: uploadUrl.split('?')[0]  // שומרים רק את הנתיב ללא חתימה
//       }));
  
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };
  

//   // const uploadFile = async (fileToUpload: File) => {
//   //   try {
//   //     // 1. קבלת URL להעלאה מהשרת
//   //     const presignedUrlResponse = await axios.get(`https://localhost:7158/api/ExamUpload/presigned-url`, {
//   //       params: { fileName: fileToUpload.name }
//   //     });
  
//   //     const uploadUrl = presignedUrlResponse.data.url;
  
//   //     // 2. העלאת הקובץ ל-S3 **בלי לשלוח Content-Type**
//   //     await axios.put(uploadUrl, fileToUpload);
  
//   //     // 3. עדכון ה-state עם הנתיב לקובץ
//   //     setExamData(prev => ({
//   //       ...prev,
//   //       exampleExamPath: uploadUrl.split('?')[0]
//   //     }));
  
//   //   } catch (error) {
//   //     console.error('Error uploading file:', error);
//   //   }
//   // };
  

//   // const uploadFile = async (fileToUpload: File) => {
//   //   try {
//   //     // 1. קבלת URL להעלאה מהשרת
//   //     // (`https://localhost:7158/api/Exam/user/${currentUser.id}`
//   //     const presignedUrlResponse = await axios.get(`https://localhost:7158/api/ExamUpload/presigned-url`, {
//   //       params: { fileName: fileToUpload.name }
//   //     });
      
//   //     const uploadUrl = presignedUrlResponse.data.url;

//   //     // 2. העלאת הקובץ ל-S3
//   //     await axios.put(uploadUrl, fileToUpload, {
//   //       headers: {
//   //         'Content-Type': fileToUpload.type
//   //       }
//   //     });

//   //     // 3. עדכון ה-state עם הנתיב לקובץ
//   //     setExamData(prev => ({
//   //       ...prev,
//   //       exampleExamPath: uploadUrl.split('?')[0] // שומרים רק את ה-URL הבסיסי ללא פרמטרים
//   //     }));

//   //   } catch (error) {
//   //     console.error('Error uploading file:', error);
//   //   }
//   // };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post('https://localhost:7158/api/Exam', {
//         ...examData,
//         userId: currentUser.id
//       });
//       navigate('/ExamsDashboard');
//     } catch (error) {
//       alert("ההוספת המבחן נכשלה");
//       console.error('Error adding exam:', error);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <h2>הוספת מבחן חדש</h2>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           fullWidth
//           label="נושא"
//           value={examData.subject}
//           onChange={(e) => setExamData({ ...examData, subject: e.target.value })}
//           margin="normal"
//           required
//         />
//         <TextField
//           fullWidth
//           label="כותרת"
//           value={examData.title}
//           onChange={(e) => setExamData({ ...examData, title: e.target.value })}
//           margin="normal"
//           required
//         />
//         <TextField
//           fullWidth
//           label="כיתה"
//           value={examData.class}
//           onChange={(e) => setExamData({ ...examData, class: e.target.value })}
//           margin="normal"
//           required
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
//           <div>
//             {file ? file.name : 'גרור לכאן קובץ או לחץ לבחירה'}
//           </div>
//         </Box>

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           sx={{ mt: 2 }}
//           disabled={!file || !examData.subject || !examData.title || !examData.class}
//         >
//           הוסף מבחן
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default AddExam;

// // const handleCreateExam = async () => {
// //   try {
// //     const response = await axios.post('https://localhost:7158/api/Exam', examData);
// //     const createdExam = response.data;
// //     setExamData({ ...examData, id: createdExam.id }); // שומרת את ה-`examId`
// //     console.log('Exam created with ID:', createdExam.id);
// //   } catch (error) {
// //     console.error('Error creating exam:', error);
// //   }
// // };

import { useState, useContext } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../store/UserStore';
import axios from 'axios';
import { CloudUpload } from '@mui/icons-material';
import { useEffect } from 'react';


const AddExam = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [examData, setExamData] = useState({
    subject: '',
    title: '',
    class: '',
    exampleExamPath: '',
    examId: '' // This is the ID for the exam
  });
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [newExamId, setNewExamId] = useState<number | null>(null);

useEffect(() => {
  console.log("exampleExamPath התעדכן ל:", examData.exampleExamPath);
}, [examData.exampleExamPath]);


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
      const presignedUrlResponse = await axios.get('https://localhost:7158/api/ExamUpload/presigned-url', {
        params: {
          fileName: fileToUpload.name,
          contentType: fileToUpload.type
        }
      });

      const uploadUrl = presignedUrlResponse.data.uploadUrl;
      const publicUrl = presignedUrlResponse.data.publicUrl;
      examData.exampleExamPath = publicUrl;

      console.log("Upload URL:", uploadUrl);  
      console.log(fileToUpload.name, fileToUpload.type, fileToUpload.size);

      await axios.put(uploadUrl, fileToUpload, {//לא מחזיר כלום
        headers: {
          'Content-Type': fileToUpload.type
        }
      });
      console.log("Upload response:");  

      setExamData(prev => ({
        ...prev,
        exampleExamPath: publicUrl,
        contentType: fileToUpload.type
      }));

    } catch (error) {
      console.error('Error uploading file:', error);

    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("exampleExamPath:", examData.exampleExamPath);
      
      // Send the exam data to the server
      const response = await axios.post('https://localhost:7158/api/Exam', {
        ...examData,
        exampleExamPath: examData.exampleExamPath,
        userId: currentUser.id,
        examId: newExamId,
        // contentType: examData.contentType
      });

      console.log("Exam added successfully:", response); 
      // Get the created exam ID from the response
      const createdExamId = response.data.examId;
      console.log("Created exam ID:", createdExamId);
      setNewExamId(createdExamId);
      
      // Navigate to UploadStudentExam with the new exam ID
      navigate(`/upload-student-exam/${createdExamId}`);
    } catch (error) {
      // If there's an error, alert the user and navigate to ExamsDashboard
      alert("הוספת המבחן נכשלה");
      console.error('Error adding exam:', error);
      navigate('/ExamsDashboard');
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>הוספת מבחן חדש</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="נושא"
          value={examData.subject}
          onChange={(e) => setExamData({ ...examData, subject: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="כותרת"
          value={examData.title}
          onChange={(e) => setExamData({ ...examData, title: e.target.value })}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="כיתה"
          value={examData.class}
          onChange={(e) => setExamData({ ...examData, class: e.target.value })}
          margin="normal"
          required
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
          <div>
            {file ? file.name : 'גרור לכאן קובץ או לחץ לבחירה'}
          </div>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={!file || !examData.subject || !examData.title || !examData.class}

            // navigate(`/upload-student-exam/${examData.examId}`)}

        >
          הוסף מבחן
        </Button>
      </form>
    </Container>
  );
};

export default AddExam;

// =======================FROM GEMINY========

// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../store/UserStore';
// import { addExam } from '../../services/examService'; // ייבוא הפונקציה משירות המבחנים

// const AddExam = () => {
//     const [subject, setSubject] = useState('');
//     const [title, setTitle] = useState('');
//     const [classNumber, setClassNumber] = useState('');
//     const { currentUser } = useContext(UserContext);
//     const navigate = useNavigate();

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         if (currentUser.id) {
//             try {
//                 const newExam = await addExam(currentUser.id, subject, title, Number(classNumber));
//                 // לאחר הוספת המבחן בהצלחה, אפשר לעדכן את הסטור או לנווט
//                 navigate('/ExamsDashboard');
//             } catch (error) {
//                 alert('שגיאה בהוספת המבחן.');
//                 console.error('שגיאה בהוספת המבחן:', error);
//             }
//         } else {
//             alert('משתמש לא מחובר.');
//         }
//     };

//     return (
//         <div>
//             <h2>הוספת מבחן חדש</h2>
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
//                         type="text"
//                         id="classNumber"
//                         value={classNumber}
//                         onChange={(e) => setClassNumber(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">הוסף מבחן</button>
//                 <button type="button" onClick={() => navigate('/ExamsDashboard')}>
//                     ביטול
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddExam;