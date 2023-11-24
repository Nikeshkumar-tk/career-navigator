import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

export function useUserInfo() {
    const session = useSession()
    const { data, ...getUserInfoQuery } = useQuery('account_info', async () => {
        const response = await fetch(`/api/users?sub=${session.data?.user.sub}`)
        return await response.json()
    })

    return {
        user: {
            ...data
        },
        ...getUserInfoQuery
    }
}