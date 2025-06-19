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
        public ChatService(IChatRepository chatRepository)
        {
            _chatRepository = chatRepository;
        }

        public async Task<ChatMessage> AddMessageAsync(int topicId, string text, int senderId)//add message to specific topic
        {
            return await _chatRepository.AddMessageAsync(topicId, text, senderId);
        }

        public Task<ChatTopic> CreateTopicAsync(string title, int userId, string initialMessage)//create new topic
        {
            return _chatRepository.CreateTopicAsync(title, userId, initialMessage);
        }

        public Task<List<ChatTopic>> GetAllTopicsAsync()//get all topics
        {
            return _chatRepository.GetAllTopicsAsync();
        }

        public Task<List<ChatMessage>> GetMessagesForTopicAsync(int topicId)//get messages for specific topic
        {
            return _chatRepository.GetMessagesForTopicAsync(topicId);
        }

        public Task<ChatTopic?> GetTopicByIdAsync(int id)//get specific topic by id
        {
            return _chatRepository.GetTopicByIdAsync(id);
        }
    }
}
