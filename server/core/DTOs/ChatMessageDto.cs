using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.DTOs
{
    //public class ChatMessageDto
    //{
    //    public int Id { get; set; }
    //    public string SenderId { get; set; } = string.Empty;
    //    public string SenderName { get; set; } = string.Empty;
    //    public string Message { get; set; } = string.Empty;
    //    public DateTime SentAt { get; set; }
    //    public string? FileUrl { get; set; }
    //}

    public class ChatMessageDto
    {
        public Guid Id { get; set; }
        public Guid SenderId { get; set; }
        public string Content { get; set; }
        public string? FileUrl { get; set; }
        public DateTime SentAt { get; set; }
    }


}
