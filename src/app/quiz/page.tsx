'use client'
export const dynamic = "force-dynamic"

import { useMutation, useQuery } from "react-query"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { z } from "zod"
import { FormControl } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useState, useCallback } from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

export default function QuizPage() {
    const [answers, setAnswers] = useState<Map<string, string>>(new Map())
    const [openAnswerDialog, setOpenAnswerDialog] = useState(false);

    const { data: quiz, ...getQuizsQuery } = useQuery('getQuizs', async () => {
        const response = await fetch('/api/quiz')
        return await response.json()
    })
    const checkAnswersMutation = useMutation(async (ansArray: Array<{ questionId: string, answer: string }>) => {
        const response = await fetch('/api/quiz/check_answer', {
            method: "POST",
            body: JSON.stringify({
                quizId: quiz._id,
                answers: ansArray
            })
        })

        return await response.json()
    }, {
        onSuccess() {
            setOpenAnswerDialog(true)
        }
    })

    function handleSelectingAnswer(questionId: string, answerKey: string) {
        setAnswers(p => {
            p.set(questionId, answerKey)
            return p
        })
    }

    function handleSubmit() {
        const answerArray = Array.from(answers, ([key, value]) => ({ questionId: key, answer: value }))
        if (answerArray.length !== quiz?.questions.length) {
            toast({
                title: "Please answer all the questions",
                variant: "destructive"
            })
            return
        }
        checkAnswersMutation.mutate(answerArray)
    }




    return (
        <div>
            <h1 className="text-2xl">Please answer the questions</h1>
            <div className="flex flex-col gap-3 mt-2">
                {quiz?.questions.map((question: any, index: number) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-lg">{question.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup onValueChange={(value) => handleSelectingAnswer(question.id, value)} defaultValue="option-one" key={index}>
                                {question.options.map((option: any, index: number) => (
                                    <div className="flex items-center space-x-2" key={index}>
                                        <h6 className="text-base">{option.key})</h6>
                                        <RadioGroupItem value={option.key} id={`${option.key}-${option.value}`} />
                                        <Label htmlFor="option-one">{option.value}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex justify-end mt-2">
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
            <Dialog open={openAnswerDialog} onOpenChange={setOpenAnswerDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Result</DialogTitle>
                    </DialogHeader>
                    <h4>Correct answers : {checkAnswersMutation.data?.correctAnswers.length}</h4>
                    <h4>Wrong answers : {checkAnswersMutation.data?.wrongAnswers.length}</h4>
                </DialogContent>
            </Dialog>
        </div>
    )
}