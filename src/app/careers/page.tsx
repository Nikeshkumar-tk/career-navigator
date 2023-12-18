"use client"

import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { useQuery } from "react-query"


export default function CareerPage() {
    const getCareersQuery = useQuery('getCareers', async () => {
        const response = await fetch("/api/careers/getCareers")
        return await response.json()
    })
    return (<div>
        <h1 className="text-2xl font-mono">Careers recommended based on your education</h1>
        <div className="mt-4">
            {getCareersQuery.data && getCareersQuery.data[0]?.careers.map((career: Record<string, string>, index: number) => (
                <Card key={index} className="w-[20rem]">
                    <CardHeader>{career.name}
                    <p className="text-sm mt-2 text-muted-foreground">{career.description}</p>
                    </CardHeader>
                </Card>
            ))}
        </div>
    </div>)
}