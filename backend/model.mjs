import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    await mongoose.connect(process.env.ATLAS_URI);
}

main().catch(err => console.log(err));

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    active: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout"
    }
});

let muscleSchema = new mongoose.Schema({
    group: String
})

let exerciseSchema = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    muscleGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Muscle"
    },

    name: String,

});



let workoutSchema = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    workoutName: String,

    workout: [{ day: String, exercise: [{ type: Schema.ObjectId, ref: 'Exercise' }] }]
})

let progressSchema = new mongoose.Schema({
    exerciseRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
    },

    date: String,

    sets: [{reps: Number, weight: Number}]

});

let weightSchema = new mongoose.Schema({
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    weight: Number,
    
    createdAt: Date

});

export const User = mongoose.model('User', userSchema);
export const WorkOut = mongoose.model('Workout', workoutSchema);
export const Exercise = mongoose.model('Exercise', exerciseSchema);
export const Progress = mongoose.model('Progress', progressSchema);
export const Muscle = mongoose.model('Muscle', muscleSchema);
export const Weight = mongoose.model('Weight', weightSchema);


export function getClient() {
    return mongoose.connection.getClient();
}