const modeloVideogames = require('../models/modelo-videogames');

const create = async (req, res) => {
    console.log(req.body);

    let info = req.body;
    const juego = new modeloVideogames(info);
    juego.save()
        .then((result) => {
            return res.status(200).json({
                message: "juego creado",
                status: "success",
                result
            });
        })
        .catch((err) => {
            return res.status(400).json({
                message: "error creando juego",
                status: "error",
                err
            });
        });
}

const getAll = async (req, res) => {
    modeloVideogames.find()
        .then((result) => {
            if (!result) {
                return res.status(202).json({
                    message: "no hay registros en la base de datos",
                    status: "ok",
                });
            }

            return res.status(200).json(result.reverse());
        })
        .catch((err) => {
            return res.status(400).json({
                message: "error al mostrar los registros",
                status: "error",
                err
            });
        });
}

const edit = async (req, res) => {
    let id = req.body.id;
    let consulta = {
        _id: id
    }

    console.log(consulta);
    console.log(id);
    modeloVideogames.findOneAndUpdate(consulta, req.body, { new: true })
        .then((result) => {
            return res.status(200).send({
                message: "juego actualizado",
                status: "ok",
                result
            })
        }).catch((e) => {
            return res.status(404).send({
                message: "No se pudo completar la actualizacion del juego",
                e
            })
        })
}

const remove = async (req, res) => {
    let borrar = req.body.id;
    let consulta = {
        _id: borrar
    }
    console.log(consulta);
    console.log(borrar);
    modeloVideogames.findOneAndDelete(consulta)
        .then((resultado) => {
            return res.status(200).send({
                mensaje: "Los datos se eliminaron correctamente",
                status: "ok",
                resultado
            })
        }).catch((e) => {
            return res.status(404).send({
                mensaje: "Los datos no se eliminaron",
                e
            })
        })
}

module.exports = {
    create,
    getAll,
    remove
}


