using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace core.Models////////////////////unnecessary----
{
    public class Question
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public int QuestionNumber { get; set; }
        public string Text { get; set; }
        public string Answer { get; set; }
        public int Value { get; set; }
        public Question()
        {

        }

        public Question(int id, int examId, int questionNumber, string text, string answer, int value)
        {
            Id = id;
            ExamId = examId;
            QuestionNumber = questionNumber;
            Text = text;
            Answer = answer;
            Value = value;
        }
    }
}
