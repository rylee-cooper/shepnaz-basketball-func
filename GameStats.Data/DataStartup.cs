using System;
using GameStats.Data.Framework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GameStats.Data
{
    public class DataStartup
    {
        public static IConfiguration Configuration { get; private set; }

        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            var sqlConnectionString = configuration.GetConnectionString("AppDbContext");
            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(sqlConnectionString));
        }

        public static void Configure(IServiceProvider serviceProvider)
        {
            var dbContext = serviceProvider.GetService<AppDbContext>();
            dbContext.Database.Migrate();
        }
    }
}
