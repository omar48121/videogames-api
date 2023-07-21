const bcrypt = require("bcrypt");
const modeloUser = require('../models/modelo-users');

const getAll = async (req, res) => {
    modeloUser.find()
        .then((result) => {
            if (!result) {
                return res.status(202).json({
                    message: "no hay registros en la base de datos",
                    status: "ok",
                });
            }

            return res.status(200).json({
                result
            });
        })
        .catch((err) => {
            return res.status(400).json({
                message: "error al mostrar los registros",
                status: "error",
                err
            });
        });
}

const create = async (req, res) => {
    const { email, name, lastName, password, birthDate } = req.body;

    try {
        const existingUser = await modeloUser.findOne({ email });
        if (existingUser) {
            console.log('el usuario ya existe');
            return res.status(409).json({
                message: 'El usuario ya existe'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new modeloUser({
            name,
            lastName,
            birthDate: new Date(birthDate),
            email,
            password: hashedPassword,
        });

        await newUser.save();
        console.log('usuario creado');
        res.status(201).json({
            message: 'usuario creado',
            newUser
        });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await modeloUser.findOne({ email });
        if (!user) {
            console.log('El usuario no existe');
            return res.status(404).json({
                message: 'el usuario no existe'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            console.log('logueado correctamente')
            res.json({ message: 'login success' })
        } else {
            console.log('password Incorrect');
            res.json({ message: 'password incorrect' });
        }
    } catch (error) {
        console.error('Error al autenticar el usuario:', error.message);
        res.sendStatus(500).json({ message: 'Error al autenticar el usuario' });
    }
};

module.exports = { getAll, create, authenticateUser };