
// Objeto a guardar
let usuario = {
    id: 0,
    nombre: 'Juan',
    apellido: 'Ejemplo'
};


function modificarUsuario(id, e) {
    const miModal = new bootstrap.Modal(document.getElementById("modalModificar"))
    miModal.show()
    document.getElementById('nombreModal').value = e.parentNode.parentNode.childNodes[1].innerText
    document.getElementById('apellidoModal').value = e.parentNode.parentNode.childNodes[3].innerText

    
  
    // Convertir a cadena JSON y guardar en localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));
    
    // Obtener la cadena JSON y convertir de nuevo a objeto JavaScript
    var usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    console.log(usuarioGuardado); // Imprimirá el objeto JavaScript

}

function eliminarUsuario() {
    const miModal = new bootstrap.Modal(document.getElementById("modalEliminar"))
    miModal.show()
}



