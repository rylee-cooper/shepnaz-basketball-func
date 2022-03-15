using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameStats.Common.Framework;
using GameStats.Data.Framework;
using GameStats.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStats.Data.Repositories
{
    public interface ITeamRepository
    {
        Task<IEnumerable<Team>> GetAsync();

        Task<Team> GetAsync(int id);

        Task<Team> AddAsync(Team team);

        Task<Team> EditAsync(Team team);

        Task<bool> DeleteAsync(int id);
    }

    public class TeamRepository : ITeamRepository
    {
        private readonly AppDbContext _context;

        public TeamRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Team>> GetAsync()
        {
            return await _context.Teams
                .Include(x => x.League)
                .Include(x => x.Season)
                .OrderBy(x => x.SeasonId)
                .ThenBy(x => x.LeagueId)
                .ThenBy(x => x.Name)
                .ToListAsync();
        }

        public async Task<Team> GetAsync(int id)
        {
            return await Task.FromResult(_context.Teams.AsNoTracking()
                .Include(x => x.League)
                .Include(x => x.Season)
                .FirstOrDefault(x => x.Id == id));
        }

        public async Task<Team> AddAsync(Team team)
        {
            await ValidateAddEdit(team);

            _context.Add(team);
            await _context.SaveChangesAsync();
            return team;
        }

        public async Task<Team> EditAsync(Team team)
        {
            await ValidateAddEdit(team);

            _context.Entry(team).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (_context.Teams.Any(x => x.Id == team.Id))
                {
                    return null;
                }

                throw;
            }

            return team;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var team = await _context.Teams.FindAsync(id);
            if (team == null)
            {
                return false;
            }

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();

            return true;
        }

        private async Task ValidateAddEdit(Team team)
        {
            var exists = await _context.Teams.AnyAsync(x =>
                x.Name == team.Name
                && x.SeasonId == team.SeasonId
                && x.LeagueId == team.LeagueId);

            if (exists)
            {
                throw new ApiException("This Team already exists. Please change name or selections.");
            }
        }
    }
}
