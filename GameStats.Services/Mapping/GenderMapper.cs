using GameStats.Common.Contracts.Gender;
using GameStats.Data.Models;

namespace GameStats.Services.Mapping
{
    public class GenderMapper
    {
        public static GenderDto DomainToDto(Gender domain) => domain != null
            ? new GenderDto
            {
                Id = domain.Id,
                Description = domain.Description
            }
            : null;
    }
}
