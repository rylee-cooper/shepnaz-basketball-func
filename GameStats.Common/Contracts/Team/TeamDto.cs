using System.Collections.Generic;
using System.Text.Json.Serialization;
using GameStats.Common.Contracts.Coach;
using GameStats.Common.Contracts.Player;

namespace GameStats.Common.Contracts.Team
{
    public class TeamDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("leagueId")]
        public int LeagueId { get; set; }

        [JsonPropertyName("seasonId")]
        public int SeasonId { get; set; }

        [JsonPropertyName("players")] 
        public ICollection<PlayerDto> Players { get; set; } = new List<PlayerDto>();

        [JsonPropertyName("coaches")]
        public ICollection<CoachDto> Coaches { get; set; } = new List<CoachDto>();

        [JsonPropertyName("leagueDescription")]
        public string LeagueDescription { get; set; }

        [JsonPropertyName("seasonDescription")]
        public string SeasonDescription { get; set; }
    }

    public class TeamListDto
    {
        public List<TeamDto> Teams { get; set; } = new();
    }
}
