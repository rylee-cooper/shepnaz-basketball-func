using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameStats.Data.Models
{
    [Table(nameof(Coach))]
    public class Coach
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(255)]
        public string LastName { get; set; }

        public bool IsHeadCoach { get; set; }

        [Required]
        public int TeamId { get; set; }

        public Team Team { get; set; }
    }
}
