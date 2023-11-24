import { Quizs } from "@/lib/mongoose"

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
        return Response.json({
            correctAnswers,
            wrongAnswers
        })

    } catch (error) {

    }



}