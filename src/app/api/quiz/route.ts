import { Quizs, Users } from "@/lib/mongoose";
import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import crypto from 'crypto'
export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    try {
        const user = await Users.findById(session?.user.sub)
        if (!user.isAccountConfirmed) {
            return new Response("Account not confirmed", {
                status: 400
            })
        }
        const query = {
            education: user.currentlyPursuing,
            stream: user.stream
        }
        const quizs = await Quizs.findOne(query)
        return Response.json(quizs ? quizs : "NO_QUIZ")

    } catch (error) {
        return new Response('Something went wrong', {
            status: 500
        })
    }
}


export async function POST(request: Request) {
    try {
        const body = await request.json()
        //@ts-ignore
        body.questions.forEach(question => {
            question.id = crypto.randomBytes(16).toString('hex')
        })
        const result = await Quizs.create(body)
        return Response.json(result)
    } catch (error) {
        return new Response('Something went wrong', {
            status: 500
        })
    }
}