using core.IServices;
using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service
{
    public class ExamUploadService : IExamUploadService
    {///לא מומש עדיין----------------------
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
