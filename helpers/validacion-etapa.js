const validarEtapa = (req) => {

    const validacion = [];

    if (!req.body.nombre) {
        validacion.push('Nombre requerido')
    }

    return validacion;

}


module.exports = { validarEtapa };