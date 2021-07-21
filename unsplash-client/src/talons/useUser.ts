import client from "../api/client"
import { TUser } from "../types/app.types"

export const useUser = () => {
    const createUser = async (user: TUser) => {
        const response = await client.post('/users', user);
        return response.data;
    }

    const verifyUser = async (user: TUser) => {
        const response = await client.post('/users/verify', user);
        return response.data;
    }

    return {
        createUser,
        verifyUser
    }
}