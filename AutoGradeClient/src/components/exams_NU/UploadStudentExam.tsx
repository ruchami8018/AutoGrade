// import React, { useContext, useState } from 'react';
// import { bulkUploadExams } from '../../services/examService_NU';
// import { useNavigate, useParams } from 'react-router-dom';
// import { UserContext } from '../../store_NOT_IN_USE/UserStore';
// import { ExamUpload } from '../../models/ExamUpload_NOT_IN_USE';

// interface FileWithStudentName {
//     file: ExamUpload | null;
//     originalFile: File | null; // שמירת אובייקט ה-File המקורי לצורך העלאה
//     studentName: string;
// }

// const UploadStudentExam: React.FC = () => {
//     const { examId: examIdParam } = useParams();
//     const examId = examIdParam ? parseInt(examIdParam, 10) : null;
//     const [filesWithNames, setFilesWithNames] = useState<FileWithStudentName[]>([{ file: null, originalFile: null, studentName: '' }]);//מערך
//     const [uploading, setUploading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const navigate = useNavigate();
//     const { currentUser } = useContext(UserContext);
//     const userId = currentUser.id;

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
//         const newFilesWithNames = [...filesWithNames];
//         const selectedFile = event.target.files?.[0] || null;
        
//         if (selectedFile) {
//             // יצירת אובייקט ExamUpload מהקובץ שנבחר
//             const examUpload: ExamUpload = {
//                 id: 0, // יוגדר על ידי השרת
//                 submissionNumber: 0, // יוגדר על ידי השרת
//                 userId: userId,
//                 examId: examId || 0,
//                 studentName: newFilesWithNames[index].studentName,
//                 filePath: selectedFile.name, // שם הקובץ כנתיב זמני
//                 uploadDate: new Date().toISOString(),
//                 score: 0,
//                 contentType: selectedFile.type,
//                 // שדות נוספים כדי לתמוך בפונקציונליות דומה ל-File
//                 name: selectedFile.name,
//                 type: selectedFile.type,
//                 size: selectedFile.size
//             };
            
//             // שמירת גם ה-File המקורי וגם ה-ExamUpload
//             newFilesWithNames[index] = { 
//                 ...newFilesWithNames[index], 
//                 file: examUpload,
//                 originalFile: selectedFile 
//             };
//         } else {
//             newFilesWithNames[index] = { 
//                 ...newFilesWithNames[index], 
//                 file: null,
//                 originalFile: null 
//             };
//         }
        
//         setFilesWithNames(newFilesWithNames);
//     };

//     const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
//         const newFilesWithNames = [...filesWithNames];
//         newFilesWithNames[index] = { ...newFilesWithNames[index], studentName: event.target.value };
//         setFilesWithNames(newFilesWithNames);
//     };

//     const addFileInput = () => {
//         setFilesWithNames([...filesWithNames, { file: null, originalFile: null, studentName: '' }]);
//     };

//     const removeFileInput = (index: number) => {//צריל לעשות הסרה אמיתית מ S3?
//         if (filesWithNames.length > 1) {
//             const newFilesWithNames = filesWithNames.filter((_, i) => i !== index);
//             setFilesWithNames(newFilesWithNames);
//         }
//     };
// const handleBulkUpload = async () => {
//     // הפעלת מצב טעינה
//     setUploading(true);
//     setError(null);
//     setSuccessMessage(null);
    
//     // 1. ודא ש-examId תקין
//     if (examId === null) {
//         setError('מזהה מבחן לא תקין.');
//         setUploading(false);
//         return;
//     }

//     // 2. ודא ש-filesWithNames הוא מערך ואינו ריק
//     if (!Array.isArray(filesWithNames) || filesWithNames.length === 0) {
//         setError('לא נבחרו קבצים להעלאה.');
//         setUploading(false);
//         return;
//     }

//     // 3. בדיקה שיש לפחות קובץ אחד תקין עם שם תלמיד
//     const validFiles = filesWithNames.filter(fwn => fwn.originalFile && fwn.studentName);
//     if (validFiles.length === 0) {
//         setError('אין קבצים תקינים להעלאה. ודא שבחרת קבצים והזנת שמות תלמידים.');
//         setUploading(false);
//         return;
//     }

//     try {
//         console.log('מתחיל העלאה מרובה של פתרונות עם examId:', examId);
//         console.log('נתונים לפני שליחה:', validFiles);

//         // העברת רק הקבצים התקינים לפונקציית העלאה
//         await bulkUploadExams(examId, userId, validFiles);

//         setSuccessMessage('הקבצים הועלו בהצלחה!');
//         setFilesWithNames([{ file: null, originalFile: null, studentName: '' }]); // איפוס הטופס לאחר העלאה מוצלחת
        
//         // ניתן להעיר את השורה הבאה כדי לנווט לדף המבחן לאחר העלאה מוצלחת
//         // navigate(`/exams/${examId}`);
//     } catch (err: any) {
//         setError(`שגיאה בהעלאת הקבצים: ${err.message || 'שגיאה לא ידועה'}`);
//         console.error('שגיאה בהעלאת קבצים:', err);
//     } finally {
//         setUploading(false);
//     }
// };

//     const handleClose = () => {
//         if (examId !== null) {
//             navigate(`/exams/${examId}`);
//         } else {
//             console.error("מזהה מבחן לא זמין לסגירה.");
//             // כאן אתה יכול להוסיף ניווט למקום אחר או להציג הודעה למשתמש
//         }
//     };

//     return (
//         <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '600px', margin: '20px auto' }}>
//             <h3>העלאה מרובה של פתרונות למבחן #{examId}</h3>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

//             {filesWithNames.map((fileWithName, index) => (
//                 <div key={index} style={{ marginBottom: '15px', border: '1px solid #eee', padding: '10px', borderRadius: '4px', display: 'flex', gap: '10px', alignItems: 'center' }}>
//                     <label style={{ fontWeight: 'bold' }}>קובץ {index + 1}:</label>
//                     <input type="file" onChange={(e) => handleFileChange(e, index)} style={{ flex: 1 }} />
//                     <label style={{ fontWeight: 'bold' }}>שם תלמיד:</label>
//                     <input
//                         type="text"
//                         value={fileWithName.studentName}
//                         onChange={(e) => handleNameChange(e, index)}
//                         style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
//                         placeholder="שם התלמיד"
//                     />
//                     {filesWithNames.length > 1 && (
//                         <button type="button" onClick={() => removeFileInput(index)} style={{ backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 12px', cursor: 'pointer' }}>
//                             הסר
//                         </button>
//                     )}
//                 </div>
//             ))}

//             <button type="button" onClick={addFileInput} style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 15px', cursor: 'pointer', marginBottom: '15px' }}>
//                 הוסף עוד קובץ
//             </button>
            
//             <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
//                 <button
//                     onClick={handleBulkUpload}
//                     disabled={uploading || filesWithNames.some(fwn => !fwn.file || !fwn.studentName)}
//                     style={{ backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 15px', cursor: 'pointer' }}
//                 >
//                     {uploading ? 'מעלה...' : 'העלאת המבחנים ובדיקתם'}
//                 </button>
//                 <button onClick={handleClose} style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 15px', cursor: 'pointer' }}>
//                     סגור
//                 </button>
//             </div>
//         </div>
//     );
// };
// export default UploadStudentExam;