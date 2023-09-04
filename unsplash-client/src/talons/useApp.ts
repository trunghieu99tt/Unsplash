import { useEffect } from "react";
import client from "../api/client";
import { useAppContext } from "../context/app.context";
import { useImage } from "./userImage"

export const useApp = () => {

    const { state: { nameQuery, page, loading}, dispatch } = useAppContext();
    const { getImagesByName } = useImage();

    useEffect(() => {
        getImagesByName();
    }, [nameQuery, page]);

    useEffect(() => {
        const token = window.localStorage.getItem('token') ? JSON.parse(window.localStorage.getItem('token') || '') : null;
        async function getUserData(){
            try {
                const response = await client.get('/getMe');
                const user = response?.data.user;
                dispatch({ type: 'SET_USER', payload: user })
            } catch (error) {
                console.log(`error`, error);
                window.localStorage.removeItem('token');
            }
        }

        if (token) {
            getUserData();
        }
    }, [dispatch]);


    return {
        loading
    }
}