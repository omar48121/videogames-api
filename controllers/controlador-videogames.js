const modeloVideogames = require('../models/modelo-videogames');



const create = async (req, res) => {
    console.log(req.body);

    let info = req.body;
    const post = new modeloVideogames(info);
    post.save()
        .then((result) => {
            return res.status(200).json({
                message: "post creado",
                status: "success",
                result
            });
        })
        .catch((err) => {
            return res.status(400).json({
                message: "error creando post",
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



const remove = async (req, res) => {
    let consulta = {};
    consulta[req.params.key] = req.params.value;

    try {
        let doc = await modeloVideogames.findOneAndDelete(consulta);
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
    remove
}


