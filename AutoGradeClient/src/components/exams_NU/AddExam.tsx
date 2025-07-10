// import { useState, useContext } from 'react';
// import { Container, TextField, Button, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../context/UserReducer';
// import axios from 'axios';
// import { CloudUpload } from '@mui/icons-material';
// import { useEffect } from 'react';


// const AddExam = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);
//   const [examData, setExamData] = useState({
//     subject: '',
//     title: '',
//     class: '',
//     exampleExamPath: '',
//     examId: '' // This is the ID for the exam
//   });
//   const [file, setFile] = useState<File | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [newExamId, setNewExamId] = useState<number | null>(null);
//   const Api_base=import.meta.env.VITE_REACT_APP_BASE_API_URL;
//   const API_presignedUrl = Api_base + '/ExamUpload/presigned-url';
//   const API_examUrl = Api_base + '/Exam';

// useEffect(() => {
//   console.log("exampleExamPath התעדכן ל:", examData.exampleExamPath);
// }, [examData.exampleExamPath]);


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
//       const presignedUrlResponse = await axios.get(API_presignedUrl, {
//         params: {
//           fileName: fileToUpload.name,
//           contentType: fileToUpload.type
//         }
//       });

//       const uploadUrl = presignedUrlResponse.data.uploadUrl;
//       const publicUrl = presignedUrlResponse.data.publicUrl;
//       examData.exampleExamPath = publicUrl;

//       console.log("Upload URL:", uploadUrl);  
//       console.log(fileToUpload.name, fileToUpload.type, fileToUpload.size);

//       await axios.put(uploadUrl, fileToUpload, {//לא מחזיר כלום
//         headers: {
//           'Content-Type': fileToUpload.type
//         }
//       });
//       console.log("Upload response:");  

//       setExamData(prev => ({
//         ...prev,
//         exampleExamPath: publicUrl,
//         contentType: fileToUpload.type
//       }));

//     } catch (error) {
//       console.error('Error uploading file:', error);

//     }
//   };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       console.log("exampleExamPath:", examData.exampleExamPath);
      
//       // Send the exam data to the server
//       const response = await axios.post(API_examUrl, {
//         ...examData,
//         exampleExamPath: examData.exampleExamPath,
//         userId: user.id,
//         examId: newExamId,
//         // contentType: examData.contentType
//       });

//       console.log("Exam added successfully:", response); 
//       // Get the created exam ID from the response
//       const createdExamId = response.data.examId;
//       console.log("Created exam ID:", createdExamId);
//       setNewExamId(createdExamId);
      
//       // Navigate to UploadStudentExam with the new exam ID
//       navigate(`/upload-student-exam/${createdExamId}`);
//     } catch (error) {
//       // If there's an error, alert the user and navigate to ExamsDashboard
//       alert("הוספת המבחן נכשלה");
//       console.error('Error adding exam:', error);
//       navigate('/ExamsDashboard');
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
//             // navigate(`/upload-student-exam/${examData.examId}`)}
//         >
//           הוסף מבחן
//         </Button>
//       </form>
//     </Container>
//   );
// };
// export default AddExam;