const modeloUser = require('../models/modelo-users');
const modeloPosts = require('../models/modelo-posts');
const { post } = require('../routes/router-posts');

// const increaseCounter = async (req, res) => {
//     try {
//         const userEmail = req.body.userEmail;
//         const postId = req.body.postId;

//         console.log('llamada a increase');
//         console.log(userEmail);
//         console.log(postId);

//         if (!userEmail || !postId) {
//             return res.status(400).json({ error: 'Debes proporcionar el email y el postId' });
//         }

//         modeloUser.findOne({ email: userEmail })
//             .then(user => {
//                 if (user) {
//                     if (!user.likedPosts.includes(postId)) {
//                         user.likedPosts.push(postId);
//                     }
//                     console.log("guardado");
//                     return user.save();
//                 } else {
//                     console.log('Usuario no existe')
//                 }
//             })
//             .then(savedUser => {
//                 modeloPosts.findOne({date: postId})
//                     .then(post => {
//                         if (post) {
//                             const likesCount = post.likes;
//                             post.likes++;
//                             post.save();
//                         }
//                     })
//                 res.status(200).json({ message: 'Like guardado correctamente', savedUser });
//             })
//             .catch(error => {
//                 console.error(error);
//                 res.status(500).json({ error: 'Error en el servidor' });
//             });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error en el servidor' });
//     }
// }

const increaseCounter = async (req, res) => {
    try {
        const userEmail = req.body.userEmail;
        const postId = req.body.postId;

        console.log('llamada a increase');
        console.log(userEmail);
        console.log(postId);

        if (!userEmail || !postId) {
            return res.status(400).json({ error: 'Debes proporcionar el email y el postId' });
        }

        // Encuentra el usuario y verifica si ya ha dado like al post
        modeloUser.findOne({ email: userEmail, likedPosts: postId })
            .then(user => {
                if (user) {
                    console.log('El usuario ya ha dado like a este post.');
                    return res.status(200).json({ message: 'El usuario ya ha dado like a este post.' });
                } else {
                    // Agrega el postId al array likedPosts del usuario
                    return modeloUser.findOneAndUpdate(
                        { email: userEmail },
                        { $push: { likedPosts: postId } },
                        { new: true } // Devuelve el documento actualizado
                    );
                }
            })
            .then(updatedUser => {
                if (!updatedUser) {
                    console.log('Usuario no encontrado');
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }

                // Incrementa el contador de likes del post
                return modeloPosts.findOneAndUpdate(
                    { date: postId },
                    { $inc: { likes: 1 } },
                    { new: true } // Devuelve el documento actualizado
                );
            })
            .then(updatedPost => {
                if (!updatedPost) {
                    console.log('Post no encontrado');
                    return res.status(404).json({ error: 'Post no encontrado' });
                }

                console.log('Like guardado correctamente');
                return res.status(200).json({ message: 'Like guardado correctamente' });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error en el servidor' });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const decreaseCounter = async (req, res) => {
    try {
        const userEmail = req.body.userEmail;
        const postId = req.body.postId;

        console.log('llamada a decrease');
        console.log(userEmail);
        console.log(postId);

        if (!userEmail || !postId) {
            return res.status(400).json({ error: 'Debes proporcionar el email y el postId' });
        }

        // Encuentra el usuario y verifica si ha dado like al post
        modeloUser.findOne({ email: userEmail, likedPosts: postId })
            .then(user => {
                if (!user) {
                    console.log('El usuario no ha dado like a este post.');
                    return res.status(200).json({ message: 'El usuario no ha dado like a este post.' });
                } else {
                    // Remueve el postId del array likedPosts del usuario
                    return modeloUser.findOneAndUpdate(
                        { email: userEmail },
                        { $pull: { likedPosts: postId } },
                        { new: true } // Devuelve el documento actualizado
                    );
                }
            })
            .then(updatedUser => {
                if (!updatedUser) {
                    console.log('Usuario no encontrado');
                    return res.status(404).json({ error: 'Usuario no encontrado' });
                }

                // Decrementa el contador de likes del post
                return modeloPosts.findOneAndUpdate(
                    { date: postId },
                    { $inc: { likes: -1 } },
                    { new: true } // Devuelve el documento actualizado
                );
            })
            .then(updatedPost => {
                if (!updatedPost) {
                    console.log('Post no encontrado');
                    return res.status(404).json({ error: 'Post no encontrado' });
                }

                console.log('Like quitado correctamente');
                return res.status(200).json({ message: 'Like quitado correctamente' });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error en el servidor' });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};



// const decreaseCounter = async (req, res) => {
//     try {
//         const userEmail = req.body.userEmail;
//         const postId = req.body.postId;

//         console.log('llamada a decrease');
//         console.log(userEmail);
//         console.log(postId);

//         if (!userEmail || !postId) {
//             return res.status(400).json({ error: 'Debes proporcionar el email y el postId' });
//         }

//         const user = await modeloUser.findOne({ email: userEmail });
//         if (user) {
//             const index = user.likedPosts.indexOf(postId);
//             if (index !== -1) {
//                 user.likedPosts.splice(index, 1);
//                 console.log("like quitado");
//                 const savedUser = await user.save();
//                 return res.status(200).json({ message: 'Like quitado correctamente', savedUser });
//             } else {
//                 console.log('Post no estaba en likedPosts');
//                 return res.status(400).json({ error: 'El post no estaba en la lista de likedPosts del usuario' });
//             }
//         } else {
//             console.log('Usuario no existe');
//             return res.status(404).json({ error: 'Usuario no encontrado' });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Error en el servidor' });
//     }
// }


module.exports = { increaseCounter, decreaseCounter }