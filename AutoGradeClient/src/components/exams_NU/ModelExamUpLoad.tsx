import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import axios from 'axios';

interface ModelExamUpLoadProps {
  open: boolean;
  onClose: () => void;
  onUploadComplete: (url: string) => void;
}

const ModelExamUpLoad = ({ open, onClose, onUploadComplete }: ModelExamUpLoadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const Api_base=import.meta.env.VITE_REACT_APP_BASE_API_URL;

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
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return;

    try {
      setUploading(true);

      // 1. קבלת URL להעלאה מהשרת
      const presignedUrlResponse = await axios.get(`${Api_base}/ExamUpload/presigned-url`, {
        params: { fileName: file.name }
      });
      
      const uploadUrl = presignedUrlResponse.data.url;

      // 2. העלאת הקובץ ל-S3
      await axios.put(uploadUrl, file, {
        headers: {
          'Content-Type': file.type
        }
      });

      // 3. החזרת ה-URL הבסיסי (ללא פרמטרים)
      const baseUrl = uploadUrl.split('?')[0];
      onUploadComplete(baseUrl);
      onClose();

    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>העלאת מבחן לדוגמא</DialogTitle>
      <DialogContent>
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
          onClick={() => document.getElementById('modelFileInput')?.click()}
        >
          <input
            type="file"
            id="modelFileInput"
            style={{ display: 'none' }}
            onChange={handleFileSelect}
          />
          <CloudUpload sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography>
            {file ? file.name : 'גרור לכאן קובץ או לחץ לבחירה'}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button 
          onClick={uploadFile} 
          color="primary" 
          disabled={!file || uploading}
        >
          {uploading ? 'מעלה...' : 'העלה'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModelExamUpLoad;