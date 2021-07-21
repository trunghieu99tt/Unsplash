import { useCallback, useEffect } from "react";
import client from "../api/client"
import { useAppContext } from "../context/app.context";
import { TImage } from "../types/app.types";

export const useImage = () => {

    const { state: { nameQuery, images, page }, dispatch } = useAppContext();

    const getImagesByName = useCallback(async (limit: number = 12) => {
        const response = await client.get(`/images?name=${nameQuery || ''}&page=${page || 1}&limit=${limit}`);
        const responseImages = response.data;
        dispatch({
            type: "SET_IMAGES",
            payload: [...images, ...responseImages]
        });
    }, [dispatch, images, nameQuery, page]);

    useEffect(() => {
        getImagesByName();
    }, [getImagesByName, nameQuery, page]);

    const createImage = async (image: TImage) => {
        await client.post(`/images`, image);
        if (nameQuery.length > 0 && image.name.includes(nameQuery)) {
            dispatch({ type: 'SET_PAGE', payload: 1 });
        }
    };

    return {
        createImage,
        getImagesByName
    };
}