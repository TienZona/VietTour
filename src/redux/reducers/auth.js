const initialState = {
    userID: '',
    name: '',
    email: '',
    avatar: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_AUTH': {
            return {
                ...state,
                userID: action.payload.userID,
                name: action.payload.name,
                email: action.payload.email,
                avatar: action.payload.avatar,
            };
        }
        default:
            return state;
    }
};
export default authReducer;
