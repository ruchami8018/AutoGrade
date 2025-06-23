using core.DTOs;
using core.IRepositories;
using core.IServices;
using core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service
{
    //public class ExamService : IExamService
    //{

    //    private readonly IExamRepository _examRepository;
    //    public ExamService(IExamRepository examRepository)
    //    {
    //        _examRepository = examRepository;
    //    }

    //    public async Task<Exam> AddExamAsync(Exam newexam)
    //    {
    //        return await _examRepository.AddExamAsync(newexam);
    //    }

    //    public async Task<Exam> GetByIdAsync(int id)
    //    {
    //        return await _examRepository.GetByIdAsync(id);
    //    }

    //    public async Task<List<Exam>> GetExamsByUserIdAsync(int userId)
    //    {
    //        return await _examRepository.GetExamsByUserIdAsync(userId);
    //    }

    //    public async Task<bool> UpdateExamAsync(Exam exam)
    //    {
    //        return await _examRepository.UpdateExamAsync(exam);
    //    }

    //    public async Task<bool> DeleteExamAsync(int id)
    //    {
    //        return await _examRepository.DeleteExamAsync(id);
    //    }

    //    public async Task ProcessStudentExamsAsync(List<IFormFile> files, int examId)
    //    {


    //        var exam = await _examRepository.GetByIdAsync(examId);
    //        if (exam == null)
    //        {
    //            throw new Exception("Exam not found");
    //        }
    //        foreach (var file in files)
    //        {
    //            var upload = new ExamUpload
    //            {
    //                //FileName = file.FileName,
    //                FilePath = Path.Combine("uploads", file.FileName),
    //                ExamId = examId
    //            };
    //            // Save the file to the server or process it as needed
    //            using (var stream = new FileStream(upload.FilePath, FileMode.Create))
    //            {
    //                await file.CopyToAsync(stream);
    //            }
    //            // Add the upload to the exam's uploads
    //            exam.ExamUploads.Add(upload);
    //        }
    //        await _examRepository.UpdateExamAsync(exam);

    //    }
    //}
}

