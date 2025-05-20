// import axios from "axios";
// import { Exam } from "../models/Exam";

// const API_URL = "https://localhost:7158/api/Exam"
// const UPLOAD_API_URL = "https://localhost:7158/api/ExamUpload";

// export const fetchExamsByUser = async (userId: number): Promise<Exam[]> => {
//     try {
//         const response = await axios.get<Exam[]>(`${API_URL}/user/${userId}`);
//         return response.data;
//     } catch (error) {
//         console.error("שגיאה בשליפת המבחנים:", error);
//         return [];
//     }
// };

// export const addExam = async (
//     userId: number,
//     subject: string,
//     title: string,
//     classNumber: string,
// ): Promise<boolean> => {
//     try {
//         console.log(userId, subject, title, classNumber)
//         const response = await axios.post(API_URL, { userId, subject, title, class: classNumber, exampleExamPath:""});
//         console.log(response)
//         return response.data;
//     } catch (error) {
//         console.error("שגיאה בהוספת המבחן:", error);
//         throw error;
//     }
// };

// export const fetchExamById = async (examId: number): Promise<Exam> => {
//     try {
//         const response = await axios.get<Exam>(`${API_URL}/${examId}`);
//         return response.data;
//     } catch (error) {
//         console.error("שגיאה בטעינת פרטי המבחן:", error);
//         throw error;
//     }
// };

// export const getPresignedUrl = async (fileName: string): Promise<string> => {
//     try {
//         console.log(`${UPLOAD_API_URL}/presigned-url?fileName=${fileName}`);

//         const response = await axios.get<{ url: string }>(`${UPLOAD_API_URL}/presigned-url`, {
//             params: { fileName },
//         });
//         console.log(response.data.url)
//         return response.data.url;
//     } catch (error) {
//         console.error("שגיאה בקבלת ה-Presigned URL:", error);
//         throw error;
//     }
// };

// export const uploadExamUrl = async (
//     examId: number,
//     userId: number,
//     studentName: string,
//     fileUrl: string
// ): Promise<boolean> => {
//     try {
//         const response = await axios.post(`${UPLOAD_API_URL}/upload-url`, {
//             examId,
//             userId,
//             studentName,
//             fileUrl
//         });
//         console.log("הועלה בהצלחה:", response.data);
//         return true;
//     } catch (error) {
//         console.error("שגיאה בהעלאת ה-URL:", error);
//         throw error;
//     }
// };

// export const fetchExamUploadsByExamId = async (examId: number): Promise<any[]> => {
//     try {
//         const response = await axios.get<any[]>(`${API_URL}/${examId}/uploads`);
//         return response.data;
//     } catch (error) {
//         console.error("שגיאה בשליפת העלאות המבחן:", error);
//         throw error;
//     }
// };

// export const updateExam = async (
//     examId: number,
//     userId: number,
//     subject: string,
//     title: string,
//     classNumber: string,
//     exampleExamPath: string // הוספת שדה
// ): Promise<boolean> => {
//     try {
//         const response = await axios.put(`${API_URL}/${examId}`, {
//             id: examId,
//             userId: userId,
//             subject: subject,
//             title: title,
//             class: classNumber,
//             exampleExamPath: exampleExamPath, //הוספת שדה
//         });
//         return response.data;
//     } catch (error) {
//         console.error("שגיאה בעדכון המבחן:", error);
//         throw error;
//     }
// };

// export const bulkUploadExams = async (
//     examId: number,
//     filesWithNames: { file: File | null; studentName: string }[]
// ): Promise<boolean> => {
//     try {
//         for (const fileWithName of filesWithNames) {
//             if (fileWithName.file && fileWithName.studentName) {
//                 const fileName = fileWithName.file.name;
//                 const presignedUrlResponse = await axios.get<{ url: string }>(`${UPLOAD_API_URL}/presigned-url`, {
//                     params: { fileName },
//                 });
//                 const presignedUrl = presignedUrlResponse.data.url;

//                 await axios.put(presignedUrl, fileWithName.file, {
//                     headers: {
//                         'Content-Type': fileWithName.file.type,
//                     },
//                 });

//                 const fileAccessUrl = presignedUrl.split('?')[0];

//                 await axios.post(`${UPLOAD_API_URL}/upload-url`, {
//                     examId: examId,
//                     studentName: fileWithName.studentName,
//                     fileUrl: fileAccessUrl,
//                 });
//             } else if (fileWithName.file && !fileWithName.studentName) {
//                 console.error("שגיאה: אנא הזן שם תלמיד עבור קובץ.", fileWithName.file.name);
//                 throw new Error("אנא הזן שם תלמיד עבור כל קובץ.");
//             } else if (!fileWithName.file && fileWithName.studentName) {
//                 console.error("שגיאה: אנא בחר קובץ עבור שם התלמיד.", fileWithName.studentName);
//                 throw new Error("אנא בחר קובץ עבור השם שהוזן.");
//             }
//         }
//         console.log("העלאה מרובה של פתרונות הצליחה.");
//         return true;
//     } catch (error) {
//         console.error("שגיאה בהעלאה מרובה של פתרונות:", error);
//         throw error;
//     }
// };

