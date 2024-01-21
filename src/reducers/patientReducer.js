

export const patientReducer = (state = {}, action) => {
    switch (action.type) {
        case 'setPatient':
            state = {
                ...action.payload,
            }
            return state;

        case 'updatePatient':
            if (state.id === action.payload.id) {
                return {
                    ...action.payload
                }
            }
            return state;
        default:
            return;
    }
}