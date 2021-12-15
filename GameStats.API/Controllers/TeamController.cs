using System.Threading.Tasks;
using GameStats.API.Framework;
using GameStats.Common.Contracts.Team;
using GameStats.Services.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameStats.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(ApiExceptionFilter))]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }

        // GET: api/team
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var teams = await _teamService.GetAsync();

            return Ok(teams);
        }

        // GET: api/team/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var team = await _teamService.GetAsync(id);

            return team != null ? Ok(team) : NotFound();
        }

        // POST: api/team/add
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> AddAsync(TeamDto dto)
        {
            var team = await _teamService.AddAsync(dto);

            return team != null ? Ok(team) : NotFound();
        }

        // PUT: api/team/edit
        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> EditAsync(TeamDto dto)
        {
            var team = await _teamService.EditAsync(dto);

            return team != null ? Ok(team) : NotFound();
        }

        // DELETE: api/team/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var deleted = await _teamService.DeleteAsync(id);

            return deleted ? NoContent() : NotFound();
        }
    }
}
