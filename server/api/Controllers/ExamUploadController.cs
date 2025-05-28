﻿using Amazon.S3;
using Amazon.S3.Model;
using core.DTOs;
using core.IServices;
using core.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamUploadController : ControllerBase
    {
        // GET: api/<ExamUploadController>
        private readonly IAmazonS3 _s3Client;//התקנת ספרייה של S3 של AWS AMAZON
        private readonly string _bucketName;
        private readonly IExamService _examService;
        private readonly IExamUploadService _examUploadService;

        public ExamUploadController(IAmazonS3 s3Client, IConfiguration configuration, IExamService examService, IExamUploadService examUploadService)
        {
            _s3Client = s3Client;
            _bucketName = Environment.GetEnvironmentVariable("AWS_BUCKET_NAME");
            _examService = examService;
            _examUploadService = examUploadService;
            Console.WriteLine(_bucketName);
            //_bucketName = configuration["AWS:BucketName"];
        }

        //[HttpGet("presigned-url")]
        //public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName, [FromQuery] string contentType)
        //{
        //    if (string.IsNullOrEmpty(fileName))
        //        return BadRequest("שם הקובץ נדרש");

        //    var request = new GetPreSignedUrlRequest
        //    {
        //        BucketName = _bucketName,
        //        Key = fileName,
        //        Verb = HttpVerb.PUT,
        //        Expires = DateTime.UtcNow.AddMinutes(20)
        //        // בלי ContentType בכלל
        //    };


        //    try
        //    {
        //        string url = _s3Client.GetPreSignedURL(request);
        //        return Ok(new { url });
        //    }
        //    catch (AmazonS3Exception ex)
        //    {
        //        return StatusCode(500, $"Error generating presigned URL: {ex.Message}");
        //    }
        //}
        //[HttpPost("process-student-exams/{examId}")]
        //public async Task<IActionResult> ProcessStudentExams(int examId, [FromForm] List<IFormFile> files)
        //{
        //    // Fixed the missing method call in _examService. Assuming a method named ProcessStudentExamsAsync exists.
        //    var results = await _examService.ProcessStudentExamsAsync(files, examId);

        //    var stats = new
        //    {
        //        Max = results.Max(r => r.Grade),
        //        Min = results.Min(r => r.Grade),
        //        Avg = results.Average(r => r.Grade),
        //        //Median = results.OrderBy(r => r.Grade).ElementAt(results.Count / 2)
        //    };

        //    return Ok(new { results, stats });
        //}




        //[HttpGet("presigned-url")]
        //public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        //{
        //    if (string.IsNullOrEmpty(fileName))
        //        return BadRequest("שם הקובץ נדרש");

        //    var request = new GetPreSignedUrlRequest
        //    {
        //        BucketName = _bucketName,
        //        Key = fileName, // קבצים נשמרים בתיקיית exams
        //        //Key = $"{fileName}", // קבצים נשמרים בתיקיית exams
        //        Verb = HttpVerb.PUT,
        //        Expires = DateTime.UtcNow.AddMinutes(20),
        //        //ContentType = "application/pdf" // ניתן לשנות לסוג קובץ אחר
        //        //ContentType = "multipart/form-data"
        //    };
        //    //request.Headers["x-amz-acl"] = "bucket-owner-full-control";

        //    try
        //    {
        //        Console.WriteLine(fileName);
        //        string url = _s3Client.GetPreSignedURL(request);
        //        return Ok(new { url });
        //    }
        //    catch (AmazonS3Exception ex)
        //    {
        //        return StatusCode(500, $"Error generating presigned URL: {ex.Message}");
        //    }
        //}

        
        [HttpGet("presigned-url")]
        public async Task<IActionResult> GeneratePresignedUrlAsync(string fileName, string contentType)
        {
            var bucketName = _bucketName;
            var key = $"{Guid.NewGuid()}_{fileName}";

            var request = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = key,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(15),
                ContentType = contentType
            };

            var uploadUrl = _s3Client.GetPreSignedURL(request);
            var publicUrl = $"https://{bucketName}.s3.amazonaws.com/{key}";

            return Ok(new
            {
                uploadUrl,
                publicUrl
            });
        }



        //[HttpGet("presigned-url")]
        //public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName)
        //{
        //    if (string.IsNullOrEmpty(fileName))
        //        return BadRequest("שם הקובץ נדרש");

        //    var request = new GetPreSignedUrlRequest//משהו של אמזון
        //    {
        //        BucketName = _bucketName,
        //        Key = fileName, // קבצים נשמרים בתיקיית exams
        //        //Key = $"{fileName}", // קבצים נשמרים בתיקיית exams
        //        Verb = HttpVerb.PUT,
        //        Expires = DateTime.UtcNow.AddMinutes(20),
        //        //ContentType = "application/pdf" // ניתן לשנות לסוג קובץ אחר
        //        //ContentType = "multipart/form-data"
        //    };
        //    //request.Headers["x-amz-acl"] = "bucket-owner-full-control";
        //    try
        //    {
        //        Console.WriteLine(fileName);

        //        string url = _s3Client.GetPreSignedURL(request);
        //        return Ok(new { url });
        //    }
        //    catch (AmazonS3Exception ex)
        //    {
        //        return StatusCode(500, $"Error generating presigned URL: {ex.Message}");
        //    }
        //}


        [HttpPost("upload-url")]
        public async Task<IActionResult> UploadExamUrl([FromBody] ExamUploadDto request)
        {
            if (string.IsNullOrEmpty(request.FilePath))
                return BadRequest("ה-URL לא תקין");

            var exam = await _examService.GetByIdAsync(request.ExamId ?? 0);
            if (exam == null)
                return NotFound("המבחן לא נמצא");

            // חישוב מספר ההגשה של התלמיד
            var existingUploads = await _examUploadService.GetAllByIdAsync(request.ExamId ?? 0) ?? new List<ExamUpload>();
            int submissionNumber = existingUploads.Count + 1;

            // יצירת אובייקט חדש של ExamUpload
            var newExamUpload = new ExamUpload
            {
                UserId = request.UserId,
                ExamId = request.ExamId,
                StudentName = request.StudentName,
                FilePath = request.FilePath,
                UploadDate = DateTime.UtcNow,
                Score = 0, // ציון ראשוני
                SubmissionNumber = submissionNumber
            };

            // הוספה למסד נתונים
            await _examUploadService.AddExamUploadAsync(newExamUpload);
            // הוספה לרשימת ההעלאות של המבחן
            exam.ExamUploads.Add(newExamUpload);
            await _examService.UpdateExamAsync(exam);
            return Ok(new { Message = "ה-URL נוספה בהצלחה למבחן", SubmissionNumber = submissionNumber });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExamUpload(int id)
        {
            var result = await _examUploadService.DeleteExamUploadAsync(id);
            if (result)
            {
                return Ok(new { Message = $"ההעלאה עם מזהה {id} נמחקה בהצלחה." });
            }
            else
            {
                return NotFound($"לא נמצאה העלאה עם מזהה {id}.");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExamUpload(int id, [FromBody] ExamUploadDto request)
        {
            if (id != request.ExamId) // ודא שה-ID בנתיב תואם ל-ID בגוף הבקשה (אם ה-DTO מכיל ExamId)
            {
                return BadRequest("מזהה ההעלאה בנתיב אינו תואם למזהה בגוף הבקשה.");
            }

            var existingUpload = await _examUploadService.GetExamUploadByIdAsync(id);
            if (existingUpload == null)
            {
                return NotFound($"לא נמצאה העלאה עם מזהה {id}.");
            }

            // עדכן את המאפיינים של ההעלאה הקיימת עם הערכים מהבקשה
            existingUpload.StudentName = request.StudentName;
            existingUpload.FilePath = request.FilePath;
            // אם יש שדות נוספים שאתה רוצה לאפשר עדכון (כמו Score), עדכן אותם כאן

            await _examUploadService.UpdateExamUploadAsync(existingUpload);

            return Ok(new { Message = $"ההעלאה עם מזהה {id} עודכנה בהצלחה." });
        }


        //[Consumes("multipart/form-data")]
        //[HttpPost("upload")]
        //public async Task<IActionResult> UploadStudentExam([FromRoute] int examId, [FromForm] IFormFile file)
        //{
        //    if (file == null || file.Length == 0)
        //        return BadRequest("לא נבחר קובץ");

        //    var exam = await _examService.GetByIdAsync(examId);
        //    if (exam == null)
        //        return NotFound("המבחן לא נמצא");

        //    // חישוב מספר הגשה אוטומטי
        //    var existingUploads = await _examUploadService.GetAllByIdAsync(examId) ?? new List<ExamUpload>();
        //    int submissionNumber = existingUploads.Count + 1;

        //    // טיפול בשם הקובץ למניעת בעיות
        //    var safeFileName = Path.GetFileNameWithoutExtension(file.FileName)
        //                           .Replace(" ", "_")
        //                           .Replace(".", "_")
        //                           .Replace("/", "_")
        //                           .Replace("\\", "_");
        //    var fileName = $"{Guid.NewGuid()}_{safeFileName}{Path.GetExtension(file.FileName)}";

        //    var request = new PutObjectRequest
        //    {
        //        BucketName = _bucketName,
        //        Key = fileName,
        //        InputStream = file.OpenReadStream(),
        //        ContentType = file.ContentType
        //    };

        //    await _s3Client.PutObjectAsync(request);
        //    var fileUrl = $"https://{_bucketName}.s3.amazonaws.com/{fileName}";

        //    // יצירת מבחן חדש עם מספר רץ
        //    var upload = new ExamUpload
        //    {
        //        ExamId = examId,
        //        SubmissionNumber = submissionNumber, // מספר אוטומטי
        //        FilePath = fileUrl,
        //        UploadDate = DateTime.UtcNow,
        //        Score = 0
        //    };

        //    await _examUploadService.AddExamUploadAsync(upload);

        //    return Ok(new { Message = "המבחן הועלה בהצלחה", SubmissionNumber = submissionNumber, FileUrl = fileUrl });
        //}

    }
}
