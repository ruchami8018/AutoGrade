// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import jsPDF from 'jspdf';
// import React, { useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';  // חשוב שזה יהיה אחרי היבוא של jsPDF
// interface FileWithStudent {
//   name: string;
//   email: string;
//   file: File;
//   fileUrl?: string;
// }

// interface StudentResult {
//   name: string;
//   email: string;
//   grade: number;
//   feedback: string;
// }

// const UploadStudentExam: React.FC<{ examId: number }> = ({ examId }) => {
//   const [selectedFiles, setSelectedFiles] = useState<FileWithStudent[]>([]);
//   const [results, setResults] = useState<StudentResult[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     const newFiles: FileWithStudent[] = Array.from(files).map(file => {
//       const [name, email] = file.name.split('_');
//       return { name, email, file };
//     });

//     setSelectedFiles(newFiles);
//   };

//   const uploadFileToS3 = async (file: File): Promise<string> => {
//     const res = await axios.get('/api/files/get-presigned-url', {
//       params: { fileName: file.name, fileType: file.type }
//     });
//     const { url, key } = res.data;

//     await axios.put(url, file, {
//       headers: { 'Content-Type': file.type }
//     });

//     return `https://YOUR_BUCKET.s3.amazonaws.com/${key}`;
//   };

//   const processStudentExams = async (students: { name: string; email: string; fileUrl: string }[]) => {
//     const response = await axios.post(`/api/exams/process-student-exams/${examId}`, {
//       students
//     });
//     return response.data as StudentResult[];
//   };

//   const handleUploadAndCheck = async () => {
//     setLoading(true);
//     const studentsWithUrls: FileWithStudent[] = [];

//     for (const s of selectedFiles) {
//       const url = await uploadFileToS3(s.file);
//       studentsWithUrls.push({ ...s, fileUrl: url });
//     }

//     const response = await processStudentExams(
//       studentsWithUrls.map(s => ({
//         name: s.name,
//         email: s.email,
//         fileUrl: s.fileUrl!
//       }))
//     );

//     setResults(response);
//     setLoading(false);
//   };

// //   const exportResultsToPdf = () => {
// //     const doc = new jsPDF();
// //     doc.text('דו"ח תוצאות מבחן', 14, 20);
// //     doc.autoTable({
// //       startY: 30,
// //       head: [['שם', 'מייל', 'ציון', 'משוב']],
// //       body: results.map(r => [r.name, r.email, r.grade.toString(), r.feedback])
// //     });
// //     doc.save('exam-results.pdf');
// //   };
// const exportResultsToPdf = () => {
//     const doc = new jsPDF();
//     doc.text('דו"ח תוצאות מבחן', 14, 20);
    
//     // @ts-ignore - להתעלם משגיאת TypeScript אם יש
//     doc.autoTable({
//       startY: 30,
//       head: [['שם', 'מייל', 'ציון', 'משוב']],
//       body: results.map(r => [r.name, r.email, r.grade.toString(), r.feedback])
//     });
    
//     doc.save('exam-results.pdf');
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl mb-2">העלאת מבחני תלמידים</h2>
//       <input type="file" multiple onChange={handleFileChange} className="mb-4" />
//       <button onClick={handleUploadAndCheck} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
//         {loading ? 'טוען...' : 'העלאת המבחנים ובדיקתם'}
//       </button>

//       {results.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg mb-2">תוצאות:</h3>
//           <table className="w-full border">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-2 border">שם</th>
//                 <th className="p-2 border">מייל</th>
//                 <th className="p-2 border">ציון</th>
//                 <th className="p-2 border">משוב</th>
//               </tr>
//             </thead>
//             <tbody>
//               {results.map((r, i) => (
//                 <tr key={i}>
//                   <td className="p-2 border">{r.name}</td>
//                   <td className="p-2 border">{r.email}</td>
//                   <td className="p-2 border">{r.grade}</td>
//                   <td className="p-2 border">{r.feedback}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={exportResultsToPdf} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
//             הורד PDF
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadStudentExam;



import React, { useContext, useState } from 'react';
import { bulkUploadExams } from '../../services/examService';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../store/UserStore';
import { ExamUpload } from '../../models/ExamUpload';

interface FileWithStudentName {
    file: ExamUpload | null;
    originalFile: File | null; // שמירת אובייקט ה-File המקורי לצורך העלאה
    studentName: string;
}

