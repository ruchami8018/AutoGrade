import axios, { AxiosResponse } from 'axios';
import { File } from '../models/File';
// import { FileDto } from '../models/File';

const API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_API_URL!;
const API_FILES_URL = `${API_BASE_URL}/Files`;
const API_UPLOAD_URL = `${API_BASE_URL}/FileUpload`;

export interface AddFileResponse {
    id?: number;
    userId: number;
    subject: string;
    title: string;
    class: string;
    exampleExamPath: string;
    examUploads?: any[];
    error?: string;
}
  
export const fetchFilesByUser = async (userId: number): Promise<File[]> => { 
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<File[]>(`${API_FILES_URL}/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(`Fetched files for user ${userId}:`, response.data); 
    return response.data;
  } catch (error) {
    console.error(`Error fetching files for user ${userId}:`, error);
    throw error;
  }
};

export const addFile = async (
    userId: number,
    title: string,
    filePath: string,
    tags: string,
    description: string,
    type: string, 
    size: number, 
  ): Promise<AxiosResponse<AddFileResponse>> => {
    try {
      const token = localStorage.getItem('token');
      console.log("Sending to backend:", { userId, title, tags, description, filePath, type, size }); 
      const response = await axios.post<AddFileResponse>(API_FILES_URL, {
        userId,
        title,
        filePath: filePath, 
        tags,
        description,
        type, 
        size, 
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error("שגיאה בהוספת הקובץ:", error);
      throw error;
    }
  };

//   export const addFile = async (
//     userId: number,
//     title: string,
//     filePath: string,
//     tags: string,
//     description: string,
//     type: string, 
//     size: number, 
//     // date: Date
//   ): Promise<AxiosResponse<AddFileResponse>> => {
//     try {
//       console.log("Sending to backend:", { userId, title, tags, description, filePath, type, size }); 
//       const response = await axios.post<AddFileResponse>(API_FILES_URL, {
//         userId,
//         title,
//         filePath: filePath, 
//         tags,
//         description,
//         type, 
//         size, 
//       });
//       console.log(response);
//       return response;
//     } catch (error) {
//       console.error("שגיאה בהוספת הקובץ:", error);
//       throw error;
//     }
//   };

export const getPresignedUrl = async (fileName: string): Promise<string> => {
    try {
        console.log(`${API_UPLOAD_URL}/presigned-url?fileName=${fileName}`);

        const response = await axios.get<{ url: string }>(`${API_UPLOAD_URL}/presigned-url`, {
            params: { fileName },
        });
        console.log(response.data.url);
        return response.data.url;
    } catch (error) {
        console.error("שגיאה בקבלת ה-Presigned URL:", error);
        throw error;
    }
};


export const fetchFilesById = async (fileId: number): Promise<File> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get<File>(`${API_FILES_URL}/${fileId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("שגיאה בטעינת פרטי הקובץ:", error);
        throw error;
    }
};

export const uploadFileUrl = async (
    fileId: number,
    userId: number,
    studentName: string,
    fileUrl: string
): Promise<boolean> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_UPLOAD_URL}/upload-url`, {
            fileId,
            userId,
            studentName,
            fileUrl
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log("הועלה בהצלחה:", response.data);
        return true;
    } catch (error) {
        console.error("שגיאה בהעלאת ה-URL:", error);
        throw error;
    }
};

export const updateFile = async (
    fileId: number,
    userId: number,
    title: string,
    tags: string,
    description: string, 
    fileUrl: string,
): Promise<boolean> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_FILES_URL}/${fileId}`, {
            id: fileId,
            userId: userId,
            title: title,
            tags: tags,
            description: description, 
            fileUrl: fileUrl,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("שגיאה בעדכון הקובץ:", error);
        throw error;
    }
};

export const deleteFile = async (fileId: number): Promise<boolean> => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${API_FILES_URL}/${fileId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return true;
        } else {
            console.error("שגיאה במחיקת הקובץ: קוד סטטוס לא תקין", response.status);
            throw new Error(`שגיאה במחיקת הקובץ: קוד סטטוס לא תקין ${response.status}`);
        }
    } catch (error) {
        console.error("שגיאה במחיקת הקובץ:", error);
        throw error;
    }
};;