// export const deleteExam = async (examId: number): Promise<boolean> => {
//     try {
//         const response = await axios.delete(`${API_URL}/${examId}`);
//         if (response.status === 200) {
//             return true;
//         } else {
//             console.error("שגיאה במחיקת המבחן: קוד סטטוס לא תקין", response.status);
//             throw new Error(`שגיאה במחיקת המבחן: קוד סטטוס לא תקין ${response.status}`);
//         }
//     } catch (error) {
//         console.error("שגיאה במחיקת המבחן:", error);
//         throw error;
//     }
// };




import axios from "axios";
import { Exam } from "../models/Exam";
import { ExamUpload } from "../models/ExamUpload";

const API_URL = "https://localhost:7158/api/Exam"
const UPLOAD_API_URL = "https://localhost:7158/api/ExamUpload";

export const fetchExamsByUser = async (userId: number): Promise<Exam[]> => {
    try {
        const response = await axios.get<Exam[]>(`${API_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("שגיאה בשליפת המבחנים:", error);
        return [];
    }
};

export const addExam = async (userId: number, subject: string, title: string, classNumber: number) => {
    try {
        console.log(userId, subject, title, classNumber)
        const response = await axios.post(API_URL, { userId, subject, title, class: classNumber, exampleExamPath:""});
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("שגיאה בהוספת המבחן:", error);
        throw error;
    }
};

export const fetchExamById = async (examId: number) => {
    try {
        const response = await axios.get<Exam>(`${API_URL}/${examId}`);
        return response.data;
    } catch (error) {
        console.error("שגיאה בטעינת פרטי המבחן:", error);
        throw error;
    }
};

export const getPresignedUrl = async (fileName: string) => {
    try {
        console.log(`${UPLOAD_API_URL}/presigned-url?fileName=${fileName}`);

        const response = await axios.get(`${UPLOAD_API_URL}/presigned-url`, {
            params: { fileName },
        });
        console.log(response.data.url)
        return response.data.url;
    } catch (error) {
        console.error("שגיאה בקבלת ה-Presigned URL:", error);
        throw error;
    }
};

export const uploadExamUrl = async (examId: number, userId: number, studentName: string, fileUrl: string) => {
    try {
        const response = await axios.post(`${UPLOAD_API_URL}/upload-url`, {
            examId,
            userId,
            studentName,
            fileUrl
        });
        console.log("הועלה בהצלחה:", response.data);
        return true;
    } catch (error) {
        console.error("שגיאה בהעלאת ה-URL:", error);
        throw error;
    }
};

export const fetchExamUploadsByExamId = async (examId: number) => {
    try {
        const response = await axios.get<ExamUpload[]>(`${API_URL}/${examId}/uploads`);
        return response.data;
    } catch (error) {
        console.error("שגיאה בשליפת העלאות המבחן:", error);
        throw error;
    }
};

export const updateExam = async (examId: number, userId: number, subject: string, title: string, classNumber: number, exampleExamPath: string) => {
    try {
        const response = await axios.put(`${API_URL}/${examId}`, {
            id: examId,
            userId: userId,
            subject: subject,
            title: title,
            class: classNumber,
            exampleExamPath: exampleExamPath, //הוספת שדה
        });
        return response.data;
    } catch (error) {
        console.error("שגיאה בעדכון המבחן:", error);
        throw error;
    }
};

export const bulkUploadExams = async (
    examId: number,
    filesWithNames: { file: File | null, studentName: string }[]
) => {
    try {
        for (const fileWithName of filesWithNames) {
            if (fileWithName.file && fileWithName.studentName) {
                const fileName = fileWithName.file.name;
                const presignedUrlResponse = await axios.get(`${UPLOAD_API_URL}/presigned-url`, {
                    params: { fileName },
                });
                const presignedUrl = presignedUrlResponse.data.url;

                await axios.put(presignedUrl, fileWithName.file, {
                    headers: {
                        'Content-Type': fileWithName.file.type,
                    },
                });

                const fileAccessUrl = presignedUrl.split('?')[0];

                await axios.post(`${UPLOAD_API_URL}/upload-url`, {
                    examId: examId,
                    studentName: fileWithName.studentName,
                    fileUrl: fileAccessUrl,
                });
            } else if (fileWithName.file && !fileWithName.studentName) {
                console.error("שגיאה: אנא הזן שם תלמיד עבור קובץ.", fileWithName.file.name);
                throw new Error("אנא הזן שם תלמיד עבור כל קובץ.");
            } else if (!fileWithName.file && fileWithName.studentName) {
                console.error("שגיאה: אנא בחר קובץ עבור שם התלמיד.", fileWithName.studentName);
                throw new Error("אנא בחר קובץ עבור השם שהוזן.");
            }
        }
        console.log("העלאה מרובה של פתרונות הצליחה.");
        return true;
    } catch (error) {
        console.error("שגיאה בהעלאה מרובה של פתרונות:", error);
        throw error;
    }
};

export const deleteExam = async (examId: number) => {
    try {
        const response = await axios.delete(`${API_URL}/${examId}`);
        if (response.status === 200) {
            return true;
        } else {
            console.error("שגיאה במחיקת המבחן: קוד סטטוס לא תקין", response.status);
            throw new Error(`שגיאה במחיקת המבחן: קוד סטטוס לא תקין ${response.status}`);
        }
    } catch (error) {
        console.error("שגיאה במחיקת המבחן:", error);
        throw error;
    }
};