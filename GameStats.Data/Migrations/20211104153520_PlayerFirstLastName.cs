using Microsoft.EntityFrameworkCore.Migrations;

namespace GameStats.Data.Migrations
{
    public partial class PlayerFirstLastName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Player",
                newName: "LastName");

            migrationBuilder.AddColumn<string>(
                name: "FirstName",
                table: "Player",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirstName",
                table: "Player");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Player",
                newName: "Name");
        }
    }
}
