const modeloResena = require('../models/modelo-resenas');
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

const findById = async (req, res) => {
    try {
        const gameId = req.body.gameId;
        const game = await modeloVideogames.findOne({date: gameId});

        if (!game) {
            res.status(404).json({message: "juego no encontrado"})
        } else {
            res.status(200).json(game);
        }
    } catch (error) {
        res.status(500).json({message: "error del server"});
    }
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

const rateGame = async (req, res) => {
    const userEmail = req.body.userEmail;
    const gameDate = req.body.gameDate;
    const newRating = parseInt(req.body.rating);

    try {
        const existingReview = await modeloResena.findOne({ userEmail, gameDate });

        if (existingReview) {
            return res.status(400).json({ message: 'El usuario ya ha emitido una reseña para este juego' });
        }

        const game = await modeloVideogames.findOne({ date: gameDate });
        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }

        const newTotalRatings = game.totalRatings + 1;
        const newTotalScore = game.score * game.totalRatings + newRating;
        const newAverageScore = Math.ceil(newTotalScore / newTotalRatings);

        game.score = newAverageScore;
        game.totalRatings = newTotalRatings;

        const newReview = new modeloResena({
            userEmail,
            gameDate,
            rating: newRating
        });

        await newReview.save();
        await game.save();

        console.log("nuevo rate: " + newAverageScore);

        return res.status(200).json({ message: 'Calificación enviada con éxito' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al enviar la calificación' });
    }
};

module.exports = {
    create,
    getAll,
    remove,
    findById,
    rateGame
}