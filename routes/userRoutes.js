const express = require ('express');
const router = express.Router();

//!esto es lo que voy a agregar ahora 
const userController = require('../dao/controllers/userController');



const Usuario = require('../dao/models/user');



//Voy a hacer un crud.
router.get('/', async (req,res)=>{
    const usuarios = await Usuario.find();
    res.json({
        usuarios: usuarios
    })
});



//esta es la ruta que voy a agregar 
router.post('/crear', userController.crearUsuario);





router.post('/login', userController.login);


router.delete('/:id', async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);

        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.json({ mensaje: 'Usuario actualizado correctamente', usuario: usuarioActualizado });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});


module.exports = router;

