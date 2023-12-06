import {createServer} from "http";
import express from "express";
import cors from "cors";
import session from "express-session";
import bcrypt from "bcrypt";

const PORT = 5000;
const app = express();


const server = createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});