import * as dao from "./dao.js";

let currentUser = null;

function UserRoutes(app) {
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        const id = req.params.id;
        const user = await dao.findUserById(id);
        res.json(user);
    };
    const findUserByUsername = async (req, res) => {
        const username = req.params.username;
        const users = await dao.findUserByUsername(username);
        res.json(users);
    }

    const createUser = async (req, res) => {
        const { username, password, email, role } = req.params;
        const user = await dao.createUser({
            username,
            password,
            email,
            role
        });
        res.json(user);
    };

    const updateFirstName = async (req, res) => {
        const id = req.params.id;
        const newFirstName = req.params.newFirstName;
        const status = await dao.updateUser(id, { firstName: newFirstName});
        res.json(status);
    };

    const deleteUser = async (req, res) => {
        const id = req.params.id;
        const status = await dao.deleteUser(id);
        res.json(status);
    }

    const updateUser = async (req, res) => {
        const id = req.params.id;
        const newUser = req.body;
        const status = await dao.updateUser(id, newUser);
        currentUser = await dao.findUserById(id);
        res.json(status);
    }

    const signin = async (req, res) => {
        const { username, password } = req.body;
        const user = await dao.findUserByCredentials(username, password);
        if (user) {
            currentUser = user;
            res.json(user);
        } else {
            res.sendStatus(403);
        }
    };

    const signout = (req, res) => {
        currentUser = null;
        res.json(200);
    };

    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
          res.status(400).json({ message: "Username already taken" });
        }
        currentUser = await dao.createUser(req.body);
        res.json(currentUser);
    };

    const account = async (req, res) => {
        if (!currentUser) {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }
        res.json(currentUser);
      };

    app.delete("/api/users/:id", deleteUser);
    app.get("/api/users/updateFirstName/:id/:newFirstName", updateFirstName);
    app.get("/api/users/:username/:password/:email/:role", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:id", findUserById);
    app.get("/api/users/username/:username", findUserByUsername);
    app.put("/api/users/:id", updateUser);
    app.post("/api/users/signin", signin);
    app.post("/api/users/account", account);
    app.post("/api/users/signout", signout);
    app.post("/api/users/signup", signup);

}

export default UserRoutes;