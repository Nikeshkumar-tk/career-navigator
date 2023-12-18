import { Quizs } from "@/lib/mongoose";

export async function GET(request: Request) {
    try {
        const quizId = new URL(request.url).searchParams.get('quizId');
        const result = await Quizs.findById(quizId)
        return Response.json(result)
    } catch (error) {
        return new Response('Something went wrong', {
            status: 500
        })
    }
}