using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Models
{
    public class FileUpload//as ExamUpload
    {
        public int Id { get; set; }
        public int SubmissionNumber { get; set; }//E
        public int UserId { get; set; }
        public int? FileId { get; set; }//E
        public string StudentName { get; set; }//E
        public string FilePath { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.UtcNow;
        public int Score { get; set; }//E

        public FileUpload()
        {

        }

        public FileUpload(int id, int userId, int studentId, int fileId, string filePath, DateTime uploadDate, int score)
        {
            Id = id;
            UserId = userId;
            FileId = fileId;
            FilePath = filePath;
            UploadDate = uploadDate;
            Score = score;
        }
    }
}
