using api.Extensions;
using core.IRepositories;
using data;
using data.Repositories;
using Microsoft.OpenApi.Models;
using service;  

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//����� �� �� �����-�������� � DB
builder.Services.AddDbContext<DataContext>();
// ����� CORS
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
