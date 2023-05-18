const { Router } = require('express');
const Etapa = require('../models/Etapas')
const { validarEtapa } = require('../helpers/validacion-etapa')

const router = Router();

router.post('/', async function (req, res) {

    try {

        const validar = validarEtapa(req);

        if (validar.length > 0) {
            return res.status(400).send(validar);
        }
        
        let etapa = new Etapa();
        etapa.nombre = req.body.nombre;
        etapa.fechaCreacion = new Date();
        etapa.fechaActualizacion = new Date();


        etapa = await etapa.save(); // lo guarda en la base de datos

        res.send(etapa); // para mostrarlo como respuesta 

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }

});

router.get('/', async function (req, res) {
    try {

        const etapas = await Etapa.find();
        res.send(etapas);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:etapaId', async function (req, res) {
    try {

        let etapa = await Etapa.findById(req.params.etapaId); // se obtiene el usuario por medio del id

        if (!etapa) {
            return res.status(400).send('etapa no existe');
        }

        etapa.nombre = req.body.nombre;
        etapa.fechaActualizacion = new Date();


        etapa = await etapa.save(); // lo guarda en la base de datos

        res.send(etapa); // para mostrarlo como respuesta 

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }
});

router.get('/:etapaId', async function (req, res) {
    try {
        const etapa = await Etapa.findById(req.params.etapaId)
        if (!etapa) {
            return res.status(404).send('etapa no existe')
        }
        res.send(etapa)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router