const modeloComments = require('../models/modelo-comments');

const create = async (req, res) => {
    console.log(req.body);

    let info = req.body;
    const post = new modeloComments(info);
    post.save()
        .then((result) => {
            return res.status(200).json({
                message: "comentario creado",
                status: "success",
                result
            });
        })
        .catch((err) => {
            return res.status(400).json({
                message: "error creando comentario",
                status: "error",
                err
            });
        });
}

const getAll = async (req, res) => {
    modeloComments.find()
        .then((result) => {
            if (!result) {
                return res.status(202).json({
                    message: "no hay registros en la base de datos",
                    status: "ok",
                });
            }

            return res.status(200).json(result);
        })
        .catch((err) => {
            return res.status(400).json({
                message: "error al mostrar los registros",
                status: "error",
                err
            });
        });
}

const findByDate = async (req, res) => {
    try {
        const postId = req.body.postId;
        const comments = await modeloComments.find({postId});

        if (!comments) {
            res.status(201).json([])
        } else {
                res.status(200).json(comments);
        }
    } catch (error) {
        res.status(500).json({message: "error del server"});
    }
}

const editComment = async (req, res) => {
    let id = req.body.id;
    let consulta = {
        _id: id
    }

    console.log(consulta);
    console.log(id);
    modeloComments.findOneAndUpdate(consulta, req.body, { new: true })
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

const deleteComment = async (req, res) => {
    let borrar = req.body.id;
    let consulta = {
        _id: borrar
    }
    console.log(consulta);
    console.log(borrar);
    modeloComments.findOneAndDelete(consulta)
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
    editComment,
    deleteComment,
    findByDate
}
