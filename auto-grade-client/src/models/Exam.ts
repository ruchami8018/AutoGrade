// export type Exam = {

import { ExamUpload } from "./ExamUpload";

//     subject : string, 
//     title : string,
//     class : string[]
// }



export type Exam = {
    id: number;
    userId: number;
    subject: string;
    title: string;
    createdAt: string;
    class: number;
    questions: any[];
    exampleExamPath: string;
    examUploads: ExamUpload[];
}