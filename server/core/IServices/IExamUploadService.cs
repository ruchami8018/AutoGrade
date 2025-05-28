using core.DTOs;
using core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.IServices
{
    public interface IExamUploadService
    {
        Task<ExamUpload> GetExamUploadByIdAsync(int id);

        Task<List<ExamUpload>> GetAllByIdAsync(int id);

        Task<bool> AddExamUploadAsync(ExamUpload examUpload);
        Task<bool> UpdateExamUploadAsync(ExamUpload examUpload);

        Task<bool> DeleteExamUploadAsync(int id);
        Task<List<ExamResultDto>> ProcessStudentExamsAsync(List<IFormFile> files, int examId);

    }
}
