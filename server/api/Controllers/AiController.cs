using Amazon.Runtime.Internal;
using api.Models;
using core.IServices;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AiController : ControllerBase
    {
        private readonly IAiService _aiService;

        public AiController(IAiService aiService)
        {
            _aiService = aiService;
        }

        [HttpPost("lesson-plan")]
        public async Task<IActionResult> GenerateLessonPlan([FromBody] AIRequests request)
        {
            var result = await _aiService.GenerateLessonPlanAsync(
                request.UserId, request.Topic, request.Grade, request.Duration, request.Components);

            return Ok(result);
        }

        [HttpPost("generate-questions")]
        public async Task<IActionResult> GenerateQuestions([FromBody] QuestionRequest request)
        {
            var result = await _aiService.GenerateQuestionsAsync(
                request.UserId, request.Topic, request.QuestionType, request.Difficulty,
                request.NumQuestions, request.TextOrFileName);

            return Ok(result);
        }

        [HttpPost("summarize")]
        public async Task<IActionResult> SummarizeText([FromBody] SummarizeRequest request)
        {
            var result = await _aiService.SummarizeTextAsync(
                request.UserId, request.TextOrFileName, request.SummaryLength, request.SummaryStyle);

            return Ok(result);
        }

        [HttpPost("analyze")]
        public async Task<IActionResult> AnalyzeText([FromBody] AnalyzeRequest request)
        {
            var result = await _aiService.AnalyzeTextAsync(
                request.UserId, request.TextOrFileName, request.AnalysisType);

            return Ok(result);
        }
    }
}
