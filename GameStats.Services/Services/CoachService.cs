using System.Linq;
using System.Threading.Tasks;
using GameStats.Common.Contracts.Coach;
using GameStats.Data.Repositories;
using GameStats.Services.Mapping;

namespace GameStats.Services.Services
{
    public interface ICoachService
    {
        Task<CoachListDto> GetAsync();

        Task<CoachDto> GetAsync(int id);

        Task<CoachListDto> GetByTeamId(int teamId);

        Task<CoachDto> AddAsync(CoachDto dto);

        Task<CoachDto> EditAsync(CoachDto dto);

        Task<bool> DeleteAsync(int id);
    }
    public class CoachService : ICoachService
    {
        private readonly ICoachRepository _coachRepository;

        public CoachService(ICoachRepository coachRepository)
        {
            _coachRepository = coachRepository;
        }

        public async Task<CoachListDto> GetAsync()
        {
            var coaches = await _coachRepository.GetAsync();
            return new CoachListDto()
            {
                Coaches = coaches.Select(CoachMapper.DomainToDto).ToList()
            };
        }

        public async Task<CoachDto> GetAsync(int id)
        {
            var coach = await _coachRepository.GetAsync(id);

            return CoachMapper.DomainToDto(coach);
        }

        public async Task<CoachListDto> GetByTeamId(int teamId)
        {
            var coaches = await _coachRepository.GetByTeamId(teamId);
            return new CoachListDto()
            {
                Coaches = coaches.Select(CoachMapper.DomainToDto).ToList()
            };
        }

        public async Task<CoachDto> AddAsync(CoachDto dto)
        {
            var coach = await _coachRepository.AddAsync(CoachMapper.DtoToDomain(dto));

            return CoachMapper.DomainToDto(coach);
        }

        public async Task<CoachDto> EditAsync(CoachDto dto)
        {
            var coach = await _coachRepository.EditAsync(CoachMapper.DtoToDomain(dto));

            return CoachMapper.DomainToDto(coach);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var deleted = await _coachRepository.DeleteAsync(id);

            return deleted;
        }
    }
}
