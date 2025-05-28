using Amazon.S3.Model;
using Amazon.S3;
using api.Models;
using AutoMapper;
using core.DTOs;
using core.IServices;
using core.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly IExamService _examService;
        private readonly IExamUploadService _examUploadService;
        private readonly IMapper _mapper;
        public ExamController(IExamService examService, IExamUploadService examUploadService, IMapper mapper)
        {
            _examService = examService;
            _examUploadService = examUploadService;
            _mapper = mapper;
        }
        
        [HttpGet("{id}")]//הבאת מבחן בודד מסוים על פי ה ID שלו
        public async Task<ActionResult<ExamDto>> Get(int id)
        {
            var exam = await _examService.GetByIdAsync(id);
            return Ok(_mapper.Map<ExamDto>(exam));
        }

        [HttpGet("user/{userId}")]//הבאת כל המבחנים של משתמש מסוים על פי ה ID שלו
        public async Task<ActionResult<List<ExamDto>>> GetExamsByUserId(int userId)
        {
            var exams = await _examService.GetExamsByUserIdAsync(userId);
            if (exams == null || exams.Count == 0)
            {
                return NotFound("No exams found for this user");
            }
            return Ok(_mapper.Map<List<ExamDto>>(exams));
        }

        [HttpPost]//הוספה של מבחן
        public async Task<ActionResult<Exam>> Post([FromBody] ExamPost examPost)
        {
            var exam = _mapper.Map<Exam>(examPost);
            return Ok(await _examService.AddExamAsync(exam));
        }

        [HttpGet("{examId}/uploads")]//הבאת כל ההעלאות של מבחן מסוים
        public async Task<ActionResult<List<ExamUploadDto>>> GetExamUploadsByExamId(int examId)
        {
            Console.WriteLine($"Received request for examId: {examId}");
            var uploads = await _examUploadService.GetAllByIdAsync(examId);
            if (uploads == null || uploads.Count == 0)
            {
                return NotFound("No uploads found for this exam");
            }
            return Ok(_mapper.Map<List<ExamUploadDto>>(uploads));
        }

        [HttpPut("{id}")]//עדכון מבחן בודד
        public async Task<ActionResult<bool>> UpdateExam(int id, [FromBody] ExamDto examUpdate)
        {
            var exam = _mapper.Map<Exam>(examUpdate);
            exam.ExamId = id; // וודא שהמזהה מוגדר
            return Ok(await _examService.UpdateExamAsync(exam));
        }

        // ExamsController.cs
        [HttpDelete("{id}")]//מחיקת מבחן מסויים על פי ה ID שלו
        public async Task<ActionResult<bool>> Delete(int id)
        {
            try
            {
                var result = await _examService.DeleteExamAsync(id);
                if (!result)
                {
                    return NotFound($"Exam with id {id} not found.");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
