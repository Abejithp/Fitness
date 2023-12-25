import mongoose from "mongoose";


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
    }
});

let exerciseSchema = new mongoose.Schema({
    userRef:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    muscleGroup: String,
    name:String
})


let workoutSchema = new mongoose.Schema({
    userRef:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    muscleGroup: String,
    name: String,
    repetitions: Number,
    sets: Number,
    weight: Number,
})

export const User = mongoose.model('User', userSchema);
export const WorkOut = mongoose.model('Workout', workoutSchema);
export const Exercise = mongoose.model('Exercise', exerciseSchema);


export function getClient() {
    return mongoose.connection.getClient();
}