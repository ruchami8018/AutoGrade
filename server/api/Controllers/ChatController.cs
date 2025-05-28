using core.IServices;
using core.Models;
using data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    //-----WITH AUTHENTICATION -JWT -TOKEN -----

    //    [Route("api/[controller]")]
    //    [ApiController]
    //    [Authorize] // אם יש לך מדיניות הרשאות ספציפית, הוסף אותה כאן
    //    public class ChatController : ControllerBase
    //    {
    //        private readonly IChatService _chatService;
    //        private readonly IUserService _userService;

    //        public ChatController(IChatService chatService, IUserService userService)
    //        {
    //            _chatService = chatService;
    //            _userService = userService;
    //        }

    //        [HttpGet("messages")]
    //        public async Task<IActionResult> GetMessages()
    //        {
    //            var messages = await _chatService.GetAllMessagesAsync();

    //            var result = messages.Select(m => new
    //            {
    //                m.Id,
    //                m.SenderId,
    //                SenderName = m.Sender.Name,
    //                SenderEmail = m.Sender.Email,
    //                m.Content,
    //                m.Timestamp
    //            });

    //            return Ok(result);
    //        }

    //        [HttpPost("messages")]
    //        public async Task<IActionResult> SendMessage([FromBody] SendMessageModel model)
    //        {
    //            // קבלת מזהה המשתמש מהטוקן
    //            var userIdClaim = User.FindFirst("id");
    //            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
    //            {
    //                return Unauthorized();
    //            }

    //            var message = await _chatService.SaveMessageAsync(userId, model.Content);

    //            // קבלת פרטי המשתמש
    //            var user = await _userService.GetUserByIdAsync(userId);

    //            return Ok(new
    //            {
    //                message.Id,
    //                message.SenderId,
    //                SenderName = user.Name,
    //                SenderEmail = user.Email,
    //                message.Content,
    //                message.Timestamp
    //            });
    //        }
    //    }

    //    public class SendMessageModel
    //    {
    //        public string Content { get; set; }
    //    }
    //}


    //----without authentication - JWT - token -----
    using core.IServices;
    using core.Models;
    using Microsoft.AspNetCore.Mvc;

    namespace api.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        [AllowAnonymous] // מאפשר גישה בלי טוקן
        public class ChatController : ControllerBase
        {
            private readonly IChatService _chatService;
            private readonly IUserService _userService;

            public ChatController(IChatService chatService, IUserService userService)
            {
                _chatService = chatService;
                _userService = userService;
            }

            [HttpGet("messages")]
            public async Task<IActionResult> GetMessages()
            {
                var messages = await _chatService.GetAllMessagesAsync();

                var result = messages.Select(m => new
                {
                    m.Id,
                    m.SenderId,
                    SenderName = m.Sender?.Name,
                    SenderEmail = m.Sender?.Email,
                    m.Content,
                    m.Timestamp
                });

                return Ok(result);
            }

            [HttpPost("messages")]
            public async Task<IActionResult> SendMessage([FromBody] SendMessageModel model)
            {
                // במקום טוקן - מקבלים SenderId מתוך הבקשה
                if (model.SenderId <= 0 || string.IsNullOrWhiteSpace(model.Content))
                {
                    return BadRequest("SenderId or content is invalid");
                }

                var message = await _chatService.SaveMessageAsync(model.SenderId, model.Content);

                var user = await _userService.GetUserByIdAsync(model.SenderId);

                return Ok(new
                {
                    message.Id,
                    message.SenderId,
                    SenderName = user?.Name,
                    SenderEmail = user?.Email,
                    message.Content,
                    message.Timestamp
                });
            }
        }

        public class SendMessageModel
        {
            public int SenderId { get; set; }
            public string Content { get; set; }
        }
    }

}
