const modeloPost = require('../models/modelo-posts');

const uploadImage = async (req, res) => {
    try {
        const postId = req.body.postId;
        const post = await modeloPost.findOne({ date: postId });

        if (!post) {
            return res.status(404).json({message: "post no encontrado"})
        }

        post.imageUrl = "http://localhost:3000/" + req.file.filename;
        await post.save();

        return res.status(200).json({ message: "imagen cargada" });
    } catch (error) {
        return res.status(500).json({message: "error del server"});
    }
}

module.exports = { uploadImage };
