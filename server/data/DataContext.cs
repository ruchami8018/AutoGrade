using core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace data
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Exam> Exams { get; set; }
        public DbSet<ExamUpload> ExamsUploads { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<AiAction> AiActions { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        //public class AppDbContext : DbContext
        //{
        //    public DbSet<ChatMessage> ChatMessages { get; set; }

        //    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        //}

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);

        //    // הגדרות קיימות (אם יש)

        //    // הגדרת הקשר בין הודעה למשתמש
        //    modelBuilder.Entity<ChatMessage>()
        //        .HasOne(m => m.Sender)
        //        .WithMany()
        //        .HasForeignKey(m => m.SenderId);
        //}

        //public DataContext() 
        //{
        //    Users = new DbSet<User>();
        //}
    }
}