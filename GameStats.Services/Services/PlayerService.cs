using System.Linq;
using System.Threading.Tasks;
using GameStats.Common.Contracts.Player;
using GameStats.Data.Repositories;
using GameStats.Services.Mapping;

namespace GameStats.Services.Services
{
    public interface IPlayerService
    {
        Task<PlayerListDto> GetAsync();

        Task<PlayerDto> GetAsync(int id);

        Task<PlayerListDto> GetByTeamAsync(int teamId);

        Task<PlayerDto> AddAsync(PlayerDto dto);

        Task<PlayerDto> EditAsync(PlayerDto dto);

        Task<bool> DeleteAsync(int id);
    }

    public class PlayerService : IPlayerService
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayerService(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public async Task<PlayerListDto> GetAsync()
        {
            var players = await _playerRepository.GetAsync();
            return new PlayerListDto
            {
                Players = players.Select(PlayerMapper.DomainToDto).ToList()
            };
        }

        public async Task<PlayerDto> GetAsync(int id)
        {
            var player = await _playerRepository.GetAsync(id);

            return PlayerMapper.DomainToDto(player);
        }

        public async Task<PlayerListDto> GetByTeamAsync(int teamId)
        {
            var players = await _playerRepository.GetByTeamAsync(teamId);
            return new PlayerListDto
            {
                Players = players.Select(PlayerMapper.DomainToDto).ToList()
            };
        }

        public async Task<PlayerDto> AddAsync(PlayerDto dto)
        {
            var player = await _playerRepository.AddAsync(PlayerMapper.DtoToDomain(dto));

            return PlayerMapper.DomainToDto(player);
        }

        public async Task<PlayerDto> EditAsync(PlayerDto dto)
        {
            var player = await _playerRepository.EditAsync(PlayerMapper.DtoToDomain(dto));

            return PlayerMapper.DomainToDto(player);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var deleted = await _playerRepository.DeleteAsync(id);

            return deleted;
        }
    }
}
