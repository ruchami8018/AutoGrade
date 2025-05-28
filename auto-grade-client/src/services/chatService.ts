import axios from 'axios';
import { ChatMessage } from '../models/ChatMessage';

const API_URL = 'https://localhost:7158/api'; // וודא שזו הכתובת הנכונה של השרת שלך

/**
 * פונקציה לקבלת כל הודעות הצ'אט מהשרת
 */
export const fetchMessages = async (): Promise<ChatMessage[]> => {
  const token = localStorage.getItem('token');
  const response = await axios.get<ChatMessage[]>(`${API_URL}/Chat/messages`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

/**
 * פונקציה לשליחת הודעה חדשה לשרת
 */
export const sendMessage = async (content: string): Promise<ChatMessage> => {
  const token = localStorage.getItem('token');
  
  // בדיקת הטוקן (רק לצורכי פיתוח)
  console.log('Token exists:', !!token);
  console.log('Token first 20 chars:', token ? token.substring(0, 20) + '...' : 'no token');
  
  if (!token) {
    throw new Error('אין טוקן אימות - נא להתחבר מחדש');
  }
  
  const response = await axios.post<ChatMessage>(
    `${API_URL}/Chat/messages`, 
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
