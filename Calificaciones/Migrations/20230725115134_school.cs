using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Calificaciones.Migrations
{
    /// <inheritdoc />
    public partial class school : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SalonA",
                columns: table => new
                {
                    IdEstudiante = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NombreEstudiante = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    SemestreUno = table.Column<double>(type: "float", nullable: true),
                    SemestreDos = table.Column<double>(type: "float", nullable: true),
                    SemestreTres = table.Column<double>(type: "float", nullable: true),
                    CalifFinal = table.Column<double>(type: "float", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SalonA__B5007C24815197A0", x => x.IdEstudiante);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SalonA");
        }
    }
}
