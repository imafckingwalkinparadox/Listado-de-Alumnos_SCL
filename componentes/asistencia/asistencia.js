import { alumnos } from "../alumnos/alumnos.js"; // Importamos la vista de alumnos

export function asistencia() {
    const contenedor = document.createElement("div");
    contenedor.className = "asistencia-contenedor";

    const titulo = document.createElement("h2");
    titulo.textContent = "Registro de Asistencia";

    const form = document.createElement("form");
    form.className = "asistencia-form";

    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.placeholder = "Nombre del Maestro";
    inputNombre.required = true;

    const inputMateria = document.createElement("input");
    inputMateria.type = "text";
    inputMateria.placeholder = "Materia";
    inputMateria.required = true;

    const inputUsuarioID = document.createElement("input");
    inputUsuarioID.type = "number";
    inputUsuarioID.placeholder = "Usuario ID";
    inputUsuarioID.required = true;

    const botonEnviar = document.createElement("button");
    botonEnviar.textContent = "Registrar Asistencia";
    botonEnviar.className = "asistencia-btn";

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = inputNombre.value;
        const materia = inputMateria.value;
        const usuario_id = inputUsuarioID.value;

        fetch('http://localhost:3000/maestro')
            .then(response => response.json())
            .then(data => {
                const maestroEncontrado = data.find(maestro => maestro.usuario_id === Number(usuario_id));
                if (maestroEncontrado) {
                    alert(`Asistencia registrada para ${maestroEncontrado.nombre} en ${maestroEncontrado.materia}`);

                    // Limpiar la vista actual y cargar alumnos.js
                    const root = document.getElementById("root");
                    root.innerHTML = "";
                    root.appendChild(alumnos());
                } else {
                    alert('Usuario ID no encontrado en la base de datos de maestros.');
                }
            })
            .catch(error => {
                console.error('Error al obtener la lista de maestros:', error);
                alert('Hubo un error al verificar el usuario.');
            });
    });

    form.appendChild(inputNombre);
    form.appendChild(inputMateria);
    form.appendChild(inputUsuarioID);
    form.appendChild(botonEnviar);

    contenedor.appendChild(titulo);
    contenedor.appendChild(form);

    return contenedor;
}
