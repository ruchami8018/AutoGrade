using core.IRepositories;
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
    {//
        private readonly IExamUploadRepository _examUploadRepository;
        public ExamUploadService(IExamUploadRepository examUploadRepository)
        {
            _examUploadRepository = examUploadRepository;
        }

        public async Task<bool> AddExamUploadAsync(ExamUpload examUpload)
        {
            return await _examUploadRepository.AddExamUploadAsync(examUpload);
        }

        public async Task<List<ExamUpload>> GetAllByIdAsync(int id)
        {
            return await _examUploadRepository.GetAllByIdAsync(id);
        }

        public async Task<ExamUpload> GetExamUploadAsync(int id, int exam_id)
        {
            return await _examUploadRepository.GetExamUploadAsync(id, exam_id);
        }
    }
}
