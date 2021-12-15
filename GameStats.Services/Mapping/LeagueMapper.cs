using GameStats.Common.Contracts.League;
using GameStats.Data.Models;

namespace GameStats.Services.Mapping
{
    public class LeagueMapper
    {
        public static LeagueDto DomainToDto(League domain) => domain != null
            ? new LeagueDto
            {
                Id = domain.Id,
                Description = domain.Description
            }
            : null;

        public static League DtoToDomain(LeagueDto dto) => new()
        {
            Id = dto.Id,
            Description = dto.Description
        };
    }
}