const UploadStudentExam: React.FC = () => {
    const { examId: examIdParam } = useParams();
    const examId = examIdParam ? parseInt(examIdParam, 10) : null;
    const [filesWithNames, setFilesWithNames] = useState<FileWithStudentName[]>([{ file: null, originalFile: null, studentName: '' }]);//מערך
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const userId = currentUser.id;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newFilesWithNames = [...filesWithNames];
        const selectedFile = event.target.files?.[0] || null;
        
        if (selectedFile) {
            // יצירת אובייקט ExamUpload מהקובץ שנבחר
            const examUpload: ExamUpload = {
                id: 0, // יוגדר על ידי השרת
                submissionNumber: 0, // יוגדר על ידי השרת
                userId: userId,
                examId: examId || 0,
                studentName: newFilesWithNames[index].studentName,
                filePath: selectedFile.name, // שם הקובץ כנתיב זמני
                uploadDate: new Date().toISOString(),
                score: 0,
                contentType: selectedFile.type,
                // שדות נוספים כדי לתמוך בפונקציונליות דומה ל-File
                name: selectedFile.name,
                type: selectedFile.type,
                size: selectedFile.size
            };
            
            // שמירת גם ה-File המקורי וגם ה-ExamUpload
            newFilesWithNames[index] = { 
                ...newFilesWithNames[index], 
                file: examUpload,
                originalFile: selectedFile 
            };
        } else {
            newFilesWithNames[index] = { 
                ...newFilesWithNames[index], 
                file: null,
                originalFile: null 
            };
        }
        
        setFilesWithNames(newFilesWithNames);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newFilesWithNames = [...filesWithNames];
        newFilesWithNames[index] = { ...newFilesWithNames[index], studentName: event.target.value };
        setFilesWithNames(newFilesWithNames);
    };

    const addFileInput = () => {
        setFilesWithNames([...filesWithNames, { file: null, originalFile: null, studentName: '' }]);
    };

    const removeFileInput = (index: number) => {//צריל לעשות הסרה אמיתית מ S3?
        if (filesWithNames.length > 1) {
            const newFilesWithNames = filesWithNames.filter((_, i) => i !== index);
            setFilesWithNames(newFilesWithNames);
        }
    };

    // const handleBulkUpload = async () => {
    //     setUploading(true);
    //     setError(null);
    //     setSuccessMessage(null);

    //     if (examId === null) {
    //         setError('מזהה מבחן לא תקין.');
    //         setUploading(false);
    //         return;
    //     }

    //     console.log('handleBulkUpload נקרא עם examId:', examId);
    //     console.log('נתונים לפני שליחה:', filesWithNames.filter(fwn => fwn.file && fwn.studentName));

    //     try {
    //         await bulkUploadExams(examId, filesWithNames.filter(fwn => fwn.file && fwn.studentName));
    //         setSuccessMessage('הקבצים הועלו בהצלחה!');
    //         setFilesWithNames([{ file: null, studentName: '' }]); // איפוס הטופס לאחר העלאה מוצלחת
    //         navigate(`/exams/${examId}`);
    //     } catch (err: any) {
    //         setError(`שגיאה בהעלאת הקבצים: ${err.message}`);
    //         console.error('שגיאה בהעלאת קבצים:', err);
    //     } finally {
    //         setUploading(false);
    //     }
    // };

// נניח שאתה מנהל את המצב של הקבצים והשמות כך:
interface FileWithName {
    file: ExamUpload | null;
    originalFile: File | null; // שמירת אובייקט ה-File המקורי לצורך העלאה
    studentName: string;
}

// ... בתוך קומפוננטת ה-React שלך, למשל:
// const [selectedFiles, setSelectedFiles] = useState<FileWithName[]>([]);
// const [currentExamId, setCurrentExamId] = useState<number | undefined>(undefined);
// const currentUserId = 1; // החלף ב-userId האמיתי של המשתמש המחובר

