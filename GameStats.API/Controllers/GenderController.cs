using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using GameStats.Services.Services;

namespace GameStats.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenderController : ControllerBase
    {
        private readonly IGenderService _genderService;

        public GenderController(IGenderService genderService)
        {
            _genderService = genderService;
        }

        // GET: api/gender
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var genders = await _genderService.GetAsync();

            return Ok(genders);
        }

        // GET: api/gender/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var gender = await _genderService.GetAsync(id);

            return gender != null ? Ok(gender) : NotFound();
        }
    }
}
