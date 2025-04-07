// export type Exam = {

//     subject : string, 
//     title : string,
//     class : string[]
// }

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

export type Exam ={
    id: number;
    userId: number;
    subject: string;
    title: string;
    createdAt: string; // או Date, תלוי בפורמט של ה-API
    // class: string;
    questions: any[]; // החלף בטיפוס מתאים לשאלות
    exampleExamPath: string;
    examUploads: ExamUpload[]; // הוספת שדה זה
}