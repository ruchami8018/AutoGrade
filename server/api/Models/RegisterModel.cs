using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    //public class RegisterModel//זוהי מחלקה בתוך תקיית MODELS שכל המחלקות שבה אלו מחלקות שבאות לייצג את מה שאנו אמורים לקבל מהקליינט
    //{
    //    public string Name { get; set; }
    //    public string Email { get; set; }
    //    public string Password { get; set; }
    //    public string Role { get; set; }= "user";
    //    public string School { get; set; }
    //}
    public class RegisterModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public string School { get; set; } // הסרנו את [Required]

        public string Role { get; set; } = "User"; // ברירת מחדל
    }
}
