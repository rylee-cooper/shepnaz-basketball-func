using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GameStats.Data.Migrations
{
    public partial class AddSeason : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SeasonId",
                table: "Team",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Season",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Season", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Team_SeasonId",
                table: "Team",
                column: "SeasonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Team_Season_SeasonId",
                table: "Team",
                column: "SeasonId",
                principalTable: "Season",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Team_Season_SeasonId",
                table: "Team");

            migrationBuilder.DropTable(
                name: "Season");

            migrationBuilder.DropIndex(
                name: "IX_Team_SeasonId",
                table: "Team");

            migrationBuilder.DropColumn(
                name: "SeasonId",
                table: "Team");
        }
    }
}
