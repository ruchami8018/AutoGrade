﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Models
{
    public class ExamUpload
    {
        public int Id { get; set; }
        public int SubmissionNumber { get; set; } // מספר רץ אוטומטי לכל מבחן
        public int UserId { get; set; }//ID של המשתמש כלומר המורה של התלמיד של המבחן הנוכחי
        public int? ExamId { get; set; }//ID של המבחן המרכזי של המורה
        public string StudentName { get; set; }//שם התלמיד ששלו המבחן
        public string FilePath { get; set; }//הניתוב של הקובץ בעצמו מAWS
        public DateTime UploadDate { get; set; } = DateTime.UtcNow;//זמן העלאת המבחן הנוכחי
        public int Score { get; set; }//הציון הסופי של מבחן זה

        public ExamUpload()
        {

        }

        public ExamUpload(int id, int userId, int studentId, int examId, string filePath, DateTime uploadDate, int score)
        {
            Id = id;
            UserId = userId;
            ExamId = examId;
            FilePath = filePath;
            UploadDate = uploadDate;
            Score = score;
        }
    }
}
