const initialState = {
    Name: "Orders",
    Orders: []
}

export const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_ORDERS":
            return { ...state, Orders: [...action.payload] };
        case "REMOVE_ORDERS":
            return { ...state, Orders: [] };
        default: {
            return state;
        }
    }
}