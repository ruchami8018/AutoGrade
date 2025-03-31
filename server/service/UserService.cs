//using core.IRepositories;
//using core.IServices;
//using core.Models;

//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;

//using core.IRepositories;
//using core.IServices;
//using core.Models;
//using Microsoft.Extensions.Configuration;

//using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;
using core.IRepositories;
using core.IServices;
using core.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using core.IRepositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using data;
using System;


namespace service
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly IUserRepository _userRepository;
        private readonly DataContext _context;

        //private readonly IManagerRepository _managerRepository;
        public UserService(DataContext context, IConfiguration configuration, IUserRepository userRepository)
        {
            _context = context;
            _configuration = configuration;
            _userRepository = userRepository;
            //_managerRepository = managerRepository;
        }

        //public async Task AddUserAsync(User user)
        //{
        //    await _userRepository.AddUserAsync(user);
        //}

        //public string GenerateJwtToken(User user)
        //{
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //    var claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.Name, user.Name),
        //        new Claim(ClaimTypes.NameIdentifier, user.Email)
        //    };

        //    if (user.Role == "Student")
        //        claims.Add(new Claim(ClaimTypes.Role, "Student"));
        //    else if (user.Role == "Admin")
        //        claims.Add(new Claim(ClaimTypes.Role, "Admin"));

        //    var token = new JwtSecurityToken(
        //       issuer: _configuration["Jwt:Issuer"],
        //       audience: _configuration["Jwt:Audience"],
        //       claims: claims,
        //       expires: DateTime.Now.AddMinutes(30),
        //       signingCredentials: credentials
        //   );

        //    return new JwtSecurityTokenHandler().WriteToken(token);

        //}

        //public async Task<User> GetUserByEmailAsync(string email)
        //{
        //    return await _userRepository.GetUserByEmailAsync(email);
        //}

        //public async Task<bool> IsEmailExistAsync(string email)
        //{
        //    return await _userRepository.IsEmailExistAsync(email);
        //}
        //public async Task<User> LoginAsync(string email, string password)
        //{
        //    var user = await _userRepository.GetUserByEmailAsync(email);
        //    if (user == null || user.Password != password)
        //    {
        //        return null;
        //    }
        //    return user;
        //}

        public string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

            if (user is User)//---------------לבדוק אם זה טוב----------
                claims.Add(new Claim(ClaimTypes.Role, "User"));
            else if (user is Manager)
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<bool> IsEmailExistAsync(string email)
        {
            return await _userRepository.IsEmailExistAsync(email);
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _userRepository.GetUserByEmailAsync(email);
        }

        public async Task AddUserAsync(User user)
        {
            await _userRepository.AddUserAsync(user);
            await _context.SaveChangesAsync();

            //await _managerRepository.SaveAsync();
        }

        //public async Task<User> LoginAsync(string email, string password)
        //{
        //    var user = awiat _userRepository.GetUserByEmailAsync(email);
        //    if (user == null || !VerifyPassword(password, user.Password))
        //    {
        //        return null;
        //    }

        //    return user;
        //}

        //private bool VerifyPassword(string password, string hashedPassword)
        //{
        //    return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        //}

    }
}
