export function alumnos() {
    const contenedor = document.createElement("div");
    contenedor.className = "alumnos-contenedor";

    const titulo = document.createElement("h2");
    titulo.textContent = "Lista de Alumnos";

    const fechaInput = document.createElement("input");
    fechaInput.type = "date";
    fechaInput.className = "fecha-input";
    const fechaActual = new Date().toISOString().split('T')[0];
    fechaInput.value = fechaActual;

    const grados = ["Kinder", "Primaria", "Secundaria", "Preparatoria", "Bachillerato"];
    const selectGrado = document.createElement("select");
    selectGrado.className = "grado-selector";
    grados.forEach(grado => {
        const option = document.createElement("option");
        option.value = grado;
        option.textContent = grado;
        selectGrado.appendChild(option);
    });

    const inputAlumno = document.createElement("input");
    inputAlumno.type = "text";
    inputAlumno.placeholder = "Escribir nombre del alumno";
    inputAlumno.className = "input-alumno";

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar Alumno";
    botonAgregar.className = "boton-agregar";
    botonAgregar.addEventListener("click", () => {
        const alumnoNombre = inputAlumno.value.trim();
        const gradoSeleccionado = selectGrado.value;

        if (alumnoNombre !== "") {
            fetch('http://localhost:3000/alumno', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: alumnoNombre, grado: gradoSeleccionado })
            })
            .then(response => response.json())
            .then(data => {
                if (data.mensaje === 'Alumno agregado exitosamente') {
                    const item = document.createElement("li");
                    item.textContent = `${alumnoNombre} - Grado: ${gradoSeleccionado}`;

                    const asistenciaContenedor = document.createElement("div");
                    asistenciaContenedor.className = "asistencia-buttons";

                    const botones = ["Presente", "Ausente", "Tarde"];
                    botones.forEach(estado => {
                        const boton = document.createElement("button");
                        boton.textContent = estado;
                        boton.className = "boton-asistencia";
                        boton.addEventListener("click", () => {
                            item.textContent = `${alumnoNombre} - Grado: ${gradoSeleccionado} - ${estado}`;
                            enviarAsistencia(alumnoNombre, estado);  // Enviar asistencia con el alumno y estado
                        });
                        asistenciaContenedor.appendChild(boton);
                    });

                    item.appendChild(asistenciaContenedor);
                    lista.appendChild(item);
                    inputAlumno.value = "";
                }
            })
            .catch(error => {
                console.error('Error al agregar alumno:', error);
            });
        }
    });

    const lista = document.createElement("ul");
    lista.className = "alumnos-lista";

    function enviarAsistencia(alumno, estado) {
        const fecha = fechaInput.value;

        fetch("http://localhost:3000/asistencia", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fecha, estado, alumno })  // Enviamos el nombre del alumno
        })
        .then(response => response.json())
        .then(data => {
            console.log("Asistencia registrada:", data);
            alert(`Asistencia de ${alumno} marcada como ${estado}`);
        })
        .catch(error => {
            console.error("Error al registrar asistencia:", error);
            alert("Hubo un error al registrar la asistencia.");
        });
    }

    fetch('http://localhost:3000/alumno')
        .then(response => response.json())
        .then(data => {
            data.forEach(alumno => {
                const item = document.createElement("li");
                item.textContent = `${alumno.nombre} - Grado: ${alumno.grado}`;

                const asistenciaContenedor = document.createElement("div");
                asistenciaContenedor.className = "asistencia-buttons";

                const botones = ["Presente", "Ausente", "Tarde"];
                botones.forEach(estado => {
                    const boton = document.createElement("button");
                    boton.textContent = estado;
                    boton.className = "boton-asistencia";
                    boton.addEventListener("click", () => {
                        item.textContent = `${alumno.nombre} - Grado: ${alumno.grado} - ${estado}`;
                        enviarAsistencia(alumno.nombre, estado);  // Enviar asistencia con el nombre del alumno
                    });
                    asistenciaContenedor.appendChild(boton);
                });

                item.appendChild(asistenciaContenedor);
                lista.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error al obtener los alumnos:', error);
        });

    contenedor.appendChild(titulo);
    contenedor.appendChild(fechaInput);
    contenedor.appendChild(selectGrado);
    contenedor.appendChild(inputAlumno);
    contenedor.appendChild(botonAgregar);
    contenedor.appendChild(lista);

    return contenedor;
}
