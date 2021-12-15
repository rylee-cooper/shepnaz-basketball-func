using System.Threading.Tasks;
using GameStats.Common.Contracts.Season;
using GameStats.Services.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameStats.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeasonController : ControllerBase
    {
        private readonly ISeasonService _seasonService;

        public SeasonController(ISeasonService seasonService)
        {
            _seasonService = seasonService;
        }

        // GET: api/season
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var seasons = await _seasonService.GetAsync();

            return Ok(seasons);
        }

        // GET: api/season/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var season = await _seasonService.GetAsync(id);

            return season != null ? Ok(season) : NotFound();
        }

        // POST: api/season/add
        [HttpPost]
        public async Task<IActionResult> AddAsync(SeasonDto dto)
        {
            var season = await _seasonService.AddAsync(dto);

            return season != null ? Ok(season) : NotFound();
        }

        // PUT: api/season/edit
        [HttpPut]
        public async Task<IActionResult> EditAsync(SeasonDto dto)
        {
            var season = await _seasonService.EditAsync(dto);

            return season != null ? Ok(season) : NotFound();
        }

        // DELETE: api/season/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var deleted = await _seasonService.DeleteAsync(id);

            return deleted ? NoContent() : NotFound();
        }
    }
}
