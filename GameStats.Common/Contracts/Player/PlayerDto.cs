using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GameStats.Common.Contracts.Player
{
    public class PlayerDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("firstName")]
        public string FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public string LastName { get; set; }

        [JsonPropertyName("jerseyNumber")]
        public int JerseyNumber { get; set; }

        [JsonPropertyName("teamId")]
        public int TeamId { get; set; }

        [JsonPropertyName("teamName")]
        public string TeamName { get; set; }

        [JsonPropertyName("dateOfBirth")]
        public DateTime DateOfBirth { get; set; }

        [JsonPropertyName("gender")]
        public string Gender { get; set; }
    }

    public class PlayerListDto
    {
        public List<PlayerDto> Players { get; set; } = new();
    }
}
