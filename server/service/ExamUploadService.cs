using core.DTOs;
using core.IRepositories;
using core.IServices;
using core.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service
{
    //public class ExamUploadService : IExamUploadService
    //{//
    //    private readonly IExamUploadRepository _examUploadRepository;
    //    public ExamUploadService(IExamUploadRepository examUploadRepository)
    //    {
    //        _examUploadRepository = examUploadRepository;
    //    }

    //    public async Task<bool> AddExamUploadAsync(ExamUpload examUpload)
    //    {
    //        return await _examUploadRepository.AddExamUploadAsync(examUpload);
    //    }

    //    public async Task<List<ExamUpload>> GetAllByIdAsync(int id)
    //    {
    //        return await _examUploadRepository.GetAllByIdAsync(id);
    //    }

    //    public async Task<ExamUpload> GetExamUploadByIdAsync(int id)
    //    {
    //        return await _examUploadRepository.GetExamUploadByIdAsync(id);
    //    }
    //    public async Task<bool> DeleteExamUploadAsync(int id)
    //    {
    //        return await _examUploadRepository.DeleteExamUploadAsync(id);
    //    }
    //    public async Task<bool> UpdateExamUploadAsync(ExamUpload examUpload)
    //    {
    //        return await _examUploadRepository.UpdateExamUploadAsync(examUpload);
    //    }
    //    public Task<List<ExamResultDto>> ProcessStudentExamsAsync(List<IFormFile> files, int examId)
    //    {
    //        var results = files.Select(file => new ExamResultDto
    //        {
    //            StudentName = Path.GetFileNameWithoutExtension(file.FileName),
    //            StudentEmail = $"{Path.GetFileNameWithoutExtension(file.FileName)}@example.com",
    //            Grade = 100,
    //            Feedback = "עבודה מעולה!"
    //        }).ToList();

    //        return Task.FromResult(results);
    //    }

    //}
}
