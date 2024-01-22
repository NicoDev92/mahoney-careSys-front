const URL_API = `${import.meta.env.VITE_SHOP_API_BASE_URL}/histories`;

export const getMedicalHistory = async (patientId) => {
    try {
        const response = await fetch(`${URL_API}/history-patient-id/${patientId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error while getting medical history: ${response.statusText}`);
        }

        const medicalHistoryData = await response.json();

        return medicalHistoryData;
    } catch (error) {
        console.error('Error al buscar:', error);
        throw error;
    }
};

export const saveMedicalHistory = async (patientId, data) => {
    try {
        const response = await fetch(`${URL_API}/save/${patientId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error al guardar: ${response.statusText}`);
        }

        const successMessage = await response.json();

        return successMessage;
    } catch (error) {
        console.error('Error al guardar:', error);
        throw error;
    }
};

export const updatePatientHistory = async (patientId, data) => {
    try {
        const response = await fetch(`${URL_API}/update/${patientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar: ${response.statusText}`);
        }

        const successMessage = await response.json();

        return successMessage;
    } catch (error) {
        console.error('Error al actualizar:', error);
        throw error;
    }
};


