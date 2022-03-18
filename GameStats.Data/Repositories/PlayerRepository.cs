using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameStats.Data.Framework;
using GameStats.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStats.Data.Repositories
{
    public interface IPlayerRepository
    {
        Task<IEnumerable<Player>> GetAsync();

        Task<Player> GetAsync(int id);

        Task<IEnumerable<Player>> GetByTeamAsync(int teamId);

        Task<Player> AddAsync(Player player);

        Task<Player> EditAsync(Player player);

        Task<bool> DeleteAsync(int id);
    }

    public class PlayerRepository : IPlayerRepository
    {
        private readonly AppDbContext _context;

        public PlayerRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Player>> GetAsync()
        {
            return await _context.Players
                .Include(x => x.Team)
                .Include(x => x.Gender)
                .ToListAsync();
        }

        public async Task<Player> GetAsync(int id)
        {
            return await _context.Players
                .AsNoTracking()
                .Include(x => x.Team)
                .Include(x => x.Gender)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Player>> GetByTeamAsync(int teamId)
        {
            return await _context.Players
                .Where(x => x.TeamId == teamId)
                .Include(x => x.Gender)
                .ToListAsync();
        }

        public async Task<Player> AddAsync(Player player)
        {
            _context.Add(player);
            await _context.SaveChangesAsync();
            return player;
        }

        public async Task<Player> EditAsync(Player player)
        {
            _context.Entry(player).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (_context.Players.Any(x => x.Id == player.Id))
                {
                    return null;
                }

                throw;
            }

            return player;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var player = await _context.Players.FindAsync(id);
            if (player == null)
            {
                return false;
            }

            _context.Players.Remove(player);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
