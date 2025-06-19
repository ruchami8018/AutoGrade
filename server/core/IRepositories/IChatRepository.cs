using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.IRepositories
{
    public interface IChatRepository
    {
        Task<List<ChatTopic>> GetAllTopicsAsync();
        Task<ChatTopic?> GetTopicByIdAsync(int id);
        Task<ChatTopic> CreateTopicAsync(string title, int userId, string initialMessage);

        Task<List<ChatMessage>> GetMessagesForTopicAsync(int topicId);
        Task<ChatMessage> AddMessageAsync(int topicId, string text, int senderId);
    }
}
