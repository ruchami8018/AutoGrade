using core.IRepositories;
using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static data.DataContext;

namespace data.Repositories
{
    //public class ChatMessageRepository : IChatMessageRepository
    //{
    //    private readonly AppDbContext _context;

    //    public ChatMessageRepository(AppDbContext context)
    //    {
    //        _context = context;
    //    }

    //    public async Task AddAsync(ChatMessage message)
    //    {
    //        _context.ChatMessages.Add(message);
    //        await _context.SaveChangesAsync();
    //    }

    //    public async Task<List<ChatMessage>> GetMessagesByRoomIdAsync(Guid roomId)
    //    {
    //        return await _context.ChatMessages
    //            .Where(m => m.RoomId == roomId)
    //            .OrderBy(m => m.SentAt)
    //            .ToListAsync();
    //    }
    //}
    //public class ChatMessageRepository : IChatMessageRepository
    //{
    //    private readonly AppDbContext _context;

    //    public ChatMessageRepository(AppDbContext context)
    //    {
    //        _context = context;
    //    }

    //    public async Task AddAsync(ChatMessage message)
    //    {
    //        _context.ChatMessages.Add(message);
    //        await _context.SaveChangesAsync();
    //    }

    //    public async Task<List<ChatMessage>> GetMessagesByRoomIdAsync(Guid roomId)
    //    {
    //        return await _context.ChatMessages
    //            .Where(m => m.RoomId == roomId)
    //            .OrderBy(m => m.SentAt)
    //            .ToListAsync();
    //    }
    //}

}
