// import React, { useState } from 'react';
// import { bulkUploadExams } from '../../services/examService'; // ייבוא הפונקציה משירות
// import { useNavigate, useParams } from 'react-router-dom';

// interface FileWithStudentName {
//     file: File | null;
//     studentName: string;
// }

// const UploadStudentExam: React.FC = () => {
//     const { examId: examIdParam } = useParams(); // חילוץ הפרמטר examId מהנתיב
//     const examId = examIdParam ? parseInt(examIdParam, 10) : null; // המרה למספר
//     const [filesWithNames, setFilesWithNames] = useState<FileWithStudentName[]>([{ file: null, studentName: '' }]);
//     const [uploading, setUploading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);
//     const navigate = useNavigate();

//     // ... (שאר הקוד של הקומפוננטה: handleFileChange, handleNameChange, addFileInput, removeFileInput)

//     const handleBulkUpload = async () => {
//         setUploading(true);
//         setError(null);
//         setSuccessMessage(null);

//         if (examId === null) {
//             setError('מזהה מבחן לא תקין.');
//             setUploading(false);
//             return;
//         }

//         try {
//             await bulkUploadExams(examId, filesWithNames.filter(fwn => fwn.file && fwn.studentName));
//             setSuccessMessage('הקבצים הועלו בהצלחה!');
//             setFilesWithNames([{ file: null, studentName: '' }]);
//             navigate(`/exams/${examId}`);
//         } catch (err: any) {
//             setError(`שגיאה בהעלאת הקבצים: ${err.message}`);
//             console.error('שגיאה בהעלאת קבצים:', err);
//         } finally {
//             setUploading(false);
//         }
//     };

//     const handleClose = () => {
//         if (examId !== null) {
//             navigate(`/exams/${examId}`);
//         } else {
//             // טפל במקרה שבו אין examId תקין
//             console.error("מזהה מבחן לא זמין לסגירה.");
//             // אולי תרצה לנווט למקום אחר או להציג הודעה
//         }
//     };

//     return (
//         <div style={{ /* סגנון */ }}>
//             <h2>oooooo</h2>

//             <h3>העלאה מרובה של פתרונות</h3>
//             {/* ... (שאר התצוגה) */}
//             <button onClick={handleBulkUpload} disabled={uploading || filesWithNames.some(fwn => !fwn.file || !fwn.studentName)}>
//                 {uploading ? 'מעלה...' : 'העלה את כל הקבצים'}
//             </button>
//             <button onClick={handleClose}>סגור</button>
//         </div>
//     );
// };

// export default UploadStudentExam;
import React, { useState } from 'react';
import { bulkUploadExams } from '../../services/examService';
import { useNavigate, useParams } from 'react-router-dom';

interface FileWithStudentName {
    file: File | null;
    studentName: string;
}

const UploadStudentExam: React.FC = () => {
    const { examId: examIdParam } = useParams();
    const examId = examIdParam ? parseInt(examIdParam, 10) : null;
    const [filesWithNames, setFilesWithNames] = useState<FileWithStudentName[]>([{ file: null, studentName: '' }]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newFilesWithNames = [...filesWithNames];
        newFilesWithNames[index] = { ...newFilesWithNames[index], file: event.target.files?.[0] || null };
        setFilesWithNames(newFilesWithNames);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newFilesWithNames = [...filesWithNames];
        newFilesWithNames[index] = { ...newFilesWithNames[index], studentName: event.target.value };
        setFilesWithNames(newFilesWithNames);
    };

    const addFileInput = () => {
        setFilesWithNames([...filesWithNames, { file: null, studentName: '' }]);
    };

    const removeFileInput = (index: number) => {
        if (filesWithNames.length > 1) {
            const newFilesWithNames = filesWithNames.filter((_, i) => i !== index);
            setFilesWithNames(newFilesWithNames);
        }
    };

    const handleBulkUpload = async () => {
        setUploading(true);
        setError(null);
        setSuccessMessage(null);

        if (examId === null) {
            setError('מזהה מבחן לא תקין.');
            setUploading(false);
            return;
        }

        console.log('handleBulkUpload נקרא עם examId:', examId);
        console.log('נתונים לפני שליחה:', filesWithNames.filter(fwn => fwn.file && fwn.studentName));

        try {
            await bulkUploadExams(examId, filesWithNames.filter(fwn => fwn.file && fwn.studentName));
            setSuccessMessage('הקבצים הועלו בהצלחה!');
            setFilesWithNames([{ file: null, studentName: '' }]); // איפוס הטופס לאחר העלאה מוצלחת
            navigate(`/exams/${examId}`);
        } catch (err: any) {
            setError(`שגיאה בהעלאת הקבצים: ${err.message}`);
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
                    {uploading ? 'מעלה...' : 'העלה את כל הקבצים'}
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