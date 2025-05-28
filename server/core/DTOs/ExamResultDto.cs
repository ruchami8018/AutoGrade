using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.DTOs
{
    public class ExamResultDto
    {
        public string StudentName { get; set; }
        public string StudentEmail { get; set; }
        public int Grade { get; set; }
        public string Feedback { get; set; }
    }
}
