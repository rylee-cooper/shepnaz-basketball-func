using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameStats.Data.Framework;
using GameStats.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStats.Data.Repositories
{
    public interface IGenderRepository
    {
        Task<IEnumerable<Gender>> GetAsync();

        Task<Gender> GetAsync(int id);
    }
    public class GenderRepository : IGenderRepository
    {
        private readonly AppDbContext _context;

        public GenderRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Gender>> GetAsync()
        {
            return await _context.Genders.ToListAsync();
        }

        public async Task<Gender> GetAsync(int id)
        {
            return await Task.FromResult(_context.Genders.AsNoTracking().FirstOrDefault(x => x.Id == id));

        }
    }
}
