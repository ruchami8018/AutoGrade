using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.DTOs
{
    public class ChatTopicDto
    {
        public int Id { get; set; }//MK
        public string Title { get; set; } = string.Empty;//title of the topic

        public string AuthorName { get; set; } = string.Empty;//name of the author who created the topic
        public string AuthorInitials { get; set; } = "?";//initials of the author

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;//date and time the topic was created
        public int AuthorId { get; set; }//ID of the author who created the topic
        public string? LastMessage { get; set; }//content of the last message in this topic
        public int MessageCount { get; set; }// number of messages in the topic
    }
}
