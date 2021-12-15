using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameStats.Data.Framework;
using GameStats.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStats.Data.Repositories
{
    public interface ILeagueRepository
    {
        Task<IEnumerable<League>> GetAsync();

        Task<League> GetAsync(int id);

        Task<League> AddAsync(League league);

        Task<League> EditAsync(League league);

        Task<bool> DeleteAsync(int id);
    }
    public class LeagueRepository : ILeagueRepository
    {
        private readonly AppDbContext _context;

        public LeagueRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<League>> GetAsync()
        {
            return await _context.Leagues.ToListAsync();
        }

        public async Task<League> GetAsync(int id)
        {
            return await Task.FromResult(_context.Leagues.AsNoTracking().FirstOrDefault(x => x.Id == id));
        }

        public async Task<League> AddAsync(League league)
        {
            _context.Add(league);
            await _context.SaveChangesAsync();
            return league;
        }

        public async Task<League> EditAsync(League league)
        {
            _context.Entry(league).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                if (_context.Leagues.Any(x => x.Id == league.Id))
                {
                    return null;
                }

                throw;
            }

            return league;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var league = await _context.Leagues.FindAsync(id);
            if (league == null)
            {
                return false;
            }

            _context.Leagues.Remove(league);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
