using GameStats.Common.Contracts.Season;
using GameStats.Data.Models;

namespace GameStats.Services.Mapping
{
    public class SeasonMapper
    {
        public static SeasonDto DomainToDto(Season domain) => domain != null
            ? new SeasonDto
            {
                Id = domain.Id,
                Description = domain.Description,
                StartDate = domain.StartDate,
                EndDate = domain.EndDate,
                IsCurrentSeason = domain.IsCurrentSeason
            }
            : null;

        public static Season DtoToDomain(SeasonDto dto) => new()
        {
            Id = dto.Id,
            Description = dto.Description,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            IsCurrentSeason = dto.IsCurrentSeason
        };
    }
}
