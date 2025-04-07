﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.DTOs
{
    public class ExamUploadDto
    {
        public int ExamId { get; set; }
        public int UserId { get; set; } // כדי לשייך את ההעלאה לתלמיד
        public string StudentName { get; set; }
        public string FileUrl { get; set; }
    }
}
