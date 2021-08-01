import React from "react";

export type TAppAction =
    | {
        type: "SET_IMAGES";
        payload: {
            page: number,
            images: TImage[]
        }
    }
    | {
        type: "SET_LOADING";
        payload: boolean
    }
    | {
        type: 'SET_NAME_QUERY';
        payload: string
    } |
    {
        type: 'SET_PAGE';
        payload: number
    } | {
        type: 'SET_POP_UP';
        payload: TPopUp | null
    } | {
        type: 'SET_USER';
        payload: TUser | null;
    } | {
        type: 'SET_TOTAL_NUMBER',
        payload: number
    } | {
        type: 'SET_ACTIVE_IMAGE',
        payload: TImage | null
    };

export type TAppDispatch = (action: TAppAction) => void;

export type TPopUp = 'AUTH' | 'CREATE_IMAGE' | 'DELETE_IMAGE';

export type TAppContextProps = {
    children: React.ReactNode;
};

export type TUser = {
    _id: string;
    username: string;
}

export type TImage = {
    _id: string;
    name: string;
    url: string;
    user: TUser
}

export type TAppState = {
    images: {
        [page: string]: TImage[]
    };
    loading: boolean;
    nameQuery: string;
    page: number;
    user: TUser | null;
    popup: null | TPopUp;
    totalNumber: number;
    activeImage: TImage | null;
}
