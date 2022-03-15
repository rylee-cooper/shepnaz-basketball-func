using System.Threading.Tasks;
using GameStats.API.Framework;
using GameStats.Common.Contracts.Player;
using GameStats.Services.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameStats.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ApiExceptionFilter))]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;

        public PlayerController(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        // GET: api/player
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var players = await _playerService.GetAsync();

            return Ok(players);
        }

        // GET: api/player/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var player = await _playerService.GetAsync(id);

            return player != null ? Ok(player) : NotFound();
        }

        // GET: api/player/team/5
        [HttpGet("Team/{teamId}")]
        public async Task<IActionResult> GetByTeamId(int teamId)
        {
            var players = await _playerService.GetByTeamAsync(teamId);

            return players != null ? Ok(players) : NotFound();
        }

        // POST: api/player/add
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> AddAsync(PlayerDto dto)
        {
            var player = await _playerService.AddAsync(dto);

            return player != null ? Ok(player) : NotFound();
        }

        // PUT: api/player/edit
        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> EditAsync(PlayerDto dto)
        {
            var player = await _playerService.EditAsync(dto);

            return player != null ? Ok(player) : NotFound();
        }

        // DELETE: api/player/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var deleted = await _playerService.DeleteAsync(id);

            return deleted ? NoContent() : NotFound();
        }
    }
}
