using System.Linq;
using System.Threading.Tasks;
using GameStats.Common.Contracts.Team;
using GameStats.Common.Framework;
using GameStats.Data.Repositories;
using GameStats.Services.Mapping;

namespace GameStats.Services.Services
{
    public interface ITeamService
    {
        Task<TeamListDto> GetAsync();

        Task<TeamDto> GetAsync(int id);

        Task<TeamDto> AddAsync(TeamDto dto);

        Task<TeamDto> EditAsync(TeamDto dto);

        Task<bool> DeleteAsync(int id);
    }
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;

        public TeamService(ITeamRepository teamRepository)
        {
            _teamRepository = teamRepository;
        }

        public async Task<TeamListDto> GetAsync()
        {
            var teams = await _teamRepository.GetAsync();
            return new TeamListDto
            {
                Teams = teams.Select(TeamMapper.DomainToDto).ToList()
            };
        }

        public async Task<TeamDto> GetAsync(int id)
        {
            var team = await _teamRepository.GetAsync(id);

            return TeamMapper.DomainToDto(team);
        }

        public async Task<TeamDto> AddAsync(TeamDto dto)
        {
            ValidateAddEdit(dto);

            var team = await _teamRepository.AddAsync(TeamMapper.DtoToDomain(dto));

            return TeamMapper.DomainToDto(team);
        }

        public async Task<TeamDto> EditAsync(TeamDto dto)
        {
            ValidateAddEdit(dto);

            var team = await _teamRepository.EditAsync(TeamMapper.DtoToDomain(dto));

            return TeamMapper.DomainToDto(team);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var deleted = await _teamRepository.DeleteAsync(id);

            return deleted;
        }

        private static void ValidateAddEdit(TeamDto dto)
        {
            if (string.IsNullOrEmpty(dto.Name) || dto.LeagueId == 0 || dto.SeasonId == 0)
            {
                throw new ApiException("All fields are required");
            }
        }
    }
}
