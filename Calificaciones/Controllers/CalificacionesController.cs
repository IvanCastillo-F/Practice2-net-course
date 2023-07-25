using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Calificaciones.Models;
using System.Threading;
using Microsoft.EntityFrameworkCore;

namespace Calificaciones.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalificacionesController : ControllerBase
    {
        private readonly EscuelaContext _escuelaContext;

        public CalificacionesController(EscuelaContext escuelaContext)
        {
            _escuelaContext = escuelaContext;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            List<SalonA> lista = _escuelaContext.SalonAs.OrderByDescending(t => t.IdEstudiante).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] SalonA request)
        {
            // Editar una tarea existente
            var estudianteExistente = await _escuelaContext.SalonAs.FirstOrDefaultAsync(t => t.IdEstudiante == request.IdEstudiante);
            if (estudianteExistente == null)
            {
                await _escuelaContext.SalonAs.AddAsync(request);
                await _escuelaContext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, "Ok");
            }
            else
            {
                // Actualizar las propiedades de la tarea existente
                estudianteExistente.NombreEstudiante = request.NombreEstudiante;
                estudianteExistente.SemestreUno = request.SemestreUno;
                estudianteExistente.SemestreDos = request.SemestreDos;
                estudianteExistente.SemestreTres = request.SemestreTres;
                estudianteExistente.CalifFinal = request.CalifFinal;

                await _escuelaContext.SaveChangesAsync();

                return StatusCode(StatusCodes.Status200OK, "Tarea editada exitosamente.");
            }
        }


        [HttpDelete]
        [Route("Cerrar/{id:int}")]
        public async Task<IActionResult> Cerrar(int id)
        {
            SalonA estudiante = _escuelaContext.SalonAs.Where(t => t.IdEstudiante == id).FirstOrDefault();

            _escuelaContext.SalonAs.Remove(estudiante);
            await _escuelaContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
