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
            services.AddScoped<IManagerRepository, ManagerRepository>();

            services.AddScoped<IUserRepository, UserRepository>();
            //services.AddScoped<IStudentRepository, StudentRepository>();
            services.AddScoped<IExamUploadRepository, ExamUploadRepository>();
            //services.AddScoped<IAnswerRepository, AnswerRepository>();
            services.AddScoped<IExamRepository, ExamRepository>();
            //services.AddScoped<IAuthRepository, AuthRepository>();

            services.AddScoped<IUserService, UserService>();
            //services.AddScoped<IStudentService, StudentService>();
            services.AddScoped<IExamService, ExamService>();
            //services.AddScoped<IAnswerService, AnswerService>();
            services.AddScoped<IExamUploadService, ExamUploadService>();
            services.AddScoped<IUserService, UserService>();



            services.AddAutoMapper(typeof(MappingProfile));
            services.AddDbContext<DataContext>();
            //        services.AddDbContext<DataContext>(options =>
            //options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            //services.AddAutoMapper(typeof(MappingProfile));
            //services.AddDbContext<DataContext>();
        }

    }
}
