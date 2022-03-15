using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameStats.Data.Framework;
using GameStats.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStats.Data.Repositories
{
    public interface ICoachRepository
    {
        Task<IEnumerable<Coach>> GetAsync();

        Task<Coach> GetAsync(int id);
        Task<IEnumerable<Coach>> GetByTeamId(int teamId);

        Task<Coach> AddAsync(Coach coach);

        Task<Coach> EditAsync(Coach coach);

        Task<bool> DeleteAsync(int id);
    }
    public class CoachRepository : ICoachRepository
    {
        private readonly AppDbContext _context;

        public CoachRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Coach>> GetAsync()
        {
            return await _context.Coaches.ToListAsync();
        }

        public async Task<Coach> GetAsync(int id)
        {
            return await Task.FromResult(_context.Coaches.AsNoTracking().FirstOrDefault(x => x.Id == id));
        }

        public async Task<IEnumerable<Coach>> GetByTeamId(int teamId)
        {
            return await _context.Coaches
                .Where(x => x.TeamId == teamId)
                .ToListAsync();
        }
        public async Task<Coach> AddAsync(Coach coach)
        {
            _context.Add(coach);
            await _context.SaveChangesAsync();
            return coach;
        }

        public async Task<Coach> EditAsync(Coach coach)
        {
            _context.Entry(coach).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (_context.Coaches.Any(x => x.Id == coach.Id))
                {
                    return null;
                }

                throw;
            }

            return coach;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var coach = await _context.Coaches.FindAsync(id);
            if (coach == null)
            {
                return false;
            }

            _context.Coaches.Remove(coach);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

