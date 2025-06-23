using core.IRepositories;
using core.IServices;
using core;
using data.Repositories;
using data;
using service;

namespace api.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfile));
            services.AddDbContext<DataContext>();

            //services.AddScoped<IManagerRepository, ManagerRepository>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IChatRepository, ChatRepository>();
            services.AddScoped<IChatService, ChatService>();

            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IUserFileRepository, FileRepository>();

            services.AddScoped<IFileUploadRepository, FileUploadRepository>();
            services.AddScoped<IFileUploadService, FileUploadService>();

            services.AddScoped<IAiActionRepository, AiActionRepository>();
            services.AddScoped<IAiService, AiService>();

            //services.AddScoped<IOpenAiClient, OpenAiClient>();

            // זה פותר את הבעיה עם HttpClient
            services.AddHttpClient<IOpenAiClient, OpenAiClient>();
            services.AddScoped<IChatService, ChatService>();

            //services.AddScoped<IExamRepository, ExamRepository>();NU
            //services.AddScoped<IExamUploadRepository, ExamUploadRepository>();NU
            //services.AddScoped<IExamService, ExamService>();
            //services.AddScoped<IExamUploadService, ExamUploadService>();

            // api/Startup.cs (הוספה למתודה ConfigureServices)
            //services.AddScoped<IAnswerService, AnswerService>();
            //services.AddScoped<IStudentService, StudentService>();
            //services.AddScoped<IStudentRepository, StudentRepository>();
            //services.AddScoped<IExamUploadRepository, ExamUploadRepository>();
            //services.AddScoped<IAnswerRepository, AnswerRepository>();
            //services.AddScoped<IExamRepository, ExamRepository>();
            //services.AddScoped<IAuthRepository, AuthRepository>();

            //        services.AddDbContext<DataContext>(options =>
            //options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            //services.AddAutoMapper(typeof(MappingProfile));
            //services.AddDbContext<DataContext>();
        }

    }
}
