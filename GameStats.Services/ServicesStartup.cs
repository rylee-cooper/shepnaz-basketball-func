using System;
using GameStats.Data.Repositories;
using GameStats.Services.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GameStats.Services
{
    public static class ServicesStartup
    {
        public static IConfiguration Configuration => Data.DataStartup.Configuration;

        public static void Configure(IServiceProvider serviceProvider)
        {
            Data.DataStartup.Configure(serviceProvider);
        }

        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            Data.DataStartup.ConfigureServices(services, configuration);

            services.AddScoped<ITeamRepository, TeamRepository>();
            services.AddScoped<ILeagueRepository, LeagueRepository>();
            services.AddScoped<IPlayerRepository, PlayerRepository>();
            services.AddScoped<ICoachRepository, CoachRepository>();
            services.AddScoped<ISeasonRepository, SeasonRepository>();
            services.AddScoped<IGenderRepository, GenderRepository>();
        }
    }
}
