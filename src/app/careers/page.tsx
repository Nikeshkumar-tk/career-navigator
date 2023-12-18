
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { Careers, Users } from "@/lib/mongoose";
import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";


export default async function CareerPage() {
    const session = await getServerSession(authOptions);
    const userInfo = await Users.findById(session?.user.sub)
    const careersInfo = await Careers.findOne({ course:userInfo.stream });
    return (<div className="h-[80vh]">
        <h1 className="text-2xl font-mono">Careers recommended based on your education</h1>
        <div className="mt-4 ">
            {JSON.parse(JSON.stringify(careersInfo)).careers.map((career: Record<string, string>, index: number) => (
                <Card key={index} className="w-[20rem]">
                    <CardHeader>{career.name}
                    <p className="text-sm mt-2 text-muted-foreground">{career.description}</p>
                    </CardHeader>
                </Card>
            ))}
        </div>
    </div>)
}