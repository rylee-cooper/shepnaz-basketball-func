using System.Linq;
using System.Threading.Tasks;
using GameStats.Common.Contracts.League;
using GameStats.Data.Repositories;
using GameStats.Services.Mapping;

namespace GameStats.Services.Services
{
    public interface ILeagueService
    {
        Task<LeagueListDto> GetAsync();

        Task<LeagueDto> GetAsync(int id);

        Task<LeagueDto> AddAsync(LeagueDto dto);

        Task<LeagueDto> EditAsync(LeagueDto dto);

        Task<bool> DeleteAsync(int id);
    }
    public class LeagueService : ILeagueService
    {
        private readonly ILeagueRepository _leagueRepository;

        public LeagueService(ILeagueRepository leagueRepository)
        {
            _leagueRepository = leagueRepository;
        }

        public async Task<LeagueListDto> GetAsync()
        {
            var leagues = await _leagueRepository.GetAsync();
            return new LeagueListDto()
            {
                Leagues = leagues.Select(LeagueMapper.DomainToDto).ToList()
            };
        }

        public async Task<LeagueDto> GetAsync(int id)
        {
            var league = await _leagueRepository.GetAsync(id);

            return LeagueMapper.DomainToDto(league);
        }

        public async Task<LeagueDto> AddAsync(LeagueDto dto)
        {
            var league = await _leagueRepository.AddAsync(LeagueMapper.DtoToDomain(dto));

            return LeagueMapper.DomainToDto(league);
        }

        public async Task<LeagueDto> EditAsync(LeagueDto dto)
        {
            var league = await _leagueRepository.EditAsync(LeagueMapper.DtoToDomain(dto));

            return LeagueMapper.DomainToDto(league);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var deleted = await _leagueRepository.DeleteAsync(id);

            return deleted;
        }
    }
}
