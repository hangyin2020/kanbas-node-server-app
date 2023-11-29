import model from "./model.js";

export const findAllUsers = () => model.find();
export const findUserById = (id) => model.findOne({ _id: id});
export const findUserByUsername = (username) => model.find({username: username});
export const findUserByCredentials = (username, password) =>
    model.findOne({ username, password });
export const updateUser = (id, user) => model.updateOne({ _id: id}, {$set: user});
export const createUser = (user) => model.create(user);
export const deleteUser = (id) => model.deleteOne({ _id: id});
