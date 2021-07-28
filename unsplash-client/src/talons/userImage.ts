import { useCallback, useEffect, useMemo } from "react";
import client from "../api/client"
import { useAppContext } from "../context/app.context";
import { TImage } from "../types/app.types";

export const useImage = () => {

    const { state: { nameQuery, images, page, user }, dispatch } = useAppContext();


    const getImagesByName = useCallback(async (limit: number = 10) => {
        const response = await client.get(`/image?name=${nameQuery || ''}&page=${page || 1}&limit=${limit}`);
        const responseImages = response.data;
        dispatch({
            type: "SET_IMAGES",
            payload: [...(page > 1 ? images : []), ...responseImages.images]
        });
        dispatch({
            type: 'SET_TOTAL_NUMBER',
            payload: responseImages.total
        });
    }, [nameQuery, page]);

    const createImage = async (image: Partial<TImage>) => {
        await client.post(`/image`, {
            ...image,
            user
        });
        getImagesByName();
    };

    return {
        createImage,
        getImagesByName
    };
}