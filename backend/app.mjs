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

/* 
    Endpoints to handle user registration and login 
*/

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

    const project = req.session.user = { _id: user._id.toString(), username: user.username, active: null };
    console.log(req.session.user)
    setUserCookie(req, res);

    req.session.save((err) => {
        if (err) {
            console.log(err)
        } else {
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

    const project = req.session.user = { _id: user._id.toString(), username: user.username, active: user.active };
    setUserCookie(req, res);

    req.session.save((err) => {
        if (err) {
            console.log(err)
        } else {
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

/* 
    Endpoints to handle exercises. Exercises are 
    reperseneted by a name along with references
    to a muscle group and user.
*/

app.post("/api/exercise/", isAuthenticated, async function (req, res, next) {

    try {

        const data = await Exercise.create({
            userRef: req.session.user._id,
            name: req.body.name,
            muscleGroup: req.body.id,
            global: false
        });

        return res.status(200).json(data)

    } catch (err) {
        return res.sendStatus(500)
    }
});

app.delete("/api/exercise/:id/", isAuthenticated, async function (req, res) {

    try {
        const data = await Exercise.deleteOne({ userRef: req.session.user._id, _id: req.params.id })
        return res.status(200).json(data)

    } catch (err) {
        return res.status(500).json({ success: false, msg: err.message });
    }

})

/* 
    Endpoints to handle muscle groups. Muscles are
    represented by a group name. 
*/

app.get("/api/muscles/", isAuthenticated, async function (req, res) {
    const muscles = await Muscle.find({})

    

    return res.status(200).json({ data: muscles })
});

app.get("/api/muscles/:id/", isAuthenticated, async function (req, res) {

    try {
        const exercises = await Exercise.find({ userRef: req.session.user._id, muscleGroup: req.params.id }, { userRef: 0 }).populate('muscleGroup');
        return res.status(200).json({ data: exercises })
    } catch (err) {
        return res.sendStatus(500)
    }
});


/* 
    Endpoints to handle workout creation. Workouts are
    represented by a name and a list of exercises.
*/

app.post("/api/workout/", isAuthenticated, async function (req, res, next) {

    try {

        const workout = await WorkOut.create({
            userRef: req.session.user._id,
            workoutName: req.body.name,
            workout: req.body.workout
        });

        await User.updateOne({ _id: req.session.user._id }, { $set: { active: workout._id } })
        req.session.user.active = workout._id

        return res.status(200).json([]);
    } catch (err) {
        return res.sendStatus(500);
    }

})

app.get("/api/workout/", isAuthenticated, async function (req, res) {
    try {
        const workout = await WorkOut.find({ userRef: req.session.user._id }, { workoutName: 1 });
        res.status(200).json({ data: workout, success: true });
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message });
    }
})

app.delete("/api/workout/:id/", isAuthenticated, async function (req, res) {

    try {
        const data = await WorkOut.deleteOne({ userRef: req.session.user._id, _id: req.params.id })
        if (data.deletedCount > 0) {
            const schedule = await WorkOut.findOne({ userRef: req.session.user._id })

            const id = !schedule ? null : schedule._id;

            await User.updateOne({ _id: req.session.user._id }, { $set: { active: id } })
            req.session.user.active = id
        }

        return res.status(200).json(data)

    } catch (err) {
        return res.status(500).json({ success: false, msg: err.message });
    }

});

app.patch("/api/workout/", isAuthenticated, async function (req, res) {
    const workout = await WorkOut.findOne({ _id: req.body.id })
    if (!workout) {
        return res.sendStatus(404);
    }

    const user = await User.updateOne({ _id: req.session.user._id }, { active: req.body.id });
    console.log(user);

    req.session.user.active = req.body.id;

    return res.status(200).json({ success: true })
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

app.get("/api/schedule/", isAuthenticated, async function (req, res) {
    const user = req.session.user

    if (!user.active) {
        return res.status(200).json({ data: { workout: [], workoutName: '' }, success: true })
    }

    try {
        const schedule = await WorkOut.findOne({ userRef: user._id, _id: user.active }, { workoutName: 1, workout: 1 }).populate('workout.exercise');
        return res.status(200).json({ data: schedule, success: true })
    } catch (err) {
        return res.status(500).json({ success: false, msg: err.message });
    }

});

//Progression

app.get("/api/schedule/today/", isAuthenticated, async function (req, res) {

    try {
        const workout = await WorkOut.findOne({ _id: req.session.user.active }).populate('workout.exercise')

        if (!workout) {
            return res.status(200).json({ data: null })
        }

        const day = new Date().getDay();
        return res.status(200).json({ data: workout.workout[day] });

    } catch (err) {
        return res.sendStatus(500);
    }

});

const calulate = (sets) => {
    if(!sets) {
        return 0
    }

    let progress = 0;
    sets.forEach((set) => progress += set.reps * set.weight)

    return progress;
}

app.get("/api/progress/:id/", isAuthenticated, async function (req, res){
    try {
        const progressions = await Progress.find({exerciseRef: req.params.id}).limit(5);

        const data = progressions.map((progress) => {
            return calulate(progress.sets)
        });

        return res.status(200).json({data: data})

    } catch(err) {
        return res.sendStatus(500)
    }
});

app.post("/api/progress/", isAuthenticated, async function (req, res){

    try{
        const date = new Date().toLocaleDateString();

        let progress = await Progress.findOne({exerciseRef: req.body.id, date: date})

        if(progress) {
            return res.status(200).json({data: progress.sets})
        }

        progress = await Progress.create({
            exerciseRef: req.body.id,
            date: date,
            sets: [{reps: 0, weight: 0}]
        });

        return res.status(200).json({data: progress.sets});

    } catch (err) {
        return res.sendStatus(500);
    }
});

app.patch("/api/progress/", isAuthenticated, async function (req, res){
    try {
        const date = new Date().toLocaleDateString()
        
        const {id, sets} = req.body;
        const progress = await Progress.findOne({exerciseRef: id, date: date});

        const update = await Progress.updateOne({_id: progress._id}, {$set: {sets: sets}})

        return res.status(200).json({data:update});

    } catch (err) {
        return res.sendStatus(500);
    }
})


//Weight

app.post("/api/weight/", isAuthenticated, async function (req, res) {
    const weight = await Weight.create({
        userRef: req.session.user._id,
        weight: req.body.weight,
        createdAt: Date.now()
    })

    return res.status(200).json({ data: weight })
})

app.get("/api/weight/", isAuthenticated, async function (req, res) {
    const weight = await Weight.find({ userRef: req.session.user._id }).sort({ createdAt: 1 })
    return res.status(200).json({ data: weight })
})
const server = createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});

