using core.IServices;
using core.Models;
using Microsoft.AspNetCore.Mvc;
using service;
using System.Net.Mail;
using System.Net;
using api.Models;
using core.DTOs;
using AutoMapper;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase  
    {
        //public readonly IUserService _userService;
        //public UsersController(IUserService userService)
        //{
        //    this._userService = userService;
        //}
        //// GET: api/<UsersController>
        //[HttpGet]
        //public IEnumerable<User> Get()
        //{
        //    return this._userService.GetAllUsers();
        //}

        //// GET api/<UsersController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<UsersController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT api/<UsersController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}


        //// DELETE api/<UsersController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}

        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] RegisterModel model)
        //{
        //    if (await _userService.IsEmailExistAsync(model.Email))
        //        return BadRequest("Email is already in use.");

        //    User newUser = model.Role.ToLower() switch
        //    {
        //        "user" => new User { Name = model.Name, Email = model.Email, Password = model.Password, Role = "User" },
        //        "admin" => new Manager { Name = model.Name, Email = model.Email, Password = model.Password, Role = "Admin" },
        //        _ => throw new Exception("Invalid role")
        //    };

        //    await _userService.AddUserAsync(newUser);

        //    var token = _userService.GenerateJwtToken(newUser);
        //    return Ok(new { Token = token, User = new { newUser.Name, newUser.Email, newUser.Password, newUser.Role } });

        //}

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (await _userService.IsEmailExistAsync(model.Email))
                return BadRequest("Email is already in use.");

            User newUser = model.Role.ToLower() switch
            {
                "user" => new User { Name = model.Name, Email = model.Email, Password = model.Password, Role = "User", School = model.School }, // הוספנו את School
                "admin" => new Manager { Name = model.Name, Email = model.Email, Password = model.Password, Role = "Admin", School = model.School }, // הוספנו את School
                _ => throw new Exception("Invalid role")
            };

            await _userService.AddUserAsync(newUser);

            var token = _userService.GenerateJwtToken(newUser);
            return Ok(new { Token = token, User = new { newUser.Id, newUser.Name, newUser.Email, newUser.Password, newUser.Role } });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userService.GetUserByEmailAsync(model.Email);

            if (user == null)
            {
                Console.WriteLine("User not found with email: " + model.Email);
                return Unauthorized("Invalid credentials");

            }

            var token = _userService.GenerateJwtToken(user);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(new { Token = token, User = userDto });

        }
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUserAsync([FromBody] UpdateUserModel model)
        {
            await _userService.UpdateUserAsync(model.Email, model.Password, model.School, model.Name);
            return Ok();
        }
        public class UpdateUserModel
        {
            public string Email { get; set; }
            public string? Password { get; set; }
            public string? School { get; set; }
            public string? Name { get; set; }
        }

        //private async Task SendWelcomeEmail(string email, string name)
        //{
        //    var fromAddress = new MailAddress("g@gmail.com", "Your App Name");
        //    var toAddress = new MailAddress(email, name);
        //    const string fromPassword = ""; // השתמש בסיסמת אפליקציה
        //    const string subject = "ברוכה הבאה ל AUTO-GRADE!!";
        //    string body = $"שלום {name},\n\nתודה שהצטרפת למערכת שלנו! אנו שמחים לראות אותך.\n\nצוות המערכת.";

        //    var smtp = new SmtpClient
        //    {
        //        Host = "smtp.gmail.com", // שרת SMTP של Gmail
        //        Port = 587,
        //        EnableSsl = true,
        //        Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
        //    };
        //    using (var message = new MailMessage(fromAddress, toAddress)
        //    {
        //        Subject = subject,
        //        Body = body
        //    })
        //    {
        //        await smtp.SendMailAsync(message);
        //    }
        //}
    }
   

}
