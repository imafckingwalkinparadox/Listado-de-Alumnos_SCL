import { Header } from "./componentes/header/header.js";
import { contenedor } from "./componentes/contenido/contenido.js";
import { loginFormulario } from "./componentes/login/login.js";

let DOM = document.getElementById("root");
DOM.className = "principal";

// Función para verificar si el usuario está logueado
function usuarioLogueado() {
    return JSON.parse(localStorage.getItem("usuarioLogueado"));
}

// Función para cargar el contenido del DOM
function cargarDom() {
    console.log('Cargando DOM...');  // Línea añadida para ver el estado de la carga

    DOM.innerHTML = ""; // Limpiar contenido antes de cargar algo nuevo
    if (usuarioLogueado()) {
        console.log('Usuario logueado:', usuarioLogueado()); // Línea añadida para verificar el usuario logueado
        DOM.appendChild(Header());
        DOM.appendChild(contenedor());

        // Agregar botón de cerrar sesión
        const logoutBtn = document.createElement("button");
        logoutBtn.textContent = "Cerrar sesión";
        logoutBtn.className = "logout-btn";
        logoutBtn.addEventListener("click", cerrarSesion);
        DOM.appendChild(logoutBtn);
    } else {
        console.log('No hay usuario logueado, mostrando formulario de login.'); // Línea añadida para verificar la carga del login
        DOM.appendChild(loginFormulario());
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    console.log('Cerrando sesión...');  // Línea añadida para verificar que se está cerrando la sesión
    localStorage.removeItem("usuarioLogueado");

    // Recargar el DOM directamente para mostrar el login
    cargarDom();  // Llamar a cargarDom() para recargar el contenido inmediatamente después de cerrar sesión
}

// Inicializar el DOM cuando se carga la página
cargarDom();
