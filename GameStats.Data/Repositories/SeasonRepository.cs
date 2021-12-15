using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameStats.Data.Framework;
using GameStats.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStats.Data.Repositories
{
    public interface ISeasonRepository
    {
        Task<IEnumerable<Season>> GetAsync();

        Task<Season> GetAsync(int id);

        Task<Season> AddAsync(Season season);

        Task<Season> EditAsync(Season season);

        Task<bool> DeleteAsync(int id);
    }

    public class SeasonRepository : ISeasonRepository
    {
        private readonly AppDbContext _context;

        public SeasonRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Season>> GetAsync()
        {
            return await _context.Seasons.ToListAsync();
        }

        public async Task<Season> GetAsync(int id)
        {
            return await Task.FromResult(_context.Seasons.AsNoTracking().FirstOrDefault(x => x.Id == id));
        }

        public async Task<Season> AddAsync(Season season)
        {
            _context.Add(season);
            await _context.SaveChangesAsync();
            return season;
        }

        public async Task<Season> EditAsync(Season season)
        {
            _context.Entry(season).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                if (_context.Seasons.Any(x => x.Id == season.Id))
                {
                    return null;
                }

                throw;
            }

            return season;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var season = await _context.Seasons.FindAsync(id);
            if (season == null)
            {
                return false;
            }

            _context.Seasons.Remove(season);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
