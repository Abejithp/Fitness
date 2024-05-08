import { createServer } from "http";
import express from "express";
import cors from "cors";
import session from "express-session";
import bcrypt from "bcrypt";
import { Exercise, Muscle, Progress, User, Weight, WorkOut, getClient } from "./model.mjs";
import { body, validationResult } from "express-validator";
import { serialize } from "cookie";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
const SESSION_TIME = 60 * 60 * 24;

app.enable('trust proxy')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true,
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    proxy: true,
    cookie: {
        maxAge: SESSION_TIME * 1000,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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
    user = await User.create({ username: req.body.username, password: hash, active: null })

    const project = req.session.user = { _id: user._id.toString(), username: user.username, active: null};
    console.log(req.session.user)
    setUserCookie(req, res);

    req.session.save((err) => {
        if(err){
            console.log(err)
        }else{
            res.status(201).json(project);
        }
    })
});

app.post("/api/login/", body(['username', 'password']).notEmpty(), async function (req, res, next) {

    if (!validationResult(req).isEmpty()) {
        return res.status(400).json(validationResult(req).array()).end();
    }

    const user = await User.findOne({ username: req.body.username })
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(404).end("User not found!");
    }

    const project = req.session.user = { _id: user._id.toString(), username: user.username, active: user.active};
    setUserCookie(req, res);
    
    req.session.save((err) => {
        if(err){
            console.log(err)
        }else{
            res.status(201).json(project);
        }
    })

});

app.delete("/api/login/", isAuthenticated, async function (req, res, next) {
    req.session.user = null;
    req.session.destroy
    setUserCookie(req, res);
    res.status(200).json({}).end();
});

//Exercise


app.post("/api/exercise/", isAuthenticated, async function (req, res, next) {

    const existing = await Muscle.findOne({ group: req.body.muscleGroup })
    let muscle = null;

    if (!existing) {
        muscle = await Muscle.create({
            group: req.body.muscleGroup
        });
    } else {
        muscle = existing
    }

    const exercise = await Exercise.create({
        userRef: req.session.user._id,
        name: req.body.name,
        muscleGroup: muscle._id,
        repetitions: 0,
        sets: 0,
        weight: 0
    });

    return res.status(200).json(exercise)
})

app.get("/api/exercise/", isAuthenticated, async function (req, res) {
    const exercise = await Exercise.find({ userRef: req.session.user._id })
    return res.status(200).json(exercise);
});

app.get("/api/muscles/", isAuthenticated, async function (req, res) {
    const muscles = await Muscle.find({})
    const data = muscles.slice(0, 5);
    const rest = muscles.slice(6, muscles.length);
    return res.status(200).json({ data: data, rest: rest})
});

app.get("/api/muscles/:id/", isAuthenticated, async function (req, res) {

    try {
        const muscles = await Exercise.find({ userRef: req.session.user._id, muscleGroup: req.params.id }).populate('muscleGroup')
        return res.status(200).json({ data: muscles })
    } catch (err) {
        return res.status(200).json({ data: [] })
    }

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
        workoutName: req.body.name,
        workout: filter
    });

    await User.updateOne({ _id: req.session.user._id }, { $set: { active: workout._id } })

    return res.status(200).json(workout);
})

app.get("/api/workout/", isAuthenticated, async function (req, res) {
    try {
        const workout = await WorkOut.find({ userRef: req.session.user._id }, { workoutName: 1 });
        res.status(200).json({ data: workout, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.message });
    }
})

app.patch("/api/workout/", isAuthenticated, async function(req, res){
    const workout = await WorkOut.findOne({_id:req.body.id})
    if(!workout){
        return res.sendStatus(404);
    }

    const user = await User.updateOne({_id:req.session.user._id}, {active: req.body.id });
    console.log(user);

    req.session.user.active = req.body.id;

    return res.status(200).json({success: true})
});

app.get("/api/workout/:id/", isAuthenticated, async function (req, res) {
    try {
        const workout = await WorkOut.findOne({ _id: req.params.id }).populate('workout.exercise');
        res.status(200).json({ data: workout, success: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: err.message });
    }
});

app.get("/api/schedule/", isAuthenticated, async function(req, res){
    const user = req.session.user
    
    if(!user.active){
       return res.status(200).json({data: [], success:true})
    }

    try {
        const schedule = await WorkOut.findOne({userRef: user._id, _id: user.active}, {workoutName: 1, workout: 1}).populate('workout.exercise');
        return res.status(200).json({data: schedule, success: true})
    } catch(err){
        return res.status(500).json({ success: false, msg: err.message });
    }
   
});

//Progression

app.get("/api/active/", isAuthenticated, async function (req, res) {
    const user = await User.findOne({ _id: req.session.user._id })
    const workout = await WorkOut.findOne({ _id: user.active }).populate('workout.exercise')
    if (!workout) {
        return res.status(200).json({ data: null })
    }

    const day = new Date().getDay();
    return res.status(200).json({ data: workout.workout[day] })

});


app.get("/api/active/:name/", isAuthenticated, async function (req, res){
    const progress = await Progress.find({userRef: req.session.user._id})
    const data = []

    Array.from(progress).forEach((item) => {
        item.workout.forEach((exercise) =>{
            if(exercise.name == req.params.name){
                data.push(exercise.repetitions * exercise.sets * exercise.weight)
            }
        })
    })

    return res.status(200).json({data: data})
})

app.patch("/api/active/", isAuthenticated, async function (req, res) {
    const date = new Date();
    const progress = await Progress.findOne({ date: today })

    if (!progress) {

        const user = await User.findOne({ _id: req.session.user._id });
        const data = await WorkOut.findOne({ _id: user.active }).populate('workout.exercise')

        const workout = data.workout[date.getDay()]
        const filter = []

        workout.exercise.forEach((exercise) => {
            console.log(exercise)
            if (req.body.name == exercise.name) {
                filter.push({
                    name: exercise.name,
                    repetitions: req.body.reps,
                    sets: req.body.sets,
                    weight: req.body.weight
                })
            } else {
                filter.push({
                    name: exercise.name,
                    repetitions: 0,
                    sets: 0,
                    weight: 0
                })
            }

        })

        const progress = await Progress.create({
            userRef: req.session.user._id,
            date: today,
            workout: filter
        })

        return res.status(200).json({ data: progress })
    }

    const index = progress.workout.findIndex((exercise) => exercise.name == req.body.name)
    progress.workout[index] = { name: req.body.name, repetitions: req.body.reps, sets: req.body.sets, weight: req.body.weight}

    await Progress.updateOne({ date: today }, { $set: { workout: progress.workout } })

    return res.status(200).json({ data: progress })
})

//Weight

app.post("/api/weight/", isAuthenticated, async function(req,res){
    const weight = await Weight.create({
        userRef: req.session.user._id,
        weight: req.body.weight,
        createdAt: Date.now()
    })

    return res.status(200).json({data: weight})
})

app.get("/api/weight/", isAuthenticated, async function(req, res){
    const weight = await Weight.find({userRef: req.session.user._id}).sort({createdAt: 1})
    return res.status(200).json({data: weight})
})
const server = createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});

