using core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.IRepositories
{
    public interface IExamRepository
    {
        Task<Exam> GetByIdAsync(int id);
        Task<Exam> AddExamAsync(Exam newexam);
        Task<List<Exam>> GetExamsByUserIdAsync(int userId);
        Task<bool> UpdateExamAsync(Exam exam);
        Task<bool> DeleteExamAsync(int id);
       
    }
}
