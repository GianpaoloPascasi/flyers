import bigImg from "../../static/big.jpg";
import smallImg from "../../static/small.jpg";

export const FLYERS_DISPATCH_TYPES = {
    SAVE_FLYER: "SAVE_FLYER",
    PUSH_FLYERS_FROM_BE: "PUSH_FLYERS_FROM_BE",
    INIT_SAVED_FLYERS: "INIT_SAVED_FLYERS",
    UPDATE_ERROR: "UPDATE_ERROR"
};

export const LS_SAVE_FLYER_KEY = "LS_SAVE_FLYER_KEY ";

export function flyersInitialer() {
    const found = localStorage.getItem(LS_SAVE_FLYER_KEY);
    if (!found) {
        localStorage.setItem(LS_SAVE_FLYER_KEY, "[]");
    }
    return {
        flyers: [],
        error: null,
        numFlyers: 0,
        savedFlyers: found ? JSON.parse(found).map(e => ({ ...e })) : []
    };
};

export function flyersReducer(state, action) {
    switch (action.type) {
        case FLYERS_DISPATCH_TYPES.INIT_SAVED_FLYERS: {
            return { ...state, savedFlyers: action.payload };
        }
        case FLYERS_DISPATCH_TYPES.SAVE_FLYER: {
            if (state.savedFlyers.find(flyer => flyer.id === action.payload.id) !== undefined) {
                return { ...state, savedFlyers: state.savedFlyers.filter(e => e.id !== action.payload.id) };
            }
            return { ...state, savedFlyers: [...state.savedFlyers, action.payload] };
        }
        case FLYERS_DISPATCH_TYPES.PUSH_FLYERS_FROM_BE: {
            //aggiorno lo state con i nuovi volantini e per mischiare le icone (per dimostrazione del layout) generaro un numero random
            return { ...state, numFlyers: action.payload.numFlyers, flyers: [...state.flyers, ...action.payload.flyers.map((e) => ({ ...e, imgSrc: Math.floor(Math.random() * 3) % 2 === 0 ? bigImg : smallImg }))] };
        }
        case FLYERS_DISPATCH_TYPES.UPDATE_ERROR: {
            return { ...state, error: action.payload };
        }
        default:
            throw new Error("flyersReducer - No implementation found for action " + action.type);
    }
}

