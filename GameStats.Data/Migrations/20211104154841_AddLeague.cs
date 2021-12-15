using Microsoft.EntityFrameworkCore.Migrations;

namespace GameStats.Data.Migrations
{
    public partial class AddLeague : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LeagueId",
                table: "Team",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "League",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_League", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Team_LeagueId",
                table: "Team",
                column: "LeagueId");

            migrationBuilder.AddForeignKey(
                name: "FK_Team_League_LeagueId",
                table: "Team",
                column: "LeagueId",
                principalTable: "League",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Team_League_LeagueId",
                table: "Team");

            migrationBuilder.DropTable(
                name: "League");

            migrationBuilder.DropIndex(
                name: "IX_Team_LeagueId",
                table: "Team");

            migrationBuilder.DropColumn(
                name: "LeagueId",
                table: "Team");
        }
    }
}
