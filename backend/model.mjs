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

export const User = mongoose.model('User', userSchema);

export function getClient() {
    return mongoose.connection.getClient();
}