const handleBulkUpload = async () => {
    // הפעלת מצב טעינה
    setUploading(true);
    setError(null);
    setSuccessMessage(null);
    
    // 1. ודא ש-examId תקין
    if (examId === null) {
        setError('מזהה מבחן לא תקין.');
        setUploading(false);
        return;
    }

    // 2. ודא ש-filesWithNames הוא מערך ואינו ריק
    if (!Array.isArray(filesWithNames) || filesWithNames.length === 0) {
        setError('לא נבחרו קבצים להעלאה.');
        setUploading(false);
        return;
    }

    // 3. בדיקה שיש לפחות קובץ אחד תקין עם שם תלמיד
    const validFiles = filesWithNames.filter(fwn => fwn.originalFile && fwn.studentName);
    if (validFiles.length === 0) {
        setError('אין קבצים תקינים להעלאה. ודא שבחרת קבצים והזנת שמות תלמידים.');
        setUploading(false);
        return;
    }

    try {
        console.log('מתחיל העלאה מרובה של פתרונות עם examId:', examId);
        console.log('נתונים לפני שליחה:', validFiles);

        // העברת רק הקבצים התקינים לפונקציית העלאה
        await bulkUploadExams(examId, userId, validFiles);

        setSuccessMessage('הקבצים הועלו בהצלחה!');
        setFilesWithNames([{ file: null, originalFile: null, studentName: '' }]); // איפוס הטופס לאחר העלאה מוצלחת
        
        // ניתן להעיר את השורה הבאה כדי לנווט לדף המבחן לאחר העלאה מוצלחת
        // navigate(`/exams/${examId}`);
    } catch (err: any) {
        setError(`שגיאה בהעלאת הקבצים: ${err.message || 'שגיאה לא ידועה'}`);
        console.error('שגיאה בהעלאת קבצים:', err);
    } finally {
        setUploading(false);
    }
};

    const handleClose = () => {
        if (examId !== null) {
            navigate(`/exams/${examId}`);
        } else {
            console.error("מזהה מבחן לא זמין לסגירה.");
            // כאן אתה יכול להוסיף ניווט למקום אחר או להציג הודעה למשתמש
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '600px', margin: '20px auto' }}>
            <h3>העלאה מרובה של פתרונות למבחן #{examId}</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            {filesWithNames.map((fileWithName, index) => (
                <div key={index} style={{ marginBottom: '15px', border: '1px solid #eee', padding: '10px', borderRadius: '4px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label style={{ fontWeight: 'bold' }}>קובץ {index + 1}:</label>
                    <input type="file" onChange={(e) => handleFileChange(e, index)} style={{ flex: 1 }} />
                    <label style={{ fontWeight: 'bold' }}>שם תלמיד:</label>
                    <input
                        type="text"
                        value={fileWithName.studentName}
                        onChange={(e) => handleNameChange(e, index)}
                        style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        placeholder="שם התלמיד"
                    />
                    {filesWithNames.length > 1 && (
                        <button type="button" onClick={() => removeFileInput(index)} style={{ backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer' }}>
                            הסר
                        </button>
                    )}
                </div>
            ))}

            <button type="button" onClick={addFileInput} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 15px', cursor: 'pointer', marginBottom: '15px' }}>
                הוסף עוד קובץ
            </button>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                    onClick={handleBulkUpload}
                    disabled={uploading || filesWithNames.some(fwn => !fwn.file || !fwn.studentName)}
                    style={{ backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 15px', cursor: 'pointer' }}
                >
                    {uploading ? 'מעלה...' : 'העלאת המבחנים ובדיקתם'}
                </button>
                <button onClick={handleClose} style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 15px', cursor: 'pointer' }}>
                    סגור
                </button>
            </div>
        </div>
    );
};

export default UploadStudentExam;


// // =======================FROM GEMINY========
// import React, { useState, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { UserContext } from '../../store/UserStore';
// import { getPresignedUrl, uploadExamUrl } from '../../services/examService'; // ייבוא הפונקציות משירות המבחנים

// const UploadStudentExam = () => {
//     const { examId } = useParams();
//     const { currentUser } = useContext(UserContext);
//     const navigate = useNavigate();
//     const [studentName, setStudentName] = useState('');
//     const [file, setFile] = useState<File | null>(null);
//     const [uploading, setUploading] = useState(false);

//     if (!examId || isNaN(Number(examId))) {
//         console.error('מזהה מבחן לא תקין:', examId);
//         navigate('/ExamsDashboard');
//         return null;
//     }

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files.length > 0) {
//             setFile(event.target.files[0]);
//         }
//     };

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();
//         if (!file) {
//             alert('אנא בחר קובץ להעלאה.');
//             return;
//         }
//         if (!studentName) {
//             alert('אנא הזן את שם התלמיד.');
//             return;
//         }

//         setUploading(true);
//         try {
//             const presignedUrl = await getPresignedUrl(file.name);
//             await fetch(presignedUrl, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': file.type,
//                 },
//                 body: file,
//             });
//             const fileUrl = presignedUrl.split('?')[0];
//             const success = await uploadExamUrl(Number(examId), currentUser.id, studentName, fileUrl);
//             if (success) {
//                 alert('העבודה הועלתה בהצלחה!');
//                 navigate(`/ExamsDashboard`);
//             } else {
//                 alert('שגיאה בהעלאת העבודה.');
//             }
//         } catch (error) {
//             console.error('שגיאה בהעלאת העבודה:', error);
//             alert('שגיאה בהעלאת העבודה.');
//         } finally {
//             setUploading(false);
//         }
//     };

//     return (
//         <div>
//             <h2>העלאת פתרון מבחן</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="studentName">שם תלמיד:</label>
//                     <input
//                         type="text"
//                         id="studentName"
//                         value={studentName}
//                         onChange={(e) => setStudentName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="file">בחר קובץ:</label>
//                     <input
//                         type="file"
//                         id="file"
//                         onChange={handleFileChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" disabled={uploading}>
//                     {uploading ? 'מעלה...' : 'העלה'}
//                 </button>
//                 <button type="button" onClick={() => navigate(`/ExamsDashboard`)}>
//                     ביטול
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default UploadStudentExam;