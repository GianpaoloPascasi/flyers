export function uiInitializer() {
    return {
        isMenuShown: false,
        isLoading: true,
        selectedFlyerId: 0,
        page: 1,
        limit: 100,
        error: null
    }
};

export const UI_DISPATCH_TYPES = {
    TOGGLE_MENU: "TOGGLE_MENU",
    SELECT_FLYER_FROM_MENU: "SELECT_FLYER_FROM_MENU",
    TOGGLE_LOADING: "TOGGLE_LOADING",
    UPDATE_ERROR: "UPDATE_ERROR",
    FORWARD_PAGE: "FORWARD_PAGE"
};

export function uiReducer(state, action) {
    switch (action.type) {
        case UI_DISPATCH_TYPES.SELECT_FLYER_FROM_MENU:
            return { ...state, selectedFlyerId: action.payload };
        case UI_DISPATCH_TYPES.TOGGLE_MENU:
            return { ...state, isMenuShown: !state.isMenuShown };
        case UI_DISPATCH_TYPES.TOGGLE_LOADING:
            return { ...state, isLoading: action.payload };
        case UI_DISPATCH_TYPES.UPDATE_ERROR: {
            return { ...state, error: action.payload };
        }
        case UI_DISPATCH_TYPES.FORWARD_PAGE: {
            return { ...state, page: state.page + 1 };
        }
        default:
            throw new Error("uiReducer - No implementation found for action " + action.type);
    }
}

