import { createServer } from "http";
import express from "express";
import "./load.mjs"
import cors from "cors";
import session from "express-session";
import bcrypt from "bcrypt";
import { User, WorkOut, getClient } from "./model.mjs";
import { body, validationResult } from "express-validator";
import { serialize } from "cookie";
import MongoStore from "connect-mongo";

const PORT = 5000;
const app = express();
const SESSION_TIME = 60 * 60 * 24;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true,
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: SESSION_TIME * 1000,
        secure: false,
        sameSite: 'lax',
        httpOnly: true
    },
    saveUninitialized: true,
    resave: false,
    store: new MongoStore({
        client: getClient(),
        ttl: SESSION_TIME,
        autoRemove: 'native',
        collectionName: 'sessions'
    })
}))


app.use(function (req, res, next) {
    console.log(`HTTP request from \'${req.session?.user?.username}\'`, req.method, req.url, req.body);
    next();
});

function isAuthenticated(req, res, next) {
    if (!req.session.user) {
        return res.status(401).end("Access denied!");
    }
    next();
};

app.use(function (req, res, next) {
    setUserCookie(req, res);
    next();
});


function setUserCookie(req, res) {
    res.setHeader(
        "Set-Cookie",
        serialize("user", !req.session.user ? 'null' : JSON.stringify(req.session.user), {
            path: "/",
            maxAge: SESSION_TIME,
        }),
    );
}

// Authentication

app.post("/api/register/", body(['username', 'password']).notEmpty(), async function (req, res, next) {

    if (req.session.user) {
        return res.status(409).end("Already logged in!");
    }


    let user = await User.findOne({ username: req.body.username })

    if (user) {
        return res.status(409).end("Username already exists!");
    }

    const hash = bcrypt.hashSync(req.body.password, 10);
    user = await User.create({ username: req.body.username, password: hash })

    const project = req.session.user = { _id: user._id.toString(), username: user.username };
    setUserCookie(req, res);

    res.status(201).json(project);
});

app.post("/api/login/", body(['username', 'password']).notEmpty(), async function (req, res, next) {

    if (!validationResult(req).isEmpty()) {
        return res.status(400).json(validationResult(req).array()).end();
    }

    const user = await User.findOne({ username: req.body.username })
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(404).end("User not found!");
    }

    const project = req.session.user = { _id: user._id.toString(), username: user.username };
    setUserCookie(req, res);
    res.status(200).json(project);

});

app.delete("/api/login/", isAuthenticated, async function (req, res, next) {
    req.session.user = null;
    setUserCookie(req, res);
    res.status(200).json({}).end();
});


// Workouts

app.post("/api/workout/", isAuthenticated, async function (req, res, next) {

    const workout = await WorkOut.create({
        muscleGroup: req.body.muscle,
        weight: req.body.weight,
        repetitions: req.body.reps,
        sets: req.body.sets,
        name: req.body.name,
        userRef: req.session.user._id
    })

    return res.status(200).json(workout);
})


app.get("/api/workout/", isAuthenticated, async function (req, res) {
    const workout = await WorkOut.find({ userRef: req.session.user._id })
    return res.status(200).json(workout);
});


const server = createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});

