using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameStats.Data.Models
{
    [Table(nameof(League))]
    public class League
    {
        public int Id { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
