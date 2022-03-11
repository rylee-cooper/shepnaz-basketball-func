using System.Linq;
using System.Threading.Tasks;
using GameStats.Common.Contracts.Gender;
using GameStats.Data.Repositories;
using GameStats.Services.Mapping;

namespace GameStats.Services.Services
{
    public interface IGenderService
    {
        Task<GenderListDto> GetAsync();

        Task<GenderDto> GetAsync(int id);
    }
    public class GenderService : IGenderService
    {
        private readonly IGenderRepository _genderRepository;

        public GenderService(IGenderRepository genderRepository)
        {
            _genderRepository = genderRepository;
        }

        public async Task<GenderListDto> GetAsync()
        {
            var genders = await _genderRepository.GetAsync();
            return new GenderListDto()
            {
                Genders = genders.Select(GenderMapper.DomainToDto).ToList()
            };
        }

        public async Task<GenderDto> GetAsync(int id)
        {
            var gender = await _genderRepository.GetAsync(id);

            return GenderMapper.DomainToDto(gender);
        }

    }
}
