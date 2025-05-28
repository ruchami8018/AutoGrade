using core.IRepositories;
using core.IServices;
using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service
{
    public class ChatService : IChatService
    {
        private readonly IChatRepository _chatRepository;
        private readonly IUserRepository _userRepository;

        public ChatService(IChatRepository chatRepository, IUserRepository userRepository)
        {
            _chatRepository = chatRepository;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<ChatMessage>> GetAllMessagesAsync()
        {
            return await _chatRepository.GetAllMessagesAsync();
        }

        public async Task<ChatMessage> SaveMessageAsync(int senderId, string content)
        {
            var message = new ChatMessage
            {
                SenderId = senderId,
                Content = content,
                Timestamp = DateTime.Now
            };

            return await _chatRepository.AddMessageAsync(message);
        }
    }
}
