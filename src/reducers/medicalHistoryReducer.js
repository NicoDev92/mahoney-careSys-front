
export const medicalHistoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'setMedicalHistory':
            return action.payload ? action.payload : null;

        case 'addMedicalHistory':
            return state = {
                ...action.payload
            };

        case 'updateMedicalHistory':
            return state = {
                ...action.payload
            };

        default:
            return state;
    }

}