import React, { ReactNode } from 'react';
import { Modal, Box, Typography } from '@mui/material';
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
interface CommonModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}
const CommonModal: React.FC<CommonModalProps> = ({ 
  open, 
  onClose, 
  title, 
  children 
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography 
          id="modal-modal-title" 
          variant="h6" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 2, 
            color: 'primary.main' 
          }}
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};
export default CommonModal;
