using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameStats.Data.Models
{
    [Table(nameof(Player))]
    public class Player
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(255)]
        public string LastName { get; set; }

        [Required]
        public int JerseyNumber { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
        
        [Required]
        public int TeamId { get; set; }

        public Team Team { get; set; }

        [Required]
        public int GenderId { get; set; }

        public Gender Gender { get; set; }
    }
}
