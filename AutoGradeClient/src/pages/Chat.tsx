// components/Chat.tsx
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ForumSidebar } from '../components/chat/ForumSidebar';
import { ThreadView } from '../components/chat/ThreadView';
import { NewTopicForm } from '../components/chat/NewTopicForm';
import { ForumTopic, ThreadMessage } from '@/models/Forum';
import { getAllTopics, createTopic, getMessagesByTopic, sendMessageToTopic } from '@/services/chatService';
import { UserContext } from '@/context/UserReducer';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

const Chat: React.FC = () => {
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null);
  const [messages, setMessages] = useState<ThreadMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [newTopicMode, setNewTopicMode] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicMessage, setNewTopicMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const connectionRef = useRef<HubConnection | null>(null);

  // const API_BASE = import.meta.env.VITE_REACT_APP_BASE_API_URL!;
  // ✅ יצירת חיבור SignalR פעם אחת
  useEffect(() => {
    const connection = new HubConnectionBuilder()
    .withUrl(`http://localhost:5000/chatHub`, {
      accessTokenFactory: () => localStorage.getItem('token') || ''
    })
    .withAutomaticReconnect()
    .build();

    connectionRef.current = connection;

    const startConnection = async () => {
      try {
        await connection.start();
        console.log('✅ Connected to SignalR hub');

        connection.on('ReceiveMessage', (topicId: string, message: any) => {
          console.log(`📩 Received message for topic ${topicId}:`, message);

          // עדכן הודעות אם רלוונטי
          setMessages(prev =>
            topicId === selectedTopicId ? [...prev, message] : prev
          );

          // עדכן טופיקים (מונה + הודעה אחרונה)
          setTopics(prev =>
            prev.map(t =>
              t.id === topicId
                ? {
                    ...t,
                    messageCount: (t.messageCount ?? 0) + 1,
                    lastMessage: message.text,
                  }
                : t
            )
          );

          // עדכן topic נבחר אם רלוונטי
          setSelectedTopic(prev =>
            prev?.id === topicId
              ? {
                  ...prev,
                  messageCount: (prev.messageCount ?? 0) + 1,
                  lastMessage: message.text,
                }
              : prev
          );
        });
      } catch (err) {
        console.error('❌ Connection failed:', err);
      }
    };

    startConnection();

    return () => {
      connection.stop();
    };
  }, []);

  // ✅ שליפת טופיקים בהתחלה
  useEffect(() => {
    const fetchTopics = async () => {
      setIsLoading(true);
      try {
        const data = await getAllTopics();
        console.log('topics fetched:', data);
        if (!Array.isArray(data)) {
          console.error('getAllTopics did not return an array:', data);
          return;
        }
        setTopics(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // ✅ שליפת הודעות בעת בחירת נושא
  useEffect(() => {
    if (!selectedTopicId) return;

    const fetchMessages = async () => {
      const msgs = await getMessagesByTopic(selectedTopicId);
      setMessages(msgs);
    };

    const topic = topics.find(t => t.id === selectedTopicId);
    setSelectedTopic(topic || null);
    fetchMessages();
  }, [selectedTopicId, topics]);

  // ✅ שליחת הודעה
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedTopicId) return;
    setIsSending(true);
    await sendMessageToTopic(selectedTopicId, newMessage, user.id);
    setNewMessage('');
    setTopics(prevTopics =>
      prevTopics.map(t =>
        t.id === selectedTopicId
          ? {
              ...t,
              messageCount: (t.messageCount ?? 0) + 1,
              lastMessage: newMessage,
              time: new Date().toISOString(), // למשל גם זמן מעודכן
            }
          : t
      )
    );
    setIsSending(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ✅ יצירת נושא חדש
  const handleCreateTopic = async () => {
    if (!newTopicTitle.trim()) return;
    setIsSubmitting(true);
    const newTopic = await createTopic(newTopicTitle, user.id, newTopicMessage);

    const enrichedTopic: ForumTopic = {
      ...newTopic,
      author: {
        id: user.id,
        name: user.name,
        initials: user.name ? user.name.charAt(0).toUpperCase() : '?',
      },
      lastMessage: newTopicMessage || '',
      time: new Date().toISOString(),
      messageCount: newTopicMessage.trim() ? 1 : 0,
    };

    setTopics([enrichedTopic, ...topics]);
    setNewTopicMode(false);
    setSelectedTopicId(enrichedTopic.id);

    if (newTopicMessage.trim()) {
      setMessages([
        {
          id: Math.random().toString(36),
          content: newTopicMessage,
          time: new Date().toLocaleString(),
          author: {
            id: user.id,
            name: 'את/ה',
            initials: 'את',
          },
        },
      ]);
    } else {
      setMessages([]);
    }

    setNewTopicTitle('');
    setNewTopicMessage('');
    setIsSubmitting(false);
  };

  const filteredTopics = topics.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full">
      <ForumSidebar
        topics={filteredTopics}
        isLoading={isLoading}
        selectedTopicId={selectedTopicId}
        onSelectTopic={id => {
          setNewTopicMode(false);
          setSelectedTopicId(id);
        }}
        onNewTopic={() => setNewTopicMode(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentUserId={user.id}
      />

      <div className="flex-1">
        {newTopicMode ? (
          <NewTopicForm
            title={newTopicTitle}
            message={newTopicMessage}
            onChangeTitle={setNewTopicTitle}
            onChangeMessage={setNewTopicMessage}
            onSubmit={handleCreateTopic}
            onCancel={() => setNewTopicMode(false)}
            isSubmitting={isSubmitting}
          />
        ) : selectedTopic ? (
          <ThreadView
            topic={selectedTopic}
            messages={messages}
            newMessage={newMessage}
            onChangeMessage={setNewMessage}
            onSend={handleSendMessage}
            onKeyPress={handleKeyPress}
            currentUser={user}
            isSending={isSending}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            בחר נושא מהצד או פתח חדש כדי להתחיל
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;

//-----------------------------------

// Main Chat Component


// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { MessageCircle, Plus, Search, Send, Users, Clock, ArrowRight, Hash, User, X } from "lucide-react"

// // Types
// interface ForumTopic {
//   id: string
//   title: string
//   author: {
//     id: string
//     name: string
//     initials: string
//   }
//   lastMessage: string
//   time: string
//   messageCount: number
// }

// interface ThreadMessage {
//   id: string
//   content: string
//   time: string
//   author: {
//     id: string
//     name: string
//     initials: string
//   }
// }

// // Mock data for demonstration
// const mockTopics: ForumTopic[] = [
//   {
//     id: "1",
//     title: "שאלות על מערכי שיעור לכיתה ח",
//     author: { id: "1", name: "רחל כהן", initials: "ר" },
//     lastMessage: "תודה על העזרה! זה באמת עזר לי",
//     time: "10:30",
//     messageCount: 12,
//   },
//   {
//     id: "2",
//     title: "טיפים לניהול כיתה",
//     author: { id: "2", name: "דוד לוי", initials: "ד" },
//     lastMessage: "יש לי עוד רעיון שיכול לעזור",
//     time: "09:45",
//     messageCount: 8,
//   },
//   {
//     id: "3",
//     title: "חומרי לימוד למתמטיקה",
//     author: { id: "3", name: "שרה אברהם", initials: "ש" },
//     lastMessage: "אשמח לשתף את החומרים שלי",
//     time: "08:20",
//     messageCount: 15,
//   },
// ]

// const mockMessages: ThreadMessage[] = [
//   {
//     id: "1",
//     content: "שלום לכולם! אני מחפשת רעיונות למערכי שיעור מעניינים לכיתה ח. יש למישהו המלצות?",
//     time: "09:00",
//     author: { id: "1", name: "רחל כהן", initials: "ר" },
//   },
//   {
//     id: "2",
//     content: "היי רחל! אני ממליצה על שילוב של למידה חווייתית. אפשר להכין פעילויות אינטראקטיביות",
//     time: "09:15",
//     author: { id: "2", name: "דוד לוי", initials: "ד" },
//   },
//   {
//     id: "3",
//     content: "תודה דוד! זה נשמע מעולה. יש לך דוגמאות ספציפיות?",
//     time: "09:30",
//     author: { id: "1", name: "רחל כהן", initials: "ר" },
//   },
// ]

// const mockUser = { id: "1", name: "רחל כהן" }

// // Components
// const ForumSidebar = ({
//   topics,
//   selectedTopicId,
//   onSelectTopic,
//   onNewTopic,
//   searchQuery,
//   onSearchChange,
// }: {
//   topics: ForumTopic[]
//   selectedTopicId: string | null
//   onSelectTopic: (id: string) => void
//   onNewTopic: () => void
//   searchQuery: string
//   onSearchChange: (query: string) => void
// }) => (
//   <div className="w-80 bg-white border-l border-blue-100 h-full flex flex-col">
//     {/* Header */}
//     <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
//       <div className="flex items-center gap-3 mb-4">
//         <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
//           <MessageCircle className="w-5 h-5 text-white" />
//         </div>
//         <div>
//           <h2 className="text-lg font-bold text-gray-900">פורום מורים</h2>
//           <p className="text-sm text-gray-600">שתפו ותלמדו יחד</p>
//         </div>
//       </div>

//       <Button
//         onClick={onNewTopic}
//         className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-md"
//       >
//         <Plus className="w-4 h-4 ml-2" />
//         נושא חדש
//       </Button>
//     </div>

//     {/* Search */}
//     <div className="p-4 border-b border-blue-100">
//       <div className="relative">
//         <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//         <Input
//           placeholder="חפש נושאים..."
//           value={searchQuery}
//           onChange={(e) => onSearchChange(e.target.value)}
//           className="pr-10 border-blue-200 focus:border-blue-400"
//         />
//       </div>
//     </div>

//     {/* Topics List */}
//     <div className="flex-1 overflow-y-auto">
//       {topics.map((topic) => (
//         <div
//           key={topic.id}
//           onClick={() => onSelectTopic(topic.id)}
//           className={`p-4 border-b border-blue-50 cursor-pointer transition-all hover:bg-blue-50 ${
//             selectedTopicId === topic.id
//               ? "bg-gradient-to-r from-blue-100 to-indigo-100 border-r-4 border-r-blue-500"
//               : ""
//           }`}
//         >
//           <div className="flex items-start gap-3">
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
//               <span className="text-sm font-medium text-blue-600">{topic.author.initials}</span>
//             </div>
//             <div className="flex-1 min-w-0">
//               <h3 className="font-medium text-gray-900 truncate mb-1">{topic.title}</h3>
//               <p className="text-sm text-gray-600 truncate mb-2">{topic.lastMessage}</p>
//               <div className="flex items-center justify-between text-xs text-gray-500">
//                 <span className="flex items-center gap-1">
//                   <Users className="w-3 h-3" />
//                   {topic.messageCount}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Clock className="w-3 h-3" />
//                   {topic.time}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// )

// const ThreadView = ({
//   topic,
//   messages,
//   newMessage,
//   onChangeMessage,
//   onSend,
//   currentUser,
// }: {
//   topic: ForumTopic
//   messages: ThreadMessage[]
//   newMessage: string
//   onChangeMessage: (message: string) => void
//   onSend: () => void
//   currentUser: any
// }) => {
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [messages])

//   return (
//     <div className="flex-1 flex flex-col h-full">
//       {/* Thread Header */}
//       <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
//             <Hash className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <h1 className="text-xl font-bold text-gray-900">{topic.title}</h1>
//             <p className="text-sm text-gray-600">
//               נוצר על ידי {topic.author.name} • {topic.messageCount} הודעות
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-4">
//         {messages.map((message) => (
//           <div key={message.id} className="flex gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
//               <span className="text-sm font-medium text-blue-600">{message.author.initials}</span>
//             </div>
//             <div className="flex-1">
//               <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-50 hover:shadow-md transition-shadow">
//                 <div className="flex items-center gap-2 mb-2">
//                   <span className="font-medium text-gray-900">{message.author.name}</span>
//                   <span className="text-xs text-gray-500">{message.time}</span>
//                 </div>
//                 <p className="text-gray-700 leading-relaxed">{message.content}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Message Input */}
//       <div className="p-6 border-t border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
//         <div className="flex gap-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
//             <User className="w-5 h-5 text-blue-600" />
//           </div>
//           <div className="flex-1 flex gap-2">
//             <Textarea
//               placeholder="כתוב הודעה..."
//               value={newMessage}
//               onChange={(e) => onChangeMessage(e.target.value)}
//               className="resize-none border-blue-200 focus:border-blue-400"
//               rows={2}
//             />
//             <Button
//               onClick={onSend}
//               disabled={!newMessage.trim()}
//               className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-md px-4"
//             >
//               <Send className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const NewTopicForm = ({
//   title,
//   message,
//   onChangeTitle,
//   onChangeMessage,
//   onSubmit,
//   onCancel,
// }: {
//   title: string
//   message: string
//   onChangeTitle: (title: string) => void
//   onChangeMessage: (message: string) => void
//   onSubmit: () => void
//   onCancel: () => void
// }) => (
//   <div className="flex-1 flex flex-col h-full">
//     {/* Header */}
//     <div className="p-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
//             <Plus className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <h1 className="text-xl font-bold text-gray-900">נושא חדש</h1>
//             <p className="text-sm text-gray-600">שתף שאלה או רעיון עם הקהילה</p>
//           </div>
//         </div>
//         <Button
//           variant="outline"
//           onClick={onCancel}
//           className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
//         >
//           <X className="w-4 h-4" />
//         </Button>
//       </div>
//     </div>

//     {/* Form */}
//     <div className="flex-1 p-6 space-y-6">
//       <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-50">
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">כותרת הנושא</label>
//             <Input
//               placeholder="למשל: שאלות על מערכי שיעור לכיתה ח"
//               value={title}
//               onChange={(e) => onChangeTitle(e.target.value)}
//               className="border-blue-200 focus:border-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">תוכן ההודעה (אופציונלי)</label>
//             <Textarea
//               placeholder="פרט על השאלה או הרעיון שלך..."
//               value={message}
//               onChange={(e) => onChangeMessage(e.target.value)}
//               className="min-h-32 border-blue-200 focus:border-blue-400"
//             />
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Actions */}
//     <div className="p-6 border-t border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
//       <div className="flex gap-3 justify-end">
//         <Button
//           variant="outline"
//           onClick={onCancel}
//           className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent"
//         >
//           ביטול
//         </Button>
//         <Button
//           onClick={onSubmit}
//           disabled={!title.trim()}
//           className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-md"
//         >
//           צור נושא
//           <ArrowRight className="w-4 h-4 mr-2" />
//         </Button>
//       </div>
//     </div>
//   </div>
// )

// // Main Chat Component
// export default function Chat() {
//   const [topics, setTopics] = useState(mockTopics)
//   const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
//   const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null)
//   const [messages, setMessages] = useState<ThreadMessage[]>([])
//   const [newMessage, setNewMessage] = useState("")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [newTopicMode, setNewTopicMode] = useState(false)
//   const [newTopicTitle, setNewTopicTitle] = useState("")
//   const [newTopicMessage, setNewTopicMessage] = useState("")

//   const user = mockUser

//   useEffect(() => {
//     if (!selectedTopicId) return

//     const topic = topics.find((t) => t.id === selectedTopicId)
//     setSelectedTopic(topic || null)
//     setMessages(mockMessages)
//   }, [selectedTopicId, topics])

//   const handleSendMessage = () => {
//     if (!newMessage.trim() || !selectedTopicId) return

//     const message: ThreadMessage = {
//       id: Date.now().toString(),
//       content: newMessage,
//       time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
//       author: {
//         id: user.id,
//         name: user.name,
//         initials: user.name.charAt(0),
//       },
//     }

//     setMessages((prev) => [...prev, message])
//     setNewMessage("")
//   }

//   const handleCreateTopic = () => {
//     if (!newTopicTitle.trim()) return

//     const newTopic: ForumTopic = {
//       id: Date.now().toString(),
//       title: newTopicTitle,
//       author: {
//         id: user.id,
//         name: user.name,
//         initials: user.name.charAt(0),
//       },
//       lastMessage: newTopicMessage || "נושא חדש נוצר",
//       time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
//       messageCount: newTopicMessage.trim() ? 1 : 0,
//     }

//     setTopics([newTopic, ...topics])
//     setNewTopicMode(false)
//     setSelectedTopicId(newTopic.id)
//     setNewTopicTitle("")
//     setNewTopicMessage("")
//   }

//   const filteredTopics = topics.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       {/* Header */}
//       <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-blue-100 bg-white/80 backdrop-blur-sm">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
//             <MessageCircle className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               פורום מורים
//             </h1>
//             <p className="text-sm text-gray-600">שתפו ידע, קבלו עזרה והתחברו לקהילה</p>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex h-[calc(100vh-120px)]">
//         <div className="flex-1 bg-white/60 backdrop-blur-sm">
//           {newTopicMode ? (
//             <NewTopicForm
//               title={newTopicTitle}
//               message={newTopicMessage}
//               onChangeTitle={setNewTopicTitle}
//               onChangeMessage={setNewTopicMessage}
//               onSubmit={handleCreateTopic}
//               onCancel={() => setNewTopicMode(false)}
//             />
//           ) : selectedTopic ? (
//             <ThreadView
//               topic={selectedTopic}
//               messages={messages}
//               newMessage={newMessage}
//               onChangeMessage={setNewMessage}
//               onSend={handleSendMessage}
//               currentUser={user}
//             />
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <div className="text-center">
//                 <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <MessageCircle className="w-12 h-12 text-blue-500" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">ברוכים הבאים לפורום</h3>
//                 <p className="text-gray-600 mb-6">בחרו נושא מהצד או צרו נושא חדש כדי להתחיל</p>
//                 <Button
//                   onClick={() => setNewTopicMode(true)}
//                   className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-md"
//                 >
//                   <Plus className="w-4 h-4 ml-2" />
//                   צור נושא חדש
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>

//         <ForumSidebar
//           topics={filteredTopics}
//           selectedTopicId={selectedTopicId}
//           onSelectTopic={(id) => {
//             setNewTopicMode(false)
//             setSelectedTopicId(id)
//           }}
//           onNewTopic={() => setNewTopicMode(true)}
//           searchQuery={searchQuery}
//           onSearchChange={setSearchQuery}
//         />
//       </div>
//     </div>
//   )
// }
