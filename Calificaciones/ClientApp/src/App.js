import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";

const App = () => {

    const [idEstudiante, setidEstudiante] = useState(0);
    const [estudiantes, setestudiantes] = useState([]);
    const [nombreEstudiante, setnombreEstudiante] = useState("");
    const [semestreUno, setsemestreUno] = useState(0);
    const [semestreDos, setsemestreDos] = useState(0);
    const [semestreTres, setsemestreTres] = useState(0);
    const [califFinal, setcalifFinal] = useState(0);
    const [estudianteEditando, setestudianteEditando] = useState(null);
    const mostrarEstudiantes = async () => {

        const response = await fetch("api/calificaciones/Lista");
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setestudiantes(data)
        } else {
            console.log("status code:" + response.status)
        }

    }

    useEffect(() => {
        mostrarEstudiantes();
    }, [])

    const guardarEstudiante = async (e) => {

        e.preventDefault()

        const response = await fetch("api/calificaciones/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ idEstudiante: idEstudiante, nombreEstudiante: nombreEstudiante, semestreUno: semestreUno, semestreDos: semestreDos, semestreTres: semestreTres, califFinal: califFinal})
        })

        if (response.ok) {
            setnombreEstudiante("");
            setsemestreUno(0);
            setsemestreDos(0);
            setsemestreTres(0);
            setcalifFinal(0);
            setidEstudiante(0);
            await mostrarEstudiantes();
        }
    }

    const editarEstudiante = (estudiante) => {
        setestudianteEditando(estudiante);
        setnombreEstudiante(estudiante.nombreEstudiante);
        setsemestreUno(estudiante.semestreUno);
        setsemestreUno(estudiante.semestreDos);
        setsemestreUno(estudiante.semestreTres);
        setsemestreUno(estudiante-califFinal);
        setidEstudiante(estudiante.idEstudiante);
    };

    const calcularCalificacionFinal = (estudiante) => {
        const calificacion1Number = parseFloat(estudiante.semestreUno);
        const calificacion2Number = parseFloat(estudiante.semestreDos);
        const calificacion3Number = parseFloat(estudiante.semestreTres);

        if (isNaN(calificacion1Number) || isNaN(calificacion2Number) || isNaN(calificacion3Number)) {
            return "N/A"; // Si alguna calificación no es un número válido, muestra "N/A"
        }

        const promedio = (calificacion1Number + calificacion2Number + calificacion3Number) / 3;
        return promedio.toFixed(2); // Devuelve el promedio con dos decimales
    };

    const eliminarEstudiante = async (id) => {

        const response = await fetch("api/calificaciones/Cerrar/" + id, {
            method: "DELETE"
        })

        if (response.ok)
            await mostrarEstudiantes();
    }

    return (
        <div className="container p-4 vh-100">
            <h2 className="text-white">Lista de estudiantes</h2>
            <div className="row">
                <div className="col-sm-12">
                    <form onSubmit={guardarEstudiante}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese nombre"
                                value={nombreEstudiante}
                                onChange={(e) => setnombreEstudiante(e.target.value)}
                            />
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Calificación 1"
                                value={semestreUno}
                                onChange={(e) => setsemestreUno(e.target.value)}
                            />
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Calificación 2"
                                value={semestreDos}
                                onChange={(e) => setsemestreDos(e.target.value)}
                            />
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Calificación 3"
                                value={semestreTres}
                                onChange={(e) => setsemestreTres(e.target.value)}
                            />
                            <button className="btn btn-success">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-sm-12">
                    <div className="list-group">
                        {estudiantes.map((estudiante) => (


                            <div key={estudiante.id} class="card bg-success-subtle mt-4">
                                <img src="https://sialifehospital.com/wp-content/uploads/2021/04/testimonial-1.png" class="card-img-top" alt="..."/>
                            <div class="card-body">
                              <div class="text-section">
                                        <p class="card-text" style={{ color: '#000' }}>Nombre: {estudiante.nombreEstudiante} <br />Calificacion 1: {estudiante.semestreUno}<br />Calificacion 2: {estudiante.semestreDos}
                                            <br />Calificacion 3: {estudiante.semestreTres}
                                            <br />Calificacion Final: {calcularCalificacionFinal(estudiante)}</p>
                              </div>
                              <div class="cta-section">
                                        <button style={{ height: '30px', width: '100px' }}
                                            type="button"
                                            className="btn btn-sm btn-outline-warning mr-2"
                                            onClick={() => editarEstudiante(estudiante)}
                                        >
                                            Editar
                                        </button>
                                        <button style={{ height: '30px', width: '100px' }}
                                            type="button"
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => eliminarEstudiante(estudiante.idEstudiante)}
                                        >
                                            Eliminar
                                        </button>
      </div>
    </div>
  </div>

                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;