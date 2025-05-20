export type ExamUpload= {
    id: number;
    submissionNumber: number;
    userId: number;
    examId: number;
    studentName: string;
    filePath: string;
    uploadDate: string; // או Date, תלוי בפורמט של ה-API
    score: number;
}