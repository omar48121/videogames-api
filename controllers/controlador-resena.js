const modeloresena = require('../models/modelo-resenas');

const create = async (req, res) => {
    console.log(req.body);

    let info = req.body;
    const post = new modeloresena(info);
    post.save()
        .then((result) => {
            return res.status(200).json({
                message: "reseña creada",
                status: "success",
                result
            });
        })
        .catch((err) => {
            return res.status(400).json({
                message: "error creando reseña",
                status: "error",
                err
            });
        });
}

const getAll = async (req, res) => {
    const { date } = req.query;

    let query = modeloresena.find();

    if (date) {
        query = query.where({ gameDate: date });
    }

    query
        .then((result) => {
            if (!result || result.length === 0) {
                return res.status(202).json([]);
            }

            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(400).json({
                message: "Error al mostrar los registros",
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
    modeloresena.findOneAndUpdate(consulta, req.body, { new: true })
        .then((result) => {
            return res.status(200).send({
                message: "reseña actualizada",
                status: "ok",
                result
            })
        }).catch((e) => {
            return res.status(404).send({
                message: "No se pudo completar la actualizacion de reseña",
                e
            })
        })
}

const deleteresena = async (req, res) => {
    let borrar = req.body.id;
    let consulta = {
        _id: borrar
    }
    console.log(consulta);
    console.log(borrar);
    modeloresena.findOneAndDelete(consulta)
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
    edit,
    deleteresena
}
