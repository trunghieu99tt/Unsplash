import React from "react";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAppContext } from "../../context/app.context";

// components
import ImageCard from "../ImageCard";

import { TImage } from "../../types/app.types";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./imageMasonry.module.css";

interface Props {
	classes?: object;
}

const masonryOptions = {
	transitionDuration: 0,
};

const ImageMasonry = ({ classes: propsClasses }: Props) => {
	const classes = mergeClasses(defaultClasses, propsClasses);

	const { state, dispatch } = useAppContext();

	const fetchData = () => {
		dispatch({
			type: "SET_PAGE",
			payload: state.page + 1,
		});
	};

	const images = state.images;

	const childElements = images?.map((image: TImage) => {
		return <ImageCard src={image.url} alt={image.name} />;
	});

	return (
		<main className={classes.root}>
			<InfiniteScroll
				dataLength={images.length}
				next={fetchData}
				hasMore={images.length < state.totalNumber}
				loader={<h4>Loading...</h4>}
			>
				<Masonry
					breakpointCols={5}
					className={classes.grid}
					columnClassName={classes.column}
				>
					{childElements}
				</Masonry>
			</InfiniteScroll>
		</main>
	);
};

export default ImageMasonry;
