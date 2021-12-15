using System.Threading.Tasks;
using GameStats.Common.Contracts.Coach;
using GameStats.Services.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameStats.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoachController : ControllerBase
    {
        private readonly ICoachService _coachService;

        public CoachController(ICoachService coachService)
        {
            _coachService = coachService;
        }

        // GET: api/coach
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var coaches = await _coachService.GetAsync();

            return Ok(coaches);
        }

        // GET: api/coach/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var coach = await _coachService.GetAsync(id);

            return coach != null ? Ok(coach) : NotFound();
        }

        // POST: api/coach/add
        [HttpPost]
        public async Task<IActionResult> AddAsync(CoachDto dto)
        {
            var coach = await _coachService.AddAsync(dto);

            return coach != null ? Ok(coach) : NotFound();
        }

        // PUT: api/coach/edit
        [HttpPut]
        public async Task<IActionResult> EditAsync(CoachDto dto)
        {
            var coach = await _coachService.EditAsync(dto);

            return coach != null ? Ok(coach) : NotFound();
        }

        // DELETE: api/coach/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var deleted = await _coachService.DeleteAsync(id);

            return deleted ? NoContent() : NotFound();
        }
    }
}
