import { Users } from "@/lib/mongoose"

export const dynamic = 'force-dynamic'



export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        const { email, ...attributesToUpdate } = body
        if (!email) {
            return new Response("Email id not provided", {
                status: 404,
            })
        }

        const user = await Users.findOneAndUpdate({ email }, { ...attributesToUpdate }, { new: true })

        return Response.json({
            message: "Use info updated successfully",
            user
        })
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500
        })
    }

}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('sub')
    if (!userId) {
        return new Response('Email id not provided', {
            status: 400
        })
    }
    try {
        const user = await Users.findById(userId)
        return Response.json(user)
    } catch (error) {
        return new Response('Something went wrong', {
            status: 500,
        })
    }

}