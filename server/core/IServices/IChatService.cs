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
        Task<IEnumerable<ChatMessage>> GetAllMessagesAsync();
        Task<ChatMessage> SaveMessageAsync(int senderId, string content);
    }
    //public interface IChatService
    //{
    //    Task SendMessageAsync(CreateChatMessageDto dto);
    //    Task<List<ChatMessageDto>> GetRoomMessagesAsync(Guid roomId);
    //}

}
