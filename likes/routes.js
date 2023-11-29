import * as dao from "./dao.js";

function LikesRoutes(app) {
    const findAllLikes = async (req, res) => {};

    const createUserLikesMovie = async (req, res) => {

        const userId = req.params.userId;
        const movieId = req.params.movieId;
        const likes = await dao.createUserLikesMovie(userId, movieId);
        res.json(likes);
    };

    const deleteUserLikesMovie = async (req, res) => {};
    const findUsersThatLikeMovie = async (req, res) => {
        const movieId = req.params.movieId;
        const likes = await dao.findUsersThatLikeMovie(movieId);
        res.json(likes);
    };

    const findMoviesThatUserLikes = async (req, res) => {
        const userId = req.params.userId;
        const likes = await dao.findMoviesThatUserLikes(userId);
        res.json(likes);
    };

    app.get("/api/likes", findAllLikes);
    app.post("/api/users/:userId/likes/:movieId", createUserLikesMovie);
    app.delete("/api/users/:userId/likes/:movieId", deleteUserLikesMovie);
    app.get("/api/likes/:movieId/users", findUsersThatLikeMovie);
    app.get("/api/users/:userId/likes", findMoviesThatUserLikes);
}

export default LikesRoutes;
