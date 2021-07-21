import React from "react";

import { useAppContext } from "./context/app.context";

// components
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
    const {
        state: { popup },
        dispatch,
    } = useAppContext();
    return (
        <div>
            <Header />
            <Footer />
        </div>
    );
};

export default App;
