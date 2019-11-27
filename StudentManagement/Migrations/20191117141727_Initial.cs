using Microsoft.EntityFrameworkCore.Migrations;

namespace StudentManagement.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Students",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Gender = table.Column<int>(nullable: false),
                    Surname = table.Column<string>(maxLength: 40, nullable: false),
                    Name = table.Column<string>(maxLength: 40, nullable: false),
                    Patronymic = table.Column<string>(maxLength: 60, nullable: true),
                    Identifier = table.Column<string>(maxLength: 16, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Students", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Students_Identifier",
                table: "Students",
                column: "Identifier",
                unique: true,
                filter: "[Identifier] IS NOT NULL");

            migrationBuilder.InsertData(
               table: "Students",
               columns: new[] { "Id", "Gender", "Identifier", "Name", "Patronymic", "Surname" },
               values: new object[] { 1, 1, "Developer", "Vadim", "Borisovich", "Shubin" });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "Id", "Gender", "Identifier", "Name", "Patronymic", "Surname" },
                values: new object[] { 2, 1, null, "Ivan", "Ivanovich", "Ivanov" });

            migrationBuilder.InsertData(
                table: "Students",
                columns: new[] { "Id", "Gender", "Identifier", "Name", "Patronymic", "Surname" },
                values: new object[] { 3, 2, null, "Alexandra", null, "Alexandrova" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Students");
        }
    }
}
