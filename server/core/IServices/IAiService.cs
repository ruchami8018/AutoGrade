﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.IServices
{
    public interface IAiService
    {
        Task<string> GenerateLessonPlanAsync(int userId, string topic, string grade, int duration, List<string> components);
        Task<string> GenerateQuestionsAsync(int userId, string topic, string questionType, string difficulty, int numQuestions, string textOrFileName);
        Task<string> SummarizeTextAsync(int userId, string textOrFileName, string summaryLength, string summaryStyle);
        Task<string> AnalyzeTextAsync(int userId, string textOrFileName, string analysisType);
    }
}
