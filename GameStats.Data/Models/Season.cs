using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameStats.Data.Models
{
    [Table(nameof(Season))]
    public class Season
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool IsCurrentSeason { get; set; }
    }
}
