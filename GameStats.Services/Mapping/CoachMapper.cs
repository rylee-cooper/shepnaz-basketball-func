using GameStats.Common.Contracts.Coach;
using GameStats.Data.Models;

namespace GameStats.Services.Mapping
{
    public class CoachMapper
    {
        public static CoachDto DomainToDto(Coach domain) => domain != null
            ? new CoachDto
            {
                Id = domain.Id,
                FirstName = domain.FirstName,
                LastName = domain.LastName,
                IsHeadCoach = domain.IsHeadCoach,
                TeamId = domain.TeamId
            }
            : null;

        public static Coach DtoToDomain(CoachDto dto) => new()
        {
            Id = dto.Id,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            IsHeadCoach = dto.IsHeadCoach,
            TeamId = dto.TeamId
        };
    }
}
