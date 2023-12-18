import { Quizs, Users } from "@/lib/mongoose"
import { authOptions } from "@/lib/next-auth"
import { getServerSession } from "next-auth"

export async function POST(request: Request) {
    try {
        const body = await request.json()

        /**
         * Fetching quiz from the quiz collection
         */

        const quiz = await Quizs.findById(body.quizId)
        const parsedQuiz = JSON.parse(JSON.stringify(quiz))
        const correctAnswers = []
        const wrongAnswers = []
        for (const answer of body.answers) {
            //@ts-ignore
            const questionObject = parsedQuiz.questions.find(question => question.id === answer.questionId)
            if (questionObject.answer === answer.answer) {
                correctAnswers.push(answer)
            } else {
                wrongAnswers.push(answer)
            }
        }
        const session = await getServerSession(authOptions)
        await Users.findByIdAndUpdate(session?.user.sub, {
            $push: {
                attendedQuizs: {
                    quizId: body.quizId,
                    correctAnswers,
                    wrongAnswers,
                    education:quiz.education,
                    stream:quiz.stream,
                }
            }
        
        })
        return Response.json({
            correctAnswers,
            wrongAnswers
        })

    } catch (error) {
        let err: Record<string, string | undefined> | string = "Something went wrong"
        if (error instanceof Error) {
            const errObject = {
                message: error.message,
                stack: error.stack
            }
            err = errObject
        }
        return new Response(JSON.stringify(err), {
            status: 500
        })
    }
}