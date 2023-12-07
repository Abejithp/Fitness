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

// let plan = new mongoose.Schema({
//     workoutRef: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Workout"
//     }],

//     userRef:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     }
// })

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
// export const Plan = mongoose.model('Plan', plan);
export const WorkOut = mongoose.model('Workout', workoutSchema);


export function getClient() {
    return mongoose.connection.getClient();
}