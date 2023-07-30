const modeloresena = require('../models/modelo-resenas');

const create = async (req, res) => {
    console.log(req.body);

    let info = req.body;
    const post = new modeloresena(info);
    post.save()
        .then((result) => {
            return res.status(200).json({
                message: "reseña creado",
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
    modeloresena.find()
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

const editresena = async (req, res) => {

    let id = req.body.id;
    let consulta = {
        _id: id
    }

    console.log(consulta);
    console.log(id);
    modeloresena.findOneAndUpdate(consulta, req.body, { new: true })
        .then((result) => {
            return res.status(200).send({
                message: "Comentario actualizado",
                status: "ok",
                result
            })
        }).catch((e) => {
            return res.status(404).send({
                message: "No se pudo completar la actualizacion de comentario",
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

const edit = async (req, res) => {
    let consulta = {};
    consulta[req.params.key] = req.params.value;

    let update = req.body;
    let opts = { new: true };

    try {
        let doc = await modeloresena.findOneAndUpdate(consulta, update, opts);
        doc.save();

        console.log(doc);

        res.status(200).json({
            mensaje: "actualizado de manera correcta",
            status: "ok",
            doc
        })
    } catch (error) {
        res.status(404).json({
            mensaje: "error al actualizar",
            error: error.message
        });
    }
}

const remove = async (req, res) => {
    let consulta = {};
    consulta[req.params.key] = req.params.value;

    try {
        let doc = await modeloresena.findOneAndDelete(consulta);
        doc.save();

        res.status(200).json({
            mensaje: "eliminado de manera correcta",
            status: "ok",
            doc
        })
    } catch (error) {
        res.status(404).json({
            mensaje: "error al eliminar",
            error: error.message
        });
    }
}


module.exports = {
    create,
    getAll,
    edit,
    deleteresena
}
