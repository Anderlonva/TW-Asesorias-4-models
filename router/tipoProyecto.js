const { Router } = require('express');
const TipoProyecto = require('../models/TipoProyecto')
const { validarTipoProyecto } = require('../helpers/validacion-tipoProyecto')

const router = Router();

router.post('/', async function (req, res) {

    try {

        const validar = validarTipoProyecto(req);

        if (validar.length > 0) {
            return res.status(400).send(validar);
        }
        
        let tipoProyecto = new TipoProyecto();
        tipoProyecto.nombre = req.body.nombre;
        tipoProyecto.fechaCreacion = new Date();
        tipoProyecto.fechaActualizacion = new Date();


        tipoProyecto = await tipoProyecto.save(); // lo guarda en la base de datos

        res.send(tipoProyecto); // para mostrarlo como respuesta 

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }

});

router.get('/', async function (req, res) {
    try {

        const tipoProyectos = await TipoProyecto.find();
        res.send(tipoProyectos);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:tipoProyectoId', async function (req, res) {
    try {

        let tipoProyecto = await TipoProyecto.findById(req.params.tipoProyectoId); // se obtiene el usuario por medio del id

        if (!tipoProyecto) {
            return res.status(400).send('tipoProyecto no existe');
        }

        tipoProyecto.nombre = req.body.nombre;
        tipoProyecto.fechaActualizacion = new Date();


        tipoProyecto = await tipoProyecto.save(); // lo guarda en la base de datos

        res.send(tipoProyecto); // para mostrarlo como respuesta 

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }
});

router.get('/:tipoProyectoId', async function (req, res) {
    try {
        const tipoProyecto = await TipoProyecto.findById(req.params.tipoProyectoId)
        if (!tipoProyecto) {
            return res.status(404).send('tipoProyecto no existe')
        }
        res.send(tipoProyecto)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router