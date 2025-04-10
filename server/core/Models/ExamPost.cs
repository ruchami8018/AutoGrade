using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Models
{
    public class ExamPost
    {
        public int UserId { get; set; }
        public string Subject { get; set; }
        public string Title { get; set; }
        public string Class { get; set; }
        public string ExampleExamPath { get; set; }
    }
}
