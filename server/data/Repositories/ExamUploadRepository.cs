using core.IRepositories;
using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repositories
{
    public class ExamUploadRepository : IExamUploadRepository
    {//עדיין לא מומש!!!!!!!!!!!!!!!!!!!!!!!
        public Task<bool> AddExamUploadAsync(ExamUpload examUpload)
        {
            throw new NotImplementedException();
        }

        public Task<List<ExamUpload>> GetAllByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ExamUpload> GetExamUploadAsync(int id, int exam_id)
        {
            throw new NotImplementedException();
        }
    }
}
