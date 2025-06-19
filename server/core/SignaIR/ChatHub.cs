using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace core.SignaIR
{
    public class ChatHub : Hub
    {
        // שולח הודעה לכל המשתמשים שמחוברים לנושא מסוים
        public async Task SendMessage(string topicId, string userName, string message)
        {
            await Clients.Group(topicId).SendAsync("ReceiveMessage", userName, message, DateTime.UtcNow);
        }

        // הצטרפות לחדר/נושא צ'אט
        public async Task JoinTopic(string topicId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, topicId);
        }

        // יציאה מחדר / נושא
        public async Task LeaveTopic(string topicId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, topicId);
        }
    }
}
