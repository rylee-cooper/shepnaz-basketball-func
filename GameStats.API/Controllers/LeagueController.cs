using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using GameStats.Common.Contracts.League;
using GameStats.Services.Services;

namespace GameStats.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeagueController : ControllerBase
    {
        private readonly ILeagueService _leagueService;

        public LeagueController(ILeagueService leagueService)
        {
            _leagueService = leagueService;
        }

        // GET: api/league
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var leagues = await _leagueService.GetAsync();

            return Ok(leagues);
        }

        // GET: api/league/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var league = await _leagueService.GetAsync(id);

            return league != null ? Ok(league) : NotFound();
        }

        // POST: api/league/add
        [HttpPost]
        public async Task<IActionResult> AddAsync(LeagueDto dto)
        {
            var league = await _leagueService.AddAsync(dto);

            return league != null ? Ok(league) : NotFound();
        }

        // PUT: api/league/edit
        [HttpPut]
        public async Task<IActionResult> EditAsync(LeagueDto dto)
        {
            var league = await _leagueService.EditAsync(dto);

            return league != null ? Ok(league) : NotFound();
        }

        // DELETE: api/league/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var deleted = await _leagueService.DeleteAsync(id);

            return deleted ? NoContent() : NotFound();
        }
    }
}
