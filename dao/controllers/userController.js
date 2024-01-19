const bcrypt = require('bcrypt');
const Usuario = require('../models/user'); // Asegúrate de ajustar la ruta según la ubicación de tu modelo Usuario

const crearUsuario = async (req, res) => {
    const { user, email, password } = req.body;

    console.log(req.body);

    // Encriptar la contraseña antes de almacenarla
    const saltRounds = 10; // Número de rondas de sal para la encriptación
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const usuario = new Usuario({
        user: user,
        email: email,
        password: hashedPassword // Almacenar la contraseña encriptada en la base de datos
    });

    // Ahora puedes guardar el usuario en la base de datos
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
