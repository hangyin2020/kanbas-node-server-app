// const express = require("express");
import "dotenv/config";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import UserRoutes from "./Users/routes.js";
import mongoose from "mongoose";
import LikesRoutes from "./likes/routes.js";

import cors from "cors";

mongoose.connect("mongodb://127.0.0.1:27017/kanbas-cs5610-fa23");
const app = express();
app.use(cors());
app.use(express.json());
LikesRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
CourseRoutes(app);
Lab5(app);
HelloRoutes(app);
app.listen(process.env.PORT || 4000);