using System.Linq;
using System.Threading.Tasks;
using GameStats.Common.Contracts.Season;
using GameStats.Data.Repositories;
using GameStats.Services.Mapping;

namespace GameStats.Services.Services
{
    public interface ISeasonService
    {
        Task<SeasonListDto> GetAsync();

        Task<SeasonDto> GetAsync(int id);

        Task<SeasonDto> AddAsync(SeasonDto dto);

        Task<SeasonDto> EditAsync(SeasonDto dto);

        Task<bool> DeleteAsync(int id);
    }

    public class SeasonService : ISeasonService
    {
        private readonly ISeasonRepository _seasonRepository;

        public SeasonService(ISeasonRepository seasonRepository)
        {
            _seasonRepository = seasonRepository;
        }

        public async Task<SeasonListDto> GetAsync()
        {
            var seasons = await _seasonRepository.GetAsync();
            return new SeasonListDto()
            {
                Seasons = seasons.Select(SeasonMapper.DomainToDto).ToList()
            };
        }

        public async Task<SeasonDto> GetAsync(int id)
        {
            var season = await _seasonRepository.GetAsync(id);

            return SeasonMapper.DomainToDto(season);
        }

        public async Task<SeasonDto> AddAsync(SeasonDto dto)
        {
            var season = await _seasonRepository.AddAsync(SeasonMapper.DtoToDomain(dto));

            return SeasonMapper.DomainToDto(season);
        }

        public async Task<SeasonDto> EditAsync(SeasonDto dto)
        {
            var season = await _seasonRepository.EditAsync(SeasonMapper.DtoToDomain(dto));

            return SeasonMapper.DomainToDto(season);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var deleted = await _seasonRepository.DeleteAsync(id);

            return deleted;
        }
    }
}
