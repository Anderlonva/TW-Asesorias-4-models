const { Router } = require('express');
const Cliente = require('../models/Cliente')
const { validarCliente } = require('../helpers/validacion-cliente')

const router = Router();

router.post('/', async function (req, res) {

    try {

        const validar = validarCliente(req);

        if (validar.length > 0) {
            return res.status(400).send(validar);
        }

        const existeUsuario = await Cliente.findOne({ email: req.body.email })

        if (existeUsuario) {
            return res.status(400).send('Email ya existe');
        }

        let usuario = new Cliente();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();


        usuario = await usuario.save(); // lo guarda en la base de datos

        res.send(usuario); // para mostrarlo como respuesta 

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }

});

router.get('/', async function (req, res) {
    try {

        const usuarios = await Cliente.find();
        res.send(usuarios);

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:clienteId', async function (req, res) {
    try {

        let usuario = await Cliente.findById(req.params.clienteId); // se obtiene el usuario por medio del id

        if (!usuario) {
            return res.status(400).send('El Ususario no existe');
        }

        let usuarioEmail = await Cliente.findOne({ email: req.body.email, _id: { $ne: usuario._id } });
        //$ne = no equals no igual 
        // busca en la tabla si exite el email y verifica que otro id diferente al que estoy buscando tenga este email, ya que si modifico el email y ya existe no me lo va a dejar actualizar
        if (usuarioEmail) {
            return res.status(400).send('El Email ya existe');
        }

        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date();


        usuario = await usuario.save(); // lo guarda en la base de datos

        res.send(usuario); // para mostrarlo como respuesta 

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }
});

router.get('/:clienteId', async function (req, res) {
    try {
        const usuario = await Cliente.findById(req.params.clienteId)
        if (!usuario) {
            return res.status(404).send('cliente no existe')
        }
        res.send(usuario)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router