using Microsoft.EntityFrameworkCore.Migrations;

namespace GameStats.Data.Migrations
{
    public partial class AssociatePlayerwithGender : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Player");

            migrationBuilder.AddColumn<int>(
                name: "GenderId",
                table: "Player",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Player_GenderId",
                table: "Player",
                column: "GenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Player_Gender_GenderId",
                table: "Player",
                column: "GenderId",
                principalTable: "Gender",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Player_Gender_GenderId",
                table: "Player");

            migrationBuilder.DropIndex(
                name: "IX_Player_GenderId",
                table: "Player");

            migrationBuilder.DropColumn(
                name: "GenderId",
                table: "Player");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Player",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
