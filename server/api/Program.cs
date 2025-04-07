using api.Extensions;
using core.IRepositories;
using core.Models;
using data;
using data.Repositories;
using Microsoft.OpenApi.Models;
using service;  

var builder = WebApplication.CreateBuilder(args);

DotNetEnv.Env.Load();
var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
var secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
var region = Environment.GetEnvironmentVariable("AWS_REGION");
var bucket = Environment.GetEnvironmentVariable("AWS_BUCKET_NAME");

builder.Services.AddSingleton(new S3Settings
{
    BucketName = bucket,
    Region = region
});

// Add services to the container.
//הוספה על פי השעור-התממשקות ל DB
builder.Services.AddDbContext<DataContext>();
// הוספת CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
              
});

// הוספת Controllers
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "AutoGrade API", Version = "v1" });
});

// הגדרת שירותים נוספים
builder.Services.ConfigureServices();

// הגדרת JWT
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

builder.Services.ConfigureJwt(builder.Configuration);

// הגדרת מדיניות הרשאות
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("UserOnly", policy => policy.RequireRole("User"));
});

//here what i added(3)
//builder.Services.AddScoped<UserService>();
//builder.Services.AddScoped<IUserRepository,UserRepository>();
//builder.Services.AddScoped<DataContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AutoGrade API v1"));

}

app.UseCors("AllowAnyOrigin");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
