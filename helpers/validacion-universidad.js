const validarUniversidad = (req) => {

    const validacion = [];

    if (!req.body.nombre) {
        validacion.push('Nombre requerido')
    }

    if (!req.body.direccion) {
        validacion.push('Direccion requerido')
    }

    if (!req.body.telefono) {
        validacion.push('Telefono requerido')
    }

    return validacion;

}


module.exports = { validarUniversidad };