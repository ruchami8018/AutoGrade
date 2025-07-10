// //---------------------my---------------
// // import React, { useState, useEffect, useContext, useRef } from 'react';
// // import { UserContext } from '../../store/UserStore';
// // import { fetchMessages } from '../../services/chatService';
// // import { ChatMessage } from '../../models/ChatMessage';
// // import { 
// //   Box, Paper, Typography, TextField, Button, List, 
// //   ListItem, ListItemText, Avatar, Divider 
// // } from '@mui/material';
// // import EmailIcon from '@mui/icons-material/Email';
// // import SendIcon from '@mui/icons-material/Send';
// // import axios from 'axios';

// // /**
// //  * קומפוננטת צ'אט מורים
// //  * מאפשרת למורים לתקשר זה עם זה ולשלוח מיילים
// //  */
// // const TeachersChat = () => {
// //   const { currentUser } = useContext(UserContext);
// //   const [messages, setMessages] = useState<ChatMessage[]>([]);
// //   const [users, setUsers] = useState<any[]>([]);
// //   const [newMessage, setNewMessage] = useState('');
// //   const messagesEndRef = useRef<HTMLDivElement>(null);
// //   const [loading, setLoading] = useState(true);

// //   // קבלת רשימת משתמשים
// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         const response = await axios.get('https://localhost:7158/api/Users', {
// //           headers: { Authorization: `Bearer ${token}` }
// //         });
// //         setUsers(response.data);
// //       } catch (error) {
// //         console.error('שגיאה בטעינת משתמשים:', error);
// //       }
// //     };

// //     fetchUsers();
// //   }, []);

// //   // קבלת הודעות
// //   useEffect(() => {
// //     const getMessages = async () => {
// //       try {
// //         setLoading(true);
// //         const messagesList = await fetchMessages();
// //         // בדוק אם יש הודעות חדשות שצריך להוסיף
// //         if (messagesList.length > 0) {
// //           // מיזוג הודעות חדשות עם הודעות מקומיות
// //           setMessages(prevMessages => {
// //             // יצירת מפה של הודעות קיימות לפי ID
// //             const existingMessagesMap = new Map(
// //               prevMessages.map(msg => [msg.id, msg])
// //             );
            
// //             // הוספת הודעות חדשות מהשרת
// //             messagesList.forEach(msg => {
// //               existingMessagesMap.set(msg.id, msg);
// //             });
            
// //             // המרה בחזרה למערך וסידור לפי זמן
// //             return Array.from(existingMessagesMap.values())
// //               .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
// //           });
// //         }
// //       } catch (error) {
// //         console.error('שגיאה בטעינת הודעות:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     getMessages();
    
// //     // פולינג - בדיקת הודעות חדשות כל 5 שניות
// //     const interval = setInterval(getMessages, 5000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   // גלילה לסוף הצ'אט כשמתקבלות הודעות חדשות
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   }, [messages]);

// //   // שליחת הודעה
// //   const handleSendMessage = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!newMessage.trim()) return;
    
// //     try {
// //       // ניסיון לשלוח לשרת
// //       try {
// //         const token = localStorage.getItem('token');
// //         const response = await axios.post<ChatMessage>(
// //           `https://localhost:7158/api/Chat/messages`,
// //           { content: newMessage },
// //           { headers: { Authorization: `Bearer ${token}` } }
// //         );
        
// //         // אם ההודעה נשלחה בהצלחה, הוסף אותה למערך ההודעות
// //         if (response.data) {
// //           setMessages(prevMessages => [...prevMessages, response.data]);
// //         }
// //       } catch (serverError) {
// //         console.warn('לא ניתן לשלוח הודעה לשרת, משתמש בהודעה מקומית:', serverError);
        
// //         // אם נכשל, הוסף הודעה מקומית
// //         const newMockMessage: ChatMessage = {
// //           id: Date.now(), // שימוש בזמן נוכחי כמזהה ייחודי
// //           senderId: currentUser.id,
// //           senderName: currentUser.name,
// //           senderEmail: currentUser.email,
// //           content: newMessage,
// //           timestamp: new Date().toISOString()
// //         };
        
// //         setMessages(prevMessages => [...prevMessages, newMockMessage]);
// //       }
      
