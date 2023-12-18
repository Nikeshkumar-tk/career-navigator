import { TakeQuizPage } from "@/components/take-quiz";

export default function TakeQuizHome({ params }: { params: { slug: string } }){
    return <TakeQuizPage quizId={params.slug} />
}