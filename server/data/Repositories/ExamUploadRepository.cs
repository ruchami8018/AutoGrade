using core.DTOs;
using core.IRepositories;
using core.IServices;
using core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repositories
{
    public class ExamUploadRepository : IExamUploadRepository
    {//
        private readonly DataContext _context;
        public ExamUploadRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> AddExamUploadAsync(ExamUpload examUpload)
        {
            _context.ExamsUploads.Add(examUpload);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<ExamUpload>> GetAllByIdAsync(int id)
        {
            return await _context.ExamsUploads.Where(e => e.Id == id).ToListAsync();
        }

        public async Task<ExamUpload> GetExamUploadByIdAsync(int id)
        {
            return await _context.ExamsUploads.FirstOrDefaultAsync(e => e.Id == id )
                                ?? throw new Exception("ExamUpload not found"); ;
        }
        public async Task<bool> UpdateExamUploadAsync(ExamUpload examUpload)//עדכון העלאה של תלמיד בודד
        {
            var existingUpload = await _context.ExamsUploads.FindAsync(examUpload.Id);
            if (existingUpload != null)
            {
                _context.Entry(existingUpload).CurrentValues.SetValues(examUpload);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task<bool> DeleteExamUploadAsync(int id)
        {
            var examUpload = await _context.ExamsUploads.FindAsync(id);
            if (examUpload != null)
            {
                _context.ExamsUploads.Remove(examUpload);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}


//[HttpPut("{id}")]
//public async Task<IActionResult> UpdateExamUpload(int id, [FromBody] ExamUploadDto request)
//{
//    if (id != request.ExamId) // ודא שה-ID בנתיב תואם ל-ID בגוף הבקשה (אם ה-DTO מכיל ExamId)
//    {
//        return BadRequest("מזהה ההעלאה בנתיב אינו תואם למזהה בגוף הבקשה.");
//    }

//    var existingUpload = await _examUploadService.GetExamUploadByIdAsync(id);
//    if (existingUpload == null)
//    {
//        return NotFound($"לא נמצאה העלאה עם מזהה {id}.");
//    }

//    // עדכן את המאפיינים של ההעלאה הקיימת עם הערכים מהבקשה
//    existingUpload.StudentName = request.StudentName;
//    existingUpload.FilePath = request.FilePath;
//    // אם יש שדות נוספים שאתה רוצה לאפשר עדכון (כמו Score), עדכן אותם כאן

//    await _examUploadService.UpdateExamUploadAsync(existingUpload);

//    return Ok(new { Message = $"ההעלאה עם מזהה {id} עודכנה בהצלחה." });
//}