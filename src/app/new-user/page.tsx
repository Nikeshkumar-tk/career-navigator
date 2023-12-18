'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMutation } from 'react-query'
import { bachelorDegrees, currentlyPursuingEducation, currentlyPursuingEducationNames, masterDegrees, stream_10th, stream_12th } from "@/config/education"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

const userSetupFormSchema = z.object({
    name: z.string({ required_error: 'Please enter a name' }).min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string({ required_error: 'Please enter a valid email' }).email(),
    currentlyPursuing: z.enum(currentlyPursuingEducationNames),
    stream: z.string()
})

type UserInfo = z.infer<typeof userSetupFormSchema>

export default function NewUserSetupPage() {
    const session = useSession()
    const { toast } = useToast()
    const router = useRouter()
    const updateUserMutation = useMutation(async (userInfo: UserInfo & { isAccountConfirmed: boolean }) => {
        const response = await fetch('/api/users', {
            method: 'PATCH',
            body: JSON.stringify(userInfo)
        })
        return response
    }, {
        async onSuccess() {
            toast({
                title: "Profile updated successfully",
                action: <ToastAction altText="clear">clear</ToastAction>
            })
            const newSession = {
                ...session,
                user: {
                    ...session.data?.user,
                    isNewUser: false
                }
            }
            await session.update(newSession)
            const quiz = await fetch('/api/quiz')
            const quizData = await quiz.json()
            if(quizData === "NO_QUIZ"){
                toast({
                    title:"No quiz available",
                    description:"Sorry no quiz currently available for you"
                })
                router.push('/quiz')
            }else{
                router.push('/quiz/' + quizData._id)
            }
        }
    })

    const form = useForm<z.infer<typeof userSetupFormSchema>>({
        resolver: zodResolver(userSetupFormSchema),
        defaultValues: {
            email: session.data?.user.email!,
            name: session.data?.user.name!,
        }
    })

    function onSubmit(values: UserInfo) {
        const userInfo = {
            ...values,
            isAccountConfirmed: true,
            attendedQuizs: []
        }
        updateUserMutation.mutate(userInfo)

    }

    return (
        <div className="max-w-screen flex justify-center items-center ">
            <div className="w-[50vw] mt-5 border rounded-md p-7 py-10">
            <h1>Please complete your profile</h1>
            <div className="mt-3 w-full">
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fullname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="fullname" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <h1>Educational details</h1>
                        <FormField
                            control={form.control}
                            name="currentlyPursuing"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Currently pursuing</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select what you are pursuing" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {currentlyPursuingEducation.map(item => (
                                                <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {form.watch("currentlyPursuing") === "12 th" && (
                            <FormField
                                control={form.control}
                                name="stream"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subject/Stream</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your stream" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {stream_12th.map(item => (
                                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {form.watch('currentlyPursuing') === "Bachelor's Degree" && (
                            <FormField
                                control={form.control}
                                name="stream"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stream</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your stream" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {bachelorDegrees.map(item => (
                                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        )}
                        {form.watch('currentlyPursuing') === "Master's Degree" && (
                            <FormField
                                control={form.control}
                                name="stream"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stream</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your stream" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {masterDegrees.map(item => (
                                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {form.watch('currentlyPursuing') === "10 th" && (
                            <FormField
                                control={form.control}
                                name="stream"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stream</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select your stream" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {stream_10th.map(item => (
                                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <Button type="submit" disabled={updateUserMutation.isLoading}>Submit</Button>
                    </form>
                </Form>
            </div>
            </div>
        </div >
    )
}