import React from "react";

import { useApp } from "./talons/useApp";

// components
import Header from "./components/Header";
import ImageMasonry from "./components/ImageMasonry";
import PopupWrapper from "./components/PopupWrapper";
import { ToastContainer } from "react-toastify";

// styles
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Loader from "./components/loader";

const App = () => {
	const {loading} = useApp();
	console.log('loading', loading)

	return (
		<React.Fragment>
			{loading && <Loader />}
			<PopupWrapper />
			<Header />
			<ImageMasonry />
			<ToastContainer />
		</React.Fragment>
	);
};

export default App;
