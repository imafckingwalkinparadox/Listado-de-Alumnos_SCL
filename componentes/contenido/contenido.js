import { asistencia } from "../asistencia/asistencia.js";

export function contenedor() {
    const cuadro = document.createElement('div');
    cuadro.className = "cuadro1"; // Este es el contenedor donde se cargará la vista de alumnos

    const niveles = [
        { texto: "Ingresar a la asistencia", clase: "asistencia" }
    ];

    niveles.forEach(nivel => {
        const boton = document.createElement("button");
        boton.className = "nivel-boton";
        boton.textContent = nivel.texto;

        boton.addEventListener("click", () => {
            const root = document.getElementById("root");
            root.innerHTML = ""; // Limpiar la vista actual
            root.appendChild(asistencia()); // Cargar la vista de asistencia
        });

        cuadro.appendChild(boton);
    });

    return cuadro;
}