// //       // ניקוי שדה ההודעה החדשה
// //       setNewMessage('');
// //     } catch (error) {
// //       console.error('שגיאה בשליחת הודעה:', error);
// //     }
// //   };

// //   // פתיחת חלון מייל
// //   const handleSendEmail = (email: string) => {
// //     window.location.href = `mailto:${email}`;
// //   };

// //   // פונקציה לניקוי הטוקן והתחברות מחדש
// //   const handleReconnect = () => {
// //     localStorage.removeItem('token');
// //     alert('הטוקן נוקה. אנא התחבר/י מחדש למערכת.');
// //     window.location.href = '/login';
// //   };

// //   return (
// //     <Box sx={{ display: 'flex', height: 'calc(100vh - 100px)', direction: 'rtl' }}>
// //         {/* רשימת משתמשים */}
// //         <Paper sx={{ width: '25%', overflow: 'auto', p: 2, borderRadius: 0 }}>
// //           <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
// //             מורים במערכת
// //           </Typography>
// //           <List>
// //             {users.map(user => (
// //               <ListItem key={user.id} alignItems="flex-start" sx={{ borderBottom: '1px solid #eee' }}>
// //                 <ListItemText
// //                   primary={user.name}
// //                   secondary={
// //                     <Typography
// //                       component="span"
// //                       variant="body2"
// //                       color="primary"
// //                       sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
// //                       onClick={() => handleSendEmail(user.email)}
// //                     >
// //                       <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
// //                       {user.email}
// //                     </Typography>
// //                   }
// //                 />
// //               </ListItem>
// //             ))}
// //           </List>
// //         </Paper>

// //         {/* אזור הצ'אט */}
// //         <Box sx={{ width: '75%', display: 'flex', flexDirection: 'column' }}>
// //         {/* הודעות */}
// //         <Paper sx={{ flex: 1, p: 2, overflow: 'auto', borderRadius: 0 }}>
// //           {loading ? (
// //             <Typography align="center" sx={{ mt: 2 }}>טוען הודעות...</Typography>
// //           ) : messages.length === 0 ? (
// //             <Typography align="center" sx={{ mt: 2 }}>אין הודעות עדיין. היה הראשון לשלוח!</Typography>
// //           ) : (
// //             messages.map(message => (
// //               <Box
// //                 key={message.id}
// //                 sx={{
// //                   mb: 2,
// //                   p: 2,
// //                   borderRadius: 2,
// //                   bgcolor: message.senderId === currentUser.id ? '#e3f2fd' : '#f5f5f5',
// //                   maxWidth: '80%',
// //                   ml: message.senderId === currentUser.id ? 'auto' : 0,
// //                 }}
// //               >
// //                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
// //                   <Typography variant="subtitle2" fontWeight="bold">
// //                     {message.senderName}
// //                   </Typography>
// //                   <Typography
// //                     variant="caption"
// //                     color="primary"
// //                     sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
// //                     onClick={() => handleSendEmail(message.senderEmail)}
// //                   >
// //                     <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
// //                     {message.senderEmail}
// //                   </Typography>
// //                 </Box>
// //                 <Typography variant="body1">{message.content}</Typography>
// //                 <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'left', mt: 1 }}>
// //                   {new Date(message.timestamp).toLocaleString('he-IL')}
// //                 </Typography>
// //               </Box>
// //             ))
// //           )}
// //           <div ref={messagesEndRef} />
// //         </Paper>

// //         {/* תיבת שליחת הודעה */}
// //         <Paper sx={{ p: 2, borderTop: '1px solid #eee', borderRadius: 0 }}>
// //           <form onSubmit={handleSendMessage} style={{ display: 'flex' }}>
// //             <TextField
// //               fullWidth
// //               variant="outlined"
// //               placeholder="הקלד הודעה..."
// //               value={newMessage}
// //               onChange={(e) => setNewMessage(e.target.value)}
// //               sx={{ ml: 2 }}
// //             />
// //             <Button
// //               type="submit"
// //               variant="contained"
// //               color="primary"
// //               endIcon={<SendIcon />}
// //               disabled={!newMessage.trim()}
// //             >
// //               שלח
// //             </Button>
// //           </form>
// //         </Paper>
// //       </Box>
// //     </Box>
// //   );
// // };
// // export default TeachersChat;

