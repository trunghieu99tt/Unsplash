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

const App = () => {
	const appTalons = useApp();

	return (
		<React.Fragment>
			<PopupWrapper />
			<Header />
			<ImageMasonry />
			<ToastContainer />
		</React.Fragment>
	);
};

export default App;
