import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI!)


const userSchema = new mongoose.Schema({}, {strict: false})
export const Users = mongoose.models.users || mongoose.model('users', userSchema)