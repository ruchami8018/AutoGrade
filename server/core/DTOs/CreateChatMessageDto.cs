using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.DTOs
{
    public class CreateChatMessageDto
    {
        public Guid RoomId { get; set; }
        public Guid SenderId { get; set; }
        public string Content { get; set; }
        public string? FileUrl { get; set; }
    }
}
