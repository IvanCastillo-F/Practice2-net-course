using System;
using System.Collections.Generic;

namespace Calificaciones.Models;

public partial class SalonA
{
    public int IdEstudiante { get; set; }

    public string? NombreEstudiante { get; set; }

    public double? SemestreUno { get; set; }

    public double? SemestreDos { get; set; }

    public double? SemestreTres { get; set; }

    public double? CalifFinal { get; set; }
}
