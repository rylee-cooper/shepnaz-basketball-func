using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GameStats.Data.Migrations
{
    public partial class AddCurrentSeasonPlayerDetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsCurrentSeason",
                table: "Season",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "Player",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Player",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsCurrentSeason",
                table: "Season");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Player");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Player");
        }
    }
}
