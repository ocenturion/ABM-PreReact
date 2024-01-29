
// Objeto a guardar
let usuario = {
    id: 0,
    nombre: 'Juan',
    apellido: 'Ejemplo'
};

window.onload = function () {
    llenarTabla()
}

function llenarTabla() {
    let tBody = ''
    let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuariosGuardados.forEach(e => {
        tBody += `<tr>
                    <td>${e.nombre}</td>
                    <td>${e.apellido}</td>
                    <td>
                        <a data-toggle="tooltip" title="Modificar" onclick="cargarModalModificar(${e.id}, this)">
                            <i class="bi bi-pencil"></i>
                        </a>
                        <a data-toggle="tooltip" title="Eliminar" onclick="mostarModalEliminar(${e.id})">
                            <i class="bi bi-trash text-danger"></i>
                        </a>
                    </td>
                </tr> `
    });
    document.getElementById('tbody').innerHTML = tBody
}


function agregarUsuario() {
    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value

    let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log(usuariosGuardados); // Imprimirá el objeto JavaScript

    // Crear un nuevo objeto de usuario
    let nuevoUsuario = {
        id: usuariosGuardados.length + 1, // Asignar un nuevo ID basado en la longitud del arreglo actual
        nombre: nombre,
        apellido: apellido
    };

    // Agregar el nuevo usuario al arreglo
    usuariosGuardados.push(nuevoUsuario);

    // Convertir a cadena JSON y guardar en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
    
    console.log(usuariosGuardados); // Imprimirá el objeto JavaScript

    document.getElementById('nombre').value = ''
    document.getElementById('apellido').value = ''

    llenarTabla()
        
}

function cargarModalModificar(id, e) {
    const miModal = new bootstrap.Modal(document.getElementById("modalModificar"))
    miModal.show()
    document.getElementById('nombreModal').value = e.parentNode.parentNode.childNodes[1].innerText
    document.getElementById('apellidoModal').value = e.parentNode.parentNode.childNodes[3].innerText
    document.getElementById('idModificar').value = id 
}

function modificarUsuario() {
    let nombre = document.getElementById('nombreModal').value 
    let apellido = document.getElementById('apellidoModal').value 
    let idModificar = document.getElementById('idModificar').value
    
    // Obtener los datos actuales del localStorage
    let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Supongamos que quieres modificar el nombre del usuario con ID 1
    const usuarioIDaModificar = parseInt(idModificar);

    // Encontrar el índice del usuario en el array
    const indiceUsuario = usuariosGuardados.findIndex(usuario => usuario.id === usuarioIDaModificar);

    // Verificar si se encontró el usuario
    if (indiceUsuario !== -1) {
        // Modificar el nombre del usuario
        usuariosGuardados[indiceUsuario].nombre = nombre;
        usuariosGuardados[indiceUsuario].apellido = apellido;

        // Guardar los datos actualizados de vuelta en el localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

        console.log("Nombre del usuario modificado correctamente.");
    } else {
        console.log("Usuario no encontrado con el ID especificado.");
    }

    var myModalEl = document.getElementById('modalModificar')
    bootstrap.Modal.getInstance(myModalEl).hide()

    llenarTabla()

}

function mostarModalEliminar(id) {
    let miModal = new bootstrap.Modal(document.getElementById("modalEliminar"))
    document.getElementById('idEliminar').value = id
    miModal.show()
}

function eliminarUsuario() {

    let idEliminar = document.getElementById('idEliminar').value    

    // Obtener los datos actuales del localStorage
    let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Supongamos que quieres eliminar el usuario con ID 1
    const usuarioIDaEliminar = parseInt(idEliminar);

    // Filtrar el array para excluir el usuario con el ID específico
    usuariosGuardados = usuariosGuardados.filter(usuario => usuario.id !== usuarioIDaEliminar);

    // Guardar los datos actualizados de vuelta en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

    console.log("Usuario eliminado correctamente.");

    var myModalEl = document.getElementById('modalEliminar')
    bootstrap.Modal.getInstance(myModalEl).hide()

    llenarTabla()

}

