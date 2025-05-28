using core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.IServices
{
    public interface IExamService
    {
        Task<Exam> GetByIdAsync(int id);
        Task<Exam> AddExamAsync(Exam newexam);
        Task<List<Exam>> GetExamsByUserIdAsync(int userId);
        Task<bool> UpdateExamAsync(Exam exam);
        Task<bool> DeleteExamAsync(int id);
        Task ProcessStudentExamsAsync(List<IFormFile> files, int examId);
    }
}
