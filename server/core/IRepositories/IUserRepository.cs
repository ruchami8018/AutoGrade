using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.IRepositories
{
    public interface IUserRepository
    {
        Task<bool> IsEmailExistAsync(string email);
        Task<User> GetUserByEmailAsync(string email);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task<User> GetUserByIdAsync(int id);
        Task<List<User>> GetAllUsersAsync();


    }
}
