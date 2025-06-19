using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Models
{
    //בתיקיית core.Models
    public class ChatMessage
    {
        public int Id { get; set; }

        public int ChatTopicId { get; set; }
        public ChatTopic ChatTopic { get; set; } = null!;

        public User Sender { get; set; } = null!; // קשר למשתמש המחבר

        public int SenderId { get; set; } // אם זה כפול ל-UserId – אולי מיותר
        public string Text { get; set; } = string.Empty;
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
    }
    //public class ChatMessage
    //{
    //    public int Id { get; set; }
    //    public int SenderId { get; set; }
    //    public string Content { get; set; } // טקסט או אימוג'ים (יוניקוד)
    //    public string? FileUrl { get; set; } // אם קובץ נשלח
    //    public DateTime SentAt { get; set; }
    //}

    //public class ChatMessage
    //{
    //    public Guid Id { get; set; }
    //    public Guid RoomId { get; set; }
    //    public Guid SenderId { get; set; }
    //    public string Content { get; set; }
    //    public string? FileUrl { get; set; }
    //    public DateTime SentAt { get; set; }
    //}


}
