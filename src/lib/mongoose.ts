import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI!)


const userSchema = new mongoose.Schema({}, {strict: false})
export const Users = mongoose.models.users || mongoose.model('users', userSchema)

const quizSchema = new mongoose.Schema({}, {strict: false})
export const Quizs = mongoose.models.quizs || mongoose.model('quizs', quizSchema)

const careerSchema = new mongoose.Schema({}, {strict: false})
export const Careers = mongoose.models.careers || mongoose.model('careers', careerSchema)