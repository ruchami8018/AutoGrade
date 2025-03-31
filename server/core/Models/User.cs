using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string School { get; set; }
        public DateTime created_at { get; set; } = DateTime.Now;
        public string Role { get; set; } = "User";
        public List<Exam> Exams { get; set; }


        public User()
        {

        }

        public User(int id, string name, string email, string password)
        {
            Name = name;
            Email = email;
            Password = password;
        }
        public User(int id, string name, string email, string password, string role,string school)
        {
            Name = name;
            Email = email;
            Password = password;
            Role = role;
            School = school;
        }
    }
}
