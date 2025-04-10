using Amazon;
using Amazon.S3;
using api.Extensions;
using core.IRepositories;
using core.Models;
using data;
using data.Repositories;
using DotNetEnv;
using Microsoft.OpenApi.Models;
using service;  

var builder = WebApplication.CreateBuilder(args);

//DotNetEnv.Env.Load();
////var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID");
////var secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY");
////var region = Environment.GetEnvironmentVariable("AWS_REGION");
////var bucket = Environment.GetEnvironmentVariable("AWS_BUCKET_NAME");

//var accessKey = "AKIAWCQJPQPBAIUTXJXG";
//var secretKey = "ZKMjIMYONQor/+GeY3PPofC0nYrvBhwaYMPVute";
//var region = "us-east-1";
//var bucket = "my-auto-grade-testpnoren";

//Console.WriteLine($"Access Key: {accessKey}");
//Console.WriteLine($"Secret Key: {secretKey}");
//Console.WriteLine($"Region: {region}");
//Console.WriteLine($"Bucket: {bucket}");

//if (string.IsNullOrWhiteSpace(accessKey) || string.IsNullOrWhiteSpace(secretKey) || string.IsNullOrWhiteSpace(region))
//{
//    throw new Exception("Missing AWS credentials. Please check your .env file or environment variables.");
//}

//var awsOptions = new Amazon.Extensions.NETCore.Setup.AWSOptions
//{
//    Credentials = new Amazon.Runtime.BasicAWSCredentials(accessKey, secretKey),
//    Region = Amazon.RegionEndpoint.GetBySystemName(region)
//};

//builder.Services.AddDefaultAWSOptions(awsOptions);
//builder.Services.AddAWSService<IAmazonS3>();


////var awsOptions = new Amazon.Extensions.NETCore.Setup.AWSOptions
////{
////    Credentials = new Amazon.Runtime.BasicAWSCredentials(accessKey, secretKey),
////    Region = Amazon.RegionEndpoint.GetBySystemName(region)
////};

////builder.Services.AddAWSService<IAmazonS3>(awsOptions);
////// Add AWS S3 configuration
////builder.Services.AddAWSService<IAmazonS3>(new Amazon.Extensions.NETCore.Setup.AWSOptions
////{
////    Credentials = new Amazon.Runtime.BasicAWSCredentials(accessKey, secretKey),
////    Region = Amazon.RegionEndpoint.GetBySystemName(region)
////});
//builder.Services.AddSingleton(new S3Settings
//{
//    BucketName = bucket,
//    Region = region
//});

Env.TraversePath().Load();
// תוודאי שהקובץ קיים בתיקייה הראשית!
// טוען את משתני הסביבה
var accessKey = Env.GetString("AWS_ACCESS_KEY_ID");
var secretKey = Env.GetString("AWS_SECRET_ACCESS_KEY");
var bucketName = Env.GetString("AWS_BUCKET_NAME");
var region = Env.GetString("AWS_REGION");

//var accessKey = "AKIAWCQJPQPBAIUTXJXG";
//var secretKey = "ZKMjIMYONQor/+GeY3PPofC0nYrvBhwaYMPVute";
//var bucketName = "us-east-1";
//var region = "my-auto-grade-testpnoren";


// בדיקה שהערכים לא ריקים
Console.WriteLine($"AccessKey: {accessKey}");
Console.WriteLine($"SecretKey: {secretKey}");
Console.WriteLine($"BucketName: {bucketName}");
Console.WriteLine($"Region: {region}");

if (string.IsNullOrEmpty(accessKey) )
{
    throw new Exception("המשתנה AWS_ACCESS_KEY_ID לא נטען!");
}

if (string.IsNullOrEmpty(accessKey) || string.IsNullOrEmpty(secretKey) || string.IsNullOrEmpty(region))
{
    throw new Exception("אחד מהמשתנים AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY או AWS_REGION לא נטען!");
}

// יצירת הלקוח של S3
var s3Client = new AmazonS3Client(accessKey, secretKey, RegionEndpoint.GetBySystemName(region));

// הוספת S3 ל-DI
builder.Services.AddSingleton<IAmazonS3>(s3Client);

// הוספת שם הבקט והאזור כמשתנים גלובליים
builder.Services.AddSingleton(new S3Settings
{
    BucketName = bucketName,
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
