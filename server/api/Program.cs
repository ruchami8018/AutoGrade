//using Amazon;
//using Amazon.S3;
//using api.Extensions;
//using core.IRepositories;
//using core.Models;
//using data;
//using data.Repositories;
//using DotNetEnv;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.OpenApi.Models;
//using service;
//using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Amazon;
using Amazon.S3;
using api.Extensions;
using core.IRepositories;
using core.Models;
using data;
using data.Repositories;
using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using service;


var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddDefaultAWSOptions(awsOptions);
//builder.Services.AddAWSService<IAmazonS3>();

Env.TraversePath().Load();
// ������ ������ ���� ������� ������!
// ���� �� ����� ������
var accessKey = Env.GetString("AWS_ACCESS_KEY_ID");
var secretKey = Env.GetString("AWS_SECRET_ACCESS_KEY");
var bucketName = Env.GetString("AWS_BUCKET_NAME");
var region = Env.GetString("AWS_REGION");
var _apiKey = Env.GetString("REACT_APP_OPENAI_API_KEY");
var connectionString = Env.GetString("DB_CONNECTION");
//var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION");

// ����� ������� �� �����
Console.WriteLine($"AccessKey: {accessKey}");
Console.WriteLine($"SecretKey: {secretKey}");
Console.WriteLine($"BucketName: {bucketName}");
Console.WriteLine($"Region: {region}");
Console.WriteLine($"ConnectionString: {connectionString}");


if (string.IsNullOrEmpty(accessKey))
{
    throw new Exception("������ AWS_ACCESS_KEY_ID �� ����!");
}

if (string.IsNullOrEmpty(accessKey) || string.IsNullOrEmpty(secretKey) || string.IsNullOrEmpty(region))
{
    throw new Exception("��� �������� AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY �� AWS_REGION �� ����!");
}

// ����� ����� �� S3
var s3Client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.GetBySystemName(region));

// ����� S3 �-DI
builder.Services.AddSingleton<IAmazonS3>(s3Client);

// ����� �� ���� ������ ������� ��������
builder.Services.AddSingleton(new S3Settings
{
    BucketName = bucketName,
    Region = region
});

// Add services to the container.
//����� �� �� �����-�������� � DB

//builder.Services.AddDbContext<DataContext>(options =>
//    options.UseMySql(
//        connectionString,
//        ServerVersion.AutoDetect(connectionString),
//        mySqlOptions => mySqlOptions.CommandTimeout(8000)
//    )
//);


builder.Services.AddDbContext<DataContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString),options => options.CommandTimeout(10000)));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// ����� Controllers
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "AutoGrade API", Version = "v1" });
});

// ����� ������� ������
builder.Services.ConfigureServices();

// ����� JWT
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

builder.Services.ConfigureJwt(builder.Configuration);

// ����� ������� ������
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
