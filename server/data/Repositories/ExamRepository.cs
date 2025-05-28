using Amazon.S3;
using Amazon.S3.Model;
using core.IRepositories;
using core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repositories
{
    public class ExamRepository : IExamRepository
    {
        private readonly DataContext _context;
        private readonly IAmazonS3 _s3Client;//התקנת ספרייה של S3 של AWS AMAZON
        //private readonly string _bucketName;

        public ExamRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Exam> AddExamAsync(Exam newexam)
        {
            _context.Exams.Add(newexam);
            await _context.SaveChangesAsync();
            return newexam;
        }
        //public async Task<Exam> AddExamAsync(Exam newexam)
        //{
        //    _context.Exams.Add(newexam);
        //    await _context.SaveChangesAsync(); // רק שומר את השינויים
        //    return newexam; // מחזיר את המבחן לאחר שהתווסף (כולל ה־ID)
        //}


        public async Task<Exam> GetByIdAsync(int id)//הבאת מבחן מסויים על פי הID שלו
        {
            return await _context.Exams.FirstOrDefaultAsync(e => e.ExamId == id) ?? throw new Exception("Exam not found");
        }

        public async Task<List<Exam>> GetExamsByUserIdAsync(int userId)//הבאת של המבחנים של יוזר מסוים
        {
            return await _context.Exams.Where(e => e.UserId == userId).ToListAsync();
        }

        public async Task<bool> UpdateExamAsync(Exam exam)
        {
            var existingExam = await _context.Exams.FirstOrDefaultAsync(e => e.ExamId == exam.ExamId);
            if (existingExam == null)
                throw new Exception("המבחן לא נמצא");

            existingExam.Subject = exam.Subject;
            existingExam.Title = exam.Title;
            existingExam.Class = exam.Class;
            existingExam.Questions = exam.Questions;
            existingExam.ExamUploads = exam.ExamUploads;
            existingExam.ExampleExamPath = exam.ExampleExamPath;

            _context.Exams.Update(existingExam);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteExamAsync(int examId)
        {
            var exam = await _context.Exams.FindAsync(examId);
            if (exam == null) return false;

            // שלב 1 – מחיקת קובץ מ-S3
            if (!string.IsNullOrEmpty(exam.ExampleExamPath))
            {
                // שליפת ה-Key מתוך ה-URL המלא (לדוגמה אם הקובץ נמצא ב: https://bucket.s3.amazonaws.com/folder/file.pdf)
                var key = exam.ExampleExamPath.Replace("https://your-bucket-name.s3.amazonaws.com/", "");

                var deleteRequest = new DeleteObjectRequest
                {
                    BucketName = "your-bucket-name", // שימי פה את שם הבקט שלך
                    Key = key
                };

                await _s3Client.DeleteObjectAsync(deleteRequest);
            }

            // שלב 2 – מחיקת מבחן מה-DB
            _context.Exams.Remove(exam);
            await _context.SaveChangesAsync();
            return true;
        }


    }
}
