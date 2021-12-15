using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameStats.Data.Models
{
    [Table(nameof(Team))]
    public class Team
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required]
        public int LeagueId { get; set; }

        [Required]
        public int SeasonId { get; set; }

        public League League { get; set; }

        public Season Season { get; set; }

        public ICollection<Player> Players { get; set; }

        public ICollection<Coach> Coaches { get; set; }
    }
}
