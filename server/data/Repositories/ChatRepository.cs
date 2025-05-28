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

        public async Task<IEnumerable<ChatMessage>> GetAllMessagesAsync()
        {
            return await _context.ChatMessages
                .Include(m => m.Sender)
                .OrderBy(m => m.Timestamp)
                .ToListAsync();
        }

        public async Task<ChatMessage> AddMessageAsync(ChatMessage message)
        {
            await _context.ChatMessages.AddAsync(message);
            await _context.SaveChangesAsync();
            return message;
        }
    }
}
