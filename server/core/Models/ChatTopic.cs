using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Models
{
    public class ChatTopic
    {
        public int Id { get; set; }//MK
        public string Title { get; set; } = string.Empty;//topic title
        public int CreatedById { get; set; }//FK to user
        public User? CreatedBy { get; set; }//DETAILs of the user who created the topic
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;//time when the topic was created
        public ICollection<ChatMessage> Messages { get; set; } = new List<ChatMessage>();//collection of messages- one to many
    }
}
