import { useState, useContext } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../store/UserStore';
import axios from 'axios';
import { CloudUpload } from '@mui/icons-material';

const AddExam = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [examData, setExamData] = useState({
    subject: '',
    title: '',
    class: '',
    exampleExamPath: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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
      await axios.post('https://localhost:7158/api/Exam', {
        ...examData,
        userId: currentUser.id
      });
      navigate('/ExamsDashboard');
    } catch (error) {
      console.error('Error adding exam:', error);
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
        >
          הוסף מבחן
        </Button>
      </form>
    </Container>
  );
};

export default AddExam;