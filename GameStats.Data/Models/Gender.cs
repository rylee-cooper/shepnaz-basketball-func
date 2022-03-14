using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameStats.Data.Models
{
    [Table(nameof(Gender))]
    public class Gender
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }

        public ICollection<Player> Players { get; set; }

    }
}
