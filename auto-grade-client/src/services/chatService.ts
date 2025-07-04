// import axios from 'axios';
// import { ChatMessage } from '../models/ChatMessage';

// const API_URL = 'https://localhost:7158/api'; // וודא שזו הכתובת הנכונה של השרת שלך

// /**
//  * פונקציה לקבלת כל הודעות הצ'אט מהשרת
//  */
// export const fetchMessages = async (): Promise<ChatMessage[]> => {
//   const token = localStorage.getItem('token');
//   const response = await axios.get<ChatMessage[]>(`${API_URL}/Chat/messages`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   return response.data;
// };

// /**
//  * פונקציה לשליחת הודעה חדשה לשרת
//  */
// export const sendMessage = async (content: string): Promise<ChatMessage> => {
//   const token = localStorage.getItem('token');
  
//   // בדיקת הטוקן (רק לצורכי פיתוח)
//   console.log('Token exists:', !!token);
//   console.log('Token first 20 chars:', token ? token.substring(0, 20) + '...' : 'no token');
  
//   if (!token) {
//     throw new Error('אין טוקן אימות - נא להתחבר מחדש');
//   }
  
//   const response = await axios.post<ChatMessage>(
//     `${API_URL}/Chat/messages`, 
//     { content },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// };


import axios from "axios";

const API_BASE = `${import.meta.env.VITE_REACT_APP_BASE_API_URL!}/chat`;//https://smartgrade.onrender.com/api/chat

export const getAllTopics = async () => {
  const res = await axios.get(`${API_BASE}/topics`);
  // return res.data;
  // נגיד שיש לך response.data.topics
const topics = res.data.map((t: any) => ({
  id: t.id,
  title: t.title,
  lastMessage: t.lastMessage,
  time: t.createdAt,
  messageCount: t.messageCount,
  author: {
    id: t.authorId,
    name: t.authorName,
    initials: t.authorInitials,
  }
}));
return topics;
};

// export const createTopic = async (title: string) => {
//   const res = await axios.post(`${API_BASE}/topics`, { title });
//   return res.data;
// };

export const createTopic = async (
  newTopicTitle: string,
  createdUserId: number,
  initialMessage?: string 
) => {
  const res = await axios.post(`${API_BASE}/topics`, {
    title: newTopicTitle,
    userId: createdUserId,
    initialMessage: initialMessage 
  });
  return res.data;
};


export const getMessagesByTopic = async (topicId: string) => {
  const res = await axios.get(`${API_BASE}/messages`, {
    params: { topicId },
  });

  const messages = res.data.map((m: any) => ({
    id: m.id,
    content: m.text,
    time: m.sentAt,
    author: {
      id: m.senderId,
      name: m.senderName,
      initials: m.senderName ? m.senderName.charAt(0).toUpperCase() : '?',
    },
  }));

  return messages;
};

export const sendMessageToTopic = async (topicId: string, message: string, userId: number) => {
    const res = await axios.post(`${API_BASE}/messages`, {
      topicId,
      text: message,
      userId,
    });
    return res.data;
  };

  export const formatDateTime = (dateString: string | undefined | null) => {
    const date = new Date(dateString ?? '');
    if (isNaN(date.getTime())) {
      return 'תאריך לא זמין'
    }
    return new Intl.DateTimeFormat('he-IL', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  };
  