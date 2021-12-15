using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GameStats.Common.Contracts.Season
{
    public class SeasonDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("startDate")]
        public DateTime StartDate { get; set; }

        [JsonPropertyName("endDate")]
        public DateTime EndDate { get; set; }

        [JsonPropertyName("isCurrentSeason")]
        public bool IsCurrentSeason { get; set; }
    }

    public class SeasonListDto
    {
        public List<SeasonDto> Seasons { get; set; } = new();
    }
}
