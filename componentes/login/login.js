export function loginFormulario() {
    const divLogin = document.createElement("div");
    divLogin.className = "login-container";

    const form = document.createElement("form");
    form.className = "login-form";

    const inputCorreo = document.createElement("input");
    inputCorreo.type = "email";
    inputCorreo.placeholder = "Correo electrónico";
    inputCorreo.required = true;

    const inputContraseña = document.createElement("input");
    inputContraseña.type = "password";
    inputContraseña.placeholder = "Contraseña";
    inputContraseña.required = true;

    const buttonLogin = document.createElement("button");
    buttonLogin.type = "submit";
    buttonLogin.textContent = "Iniciar sesión";

    const crearCuentaLink = document.createElement("a");
    crearCuentaLink.href = "#";
    crearCuentaLink.textContent = "¿No tienes cuenta? Crea una aquí";
    crearCuentaLink.addEventListener("click", mostrarFormularioRegistro);

    form.appendChild(inputCorreo);
    form.appendChild(inputContraseña);
    form.appendChild(buttonLogin);
    form.appendChild(crearCuentaLink);

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const correo = inputCorreo.value;
        const contraseña = inputContraseña.value;
    
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contraseña })
        })
        .then(response => response.json())
        .then(data => {
            if (data.mensaje === 'Login exitoso') {
                localStorage.setItem("usuarioLogueado", JSON.stringify(data.usuario));
                alert('Inicio de sesión exitoso');
                window.location.href = "http://127.0.0.1:5500/"; // Redirigir al usuario a la página principal
            } else {
                alert(data.error || 'Error al iniciar sesión');
            }
        })
        .catch(error => {
            console.error('Error al hacer login:', error);
            alert('Hubo un error al intentar iniciar sesión');
        });
    });

    divLogin.appendChild(form);
    return divLogin;
}

function mostrarFormularioRegistro() {
    const divRegistro = document.createElement("div");
    divRegistro.className = "registro-container";

    const formRegistro = document.createElement("form");
    formRegistro.className = "registro-form";

    const inputNombre = document.createElement("input");
    inputNombre.type = "text";
    inputNombre.placeholder = "Nombre";
    inputNombre.required = true;

    const inputCorreo = document.createElement("input");
    inputCorreo.type = "email";
    inputCorreo.placeholder = "Correo electrónico";
    inputCorreo.required = true;

    const inputContraseña = document.createElement("input");
    inputContraseña.type = "password";
    inputContraseña.placeholder = "Contraseña";
    inputContraseña.required = true;

    const selectRol = document.createElement("select");
    const opcion1 = document.createElement("option");
    opcion1.value = "usuario";
    opcion1.textContent = "Usuario";
    const opcion2 = document.createElement("option");
    opcion2.value = "admin";
    opcion2.textContent = "Administrador";
    selectRol.appendChild(opcion1);
    selectRol.appendChild(opcion2);

    const buttonRegistro = document.createElement("button");
    buttonRegistro.type = "submit";
    buttonRegistro.textContent = "Registrar cuenta";

    formRegistro.appendChild(inputNombre);
    formRegistro.appendChild(inputCorreo);
    formRegistro.appendChild(inputContraseña);
    formRegistro.appendChild(selectRol);
    formRegistro.appendChild(buttonRegistro);

    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = inputNombre.value;
        const correo = inputCorreo.value;
        const contraseña = inputContraseña.value;
        const rol = selectRol.value;

        fetch('http://localhost:3000/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, correo, contraseña, rol })
        })
        .then(response => {
            if (response.ok) {
                alert('Cuenta creada con éxito');
                // Volver al login sin eliminar completamente el contenido
                document.getElementById("root").innerHTML = ""; // Limpiar el contenedor de root
                document.getElementById("root").appendChild(loginFormulario()); // Agregar el login nuevamente
            } else {
                response.json().then(msg => alert(msg.error));
            }
        })
        .catch(error => {
            console.error('Error al registrar cuenta:', error);
            alert('Hubo un error al registrar la cuenta');
        });
    });

    divRegistro.appendChild(formRegistro);
    document.getElementById("root").innerHTML = ""; // Limpiar el contenedor de root
    document.getElementById("root").appendChild(divRegistro);
}
