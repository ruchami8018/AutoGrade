using core.DTOs;
using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.IServices
{
    public interface IChatService
    {
        Task<List<ChatTopic>> GetAllTopicsAsync();
        Task<ChatTopic?> GetTopicByIdAsync(int id);
        Task<ChatTopic> CreateTopicAsync(string title, int userId, string initialMessage);

        Task<List<ChatMessage>> GetMessagesForTopicAsync(int topicId);
        Task<ChatMessage> AddMessageAsync(int topicId, string text, int senderId);
    }
    //public interface IChatService
    //{
    //    Task SendMessageAsync(CreateChatMessageDto dto);
    //    Task<List<ChatMessageDto>> GetRoomMessagesAsync(Guid roomId);
    //}

}
