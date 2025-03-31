using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.IRepositories
{
    public interface IExamUploadRepository
    {
        Task<ExamUpload> GetExamUploadAsync(int id, int exam_id);

        Task<List<ExamUpload>> GetAllByIdAsync(int id);

        Task<bool> AddExamUploadAsync(ExamUpload examUpload);
    }
}
