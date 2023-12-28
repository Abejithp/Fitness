import { createServer } from "http";
import express from "express";
import "./load.mjs"
import cors from "cors";
import session from "express-session";
import bcrypt from "bcrypt";
import { Exercise, User, WorkOut, getClient } from "./model.mjs";
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
    req.session.destroy
    setUserCookie(req, res);
    res.status(200).json({}).end();
});

//Exercise

app.post("/api/exercise/", isAuthenticated, async function (req, res, next) {
    const exercise = await Exercise.create({
        userRef: req.session.user._id,
        name: req.body.name,
        muscleGroup: req.body.muscleGroup
    });

    return res.status(200).json(exercise)
})

app.get("/api/exercise/", isAuthenticated, async function (req, res) {
    const exercise = await Exercise.find({ userRef: req.session.user._id })
    return res.status(200).json(exercise);
});

// Workouts

app.post("/api/workout/", isAuthenticated, async function (req, res, next) {

    const list = req.body.workout;
    const filter = []

    for (const day in list) {
        filter.push({ day: day, exercise: list[day] })
    }

    const workout = await WorkOut.create({
        userRef: req.session.user._id,
        workoutName: "A",
        workout: filter
    });

    console.log(workout)

    return res.status(200).json(workout);
})


app.get("/api/workout/", isAuthenticated, async function (req, res) {
    try {
        const workout = await WorkOut.findOne({ userRef: req.session.user._id }).populate('workout.exercise');
        res.status(200).json({ data: workout, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.message });
    }
});


const server = createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});

