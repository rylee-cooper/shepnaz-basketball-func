using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GameStats.Common.Contracts.League
{
    public class LeagueDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }
    }

    public class LeagueListDto
    {
        public List<LeagueDto> Leagues { get; set; } = new();
    }
}
