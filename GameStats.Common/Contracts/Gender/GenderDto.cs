using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace GameStats.Common.Contracts.Gender
{
    public class GenderDto
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }
    }
    public class GenderListDto
    {
        public List<GenderDto> Genders { get; set; } = new();
    }
}
