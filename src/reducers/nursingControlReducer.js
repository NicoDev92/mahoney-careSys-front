

export const nursingControlReducer = (state = [], action) => {
    switch (action.type) {
        case 'setNursingControls':
            return action.payload.data || [];

        case 'setNursingControl':
            return action.payload || {};

        case 'addNursingControl':
            return [
                ...state, {
                    ...action.payload
                }];

        case 'updateNursingControl':
            return state.map(nursingControl => {
                if (nursingControl.id === action.payload.id) {
                    return {
                        ...action.payload,
                    };
                } else {
                    return nursingControl;
                }
            });


        case 'removeNursingControl':
            return state.filter(nursingControl => nursingControl.id !== action.payload);

        default:
            return Array.isArray(state) ? state : [];
    }

}