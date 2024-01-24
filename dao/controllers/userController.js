const bcrypt = require('bcrypt');
const Usuario = require('../models/user'); 

const crearUsuario = async (req, res) => {
    const { user, email, password } = req.body;

    console.log(req.body);

    
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const usuario = new Usuario({
        user: user,
        email: email,
        password: hashedPassword 
    });

    
    try {
        const usuarioGuardado = await usuario.save();
        console.log('Usuario guardado:', usuarioGuardado);
        res.send('Usuario creado correctamente');
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        res.status(500).send('Error interno al intentar crear el usuario');
    }
};

const login = async (req, res) => {
    const { user, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ user });

        if (!usuario) {
            return res.json({ authenticated: false });
        }

        const passwordMatch = await bcrypt.compare(password, usuario.password);

        if (passwordMatch) {
            return res.json({ authenticated: true });
        } else {
            return res.json({ authenticated: false });
        }
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).json({ authenticated: false });
    }
};

module.exports = {
    crearUsuario ,  login
};
