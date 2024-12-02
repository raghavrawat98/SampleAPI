
using SampleAPI.RepoPatternForMultipleDB;

namespace SampleAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy => policy.WithOrigins("http://localhost:3000") // React dev server URL
                                    .AllowAnyMethod()
                                    .AllowAnyHeader());
            });

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Conditional registration of DBService
            if (builder.Configuration["UseDatabase"] == "SQLServer")
            {
                builder.Services.AddScoped<IDBService, SQLServerDBService>();
            }
            else if (builder.Configuration["UseDatabase"] == "Redis")
            {
                builder.Services.AddScoped<IDBService, RedisDBService>();
            }

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors("AllowReactApp");

            app.MapControllers();

            app.Run();
        }
    }
}
