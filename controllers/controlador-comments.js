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

const editcomments = async (req,res)=>{

 let id = req.body
 let consulta ={
    _id:id
 }
 
 console.log(consulta);
 console.log(id);
 modeloComments.findOneAndUpdate(consulta,id,{new:true})
 .then((result)=>{
    return res.status(200).send({
        message:"Comentario actualizado",
        status:"ok",
        result
    })
 }).catch((e)=>{
    return res.status(404).send({
        message:"No se pudo completar la actualizacion de comentario",
        e
    })
 })
}

const deletecomment = async(req,res)=>{
    let consulta ={}
    let borrar=req.body
    console.log(consulta);
    console.log(borrar);
    modeloComments.findOneAndDelete(consulta,borrar,{new:true})
    .then((resultado)=>{
        return res.status(200).send({
            mensaje:"Los datos se eliminaron correctamente",
            status:"ok",
            resultado
        })
        }).catch((e)=>{
            return res.status(404).send({
                mensaje:"Los datos no se eliminaron",
                e
            })
    })
}
/*
const edit = async (req, res) => {
    let consulta = {};
    consulta[req.params.key] = req.params.value;

    let update = req.body;
    let opts = { new: true };

    try {
        let doc = await modeloComments.findOneAndUpdate(consulta, update, opts);
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
        let doc = await modeloComments.findOneAndDelete(consulta);
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
*/

module.exports = {
    create,
    getAll,
    editcomments,
    deletecomment
}
