﻿using GameStats.Common.Contracts.Player;
using GameStats.Data.Models;

namespace GameStats.Services.Mapping
{
    public class PlayerMapper
    {
        public static PlayerDto DomainToDto(Player domain) => domain != null
            ? new PlayerDto
            {
                Id = domain.Id,
                FirstName = domain.FirstName,
                LastName = domain.LastName,
                JerseyNumber = domain.JerseyNumber,
                TeamId = domain.TeamId,
                TeamName = domain.Team?.Name ?? string.Empty,
                DateOfBirth = domain.DateOfBirth,
                Gender = domain.Gender
            }
            : null;

        public static Player DtoToDomain(PlayerDto dto) => new()
        {
            Id = dto.Id,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            JerseyNumber = dto.JerseyNumber,
            TeamId = dto.TeamId,
            DateOfBirth = dto.DateOfBirth,
            Gender = dto.Gender
        };
    }
}
