const modeloPost = require('../models/modelo-posts');

const uploadImage = async (req, res) => {
    try {
        const postId = req.body.postId;
        const post = await modeloPost.findOne({ content: postId });

        console.log(postId);

        if (!post) {
            console.log("post no encontrado");
            return res.status(404).json({message: "post no encontrado"})
        }

        post.imageUrl = "http://192.168.1.72:3000/" + req.file.filename;
        await post.save();
        console.log("post guardado");

        return res.status(200).json({ message: "imagen cargada" });
    } catch (error) {
        return res.status(500).json({message: "error del server"});
    }
}

module.exports = { uploadImage };
