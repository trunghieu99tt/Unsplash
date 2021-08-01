import React, { useCallback } from "react";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";
import { SRLWrapper } from "simple-react-lightbox";
import { useAppContext } from "../../context/app.context";

// components
import ImageCard from "../ImageCard";

import { TImage } from "../../types/app.types";

// utils
import mergeClasses from "../../utils/mergeClasses";

// styles
import defaultClasses from "./imageMasonry.module.css";
import { useMemo } from "react";
import { useImage } from "../../talons/userImage";

interface Props {
	classes?: object;
}

const loader = <h4>Loading...</h4>;

const breakpointColumnsObj = {
	default: 4,
	1100: 3,
	700: 2,
	500: 1,
};

const ImageMasonry = ({ classes: propsClasses }: Props) => {
	const classes = mergeClasses(defaultClasses, propsClasses);

	const { state, dispatch } = useAppContext();
	const { allImages } = useImage();

	const fetchData = () => {
		dispatch({
			type: "SET_PAGE",
			payload: state.page + 1,
		});
	};

	const childElements = useMemo(() => {
		return allImages.map((image: TImage) => {
			return <ImageCard data={image} key={image._id} />;
		});
	}, [allImages]);

	return (
		<main className={classes.root}>
			<InfiniteScroll
				dataLength={allImages.length}
				next={fetchData}
				hasMore={allImages.length < state.totalNumber}
				loader={loader}
			>
				<SRLWrapper>
					<Masonry
						className={classes.grid}
						columnClassName={classes.column}
						breakpointCols={breakpointColumnsObj}
					>
						{childElements}
					</Masonry>
				</SRLWrapper>
			</InfiniteScroll>
		</main>
	);
};

export default ImageMasonry;
