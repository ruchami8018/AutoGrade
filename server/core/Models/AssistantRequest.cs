using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Models
{
    public class AssistantRequest
    {
        public int Id { get; set; }
        public int TeacherId { get; set; }
        public string Prompt { get; set; }
        public string Response { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
