using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GameStats.Common.Contracts.Coach
{
    public class CoachDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string LastName { get; set; }

        [JsonPropertyName("isHeadCoach")]
        public bool IsHeadCoach { get; set; }

        [JsonPropertyName("TeamId")]
        public int TeamId { get; set; }
    }

    public class CoachListDto
    {
        public List<CoachDto> Coaches { get; set; } = new();
    }
}
