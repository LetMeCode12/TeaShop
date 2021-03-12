const initialState = {
    Name: "Products",
    Products: []
}

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PRODUCTS":
            return { ...state, Products: [...action.payload] };
        case "REMOVE_PRODUCTS":
            return { ...state, Products: [] };
        default: {
            return state;
        }
    }
}