
const URL_API = `${import.meta.env.VITE_SHOP_API_BASE_URL}controls`;

export const getAllNursingControls = async (patientId) => {
    try {
        const response = await fetch(`${URL_API}/all/${patientId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const historyData = !response.ok ? null : await response.json();

        return historyData;
    } catch (error) {
        console.error('Error al buscar:', error);
        throw error;
    }
};


export const saveNursingControl = async (historyid, data) => {
    try {
        const response = await fetch(`${URL_API}/save/${historyid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

export const updateNursingControl = async (historyid, data) => {
    try {
        const response = await fetch(`${URL_API}/update/${historyid}`, {
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