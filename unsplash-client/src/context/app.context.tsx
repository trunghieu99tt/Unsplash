import React, { useMemo } from "react";
import { useContext } from "react";
import { useReducer } from "react";

import {
	TAppAction,
	TAppState,
	TAppContextProps,
	TAppDispatch,
} from "../types/app.types";

const initialState: TAppState = {
	nameQuery: "",
	images: {},
	page: 1,
	user: null,
	loading: false,
	popup: null,
	totalNumber: 0,
	activeImage: null,
};

const AppContext = React.createContext<{
	state: TAppState;
	dispatch: TAppDispatch;
} | null>(null);

const appReducer = (state: TAppState = initialState, action: TAppAction) => {
	switch (action.type) {
		case "SET_IMAGES":
			return {
				...state,
				images: {
					...state.images,
					[action.payload.page]: action.payload.images,
				},
			};
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload,
			};
		case "SET_NAME_QUERY":
			return {
				...state,
				nameQuery: action.payload,
			};
		case "SET_PAGE":
			return {
				...state,
				page: action.payload,
			};
		case "SET_POP_UP":
			return {
				...state,
				popup: action.payload,
			};
		case "SET_USER":
			return {
				...state,
				user: action.payload,
			};
		case "SET_TOTAL_NUMBER":
			return {
				...state,
				totalNumber: action.payload,
			};
		case "SET_ACTIVE_IMAGE":
			return {
				...state,
				activeImage: action.payload,
			};
		default:
			return state;
	}
};

const AppProvider = ({ children }: TAppContextProps) => {
	const [state, dispatch] = useReducer(appReducer, initialState);
	const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (context === null) {
		throw new Error("useCount must be used within a CountProvider");
	}
	return context;
};

export default AppProvider;
