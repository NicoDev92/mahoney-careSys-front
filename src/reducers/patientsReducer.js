export const patientsReducer = (state = [], action) => {
    switch (action.type) {
        case 'setPatientList':
            return action.payload.data || [];

        case 'addPatient':
            return [
                ...state, {
                    ...action.payload
                }];

        case 'updatePatient':
            return state.map(patient => {
                if (patient.id === action.payload.id) {
                    return {
                        ...action.payload,
                    };
                }
                return patient;
            });

        case 'removePatient':
            return state.filter(patient => patient.id !== action.payload);

        default:
            return state;
    }
}