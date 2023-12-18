import { TakeQuizPage } from "@/components/take-quiz";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Quizs } from "@/lib/mongoose";
import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

const dynamic = "force-dynamic";

export default async function QuizPage() {
    const session = await getServerSession(authOptions);
    if ((session?.user.attendedQuizs ?? [])?.length === 0) {
        return (<div className="h-96">
            <div className="flex justify-between">
                <h1 className="text-2xl font-mono">No quizes</h1>
                <Link href={'/new-user'}>
                    <Button>Take Quiz</Button>
                </Link>
            </div>
            {/* <ReccommendedQuizes attendedQuizs={[]} /> */}
        </div>
        )
    }
    return <AttendedQuiz attendedQuizs={session?.user.attendedQuizs!} />
}

type AttendedQuizProps = {
    attendedQuizs: Array<Record<string, string>>
}

function AttendedQuiz(props: AttendedQuizProps) {
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-2xl font-mono">Quizes you attended.</h1>
                <Link href={'/new-user'}>
                    <Button>Take Quiz</Button>
                </Link>
            </div>
            <div className="mt-5 flex gap-3">
                {props.attendedQuizs.map((quiz) => (
                    <Card key={quiz.quizId} className="w-[20rem] hover:shadow-md cursor-pointer hover:bg-gray-900">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div>
                                {quiz.education}
                                <p className="text-sm text-muted-foreground mt-1">{quiz.stream}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mt-1">Correct answers : {quiz.correctAnswers.length}</p>
                                <p className="text-sm text-muted-foreground mt-1">Wrong answers : {quiz.wrongAnswers.length}</p>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            {/* <ReccommendedQuizes attendedQuizs={props.attendedQuizs} /> */}
        </div>
    )
}

type ReccommendedQuizesProps = {
    attendedQuizs: Array<Record<string, string>>
}

async function ReccommendedQuizes(props: ReccommendedQuizesProps) {
    const quizes = await Quizs.find({ _id: { $nin: props.attendedQuizs.map(q => q.quizId) } })
    return (
        <div className="mt-10">
            <p className="text-2xl font-mono">Reccommended Quizes</p>
            <div className="flex gap-5 mt-4">
                {JSON.parse(JSON.stringify(quizes)).map((quiz: any) => (
                    <Card key={quiz._id} className="w-[20rem] cursor-pointer" >
                        <CardHeader>
                            {quiz.education}
                            <p className="text-sm text-muted-foreground mt-1">{quiz.stream}</p>
                        </CardHeader>
                        <CardFooter>
                            <Link href={`/quiz/${quiz._id}`}>
                                <Button>Take Quiz</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

// const careers = [
//     {
//         course: "Course Name1",
//         careers: [
//             {
//                 name: "Career Name",
//                 description: "Career Description",
//             }
//         ]
//     },
//     {
//         course: "Course Name2",
//         careers: [
//             {
//                 name: "Career Name",
//                 description: "Career Description",
//             }
//         ]
//     },
// ]