// import { useState, useRef, useEffect, useContext } from 'react';
// import { 
//   Box, Paper, Typography, TextField, Button 
// } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
// import axios from 'axios';
// import { UserContext } from '../../context/UserReducer';

// interface Message {
//   sender: string;
//   content: string;
//   timestamp: string;
// }

// export default function TeachersChat() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState('');
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const { user } = useContext(UserContext); // מכיל user.id

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get('https://localhost:7023/api/chat/messages');
//       const data = response.data;
//       const parsedMessages = data.map((msg: any) => ({
//         sender: msg.senderName || 'אנונימי',
//         content: msg.content,
//         timestamp: msg.timestamp,
//       }));
//       setMessages(parsedMessages);
//     } catch (error) {
//       console.error('שגיאה בטעינת הודעות:', error);
//     }
//   };

//   const handleSend = async () => {
//     if (!input.trim() || !user?.id) return;

//     try {
//       const response = await axios.post('https://localhost:7158/api/chat/messages', {
//         senderId: user.id,
//         content: input,
//       });

//       const newMsg = response.data;

//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: newMsg.senderName || 'את/ה',
//           content: newMsg.content,
//           timestamp: newMsg.timestamp,
//         },
//       ]);

//       setInput('');
//     } catch (error) {
//       console.error('שגיאה בשליחת הודעה:', error);
//     }
//   };

//   const commonEmojis = ['😊', '👍', '❤️', '👏', '🎉', '😂', '🙏', '👋', '🤔', '👌'];

//   const addEmoji = (emoji: string) => {
//     setInput((prev) => prev + emoji);
//   };

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', height: '500px', maxWidth: '800px', mx: 'auto', border: '1px solid #ddd', borderRadius: 2, p: 2, direction: 'rtl' }}>
//       <Paper sx={{ flex: 1, p: 2, mb: 2, overflow: 'auto', borderRadius: 2, bgcolor: '#f8f9fa' }}>
//         {messages.length === 0 ? (
//           <Typography align="center" sx={{ mt: 2, color: 'text.secondary' }}>
//             אין הודעות עדיין. היה הראשון לשלוח!
//           </Typography>
//         ) : (
//           messages.map((msg, i) => (
//             <Box
//               key={i}
//               sx={{
//                 mb: 2,
//                 p: 2,
//                 borderRadius: 2,
//                 bgcolor: '#e3f2fd',
//                 maxWidth: '80%',
//                 ml: 'auto',
//               }}
//             >
//               <Typography variant="subtitle2" fontWeight="bold">
//                 {msg.sender}
//               </Typography>
//               <Typography variant="body1">{msg.content}</Typography>
//               <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'left', mt: 1 }}>
//                 {new Date(msg.timestamp).toLocaleString('he-IL')}
//               </Typography>
//             </Box>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </Paper>

//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         <Button onClick={() => setShowEmojiPicker((v) => !v)} sx={{ minWidth: 'auto', p: 1 }} aria-label="בחר אימוג'י">
//           <EmojiEmotionsIcon />
//         </Button>

//         {showEmojiPicker && (
//           <Box sx={{ position: 'absolute', bottom: '70px', left: '20px', zIndex: 10, bgcolor: 'white', p: 1, border: '1px solid #ddd', borderRadius: 1, boxShadow: 2 }}>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: '200px' }}>
//               {commonEmojis.map((emoji, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     fontSize: '24px',
//                     cursor: 'pointer',
//                     p: 0.5,
//                     '&:hover': { bgcolor: '#f0f0f0', borderRadius: 1 },
//                   }}
//                   onClick={() => addEmoji(emoji)}
//                 >
//                   {emoji}
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         )}

//         <TextField
//           fullWidth
//           placeholder="כתוב הודעה..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               e.preventDefault();
//               handleSend();
//             }
//           }}
//           variant="outlined"
//           size="small"
//         />

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSend}
//           disabled={!input.trim()}
//           endIcon={<SendIcon />}
//         >
//           שלח
//         </Button>
//       </Box>
//     </Box>
//   );
// }
