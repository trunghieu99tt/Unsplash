import { useEffect } from "react";
import client from "../api/client";
import { useAppContext } from "../context/app.context";
import { useImage } from "./userImage"

export const useApp = () => {

    const { state: { page, nameQuery }, dispatch } = useAppContext();
    const { getImagesByName } = useImage();

    useEffect(() => {
        getImagesByName();
    }, [page, nameQuery]);

    useEffect(() => {
        const token = window.localStorage.getItem('token') ? JSON.parse(window.localStorage.getItem('token') || '') : null;

        if (token) {
            getUserData();
        }

    }, []);

    const getUserData = async () => {
        try {
            const response = await client.get('/getMe');
            const user = response?.data.user;
            dispatch({ type: 'SET_USER', payload: user })
        } catch (error) {
            console.log(`error`, error);
            window.localStorage.removeItem('token');
        }
    }

    return {}

}