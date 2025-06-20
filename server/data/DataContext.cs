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
        //public DbSet<Exam> Exams { get; set; }
        //public DbSet<ExamUpload> ExamsUploads { get; set; }
        //public DbSet<Question> Questions { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }
        public DbSet<ChatTopic> ChatTopics { get; set; }
        public DbSet<AiAction> AiActions { get; set; }

        public DbSet<UserFile> Files { get; set; }
        public DbSet<FileUpload> FilesUploads { get; set; }
        //public DbSet<Report> Reports { get; set; }

        //---
        //public DbSet<User> Users { get; set; }
        //public DbSet<UserFile> Files { get; set; }
        //public DbSet<FileUpload> FilesUploads { get; set; }// as ExamUploads לא נראה שצריך את זה
        //public DbSet<Report> Reports { get; set; }//unnecessary 
        //public DbSet<AiAction> AiActions { get; set; }
        //public DbSet<ChatTopic> ChatTopics { get; set; }
        //public DbSet<ChatMessage> ChatMessages { get; set; }

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