using System.Linq;
using GameStats.Common.Contracts.Team;
using GameStats.Data.Models;

namespace GameStats.Services.Mapping
{
    public class TeamMapper
    {
        public static TeamDto DomainToDto(Team domain) => domain != null
            ? new TeamDto
            {
                Id = domain.Id,
                Name = domain.Name,
                LeagueId = domain.LeagueId,
                SeasonId = domain.SeasonId,
                LeagueDescription = domain.League?.Description ?? string.Empty,
                SeasonDescription = domain.Season?.Description ?? string.Empty
            }
            : null;

        public static Team DtoToDomain(TeamDto dto) => new()
        {
            Id = dto.Id,
            Name = dto.Name,
            LeagueId = dto.LeagueId,
            SeasonId = dto.SeasonId
        };
    }
}
