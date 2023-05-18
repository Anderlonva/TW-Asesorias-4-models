const { Router } = require('express');
const Universidad = require('../models/Universidad')
const { validarUniversidad } = require('../helpers/validacion-universidad')

const router = Router();

router.post('/', async function (req, res) {

    try {

        const validar = validarUniversidad(req);

        if (validar.length > 0) {
            return res.status(400).send(validar);
        }
        
        let universidad = new Universidad();
        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaCreacion = new Date();
        universidad.fechaActualizacion = new Date();


        universidad = await universidad.save(); // lo guarda en la base de datos

        res.send(universidad); // para mostrarlo como respuesta 

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }

});

router.get('/', async function (req, res) {
    try {

        const universidades = await Universidad.find();
        res.send(universidades);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:universidadId', async function (req, res) {
    try {

        let universidad = await Universidad.findById(req.params.universidadId); // se obtiene el usuario por medio del id

        if (!universidad) {
            return res.status(400).send('universidad no existe');
        }

        universidad.nombre = req.body.nombre;
        universidad.direccion = req.body.direccion;
        universidad.telefono = req.body.telefono;
        universidad.fechaActualizacion = new Date();


        universidad = await universidad.save(); // lo guarda en la base de datos

        res.send(universidad); // para mostrarlo como respuesta 

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }
});

router.get('/:universidadId', async function (req, res) {
    try {
        const universidad = await Universidad.findById(req.params.universidadId)
        if (!universidad) {
            return res.status(404).send('universidad no existe')
        }
        res.send(universidad)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router