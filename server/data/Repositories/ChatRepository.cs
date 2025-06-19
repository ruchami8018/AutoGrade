using core.IRepositories;
using core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repositories
{
    public class ChatRepository : IChatRepository
    {
        private readonly DataContext _context;

        public ChatRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ChatTopic>> GetAllTopicsAsync()//get all topics
        {
            return await _context.ChatTopics
                .Include(t => t.CreatedBy)
                .Include(t => t.Messages)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<ChatTopic?> GetTopicByIdAsync(int id)//get specific topic by id
        {
            return await _context.ChatTopics.FindAsync(id);
        }

        public async Task<ChatTopic> CreateTopicAsync(string title, int userId, string initialMessage)
        {
            var topic = new ChatTopic
            {
                Title = title,
                CreatedById = userId,
                CreatedAt = DateTime.UtcNow,
            };
            // אם יש הודעה התחלתית:
            if (!string.IsNullOrWhiteSpace(initialMessage))
            {
                topic.Messages.Add(new ChatMessage//add the initial message to this topic
                {
                    Text = initialMessage,
                    SenderId = userId,
                    SentAt = DateTime.UtcNow
                });
            }
            _context.ChatTopics.Add(topic);//add the topic to the DB
            await _context.SaveChangesAsync();
            Console.WriteLine($"id:::::::::::::::: {topic.CreatedById}");
            return topic;
        }

        //public async Task<List<ChatMessage>> GetMessagesForTopicAsync(int topicId)
        //{
        //    return await _context.ChatMessages
        //        .Where(m => m.ChatTopicId == topicId)
        //        .OrderBy(m => m.SentAt)
        //        .ToListAsync();
        //}

        public async Task<List<ChatMessage>> GetMessagesForTopicAsync(int topicId)//get all messages for a specific topic
        {
            return await _context.ChatMessages
                .Where(m => m.ChatTopicId == topicId)
                .Include(m => m.Sender)
                .OrderBy(m => m.SentAt)
                .ToListAsync();
        }

        public async Task<ChatMessage> AddMessageAsync(int topicId, string text, int senderId)//add a message to a specific topic
        {
            var message = new ChatMessage
            {
                ChatTopicId = topicId,
                Text = text,
                SenderId = senderId,
                SentAt = DateTime.UtcNow
            };

            _context.ChatMessages.Add(message);
            await _context.SaveChangesAsync();
            return message;
        }
    }
}
