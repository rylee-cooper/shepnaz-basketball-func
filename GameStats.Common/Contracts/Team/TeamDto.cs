using System.Collections.Generic;
using System.Text.Json.Serialization;

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
