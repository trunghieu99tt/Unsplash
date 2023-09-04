import {useMemo} from "react";
import client from "../api/client";
import {useAppContext} from "../context/app.context";
import {TImage} from "../types/app.types";
import {checkImage} from "../utils/helper";

export const useImage = () => {
	const {
		state: { nameQuery, images, page, user },
		dispatch,
	} = useAppContext();

	const getImagesByName = async (limit: number = 10) => {
		dispatch({
			type: "SET_LOADING",
			payload: true,
		})
		const response = await client.get(
			`/image?name=${nameQuery || ""}&page=${page || 1}&limit=${limit}`
		);
		const responseImages = response.data;
		dispatch({
			type: "SET_IMAGES",
			payload: {
				page,
				images: responseImages.images,
			},
		});
		dispatch({
			type: "SET_TOTAL_NUMBER",
			payload: responseImages.total,
		});
		dispatch({
			type: "SET_LOADING",
			payload: false,
		})
	};

	const createImage = async (image: Partial<TImage>) => {
		dispatch({
			type: "SET_LOADING",
			payload: true,
		})
		const response = await client.post(`/image`, {
			...image,
			user,
		});
		if (response.status === 201) {
			await getImagesByName();
		}
		dispatch({
			type: "SET_LOADING",
			payload: false,
		})
	};

	const deleteImage = async (imageId: string, data: { password: string }) => {
		dispatch({
			type: "SET_LOADING",
			payload: true,
		})
		const response = await client.delete(`/image/${imageId}`, {
			data,
		});
		dispatch({
			type: "SET_LOADING",
			payload: false,
		})

		return response;
	};

	const allImages = useMemo(() => {
		return Object.values(images).reduce(
			(res: TImage[], curr: TImage[]): TImage[] => {
				return res.concat(curr);
			},
			[]
		);
	}, [images]);

	// a function to check if the image url is valid
	const imageExists = async (url: string) => {
		try {
			return await checkImage(url);
		} catch (error) {
			return false;
		}
	};

	return {
		createImage,
		deleteImage,
		allImages,
		imageExists,
		getImagesByName,
	};
};
