using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace core.IServices
{
    public interface IUserService
    {
        string GenerateJwtToken(User user);
        Task<bool> IsEmailExistAsync(string email);
        Task<User> GetUserByEmailAsync(string email);
        Task AddUserAsync(User user);
    }
}
