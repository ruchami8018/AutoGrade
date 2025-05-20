﻿using core.IRepositories;
using core.IServices;
using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service
{
    public class ExamService : IExamService
    {

        private readonly IExamRepository _examRepository;
        public ExamService(IExamRepository examRepository)
        {
            _examRepository = examRepository;
        }

        public async Task<bool> AddExamAsync(Exam newexam)
        {
            return await _examRepository.AddExamAsync(newexam);
        }

        public async Task<Exam> GetByIdAsync(int id)
        {
            return await _examRepository.GetByIdAsync(id);
        }

        public async Task<List<Exam>> GetExamsByUserIdAsync(int userId)
        {
            return await _examRepository.GetExamsByUserIdAsync(userId);
        }

        public async Task<bool> UpdateExamAsync(Exam exam)
        {
            return await _examRepository.UpdateExamAsync(exam);
        }

        public async Task<bool> DeleteExamAsync(int id)
        {
            return await _examRepository.DeleteExamAsync(id);
        }

    }
}

